import React, { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../componants/Layout";

const defaultUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    joined: "2026-05-01",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "Vendor",
    status: "Inactive",
    joined: "2026-05-03",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Manager",
    status: "Active",
    joined: "2026-05-05",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Vendor",
    status: "Active",
    joined: "2026-05-06",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david@example.com",
    role: "User",
    status: "Inactive",
    joined: "2026-05-07",
  },
];

export default function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  // Load Users
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users"));

    if (savedUsers && savedUsers.length > 0) {
      setUsers(savedUsers);
    } else {
      setUsers(defaultUsers);
    }
  }, []);

  // Save Users
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Save User
  const handleSaveUser = () => {
    if (!formData.name || !formData.email) return;

    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...formData,
              id: user.id,
              joined: user.joined,
            }
          : user,
      );

      setUsers(updatedUsers);
    } else {
      const newUser = {
        ...formData,
        id: Date.now(),
        joined: new Date().toISOString().split("T")[0],
      };

      setUsers([...users, newUser]);
    }

    setShowModal(false);
    setSelectedUser(null);

    setFormData({
      name: "",
      email: "",
      role: "User",
      status: "Active",
    });
  };

  // Edit User
  const handleEditUser = (user) => {
    setSelectedUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });

    setShowModal(true);
  };

  // Delete User
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Filter Users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "All Status" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <Layout title="User Management">
      <div className="min-h-screen bg-slate-100 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => {
              setSelectedUser(null);

              setFormData({
                name: "",
                email: "",
                role: "User",
                status: "Active",
              });

              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} /> Add User
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h2 className="text-2xl font-bold mb-6">
                {selectedUser ? "Edit User" : "Add User"}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2"
                />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option>User</option>
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Vendor</option>
                </select>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full border py-3 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveUser}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg"
                  >
                    Save User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search + Filters */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-slate-400" />

            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-lg px-4 py-2"
            >
              <option>All Roles</option>
              <option>User</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Vendor</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-lg px-4 py-2"
            >
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
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-slate-50">
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
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800"
                    >
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
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-white rounded-lg shadow"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            className="px-4 py-2 bg-white rounded-lg shadow"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}
