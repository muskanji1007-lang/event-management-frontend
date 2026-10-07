const fs = require('fs');

const code = `import { useMemo, useState, useEffect } from "react";
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
  Bookmark
} from "lucide-react";
import { getUserApplications, getOpportunities, getUserProfile } from "../../services/api";

function MyOpportunities({ onViewDetails, darkMode }) {
  const [activeTab, setActiveTab] = useState("Registered");
  const [search, setSearch] = useState("");
  
  const [applications, setApplications] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [allOpps, setAllOpps] = useState([]);
  
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
    const fetchData = async () => {
      try {
        setLoading(true);
        const [appData, oppsData, userProfileData] = await Promise.all([
          getUserApplications().catch(() => ({ applications: [] })),
          getOpportunities().catch(() => ({ opportunities: [] })),
          getUserProfile().catch(() => ({ user: { savedOpportunities: [] } }))
        ]);
        
        setApplications(appData.applications || []);
        setAllOpps(oppsData.opportunities || []);
        setSavedIds(userProfileData.user?.savedOpportunities || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const opportunitiesList = useMemo(() => {
    const list = [];
    
    // Process Registered
    applications.forEach(app => {
      if (app.opportunity) {
        list.push({
          id: app._id || app.id,
          rawOpportunity: app.opportunity,
          title: app.opportunity.title || "Untitled",
          organization: app.opportunity.organization || "Unknown",
          type: app.opportunity.category || "Hackathon",
          date: new Date(app.opportunity.deadline || Date.now()).toLocaleDateString(),
          mode: app.opportunity.location || "Online",
          status: "Applied",
          tab: "Registered",
          action: "View Details"
        });
      }
    });

    // Process Saved
    savedIds.forEach(savedId => {
      // Don't duplicate if already in registered
      if (!list.some(item => item.tab === "Registered" && (item.rawOpportunity._id === savedId || item.rawOpportunity.id === savedId))) {
        const opp = allOpps.find(o => (o._id || o.id) === savedId);
        if (opp) {
          list.push({
            id: "saved-" + (opp._id || opp.id),
            rawOpportunity: opp,
            title: opp.title || "Untitled",
            organization: opp.organization || "Unknown",
            type: opp.category || "Hackathon",
            date: new Date(opp.deadline || Date.now()).toLocaleDateString(),
            mode: opp.location || "Online",
            status: "Saved",
            tab: "Saved",
            action: "Apply Now"
          });
        }
      }
    });

    return list;
  }, [applications, savedIds, allOpps]);

  const filteredOpportunities = useMemo(() => {
    return opportunitiesList.filter((item) => {
      const matchesTab = item.tab === activeTab;
      const searchText = search.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.organization.toLowerCase().includes(searchText) ||
        item.type.toLowerCase().includes(searchText);

      return matchesTab && matchesSearch;
    });
  }, [opportunitiesList, activeTab, search]);

  const handleAction = (action, opp) => {
    if (onViewDetails) {
      onViewDetails(opp);
    }
  };

  return (
    <div className={\`min-h-screen \${theme.page}\`}>
      <div className={\`mx-auto min-h-screen max-w-[1180px] border-x \${theme.inner}\`}>
        <main className="px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div>
              <p className={\`text-xs font-semibold uppercase tracking-wider \${theme.primary}\`}>
                Student Workspace
              </p>
              <h1 className={\`mt-2 text-3xl font-bold \${theme.text}\`}>
                My Opportunities
              </h1>
              <p className={\`mt-2 text-sm \${theme.muted}\`}>
                Track your registrations, submission milestones, and saved items in one place.
              </p>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className={\`flex w-fit overflow-hidden rounded-xl \${theme.card2} shadow-sm\`}>
              {["Registered", "Saved"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={\`px-6 py-2.5 text-sm font-medium transition \${
                    activeTab === tab
                      ? darkMode
                        ? "bg-[#303630] text-[#F1F3EF]"
                        : "bg-[#1F4D3F] text-white"
                      : \`\${theme.muted} hover:text-black dark:hover:text-white\`
                  }\`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className={\`flex items-center gap-2 rounded-xl px-4 py-2.5 shadow-sm \${theme.card2}\`}>
                <Search size={16} className={theme.muted} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name, club..."
                  className={\`w-48 bg-transparent text-sm outline-none \${theme.text} \${
                    darkMode ? "placeholder:text-[#9A9F9A]" : "placeholder:text-[#6B6F6B]"
                  }\`}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={\`rounded-2xl p-12 text-center \${theme.card}\`}
                >
                  <p className={\`text-sm font-medium \${theme.muted}\`}>Loading your workspace...</p>
                </motion.div>
              ) : filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((item) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={\`rounded-2xl border p-6 shadow-sm \${theme.card}\`}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex gap-4">
                        <div className={\`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl \${theme.card2} \${theme.primary}\`}>
                          {item.type === "Hackathon" ? (
                            <Trophy size={20} />
                          ) : item.type === "Workshop" ? (
                            <Users size={20} />
                          ) : item.status === "Saved" ? (
                            <Bookmark size={20} />
                          ) : (
                            <CheckCircle2 size={20} />
                          )}
                        </div>

                        <div>
                          <p className={\`text-xs font-semibold \${theme.primary}\`}>
                            {item.status}
                            <span className={\`mx-2 \${theme.muted}\`}>•</span>
                            {item.organization}
                          </p>
                          <h2 className={\`mt-1 text-lg font-bold \${theme.text}\`}>
                            {item.title}
                          </h2>
                          <div className={\`mt-2 flex flex-wrap items-center gap-3 text-xs font-medium \${theme.muted}\`}>
                            <span className="flex items-center gap-1.5">
                              <CalendarDays size={14} />
                              {item.date}
                            </span>
                            <span>•</span>
                            <span>{item.mode}</span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={\`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider \${
                          darkMode ? "bg-[#303630] text-[#9A9F9A]" : "bg-[#E8B84A] text-[#1E1E1C]"
                        }\`}
                      >
                        {item.type}
                      </span>
                    </div>

                    <div className={\`mt-6 border-t pt-5 \${theme.border}\`}>
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className={\`flex items-center gap-2 text-sm font-medium \${theme.muted}\`}>
                          <Clock3 size={16} />
                          {item.tab === "Registered" 
                            ? "Application submitted successfully. Under review by organizer."
                            : "Saved for later. Apply before the deadline."}
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => handleAction(item.action, item.rawOpportunity)}
                            className={\`rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition \${
                              darkMode 
                                ? "bg-[#303630] text-[#F1F3EF] hover:bg-[#1F4D3F]" 
                                : "bg-[#1F4D3F] text-white hover:opacity-90"
                            }\`}
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
                  className={\`rounded-2xl border p-12 text-center \${theme.card}\`}
                >
                  <p className={\`text-base font-medium \${theme.muted}\`}>
                    No opportunities found in this section. Head to Explore to find more!
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
`;

fs.writeFileSync('src/pages/Profile/MyOpportunities.jsx', code);
