export const convertProductsToNewFormat = (oldProducts) => {
  return oldProducts.map((product) => {
    let price = product.price;
    if (typeof price === "string") {
      price = parseInt(price.replace(/[^\d]/g, "")) || 0;
    }

    let sizes = product.sizes;
    if (!sizes || sizes.length === 0) {
      sizes = [
        { size: "S", stock: 5 },
        { size: "M", stock: 10 },
        { size: "L", stock: 8 },
        { size: "XL", stock: 3 },
      ];
    }

    return {
      ...product,
      id: product.id,
      name: product.name,
      price: price,
      categories: product.categories || ["Uncategorized"],
      image: product.image,
      imageBack: product.imageBack || null,
      bestSeller: product.bestSeller || false,
      description: product.description || "No description available",
      material: product.material || null,
      weight: product.weight || null,
      care: product.care || null,
      sizes: sizes,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      sizeGuideImage: product.sizeGuideImage || null,
      createdAt: product.createdAt || new Date().toISOString(),
      updatedAt: product.updatedAt || new Date().toISOString(),
      slug:
        product.slug ||
        product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
    };
  });
};
