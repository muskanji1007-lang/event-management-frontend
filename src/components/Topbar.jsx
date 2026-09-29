import { Search, Bell, CircleUserRound } from "lucide-react";

function Topbar() {
  return (
    <header className="h-[48px] bg-white border-b border-[#e1e8ee] flex items-center justify-between px-4">


      <div className="w-[280px] h-[28px] bg-[#eef3ff] rounded-md flex items-center px-3">

        <Search
          size={13}
          className="text-[#9aa7b4]"
        />

        <input
          type="text"
          placeholder="Search events, internship, workshops..."
          className="ml-2 w-full bg-transparent outline-none text-[9px] text-gray-600 placeholder:text-[#9aa7b4]"
        />

      </div>


      <div className="flex items-center gap-4">

        <Bell
          size={13}
          className="text-gray-600"
        />

        <CircleUserRound
          size={17}
          className="text-[#1470d4]"
        />

      </div>

    </header>
  );
}

export default Topbar;