import { useState, useEffect } from ""react"";
import { CalendarDays } from ""lucide-react"";
import { getOpportunities } from ""../../services/api"";

export default function ManageEvents({ darkMode = false }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const card = darkMode ? ""#1B1F1C"" : ""#EEEEEB"";
  const text = darkMode ? ""#F1F3EF"" : ""#1E1E1C"";
  const muted = darkMode ? ""#9A9F9A"" : ""#6B6F6B"";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getOpportunities();
        if (data.success) {
          setEvents(data.opportunities || []);
        }
      } catch (error) {
        console.error(""Failed to load events:"", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className=""space-y-6"">
      <div>
        <h1 className=""text-2xl font-bold"" style={{ color: text }}>
          Manage Events
        </h1>
        <p className=""mt-1 text-sm"" style={{ color: muted }}>
          View all events available on the platform.
        </p>
      </div>

      {loading ? (
        <p style={{ color: muted }}>Loading events from server...</p>
      ) : events.length === 0 ? (
        <div className=""rounded-2xl p-8 text-center"" style={{ background: card }}>
          <CalendarDays className=""mx-auto mb-3"" style={{ color: ""#1F4D3F"" }} size={35} />
          <p className=""font-semibold"" style={{ color: text }}>No events found</p>
          <p className=""mt-1 text-sm"" style={{ color: muted }}>
            No events have been created yet.
          </p>
        </div>
      ) : (
        <div className=""grid gap-4 sm:grid-cols-2"">
          {events.map((event) => (
            <div
              key={event._id}
              className=""rounded-2xl p-5 shadow-sm""
              style={{ background: card }}
            >
              <h2 className=""font-bold"" style={{ color: text }}>{event.title}</h2>
              <p className=""mt-2 text-sm"" style={{ color: muted }}>
                {event.category} - {event.organization}
              </p>
              <div className=""mt-3 flex items-center justify-between"">
                <p className=""text-sm font-medium"" style={{ color: text }}>
                  Deadline: {new Date(event.deadline).toLocaleDateString()}
                </p>
                <span className=""rounded-full px-2 py-1 text-xs font-semibold"" style={{ background: darkMode ? ""#26382E"" : ""#DCE7DF"", color: darkMode ? ""#8FD3B0"" : ""#1F4D3F"" }}>
                  {event.status || ""Pending""}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
