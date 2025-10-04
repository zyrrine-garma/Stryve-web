import React from "react";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";

export default function ProductGrid({ products }) {
  const location = useLocation();
  const searchQuery =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  // ✅ Filter products by name, description, category, or tags
  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true; // If no search query, show all
    return (
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category?.toLowerCase().includes(searchQuery) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
  });

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center col-span-full mt-10 text-lg">
          No products match your search.
        </p>
      )}
    </>
  );
}
