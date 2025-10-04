import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="bg-zinc-900 p-4 border-2 border-zinc-800 rounded-none shadow-xl
                 transform transition-all duration-300 ease-out relative
                 hover:shadow-red-800/80 hover:border-red-600 hover:scale-[1.02] 
                 hover:-translate-y-1 cursor-pointer flex flex-col"
      style={{ width: "270px", height: "350px" }}
      onClick={handleCardClick}
    >
      {/* 'New Drop' Tag */}
      {product.new && (
        <span className="absolute top-0 right-0 z-10 px-3 py-1 text-xs font-black tracking-widest text-white uppercase bg-red-600 clip-path-tag">
          New Drop
        </span>
      )}

      {/* ✅ Product Image */}
      <div className="w-full h-56 mb-4 overflow-hidden border-b border-red-800/30">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="object-cover object-center w-full h-full brightness-90 contrast-125"
        />
      </div>

      {/* ✅ Product Info */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          {/* Category Tag */}
          <p className="mb-1 text-xs font-medium tracking-widest text-gray-500 uppercase">
            {product.category || "Uncategorized"}
          </p>

          {/* Product Name */}
          <h2
            className="text-sm font-bold leading-tight tracking-wider text-white uppercase truncate"
            title={product.name}
          >
            {product.name}
          </h2>

          {/* Price */}
          <p className="text-sm font-bold text-red-500 mt-0.5">
            ₱{Number(product.price).toLocaleString()}
          </p>
        </div>
      </div>

      <style>{`
        .clip-path-tag {
          clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
        }
      `}</style>
    </div>
  );
}

export default ProductCard;
