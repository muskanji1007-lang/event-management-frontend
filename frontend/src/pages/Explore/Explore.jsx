import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import FilterSidebar from "../../components/FilterSidebar";
import OpportunityCard from "../../components/OpportunityCard";

function Explore({ onViewDetails }) {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  const opportunities = [
    {
      id: 1,
      title: "National Coding Hackathon",
      type: "Hackathon",
      description:
        "Build innovative solutions and compete with students from different colleges.",
      date: "20 Oct 2026",
      location: "Online",
    },
    {
      id: 2,
      title: "Frontend Development Internship",
      type: "Internship",
      description:
        "Gain practical experience in frontend development through a real project.",
      date: "15 Nov 2026",
      location: "Remote",
    },
    {
      id: 3,
      title: "Technology Workshop",
      type: "Workshop",
      description:
        "Learn practical development concepts through an interactive workshop.",
      date: "28 Oct 2026",
      location: "New Delhi",
    },
    {
  id: 4,
  title: "National Coding Competition",
  type: "Competition",
  description:
    "Test your coding skills and compete with talented students from different colleges.",
  date: "5 Nov 2026",
  location: "Online",
},
    
  ];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedType === "All" ||
        item.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [search, selectedType]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        
        <div className="mb-7">
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

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">

          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">

            <Search
              size={19}
              className="shrink-0 text-[var(--text-muted)]"
            />

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

          {[
            "All",
            "Hackathon",
            "Internship",
            "Workshop",
            "Competition",
          ].map((type) => (
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
          ))}

        </div>

    
        <div className="flex flex-col gap-6 lg:flex-row">

          {filterOpen && (
            <FilterSidebar
              darkMode={document.documentElement.classList.contains("dark")}
            />
          )}

          <div className="min-w-0 flex-1">

            {filteredOpportunities.length === 0 ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
                <p className="font-semibold">
                  No opportunities found
                </p>

                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Try another search or category.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {filteredOpportunities.map((item) => (
                  <OpportunityCard
                    key={item.id}
                    {...item}
                    onViewDetails={() => onViewDetails(item)}
                  />
                ))}

              </div>
            )}

          </div>

        </div>

      </div>
      
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">

        <h2 className="text-xl font-bold sm:text-2xl">
          Explore Categories
        </h2>

        <p className="mt-1 text-xs opacity-60">
          Browse opportunities by category.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[
            "Hackathons",
            "Workshops",
            "Internships",
            "Competitions",
          ].map((category) => (
            <button
              key={category}
              type="button"
              className="rounded-2xl border border-black/10 bg-[var(--surface)] p-5 text-left transition hover:-translate-y-1"
            >
              <h3 className="font-semibold">
                {category}
              </h3>

              <p className="mt-2 text-xs opacity-60">
                Explore opportunities
              </p>
            </button>
          ))}

        </div>

      </section>

    </main>
  );
}

export default Explore;