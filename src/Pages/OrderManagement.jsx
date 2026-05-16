import React, { useState } from "react";
import { Search, ArrowLeft, Eye, X, Download } from "lucide-react";

const orders = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    product: "Financial Analytics Pro",
    amount: "$499",
    payment: "Paid",
    delivery: "Completed",
    date: "2026-05-10",
    timeline: ["Order Placed", "Payment Confirmed", "Processing", "Completed"],
  },
  {
    id: "ORD-1002",
    customer: "Sarah Smith",
    product: "Vendor Insights Suite",
    amount: "$799",
    payment: "Pending",
    delivery: "In Progress",
    date: "2026-05-12",
    timeline: ["Order Placed", "Payment Pending", "Processing"],
  },
];

export default function OrderManagement({ onBack }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white rounded-lg shadow">
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">
            Order Management
          </h1>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Download size={18} /> Export Orders
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <div className="flex gap-4">
          <select className="border rounded-lg px-4 py-2">
            <option>All Payments</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>

          <select className="border rounded-lg px-4 py-2">
            <option>All Deliveries</option>
            <option>Completed</option>
            <option>In Progress</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Delivery</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t hover:bg-slate-50">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.product}</td>
                <td className="p-4">{order.amount}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.delivery === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.delivery}
                  </span>
                </td>

                <td className="p-4">{order.date}</td>

                <td className="p-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-slate-600 hover:text-blue-600"
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
        <button className="px-4 py-2 bg-white rounded-lg shadow">
          Previous
        </button>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow">2</button>
        </div>

        <button className="px-4 py-2 bg-white rounded-lg shadow">Next</button>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Order Details - {selectedOrder.id}
            </h2>

            <div className="space-y-2 mb-6">
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
                <strong>Payment:</strong> {selectedOrder.payment}
              </p>
              <p>
                <strong>Delivery:</strong> {selectedOrder.delivery}
              </p>
              <p>
                <strong>Date:</strong> {selectedOrder.date}
              </p>
            </div>

            {/* Timeline */}
            <h3 className="text-xl font-semibold mb-4">Order Timeline</h3>
            <div className="space-y-4">
              {selectedOrder.timeline.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
