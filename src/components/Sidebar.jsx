import {
  House,
  Search,
  CalendarDays,
  ClipboardList,
  UserRound,
} from "lucide-react";

import logo from "../assets/opportunity-logo.jpeg";

function Sidebar() {
  return (
    <aside className="w-[165px] min-h-screen shrink-0 bg-white border-r border-[#dfe7ee] flex flex-col">

      <div className="px-4 pt-5">
        <div className="flex items-center gap-2">

          <img
            src={logo}
            alt="Opportunity Hub logo"
            className="w-[30px] h-[30px] object-contain"
          />

          <span className="text-[11px] font-bold text-[#164b83] whitespace-nowrap">
            Opportunity Hub
          </span>

        </div>
      </div>

    
      <nav className="mt-7 px-3 space-y-2">

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e6efff] text-[#1665c1] text-[11px] font-semibold"
        >
          <House size={14} />
          Home
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#566575] text-[11px]"
        >
          <Search size={14} />
          Explore
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#566575] text-[11px]"
        >
          <CalendarDays size={14} />
          My Events
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#566575] text-[11px]"
        >
          <ClipboardList size={14} />
          Registration
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#566575] text-[11px]"
        >
          <UserRound size={14} />
          Profile
        </a>

      </nav>

      
      <div className="mt-auto p-3">

        <div className="rounded-lg bg-[#e6efff] p-3">

          <div className="text-[#2775d6] text-xl mb-2">
            ✦
          </div>

          <p className="text-[10px] leading-[1.25] font-semibold text-[#2c68b5]">
            Small steps
            <br />
            lead to big
            <br />
            opportunities.
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;