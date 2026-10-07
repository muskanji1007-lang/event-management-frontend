
import { useEffect, useState } from "react";
import { CalendarDays, Users, RefreshCw, Loader2 } from "lucide-react";
import { getOpportunities, deleteOpportunity } from "../../services/api";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getOpportunities();
    
      const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
      const myEvents = (data.opportunities || []).filter(
        (opp) =>
          opp.createdBy?._id === loggedInUser.id ||
          opp.createdBy === loggedInUser.id
      );
      setEvents(myEvents);
    } catch (err) {
      setError(err.message || "Unable to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteOpportunity(id);
      setEvents((prev) => prev.filter((e) => (e._id || e.id) !== id));
    } catch (err) {
      alert(err.message || "Unable to delete event.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1C]">My Events</h1>
          <p className="mt-1 text-sm text-[#6B6F6B]">
            View the events you have created.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchEvents}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-[#1F4D3F] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {}
      {loading && (
        <div className="flex items-center justify-center rounded-2xl bg-[#EEEEEB] p-10">
          <Loader2 className="animate-spin text-[#1F4D3F]" size={30} />
        </div>
      )}

      {}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Unable to load events</p>
          <p className="mt-1">{error}</p>
          <button
            type="button"
            onClick={fetchEvents}
            className="mt-3 rounded-lg bg-[#1F4D3F] px-4 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      )}

      {}
      {!loading && !error && events.length === 0 && (
        <div className="rounded-2xl bg-[#EEEEEB] p-8 text-center">
          <CalendarDays className="mx-auto mb-3" size={32} />
          <p className="font-medium">No events created yet.</p>
          <p className="mt-1 text-sm text-[#6B6F6B]">
            Create an event to see it listed here.
          </p>
        </div>
      )}

      {}
      {!loading && !error && events.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => {
            const eventId = event._id || event.id;
            return (
              <div
                key={eventId}
                className="rounded-2xl border border-[#D9DCD6] bg-[#EEEEEB] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">{event.title}</h2>
                    <p className="mt-1 text-sm text-[#6B6F6B]">
                      {event.category} · {event.location || "Online"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      event.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : event.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-[#E8B84A] text-[#1E1E1C]"
                    }`}
                  >
                    {event.status || "Pending"}
                  </span>
                </div>

                <p className="mt-4 text-sm">
                  <CalendarDays className="mr-2 inline" size={16} />
                  Deadline:{" "}
                  {event.deadline
                    ? new Date(event.deadline).toLocaleDateString("en-IN")
                    : "—"}
                </p>

                <p className="mt-2 text-sm">
                  <Users className="mr-2 inline" size={16} />
                  {event.organization || "—"}
                </p>

                {event.description && (
                  <p className="mt-3 line-clamp-2 text-sm text-[#6B6F6B]">
                    {event.description}
                  </p>
                )}

                {event.applicationLink && (
                  <a
                    href={event.applicationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-medium text-[#1F4D3F] underline"
                  >
                    Application Link ↗
                  </a>
                )}

                <button
                  onClick={() => handleDelete(eventId)}
                  className="mt-4 rounded-lg border border-[#D9673B] px-4 py-2 text-sm font-medium text-[#D9673B] transition hover:bg-[#D9673B] hover:text-white"
                >
                  Delete Event
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
