import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Filter,
  Search,
  Trophy,
  Users,
} from "lucide-react";

function MyOpportunities({ onViewDetails, darkMode }) {
  const [activeTab, setActiveTab] = useState("Registered");
  const [search, setSearch] = useState("");

  
  const theme = {
    page: darkMode
      ? "bg-[#0F1210] text-[#F1F3EF]"
      : "bg-[#F5F5F2] text-[#1E1E1C]",

    inner: darkMode
      ? "border-[#303630] bg-[#0F1210]"
      : "border-[#DADAD4] bg-[#F5F5F2]",

    card: darkMode
      ? "border-[#303630] bg-[#1B1F1C]"
      : "border-[#DADAD4] bg-[#EEEEEB]",

    card2: darkMode
      ? "bg-[#202420]"
      : "bg-[#EEEEEB]",

    text: darkMode
      ? "text-[#F1F3EF]"
      : "text-[#1E1E1C]",

    muted: darkMode
      ? "text-[#9A9F9A]"
      : "text-[#6B6F6B]",

    primary: darkMode
      ? "text-[#8FD3B0]"
      : "text-[#1F4D3F]",

    secondary: darkMode
      ? "text-[#F0805A]"
      : "text-[#D9673B]",

    border: darkMode
      ? "border-[#303630]"
      : "border-[#DADAD4]",
  };

 

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
    <div className={`min-h-screen ${theme.page}`}>
      <div
        className={`mx-auto min-h-screen max-w-[1180px] border-x ${theme.inner}`}
      >
        <main className="px-5 py-7">

          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div>
              <p
                className={`text-[8px] font-semibold uppercase tracking-wider ${theme.primary}`}
              >
                Student Workspace 
              </p>

              <h1
                className={`mt-1 text-2xl font-semibold ${theme.text}`}
              >
                My Opportunities
              </h1>

              <p className={`mt-1 text-[9px] ${theme.muted}`}>
                Track your registrations, submission milestones, and saved
                items in one place.
              </p>
            </div>


          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={`mt-7 flex flex-col gap-4 rounded-xl border p-4 md:flex-row md:items-center md:justify-between ${
              darkMode
                ? "border-[#F0805A] bg-[#1B1F1C]"
                : "border-[#D9673B] bg-[#EEEEEB]"
            }`}
          >
            <div className="flex gap-3">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                  darkMode
                    ? "bg-[#202420] text-[#F0805A]"
                    : "bg-[#E8B84A] text-[#1E1E1C]"
                }`}
              >
                !
              </div>

              <div>
                <p
                  className={`text-[8px] font-semibold uppercase ${theme.secondary}`}
                >
                  Urgent Action Required
                </p>

                <p
                  className={`mt-1 text-[10px] font-semibold ${theme.text}`}
                >
                  Smart India Hackathon 2026: Submit Team PPT &
                  Architecture diagram
                </p>

                <p className={`mt-1 text-[8px] ${theme.muted}`}>
                  Failure to submit architecture document before milestone
                  closes may impact your eligibility.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAction("Submission Portal")}
              className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-[8px] font-semibold transition ${
                darkMode
                  ? "bg-[#F0805A] text-[#1E1E1C] hover:bg-[#D9673B]"
                  : "bg-[#D9673B] text-white hover:bg-[#1F4D3F]"
              }`}
            >
              Go to Submission Portal
              <ExternalLink size={11} />
            </button>
          </motion.div>

         
          <div className="mt-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">

            <div
              className={`flex w-fit overflow-hidden rounded-lg ${theme.card2}`}
            >
              {["Registered", "Upcoming", "Completed", "Saved"].map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-[8px] transition ${
                      activeTab === tab
                        ? darkMode
                          ? "bg-[#202420] text-[#F1F3EF]"
                          : "bg-[#1F4D3F] text-white"
                        : `${theme.muted}`
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

      

            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${theme.card2}`}
              >
                <Search
                  size={12}
                  className={theme.muted}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name, club..."
                  className={`w-36 bg-transparent text-[8px] outline-none ${theme.text} ${
                    darkMode
                      ? "placeholder:text-[#9A9F9A]"
                      : "placeholder:text-[#6B6F6B]"
                  }`}
                />
              </div>

              <button
                type="button"
                className={`rounded-lg p-2 ${theme.card2} ${theme.muted}`}
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
                    className={`rounded-xl border p-4 ${theme.card}`}
                  >

                

                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                      <div className="flex gap-3">

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${theme.card2} ${theme.primary}`}
                        >
                          {item.type === "Hackathon" ? (
                            <Trophy size={14} />
                          ) : item.type === "Workshop" ? (
                            <Users size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                        </div>


                        <div>
                          <p
                            className={`text-[8px] ${theme.primary}`}
                          >
                            {item.status}

                            <span
                              className={`mx-1 ${theme.muted}`}
                            >
                              ·
                            </span>

                            {item.organization}
                          </p>

                          <h2
                            className={`mt-1 text-sm font-semibold ${theme.text}`}
                          >
                            {item.title}
                          </h2>

                          <div
                            className={`mt-2 flex flex-wrap items-center gap-2 text-[8px] ${theme.muted}`}
                          >
                            <span className="flex items-center gap-1">
                              <CalendarDays size={10} />
                              {item.date}
                            </span>

                            <span>•</span>

                            <span>{item.mode}</span>
                          </div>
                        </div>
                      </div>


                      <span
                        className={`rounded-md px-2 py-1 text-[7px] ${
                          darkMode
                            ? "bg-[#202420] text-[#9A9F9A]"
                            : "bg-[#E8B84A] text-[#1E1E1C]"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>


                    {item.milestone && (
                      <div
                        className={`mt-5 border-t pt-4 ${theme.border}`}
                      >

                        <div className="mb-3 flex items-center justify-between">
                          <p
                            className={`text-[7px] font-semibold uppercase tracking-wider ${theme.muted}`}
                          >
                            Milestone Progress Tracker
                          </p>

                          <p
                            className={`text-[7px] ${theme.secondary}`}
                          >
                            ⚠ Action Required · Step 2 of 3
                          </p>
                        </div>

                      

                        <div className="grid gap-2 md:grid-cols-3">


                          <div
                            className={`rounded-lg p-3 ${theme.card2}`}
                          >
                            <div className="flex justify-between">
                              <span
                                className={`text-[7px] ${theme.primary}`}
                              >
                                Milestone 1
                              </span>

                              <span
                                className={`text-[7px] ${theme.muted}`}
                              >
                                Completed
                              </span>
                            </div>

                            <p
                              className={`mt-2 text-[8px] font-semibold ${theme.text}`}
                            >
                              Team Formation & Problem Selection
                            </p>

                            <p
                              className={`mt-1 text-[7px] ${theme.muted}`}
                            >
                              Verified & Roster Locked
                            </p>
                          </div>


                          <div
                            className={`rounded-lg border p-3 ${
                              darkMode
                                ? "border-[#F0805A] bg-[#202420]"
                                : "border-[#D9673B] bg-[#EEEEEB]"
                            }`}
                          >
                            <div className="flex justify-between">
                              <span
                                className={`text-[7px] ${theme.secondary}`}
                              >
                                Milestone 2
                              </span>

                              <span
                                className={`text-[7px] ${theme.secondary}`}
                              >
                                Action by Oct 05
                              </span>
                            </div>

                            <p
                              className={`mt-2 text-[8px] font-semibold ${theme.text}`}
                            >
                              Submit PPT & Architecture
                            </p>

                            <p
                              className={`mt-1 text-[7px] ${theme.muted}`}
                            >
                              Upload PDF specs & video walkthrough
                            </p>
                          </div>


                          <div
                            className={`rounded-lg p-3 ${theme.card2}`}
                          >
                            <div className="flex justify-between">
                              <span
                                className={`text-[7px] ${theme.muted}`}
                              >
                                Milestone 3
                              </span>

                              <span
                                className={`text-[7px] ${theme.muted}`}
                              >
                                Unlocks Oct 10
                              </span>
                            </div>

                            <p
                              className={`mt-2 text-[8px] font-semibold ${theme.muted}`}
                            >
                              Prototype & Demo Video
                            </p>

                            <p
                              className={`mt-1 text-[7px] ${theme.muted}`}
                            >
                              Evaluation after assessment review
                            </p>
                          </div>
                        </div>

                       

                        <div className="mt-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">

                          <span
                            className={`flex items-center gap-1 text-[7px] ${theme.muted}`}
                          >
                            <Users size={10} />
                            5 team members confirmed
                          </span>

                          <div className="flex gap-2">
                     

                            <button
                              type="button"
                              onClick={onViewDetails}
                              className={`rounded-md px-3 py-2 text-[7px] ${
                                darkMode
                                  ? "bg-[#202420] text-[#F1F3EF] hover:bg-[#1F4D3F]"
                                  : "bg-[#F5F5F2] text-[#1E1E1C] hover:bg-[#E8B84A]"
                              }`}
                            >
                              View Details
                            </button>

                         
                            <button
                              type="button"
                              onClick={() =>
                                handleAction("Submission Portal")
                              }
                              className={`flex items-center gap-1 rounded-md px-3 py-2 text-[7px] font-semibold ${
                                darkMode
                                  ? "bg-[#8FD3B0] text-[#1E1E1C] hover:bg-[#E5B869]"
                                  : "bg-[#1F4D3F] text-white hover:bg-[#D9673B]"
                              }`}
                            >
                              Submission Portal
                              <ExternalLink size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                 
                    {!item.milestone && (
                      <div
                        className={`mt-4 border-t pt-4 ${theme.border}`}
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                          <div
                            className={`flex items-center gap-2 text-[7px] ${theme.muted}`}
                          >
                            <Clock3 size={10} />

                            Screening in progress. Meeting link dispatched
                            after accepted candidates.
                          </div>

                          <div className="flex gap-2">

                          

                            <button
                              type="button"
                              onClick={() =>
                                handleAction(item.action)
                              }
                              className={`rounded-md px-3 py-2 text-[7px] ${
                                darkMode
                                  ? "bg-[#202420] text-[#F1F3EF] hover:bg-[#1F4D3F]"
                                  : "bg-[#F5F5F2] text-[#1E1E1C] hover:bg-[#E8B84A]"
                              }`}
                            >
                              {item.action}
                            </button>

                            
                            <button
                              type="button"
                              onClick={() =>
                                alert(
                                  "Calendar event will be added here."
                                )
                              }
                              className={`flex items-center gap-1 rounded-md px-3 py-2 text-[7px] ${
                                darkMode
                                  ? "bg-[#202420] text-[#F1F3EF] hover:bg-[#1F4D3F]"
                                  : "bg-[#F5F5F2] text-[#1E1E1C] hover:bg-[#E8B84A]"
                              }`}
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
                  className={`rounded-xl p-8 text-center ${theme.card}`}
                >
                  <p className={`text-xs ${theme.muted}`}>
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
            className={`mt-5 flex flex-col gap-4 rounded-xl p-4 md:flex-row md:items-center md:justify-between ${
              darkMode
                ? "bg-[#202420]"
                : "bg-[#EEEEEB]"
            }`}
          >
            <div className="flex gap-3">

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-md ${
                  darkMode
                    ? "bg-[#1B1F1C] text-[#8FD3B0]"
                    : "bg-[#E8B84A] text-[#1E1E1C]"
                }`}
              >
                <Trophy size={14} />
              </div>

              <div>
                <p className={`text-[10px] font-semibold ${theme.text}`}>
                  Looking for your verified credentials?
                </p>

                <p
                  className={`mt-1 max-w-xl text-[8px] leading-4 ${theme.muted}`}
                >
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
              className={`rounded-md px-3 py-2 text-[7px] ${
                darkMode
                  ? "bg-[#1B1F1C] text-[#F1F3EF] hover:bg-[#1F4D3F]"
                  : "bg-[#F5F5F2] text-[#1E1E1C] hover:bg-[#E8B84A]"
              }`}
            >
              View Past Certificates
            </button>
          </motion.div>
        </main>


        <footer
          className={`flex flex-col gap-3 border-t px-5 py-4 text-[7px] md:flex-row md:items-center md:justify-between ${theme.border} ${theme.muted}`}
        >
          <div className="flex flex-wrap gap-4">
            <span>About</span>
            <span>Campus Partners</span>
            <span>Guidelines</span>
            <span>Student Placement Support</span>
            <span>Privacy</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MyOpportunities;