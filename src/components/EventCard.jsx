import { ArrowRight, CalendarDays } from "lucide-react";

function EventCard({ event, color = "blue" }) {

  const colors = {
    blue: "from-[#0966ae] to-[#07539a]",
    cyan: "from-[#0798b8] to-[#0872a7]",
    green: "from-[#0b9b78] to-[#08735f]",
  };

  return (
    <div
      className={`
        bg-gradient-to-br ${colors[color]}
        rounded-xl
        p-3
        h-[95px]
        text-white
        shadow-sm
      `}
    >

      <div className="flex items-center justify-between">

        <span className="bg-[#7053d7] rounded-full px-2 py-1 text-[7px]">
          {event.category}
        </span>

        <ArrowRight size={10} />

      </div>

      <h3 className="text-[10px] font-bold mt-2">
        {event.title}
      </h3>

      <p className="text-[7px] text-blue-100 mt-1 leading-tight line-clamp-2">
        {event.description}
      </p>

      <div className="inline-flex items-center gap-1 bg-white text-[#273b4e] rounded-full px-2 py-1 text-[7px] mt-2">

        <CalendarDays size={8} />

        {event.date}

      </div>

    </div>
  );
}

export default EventCard;