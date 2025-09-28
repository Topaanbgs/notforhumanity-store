import React, { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaTrash } from "react-icons/fa";

const INITIAL_FORM_DATA = {
  name: "",
  price: "",
  categories: [],
  image: "",
  imageBack: "",
  description: "",
  material: "",
  weight: "",
  care: "",
  bestSeller: false,
  sizeGuideImage: "",
  sizes: [
    { size: "S", stock: 0 },
    { size: "M", stock: 0 },
    { size: "L", stock: 0 },
    { size: "XL", stock: 0 },
  ],
};

const ProductFormModal = ({ open, onClose, productData, onSubmit, categories = [] }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      if (productData) {
        setFormData({
          ...productData,
          price: productData.price.toString(),
          categories: productData.categories || [],
          sizes: productData.sizes || INITIAL_FORM_DATA.sizes,
        });
      } else {
        setFormData(INITIAL_FORM_DATA);
      }
      setErrors({});
    }
  }, [open, productData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Valid price is required";
    if (!formData.image.trim()) newErrors.image = "Main image is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.categories.length === 0) newErrors.categories = "At least one category is required";

    const totalStock = formData.sizes.reduce((sum, size) => sum + Number(size.stock || 0), 0);
    if (totalStock <= 0) newErrors.sizes = "At least one size must have stock > 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category) ? prev.categories.filter((c) => c !== category) : [...prev.categories, category],
    }));

    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: "" }));
    }
  };

  const handleSizeStockChange = (sizeIndex, stock) => {
    const newSizes = [...formData.sizes];
    newSizes[sizeIndex] = { ...newSizes[sizeIndex], stock: Number(stock) || 0 };
    setFormData((prev) => ({ ...prev, sizes: newSizes }));

    if (errors.sizes) {
      setErrors((prev) => ({ ...prev, sizes: "" }));
    }
  };

  const addCustomSize = () => {
    const customSize = prompt("Enter custom size:");
    if (customSize && !formData.sizes.find((s) => s.size === customSize.toUpperCase())) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, { size: customSize.toUpperCase(), stock: 0 }],
      }));
    }
  };

  const removeSize = (sizeIndex) => {
    if (formData.sizes.length > 1) {
      setFormData((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((_, index) => index !== sizeIndex),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  // Default categories if none provided
  const defaultCategories = ["Jersey", "T-Shirt", "Shorts", "Headwear", "Accessories", "Collaborations"];
  const availableCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{productData ? "Edit Product" : "Add New Product"}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl">
              <FaTimes />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Basic Information</h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rp) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter price"
                  min="0"
                />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categories *</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableCategories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input type="checkbox" checked={formData.categories.includes(category)} onChange={() => handleCategoryChange(category)} className="mr-2" />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
                {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
              </div>

              <div>
                <label className="flex items-center">
                  <input type="checkbox" name="bestSeller" checked={formData.bestSeller} onChange={handleInputChange} className="mr-2" />
                  <span className="text-sm font-medium">Mark as Best Seller</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Images</h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 ${errors.image ? "border-red-500" : "border-gray-300"}`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Back Image URL</label>
                <input
                  type="url"
                  name="imageBack"
                  value={formData.imageBack}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="https://example.com/back-image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size Guide Image URL</label>
                <input
                  type="url"
                  name="sizeGuideImage"
                  value={formData.sizeGuideImage}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="https://example.com/size-guide.jpg"
                />
              </div>
            </div>
          </div>

          {/* Description and Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Product Details</h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter product description"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <input type="text" name="material" value={formData.material} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="e.g., 100% Cotton" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="e.g., 250g" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
                <input type="text" name="care" value={formData.care} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="e.g., Machine wash cold" />
              </div>
            </div>
          </div>

          {/* Sizes and Stock */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-800">Sizes & Stock *</h4>
              <button type="button" onClick={addCustomSize} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-300 flex items-center gap-2">
                <FaPlus className="text-xs" /> Custom Size
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.sizes.map((sizeObj, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">{sizeObj.size}</label>
                    {formData.sizes.length > 1 && (
                      <button type="button" onClick={() => removeSize(index)} className="text-red-500 hover:text-red-700 text-xs">
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <input
                    type="number"
                    value={sizeObj.stock}
                    onChange={(e) => handleSizeStockChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-red-500"
                    placeholder="Stock"
                    min="0"
                  />
                </div>
              ))}
            </div>
            {errors.sizes && <p className="text-sm text-red-600">{errors.sizes}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? "Saving..." : productData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
