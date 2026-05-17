import React from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Bell,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../componants/Layout";
import { useAuth } from "../context/AuthContext";
const cards = [
  { title: "Total Users", value: "12,540" },
  { title: "Total Orders", value: "8,210" },
  { title: "Revenue", value: "$245,000" },
  { title: "Active Vendors", value: "320" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Layout title="Financial Dashboard">
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
    </Layout>
  );
}
