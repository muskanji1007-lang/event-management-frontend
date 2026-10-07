import { useState, useEffect } from "react";
import { UserRound, Mail, ShieldCheck, KeyRound, Loader2, Building2, BarChart2 } from "lucide-react";
import { getUserProfile, getOrganizerAnalytics, changePassword } from "../../services/api";

export default function OrganizerProfile({ darkMode }) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passLoading, setPassLoading] = useState(false);
  const [passMessage, setPassMessage] = useState("");
  const [passError, setPassError] = useState("");

  const bg = darkMode ? "#202420" : "#ffffff";
  const border = darkMode ? "#303630" : "#DADAD4";
  const text = darkMode ? "#F5F5F2" : "#1E1E1C";
  const muted = darkMode ? "#9A9F9A" : "#6B6F6B";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([
          getUserProfile(),
          getOrganizerAnalytics()
        ]);
        
        if (profileRes.success) setUser(profileRes.user);
        if (statsRes.success) setStats(statsRes.data);
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassLoading(true);
    setPassMessage("");
    setPassError("");
    try {
      const res = await changePassword({ currentPassword, newPassword });
      setPassMessage(res.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPassError(err.message || "Failed to update password.");
    } finally {
      setPassLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1F4D3F]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      
      {/* HEADER SECTION */}
      <div 
        className="relative overflow-hidden rounded-3xl p-8 shadow-sm"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#1F4D3F] opacity-10 blur-3xl"></div>
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1F4D3F] text-[#8FD3B0] shadow-inner">
            <Building2 size={36} />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: text }}>
              {user?.name || "Organizer Name"}
            </h1>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium" style={{ color: muted }}>
              <ShieldCheck size={16} className="text-[#E8B84A]" />
              Verified Event Organizer
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* PERSONAL INFO */}
          <section className="rounded-3xl p-6 shadow-sm" style={{ background: bg, border: `1px solid ${border}` }}>
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold" style={{ color: text }}>
              <UserRound size={20} className="text-[#1F4D3F]" />
              Account Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: muted }}>Full Name</p>
                <p className="mt-1 font-medium" style={{ color: text }}>{user?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: muted }}>Email Address</p>
                <p className="mt-1 flex items-center gap-2 font-medium" style={{ color: text }}>
                  <Mail size={16} style={{ color: muted }} />
                  {user?.email || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: muted }}>Account Role</p>
                <p className="mt-1 inline-block rounded-full bg-[#E8B84A] px-3 py-1 text-xs font-bold text-[#1E1E1C]">
                  {user?.role || "ORGANIZER"}
                </p>
              </div>
            </div>
          </section>

          {/* ORGANIZER STATS */}
          <section className="rounded-3xl p-6 shadow-sm" style={{ background: bg, border: `1px solid ${border}` }}>
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold" style={{ color: text }}>
              <BarChart2 size={20} className="text-[#1F4D3F]" />
              Quick Analytics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl p-4" style={{ background: darkMode ? "#1B1F1C" : "#F9FAF9" }}>
                <p className="text-sm font-medium" style={{ color: muted }}>Events Hosted</p>
                <p className="mt-2 text-3xl font-bold" style={{ color: text }}>
                  {stats?.event_statistics?.approved || 0}
                </p>
              </div>
              <div className="rounded-2xl p-4" style={{ background: darkMode ? "#1B1F1C" : "#F9FAF9" }}>
                <p className="text-sm font-medium" style={{ color: muted }}>Total Platform Users</p>
                <p className="mt-2 text-3xl font-bold" style={{ color: text }}>
                  {stats?.platform_statistics?.total_users || 0}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* SECURITY / CHANGE PASSWORD */}
          <section className="rounded-3xl p-6 shadow-sm" style={{ background: bg, border: `1px solid ${border}` }}>
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold" style={{ color: text }}>
              <KeyRound size={20} className="text-[#1F4D3F]" />
              Security & Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium" style={{ color: text }}>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#1F4D3F]"
                  style={{ background: darkMode ? "#1B1F1C" : "#F9FAF9", border: `1px solid ${border}`, color: text }}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" style={{ color: text }}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#1F4D3F]"
                  style={{ background: darkMode ? "#1B1F1C" : "#F9FAF9", border: `1px solid ${border}`, color: text }}
                />
              </div>

              {passMessage && (
                <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {passMessage}
                </p>
              )}
              {passError && (
                <p className="rounded-lg border border-[#D9673B] p-3 text-sm text-[#D9673B]">
                  {passError}
                </p>
              )}

              <button
                type="submit"
                disabled={passLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F4D3F] px-4 py-3 font-semibold text-white transition hover:bg-[#16382E] disabled:opacity-50"
              >
                {passLoading && <Loader2 size={16} className="animate-spin" />}
                {passLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
