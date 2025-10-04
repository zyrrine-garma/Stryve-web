import React, { useState } from "react";
import { LogIn, User, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);
    if (result.success) {
      navigate("/"); // redirect to home on success
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 pt-24 bg-zinc-950 font-inter">
      <div className="w-full max-w-sm bg-zinc-900 shadow-2xl shadow-black/70 rounded-xl overflow-hidden border-2 border-red-600/50 transform hover:scale-[1.01] transition-transform duration-300">
        {/* Header */}
        <div className="p-8 border-b-4 border-red-600 bg-gradient-to-b from-zinc-800 to-zinc-900">
          <h1 className="text-4xl font-extrabold tracking-[0.3em] text-white uppercase flex items-center justify-center text-shadow-red">
            LOGIN
          </h1>
          <p className="mt-3 text-xs tracking-widest text-center text-gray-400 uppercase">
            ACCESS YOUR ACCOUNT
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="p-4 text-sm font-semibold tracking-wider text-center text-white uppercase transition-colors duration-300 border border-red-600 rounded-md shadow-lg bg-red-800/50 shadow-red-600/20">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <User
              size={20}
              className="absolute text-gray-500 transform -translate-y-1/2 left-4 top-1/2"
            />
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
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
              placeholder="PASSWORD"
              className="w-full py-3.5 pl-12 pr-4 bg-zinc-800 text-white border border-zinc-700 rounded-md placeholder-gray-500 tracking-wide transition-all duration-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 mt-6 font-extrabold tracking-[0.2em] text-lg flex items-center justify-center transition-all duration-200 shadow-xl shadow-red-600/50 rounded-md hover:bg-red-700 hover:scale-[1.02] active:bg-red-800 active:scale-[0.99] border-2 border-red-800"
          >
            <LogIn size={20} className="mr-3" />
            LOGIN
          </button>
        </form>

        {/* Footer */}
        <div className="p-8 pt-0 space-y-4 text-center">
          <button
            onClick={() => navigate("/register")}
            className="flex items-center justify-center mx-auto text-sm tracking-wider text-red-500 uppercase transition-colors hover:text-white"
          >
            New to STRYVE?
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
