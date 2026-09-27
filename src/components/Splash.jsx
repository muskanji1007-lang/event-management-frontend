import { useEffect } from "react";
import logo from "../assets/opportunity-logo.jpeg";

function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#050b1a] text-white">


      <img
        src={logo}
        alt="Opportunity Hub"
        className="mb-5 h-24 w-24 object-contain"
      />

      
      <h1 className="text-3xl font-bold">
        Opportunity <span className="text-cyan-400">Hub</span>
      </h1>

    
      <p className="mt-3 text-sm tracking-wider text-gray-300">
        Discover • Apply • Grow
      </p>

    
      <div className="absolute -bottom-16 left-[-10%] h-40 w-[120%] rounded-[50%] bg-cyan-400/70" />

      <div className="absolute -bottom-24 left-[-10%] h-40 w-[120%] rounded-[50%] bg-blue-500/50" />

    </div>
  );
}

export default Splash;