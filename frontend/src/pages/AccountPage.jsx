import React, { useState } from "react";
import { LogOut, User, ListOrdered, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavItem = ({ name, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-3 text-sm uppercase font-extrabold tracking-widest rounded-md transition-all duration-200 ${
      active
        ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-red-500"
    }`}
  >
    <Icon size={20} className="mr-3" />
    {name}
  </button>
);

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-zinc-950 font-inter">
        <div className="w-full max-w-sm p-8 text-center border-2 shadow-2xl bg-zinc-900 border-red-600/50 shadow-red-600/20 rounded-xl">
          <p className="text-sm font-extrabold tracking-widest text-red-500 uppercase">
            SESSION ENDED. PLEASE LOG IN
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 mt-4 font-extrabold tracking-widest text-white uppercase transition bg-red-600 rounded-md shadow-lg shadow-red-600/30 hover:bg-red-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-24 text-white bg-zinc-950 font-inter">
      {/* Header */}
      <div className="w-full max-w-6xl mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-[0.2em] mb-2 uppercase text-white">
          MY ACCOUNT
        </h1>
        <p className="text-base tracking-widest uppercase text-zinc-400">
          MANAGE YOUR PROFILE, ORDERS, AND SETTINGS
        </p>
      </div>

      {/* Main Dashboard */}
      <div className="flex flex-col w-full max-w-6xl gap-8 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full space-y-3 md:w-1/4">
          <div className="p-6 space-y-3 border-2 bg-zinc-900 border-red-600/50 rounded-xl">
            <NavItem
              name="My Profile"
              icon={User}
              active={activeSection === "profile"}
              onClick={() => setActiveSection("profile")}
            />
            <NavItem
              name="Order History"
              icon={ListOrdered}
              active={activeSection === "orders"}
              onClick={() => setActiveSection("orders")}
            />
            <NavItem
              name="Settings"
              icon={Settings}
              active={activeSection === "settings"}
              onClick={() => setActiveSection("settings")}
            />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full py-3 mt-4 font-extrabold tracking-widest text-white uppercase transition bg-red-600 rounded-md shadow-lg shadow-red-600/30 hover:bg-red-700"
          >
            <LogOut size={18} className="mr-2" /> LOG OUT
          </button>
        </aside>

        {/* Content */}
        <main className="w-full p-8 space-y-6 border-2 shadow-2xl md:w-3/4 bg-zinc-900 border-red-600/50 shadow-red-600/20 rounded-xl">
          {/* Section Header */}
          <div className="pb-4 mb-6 border-b border-red-600/50">
            <h2 className="text-3xl font-extrabold tracking-widest text-red-600 uppercase">
              {activeSection === "profile" && "PERSONAL INFORMATION"}
              {activeSection === "orders" && "ORDER HISTORY"}
              {activeSection === "settings" && "ACCOUNT SETTINGS"}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {activeSection === "profile" &&
                "View and manage your account details."}
              {activeSection === "orders" &&
                "Track and review past transactions."}
              {activeSection === "settings" &&
                "Manage your credentials and preferences."}
            </p>
          </div>

          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-zinc-800 border-zinc-700">
                <p className="mb-1 text-xs tracking-widest text-red-500 uppercase">
                  ACCOUNT NAME
                </p>
                <p className="text-xl font-extrabold tracking-widest text-white">
                  {user.name}
                </p>
              </div>
              <div className="p-4 border rounded-md bg-zinc-800 border-zinc-700">
                <p className="mb-1 text-xs tracking-widest uppercase text-zinc-500">
                  EMAIL ADDRESS
                </p>
                <p className="text-sm font-light text-zinc-300">{user.email}</p>
              </div>
            </div>
          )}

          {/* Orders / Settings Placeholder */}
          {activeSection !== "profile" && (
            <div className="py-12 text-center text-zinc-400">
              <ListOrdered size={40} className="mx-auto mb-4" />
              <p className="text-lg font-extrabold tracking-widest uppercase">
                SECTION UNDER DEVELOPMENT
              </p>
              <p className="mt-1 text-sm">
                Please return to the Profile Overview.
              </p>
            </div>
          )}
        </main>
      </div>

      <p className="mt-16 text-xs tracking-widest uppercase text-zinc-700">
        STRYVE © 2025. ALL RIGHTS RESERVED.
      </p>
    </div>
  );
}
