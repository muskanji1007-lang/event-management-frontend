import { useEffect, useState } from "react";
import { CalendarDays, Users, TrendingUp } from "lucide-react";

export default function Analytics() {
const [events, setEvents] = useState([]);

useEffect(() => {
setEvents(
JSON.parse(localStorage.getItem("organizerEvents") || "[]")
);
}, []);

const totalRegistrations = events.reduce(
(total, event) => total + Number(event.registrations || 0),
0
);

const totalCapacity = events.reduce(
(total, event) => total + Number(event.maxParticipants || 0),
0
);

const fillRate =
totalCapacity > 0
? Math.round((totalRegistrations / totalCapacity) * 100)
: 0;

const stats = [
{
title: "Events Created",
value: events.length,
icon: CalendarDays,
color: "#1F4D3F",
},
{
title: "Registrations",
value: totalRegistrations,
icon: Users,
color: "#D9673B",
},
{
title: "Capacity Filled",
value: `${fillRate}%`,
icon: TrendingUp,
color: "#B18A24",
},
];

return ( <div className="space-y-6"> <div> <h1 className="text-2xl font-bold text-[#1E1E1C]">Analytics</h1> <p className="mt-1 text-sm text-[#6B6F6B]">
An overview of your event activity. </p> </div>

```
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {stats.map((stat) => {
      const Icon = stat.icon;

      return (
        <div
          key={stat.title}
          className="rounded-2xl bg-[#EEEEEB] p-5"
        >
          <Icon size={27} style={{ color: stat.color }} />
          <p className="mt-4 text-sm text-[#6B6F6B]">{stat.title}</p>
          <h2 className="mt-1 text-3xl font-bold">{stat.value}</h2>
        </div>
      );
    })}
  </div>

  <div className="rounded-2xl bg-[#EEEEEB] p-5">
    <h2 className="text-lg font-bold">Events Overview</h2>

    {events.length === 0 ? (
      <p className="mt-3 text-sm text-[#6B6F6B]">
        Create your first event to see analytics here.
      </p>
    ) : (
      <div className="mt-4 space-y-4">
        {events.map((event) => {
          const capacity = Number(event.maxParticipants || 0);
          const registrations = Number(event.registrations || 0);
          const percentage =
            capacity > 0
              ? Math.min(100, Math.round((registrations / capacity) * 100))
              : 0;

          return (
            <div key={event.id}>
              <div className="mb-2 flex flex-wrap justify-between gap-2 text-sm">
                <span className="font-medium">{event.title}</span>
                <span className="text-[#6B6F6B]">
                  {registrations} / {capacity} participants
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#D9DCD6]">
                <div
                  className="h-full rounded-full bg-[#1F4D3F]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>

  <p className="text-xs text-[#6B6F6B]">
    These analytics use the event data saved in this browser. Live registration
    analytics will require backend data.
  </p>
</div>

);
}
