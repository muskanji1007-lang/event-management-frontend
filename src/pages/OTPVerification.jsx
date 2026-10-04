
import { useState } from "react";
import { sendOTP, verifyOTP } from "../services/api";

export default function OTPVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOTP = async (e) => {
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

      const data = await sendOTP(cleanEmail);

      setEmail(cleanEmail);
      setOtpSent(true);
      setMessage(data.message || "OTP sent. Please check your email.");
    } catch (err) {
      setError(err.message || "Could not send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyOTP(
        email.trim().toLowerCase(),
        otp.trim()
      );

      setMessage(data.message || "OTP verified successfully.");
    } catch (err) {
      setError(err.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F2] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-[#D9DCD6] bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F4D3F] text-2xl text-white">
            ✉
          </div>

          <h1 className="text-2xl font-bold text-[#1E1E1C]">
            Email Verification
          </h1>

          <p className="mt-2 text-sm text-[#6B6F6B]">
            Verify your email address using a one-time password.
          </p>
        </div>

        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#1E1E1C]"
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
              disabled={loading || otpSent}
              className="w-full rounded-lg border border-[#D9DCD6] px-4 py-3 text-[#1E1E1C] outline-none focus:border-[#1F4D3F] disabled:bg-gray-100"
            />
          </div>

          {!otpSent && (
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1F4D3F] px-4 py-3 font-semibold text-white transition hover:bg-[#183D32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          )}
        </form>

        {otpSent && (
          <form onSubmit={handleVerifyOTP} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-[#1E1E1C]"
              >
                Enter 6-digit OTP
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
                className="w-full rounded-lg border border-[#D9DCD6] px-4 py-3 text-center text-xl tracking-[0.4em] text-[#1E1E1C] outline-none focus:border-[#1F4D3F]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#D9673B] px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setOtp("");
                setOtpSent(false);
                setMessage("");
                setError("");
              }}
              className="w-full rounded-lg border border-[#D9DCD6] px-4 py-3 font-medium text-[#1E1E1C] hover:bg-[#F5F5F2] disabled:opacity-60"
            >
              Change Email / Send Again
            </button>
          </form>
        )}

        {message && (
          <p
            role="status"
            className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-800"
          >
            {message}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
      </section>
    </main>
  );
}
