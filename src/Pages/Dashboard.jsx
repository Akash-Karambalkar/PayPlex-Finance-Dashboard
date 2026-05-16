import React from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Bell,
  UserCircle,
} from "lucide-react";
const cards = [
  { title: "Total Users", value: "12,540" },
  { title: "Total Orders", value: "8,210" },
  { title: "Revenue", value: "$245,000" },
  { title: "Active Vendors", value: "320" },
];

export default function Dashboard({ onNavigate }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-10">PayPlex</h2>
        <nav className="space-y-6">
          <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div
            onClick={() => onNavigate("users")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-400"
          >
            <Users size={20} /> Users
          </div>
          <div
            onClick={() => onNavigate("products")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-400"
          >
            <Package size={20} /> Products
          </div>
          <div
            onClick={() => onNavigate("orders")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-400"
          >
            <ShoppingCart size={20} /> Orders
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow">
          <h1 className="text-3xl font-bold text-slate-800">
            Financial Dashboard
          </h1>

          <div className="flex items-center gap-6">
            <Bell className="text-slate-600 cursor-pointer" />
            <UserCircle className="text-slate-600 cursor-pointer" size={32} />
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-slate-500 text-lg">{card.title}</h3>
              <p className="text-3xl font-bold text-slate-800 mt-4">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
