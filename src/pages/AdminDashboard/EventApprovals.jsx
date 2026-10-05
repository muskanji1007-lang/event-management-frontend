import { useState, useEffect } from "react";
import { ClipboardCheck, Clock3, CheckCircle2, XCircle } from "lucide-react";
import { getOpportunities, updateOpportunity } from "../../services/api";

export default function EventApprovals({ darkMode = false }) {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const card = darkMode ? "#1B1F1C" : "#EEEEEB";
  const text = darkMode ? "#F1F3EF" : "#1E1E1C";
  const muted = darkMode ? "#9A9F9A" : "#6B6F6B";
  const border = darkMode ? "#343A35" : "#D9DCD6";
  const green = darkMode ? "#8FD3B0" : "#1F4D3F";
  const orange = darkMode ? "#F0805A" : "#D9673B";

  const fetchEvents = async () => {
    try {
      const data = await getOpportunities();
      if (data.success) {
        setEvents(data.opportunities || []);
      }
    } catch (error) {
      console.error("Failed to load events:", error);
      setMessage("Failed to load events from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const updateStatus = async (event, newStatus) => {
    try {
      // Create the updated payload according to the backend schema, adding the new status
      const updatedData = {
        title: event.title,
        description: event.description,
        organization: event.organization,
        category: event.category,
        skillsRequired: event.skillsRequired || [],
        location: event.location || "Remote",
        deadline: event.deadline || new Date().toISOString(),
        applicationLink: event.applicationLink || "",
        status: newStatus
      };

      await updateOpportunity(event._id, updatedData);
      
      // Update local state to reflect the new status
      setEvents((current) =>
        current.map((e) =>
          e._id === event._id ? { ...e, status: newStatus } : e
        )
      );

      setMessage(\Event marked as \.\);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Failed to update status:", error);
      setMessage(error.message || "Failed to update event status.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: text }}>
          Event Approvals
        </h1>
        <p className="mt-1 text-sm" style={{ color: muted }}>
          Review events submitted for approval.
        </p>
      </div>

      {message && (
        <p className="text-sm font-medium" style={{ color: message.includes("Failed") ? "#ef4444" : green }}>
          {message}
        </p>
      )}

      {loading ? (
        <p style={{ color: muted }}>Loading events...</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const currentStatus = event.status || "Pending";
            return (
              <div
                key={event._id}
                className="rounded-2xl border p-5"
                style={{ background: card, borderColor: border }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span
                      className="rounded-xl p-3"
                      style={{
                        background: darkMode ? "#26382E" : "#DCE7DF",
                        color: green,
                      }}
                    >
                      <ClipboardCheck size={22} />
                    </span>

                    <div>
                      <h2 className="font-bold" style={{ color: text }}>
                        {event.title}
                      </h2>
                      <p className="mt-1 text-sm" style={{ color: muted }}>
                        {event.category} - {event.organization}
                      </p>
                      <span
                        className="mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background:
                            currentStatus === "Approved"
                              ? darkMode ? "#26382E" : "#DCE7DF"
                              : currentStatus === "Rejected"
                                ? darkMode ? "#3A2522" : "#F8E1DA"
                                : darkMode ? "#332D1D" : "#F5E8BF",
                          color:
                            currentStatus === "Approved"
                              ? green
                              : currentStatus === "Rejected"
                                ? orange
                                : "#947019",
                        }}
                      >
                        <Clock3 size={13} />
                        {currentStatus}
                      </span>
                    </div>
                  </div>

                  {currentStatus === "Pending" && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateStatus(event, "Approved")}
                        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "#1F4D3F" }}
                      >
                        <CheckCircle2 size={16} />
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() => updateStatus(event, "Rejected")}
                        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "#D9673B" }}
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {events.length === 0 && (
            <div
              className="rounded-2xl border p-8 text-center"
              style={{ background: card, borderColor: border, color: muted }}
            >
              No events to review.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

