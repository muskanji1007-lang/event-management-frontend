
import { Users, Search } from "lucide-react";
import { useState } from "react";

export default function ManageUsers() {
  const [search, setSearch] = useState("");

  const users = [
    { name: "Muskan Gupta", email: "muskan@example.com", role: "User" },
    { name: "Event Organizer", email: "organizer@example.com", role: "Organizer" },
  ];

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1E1E1C]">
          Manage Users
        </h1>
        <p className="mt-1 text-sm text-[#6B6F6B]">
          View and manage platform users.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-[#D9DCD6] bg-[#EEEEEB] px-4 py-3">
        <Search size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full bg-transparent outline-none"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl bg-[#EEEEEB]">
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr className="border-b border-[#D9DCD6]">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.email} className="border-b border-[#D9DCD6]">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span className="rounded-full bg-[#1F4D3F]/10 px-3 py-1 text-sm text-[#1F4D3F]">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={3} className="p-5 text-center text-[#6B6F6B]">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
