
import { useEffect, useState } from "react";
import {
  Search,
  ArrowRight,
  Code2,
  BriefcaseBusiness,
  Trophy,
  CalendarDays,
  MapPin,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

import { getStudentRecommendations } from "../../services/api";

function Home({ onExplore, onMyOpportunities, darkMode = false }) {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationLoading, setRecommendationLoading] = useState(true);
  const [recommendationError, setRecommendationError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const theme = {
    page: darkMode
      ? "bg-[#0F1210] text-[#F1F3EF]"
      : "bg-[#F5F5F2] text-[#1E1E1C]",
    card: darkMode
      ? "border-[#303630] bg-[#1B1F1C]"
      : "border-[#DADAD4] bg-[#EEEEEB]",
    card2: darkMode ? "bg-[#202420]" : "bg-[#EEEEEB]",
    text: darkMode ? "text-[#F1F3EF]" : "text-[#1E1E1C]",
    muted: darkMode ? "text-[#9A9F9A]" : "text-[#6B6F6B]",
    primary: darkMode ? "text-[#8FD3B0]" : "text-[#1F4D3F]",
    border: darkMode ? "border-[#303630]" : "border-[#DADAD4]",
  };

  useEffect(() => {
    let cancelled = false;

    async function loadRecommendations() {
      try {
        setRecommendationLoading(true);
        setRecommendationError("");

        const result = await getStudentRecommendations({
          domain: "Technology",
          skills: "HTML, CSS, JavaScript, React",
          year: "2",
          branch: "CSE",
          mode: "Any",
          top_n: 5,
        });

        if (!cancelled) {
          setRecommendations(
            Array.isArray(result.recommendations)
              ? result.recommendations
              : []
          );
        }
      } catch (error) {
        if (!cancelled) {
          setRecommendationError(
            error.message || "Unable to load recommendations."
          );
        }
      } finally {
        if (!cancelled) {
          setRecommendationLoading(false);
        }
      }
    }

    loadRecommendations();

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredEvents = [
    {
      type: "Hackathon",
      title: "AI Innovation Hackathon",
      description:
        "Develop innovative solutions and showcase your technical skills.",
      date: "20 Oct 2026",
      location: "Online",
    },
    {
      type: "Internship",
      title: "Frontend Development Internship",
      description:
        "Gain practical experience by working on real-world projects.",
      date: "15 Nov 2026",
      location: "Remote",
    },
    {
      type: "Workshop",
      title: "AI & Technology Workshop",
      description:
        "Learn new technologies and improve your technical skills.",
      date: "28 Oct 2026",
      location: "New Delhi",
    },
  ];

  const upcomingEvents = [
    {
      title: "National Coding Competition",
      date: "5 Nov 2026",
      type: "Competition",
    },
    {
      title: "GSOC Mentorship Workshop",
      date: "10 Nov 2026",
      type: "Workshop",
    },
    {
      title: "Frontend Developer Internship",
      date: "15 Nov 2026",
      type: "Internship",
    },
  ];

  const visibleRecommendations = recommendations.filter((item) => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return true;

    return [
      item.title,
      item.organization,
      item.domain,
      item.category,
      item.required_skills,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(search));
  });

  return (
    <main className={`min-h-screen ${theme.page}`}>
      <section className="mx-auto max-w-7xl px-5 py-7 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className={`text-sm font-medium ${theme.muted}`}>
            Good Morning
          </p>

          <h1 className={`mt-1 text-2xl font-bold sm:text-3xl ${theme.text}`}>
            Muskan 👋
          </h1>

          <p className={`mt-2 text-sm ${theme.muted}`}>
            Explore opportunities, build your skills and create your future.
          </p>
        </div>

        <div
          className={`overflow-hidden rounded-3xl border p-6 sm:p-8 lg:p-10 ${
            darkMode
              ? "border-[#303630] bg-[#1B1F1C]"
              : "border-transparent bg-[#1F4D3F]"
          }`}
        >
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p
                className={`text-xs font-semibold uppercase tracking-wider ${
                  darkMode ? "text-[#E5B869]" : "text-[#E8B84A]"
                }`}
              >
                Opportunity Hub
              </p>

              <h2
                className={`mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl ${
                  darkMode ? "text-[#F1F3EF]" : "text-white"
                }`}
              >
                Find opportunities
                <br />
                that match your goals.
              </h2>

              <p
                className={`mt-4 max-w-xl text-sm leading-6 ${
                  darkMode ? "text-[#9A9F9A]" : "text-white/80"
                }`}
              >
                Discover hackathons, internships, workshops and competitions
                designed to help you learn, compete and grow.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onExplore}
                  className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    darkMode
                      ? "bg-[#8FD3B0] text-[#1E1E1C] hover:bg-[#E5B869]"
                      : "bg-[#E8B84A] text-[#1E1E1C] hover:opacity-90"
                  }`}
                >
                  Explore Events
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={onMyOpportunities}
                  className={`rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                    darkMode
                      ? "border-[#303630] bg-[#202420] text-[#F1F3EF] hover:border-[#8FD3B0]"
                      : "border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  View My Registrations
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div
                className={`min-w-[180px] rounded-2xl p-5 ${
                  darkMode ? "bg-[#202420]" : "bg-white/10"
                }`}
              >
                <p
                  className={`text-xs ${
                    darkMode ? "text-[#9A9F9A]" : "text-white/60"
                  }`}
                >
                  Your opportunities
                </p>

                <p
                  className={`mt-2 text-4xl font-bold ${
                    darkMode ? "text-[#F1F3EF]" : "text-white"
                  }`}
                >
                  12
                </p>

                <p
                  className={`mt-1 text-xs ${
                    darkMode ? "text-[#9A9F9A]" : "text-white/70"
                  }`}
                >
                  opportunities available
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-5 max-w-3xl px-2">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm ${theme.card}`}
          >
            <Search size={18} className={theme.muted} />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search opportunities, hackathons, internships..."
              className={`w-full bg-transparent text-sm outline-none ${
                theme.text
              } ${
                darkMode
                  ? "placeholder:text-[#9A9F9A]"
                  : "placeholder:text-[#6B6F6B]"
              }`}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className={`text-xl font-bold sm:text-2xl ${theme.text}`}>
              Popular Categories
            </h2>
            <p className={`mt-1 text-xs ${theme.muted}`}>
              Explore opportunities based on your interests.
            </p>
          </div>

          <button
            type="button"
            onClick={onExplore}
            className={`hidden items-center gap-1 text-sm font-semibold sm:flex ${theme.primary}`}
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Hackathons",
              description: "Build & Compete",
              icon: Code2,
              light: "bg-[#E8B84A] text-[#1E1E1C]",
              dark: "text-[#E5B869]",
            },
            {
              title: "Internships",
              description: "Start your career",
              icon: BriefcaseBusiness,
              light: "bg-[#D9673B] text-white",
              dark: "text-[#F0805A]",
            },
            {
              title: "Competitions",
              description: "Show your talent",
              icon: Trophy,
              light: "bg-[#1F4D3F] text-white",
              dark: "text-[#8FD3B0]",
            },
            {
              title: "Workshops",
              description: "Learn new skills",
              icon: CalendarDays,
              light: "bg-[#E8B84A] text-[#1E1E1C]",
              dark: "text-[#E5B869]",
            },
          ].map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.title}
                type="button"
                onClick={onExplore}
                className={`group rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${theme.card}`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    darkMode
                      ? `bg-[#202420] ${category.dark}`
                      : category.light
                  }`}
                >
                  <Icon size={21} />
                </div>

                <h3 className={`mt-4 font-semibold ${theme.text}`}>
                  {category.title}
                </h3>

                <p className={`mt-1 text-xs ${theme.muted}`}>
                  {category.description}
                </p>

                <div
                  className={`mt-4 flex items-center gap-1 text-xs font-medium ${theme.primary}`}
                >
                  Explore <ArrowUpRight size={14} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {}
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className={`text-xl font-bold sm:text-2xl ${theme.text}`}>
              Featured Opportunities
            </h2>
            <p className={`mt-1 text-xs ${theme.muted}`}>
              Opportunities you can explore right now.
            </p>
          </div>

          <button
            type="button"
            onClick={onExplore}
            className={`hidden items-center gap-1 text-sm font-semibold sm:flex ${theme.primary}`}
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <div
              key={event.title}
              className={`rounded-2xl border p-5 ${theme.card}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    event.type === "Hackathon"
                      ? darkMode
                        ? "bg-[#202420] text-[#E5B869]"
                        : "bg-[#E8B84A] text-[#1E1E1C]"
                      : event.type === "Internship"
                      ? darkMode
                        ? "bg-[#202420] text-[#F0805A]"
                        : "bg-[#D9673B] text-white"
                      : darkMode
                      ? "bg-[#202420] text-[#8FD3B0]"
                      : "bg-[#1F4D3F] text-white"
                  }`}
                >
                  {event.type}
                </span>

                <ArrowUpRight size={17} className={theme.muted} />
              </div>

              <h3 className={`mt-4 text-lg font-bold ${theme.text}`}>
                {event.title}
              </h3>

              <p className={`mt-2 text-sm leading-5 ${theme.muted}`}>
                {event.description}
              </p>

              <div className={`mt-5 space-y-2 text-xs ${theme.muted}`}>
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} />
                  {event.date}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  {event.location}
                </div>
              </div>

              <button
                type="button"
                onClick={onExplore}
                className={`mt-5 w-full rounded-xl py-2.5 text-sm font-semibold transition ${
                  darkMode
                    ? "bg-[#8FD3B0] text-[#1E1E1C] hover:bg-[#E5B869]"
                    : "bg-[#1F4D3F] text-white hover:bg-[#D9673B]"
                }`}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className={`text-xl font-bold sm:text-2xl ${theme.text}`}>
              Recommended for You
            </h2>
            <p className={`mt-1 text-xs ${theme.muted}`}>
              ML-powered recommendations based on your skills and profile.
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              darkMode
                ? "bg-[#202420] text-[#8FD3B0]"
                : "bg-[#1F4D3F]/10 text-[#1F4D3F]"
            }`}
          >
            ML Powered
          </span>
        </div>

        {recommendationLoading ? (
          <div className={`rounded-2xl border p-6 ${theme.card}`}>
            <p className={`text-sm ${theme.muted}`}>
              Finding opportunities for you...
            </p>
          </div>
        ) : recommendationError ? (
          <div className={`rounded-2xl border p-6 ${theme.card}`}>
            <p className="text-sm font-medium text-red-500">
              Recommendations are temporarily unavailable.
            </p>
            <p className={`mt-2 text-xs ${theme.muted}`}>
              {recommendationError}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={`mt-4 rounded-xl px-4 py-2 text-sm font-semibold ${
                darkMode
                  ? "bg-[#8FD3B0] text-[#1E1E1C]"
                  : "bg-[#1F4D3F] text-white"
              }`}
            >
              Try Again
            </button>
          </div>
        ) : visibleRecommendations.length === 0 ? (
          <div className={`rounded-2xl border p-6 ${theme.card}`}>
            <p className={`text-sm ${theme.muted}`}>
              {recommendations.length === 0
                ? "No recommendations are available right now."
                : "No recommendations match your search."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleRecommendations.map((item, index) => {
              const score = Number(item.score);
              const hasScore =
                item.score !== undefined &&
                item.score !== null &&
                Number.isFinite(score);

              return (
                <article
                  key={`${item.title || "opportunity"}-${index}`}
                  className={`rounded-2xl border p-5 ${theme.card}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        darkMode
                          ? "bg-[#202420] text-[#E5B869]"
                          : "bg-[#E8B84A] text-[#1E1E1C]"
                      }`}
                    >
                      {item.category || item.domain || "Opportunity"}
                    </span>

                    {hasScore && (
                      <span className={`text-xs font-semibold ${theme.primary}`}>
                        Match score: {score.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <h3 className={`mt-4 text-lg font-bold ${theme.text}`}>
                    {item.title || "Untitled Opportunity"}
                  </h3>

                  <p className={`mt-2 text-sm ${theme.muted}`}>
                    {item.organization || "Organization not specified"}
                  </p>

                  <div className={`mt-5 space-y-3 text-xs ${theme.muted}`}>
                    {item.mode && (
                      <div className="flex items-center gap-2">
                        <CalendarDays size={14} />
                        Mode: {item.mode}
                      </div>
                    )}

                    {item.deadline && (
                      <div className="flex items-center gap-2">
                        <Clock3 size={14} />
                        Deadline: {item.deadline}
                      </div>
                    )}

                    {item.required_skills && (
                      <div className="flex items-start gap-2">
                        <Code2 size={14} className="mt-0.5 shrink-0" />
                        <span>Required skills: {item.required_skills}</span>
                      </div>
                    )}

                    {item.matched && (
                      <div>
                        <p className={`font-semibold ${theme.primary}`}>
                          Matched skills
                        </p>
                        <p className="mt-1">{item.matched}</p>
                      </div>
                    )}

                    {item.missing && (
                      <div>
                        <p className="font-semibold text-[#D9673B]">
                          Skills to develop
                        </p>
                        <p className="mt-1">{item.missing}</p>
                      </div>
                    )}
                  </div>

                  {item.application_url ? (
                    <a
                      href={item.application_url}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold ${
                        darkMode
                          ? "bg-[#8FD3B0] text-[#1E1E1C]"
                          : "bg-[#1F4D3F] text-white"
                      }`}
                    >
                      Apply Now <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onExplore}
                      className={`mt-5 w-full rounded-xl py-2.5 text-sm font-semibold ${
                        darkMode
                          ? "bg-[#8FD3B0] text-[#1E1E1C]"
                          : "bg-[#1F4D3F] text-white"
                      }`}
                    >
                      Explore Opportunities
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <div
            className={`rounded-2xl border p-5 lg:col-span-2 ${theme.card}`}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${theme.text}`}>
                  Upcoming Events
                </h2>
                <p className={`mt-1 text-xs ${theme.muted}`}>
                  Don't miss these upcoming opportunities.
                </p>
              </div>

              <button
                type="button"
                onClick={onExplore}
                className={`text-xs font-semibold ${theme.primary}`}
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${theme.card2} ${theme.border}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        darkMode
                          ? "bg-[#1B1F1C] text-[#8FD3B0]"
                          : "bg-[#1F4D3F] text-white"
                      }`}
                    >
                      <CalendarDays size={18} />
                    </div>

                    <div>
                      <h3 className={`text-sm font-semibold ${theme.text}`}>
                        {event.title}
                      </h3>
                      <p className={`mt-1 text-xs ${theme.muted}`}>
                        {event.type}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 text-xs font-medium ${theme.muted}`}>
                    <Clock3 size={14} />
                    {event.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`rounded-2xl p-5 ${
              darkMode
                ? "border border-[#303630] bg-[#1B1F1C]"
                : "bg-[#1F4D3F]"
            }`}
          >
            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-[#F1F3EF]" : "text-white"
              }`}
            >
              Your Progress
            </h2>

            <p
              className={`mt-1 text-xs ${
                darkMode ? "text-[#9A9F9A]" : "text-white/70"
              }`}
            >
              Keep building your opportunity journey.
            </p>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs ${
                    darkMode ? "text-[#9A9F9A]" : "text-white/80"
                  }`}
                >
                  Registered Opportunities
                </span>

                <span
                  className={`text-sm font-bold ${
                    darkMode ? "text-[#F1F3EF]" : "text-white"
                  }`}
                >
                  5
                </span>
              </div>

              <div
                className={`mt-2 h-2 rounded-full ${
                  darkMode ? "bg-[#202420]" : "bg-white/20"
                }`}
              >
                <div
                  className={`h-2 w-3/5 rounded-full ${
                    darkMode ? "bg-[#8FD3B0]" : "bg-[#E8B84A]"
                  }`}
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    darkMode
                      ? "bg-[#202420] text-[#8FD3B0]"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <p
                    className={`text-xs font-semibold ${
                      darkMode ? "text-[#F1F3EF]" : "text-white"
                    }`}
                  >
                    3 Completed
                  </p>
                  <p
                    className={`text-[10px] ${
                      darkMode ? "text-[#9A9F9A]" : "text-white/60"
                    }`}
                  >
                    Opportunities completed
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    darkMode
                      ? "bg-[#202420] text-[#F0805A]"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <Clock3 size={17} />
                </div>

                <div>
                  <p
                    className={`text-xs font-semibold ${
                      darkMode ? "text-[#F1F3EF]" : "text-white"
                    }`}
                  >
                    2 Upcoming
                  </p>
                  <p
                    className={`text-[10px] ${
                      darkMode ? "text-[#9A9F9A]" : "text-white/60"
                    }`}
                  >
                    Keep an eye on deadlines
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onMyOpportunities}
              className={`mt-7 w-full rounded-xl py-2.5 text-sm font-semibold ${
                darkMode
                  ? "bg-[#8FD3B0] text-[#1E1E1C] hover:bg-[#E5B869]"
                  : "bg-[#E8B84A] text-[#1E1E1C]"
              }`}
            >
              View My Opportunities
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;