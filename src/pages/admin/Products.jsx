import React, { useState, useMemo } from "react";
import { FaPlus, FaSearch, FaTimes, FaEdit, FaTrash, FaEye, FaThList, FaTh, FaImage } from "react-icons/fa";
import { useProduct } from "../../context/ProductContext";
import ProductFormModal from "../../components/admin/ProductFormModal";

/* confirmation modal */
const ConfirmationModal = ({ open, onClose, onConfirm, productName }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
          <FaTrash className="text-red-600 text-xl" />
        </div>
        <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
        <p className="text-gray-600">
          Are you sure you want to delete <span className="font-semibold text-gray-900">{productName}</span>?
        </p>
        <p className="text-sm text-red-600 mt-2">This action cannot be undone.</p>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition duration-150">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition duration-150">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* Card view for product */
const ProductCard = ({ product, onEdit, onDelete, onView }) => {
  const totalStock = (product.sizes || []).reduce((s, i) => s + (Number(i.stock) || 0), 0);
  const priceNumeric = Number(String(product.price || product.priceFormatted || "").replace(/[^0-9]/g, ""));
  const priceLabel = `Rp${(priceNumeric || 0).toLocaleString("id-ID")}`;
  const isStaticProduct = product.id >= 1 && product.id <= 46;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative">
        <img src={product.image || "https://via.placeholder.com/400x300?text=No+Image"} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3 flex gap-2">
          <button onClick={() => onView(product)} className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors" title="View">
            <FaEye className="text-blue-600 text-sm" />
          </button>
          <button onClick={() => onEdit(product)} className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors" title="Edit">
            <FaEdit className="text-green-600 text-sm" />
          </button>
          <button
            onClick={() => onDelete(product)}
            className={`p-2 bg-white rounded-full shadow-lg transition-colors ${isStaticProduct ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
            title={isStaticProduct ? "Static product (Read-only)" : "Delete Product"}
            disabled={isStaticProduct}
          >
            <FaTrash className="text-red-600 text-sm" />
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 text-md line-clamp-2">{product.name}</h3>

        <div className="mt-auto pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-extrabold text-red-600">{priceLabel}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${totalStock > 10 ? "bg-green-100 text-green-700" : totalStock > 0 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>Stock: {totalStock}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {(product.categories || []).map((c) => (
              <span key={c} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                {c}
              </span>
            ))}
          </div>

          <div className="text-xs text-gray-400 mt-2">
            ID: {product.id} • Last Update: {new Date(product.updatedAt || product.createdAt || Date.now()).toLocaleDateString("id-ID")}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Row view for product list */
const ProductListRow = ({ product, onEdit, onDelete, onView }) => {
  const priceNumeric = Number(String(product.price || product.priceFormatted || "").replace(/[^0-9]/g, ""));
  const priceLabel = `Rp${(priceNumeric || 0).toLocaleString("id-ID")}`;
  const totalStock = (product.sizes || []).reduce((s, i) => s + (Number(i.stock) || 0), 0);
  const isStaticProduct = product.id >= 1 && product.id <= 46;

  return (
    <div className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition duration-150 rounded-lg">
      <img src={product.image || "https://via.placeholder.com/100x100?text=IMG"} alt={product.name} className="w-16 h-16 object-cover rounded-md shadow-sm" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
        <div className="flex flex-wrap gap-x-3 text-xs text-gray-500 mt-0.5">
          <span>ID: {product.id}</span>
          <span>{product.categories?.join(" / ")}</span>
          <span>Updated: {new Date(product.updatedAt || product.createdAt || Date.now()).toLocaleDateString("id-ID")}</span>
        </div>
      </div>

      <div className="w-24 text-center">
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${totalStock > 10 ? "bg-green-100 text-green-700" : totalStock > 0 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{totalStock} pcs</span>
      </div>

      <div className="w-28 text-right font-bold text-red-600 text-md">{priceLabel}</div>

      <div className="flex gap-2 ml-4">
        <button onClick={() => onView(product)} className="p-2 text-blue-600 hover:text-blue-800 rounded-full transition-colors" title="View">
          <FaEye />
        </button>
        <button onClick={() => onEdit(product)} className="p-2 text-green-600 hover:text-green-800 rounded-full transition-colors" title="Edit">
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(product)}
          className={`p-2 text-red-600 rounded-full transition-colors ${isStaticProduct ? "opacity-50 cursor-not-allowed" : "hover:text-red-800"}`}
          title={isStaticProduct ? "Static product (Read-only)" : "Delete Product"}
          disabled={isStaticProduct}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default function AdminProducts() {
  const productContext = useProduct();
  const products = productContext?.products || [];
  const categories = productContext?.categories || [];
  const addProduct = productContext?.addProduct;
  const updateProduct = productContext?.updateProduct;
  const deleteProduct = productContext?.deleteProduct;

  const [isFormModal, setFormModal] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("updated");

  const filteredProducts = useMemo(() => {
    let filtered = products.slice();

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => (p.name || "").toLowerCase().includes(q) || String(p.id).includes(q) || (p.description || "").toLowerCase().includes(q) || (p.categories || []).some((c) => c.toLowerCase().includes(q)));
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.categories && p.categories.includes(selectedCategory));
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "price") {
        const pa = Number(String(a.price || a.priceFormatted || "").replace(/[^0-9]/g, ""));
        const pb = Number(String(b.price || b.priceFormatted || "").replace(/[^0-9]/g, ""));
        return pa - pb;
      }
      if (sortBy === "id") return a.id - b.id;
      if (sortBy === "updated") return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
      return 0;
    });

    return filtered;
  }, [products, search, selectedCategory, sortBy]);

  const handleSubmit = async (formData) => {
    const priceToSubmit = String(formData.price).replace(/[^0-9]/g, "");
    const dataToSubmit = { ...formData, price: priceToSubmit };

    if (editingProduct) {
      updateProduct(editingProduct.id, dataToSubmit);
    } else {
      addProduct(dataToSubmit);
    }

    setFormModal(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormModal(true);
  };

  const handleDelete = (product) => {
    if (product.id > 46) {
      setDeletingProduct(product);
      setConfirmModal(true);
    } else {
      console.warn(`Attempted to delete static product with ID: ${product.id}. Action prevented.`);
    }
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      deleteProduct(deletingProduct.id);
      setDeletingProduct(null);
      setConfirmModal(false);
    }
  };

  const handleView = (product) => {
    window.open(`/products/${product.slug || product.id}`, "_blank");
  };

  if (!productContext) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ProductContext Not Available</h2>
          <p className="text-gray-600">Please make sure ProductProvider is properly configured in your App.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:max-w-7xl lg:mx-auto">
      {/* Header & controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4 border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Product Inventory</h1>
          <p className="text-gray-500 mt-1">Manage all store products ({products.length} total)</p>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormModal(true);
            }}
            className="bg-red-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-red-700 font-medium shadow-md transition-colors"
          >
            <FaPlus /> New Product
          </button>

          <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-gray-200 text-gray-900 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`} title="Grid View">
              <FaTh />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-gray-200 text-gray-900 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`} title="List View">
              <FaThList />
            </button>
          </div>
        </div>
      </div>

      {/* Filters & search */}
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={`Search ${filteredProducts.length} products...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 transition-shadow"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                <FaTimes />
              </button>
            )}
          </div>

          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-red-500">
            <option value="">All Categories ({products.length})</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-red-500">
            <option value="updated">Latest Updated</option>
            <option value="name">Product Name (A-Z)</option>
            <option value="id">Product ID (Low to High)</option>
            <option value="price">Price (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Products area */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <FaImage className="text-3xl text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{products.length === 0 ? "No Products Found" : "No Products Match Your Filter"}</h3>
          <p className="text-gray-500 mb-4">{products.length === 0 ? "Click 'New Product' to begin adding inventory." : `Try clearing the search (${search ? 1 : 0}) or changing the category/sort filter.`}</p>
          {products.length === 0 && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setFormModal(true);
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md"
            >
              Add Your First Product
            </button>
          )}
        </div>
      ) : viewMode === "list" ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-2">
          <div className="space-y-1">
            {filteredProducts.map((product) => (
              <ProductListRow key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
          ))}
        </div>
      )}

      {/* Modals */}
      <ProductFormModal
        open={isFormModal}
        onClose={() => {
          setFormModal(false);
          setEditingProduct(null);
        }}
        productData={editingProduct}
        onSubmit={handleSubmit}
        categories={categories}
      />

      <ConfirmationModal
        open={isConfirmModal}
        onClose={() => {
          setConfirmModal(false);
          setDeletingProduct(null);
        }}
        onConfirm={confirmDelete}
        productName={deletingProduct?.name}
      />
    </div>
  );
}
