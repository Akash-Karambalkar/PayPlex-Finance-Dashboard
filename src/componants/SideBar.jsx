import React from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      label: "Users",
      icon: <Users size={20} />,
      path: "/users",
    },
    {
      label: "Products",
      icon: <Package size={20} />,
      path: "/products",
    },
    {
      label: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/orders",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-10">PayPlex</h2>

        <nav className="space-y-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
