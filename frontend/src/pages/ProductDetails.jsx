import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://web-store-fcf1.onrender.com/api/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      console.log("Please select a size first.");
      return;
    }

    const existingItem = cartItems.find(
      (item) => item._id === product._id && item.size === selectedSize
    );

    if (existingItem) {
      // If item exists, increment quantity
      addToCart({ ...product, size: selectedSize, quantity: 1 }, true);
    } else {
      // New item
      addToCart({ ...product, size: selectedSize, quantity: 1 });
    }

    console.log(`Added ${selectedSize} ${product.name} to cart.`);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <p className="text-lg font-bold tracking-widest text-red-500 uppercase">
          LOADING // DEPLOYMENT IN PROGRESS
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pt-20 font-sans text-white bg-zinc-950">
      <div className="relative max-w-6xl mx-auto bg-zinc-950">
        {/* ✕ Close Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute text-2xl font-bold text-gray-500 -top-6 -right-6 hover:text-red-500"
          aria-label="Close product details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2 md:gap-12">
          {/* --- 📸 Image Gallery --- */}
          <div className="flex flex-col gap-4">
            <img
              src={product.images?.[currentImage]}
              alt={`${product.name} View`}
              className="w-full object-cover border-2 border-zinc-800 rounded-none 
                         aspect-square brightness-[0.85] contrast-[1.2] transition-opacity duration-300"
            />

            <div className="flex gap-2 pb-2 overflow-x-auto">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-20 h-20 object-cover rounded-none border-2 cursor-pointer transition-all duration-200
                    ${
                      currentImage === idx
                        ? "border-red-600 ring-2 ring-red-600/50"
                        : "border-zinc-800 hover:border-zinc-500"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* --- 📦 Product Info & CTA --- */}
          <div className="space-y-6">
            {/* 🏷️ Header & Price */}
            <div className="pb-3 border-b-2 border-red-600">
              <h1 className="mb-1 text-3xl font-black leading-tight tracking-widest uppercase sm:text-4xl">
                {product.name}
              </h1>
              <p className="inline-block mt-2 text-2xl font-black text-red-600">
                ₱{Number(product.price).toLocaleString()}
              </p>
            </div>

            {/* 📏 Sizes */}
            <div>
              <h2 className="mb-3 text-sm font-black tracking-wider uppercase text-zinc-400">
                Select Unit Size
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(s.size)}
                    className={`px-4 py-1.5 border-2 rounded-none uppercase tracking-wider text-xs font-semibold transition-all duration-150
                      ${
                        selectedSize === s.size
                          ? "bg-red-600 border-red-600 text-white shadow-red-500/50 shadow-md"
                          : "border-zinc-700 text-gray-400 hover:border-red-600 hover:text-red-500 hover:bg-zinc-900"
                      }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="mt-3 text-xs font-semibold text-red-500">
                  * Selection Required for Purchase
                </p>
              )}
            </div>

            {/* 🛒 Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full py-3 font-black uppercase tracking-widest text-base rounded-none transition-all duration-200 
                ${
                  selectedSize
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-700/30"
                    : "bg-zinc-800 text-gray-500 cursor-not-allowed"
                }`}
            >
              DEPLOY TO CART
            </button>

            {/* 📑 Tabs */}
            <div className="pt-4 space-y-4 border-t border-zinc-700">
              <div className="flex border-b border-zinc-700">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`text-sm font-black uppercase tracking-wider pb-2 px-4 transition-colors duration-200
                    ${
                      activeTab === "description"
                        ? "text-white border-b-2 border-red-600"
                        : "text-zinc-500 hover:text-red-500 border-b-2 border-transparent"
                    }`}
                >
                  Tech Spec
                </button>
                <button
                  onClick={() => setActiveTab("material")}
                  className={`text-sm font-black uppercase tracking-wider pb-2 px-4 transition-colors duration-200
                    ${
                      activeTab === "material"
                        ? "text-white border-b-2 border-red-600"
                        : "text-zinc-500 hover:text-red-500 border-b-2 border-transparent"
                    }`}
                >
                  Fabrication
                </button>
              </div>

              <div className="text-sm leading-relaxed text-gray-400">
                {activeTab === "description" && <p>{product.description}</p>}
                {activeTab === "material" && <p>{product.material}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
