
import {
  ChartNoAxesColumn,
  Users,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

export default function Analytics({ darkMode = false }) {
  const card = darkMode ? "#1B1F1C" : "#EEEEEB";
  const text = darkMode ? "#F1F3EF" : "#1E1E1C";
  const muted = darkMode ? "#9A9F9A" : "#6B6F6B";
  const border = darkMode ? "#343A35" : "#D9DCD6";
  const green = darkMode ? "#8FD3B0" : "#1F4D3F";
  const orange = darkMode ? "#F0805A" : "#D9673B";

  const stats = [
    {
      title: "Total Users",
      value: "156",
      icon: Users,
      color: green,
    },
    {
      title: "Total Events",
      value: "42",
      icon: CalendarDays,
      color: orange,
    },
    {
      title: "Platform Growth",
      value: "12%",
      icon: TrendingUp,
      color: "#B58B20",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: text }}>
          Platform Analytics
        </h1>
        <p className="mt-1 text-sm" style={{ color: muted }}>
          Overview of activity on Opportunity Hub.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border p-5"
              style={{ background: card, borderColor: border }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm" style={{ color: muted }}>
                  {item.title}
                </p>
                <Icon size={22} style={{ color: item.color }} />
              </div>

              <h2
                className="mt-4 text-3xl font-bold"
                style={{ color: item.color }}
              >
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{ background: card, borderColor: border }}
      >
        <div className="mb-4 flex items-center gap-2">
          <ChartNoAxesColumn size={22} style={{ color: green }} />
          <h2 className="text-lg font-bold" style={{ color: text }}>
            Activity Overview
          </h2>
        </div>

        <p className="text-sm" style={{ color: muted }}>
          Analytics summary will appear here when real backend data is connected.
        </p>
      </div>
    </div>
  );
}
