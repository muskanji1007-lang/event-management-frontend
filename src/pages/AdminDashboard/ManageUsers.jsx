import { useEffect, useState } from "react";
import { Users, Search, Loader2, RefreshCw } from "lucide-react";
import { getAllUsers } from "../../services/api";

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllUsers();
      // API returns { success, count, users: [...] }
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name || ""} ${user.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const roleColor = (role) => {
    switch ((role || "").toUpperCase()) {
      case "ADMIN":
        return "bg-[#E8B84A]/20 text-[#735710]";
      case "ORGANIZER":
        return "bg-[#D9673B]/10 text-[#D9673B]";
      default:
        return "bg-[#1F4D3F]/10 text-[#1F4D3F]";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1C]">Manage Users</h1>
          <p className="mt-1 text-sm text-[#6B6F6B]">
            View and manage platform users.{" "}
            {!loading && (
              <span className="font-medium">{users.length} total</span>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchUsers}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-[#D9DCD6] px-4 py-2 text-sm font-medium transition hover:bg-[#EEEEEB] disabled:opacity-60"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-[#D9DCD6] bg-[#EEEEEB] px-4 py-3">
        <Search size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center rounded-2xl bg-[#EEEEEB] p-10">
          <Loader2 className="animate-spin text-[#1F4D3F]" size={30} />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">{error}</p>
          <button
            type="button"
            onClick={fetchUsers}
            className="mt-3 rounded-lg bg-[#1F4D3F] px-4 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-2xl bg-[#EEEEEB]">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#D9DCD6]">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Skills</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id || user.email}
                  className="border-b border-[#D9DCD6] hover:bg-[#F5F5F2]"
                >
                  <td className="p-4 font-medium">{user.name || "—"}</td>

                  <td className="p-4 text-[#6B6F6B]">
                    {user.email || "—"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${roleColor(
                        user.role
                      )}`}
                    >
                      {user.role || "USER"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {(user.skills || []).slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-[#D9DCD6] px-2 py-0.5 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {(user.skills || []).length > 3 && (
                        <span className="text-xs text-[#6B6F6B]">
                          +{user.skills.length - 3}
                        </span>
                      )}
                      {(user.skills || []).length === 0 && (
                        <span className="text-xs text-[#6B6F6B]">—</span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 text-[#6B6F6B]">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-5 text-center text-[#6B6F6B]"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
