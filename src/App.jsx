
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState("login");

  const [selectedRole, setSelectedRole] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState("home");

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

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

  const handleLogin = () => {
    setIsLoggedIn(true);
    setSelectedRole(null);
    setPage("home");
  };

  const handleSignup = () => {
    setAuthPage("login");
  };

  const changeRole = () => {
    setSelectedRole(null);
    setPage("home");
  };

  const openOrganizerPage = (pageName) => {
    setPage(pageName);
  };

  // LOGIN / SIGNUP / OTP
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

  // ROLE SELECTION
  if (!selectedRole) {
    return (
      <RoleSelection
        darkMode={darkMode}
        onSelect={(role) => {
          setSelectedRole(role);

          if (role === "user") setPage("home");
          if (role === "organizer") setPage("organizer");
          if (role === "admin") setPage("admin");
        }}
      />
    );
  }

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
          onChangeRole={changeRole}
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
        <MyOpportunities
          onExplore={goExplore}
          darkMode={darkMode}
        />
      )}

      {/* ORGANIZER PAGES */}
      {selectedRole === "organizer" && page === "organizer" && (
        <OrganizerDashboard
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onChangeRole={changeRole}
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
          onChangeRole={changeRole}
        />
      )}
    </div>
  );
}

export default App;
