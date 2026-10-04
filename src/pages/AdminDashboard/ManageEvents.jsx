
import { CalendarDays } from "lucide-react";

export default function ManageEvents() {
  const events = JSON.parse(
    localStorage.getItem("organizerEvents") || "[]"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1E1E1C]">
          Manage Events
        </h1>
        <p className="mt-1 text-sm text-[#6B6F6B]">
          View events available in local storage.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="rounded-2xl bg-[#EEEEEB] p-8 text-center">
          <CalendarDays className="mx-auto mb-3 text-[#1F4D3F]" size={35} />
          <p className="font-semibold">No locally saved events</p>
          <p className="mt-1 text-sm text-[#6B6F6B]">
            Events saved through the backend may not appear here yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event, index) => (
            <div
              key={event.id || index}
              className="rounded-2xl bg-[#EEEEEB] p-5"
            >
              <h2 className="font-bold">{event.title}</h2>
              <p className="mt-2 text-sm text-[#6B6F6B]">
                {event.category}
              </p>
              <p className="mt-1 text-sm">{event.date || "Date not available"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}