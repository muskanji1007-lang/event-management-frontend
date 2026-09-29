import {
  Monitor,
  BriefcaseBusiness,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

function UpcomingEvents() {

  const upcomingEvents = [
    {
      title: "Web Development Workshop",
      date: "Oct 22, 2026",
      time: "10:00AM",
      icon: Monitor,
      bg: "bg-[#b9eee9]",
    },
    {
      title: "Product Management Bootcamp",
      date: "Oct 16, 2026",
      time: "10:00AM",
      icon: BriefcaseBusiness,
      bg: "bg-[#ffd09e]",
    },
    {
      title: "Design Thinking Workshop",
      date: "Oct 10, 2026",
      time: "10:00AM",
      icon: Lightbulb,
      bg: "bg-[#c7a7f3]",
    },
    {
      title: "Tech Internship Program",
      date: "Oct 01, 2026",
      time: "10:00AM",
      icon: GraduationCap,
      bg: "bg-[#efb5e6]",
    },
  ];

  return (
    <div className="bg-white border border-[#dce4ea] rounded-xl p-3 shadow-sm">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-[11px] font-bold text-[#263442]">
          Upcoming Events
        </h2>

        <button className="text-[7px] text-[#1474d1]">
          View All →
        </button>

      </div>

      <div className="space-y-3">

        {upcomingEvents.map((event) => {

          const Icon = event.icon;

          return (
            <div
              key={event.title}
              className="flex items-center gap-2"
            >

              <div
                className={`${event.bg} w-8 h-8 rounded-md flex items-center justify-center shrink-0`}
              >
                <Icon size={14} />
              </div>

              <div className="min-w-0">

                <p className="text-[8px] font-semibold text-[#303c49] truncate">
                  {event.title}
                </p>

                <p className="text-[6px] text-[#89939d] mt-1">
                  {event.date} &nbsp; {event.time}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default UpcomingEvents;