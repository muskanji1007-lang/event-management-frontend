import { Bell, User } from "lucide-react";

function Navbar() {
  return (
    <header className="border-b border-[#E2E2DD] bg-[#F5F5F2]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#1F4D3F]">
            <span className="text-lg font-bold text-white">
              O
            </span>
          </div>

          <span className="text-xl font-semibold text-[#1F4D3F]">
            Opportunity Hub
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#home"
            className="text-sm font-medium text-[#1E1E1C] hover:text-[#1F4D3F]"
          >
            Home
          </a>

          <a
            href="#explore"
            className="text-sm font-semibold text-[#1F4D3F]"
          >
            Explore
          </a>

          <a
            href="#my-opportunities"
            className="text-sm font-medium text-[#1E1E1C] hover:text-[#1F4D3F]"
          >
            My Opportunities
          </a>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-2.5 text-[#1E1E1C] hover:bg-[#EEEEEB]"
          >
            <Bell size={20} strokeWidth={1.8} />
          </button>

          {/* Profile */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-full px-3 py-2 text-[#1E1E1C] hover:bg-[#EEEEEB]"
          >
            <User size={20} strokeWidth={1.8} />

            <span className="hidden text-sm font-medium sm:block">
              Profile
            </span>
          </button>

        </div>

      </nav>
    </header>
  );
}

export default Navbar;