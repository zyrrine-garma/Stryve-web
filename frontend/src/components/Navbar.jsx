import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); // get user from context

  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };
  
  const handleUserClick = () => {
    if (user) {
      navigate("/account"); // redirect to account if logged in
    } else {
      navigate("/login"); // otherwise go to login
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black backdrop-blur-sm border-b border-red-800/50 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-red-600 font-extrabold text-3xl tracking-wider font-inter"
            >
              STRYVE /
            </Link>

            {/* Center Menu */}
            <div className="hidden md:flex items-center space-x-6 mx-auto">
              <Link
                to="/"
                className="text-gray-300 uppercase hover:text-red-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-300 uppercase hover:text-red-600 transition-colors"
              >
                Shop
              </Link>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <SearchIcon className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleUserClick}
                className="h-6 w-6 text-white hover:text-red-600 transition-colors"
                aria-label="Go to Login/Register"
              >
                <UserIcon className="h-6 w-6" />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative focus:outline-none"
                aria-label="Open Cart"
              >
                <ShoppingCartIcon className="h-6 w-6 text-white hover:text-red-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? (
                  <XIcon className="h-6 w-6 text-white" />
                ) : (
                  <MenuIcon className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-gray-900 px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-300 hover:text-red-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 text-gray-300 hover:text-red-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/account"
              className="block px-3 py-2 text-gray-300 hover:text-red-600 transition-colors"
            >
              Account
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-gray-300 hover:text-red-600 transition-colors"
            >
              Cart
            </Link>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {
          clearCart();
          setCartOpen(false);
        }}
      />
    </>
  );
}
