import { useState } from "react";

function Signup({ onLogin, onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (onSignup) {
      onSignup();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F2] px-4 dark:bg-[#0F1210]">

      <div className="w-full max-w-md rounded-2xl border border-[#DADAD4] bg-[#EEEEEB] p-8 shadow-sm dark:border-[#303630] dark:bg-[#1B1F1C]">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-[#1F4D3F] dark:text-[#8FD3B0]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-[#6B6F6B] dark:text-[#9A9F9A]">
            Join Opportunity Hub today
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>

            <label className="mb-2 block text-sm font-medium text-[#1E1E1C] dark:text-[#F1F3EF]">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-sm text-[#1E1E1C] outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:text-[#F1F3EF] dark:focus:border-[#8FD3B0]"
            />

          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-sm text-[#1E1E1C] outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:text-[#F1F3EF] dark:focus:border-[#8FD3B0]"
            />

          </div>

    
          <button
            type="submit"
            className="w-full rounded-lg bg-[#1F4D3F] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-[#8FD3B0] dark:text-[#0F1210]"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-[#6B6F6B] dark:text-[#9A9F9A]">

          Already have an account?{" "}

          <button
            type="button"
            onClick={onLogin}
            className="font-semibold text-[#1F4D3F] hover:underline dark:text-[#8FD3B0]"
          >
            Login
          </button>

        </p>

      </div>

    </div>
  );
}

export default Signup;