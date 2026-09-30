import Navbar from "../../../components/Navbar";

function OpportunityDetails() {
  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#1E1E1C]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-5">


        <button
          type="button"
          className="mb-5 text-xs text-[#5F625F] hover:text-[#1F4D3F]"
        >
          ← Back to Explore
        </button>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_310px]">

        
          <div>

          
            <section className="overflow-hidden rounded-xl border border-[#DADAD4] bg-white">

              <div className="relative h-56 overflow-hidden bg-[#1F4D3F]">
                <img
                  src="/src/assets/home page.jpeg"
                  alt="Hackathon"
                  className="h-full w-full object-cover opacity-80"
                />

                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="rounded-md bg-[#E8B84A] px-2 py-1 text-[9px] font-semibold">
                    Hackathon 2026
                  </span>

                  <span className="rounded-md bg-[#1F4D3F] px-2 py-1 text-[9px] text-white">
                    Sprint Challenge
                  </span>

                  <span className="rounded-md bg-[#1F4D3F] px-2 py-1 text-[9px] text-white">
                    Verified Campus Partner
                  </span>
                </div>
              </div>

              <div className="p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-[9px] text-[#6B6F6B]">
                    AKGEC  • Innovation Cell
                    </p>

                    <h1 className="mt-2 text-2xl font-semibold text-[#1E1E1C]">
                      AI Innovation Hackathon 2026
                    </h1>

                   
                  </div>

                  <span className="text-[9px] text-[#6B6F6B]">
                    👁 1,840 views this week
                  </span>

                </div>

              </div>

            </section>




        
            <section className="mt-4 rounded-xl border border-[#DADAD4] bg-white p-5">

              <h2 className="text-sm font-semibold">
                ◉ About the Sprint
              </h2>

              <p className="mt-3 text-[10px] leading-5 text-[#5F625F]">
                The AI Innovation Hackathon 2026 is an intensive virtual
                build sprint designed for collegiate problem solvers,
                software developers and researchers.
              </p>

              <p className="mt-3 text-[10px] leading-5 text-[#5F625F]">
                Teams will receive real-world challenges and work together
                to design, develop and present practical solutions.
              </p>

            </section>

          
            <section className="mt-4 rounded-xl border border-[#DADAD4] bg-white p-5">

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">
                  ⚙ Challenge Tracks
                </h2>

                <span className="text-[9px] text-[#6B6F6B]">
                  Select 1 Track for Submission
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">

                <div className="rounded-lg bg-[#F1F1ED] p-3">
                  <p className="text-[9px] font-semibold text-[#1F4D3F]">
                    TRACK 01
                  </p>

                  <h3 className="mt-2 text-xs font-semibold">
                    Smart Campus Energy
                  </h3>

                  <p className="mt-2 text-[9px] leading-4 text-[#6B6F6B]">
                    Forecasting and managing campus energy demand.
                  </p>
                </div>

                <div className="rounded-lg bg-[#F1F1ED] p-3">
                  <p className="text-[9px] font-semibold text-[#1F4D3F]">
                    TRACK 02
                  </p>

                  <h3 className="mt-2 text-xs font-semibold">
                    Urban Transit Dynamic Fleet Routing
                  </h3>

                  <p className="mt-2 text-[9px] leading-4 text-[#6B6F6B]">
                    Optimize transportation using intelligent routing.
                  </p>
                </div>

                <div className="rounded-lg bg-[#F1F1ED] p-3">
                  <p className="text-[9px] font-semibold text-[#1F4D3F]">
                    TRACK 03
                  </p>

                  <h3 className="mt-2 text-xs font-semibold">
                    Flood & Disaster Drone Mapping
                  </h3>

                  <p className="mt-2 text-[9px] leading-4 text-[#6B6F6B]">
                    Use technology to support disaster response.
                  </p>
                </div>

              </div>

            </section>

      
            <section className="mt-4 rounded-xl border border-[#DADAD4] bg-white p-5">

              <div className="flex items-center justify-between">

                <h2 className="text-sm font-semibold">
                  ◉ Required & Recommended Skills
                </h2>

                <span className="text-[9px] text-[#6B6F6B]">
                  Matched against your profile
                </span>

              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                {[
                  "Python",
                  "Machine Learning",
                  "Problem Solving",
                  "Git",
                  "FastAPI",
                  "Strong Match",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-[#F1F1ED] px-2.5 py-1.5 text-[9px] text-[#5F625F]"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </section>

        
            <section className="mt-4 rounded-xl border border-[#DADAD4] bg-white p-5">

              <h2 className="text-sm font-semibold">
                ▣ Format, Schedule & Venue
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">

                <div>
                  <p className="text-[9px] text-[#6B6F6B]">
                    DATE & TIME
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    Oct 18, 10:00 AM
                  </p>

                  <p className="mt-1 text-[9px] text-[#6B6F6B]">
                    Check-in opens at 9:30 AM
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-[#6B6F6B]">
                    FORMAT & VENUE
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    Online Sprint
                  </p>

                  <p className="mt-1 text-[9px] text-[#6B6F6B]">
                    Discord Workspace & Google Meet
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-[#6B6F6B]">
                    ELIGIBILITY
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    1st to 4th Year Undergrads
                  </p>

                  <p className="mt-1 text-[9px] text-[#6B6F6B]">
                    Open to all Computer Science students
                  </p>
                </div>

              </div>

            </section>

          </div>

    
          <aside className="h-fit rounded-xl border border-[#DADAD4] bg-white p-5">

            <div className="flex items-center justify-between">

              <h2 className="text-xs font-semibold">
                STUDENT ALIGNMENT
              </h2>

              <span className="text-[9px] text-[#1F4D3F]">
                ✓ Verified Fit
              </span>

            </div>
            <div className="mt-5 flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#8FD3B0]">
                <span className="text-lg font-bold">
                  92%
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold">
                  High Match Score
                </p>

                <p className="mt-1 text-[9px] leading-4 text-[#6B6F6B]">
                  Computed from your profile,
                  skills and eligibility.
                </p>
              </div>

            </div>
            <div className="mt-5 space-y-3">

              <div className="flex justify-between text-[10px]">
                <span>Python Proficiency</span>
                <span className="text-[#1F4D3F]">96%</span>
              </div>

              <div className="flex justify-between text-[10px]">
                <span>Machine Learning</span>
                <span className="text-[#1F4D3F]">90%</span>
              </div>

              <div className="flex justify-between text-[10px]">
                <span>Problem Solving</span>
                <span className="text-[#1F4D3F]">80%</span>
              </div>

              <div className="flex justify-between text-[10px]">
                <span>Eligibility</span>
                <span className="text-[#1F4D3F]">Eligible</span>
              </div>

            </div>

            <div className="my-5 border-t border-[#EEEEEB]" />

          
            <h3 className="text-xs font-semibold">
              PROGRAM SNAPSHOT
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-4">

              <div>
                <p className="text-[9px] text-[#6B6F6B]">
                  Participation Fee
                </p>
                <p className="mt-1 text-xs font-semibold">
                  Free
                </p>
              </div>

              <div>
                <p className="text-[9px] text-[#6B6F6B]">
                  Prize Pool
                </p>
                <p className="mt-1 text-xs font-semibold">
                  ₹1,50,000
                </p>
              </div>

              <div>
                <p className="text-[9px] text-[#6B6F6B]">
                  Team Size
                </p>
                <p className="mt-1 text-xs font-semibold">
                  2–4 Members
                </p>
              </div>

              <div>
                <p className="text-[9px] text-[#6B6F6B]">
                  Registered
                </p>
                <p className="mt-1 text-xs font-semibold">
                  342 Registered
                </p>
              </div>

            </div>

    
            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-[#1F4D3F] px-4 py-3 text-xs font-semibold text-white hover:bg-[#173B31]"
            >
              Register Now →
            </button>

    
            <div className="mt-3 grid grid-cols-2 gap-2">

              <button
                type="button"
                className="rounded-lg border border-[#DADAD4] px-3 py-2 text-[10px]"
              >
                ♡ Save
              </button>

              <button
                type="button"
                className="rounded-lg border border-[#DADAD4] px-3 py-2 text-[10px]"
              >
                ↗ Share Link
              </button>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default OpportunityDetails;