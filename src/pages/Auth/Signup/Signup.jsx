import { useState } from "react";
import logo from "../../../assets/opportunity-logo.jpeg";
import { signupUser, sendOTP, verifyOTP } from "../../../services/api";

function Signup({ onLogin, onSignup }) {
  const [step, setStep] = useState(1); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!cleanEmail || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      const data = await sendOTP(cleanEmail);
      setMessage(data.message || "OTP sent! Please check your email.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      await verifyOTP(email.trim().toLowerCase(), otp.trim());

      const signupData = await signupUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      });

      if (signupData.success) {
        alert("Account created successfully! Please login.");
        if (onSignup) {
          onSignup();
        } else if (onLogin) {
          onLogin();
        }
      }
    } catch (err) {
      setError(err.message || "Verification or Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page min-h-screen bg-[#F5F5F2] text-[#1E1E1C] dark:bg-[#0F1210] dark:text-[#F1F3EF]">
      <div className="auth-layout grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <section className="flex min-w-0 flex-col justify-center bg-[#1F4D3F] px-6 py-12 text-[#F5F5F2] sm:px-12 lg:min-h-screen lg:px-10 xl:px-16">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-8 flex items-center gap-3 sm:mb-10">
              <img
                src={logo}
                alt="Opportunity Hub logo"
                className="h-12 w-12 rounded-lg bg-[#F5F5F2] p-1 object-contain"
              />
              <span className="text-xl font-bold">Opportunity Hub</span>
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#E8B84A]">
              Your journey begins here
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl">
              Find opportunities. Build your future.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#F5F5F2]/80 sm:text-lg">
              Join a community where you can discover events, participate in
              competitions and explore new skills.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm sm:text-base">
              <span className="rounded-full border border-[#F5F5F2]/30 px-5 py-3">
                Discover
              </span>
              <span className="rounded-full border border-[#F5F5F2]/30 px-5 py-3">
                Participate
              </span>
              <span className="rounded-full border border-[#F5F5F2]/30 px-5 py-3">
                Grow
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
                {step === 1 ? "Create your account" : "Verify Email"}
              </h2>
              <p className="mt-2 text-sm text-[#6B6F6B] dark:text-[#9A9F9A]">
                {step === 1
                  ? "Sign up to discover new opportunities."
                  : `Enter the OTP sent to ${email}`}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="mb-2 block text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    minLength={2}
                    maxLength={100}
                    required
                    className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-sm outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:focus:border-[#8FD3B0]"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="mb-2 block text-sm font-medium">
                    Email address
                  </label>
                  <input
                    id="signup-email"
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
                  <label htmlFor="signup-role" className="mb-2 block text-sm font-medium">
                    I am signing up as
                  </label>
                  <select
                    id="signup-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-sm outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:focus:border-[#8FD3B0]"
                  >
                    <option value="USER">Student / User</option>
                    <option value="ORGANIZER">Organizer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="signup-password" className="mb-2 block text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    maxLength={128}
                    required
                    className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-sm outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:focus:border-[#8FD3B0]"
                  />
                </div>

                {error && (
                  <p role="alert" className="rounded-lg border border-[#D9673B] px-3 py-2 text-sm text-[#D9673B]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#1F4D3F] px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#8FD3B0] dark:text-[#0F1210]"
                >
                  {loading ? "Sending OTP..." : "Continue"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyAndSignup} className="space-y-4">
                {message && (
                  <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    {message}
                  </p>
                )}

                <div>
                  <label htmlFor="signup-otp" className="mb-2 block text-sm font-medium">
                    6-digit OTP
                  </label>
                  <input
                    id="signup-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    required
                    className="w-full rounded-lg border border-[#DADAD4] bg-[#F5F5F2] px-4 py-3 text-center text-xl tracking-[0.4em] outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:focus:border-[#8FD3B0]"
                  />
                </div>

                {error && (
                  <p role="alert" className="rounded-lg border border-[#D9673B] px-3 py-2 text-sm text-[#D9673B]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#1F4D3F] px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#8FD3B0] dark:text-[#0F1210]"
                >
                  {loading ? "Verifying..." : "Verify & Create Account"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError("");
                    setMessage("");
                  }}
                  className="w-full rounded-lg border border-[#DADAD4] px-4 py-3 font-semibold text-[#1E1E1C] hover:bg-[#F5F5F2] dark:border-[#303630] dark:text-[#F1F3EF] dark:hover:bg-[#202420]"
                >
                  Back
                </button>
              </form>
            )}

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
        </section>
      </div>
    </main>
  );
}

export default Signup;
