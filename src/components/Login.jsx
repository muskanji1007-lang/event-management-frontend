import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Apple,
} from "lucide-react";
import { useState } from "react";

function Login({ onSignup, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <div className="min-h-screen bg-[#070f1d] px-5 py-8 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center">
        
        
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 shadow-[0_0_30px_rgba(37,99,235,0.45)]">
              <div className="flex h-full items-center justify-center text-3xl">
                ➤
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">
            Opportunity <span className="text-blue-500">Hub</span>
          </h1>
        </div>


        <div className="mb-7">
          <h2 className="text-3xl  text-center font-bold">Welcome Back</h2>

          <p className="mt-3 text-base text-center text-gray-400">
            Login to continue or create a new account
          </p>
        </div>

      
        <div className="mb-6 flex rounded-full border border-gray-600 p-0.5">
          <button className="w-1/2 rounded-full bg-blue-600 py-3.5 text-lg font-semibold">
            Login
          </button>

          <button
            onClick={onSignup}
            className="w-1/2 rounded-full py-3.5 text-lg font-semibold text-gray-400 transition hover:text-white"
          >
            Sign Up
          </button>
        </div>

        
        <div className="mb-4 flex items-center rounded-xl border border-gray-700 bg-[#111d2d] px-4">
          <Mail className="mr-4 text-gray-400" size={25} />

          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-transparent py-4 text-base text-white outline-none placeholder:text-gray-500"
          />
        </div>

      
        <div className="mb-4 flex items-center rounded-xl border border-gray-700 bg-[#111d2d] px-4">
          <Lock className="mr-4 text-gray-400" size={25} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent py-4 text-base text-white outline-none placeholder:text-gray-500"
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400"
          >
            {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
          </button>
        </div>

        
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setRemember(!remember)}
            className="flex items-center gap-2 text-sm text-white"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                remember ? "bg-blue-600" : "border border-gray-600"
              }`}
            >
              {remember && <Check size={18} />}
            </span>

            Remember Password
          </button>

          <button className="text-sm text-blue-500 hover:text-blue-400">
            Forgot password?
          </button>
        </div>

      
        <button
  onClick={onLogin}
  className="mb-6 w-full rounded-full bg-blue-600 py-4 text-lg font-semibold transition hover:bg-blue-700"
>
  Login
</button>

      
        <div className="mb-5 text-center text-lg text-gray-400">
          or continue with
        </div>

      
        <button className="mb-4 flex w-full items-center justify-center gap-5 rounded-full border border-gray-600 py-4 text-base font-medium transition hover:bg-[#111d2d]">
          <span className="text-xl font-bold">G</span>
             Continue with Google
        </button>

  
        <button className="flex w-full items-center justify-center gap-5 rounded-full border border-gray-600 py-4 text-base font-medium transition hover:bg-[#111d2d]">
          <Apple size={23} />
          Continue with Apple
        </button>

      
        <p className="mt-7 text-center text-base text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={onSignup}
            className="font-semibold text-blue-500"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;