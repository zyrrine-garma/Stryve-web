import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid"; // make sure you create this
import { getProducts } from "../api/api"; // your API instance

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 16;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        console.log(res.data); // Check what the API returns
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

  // ✅ Pagination calculation
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h1 className="text-4xl font-extrabold text-stryve-red text-center mb-12 font-inter uppercase tracking-wide">
          Featured Products
        </h1>

        {/* Loading and Error States */}
        {loading && (
          <p className="text-gray-500 text-center">Loading products...</p>
        )}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Product Grid */}
        {!loading && !error && currentProducts.length > 0 ? (
          <>
            <ProductGrid products={currentProducts} />

            {/* ✅ Pagination Controls */}
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
          </>
        ) : (
          !loading &&
          !error &&
          currentProducts.length === 0 && (
            <p className="text-gray-500 text-center">
              No products available at the moment.
            </p>
          )
        )}
      </section>
    </div>
  );
}

export default Home;
