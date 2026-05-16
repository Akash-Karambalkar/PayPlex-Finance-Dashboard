import React from "react";
import { Search, Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    joined: "2026-01-10",
  },
  {
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "Manager",
    status: "Inactive",
    joined: "2026-02-15",
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Vendor",
    status: "Active",
    joined: "2026-03-05",
  },
];

export default function UserManagement({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 bg-white rounded-lg shadow hover:bg-slate-50"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <select className="border rounded-lg px-4 py-2">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Vendor</option>
          </select>

          <select className="border rounded-lg px-4 py-2">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t hover:bg-slate-50">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4">{user.joined}</td>
                <td className="p-4 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-slate-50">
          Previous
        </button>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow">2</button>
          <button className="px-4 py-2 bg-white rounded-lg shadow">3</button>
        </div>

        <button className="px-4 py-2 bg-white rounded-lg shadow hover:bg-slate-50">
          Next
        </button>
      </div>
    </div>
  );
}
