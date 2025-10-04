import React from "react";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "Email", icon: Mail, url: "#" },
  ];

  return (
    <footer className="mt-16 text-white border-t bg-zinc-900 border-red-600/50 font-inter">
      <div className="flex flex-col items-start justify-between gap-8 px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 md:flex-row md:items-center">
        {/* Logo and Tagline */}
        <div className="md:w-1/4">
          <h1 className="text-4xl font-extrabold tracking-widest text-red-600 uppercase">
            STRYVE /
          </h1>
          <p className="mt-2 text-sm tracking-widest text-gray-400 uppercase">
            {"// P R E M I U M D R O P S"}
          </p>
        </div>

        {/* Placeholder for future nav links */}
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12 md:w-1/2">
          {/* Add <a> links here if needed */}
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 md:w-1/4 md:justify-end">
          {socialLinks.map((link) => {
            const Icon = link.icon; // assign component to variable
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 transition-transform duration-200 border rounded-none hover:text-red-600 hover:scale-110 border-zinc-700 hover:border-red-600"
                aria-label={`Follow us on ${link.name}`}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="py-4 text-center text-gray-600 border-t bg-zinc-950 border-zinc-800">
        <p className="text-xs tracking-widest uppercase">
          &copy; {new Date().getFullYear()} S T R Y V E. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
