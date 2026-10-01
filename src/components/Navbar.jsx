import { useState } from "react";
import {
  Bell,
  User,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function Navbar({
  darkMode,
  setDarkMode,
  onHome,
  onExplore,
  onMyOpportunities,
  onProfile,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = (callback) => {
    callback();
    setMobileOpen(false);
  };

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

        <div className="hidden items-center gap-6 md:flex">

          <button
            type="button"
            onClick={onHome}
            className="text-sm font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
          >
            Home
          </button>

          <button
            type="button"
            onClick={onExplore}
            className="text-sm font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
          >
            Explore
          </button>

          <button
            type="button"
            onClick={onMyOpportunities}
            className="text-sm font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
          >
            My Opportunities
          </button>

        </div>

        <div className="hidden items-center gap-2 md:flex">

          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <button
            type="button"
            aria-label="Notifications"
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
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

      </nav>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-4 py-4 md:hidden">

          <div className="flex flex-col gap-2">

            <button
              type="button"
              onClick={() => handleNavigation(onHome)}
              className="rounded-lg px-4 py-3 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-soft)]"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNavigation(onExplore)}
              className="rounded-lg px-4 py-3 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-soft)]"
            >
              Explore
            </button>

            <button
              type="button"
              onClick={() => handleNavigation(onMyOpportunities)}
              className="rounded-lg px-4 py-3 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-soft)]"
            >
              My Opportunities
            </button>

            <button
              type="button"
              onClick={() => handleNavigation(onProfile)}
              className="rounded-lg px-4 py-3 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-soft)]"
            >
              Profile
            </button>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;