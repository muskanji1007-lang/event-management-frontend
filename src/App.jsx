import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Explore from "./pages/Explore/Explore";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import MyOpportunities from "./pages/Profile/MyOpportunities";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );
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

   

    console.log("Selected opportunity:", opportunity);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onHome={goHome}
        onExplore={goExplore}
        onMyOpportunities={goMyOpportunities}
        onProfile={goProfile}
      />

      {page === "explore" && (
        <Explore
          onViewDetails={openDetails}
        />
      )}

      {page === "profile" && (
        <Profile
          onExplore={goExplore}
        />
      )}

     {page === "home" && ( 
  <Home
    onExplore={goExplore}
    onMyOpportunities={goMyOpportunities}
    darkMode={darkMode}
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