import { useState } from "react";
import { applyToOpportunity, saveOpportunity } from "../../../services/api";

function OpportunityDetails({ opportunity, onBack, darkMode }) {
  const [saved, setSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const theme = {
    page: darkMode ? "bg-[#0F1210] text-[#F1F3EF]" : "bg-[#F5F5F2] text-[#1E1E1C]",
    card: darkMode ? "border-[#303630] bg-[#1B1F1C]" : "border-[#DADAD4] bg-[#EEEEEB]",
    card2: darkMode ? "bg-[#202420]" : "bg-[#F1F1ED]",
    text: darkMode ? "text-[#F1F3EF]" : "text-[#1E1E1C]",
    muted: darkMode ? "text-[#9A9F9A]" : "text-[#6B6F6B]",
    primary: darkMode ? "text-[#8FD3B0]" : "text-[#1F4D3F]",
    border: darkMode ? "border-[#303630]" : "border-[#DADAD4]",
  };

  const handleApply = async () => {
    if (opportunity.applicationLink) {
      window.open(opportunity.applicationLink, "_blank");
      return;
    }
    
    try {
      setApplying(true);
      await applyToOpportunity(opportunity._id || opportunity.id);
      setApplied(true);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.message || "Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveOpportunity(opportunity._id || opportunity.id);
      setSaved(true);
    } catch (err) {
      alert(err.message || "Failed to save opportunity.");
    }
  };

  if (!opportunity) return null;

  return (
    <div className={`min-h-screen ${theme.page}`}>
      <main className="mx-auto max-w-7xl px-5 py-5">
        <button
          type="button"
          onClick={onBack}
          className={`mb-5 text-xs ${theme.muted} hover:${darkMode ? "text-[#8FD3B0]" : "text-[#1F4D3F]"}`}
        >
          ← Back to Explore
        </button>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_310px]">
          <div>
            <section className={`overflow-hidden rounded-xl border ${theme.card}`}>
              <div className="relative h-56 overflow-hidden bg-[#1F4D3F] p-10 flex items-center justify-center text-white text-3xl font-bold">
                {opportunity.title}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-[#E8B84A] px-2 py-1 text-[9px] font-semibold text-[#1E1E1C] uppercase">
                    {opportunity.category || "Event"}
                  </span>
                  <span className="rounded-md bg-[#1F4D3F] border border-white/20 px-2 py-1 text-[9px] text-white">
                    {opportunity.location || "Online"}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`text-[9px] font-semibold uppercase ${theme.primary}`}>
                      {opportunity.organization || "Organizer"}
                    </p>
                    <h1 className={`mt-2 text-2xl font-semibold ${theme.text}`}>
                      {opportunity.title}
                    </h1>
                  </div>
                </div>
              </div>
            </section>

            <section className={`mt-4 rounded-xl border p-5 ${theme.card}`}>
              <h2 className="text-sm font-semibold">◉ About this Opportunity</h2>
              <p className={`mt-3 text-sm leading-6 whitespace-pre-wrap ${theme.muted}`}>
                {opportunity.description || "No description provided."}
              </p>
            </section>

            {opportunity.skillsRequired && opportunity.skillsRequired.length > 0 && (
              <section className={`mt-4 rounded-xl border p-5 ${theme.card}`}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold">◉ Required Skills</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {opportunity.skillsRequired.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-md border ${theme.border} px-3 py-1.5 text-xs ${theme.card2} ${theme.text}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className={`mt-4 rounded-xl border p-5 ${theme.card}`}>
              <h2 className="text-sm font-semibold">▣ Timeline & Location</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className={`text-[9px] uppercase tracking-wider ${theme.muted}`}>Deadline</p>
                  <p className="mt-1 text-sm font-semibold">
                    {opportunity.deadline
                      ? new Date(opportunity.deadline).toLocaleDateString("en-IN", {
                          weekday: "short",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <p className={`text-[9px] uppercase tracking-wider ${theme.muted}`}>Location</p>
                  <p className="mt-1 text-sm font-semibold">
                    {opportunity.location || "Not specified"}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className={`h-fit rounded-xl border p-5 ${theme.card}`}>
            <h3 className="text-xs font-semibold uppercase tracking-wider">Opportunity Snapshot</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className={`text-[9px] ${theme.muted}`}>Type</p>
                <p className="mt-1 text-xs font-semibold">{opportunity.category}</p>
              </div>
              <div>
                <p className={`text-[9px] ${theme.muted}`}>Status</p>
                <p className="mt-1 text-xs font-semibold text-[#1F4D3F] dark:text-[#8FD3B0]">
                  Accepting Applications
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleApply}
              disabled={applying || applied}
              className="mt-6 w-full rounded-lg bg-[#1F4D3F] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-[#8FD3B0] dark:text-[#0F1210]"
            >
              {applied ? "Applied ✓" : applying ? "Applying..." : "Apply Now →"}
            </button>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saved}
                className={`rounded-lg border px-3 py-2 text-xs transition ${theme.border} ${theme.text} hover:bg-[#1F4D3F]/10 dark:hover:bg-[#8FD3B0]/10 disabled:opacity-50`}
              >
                {saved ? "♥ Saved" : "♡ Save"}
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }}
                className={`rounded-lg border px-3 py-2 text-xs transition ${theme.border} ${theme.text} hover:bg-[#1F4D3F]/10 dark:hover:bg-[#8FD3B0]/10`}
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