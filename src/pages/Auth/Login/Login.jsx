import { useState } from "react";
import logo from "../../../assets/opportunity-logo.jpeg";

function Login({ onSignup, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("opportunityUser")
    );

    if (!savedUser) {
      alert("No account found. Please Sign Up first.");
      return;
    }

    if (
      savedUser.email !== email ||
      savedUser.password !== password
    ) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F2] px-4 dark:bg-[#0F1210]">
      <div className="w-full max-w-md rounded-2xl border border-[#DADAD4] bg-[#EEEEEB] p-8 shadow-sm dark:border-[#303630] dark:bg-[#1B1F1C]">

        <div className="mb-4 flex justify-center">
          <img
            src={logo}
            alt="Opportunity Hub Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1F4D3F] dark:text-[#8FD3B0]">
            Opportunity Hub
          </h1>

          <p className="mt-2 text-sm text-[#6B6F6B] dark:text-[#9A9F9A]">
            Login to discover new opportunities
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1E1E1C] dark:text-[#F1F3EF]">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-sm text-[#1E1E1C] outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:text-[#F1F3EF] dark:focus:border-[#8FD3B0]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1E1E1C] dark:text-[#F1F3EF]">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-sm text-[#1E1E1C] outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:text-[#F1F3EF] dark:focus:border-[#8FD3B0]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#1F4D3F] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-[#8FD3B0] dark:text-[#0F1210]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B6F6B] dark:text-[#9A9F9A]">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSignup}
            className="font-semibold text-[#1F4D3F] hover:underline dark:text-[#8FD3B0]"
          >
            Sign Up
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;