
import {
  Users,
  CalendarDays,
  ClipboardCheck,
  LayoutDashboard,
  ShieldAlert,
  ChartNoAxesColumn,
  ArrowLeft,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "156",
    icon: Users,
    color: "#1F4D3F",
  },
  {
    title: "Total Events",
    value: "42",
    icon: CalendarDays,
    color: "#D9673B",
  },
  {
    title: "Pending Reviews",
    value: "8",
    icon: ClipboardCheck,
    color: "#B58B20",
  },
];

export default function AdminDashboard({ darkMode, onChangeRole }) {
  const bg = darkMode ? "#0F1210" : "#F5F5F2";
  const card = darkMode ? "#1B1F1C" : "#EEEEEB";
  const text = darkMode ? "#F1F3EF" : "#1E1E1C";
  const muted = darkMode ? "#9A9F9A" : "#6B6F6B";
  const border = darkMode ? "#343A35" : "#D9DCD6";
  const green = darkMode ? "#8FD3B0" : "#1F4D3F";
  const orange = darkMode ? "#F0805A" : "#D9673B";

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Manage Users", icon: Users },
    { label: "Manage Events", icon: CalendarDays },
    { label: "Event Approvals", icon: ClipboardCheck },
    { label: "Risk Detection", icon: ShieldAlert },
    { label: "Analytics", icon: ChartNoAxesColumn },
  ];

  const handleMenuClick = (label) => {
    if (label !== "Dashboard") {
      alert(`${label} page will be connected next.`);
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col md:flex-row"
      style={{ background: bg, color: text }}
    >
      {/* Admin Sidebar */}
      <aside
        className="w-full shrink-0 border-b p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-6"
        style={{ background: card, borderColor: border }}
      >
        <h2 className="mb-8 text-xl font-bold" style={{ color: green }}>
          Opportunity Hub
        </h2>

        <p
          className="mb-3 text-xs font-semibold uppercase tracking-wider"
          style={{ color: muted }}
        >
          Administration
        </p>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleMenuClick(item.label)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition"
                style={{
                  background: index === 0 ? (darkMode ? "#26382E" : "#DCE7DF") : "transparent",
                  color: index === 0 ? green : text,
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onChangeRole}
          className="mt-6 flex w-full items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition hover:opacity-80"
          style={{ borderColor: border, color: green }}
        >
          <ArrowLeft size={17} />
          Change Role
        </button>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-5 sm:p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm" style={{ color: muted }}>
              Opportunity Hub / Admin
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm" style={{ color: muted }}>
              Monitor platform activity and review events.
            </p>
          </div>

          <span
            className="rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background: darkMode ? "#332D1D" : "#F5E8BF",
              color: darkMode ? "#E5B869" : "#735710",
            }}
          >
            Administrator
          </span>
        </header>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border p-5 sm:p-6"
                style={{ background: card, borderColor: border }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium" style={{ color: muted }}>
                    {item.title}
                  </p>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: item.color, color: "#FFFFFF" }}
                  >
                    <Icon size={20} />
                  </span>
                </div>

                <h2
                  className="mt-4 text-3xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.value}
                </h2>
              </div>
            );
          })}
        </section>

        {/* Events awaiting review */}
        <section
          className="mb-6 rounded-2xl border p-5 sm:p-6"
          style={{ background: card, borderColor: border }}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Events Awaiting Review</h2>
              <p className="mt-1 text-sm" style={{ color: muted }}>
                Review submitted events.
              </p>
            </div>

            <span className="text-sm" style={{ color: orange }}>
              8 pending
            </span>
          </div>

          {[
            { name: "Campus Hackathon", category: "Technology · Online" },
            { name: "Design Workshop", category: "Design · Campus" },
          ].map((event) => (
            <div
              key={event.name}
              className="flex flex-wrap items-center justify-between gap-4 border-t py-4"
              style={{ borderColor: border }}
            >
              <div>
                <h3 className="font-semibold">{event.name}</h3>
                <p className="mt-1 text-sm" style={{ color: muted }}>
                  {event.category}
                </p>
              </div>

              <span
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  background: darkMode ? "#332D1D" : "#F5E8BF",
                  color: darkMode ? "#E5B869" : "#735710",
                }}
              >
                <Clock3 size={14} />
                Pending
              </span>
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleMenuClick("Event Approvals")}
            className="mt-3 rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "#1F4D3F" }}
          >
            Review Events
          </button>
        </section>

        {/* Platform overview */}
        <section
          className="rounded-2xl border p-5 sm:p-6"
          style={{ background: card, borderColor: border }}
        >
          <h2 className="text-lg font-bold">Platform Overview</h2>
          <p className="mt-2 text-sm leading-6" style={{ color: muted }}>
            Review event activity, pending approvals and platform statistics.
          </p>

          <div
            className="mt-5 rounded-xl border-l-4 p-4"
            style={{
              borderLeftColor: orange,
              background: bg,
            }}
          >
            <div className="flex items-start gap-3">
              <ShieldAlert size={21} color={orange} />
              <div>
                <h3 className="font-semibold">Event Risk Detection</h3>
                <p className="mt-1 text-sm" style={{ color: muted }}>
                  Risk analysis results will appear here when the backend API
                  is connected.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm" style={{ color: green }}>
            <CheckCircle2 size={17} />
            Dashboard interface ready
          </div>
        </section>
      </main>
    </div>
  );
}