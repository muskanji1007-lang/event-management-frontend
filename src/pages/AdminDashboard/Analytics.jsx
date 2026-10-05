import { useState, useEffect } from "react";
import {
  ChartNoAxesColumn,
  Users,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { getOrganizerAnalytics } from "../../services/api";

export default function Analytics({ darkMode = false }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const card = darkMode ? "#1B1F1C" : "#EEEEEB";
  const text = darkMode ? "#F1F3EF" : "#1E1E1C";
  const muted = darkMode ? "#9A9F9A" : "#6B6F6B";
  const border = darkMode ? "#343A35" : "#D9DCD6";
  const green = darkMode ? "#8FD3B0" : "#1F4D3F";
  const orange = darkMode ? "#F0805A" : "#D9673B";

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await getOrganizerAnalytics();
        if (result.success && result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const totalUsers = data ? data.platform_statistics.total_users : "...";
  const totalEvents = data ? data.platform_statistics.total_events : "...";
  const approvedEvents = data ? data.event_statistics.approved : "...";
  const pendingEvents = data ? data.event_statistics.pending : "...";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: text }}>
          Platform Analytics
        </h1>
        <p className="mt-1 text-sm" style={{ color: muted }}>
          Real-time overview of activity on Opportunity Hub.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border p-5" style={{ background: card, borderColor: border }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium" style={{ color: muted }}>Total Users</h3>
            <Users size={18} style={{ color: green }} />
          </div>
          <p className="mt-2 text-3xl font-bold" style={{ color: green }}>{totalUsers}</p>
        </div>

        <div className="rounded-2xl border p-5" style={{ background: card, borderColor: border }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium" style={{ color: muted }}>Total Events</h3>
            <CalendarDays size={18} style={{ color: orange }} />
          </div>
          <p className="mt-2 text-3xl font-bold" style={{ color: orange }}>{totalEvents}</p>
        </div>
        
        <div className="rounded-2xl border p-5" style={{ background: card, borderColor: border }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium" style={{ color: muted }}>Approved Events</h3>
            <TrendingUp size={18} style={{ color: green }} />
          </div>
          <p className="mt-2 text-3xl font-bold" style={{ color: text }}>{approvedEvents}</p>
        </div>

        <div className="rounded-2xl border p-5" style={{ background: card, borderColor: border }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium" style={{ color: muted }}>Pending Approvals</h3>
            <ChartNoAxesColumn size={18} style={{ color: orange }} />
          </div>
          <p className="mt-2 text-3xl font-bold" style={{ color: text }}>{pendingEvents}</p>
        </div>
      </div>

      <div className="rounded-2xl border p-6" style={{ background: card, borderColor: border }}>
        <div className="mb-4 flex items-center gap-2">
          <ChartNoAxesColumn size={20} style={{ color: green }} />
          <h2 className="text-lg font-bold" style={{ color: text }}>
            Live System Activity
          </h2>
        </div>
        {loading ? (
          <p className="text-sm" style={{ color: muted }}>Loading live data from ML services...</p>
        ) : data ? (
          <div className="space-y-4">
            <p className="text-sm" style={{ color: text }}>
              <strong>Platform Organizers:</strong> {data.platform_statistics.total_organizers} (Verified: {data.organizer_statistics.verified})
            </p>
            <p className="text-sm" style={{ color: text }}>
              <strong>Event Rejection Rate:</strong> {data.event_statistics.rejected} rejected recently.
            </p>
          </div>
        ) : (
          <p className="text-sm" style={{ color: muted }}>
            Could not connect to Analytics Server. Ensure you have the Admin/Organizer role.
          </p>
        )}
      </div>
    </div>
  );
}
