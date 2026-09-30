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
  GitBranch,
  Code2,
  CheckCircle2,
} from "lucide-react";

function Profile() {
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
    "AI / ML",
    "Open Source",
    "Competitions",
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      

      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] font-bold text-[var(--text)]">
              <div>
  <img
  src="/opportunity-logo.jpeg"
  alt="Opportunity Hub Logo"
  className="w-10 h-10 object-contain"
/>
</div>
            </div>

            <h1 className="font-bold">
              Opportunity Hub
            </h1>
          </div>


          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#" className="hover:text-[var(--accent)]">
              Home
            </a>

            <a href="#" className="hover:text-[var(--accent)]">
              Explore
            </a>

            <a href="#" className="hover:text-[var(--accent)]">
              My Opportunities
            </a>
          </nav>


          <div className="flex items-center gap-3">

            <button className="rounded-full p-2 hover:bg-[var(--surface-soft)]">
              <Bell size={18} />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gold)] font-bold">
              MG
            </div>

          </div>

        </div>
      </header>


      

      <main className="mx-auto max-w-7xl px-6 py-8">

        

        <div className="mb-8">

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Student Profile
          </p>

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-bold">
                Profile & Preferences
              </h2>

              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Manage your profile, skills and interests.
              </p>
            </div>

            <span className="hidden rounded-full bg-[var(--primary)]/30 px-4 py-2 text-xs font-semibold md:block">
              Student Profile
            </span>

          </div>

        </div>


        

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">


    

          <div className="space-y-6">


          

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-xl font-bold text-[var(--text)]">
                  MG
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-bold">
                      Muskan Gupta
                    </h3>

                    <CheckCircle2
                      size={16}
                      className="text-[var(--accent)]"
                    />

                  </div>

                  <p className="text-sm text-[var(--text-muted)]">
                    CSE - Data Science
                  </p>

                </div>

              </div>


              <div className="mt-6 space-y-3 text-sm">

                <div className="flex items-center gap-3">
                  <GraduationCap size={17} />
                  <span>2nd Year, B.Tech CSE</span>
                </div>

                <div className="flex items-center gap-3">
                  <UserRound size={17} />
                  <span>AKGEC</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={17} />
                  <span className="break-all">
                    muskan@example.com
                  </span>
                </div>

              </div>


    

              <div className="mt-6 grid grid-cols-2 gap-3">

                <button className="flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-[var(--text)] transition hover:opacity-90">

                  <Pencil size={15} />

                  Edit

                </button>


                <button className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-semibold transition hover:bg-[var(--surface-soft)]">

                  <Share2 size={15} />

                  Share

                </button>

              </div>

            </section>


          

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold">
                  Profile Strength
                </h3>

                <span className="font-bold text-[var(--accent)]">
                  80%
                </span>

              </div>


              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]">

                <div
                  className="h-full rounded-full bg-[var(--primary)]"
                  style={{ width: "80%" }}
                />

              </div>


              <p className="mt-4 text-xs leading-5 text-[var(--text-muted)]">
                Complete your profile to get more relevant opportunities.
              </p>

            </section>


        

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

              <h3 className="font-semibold">
                Notifications
              </h3>

              <div className="mt-4 flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium">
                    Opportunity Alerts
                  </p>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Get updates about new opportunities.
                  </p>

                </div>

                <div className="h-6 w-11 rounded-full bg-[var(--primary)] p-1">

                  <div className="h-4 w-4 translate-x-5 rounded-full bg-white" />

                </div>

              </div>

              <button className="mt-6 flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                <LogOut size={16} />
                Log out
              </button>

            </section>

          </div>


          

          <div className="space-y-6">


        

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-bold">
                    My Skills
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Skills you want to use for opportunities.
                  </p>

                </div>

                <button className="text-sm font-semibold text-[var(--accent)]">
                  Edit Skills →
                </button>

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


                <button className="flex items-center gap-1 rounded-full border border-dashed border-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--accent)]">

                  <Plus size={14} />

                  Add Skill

                </button>

              </div>

            </section>


        

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-bold">
                    My Interests
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Select topics you are interested in.
                  </p>

                </div>

                <button className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold hover:bg-[var(--surface-soft)]">
                  + Add Interest
                </button>

              </div>


              <div className="mt-5 flex flex-wrap gap-2">

                {interests.map((interest) => (

                  <span
                    key={interest}
                    className="rounded-full bg-[var(--primary)]/25 px-3 py-2 text-xs font-medium"
                  >
                    # {interest}
                  </span>

                ))}

              </div>

            </section>


      

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-bold">
                    Profile Verification
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Connect your profiles if you want to.
                  </p>

                </div>

                <span className="rounded-full bg-[var(--gold)]/25 px-3 py-1 text-xs font-semibold">
                  Optional
                </span>

              </div>


              <div className="mt-5 grid gap-4 md:grid-cols-2">


                

                <div className="rounded-xl border border-[var(--border)] p-4">

                  <div className="flex items-center justify-between">

                    <GitBranch size={18} />

                    <span className="text-xs text-[var(--accent)]">
                      Not Connected
                    </span>

                  </div>

                  <h4 className="mt-4 font-semibold">
                    GitHub
                  </h4>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Add your GitHub profile.
                  </p>

                  <button className="mt-4 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold">
                    Connect
                  </button>

                </div>


          

                <div className="rounded-xl border border-[var(--border)] p-4">

                  <div className="flex items-center justify-between">

                    <Code2 size={20} />

                    <span className="text-xs text-[var(--accent)]">
                      Optional
                    </span>

                  </div>

                  <h4 className="mt-4 font-semibold">
                    Coding Profile
                  </h4>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Add a coding platform profile.
                  </p>

                  <button className="mt-4 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold">
                    Add Profile
                  </button>

                </div>

              </div>

            </section>


            

            <section className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold)]/25">

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


              <button className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--text)]">
                View Saved
              </button>

            </section>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;