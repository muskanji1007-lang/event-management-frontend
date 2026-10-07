import { useState, useEffect } from "react";
import { ClipboardCheck, Clock3, CheckCircle2, XCircle } from "lucide-react";
import { getOpportunities, updateOpportunity, getEventRisk } from "../../services/api";

export default function EventApprovals({ darkMode = false }) {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [riskScores, setRiskScores] = useState({});

  const analyzeRisk = async (event) => {
    const eventId = event._id || event.id;
    setRiskScores(prev => ({ ...prev, [eventId]: 'loading' }));
    try {
      const result = await getEventRisk(event);
      setRiskScores(prev => ({ ...prev, [eventId]: result }));
    } catch (e) {
      setRiskScores(prev => ({ ...prev, [eventId]: null }));
    }
  };

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
      const eventId = event._id || event.id;
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

      try {
        await updateOpportunity(eventId, updatedData);
      } catch (backendError) {
        
      }

      setEvents((current) =>
        current.map((e) =>
          (e._id === eventId || e.id === eventId) ? { ...e, status: newStatus } : e
        )
      );

      setMessage("Event marked as " + newStatus.toLowerCase() + ".");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update event status.");
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
                key={event._id || event.id || Math.random()}
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
                                            <div className="flex flex-col gap-2">
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
                      
                      {}
                      {!riskScores[event._id || event.id] ? (
                        <button
                          type="button"
                          onClick={() => analyzeRisk(event)}
                          className="flex items-center justify-center gap-1 rounded-lg border border-[#E8B84A] bg-[#E8B84A]/10 px-3 py-1.5 text-xs font-semibold text-[#E8B84A] transition hover:bg-[#E8B84A] hover:text-white"
                        >
                          ?? Analyze Risk (ML)
                        </button>
                      ) : riskScores[event._id || event.id] === 'loading' ? (
                        <span className="text-xs text-[#E8B84A] animate-pulse">Analyzing...</span>
                      ) : (
                        <div className="mt-1 flex flex-col gap-1 text-xs">
                           <span className="font-bold text-[#D9673B]">Risk Score: {riskScores[event._id || event.id].risk_score}/100</span>
                           <span className="text-[#6B6F6B]">Priority: {riskScores[event._id || event.id].review_priority}</span>
                        </div>
                      )}
                      </div>
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

