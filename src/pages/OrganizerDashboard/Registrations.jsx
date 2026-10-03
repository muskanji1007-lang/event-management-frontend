import { useEffect, useState } from "react";
import { Users, ClipboardList } from "lucide-react";

export default function Registrations() {
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

return ( <div className="space-y-6"> <div> <h1 className="text-2xl font-bold text-[#1E1E1C]">Registrations</h1> <p className="mt-1 text-sm text-[#6B6F6B]">
Registration overview for your events. </p> </div>

```
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="rounded-2xl bg-[#EEEEEB] p-5">
      <Users className="mb-3 text-[#1F4D3F]" size={26} />
      <p className="text-sm text-[#6B6F6B]">Total Registrations</p>
      <h2 className="mt-1 text-3xl font-bold">{totalRegistrations}</h2>
    </div>

    <div className="rounded-2xl bg-[#EEEEEB] p-5">
      <ClipboardList className="mb-3 text-[#D9673B]" size={26} />
      <p className="text-sm text-[#6B6F6B]">Events Created</p>
      <h2 className="mt-1 text-3xl font-bold">{events.length}</h2>
    </div>
  </div>

  {events.length === 0 ? (
    <div className="rounded-2xl bg-[#EEEEEB] p-8 text-center">
      No event registrations to display yet.
    </div>
  ) : (
    <div className="overflow-x-auto rounded-2xl border border-[#D9DCD6]">
      <table className="w-full min-w-[550px] text-left text-sm">
        <thead className="bg-[#EEEEEB]">
          <tr>
            <th className="p-4">Event</th>
            <th className="p-4">Date</th>
            <th className="p-4">Participants</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t border-[#D9DCD6]">
              <td className="p-4 font-medium">{event.title}</td>
              <td className="p-4">{event.date}</td>
              <td className="p-4">
                {event.registrations} / {event.maxParticipants}
              </td>
              <td className="p-4">{event.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  <p className="text-xs text-[#6B6F6B]">
    Participant-level details will appear after registration data is connected.
  </p>
</div>
);
}
