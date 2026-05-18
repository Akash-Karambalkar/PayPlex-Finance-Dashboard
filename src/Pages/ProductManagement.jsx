import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import Layout from "../componants/Layout";

const defaultProducts = [
  {
    id: 1,
    name: "Financial Analytics Pro",
    category: "Software",
    price: "$499",
    stock: 120,
    status: "Active",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    description: "Advanced financial dashboard software package.",
  },
  {
    id: 2,
    name: "Vendor Insights Suite",
    category: "Analytics",
    price: "$799",
    stock: 80,
    status: "Inactive",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    description: "Vendor tracking and analytics platform.",
  },
  {
    id: 3,
    name: "Retail Forecast Engine",
    category: "Forecasting",
    price: "$999",
    stock: 60,
    status: "Active",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    description: "Predictive financial forecasting system for enterprises.",
  },
  {
    id: 4,
    name: "Investment Tracker X",
    category: "Finance",
    price: "$699",
    stock: 95,
    status: "Active",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    description: "Track investments, assets, and portfolio growth.",
  },
];

export default function ProductManagement() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
    description: "",
    image: "",
  });

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));

    if (savedProducts && savedProducts.length > 0) {
      setProducts(savedProducts);
    } else {
      setProducts(defaultProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setPreviewImage(imageUrl);

      setFormData({
        ...formData,
        image: imageUrl,
      });
    }
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.category) return;

    if (editingProduct) {
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...formData,
              id: product.id,
            }
          : product,
      );

      setProducts(updatedProducts);
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
      };

      setProducts([...products, newProduct]);
    }

    setShowForm(false);
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
      description: "",
      image: "",
    });

    setPreviewImage(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setPreviewImage(product.image);
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);

    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All Status" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  return (
    <Layout title="Product Management">
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => {
              setEditingProduct(null);

              setFormData({
                name: "",
                category: "",
                price: "",
                stock: "",
                status: "Active",
                description: "",
                image: "",
              });

              setPreviewImage(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-slate-400" />

            <input
              type="text"
              placeholder="Search products..."
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
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-lg px-4 py-2"
            >
              <option>All Categories</option>
              <option>Software</option>
              <option>Analytics</option>
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-bold text-slate-800">
                {product.name}
              </h3>

              <p className="text-slate-500">{product.category}</p>

              <p className="text-lg font-semibold mt-2">${product.price}</p>

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

                <button
                  onClick={() => handleEditProduct(product)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

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

              <h2 className="text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h2>

              <p>{selectedProduct.description}</p>

              <p className="mt-2 font-semibold">
                Price: ${selectedProduct.price}
              </p>

              <p>Stock: {selectedProduct.stock}</p>
              <p>Category: {selectedProduct.category}</p>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow p-8 w-full max-w-3xl relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h2 className="text-2xl font-bold mb-6">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                />

                <input
                  type="number"
                  name="stock"
                  placeholder="Stock Quantity"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2 mt-6"
                rows="4"
              />

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

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowForm(false)}
                  className="w-full border py-3 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveProduct}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
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
