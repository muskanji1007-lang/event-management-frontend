import { useEffect, useState } from "react";
import {
  Users,
  ClipboardList,
  RefreshCw,
  CalendarDays,
  Loader2,
} from "lucide-react";
import { getOpportunities } from "../../services/api";

export default function Registrations() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getOpportunities();
      let allEvents = data.opportunities || [];
      
      const eventsWithCounts = await Promise.all(
        allEvents.map(async (event) => {
          try {
            const token = localStorage.getItem("accessToken");
            const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://backend-task-3-zr8a.vercel.app/api/v1";
            const applicantRes = await fetch(baseUrl + "/opportunities/" + event._id + "/applicants", {
              headers: { Authorization: "Bearer " + token }
            });
            const applicantData = await applicantRes.json();
            
            if (applicantData.success) {
              return { ...event, registrationsCount: applicantData.count || 0 };
            }
            return { ...event, registrationsCount: 0 };
          } catch (e) {
            return { ...event, registrationsCount: 0 };
          }
        })
      );
      
      setEvents(eventsWithCounts);
    } catch (err) {
      setError(err.message || "Something went wrong while loading events.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const totalRegistrations = events.reduce(
    (total, event) =>
      total + Number(event.registrationsCount ?? event.registrations ?? 0),
    0
  );

  const cardClass = "rounded-2xl bg-[#EEEEEB] p-5";
  const mutedClass = "text-sm text-[#6B6F6B]";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1C]">Registrations</h1>
          <p className="mt-1 text-sm text-[#6B6F6B]">
            Manage your events and registration overview.
          </p>
        </div>

        <button
          type="button"
          onClick={loadEvents}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-[#1F4D3F] px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={cardClass}>
          <Users className="mb-3 text-[#1F4D3F]" size={26} />
          <p className={mutedClass}>Total Registrations</p>
          <h2 className="mt-1 text-3xl font-bold text-[#1E1E1C]">
            {loading ? "—" : totalRegistrations}
          </h2>
        </div>

        <div className={cardClass}>
          <ClipboardList className="mb-3 text-[#D9673B]" size={26} />
          <p className={mutedClass}>Events Available</p>
          <h2 className="mt-1 text-3xl font-bold text-[#1E1E1C]">
            {loading ? "—" : events.length}
          </h2>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className={`${cardClass} flex items-center justify-center py-10`}>
          <Loader2 className="animate-spin text-[#1F4D3F]" size={30} />
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p className="font-semibold">Unable to load events</p>
          <p className="mt-1">{error}</p>
          <button
            type="button"
            onClick={loadEvents}
            className="mt-3 rounded-lg bg-[#1F4D3F] px-4 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Events table */}
      {!loading && !error && events.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-[#D9DCD6]">
          <div className="border-b border-[#D9DCD6] p-5">
            <h2 className="font-semibold text-[#1E1E1C]">
              Event Registration Overview
            </h2>
            <p className={`mt-1 ${mutedClass}`}>
              All opportunities on the platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#EEEEEB] text-[#1E1E1C]">
                <tr>
                  <th className="p-4">Event</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4">Registrations</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event, index) => (
                  <tr
                    key={event._id || event.id || index}
                    className="border-t border-[#D9DCD6] bg-[#F5F5F2]"
                  >
                    <td className="p-4">
                      <div className="font-medium text-[#1E1E1C]">
                        {event.title || "Untitled Event"}
                      </div>
                      <div className="mt-1 text-xs text-[#6B6F6B]">
                        {event.organization || "—"}
                      </div>
                    </td>

                    <td className="p-4 text-[#1E1E1C]">
                      {event.category || "—"}
                    </td>

                    <td className="p-4 text-[#1E1E1C]">
                      {event.deadline
                        ? new Date(event.deadline).toLocaleDateString("en-IN")
                        : "—"}
                    </td>

                    <td className="p-4 text-[#1E1E1C]">
                      {event.registrationsCount ?? event.registrations ?? 0}
                      {event.maxParticipants != null
                        ? ` / ${event.maxParticipants}`
                        : ""}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          event.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : event.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-[#E8B84A]/20 text-[#1E1E1C]"
                        }`}
                      >
                        {event.status || "Available"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && events.length === 0 && (
        <div className={`${cardClass} py-10 text-center`}>
          <CalendarDays size={36} className="mx-auto mb-3 text-[#1F4D3F]" />
          <h2 className="text-lg font-semibold text-[#1E1E1C]">
            No events found
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#6B6F6B]">
            Create an event to see it here.
          </p>
          <button
            type="button"
            onClick={loadEvents}
            className="mt-5 rounded-xl bg-[#1F4D3F] px-5 py-3 font-medium text-white hover:opacity-90"
          >
            Refresh Events
          </button>
        </div>
      )}

      <p className="text-xs text-[#6B6F6B]">
        Registration counts depend on registration data provided by the backend.
      </p>
    </div>
  );
}