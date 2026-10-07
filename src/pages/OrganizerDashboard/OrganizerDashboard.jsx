import MatchScore from "../../components/MatchScore";
import CreateEvent from "./CreateEvent";
import Registrations from "./Registrations";
import Analytics from "./Analytics";
import OrganizerProfile from "./OrganizerProfile";
import MyEvents from "./MyEvents";

import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Plus,
  Users,
  ChartNoAxesColumn,
  UserRound,
  ArrowLeft,
  Menu,
  X,
  Clock3,
} from "lucide-react";

const green = "#1F4D3F";
const orange = "#D9673B";
const yellow = "#E8B84A";

export default function OrganizerDashboard({ darkMode, onChangeRole }) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const bg = darkMode ? "#0F1210" : "#F5F5F2";
  const card = darkMode ? "#1B1F1C" : "#EEEEEB";
  const text = darkMode ? "#F1F3EF" : "#1E1E1C";
  const muted = darkMode ? "#9A9F9A" : "#6B6F6B";
  const border = darkMode ? "#303630" : "#D9DCD6";
  const accent = darkMode ? "#8FD3B0" : green;

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Events", icon: CalendarDays },
    { label: "Create Event", icon: Plus },
    { label: "Registrations", icon: Users },
    { label: "Analytics", icon: ChartNoAxesColumn },
    { label: "Profile", icon: UserRound },
  ];

  const stats = [
    { title: "Total Events", value: "12", icon: CalendarDays, color: accent },
    { title: "Registrations", value: "248", icon: Users, color: orange },
    { title: "Pending Approval", value: "3", icon: Clock3, color: yellow },
  ];

  const events = [
    {
      title: "Web Development Workshop",
      type: "Online · Workshop",
      status: "Approved",
    },
    {
      title: "Campus Hackathon",
      type: "Campus · Hackathon",
      status: "Pending",
    },
  ];

  const buttonClass =
    "rounded-lg px-4 py-3 font-semibold transition hover:opacity-90";

  function selectPage(label) {
    setActivePage(label);
    setSidebarOpen(false);
  }

  function renderContent() {
    if (activePage === "Create Event") {
      return <CreateEvent darkMode={darkMode} />;
    }

        if (activePage === "My Events") {
      return <MyEvents darkMode={darkMode} />;
    }

        if (activePage === "Registrations") {
      return <Registrations darkMode={darkMode} />;
    }

       if (activePage === "Analytics") {
      return <Analytics darkMode={darkMode} />;
    }
    if (activePage === "Profile") {
      return <OrganizerProfile darkMode={darkMode} />;
    }

    return (
      <>
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl p-5 sm:p-6"
                style={{ background: card }}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm" style={{ color: muted }}>
                    {item.title}
                  </p>
                  <Icon size={21} style={{ color: item.color }} />
                </div>

                <h2
                  className="text-3xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.value}
                </h2>
              </div>
            );
          })}
        </section>

        <section
          className="mb-6 rounded-2xl p-5 sm:p-7"
          style={{ background: card }}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">My Events</h2>

            <button
              onClick={() => selectPage("My Events")}
              className="font-semibold"
              style={{ color: accent }}
            >
              View All →
            </button>
          </div>

          {events.map((event) => (
            <div
              key={event.title}
              className="flex flex-wrap items-center justify-between gap-3 border-b py-4 last:border-0"
              style={{ borderColor: border }}
            >
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="mt-1 text-sm" style={{ color: muted }}>
                  {event.type}
                </p>
              </div>

              <span
                className="rounded-full px-3 py-1 text-sm"
                style={{
                  background:
                    event.status === "Approved"
                      ? darkMode
                        ? "#263D30"
                        : "#DCE7DF"
                      : darkMode
                        ? "#403721"
                        : "#F5E8BF",
                  color:
                    event.status === "Approved"
                      ? accent
                      : darkMode
                        ? "#E5B869"
                        : "#735710",
                }}
              >
                {event.status}
              </span>
            </div>
          ))}

          <p className="mt-3 text-xs" style={{ color: muted }}>
            Sample data — connect the backend for live event information.
          </p>
        </section>

        <section className="rounded-2xl p-5 sm:p-7" style={{ background: card }}>
          <h2 className="mb-4 text-xl font-bold">Quick Actions</h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => selectPage("Create Event")}
              className={buttonClass}
              style={{ background: green, color: "#FFFFFF" }}
            >
              <Plus size={17} className="mr-1 inline" />
              Create New Event
            </button>

            <button
              onClick={() => selectPage("Registrations")}
              className={buttonClass}
              style={{ border: `1px solid ${accent}`, color: accent }}
            >
              <Users size={17} className="mr-1 inline" />
              Manage Registrations
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: bg, color: text }}>
      {sidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r p-5 transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: card, borderColor: border }}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold" style={{ color: accent }}>
            Opportunity Hub
          </h2>

          <button
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X />
          </button>
        </div>

        <p
          className="mb-4 text-xs font-semibold uppercase tracking-wider"
          style={{ color: muted }}
        >
          Organizer Menu
        </p>

        <nav className="grid gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.label;

            return (
              <button
                key={item.label}
                onClick={() => selectPage(item.label)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition"
                style={{
                  background: active
                    ? darkMode
                      ? "#263D30"
                      : "#DCE7DF"
                    : "transparent",
                  color: active ? accent : text,
                  fontWeight: active ? 600 : 400,
                }}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t pt-4" style={{ borderColor: border }}>
          <button
            onClick={onChangeRole}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold"
            style={{ color: accent }}
          >
            <ArrowLeft size={18} />
            Change Role
          </button>
        </div>
      </aside>

      <main className="min-w-0 lg:ml-64">
        <header
          className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-4 sm:px-7"
          style={{ background: bg, borderColor: border }}
        >
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 lg:hidden"
              style={{ background: card }}
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-sm" style={{ color: muted }}>
                Opportunity Hub / Organizer
              </p>
              <h1 className="text-xl font-bold sm:text-2xl">{activePage}</h1>
            </div>
          </div>

          <button
            onClick={() => selectPage("Create Event")}
            className={buttonClass}
            style={{ background: green, color: "#FFFFFF" }}
          >
            <Plus size={17} className="mr-1 inline" />
            Create Event
          </button>
        </header>

        <div className="p-4 sm:p-7">
          <div className="mb-6">
            <p style={{ color: muted }}>
              Manage your events and registrations.
            </p>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}

