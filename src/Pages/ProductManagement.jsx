import React, { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ArrowLeft,
  X,
  Upload,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Financial Analytics Pro",
    category: "Software",
    price: "$499",
    stock: 120,
    status: "Active",
    image: "https://via.placeholder.com/150",
    description: "Advanced financial dashboard software package.",
  },
  {
    id: 2,
    name: "Vendor Insights Suite",
    category: "Analytics",
    price: "$799",
    stock: 80,
    status: "Inactive",
    image: "https://via.placeholder.com/150",
    description: "Vendor tracking and analytics platform.",
  },
];

export default function ProductManagement({ onBack }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white rounded-lg shadow">
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">
            Product Management
          </h1>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <div className="flex gap-4">
          <select className="border rounded-lg px-4 py-2">
            <option>All Categories</option>
            <option>Software</option>
            <option>Analytics</option>
          </select>

          <select className="border rounded-lg px-4 py-2">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
            <p className="text-slate-500">{product.category}</p>
            <p className="text-lg font-semibold mt-2">{product.price}</p>
            <p className="text-sm text-slate-500">Stock: {product.stock}</p>

            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                product.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status}
            </span>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setSelectedProduct(product)}
                className="text-slate-600 hover:text-blue-600"
              >
                <Eye size={18} />
              </button>

              <button className="text-blue-600 hover:text-blue-800">
                <Pencil size={18} />
              </button>

              <button className="text-red-600 hover:text-red-800">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p className="mt-2 font-semibold">Price: {selectedProduct.price}</p>
            <p>Stock: {selectedProduct.stock}</p>
            <p>Category: {selectedProduct.category}</p>
          </div>
        </div>
      )}

      {/* Add/Edit Product Form */}
      <div className="bg-white rounded-2xl shadow p-8 mt-10">
        <h2 className="text-2xl font-bold mb-6">Add / Edit Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Product Name"
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Category"
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Price"
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            className="border rounded-lg px-4 py-2"
          />
        </div>

        <textarea
          placeholder="Description"
          className="w-full border rounded-lg px-4 py-2 mt-6"
          rows="4"
        />

        {/* Image Upload */}
        <div className="mt-6">
          <label className="flex items-center gap-2 cursor-pointer bg-slate-100 px-4 py-3 rounded-lg w-fit">
            <Upload size={18} /> Upload Product Image
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg"
            />
          )}
        </div>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Save Product
        </button>
      </div>
    </div>
  );
}
