import { useEffect, useState } from "react";
import {
  UserRound,
  GraduationCap,
  Mail,
  Plus,
  Bell,
  LogOut,
  Bookmark,
  Loader2,
} from "lucide-react";
import { getUserProfile, updateUserSkills } from "../../services/api";

function Profile({ onExplore }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [skillInput, setSkillInput] = useState("");
  const [savingSkills, setSavingSkills] = useState(false);
  const [skillMessage, setSkillMessage] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUserProfile();
      setUser(data.user);
    } catch (err) {
      setError(err.message || "Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAddSkill = async () => {
    const skill = skillInput.trim();
    if (!skill) return;

    const currentSkills = user?.skills || [];
    if (currentSkills.includes(skill)) {
      setSkillMessage("Skill already added.");
      return;
    }

    const updatedSkills = [...currentSkills, skill];
    setSavingSkills(true);
    setSkillMessage("");

    try {
      const data = await updateUserSkills(updatedSkills);
      setUser((prev) => ({ ...prev, skills: data.skills || updatedSkills }));
      setSkillInput("");
      setSkillMessage("Skill added!");
    } catch (err) {
      setSkillMessage(err.message || "Unable to update skills.");
    } finally {
      setSavingSkills(false);
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    const updatedSkills = (user?.skills || []).filter(
      (s) => s !== skillToRemove
    );
    setSavingSkills(true);
    setSkillMessage("");

    try {
      const data = await updateUserSkills(updatedSkills);
      setUser((prev) => ({ ...prev, skills: data.skills || updatedSkills }));
    } catch (err) {
      setSkillMessage(err.message || "Unable to update skills.");
    } finally {
      setSavingSkills(false);
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const { logoutUser } = await import("../../services/api");
        await logoutUser(refreshToken);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-3 text-[var(--text-muted)]">
          <Loader2 size={32} className="animate-spin" />
          <p className="text-sm">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">{error}</p>
          <button
            type="button"
            onClick={fetchProfile}
            className="mt-4 rounded-lg bg-[#1F4D3F] px-4 py-2 text-sm text-white"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  const initials = (user?.name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const skills = user?.skills || [];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Student Profile
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Profile &amp; Preferences
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Manage your profile, skills and interests.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">

          <div>
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xl font-bold text-white">
                  {initials}
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold truncate">{user?.name || "—"}</h2>
                  <span className="mt-1 inline-block rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--primary)]">
                    {user?.role || "USER"}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <GraduationCap size={17} className="mt-0.5 shrink-0" />
                  <span>{user?.role === "USER" ? "Student" : user?.role}</span>
                </div>

                <div className="flex items-start gap-3">
                  <UserRound size={17} className="mt-0.5 shrink-0" />
                  <span>Opportunity Hub Member</span>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0" />
                  <span className="break-all">{user?.email || "—"}</span>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="font-semibold">Notifications</h3>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Opportunity Alerts</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Get updates about new opportunities.
                  </p>
                </div>

                <div className="h-6 w-11 shrink-0 rounded-full bg-[var(--primary)] p-1">
                  <div className="h-4 w-4 translate-x-5 rounded-full bg-white" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-6 flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
              >
                <LogOut size={16} />
                Log out
              </button>
            </section>
          </div>

          <div className="space-y-6">

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
              <div>
                <h3 className="text-lg font-bold">My Skills</h3>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Skills you want to use for opportunities.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="group flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 text-xs font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-[var(--text-muted)] hover:text-red-500"
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </span>
                ))}

                {skills.length === 0 && (
                  <p className="text-xs text-[var(--text-muted)]">
                    No skills added yet.
                  </p>
                )}
              </div>

              {/* Add skill input */}
              <div className="mt-4 flex flex-wrap gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  placeholder="Type a skill and press Enter"
                  className="rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-xs outline-none focus:border-[var(--primary)]"
                  disabled={savingSkills}
                />

                <button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={savingSkills || !skillInput.trim()}
                  className="flex items-center gap-1 rounded-full border border-dashed border-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--accent)] disabled:opacity-50"
                >
                  <Plus size={14} />
                  {savingSkills ? "Saving..." : "Add Skill"}
                </button>
              </div>

              {skillMessage && (
                <p className="mt-2 text-xs text-[var(--primary)]">
                  {skillMessage}
                </p>
              )}
            </section>

            {/* Saved opportunities shortcut */}
            <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--highlight)]/25">
                  <Bookmark size={19} />
                </div>

                <div>
                  <h3 className="font-semibold">Saved Opportunities</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {user?.savedOpportunities?.length ?? 0} saved
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onExplore}
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
              >
                View Opportunities
              </button>
            </section>

            {/* Account stats */}
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="font-semibold">Account Info</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Member since</dt>
                  <dd>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Role</dt>
                  <dd>{user?.role || "USER"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Saved opportunities</dt>
                  <dd>{user?.savedOpportunities?.length ?? 0}</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;