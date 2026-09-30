import { Bell, User } from "lucide-react";

function Navbar({
  onHome,
  onExplore,
  onMyOpportunities,
}) {
  return (
    <header className="border-b border-[#E2E2DD] bg-[#F5F5F2]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#1F4D3F]">
            <span className="text-lg font-bold text-white">
              O
            </span>
          </div>

          <span className="text-xl font-semibold text-[#1F4D3F]">
            Opportunity Hub
          </span>
        </button>

        
        <div className="hidden items-center gap-8 md:flex">

          
          <button
            type="button"
            onClick={onHome}
            className="text-sm font-medium text-[#1E1E1C] hover:text-[#1F4D3F]"
          >
            Home
          </button>


          <button
            type="button"
            onClick={onExplore}
            className="text-sm font-semibold text-[#1F4D3F] hover:text-[#173B31]"
          >
            Explore
          </button>

          <button
            type="button"
            onClick={onMyOpportunities}
            className="text-sm font-medium text-[#1E1E1C] hover:text-[#1F4D3F]"
          >
            My Opportunities
          </button>

        </div>

        
        <div className="flex items-center gap-3">

          
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => alert("No new notifications.")}
            className="rounded-full p-2.5 text-[#1E1E1C] hover:bg-[#EEEEEB]"
          >
            <Bell size={20} strokeWidth={1.8} />
          </button>

          
          <button
            type="button"
            onClick={() => alert("Profile page will open here.")}
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