
import { UserRound, CalendarDays, ShieldCheck } from "lucide-react";

const roles = [
  {
    id: "user",
    title: "User",
    description: "Explore events and discover opportunities.",
    icon: UserRound,
    color: "#1F4D3F",
  },
  {
    id: "organizer",
    title: "Organizer",
    description: "Create events and manage registrations.",
    icon: CalendarDays,
    color: "#D9673B",
  },
  {
    id: "admin",
    title: "Admin",
    description: "Manage platform activity and event reviews.",
    icon: ShieldCheck,
    color: "#B58B20",
  },
];

export default function RoleSelection({ onSelect, darkMode }) {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-5 py-12"
      style={{
        background: darkMode ? "#0F1210" : "#F5F5F2",
        color: darkMode ? "#F1F3EF" : "#1E1E1C",
      }}
    >
      <section className="w-full max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Welcome to Opportunity Hub
          </h1>
          <p className="mt-3" style={{ color: darkMode ? "#9A9F9A" : "#6B6F6B" }}>
            Choose how you want to continue
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => onSelect(role.id)}
                className="rounded-2xl border p-7 text-left transition hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: darkMode ? "#1B1F1C" : "#EEEEEB",
                  borderColor: darkMode ? "#343A35" : "#D9DCD6",
                }}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ background: role.color, color: "#FFFFFF" }}
                >
                  <Icon size={28} />
                </div>

                <h2 className="text-xl font-bold">{role.title}</h2>
                <p
                  className="mt-3 min-h-12 text-sm leading-6"
                  style={{ color: darkMode ? "#9A9F9A" : "#6B6F6B" }}
                >
                  {role.description}
                </p>

                <span
                  className="mt-6 inline-block font-semibold"
                  style={{ color: darkMode ? "#8FD3B0" : "#1F4D3F" }}
                >
                  Continue →
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}