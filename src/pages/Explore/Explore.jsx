import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, RefreshCw } from "lucide-react";

import FilterSidebar from "../../components/FilterSidebar";
import OpportunityCard from "../../components/OpportunityCard";
import { getOpportunities } from "../../services/api";

function Explore({ onViewDetails }) {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOpportunities = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getOpportunities();
      setOpportunities(data.opportunities || []);
    } catch (err) {
      setError(err.message || "Unable to load opportunities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesSearch =
        (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.description || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.organization || "").toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedType === "All" ||
        (item.category || "").toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [search, selectedType, opportunities]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Opportunity Hub
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Explore Opportunities
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
              Discover opportunities that match your interests and skills.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOpportunities}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium transition hover:opacity-80 disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
            <Search size={19} className="shrink-0 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search opportunities..."
              className="w-full min-w-0 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>

          <button
            type="button"
            onClick={() => setFilterOpen((prev) => !prev)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
          {["All", "Hackathon", "Internship", "Workshop", "Competition"].map(
            (type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  selectedType === type
                    ? "bg-[var(--primary)] text-white"
                    : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                }`}
              >
                {type}
              </button>
            )
          )}
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {filterOpen && (
            <FilterSidebar
              darkMode={document.documentElement.classList.contains("dark")}
            />
          )}

          <div className="min-w-0 flex-1">
            {}
            {loading && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
                <p className="text-sm text-[var(--text-muted)]">
                  Loading opportunities...
                </p>
              </div>
            )}

            {}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="font-semibold text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={fetchOpportunities}
                  className="mt-3 rounded-lg bg-[#1F4D3F] px-4 py-2 text-sm text-white"
                >
                  Try Again
                </button>
              </div>
            )}

            {}
            {!loading && !error && filteredOpportunities.length === 0 && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
                <p className="font-semibold">No opportunities found</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {opportunities.length === 0
                    ? "No opportunities available yet."
                    : "Try another search or category."}
                </p>
              </div>
            )}

            {}
            {!loading && !error && filteredOpportunities.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredOpportunities.map((item) => (
                  <OpportunityCard
                    key={item._id || item.id}
                    {...item}
                    
                    id={item._id || item.id}
                    type={item.category}
                    date={
                      item.deadline
                        ? new Date(item.deadline).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : ""
                    }
                    location={item.location || "Online"}
                    score={item.score}
                    matched={item.matched}
                    missing={item.missing}
                    onViewDetails={() => onViewDetails(item)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold sm:text-2xl">Explore Categories</h2>
        <p className="mt-1 text-xs opacity-60">
          Browse opportunities by category.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Hackathons", "Workshops", "Internships", "Competitions"].map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedType(category.replace(/s$/, ""))
                }
                className="rounded-2xl border border-black/10 bg-[var(--surface)] p-5 text-left transition hover:-translate-y-1"
              >
                <h3 className="font-semibold">{category}</h3>
                <p className="mt-2 text-xs opacity-60">Explore opportunities</p>
              </button>
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default Explore;