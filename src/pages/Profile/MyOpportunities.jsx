import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  Filter,
  Search,
  Trophy,
  Users,
} from "lucide-react";

function MyOpportunities({ onViewDetails }) {
  const [activeTab, setActiveTab] = useState("Registered");
  const [search, setSearch] = useState("");

  const opportunities = [
    {
      id: 1,
      status: "Confirmed Registration",
      organization: "Ministry of Education",
      title: "Smart India Hackathon 2026",
      date: "Oct 18–19, 2026",
      mode: "Hybrid / Grand Finale",
      tab: "Registered",
      type: "Hackathon",
      action: "Submission Portal",
      milestone: true,
    },
    {
      id: 2,
      status: "Under Review",
      organization: "Open Source Club",
      title: "GSOC Mentorship Workshop",
      date: "Oct 22, 4:00 PM – 6:30 PM",
      mode: "Google Meet",
      tab: "Upcoming",
      type: "Workshop",
      action: "View Application",
      milestone: false,
    },
    {
      id: 3,
      status: "Shortlisted for Round 2",
      organization: "Tata Group",
      title: "Tata Crucible Campus Quiz 2026",
      date: "Nov 04, 10:00 AM",
      mode: "Offline Arena",
      tab: "Upcoming",
      type: "Competition",
      action: "Download Admit Card",
      milestone: false,
    },
  ];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesTab =
        activeTab === "Registered"
          ? item.tab === "Registered"
          : activeTab === "Upcoming"
          ? item.tab === "Upcoming"
          : activeTab === "Completed"
          ? item.tab === "Completed"
          : item.tab === "Saved";

      const searchText = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.organization.toLowerCase().includes(searchText) ||
        item.type.toLowerCase().includes(searchText);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const handleAction = (action) => {
    if (action === "Submission Portal") {
      alert("Submission Portal will open here.");
      return;
    }

    if (action === "View Application") {
      alert("Application details will open here.");
      return;
    }

    if (action === "Download Admit Card") {
      alert("Admit Card download will start here.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1210] text-[#F5F5F2]">

      <div className="mx-auto min-h-screen max-w-[1180px] border-x border-[#5C5CFF] bg-[#0F1210]">

        
        <header className="border-b border-[#252925] px-5 py-3">
          <div className="flex items-center justify-between">


            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1F4D3F] text-[10px] font-bold text-[#8FD3B0]">
                OH
              </div>

              <span className="text-xs font-semibold text-[#F5F5F2]">
                Opportunity Hub
              </span>
            </div>


            <nav className="hidden items-center gap-6 text-[10px] text-[#8E948F] md:flex">
              <button
                type="button"
                className="transition hover:text-[#F5F5F2]"
              >
                Home
              </button>

              <button
                type="button"
                className="transition hover:text-[#F5F5F2]"
              >
                Explore
              </button>

              <button
                type="button"
                className="rounded-md bg-[#1F4D3F] px-3 py-1.5 text-[#8FD3B0]"
              >
                My Opportunities
              </button>
            </nav>

            
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-[#8E948F] hover:text-[#F5F5F2]"
              >
                <Bell size={14} />
              </button>

              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8FD3B0] text-[8px] font-bold text-[#0F1210]">
                  MG
                </div>

                <span className="hidden text-[9px] text-[#D7DBD7] sm:block">
                  Muskan G.
                </span>
              </div>
            </div>
          </div>
        </header>

        
        <main className="px-5 py-7">

          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-wider text-[#8FD3B0]">
                Student Workspace · Fall 2026
              </p>

              <h1 className="mt-1 text-2xl font-semibold text-[#F5F5F2]">
                My Opportunities
              </h1>

              <p className="mt-1 text-[9px] text-[#737A75]">
                Track your registrations, submission milestones, and saved
                items in one place.
              </p>
            </div>

            <div className="flex gap-2">
              <div className="rounded-lg bg-[#171B18] px-4 py-3">
                <p className="text-[7px] uppercase text-[#737A75]">
                  Active Tasks
                </p>

                <p className="mt-1 text-xs font-semibold text-[#8FD3B0]">
                  1 Pending
                </p>
              </div>

              <div className="rounded-lg bg-[#171B18] px-4 py-3">
                <p className="text-[7px] uppercase text-[#737A75]">
                  Next Deadline
                </p>

                <p className="mt-1 text-xs font-semibold text-[#F0805A]">
                  Oct 05
                </p>
              </div>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-7 flex flex-col gap-4 rounded-xl border border-[#4A2B20] bg-[#2A1913] p-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#4A2B20] text-[#F0805A]">
                !
              </div>

              <div>
                <p className="text-[8px] font-semibold uppercase text-[#F0805A]">
                  Urgent Action Required
                </p>

                <p className="mt-1 text-[10px] font-semibold text-[#F5F5F2]">
                  Smart India Hackathon 2026: Submit Team PPT &
                  Architecture diagram
                </p>

                <p className="mt-1 text-[8px] text-[#9B8178]">
                  Failure to submit architecture document before milestone
                  closes may impact your eligibility.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAction("Submission Portal")}
              className="flex items-center justify-center gap-2 rounded-md bg-[#F7B49B] px-4 py-2 text-[8px] font-semibold text-[#3A2118] transition hover:bg-[#F0805A]"
            >
              Go to Submission Portal
              <ExternalLink size={11} />
            </button>
          </motion.div>

          
          <div className="mt-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">

            <div className="flex w-fit overflow-hidden rounded-lg bg-[#171B18]">
              {["Registered", "Upcoming", "Completed", "Saved"].map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-[8px] transition ${
                      activeTab === tab
                        ? "bg-[#303631] text-[#F5F5F2]"
                        : "text-[#737A75] hover:text-[#F5F5F2]"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-[#171B18] px-3 py-2">
                <Search size={12} className="text-[#737A75]" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name, club..."
                  className="w-36 bg-transparent text-[8px] text-[#F5F5F2] outline-none placeholder:text-[#606660]"
                />
              </div>

              <button
                type="button"
                className="rounded-lg bg-[#171B18] p-2 text-[#737A75] hover:text-[#F5F5F2]"
              >
                <Filter size={12} />
              </button>
            </div>
          </div>

          
          <div className="mt-5 space-y-4">

            <AnimatePresence mode="wait">
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((item) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl border border-[#252A26] bg-[#171B18] p-4"
                  >

                    
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#222923] text-[#8FD3B0]">
                          {item.type === "Hackathon" ? (
                            <Trophy size={14} />
                          ) : item.type === "Workshop" ? (
                            <Users size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                        </div>

                        <div>
                          <p className="text-[8px] text-[#8FD3B0]">
                            {item.status}
                            <span className="mx-1 text-[#555B56]">
                              ·
                            </span>
                            {item.organization}
                          </p>

                          <h2 className="mt-1 text-sm font-semibold text-[#F5F5F2]">
                            {item.title}
                          </h2>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-[8px] text-[#8B928D]">
                            <span className="flex items-center gap-1">
                              <CalendarDays size={10} />
                              {item.date}
                            </span>

                            <span>•</span>

                            <span>{item.mode}</span>
                          </div>
                        </div>
                      </div>

                      <span className="rounded-md bg-[#222923] px-2 py-1 text-[7px] text-[#AAB0AC]">
                        {item.type}
                      </span>
                    </div>

                    
                    {item.milestone && (
                      <div className="mt-5 border-t border-[#252A26] pt-4">

                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-[7px] font-semibold uppercase tracking-wider text-[#7E857F]">
                            Milestone Progress Tracker
                          </p>

                          <p className="text-[7px] text-[#F0805A]">
                            ⚠ Action Required · Step 2 of 3
                          </p>
                        </div>

                        <div className="grid gap-2 md:grid-cols-3">

                          <div className="rounded-lg bg-[#1D231F] p-3">
                            <div className="flex justify-between">
                              <span className="text-[7px] text-[#8FD3B0]">
                                Milestone 1
                              </span>

                              <span className="text-[7px] text-[#737A75]">
                                Completed
                              </span>
                            </div>

                            <p className="mt-2 text-[8px] font-semibold">
                              Team Formation & Problem Selection
                            </p>

                            <p className="mt-1 text-[7px] text-[#737A75]">
                              Verified & Roster Locked
                            </p>
                          </div>

                          <div className="rounded-lg border border-[#75412F] bg-[#211A17] p-3">
                            <div className="flex justify-between">
                              <span className="text-[7px] text-[#F0805A]">
                                Milestone 2
                              </span>

                              <span className="text-[7px] text-[#F0805A]">
                                Action by Oct 05
                              </span>
                            </div>

                            <p className="mt-2 text-[8px] font-semibold">
                              Submit PPT & Architecture
                            </p>

                            <p className="mt-1 text-[7px] text-[#8B7770]">
                              Upload PDF specs & video walkthrough
                            </p>
                          </div>

                          <div className="rounded-lg bg-[#1D231F] p-3">
                            <div className="flex justify-between">
                              <span className="text-[7px] text-[#737A75]">
                                Milestone 3
                              </span>

                              <span className="text-[7px] text-[#555B56]">
                                Unlocks Oct 10
                              </span>
                            </div>

                            <p className="mt-2 text-[8px] font-semibold text-[#737A75]">
                              Prototype & Demo Video
                            </p>

                            <p className="mt-1 text-[7px] text-[#555B56]">
                              Evaluation after assessment review
                            </p>
                          </div>

                        </div>

                        <div className="mt-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                          <span className="flex items-center gap-1 text-[7px] text-[#8B928D]">
                            <Users size={10} />
                            5 team members confirmed
                          </span>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={onViewDetails}
                              className="rounded-md bg-[#222923] px-3 py-2 text-[7px] text-[#D5DAD6] hover:bg-[#303631]"
                            >
                              View Details
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleAction("Submission Portal")
                              }
                              className="flex items-center gap-1 rounded-md bg-[#BFEBD7] px-3 py-2 text-[7px] font-semibold text-[#18372C] hover:bg-[#8FD3B0]"
                            >
                              Submission Portal
                              <ExternalLink size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    
                    {!item.milestone && (
                      <div className="mt-4 border-t border-[#252A26] pt-4">

                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                          <div className="flex items-center gap-2 text-[7px] text-[#737A75]">
                            <Clock3 size={10} />
                            Screening in progress. Meeting link dispatched
                            after accepted candidates.
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleAction(item.action)}
                              className="rounded-md bg-[#222923] px-3 py-2 text-[7px] text-[#D5DAD6] hover:bg-[#303631]"
                            >
                              {item.action}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                alert("Calendar event will be added here.")
                              }
                              className="flex items-center gap-1 rounded-md bg-[#222923] px-3 py-2 text-[7px] text-[#D5DAD6] hover:bg-[#303631]"
                            >
                              <CalendarDays size={10} />
                              Add to Calendar
                            </button>
                          </div>

                        </div>
                      </div>
                    )}

                  </motion.article>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl bg-[#171B18] p-8 text-center"
                >
                  <p className="text-xs text-[#737A75]">
                    No opportunities found.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 flex flex-col gap-4 rounded-xl bg-[#242925] p-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#303731] text-[#8FD3B0]">
                <Trophy size={14} />
              </div>

              <div>
                <p className="text-[10px] font-semibold">
                  Looking for your verified credentials?
                </p>

                <p className="mt-1 max-w-xl text-[8px] leading-4 text-[#858B86]">
                  Check the Credential Hub for official participation badges,
                  recommendation letters, and cryptographic certificates
                  validated by academic sponsors.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                alert("Past certificates will open here.")
              }
              className="rounded-md bg-[#171B18] px-3 py-2 text-[7px] text-[#D5DAD6] hover:bg-[#303631]"
            >
              View Past Certificates
            </button>
          </motion.div>
        </main>

    
        <footer className="flex flex-col gap-3 border-t border-[#252925] px-5 py-4 text-[7px] text-[#6E756F] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            <span>About</span>
            <span>Campus Partners</span>
            <span>Guidelines</span>
            <span>Student Placement Support</span>
            <span>Privacy</span>
          </div>

          <span className="text-[#8FD3B0]">
            Opportunity Hub v2.4 · Created with collegiate links & student
            networks
          </span>
        </footer>
      </div>
    </div>
  );
}

export default MyOpportunities;