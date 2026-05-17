import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  ArrowLeft,
  X,
  Clock,
  CheckCircle,
  Truck,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../componants/Layout";

const defaultOrders = [
  {
    id: 1001,
    customer: "John Doe",
    product: "Financial Analytics Pro",
    amount: "$499",
    status: "Delivered",
    date: "2026-05-10",
    timeline: [
      "Order Placed",
      "Payment Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
    ],
  },
  {
    id: 1002,
    customer: "Sarah Smith",
    product: "Vendor Insights Suite",
    amount: "$799",
    status: "Processing",
    date: "2026-05-12",
    timeline: ["Order Placed", "Payment Confirmed", "Processing"],
  },
  {
    id: 1003,
    customer: "Mike Ross",
    product: "Retail Forecast Engine",
    amount: "$999",
    status: "Pending",
    date: "2026-05-13",
    timeline: ["Order Placed"],
  },
];

export default function OrderManagement() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Load Orders
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders"));

    if (savedOrders && savedOrders.length > 0) {
      setOrders(savedOrders);
    } else {
      setOrders(defaultOrders);
    }
  }, []);

  // Save Orders
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Status Badge Colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-red-100 text-red-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // Filter Orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage,
  );

  // Update Order Status
  const updateOrderStatus = (orderId, newStatus) => {
    const statusTimeline = {
      Pending: ["Order Placed"],
      Processing: ["Order Placed", "Payment Confirmed", "Processing"],
      Shipped: ["Order Placed", "Payment Confirmed", "Processing", "Shipped"],
      Delivered: [
        "Order Placed",
        "Payment Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
      ],
    };

    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
            timeline: statusTimeline[newStatus],
          }
        : order,
    );

    setOrders(updatedOrders);

    if (selectedOrder && selectedOrder.id === orderId) {
      const updatedSelected = updatedOrders.find(
        (order) => order.id === orderId,
      );
      setSelectedOrder(updatedSelected);
    }
  };

  // Timeline Icons
  const getTimelineIcon = (step) => {
    if (step.includes("Placed")) return <Clock size={18} />;
    if (step.includes("Payment")) return <CheckCircle size={18} />;
    if (step.includes("Processing")) return <Package size={18} />;
    if (step.includes("Shipped")) return <Truck size={18} />;
    if (step.includes("Delivered")) return <CheckCircle size={18} />;
    return <Clock size={18} />;
  };

  return (
    <Layout title="Order Management">
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-slate-400" />

            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-4 py-2"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-slate-50">
                  <td className="p-4">#{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.product}</td>
                  <td className="p-4">{order.amount}</td>
                  <td className="p-4">{order.date}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
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

        {/* Order Detail Drawer */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
            <div className="w-full max-w-xl bg-white h-full p-8 overflow-y-auto relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h2 className="text-3xl font-bold mb-6">
                Order #{selectedOrder.id}
              </h2>

              <div className="space-y-3 mb-8">
                <p>
                  <strong>Customer:</strong> {selectedOrder.customer}
                </p>

                <p>
                  <strong>Product:</strong> {selectedOrder.product}
                </p>

                <p>
                  <strong>Amount:</strong> {selectedOrder.amount}
                </p>

                <p>
                  <strong>Date:</strong> {selectedOrder.date}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      selectedOrder.status,
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </p>
              </div>

              {/* Status Update */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Update Status</h3>

                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateOrderStatus(selectedOrder.id, e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3"
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-xl font-bold mb-6">Order Timeline</h3>

                <div className="space-y-6">
                  {selectedOrder.timeline.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        {getTimelineIcon(step)}
                      </div>

                      <div>
                        <p className="font-semibold">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
