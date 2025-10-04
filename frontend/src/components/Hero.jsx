import React from "react";
import { useNavigate } from "react-router-dom";

const GLITCH_CHARS = "STRYVE!@#$%^&*-+?.,:;~";

const createGlitchedText = (originalText, intensity) => {
  let glitchedText = "";
  for (let i = 0; i < originalText.length; i++) {
    glitchedText +=
      Math.random() < intensity
        ? GLITCH_CHARS.charAt(Math.floor(Math.random() * GLITCH_CHARS.length))
        : originalText[i];
  }
  return glitchedText;
};

export default function Hero() {
  const originalText = "STRYVE";
  const [titleText, setTitleText] = React.useState(originalText);
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      const intensity = Math.random() > 0.9 ? 0.3 : 0.05;
      setTitleText(createGlitchedText(originalText, intensity));
    }, 80);
    return () => clearInterval(interval);
  }, [originalText]);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden font-inter text-white bg-black bg-noise px-4">
      {/* Hero Text */}
      <h1 className="relative text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase text-center tracking-[0.3em] sm:tracking-[0.5em] leading-tight text-stryve-red drop-shadow-[0_0_20px_rgba(220,38,38,0.4)] animate-fadeIn cursor-default">
        {titleText}
      </h1>

      {/* Divider */}
      <div className="w-1/4 max-w-md h-1 bg-stryve-red my-6 opacity-75 animate-fadeIn-delay-200"></div>

      {/* Tagline */}
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 text-center uppercase tracking-[0.15em] animate-fadeIn-delay-400 max-w-xl">
        Premium streetwear // Edgy style.
      </p>

      {/* CTA */}
      <button
        onClick={() => navigate("/shop")}
        className="mt-12 px-8 sm:px-12 py-2 sm:py-3 bg-stryve-red text-white font-semibold rounded-none uppercase tracking-widest border-2 border-stryve-red hover:bg-transparent hover:text-red-500 hover:shadow-red-500/50 hover:shadow-md transition-all duration-300 transform animate-fadeIn-delay-600"
      >
        Shop The Drop
      </button>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 text-gray-500 text-sm tracking-widest text-center cursor-pointer"
        onClick={() => {
          const element = document.getElementById("products");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <svg
          className="w-6 h-6 mx-auto mb-2 text-stryve-red animate-pulse-glow animate-pulseArrow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}
