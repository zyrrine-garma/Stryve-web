import React, { useState } from "react";
import { UserPlus, User, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("PROTOCOL ERROR. Auth Keys do not match.");
      return;
    }

    const result = await register(name, email, password);
    if (result.success) {
      navigate("/"); // redirect after successful registration
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen p-4 pt-24 bg-zinc-950 font-inter">
      <div className="w-full max-w-sm bg-zinc-900 shadow-2xl shadow-black/70 rounded-xl overflow-hidden border-2 border-red-600/50 transform hover:scale-[1.01] transition-transform duration-300">
        {/* Header */}
        <div className="p-8 border-b-4 border-red-600 bg-gradient-to-b from-zinc-800 to-zinc-900">
          <h1 className="text-4xl font-extrabold tracking-[0.3em] text-white uppercase flex items-center justify-center text-shadow-red">
            REGISTER
          </h1>
          <p className="mt-3 text-xs tracking-widest text-center text-gray-400 uppercase">
            CREATE NEW USER
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="p-8 space-y-6">
          {error && (
            <div className="p-4 text-sm font-semibold tracking-wider text-center text-white uppercase transition-colors duration-300 border border-red-600 rounded-md shadow-lg bg-red-800/50 shadow-red-600/20">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="relative">
            <User
              size={20}
              className="absolute text-gray-500 transform -translate-y-1/2 left-4 top-1/2"
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full py-3.5 pl-12 pr-4 bg-zinc-800 text-white border border-zinc-700 rounded-md placeholder-gray-500 tracking-wide transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <User
              size={20}
              className="absolute text-gray-500 transform -translate-y-1/2 left-4 top-1/2"
            />
            <input
              type="email"
              placeholder="Authorized E-mail"
              className="w-full py-3.5 pl-12 pr-4 bg-zinc-800 text-white border border-zinc-700 rounded-md placeholder-gray-500 tracking-wide transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute text-gray-500 transform -translate-y-1/2 left-4 top-1/2"
            />
            <input
              type="password"
              placeholder="Auth Key (Password)"
              className="w-full py-3.5 pl-12 pr-4 bg-zinc-800 text-white border border-zinc-700 rounded-md placeholder-gray-500 tracking-wide transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute text-gray-500 transform -translate-y-1/2 left-4 top-1/2"
            />
            <input
              type="password"
              placeholder="Re-Confirm Auth Key"
              className="w-full py-3.5 pl-12 pr-4 bg-zinc-800 text-white border border-zinc-700 rounded-md placeholder-gray-500 tracking-wide transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 mt-6 font-extrabold tracking-[0.2em] text-lg flex items-center justify-center transition-all duration-200 shadow-xl shadow-red-600/50 rounded-md hover:bg-red-700 hover:scale-[1.02] active:bg-red-800 active:scale-[0.99] border-2 border-red-800"
          >
            <UserPlus size={20} className="mr-3" /> REGISTER
          </button>
        </form>

        {/* Footer */}
        <div className="p-8 pt-0 space-y-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center mx-auto text-sm tracking-wider text-red-500 uppercase transition-colors hover:text-white"
          >
            Already have access?
            <ArrowRight size={16} className="ml-2" />
          </button>

          <p className="mt-4 text-xs tracking-widest uppercase text-zinc-700">
            S T R Y V E © 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
