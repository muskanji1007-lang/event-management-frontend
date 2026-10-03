import { useState } from "react";
import logo from "../../../assets/opportunity-logo.jpeg";
import { loginUser } from "../../../services/api";

function Login({ onSignup, onLogin }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
setError("");


const cleanEmail = email.trim().toLowerCase();

if (!cleanEmail || !password) {
  setError("Please enter your email and password.");
  return;
}

try {
  setLoading(true);

  const data = await loginUser({
    email: cleanEmail,
    password,
  });

  if (!data.accessToken || !data.user) {
    throw new Error("Invalid login response from server.");
  }

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("isLoggedIn", "true");

  if (onLogin) {
    onLogin(data.user);
  }
} catch (err) {
  setError(err.message || "Login failed. Please try again.");
} finally {
  setLoading(false);
}


};

return ( <main className="auth-page min-h-screen bg-[#F5F5F2] text-[#1E1E1C] dark:bg-[#0F1210] dark:text-[#F1F3EF]"> <div className="auth-layout grid min-h-screen grid-cols-1 lg:grid-cols-2">

    
    <section className="flex min-w-0 flex-col justify-center bg-[#1F4D3F] px-6 py-12 text-[#F5F5F2] sm:px-12 lg:min-h-screen lg:px-10 xl:px-16">
      <div className="mx-auto w-full max-w-xl">

        <div className="mb-8 flex items-center gap-3 sm:mb-10">
          <img
            src={logo}
            alt="Opportunity Hub logo"
            className="h-12 w-12 rounded-lg bg-[#F5F5F2] p-1 object-contain"
          />

          <span className="text-xl font-bold">
            Opportunity Hub
          </span>
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#E8B84A]">
          Discover. Participate. Grow.
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl">
          Your next opportunity starts here.
        </h1>

        <p className="mt-5 max-w-lg text-base leading-7 text-[#F5F5F2]/80 sm:text-lg">
          Explore events, competitions, workshops and
          internships that help you learn new skills and
          connect with people.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm sm:text-base">
          <span className="rounded-full border border-[#F5F5F2]/30 px-5 py-3">
            Events
          </span>

          <span className="rounded-full border border-[#F5F5F2]/30 px-5 py-3">
            Workshops
          </span>

          <span className="rounded-full border border-[#F5F5F2]/30 px-5 py-3">
            Competitions
          </span>
        </div>

      </div>
    </section>

    
    <section className="flex min-w-0 items-center justify-center px-4 py-10 sm:px-8 lg:min-h-screen lg:px-8 xl:px-12">
      <div className="w-full max-w-md rounded-2xl border border-[#DADAD4] bg-[#EEEEEB] p-6 shadow-sm sm:p-9 dark:border-[#303630] dark:bg-[#1B1F1C]">

        <div className="mb-7 text-center">
          <div className="mb-4 flex justify-center lg:hidden">
            <img
              src={logo}
              alt="Opportunity Hub logo"
              className="h-14 w-14 rounded-lg bg-[#F5F5F2] p-1 object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold sm:text-3xl">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-[#6B6F6B] dark:text-[#9A9F9A]">
            Login to continue exploring opportunities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-medium"
            >
              Email address
            </label>

            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-sm outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:focus:border-[#8FD3B0]"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-sm outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:focus:border-[#8FD3B0]"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-[#D9673B] px-3 py-2 text-sm text-[#D9673B]"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1F4D3F] px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#8FD3B0] dark:text-[#0F1210]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B6F6B] dark:text-[#9A9F9A]">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={onSignup}
            className="font-semibold text-[#1F4D3F] hover:underline dark:text-[#8FD3B0]"
          >
            Sign up
          </button>
        </p>

      </div>
    </section>

  </div>
</main>


);
}

export default Login;
