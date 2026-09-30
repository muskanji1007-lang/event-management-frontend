import {
  Search,
  SlidersHorizontal,
  Bookmark,
  CalendarDays,
  MapPin,
} from "lucide-react";

function Explore() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">

      
      <header className="border-b border-black/10 bg-[var(--surface)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="Opportunity Hub"
              className="h-10 w-10 object-contain"
            />

            <span className="text-xl font-bold">
              Opportunity Hub
            </span>
          </div>

          <nav className="flex gap-6 text-sm font-medium">
            <a href="/profile">Profile</a>
            <a href="/explore" className="text-[var(--accent)]">
              Explore
            </a>
            <a href="/my-opportunities">My Opportunities</a>
          </nav>

        </div>
      </header>


      
      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Explore Opportunities
          </h1>

          <p className="mt-2 opacity-70">
            Discover opportunities that match your interests and skills.
          </p>
        </div>


        
        <div className="mb-8 flex gap-4">

          <div className="flex flex-1 items-center gap-3 rounded-xl border border-black/10 bg-[var(--surface)] px-4 py-3">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search opportunities..."
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold">
            <SlidersHorizontal size={18} />
            Filters
          </button>

        </div>

        <div className="mb-8 flex flex-wrap gap-3">

          <button className="rounded-full bg-[var(--primary)] px-5 py-2">
            All
          </button>

          <button className="rounded-full border border-black/10 px-5 py-2">
            Hackathons
          </button>

          <button className="rounded-full border border-black/10 px-5 py-2">
            Internships
          </button>

          <button className="rounded-full border border-black/10 px-5 py-2">
            Workshops
          </button>

          <button className="rounded-full border border-black/10 px-5 py-2">
            Competitions
          </button>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <OpportunityCard
            title="National Coding Hackathon"
            type="Hackathon"
            date="20 Oct 2026"
            location="Online"
            color="var(--accent)"
          />

          <OpportunityCard
            title="Frontend Development Internship"
            type="Internship"
            date="15 Nov 2026"
            location="Remote"
            color="var(--primary)"
          />

          <OpportunityCard
            title="AI & Technology Workshop"
            type="Workshop"
            date="28 Oct 2026"
            location="New Delhi"
            color="var(--highlight)"
          />

        </div>

      </main>
    </div>
  );
}


function OpportunityCard({ title, type, date, location, color }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[var(--surface)] p-5 shadow-sm">

      <div className="mb-4 flex items-start justify-between">

        <span
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: color }}
        >
          {type}
        </span>

        <Bookmark size={20} />

      </div>

      <h2 className="mb-4 text-xl font-bold">
        {title}
      </h2>

      <div className="space-y-2 text-sm opacity-70">

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          {date}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {location}
        </div>

      </div>

      <button className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 font-semibold">
        View Details
      </button>

    </div>
  );
}

export default Explore;