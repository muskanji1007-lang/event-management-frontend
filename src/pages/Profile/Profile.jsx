import {
  UserRound,
  GraduationCap,
  Mail,
  Pencil,
  Share2,
  Plus,
  Bell,
  LogOut,
  Bookmark,
} from "lucide-react";

function Profile({ onExplore }) {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "C++",
    "Git",
  ];

  const interests = [
    "Hackathons",
    "Web Development",
    "Open Source",
    "Competitions",
  ];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <div className="mb-7">

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Student Profile
          </p>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Profile & Preferences
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
                  MG
                </div>

                <div className="min-w-0">

                  <h2 className="font-bold">
                    Muskan Gupta
                  </h2>

                  <p className="text-sm text-[var(--text-muted)]">
                    CSE - Data Science
                  </p>

                </div>

              </div>

              <div className="mt-6 space-y-3 text-sm">

                <div className="flex items-start gap-3">
                  <GraduationCap size={17} className="mt-0.5 shrink-0" />
                  <span>2nd Year, B.Tech CSE</span>
                </div>

                <div className="flex items-start gap-3">
                  <UserRound size={17} className="mt-0.5 shrink-0" />
                  <span>AKGEC</span>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0" />
                  <span className="break-all">
                    muskanji1007@gmail.com
                  </span>
                </div>

              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => alert("Edit profile coming next.")}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-white"
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => alert("Profile link copied.")}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-semibold"
                >
                  <Share2 size={15} />
                  Share
                </button>

              </div>

            </section>

            <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

              <h3 className="font-semibold">
                Notifications
              </h3>

              <div className="mt-4 flex items-center justify-between gap-4">

                <div>
                  <p className="text-sm font-medium">
                    Opportunity Alerts
                  </p>

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
                onClick={() => alert("Logged out.")}
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
                <h3 className="text-lg font-bold">
                  My Skills
                </h3>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Skills you want to use for opportunities.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}

                <button
                  type="button"
                  onClick={() => alert("Add skill.")}
                  className="flex items-center gap-1 rounded-full border border-dashed border-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--accent)]"
                >
                  <Plus size={14} />
                  Add Skill
                </button>

              </div>

            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h3 className="text-lg font-bold">
                    My Interests
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Topics you are interested in.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => alert("Add interest.")}
                  className="w-fit rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold"
                >
                  + Add Interest
                </button>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-[var(--primary)]/20 px-3 py-2 text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}

              </div>

            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--highlight)]/25">
                  <Bookmark size={19} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Saved Opportunities
                  </h3>

                  <p className="text-xs text-[var(--text-muted)]">
                    View opportunities you saved.
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

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;