import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";

import Profile from "./pages/Profile/Profile";
import MyOpportunities from "./pages/Profile/MyOpportunities";
import OpportunityDetails from "./pages/Profile/Opportunity/OpportunityDetails";

import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";


function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState("login");



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

    console.log("Selected opportunity:", opportunity);
  };


  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("home");
  };



  const handleSignup = () => {
    setAuthPage("login");
  };


  

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


  return (
    <div className="min-h-screen">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onHome={goHome}
        onExplore={goExplore}
        onMyOpportunities={goMyOpportunities}
        onProfile={goProfile}
      />


      {page === "home" && (
        <Home
          onExplore={goExplore}
          onMyOpportunities={goMyOpportunities}
          darkMode={darkMode}
        />
      )}


      {page === "explore" && (
        <Explore
          onViewDetails={openDetails}
        />
      )}


      {page === "details" && selectedOpportunity && (
        <OpportunityDetails
          onBack={goExplore}
          darkMode={darkMode}
        />
      )}


   

      {page === "profile" && (
        <Profile
          onExplore={goExplore}
        />
      )}

      {page === "my-opportunities" && (
        <MyOpportunities
          onExplore={goExplore}
          darkMode={darkMode}
        />
      )}

    </div>
  );
}

export default App;