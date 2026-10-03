import { useEffect, useState } from "react";
import { CalendarDays, Users } from "lucide-react";

export default function MyEvents() {
const [events, setEvents] = useState([]);

useEffect(() => {
const savedEvents = JSON.parse(
localStorage.getItem("organizerEvents") || "[]"
);
setEvents(savedEvents);
}, []);

const deleteEvent = (id) => {
const updatedEvents = events.filter((event) => event.id !== id);
localStorage.setItem("organizerEvents", JSON.stringify(updatedEvents));
setEvents(updatedEvents);
};

return ( <div className="space-y-6"> <div> <h1 className="text-2xl font-bold text-[#1E1E1C]">My Events</h1> <p className="mt-1 text-sm text-[#6B6F6B]">
View the events you have created. </p> </div>

  {events.length === 0 ? (
    <div className="rounded-2xl bg-[#EEEEEB] p-8 text-center">
      <CalendarDays className="mx-auto mb-3" size={32} />
      <p className="font-medium">No events created yet.</p>
      <p className="mt-1 text-sm text-[#6B6F6B]">
        Create an event to see it listed here.
      </p>
    </div>
  ) : (
    <div className="grid gap-4 md:grid-cols-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="rounded-2xl border border-[#D9DCD6] bg-[#EEEEEB] p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">{event.title}</h2>
              <p className="mt-1 text-sm text-[#6B6F6B]">
                {event.category} · {event.mode}
              </p>
            </div>
            <span className="rounded-full bg-[#E8B84A] px-3 py-1 text-xs font-semibold">
              {event.status}
            </span>
          </div>

          <p className="mt-4 text-sm">
            <CalendarDays className="mr-2 inline" size={16} />
            {event.date} at {event.time}
          </p>

          <p className="mt-2 text-sm">
            <Users className="mr-2 inline" size={16} />
            {event.registrations} registrations / {event.maxParticipants} seats
          </p>

          <p className="mt-3 text-sm text-[#6B6F6B]">
            {event.description}
          </p>

          <button
            onClick={() => deleteEvent(event.id)}
            className="mt-4 rounded-lg border border-[#D9673B] px-4 py-2 text-sm font-medium text-[#D9673B]"
          >
            Delete Event
          </button>
        </div>
      ))}
    </div>
  )}
</div>
);
}
