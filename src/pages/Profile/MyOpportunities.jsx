import { useMemo, useState, useEffect } from "react";
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
import { getUserApplications } from "../../services/api";

function MyOpportunities({ onViewDetails, darkMode }) {
  const [activeTab, setActiveTab] = useState("Registered");
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const theme = {
    page: darkMode ? "bg-[#0F1210] text-[#F1F3EF]" : "bg-[#F5F5F2] text-[#1E1E1C]",
    inner: darkMode ? "border-[#303630] bg-[#0F1210]" : "border-[#DADAD4] bg-[#F5F5F2]",
    card: darkMode ? "border-[#303630] bg-[#1B1F1C]" : "border-[#DADAD4] bg-[#EEEEEB]",
    card2: darkMode ? "bg-[#202420]" : "bg-[#EEEEEB]",
    text: darkMode ? "text-[#F1F3EF]" : "text-[#1E1E1C]",
    muted: darkMode ? "text-[#9A9F9A]" : "text-[#6B6F6B]",
    primary: darkMode ? "text-[#8FD3B0]" : "text-[#1F4D3F]",
    secondary: darkMode ? "text-[#F0805A]" : "text-[#D9673B]",
    border: darkMode ? "border-[#303630]" : "border-[#DADAD4]",
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getUserApplications();
        setApplications(data.applications || []);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const opportunities = useMemo(() => {
    return applications.map(app => {
      const opp = app.opportunity || {};
      return {
        id: app._id,
        status: app.status === "applied" ? "Confirmed Registration" : app.status,
        organization: opp.organization || "Organizer",
        title: opp.title || "Untitled Opportunity",
        date: opp.deadline ? new Date(opp.deadline).toLocaleDateString() : "TBA",
        mode: opp.location || "Online",
        tab: "Registered", 
        action: "View Details",
        milestone: false,
        rawOpportunity: opp
      };
    });
  }, [applications]);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesTab = activeTab === "Registered" ? item.tab === "Registered" : false; // Only Registered is currently mapped
      const searchText = search.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.organization.toLowerCase().includes(searchText) ||
        item.type.toLowerCase().includes(searchText);

      return matchesTab && matchesSearch;
    });
  }, [opportunities, activeTab, search]);

  const handleAction = (action, opp) => {
    if (action === "View Details" && onViewDetails) {
      onViewDetails(opp);
    } else {
      alert("Opening " + action);
    }
  };

  return (
    <div className={`min-h-screen ${theme.page}`}>
      <div className={`mx-auto min-h-screen max-w-[1180px] border-x ${theme.inner}`}>
        <main className="px-5 py-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div>
              <p className={`text-[8px] font-semibold uppercase tracking-wider ${theme.primary}`}>
                Student Workspace 
              </p>
              <h1 className={`mt-1 text-2xl font-semibold ${theme.text}`}>
                My Opportunities
              </h1>
              <p className={`mt-1 text-[9px] ${theme.muted}`}>
                Track your registrations, submission milestones, and saved items in one place.
              </p>
            </div>
          </motion.div>

          <div className="mt-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className={`flex w-fit overflow-hidden rounded-lg ${theme.card2}`}>
              {["Registered"].map((tab) => (
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
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${theme.card2}`}>
                <Search size={12} className={theme.muted} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name, club..."
                  className={`w-36 bg-transparent text-[8px] outline-none ${theme.text} ${
                    darkMode ? "placeholder:text-[#9A9F9A]" : "placeholder:text-[#6B6F6B]"
                  }`}
                />
              </div>
              <button type="button" className={`rounded-lg p-2 ${theme.card2} ${theme.muted}`}>
                <Filter size={12} />
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`rounded-xl p-8 text-center ${theme.card}`}
                >
                  <p className={`text-xs ${theme.muted}`}>Loading your applications...</p>
                </motion.div>
              ) : filteredOpportunities.length > 0 ? (
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
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${theme.card2} ${theme.primary}`}>
                          {item.type === "Hackathon" ? (
                            <Trophy size={14} />
                          ) : item.type === "Workshop" ? (
                            <Users size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                        </div>

                        <div>
                          <p className={`text-[8px] ${theme.primary}`}>
                            {item.status}
                            <span className={`mx-1 ${theme.muted}`}>·</span>
                            {item.organization}
                          </p>
                          <h2 className={`mt-1 text-sm font-semibold ${theme.text}`}>
                            {item.title}
                          </h2>
                          <div className={`mt-2 flex flex-wrap items-center gap-2 text-[8px] ${theme.muted}`}>
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
                          darkMode ? "bg-[#202420] text-[#9A9F9A]" : "bg-[#E8B84A] text-[#1E1E1C]"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>

                    <div className={`mt-4 border-t pt-4 ${theme.border}`}>
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className={`flex items-center gap-2 text-[7px] ${theme.muted}`}>
                          <Clock3 size={10} />
                          Application submitted successfully. Under review by organizer.
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleAction(item.action, item.rawOpportunity)}
                            className={`rounded-md px-3 py-2 text-[7px] ${
                              darkMode ? "bg-[#202420] text-[#F1F3EF] hover:bg-[#1F4D3F]" : "bg-[#F5F5F2] text-[#1E1E1C] hover:bg-[#E8B84A]"
                            }`}
                          >
                            {item.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`rounded-xl p-8 text-center ${theme.card}`}
                >
                  <p className={`text-xs ${theme.muted}`}>
                    No opportunities found. Head to Explore to apply!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyOpportunities;