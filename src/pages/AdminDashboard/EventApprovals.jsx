
import { useState } from "react";
import { ClipboardCheck, Clock3, CheckCircle2, XCircle } from "lucide-react";

export default function EventApprovals({ darkMode = false }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Campus Hackathon",
      category: "Technology · Online",
      status: "Pending",
    },
    {
      id: 2,
      title: "Design Workshop",
      category: "Design · Campus",
      status: "Pending",
    },
  ]);

  const [message, setMessage] = useState("");

  const card = darkMode ? "#1B1F1C" : "#EEEEEB";
  const text = darkMode ? "#F1F3EF" : "#1E1E1C";
  const muted = darkMode ? "#9A9F9A" : "#6B6F6B";
  const border = darkMode ? "#343A35" : "#D9DCD6";
  const green = darkMode ? "#8FD3B0" : "#1F4D3F";
  const orange = darkMode ? "#F0805A" : "#D9673B";

  const updateStatus = (id, status) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id ? { ...event, status } : event
      )
    );

    setMessage(`Event marked as ${status.toLowerCase()}.`);
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
        <p className="text-sm font-medium" style={{ color: green }}>
          {message}
        </p>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
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
                    {event.category}
                  </p>
                  <span
                    className="mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background:
                        event.status === "Approved"
                          ? darkMode ? "#26382E" : "#DCE7DF"
                          : event.status === "Rejected"
                            ? darkMode ? "#3A2522" : "#F8E1DA"
                            : darkMode ? "#332D1D" : "#F5E8BF",
                      color:
                        event.status === "Approved"
                          ? green
                          : event.status === "Rejected"
                            ? orange
                            : "#947019",
                    }}
                  >
                    <Clock3 size={13} />
                    {event.status}
                  </span>
                </div>
              </div>

              {event.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateStatus(event.id, "Approved")}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-white"
                    style={{ background: "#1F4D3F" }}
                  >
                    <CheckCircle2 size={16} />
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() => updateStatus(event.id, "Rejected")}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-white"
                    style={{ background: "#D9673B" }}
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div
            className="rounded-2xl border p-8 text-center"
            style={{ background: card, borderColor: border, color: muted }}
          >
            No events to review.
          </div>
        )}
      </div>
    </div>
  );
}
