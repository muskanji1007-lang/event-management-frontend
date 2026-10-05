import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";

import Profile from "./pages/Profile/Profile";
import MyOpportunities from "./pages/Profile/MyOpportunities";
import OpportunityDetails from "./pages/Profile/Opportunity/OpportunityDetails";

import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import OTPVerification from "./pages/OTPVerification";

import OrganizerDashboard from "./pages/OrganizerDashboard/OrganizerDashboard";
import CreateEvent from "./pages/OrganizerDashboard/CreateEvent";
import MyEvents from "./pages/OrganizerDashboard/MyEvents";
import Registrations from "./pages/OrganizerDashboard/Registrations";
import Analytics from "./pages/OrganizerDashboard/Analytics";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import RoleSelection from "./pages/RoleSelection";

/**
 * Derive the role from the stored user object.
 * Maps backend roles (USER / ORGANIZER / ADMIN) → app role keys.
 */
function getRoleFromUser(userObj) {
  if (!userObj) return null;
  const role = (userObj.role || "").toUpperCase();
  if (role === "ORGANIZER") return "organizer";
  if (role === "ADMIN") return "admin";
  return "user";
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState("login");

  // If selectedRole is null, we show RoleSelection
  const [selectedRole, setSelectedRole] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState("home");

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // Restore session on page load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("selectedRole");
    
    if (token && storedUser) {
      try {
        setIsLoggedIn(true);
        if (storedRole) {
          setSelectedRole(storedRole);
          setPage(
            storedRole === "organizer"
              ? "organizer"
              : storedRole === "admin"
              ? "admin"
              : "home"
          );
        }
      } catch {
        // Corrupt storage — clear it
        localStorage.clear();
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const goHome = () => setPage("home");
  const goExplore = () => setPage("explore");
  const goProfile = () => setPage("profile");
  const goMyOpportunities = () => setPage("my-opportunities");

  const openDetails = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setPage("details");
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    // Don't auto-set role because backend ignores the signup role and defaults everyone to USER.
    // Instead, leave selectedRole as null to trigger RoleSelection.
    setSelectedRole(null); 
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    localStorage.setItem("selectedRole", roleId);
    setPage(
      roleId === "organizer" ? "organizer" : roleId === "admin" ? "admin" : "home"
    );
  };

  const handleSignup = () => {
    setAuthPage("login");
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const { logoutUser } = await import("./services/api");
        await logoutUser(refreshToken);
      } catch (err) {
        console.error("Logout API failed:", err);
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("selectedRole");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setSelectedRole(null);
    setAuthPage("login");
    setPage("home");
  };

  const openOrganizerPage = (pageName) => {
    setPage(pageName);
  };

  // ── Auth screens ────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    if (authPage === "signup") {
      return (
        <Signup
          onLogin={() => setAuthPage("login")}
          onSignup={handleSignup}
        />
      );
    }

    if (authPage === "otp") {
      return (
        <OTPVerification
          onBack={() => setAuthPage("login")}
          onVerified={() => setAuthPage("login")}
        />
      );
    }

    return (
      <Login
        onSignup={() => setAuthPage("signup")}
        onLogin={handleLogin}
        onForgotPassword={() => setAuthPage("otp")}
      />
    );
  }

  // ── Role Selection Screen (if not yet selected) ─────────────────────────────
  if (isLoggedIn && !selectedRole) {
    return <RoleSelection onSelect={handleRoleSelect} />;
  }

  // ── Logged-in views ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">

      {/* USER NAVBAR */}
      {selectedRole === "user" && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          role={selectedRole}
          onHome={goHome}
          onExplore={goExplore}
          onMyOpportunities={goMyOpportunities}
          onProfile={goProfile}
          onChangeRole={handleLogout}
        />
      )}

      {selectedRole === "user" && page === "home" && (
        <Home
          onExplore={goExplore}
          onMyOpportunities={goMyOpportunities}
          darkMode={darkMode}
        />
      )}

      {selectedRole === "user" && page === "explore" && (
        <Explore onViewDetails={openDetails} />
      )}

      {selectedRole === "user" &&
        page === "details" &&
        selectedOpportunity && (
          <OpportunityDetails
            opportunity={selectedOpportunity}
            onBack={goExplore}
            darkMode={darkMode}
          />
        )}

      {selectedRole === "user" && page === "profile" && (
        <Profile onExplore={goExplore} />
      )}

      {selectedRole === "user" && page === "my-opportunities" && (
        <MyOpportunities onExplore={goExplore} darkMode={darkMode} />
      )}

      {/* ORGANIZER PAGES */}
      {selectedRole === "organizer" && page === "organizer" && (
        <OrganizerDashboard
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onChangeRole={handleLogout}
          onNavigate={openOrganizerPage}
        />
      )}

      {selectedRole === "organizer" && page === "create-event" && (
        <div className="min-h-screen bg-[#F5F5F2] p-4 sm:p-8">
          <button
            onClick={() => setPage("organizer")}
            className="mb-5 rounded-lg border border-[#D9DCD6] px-4 py-2"
          >
            ← Back to Dashboard
          </button>
          <CreateEvent />
        </div>
      )}

      {selectedRole === "organizer" && page === "my-events" && (
        <div className="min-h-screen bg-[#F5F5F2] p-4 sm:p-8">
          <button
            onClick={() => setPage("organizer")}
            className="mb-5 rounded-lg border border-[#D9DCD6] px-4 py-2"
          >
            ← Back to Dashboard
          </button>
          <MyEvents />
        </div>
      )}

      {selectedRole === "organizer" && page === "registrations" && (
        <div className="min-h-screen bg-[#F5F5F2] p-4 sm:p-8">
          <button
            onClick={() => setPage("organizer")}
            className="mb-5 rounded-lg border border-[#D9DCD6] px-4 py-2"
          >
            ← Back to Dashboard
          </button>
          <Registrations />
        </div>
      )}

      {selectedRole === "organizer" && page === "analytics" && (
        <div className="min-h-screen bg-[#F5F5F2] p-4 sm:p-8">
          <button
            onClick={() => setPage("organizer")}
            className="mb-5 rounded-lg border border-[#D9DCD6] px-4 py-2"
          >
            ← Back to Dashboard
          </button>
          <Analytics />
        </div>
      )}

      {/* ADMIN PAGE */}
      {selectedRole === "admin" && page === "admin" && (
        <AdminDashboard
          darkMode={darkMode}
          onChangeRole={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
