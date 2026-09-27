import { useState } from "react";

import Splash from "./components/Splash";
import Onboarding from "./components/Onboarding";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Skills from "./components/Skills";
import Interests from "./components/Interests";

function App() {
  const [screen, setScreen] = useState("splash");

  return (
    <>
      {screen === "splash" && (
        <Splash onFinish={() => setScreen("onboarding")} />
      )}

      {screen === "onboarding" && (
        <Onboarding onFinish={() => setScreen("login")} />
      )}

      {screen === "login" && (
        <Login
          onSignup={() => setScreen("signup")}
          onLogin={() => setScreen("skills")}
        />
      )}

      {screen === "signup" && (
        <Signup
          onLogin={() => setScreen("login")}
          onSignup={() => setScreen("skills")}
        />
      )}

      {screen === "skills" && (
        <Skills onNext={() => setScreen("interests")} />
      )}

      {screen === "interests" && (
        <Interests onNext={() => setScreen("home")} />
      )}
    </>
  );
}

export default App;