import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";

import Profile from "./pages/Profile/Profile";
import MyOpportunities from "./pages/Profile/MyOpportunities";
import OpportunityDetails from "./pages/Profile/Opportunity/OpportunityDetails";

import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";

import OrganizerDashboard from "./pages/OrganizerDashboard/OrganizerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
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

  const goHome = () => {
    setPage("home");
  };

  const goExplore = () => {
    setPage("explore");
  };

  const goProfile = () => {
    setPage("profile");
  };

  const goMyOpportunities = () => {
    setPage("my-opportunities");
  };

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

  // LOGIN / SIGNUP
  if (!isLoggedIn) {
    if (authPage === "signup") {
      return (
        <Signup
          onLogin={() => setAuthPage("login")}
          onSignup={handleSignup}
        />
      );
    }

    return (
      <Login
        onSignup={() => setAuthPage("signup")}
        onLogin={handleLogin}
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

          if (role === "user") {
            setPage("home");
          }

          if (role === "organizer") {
            setPage("organizer");
          }

          if (role === "admin") {
            setPage("admin");
          }
        }}
      />
    );
  }

  // CHANGE ROLE
  const changeRole = () => {
    setSelectedRole(null);
    setPage("home");
  };

  return (
    <div className="min-h-screen">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        role={selectedRole}

        onHome={goHome}
        onExplore={goExplore}
        onMyOpportunities={goMyOpportunities}
        onProfile={goProfile}

        onDashboard={() => setPage(selectedRole)}
        onMyEvents={() => alert("My Events page coming next!")}
        onCreateEvent={() => alert("Create Event page coming next!")}
        onRegistrations={() => alert("Registrations page coming next!")}
        onAnalytics={() => alert("Analytics page coming next!")}
        onManageUsers={() => alert("Manage Users page coming next!")}
        onManageEvents={() => alert("Manage Events page coming next!")}
        onApprovals={() => alert("Event Approvals page coming next!")}
        onRiskDetection={() => alert("Risk Detection page coming next!")}

        onChangeRole={changeRole}
      />

      
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
            onBack={goExplore}
            darkMode={darkMode}
          />
        )}

      {selectedRole === "user" && page === "profile" && (
        <Profile onExplore={goExplore} />
      )}

      {selectedRole === "user" &&
        page === "my-opportunities" && (
          <MyOpportunities
            onExplore={goExplore}
            darkMode={darkMode}
          />
        )}

      {selectedRole === "organizer" && page === "organizer" && (
        <OrganizerDashboard
          darkMode={darkMode}
          onChangeRole={changeRole}
        />
      )}

    
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