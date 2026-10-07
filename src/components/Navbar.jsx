import { Bell, User, Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

function Navbar({
  darkMode,
  setDarkMode,
  role,
  onHome,
  onExplore,
  onMyOpportunities,
  onProfile,
  onDashboard,
  onMyEvents,
  onCreateEvent,
  onRegistrations,
  onAnalytics,
  onManageUsers,
  onManageEvents,
  onApprovals,
  onRiskDetection,
  onChangeRole,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = (callback) => {
    if (callback) {
      callback();
    }
    setMobileOpen(false);
  };

  const userLinks = [
    { label: "Home", action: onHome },
    { label: "Explore", action: onExplore },
    { label: "My Opportunities", action: onMyOpportunities },
  ];

  const organizerLinks = [
    { label: "Dashboard", action: onDashboard },
    { label: "My Events", action: onMyEvents },
    { label: "Create Event", action: onCreateEvent },
    { label: "Registrations", action: onRegistrations },
    { label: "Analytics", action: onAnalytics },
  ];

  const adminLinks = [
    { label: "Dashboard", action: onDashboard },
    { label: "Manage Users", action: onManageUsers },
    { label: "Manage Events", action: onManageEvents },
    { label: "Event Approvals", action: onApprovals },
    { label: "Risk Detection", action: onRiskDetection },
    { label: "Analytics", action: onAnalytics },
  ];

  let links = userLinks;

  if (role === "organizer") {
    links = organizerLinks;
  }

  if (role === "admin") {
    links = adminLinks;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[var(--primary)]">
            <img
              src="/opportunity-logo.jpeg"
              alt="Opportunity Hub"
              className="h-full w-full object-contain"
            />
          </div>

          <span className="text-base font-bold text-[var(--text)] sm:text-lg">
            Opportunity Hub
          </span>
        </button>

        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={link.action}
              className="text-sm font-medium text-[var(--text)] transition hover:text-[var(--secondary)]"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">

          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <button
            type="button"
            onClick={() => alert("No new notifications.")}
            className="rounded-full p-2 text-[var(--text)] transition hover:bg-[var(--surface-soft)]"
          >
            <Bell size={19} />
          </button>

          <button
            type="button"
            onClick={onProfile}
            className="flex items-center gap-2 rounded-full px-2 py-2 text-[var(--text)] transition hover:bg-[var(--surface-soft)]"
          >
            <User size={19} />
            <span className="text-sm font-medium">
              Profile
            </span>
          </button>

          <button
            type="button"
            onClick={onChangeRole}
            className="ml-2 flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--surface-soft)]"
          >
            <ArrowLeft size={16} />
            Change Role
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">

          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-lg p-2 text-[var(--text)]"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-4 py-4 md:hidden">

          <div className="flex flex-col gap-2">

            {links.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavigation(link.action)}
                className="rounded-lg px-4 py-3 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-soft)]"
              >
                {link.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handleNavigation(onProfile)}
              className="rounded-lg px-4 py-3 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-soft)]"
            >
              Profile
            </button>

            <button
              type="button"
              onClick={() => handleNavigation(onChangeRole)}
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-soft)]"
            >
              <ArrowLeft size={17} />
              Change Role
            </button>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;