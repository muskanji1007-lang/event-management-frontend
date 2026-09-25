import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {showSignup ? (
        <Signup onLogin={() => setShowSignup(false)} />
      ) : (
        <Login onSignup={() => setShowSignup(true)} />
      )}
    </>
  );
}

export default App;