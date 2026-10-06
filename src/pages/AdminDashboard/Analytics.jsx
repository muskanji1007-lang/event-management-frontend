import { useState, useEffect } from "react";
import {
  ChartNoAxesColumn,
  Users,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { getOpportunities, getAllUsers } from "../../services/api";

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
        const eventsRes = await getOpportunities();
        let totalEvents = 0;
        let approvedEvents = 0;
        let pendingEvents = 0;
        let rejectedEvents = 0;

        if (eventsRes.success && eventsRes.opportunities) {
          totalEvents = eventsRes.opportunities.length;
          eventsRes.opportunities.forEach((evt) => {
            const status = (evt.status || "Pending").toLowerCase();
            if (status === "approved") approvedEvents++;
            else if (status === "rejected") rejectedEvents++;
            else pendingEvents++;
          });
        }

        let totalUsers = 0;
        let totalOrganizers = 0;
        try {
          const usersRes = await getAllUsers();
          if (usersRes.success && usersRes.users) {
            totalUsers = usersRes.users.length;
            totalOrganizers = usersRes.users.filter((u) => u.role === "ORGANIZER").length;
          }
        } catch (e) {
          console.warn("Could not fetch users for analytics", e);
        }

        setData({
          totalUsers,
          totalEvents,
          approvedEvents,
          pendingEvents,
          rejectedEvents,
          totalOrganizers,
        });
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const totalUsers = data ? data.totalUsers : "...";
  const totalEvents = data ? data.totalEvents : "...";
  const approvedEvents = data ? data.approvedEvents : "...";
  const pendingEvents = data ? data.pendingEvents : "...";

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
          <p className="text-sm" style={{ color: muted }}>Loading live data...</p>
        ) : data ? (
          <div className="space-y-4">
            <p className="text-sm" style={{ color: text }}>
              <strong>Platform Organizers:</strong> {data.totalOrganizers} registered.
            </p>
            <p className="text-sm" style={{ color: text }}>
              <strong>Event Rejection Rate:</strong> {data.rejectedEvents} rejected recently.
            </p>
          </div>
        ) : (
          <p className="text-sm" style={{ color: muted }}>
            Could not calculate Analytics. Ensure your connection is stable.
          </p>
        )}
      </div>
    </div>
  );
}
