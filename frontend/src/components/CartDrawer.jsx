import React, { useMemo } from "react";
import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/cartContext";

export default function CartDrawer({
  isOpen = false,
  onClose = () => {},
  onCheckout = () => {}, // Handler for checkout
}) {
  const { cartItems, updateQuantity, removeItem } = useCart();

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out border-l-4 border-red-600 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        <div className="flex flex-col h-full text-white">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-700 bg-zinc-950">
            <h2 className="flex items-center text-xl font-bold tracking-wider text-red-600 uppercase">
              <ShoppingCart size={24} className="mr-2" />
              CART / ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-white transition duration-150 hover:text-red-600"
              aria-label="Close Cart"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="py-10 tracking-widest text-center text-gray-500 uppercase">
                Your STRYVE drop zone is empty.
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex pb-4 space-x-4 border-b border-zinc-800 last:border-b-0"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="object-cover w-20 h-24 border border-zinc-700"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold uppercase text-md">
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-red-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">Size: {item.size}</p>

                    {/* Quantity & Remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-zinc-700">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="flex items-center justify-center w-8 h-8 p-1 text-red-600 transition hover:bg-zinc-800"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="flex items-center h-8 px-3 font-mono text-sm border-l border-r border-zinc-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="flex items-center justify-center w-8 h-8 p-1 text-red-600 transition hover:bg-zinc-800"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item._id, item.size)}
                        className="p-1 ml-4 text-gray-500 transition hover:text-red-600"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-700 bg-zinc-950">
            <div className="flex justify-between mb-4 text-xl font-bold uppercase">
              <span>Subtotal /</span>
              <span className="text-red-600">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3 text-lg font-extrabold tracking-widest text-white uppercase transition bg-red-600 shadow-lg hover:bg-red-700 shadow-red-600/30"
            >
              C H E C K O U T
            </button>
            <button
              onClick={onClose}
              className="w-full mt-3 text-sm text-gray-400 uppercase transition hover:text-white"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
