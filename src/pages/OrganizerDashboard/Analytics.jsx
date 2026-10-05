import { useEffect, useState } from "react";
import { CalendarDays, Users, TrendingUp, Loader2, RefreshCw } from "lucide-react";
import { getOrganizerAnalytics, getEventDemand } from "../../services/api";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [demand, setDemand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [analyticsData, demandData] = await Promise.all([
        getOrganizerAnalytics(),
        getEventDemand(),
      ]);
      setAnalytics(analyticsData.data || analyticsData);
      setDemand(demandData.data || demandData);
    } catch (err) {
      setError(err.message || "Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Derive stats from real API data
  const totalEvents =
    analytics?.platform_statistics?.total_events ??
    demand?.total_events ??
    0;

  const totalUsers =
    analytics?.platform_statistics?.total_users ?? 0;

  const approvedEvents =
    analytics?.event_statistics?.approved ??
    demand?.event_status?.approved ??
    0;

  const pendingEvents =
    analytics?.event_statistics?.pending ??
    demand?.event_status?.pending ??
    0;

  const stats = [
    {
      title: "Total Events",
      value: loading ? "—" : totalEvents,
      icon: CalendarDays,
      color: "#1F4D3F",
    },
    {
      title: "Total Users",
      value: loading ? "—" : totalUsers,
      icon: Users,
      color: "#D9673B",
    },
    {
      title: "Approved Events",
      value: loading ? "—" : approvedEvents,
      icon: TrendingUp,
      color: "#B18A24",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1C]">Analytics</h1>
          <p className="mt-1 text-sm text-[#6B6F6B]">
            An overview of platform activity.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-[#D9DCD6] px-4 py-2 text-sm font-medium transition hover:bg-[#EEEEEB] disabled:opacity-60"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center rounded-2xl bg-[#EEEEEB] p-10">
          <Loader2 className="animate-spin text-[#1F4D3F]" size={30} />
          <span className="ml-3 text-sm text-[#6B6F6B]">
            AI models initializing... this may take 30–45 s
          </span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">{error}</p>
          <button
            type="button"
            onClick={fetchData}
            className="mt-3 rounded-lg bg-[#1F4D3F] px-4 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Stats grid */}
      {!loading && !error && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.title} className="rounded-2xl bg-[#EEEEEB] p-5">
                  <Icon size={27} style={{ color: stat.color }} />
                  <p className="mt-4 text-sm text-[#6B6F6B]">{stat.title}</p>
                  <h2 className="mt-1 text-3xl font-bold">{stat.value}</h2>
                </div>
              );
            })}
          </div>

          {/* Event demand breakdown */}
          {demand && (
            <div className="rounded-2xl bg-[#EEEEEB] p-5">
              <h2 className="text-lg font-bold">Event Status Breakdown</h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Pending",
                    value:
                      demand.event_status?.pending ??
                      analytics?.event_statistics?.pending ??
                      0,
                    color: "#E8B84A",
                  },
                  {
                    label: "Approved",
                    value:
                      demand.event_status?.approved ??
                      analytics?.event_statistics?.approved ??
                      0,
                    color: "#1F4D3F",
                  },
                  {
                    label: "Rejected",
                    value:
                      demand.event_status?.rejected ??
                      analytics?.event_statistics?.rejected ??
                      0,
                    color: "#D9673B",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[#D9DCD6] bg-[#F5F5F2] p-4 text-center"
                  >
                    <p className="text-2xl font-bold" style={{ color: item.color }}>
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-[#6B6F6B]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mode distribution */}
          {demand?.mode_distribution && (
            <div className="rounded-2xl bg-[#EEEEEB] p-5">
              <h2 className="text-lg font-bold">Mode Distribution</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {Object.entries(demand.mode_distribution).map(
                  ([mode, count]) => (
                    <div
                      key={mode}
                      className="rounded-xl border border-[#D9DCD6] bg-[#F5F5F2] p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-[#1F4D3F]">
                        {count}
                      </p>
                      <p className="mt-1 text-xs capitalize text-[#6B6F6B]">
                        {mode}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Pending events count */}
          {pendingEvents > 0 && (
            <p className="rounded-lg bg-[#F5E8BF] px-4 py-3 text-sm font-medium text-[#735710]">
              ⚠ {pendingEvents} event{pendingEvents !== 1 ? "s" : ""} pending
              review.
            </p>
          )}
        </>
      )}
    </div>
  );
}
