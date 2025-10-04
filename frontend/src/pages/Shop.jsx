import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/api";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const CATEGORIES = ["All", "Outerwear", "Tops", "Bottoms", "Accessories"];
const SORT_OPTIONS = [
  { value: "price_asc", label: "PRICE: LOW TO HIGH" },
  { value: "price_desc", label: "PRICE: HIGH TO LOW" },
  { value: "newest", label: "NEWEST DROPS" },
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    }

    switch (sortOption) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortOption, searchQuery]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-zinc-950 text-white font-inter pt-32 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-widest text-white text-center mb-12">
          SHOP ALL PRODUCTS
        </h1>

        {loading && (
          <p className="text-gray-500 text-center">Loading products...</p>
        )}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {!loading && !error && (
          <>
            <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-4">
              <div className="flex gap-2 overflow-x-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`py-2 px-4 rounded-none uppercase text-sm font-bold tracking-wide transition-all duration-150 border ${
                      selectedCategory === cat
                        ? "border-red-600 text-red-500"
                        : "border-zinc-700 text-gray-400 hover:border-red-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-gray-300 py-2 px-3 rounded-none uppercase text-sm"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <section id="products">
              {currentProducts.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {currentProducts.map((p) => (
                    <motion.div
                      key={p._id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-gray-500 text-center py-16 uppercase tracking-widest">
                  No products found.
                </p>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 gap-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md font-semibold ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-stryve-red text-white hover:bg-red-700"
                    }`}
                  >
                    Previous
                  </button>

                  <span className="text-lg font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md font-semibold ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-stryve-red text-white hover:bg-red-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </motion.div>
  );
}
