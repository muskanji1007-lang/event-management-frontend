import { useState } from "react";
import { forgotPassword, resetPassword } from "../services/api";

export default function OTPVerification({ onBack, onVerified }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const data = await forgotPassword(cleanEmail);
      setStep(2);
      setMessage(data.message || "OTP sent! Please check your email.");
    } catch (err) {
      setError(err.message || "Could not send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      const data = await resetPassword({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      });

      setMessage(data.message || "Password reset successfully.");
      alert("Password reset successfully! Please login with your new password.");
      
      if (onVerified) {
        onVerified();
      } else if (onBack) {
        onBack();
      }
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F2] px-4 py-10 dark:bg-[#0F1210]">
      <section className="w-full max-w-md rounded-2xl border border-[#D9DCD6] bg-white p-6 shadow-sm sm:p-8 dark:border-[#303630] dark:bg-[#1B1F1C]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F4D3F] text-2xl text-white dark:bg-[#8FD3B0] dark:text-[#0F1210]">
            🔒
          </div>

          <h1 className="text-2xl font-bold text-[#1E1E1C] dark:text-[#F1F3EF]">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-[#6B6F6B] dark:text-[#9A9F9A]">
            {step === 1
              ? "Enter your email to receive a password reset OTP."
              : `Enter the OTP sent to ${email} and your new password.`}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#1E1E1C] dark:text-[#F1F3EF]"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
                className="w-full rounded-lg border border-[#D9DCD6] bg-[#F5F5F2] px-4 py-3 text-sm outline-none focus:border-[#1F4D3F] disabled:opacity-60 dark:border-[#303630] dark:bg-[#202420] dark:focus:border-[#8FD3B0]"
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
              {loading ? "Sending..." : "Send OTP"}
            </button>
            
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className="w-full rounded-lg border border-[#D9DCD6] px-4 py-3 font-medium text-[#1E1E1C] hover:bg-[#F5F5F2] disabled:opacity-60 dark:border-[#303630] dark:text-[#F1F3EF] dark:hover:bg-[#202420]"
            >
              Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {message && (
              <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {message}
              </p>
            )}

            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-[#1E1E1C] dark:text-[#F1F3EF]"
              >
                6-digit OTP
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="000000"
                required
                className="w-full rounded-lg border border-[#D9DCD6] bg-[#F5F5F2] px-4 py-3 text-center text-xl tracking-[0.4em] outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:focus:border-[#8FD3B0]"
              />
            </div>
            
            <div>
              <label
                htmlFor="new-password"
                className="mb-2 block text-sm font-medium text-[#1E1E1C] dark:text-[#F1F3EF]"
              >
                New Password
              </label>

              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
                required
                className="w-full rounded-lg border border-[#D9DCD6] bg-[#F5F5F2] px-4 py-3 text-sm outline-none focus:border-[#1F4D3F] dark:border-[#303630] dark:bg-[#202420] dark:focus:border-[#8FD3B0]"
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
              className="w-full rounded-lg bg-[#D9673B] px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setStep(1);
                setOtp("");
                setNewPassword("");
                setMessage("");
                setError("");
              }}
              className="w-full rounded-lg border border-[#D9DCD6] px-4 py-3 font-medium text-[#1E1E1C] hover:bg-[#F5F5F2] disabled:opacity-60 dark:border-[#303630] dark:text-[#F1F3EF] dark:hover:bg-[#202420]"
            >
              Change Email / Send Again
            </button>
            
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className="w-full text-sm font-medium text-[#1F4D3F] hover:underline dark:text-[#8FD3B0]"
            >
              Cancel
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
