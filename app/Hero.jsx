"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, LogIn, UserPlus, Phone, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroWithNav = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const goToLogin = () => {
   router.push("/login");
   setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation - Fixed White Background */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b-2 border-orange-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 p-1 shadow-xl group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="गौ सम्मान लोगो"
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <div className="text-gray-800">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  गौ सम्मान आह्वान अभियान
                </h1>
               
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={scrollToForm}
                className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg hover:scale-105"
              >
                <UserPlus className="inline-block mr-2" size={18} />
                पंजीकरण करें
              </button>
              <button
                onClick={goToLogin}
                className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <LogIn className="inline-block mr-2" size={18} />
                लॉगिन
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors text-gray-800 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-orange-100 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <button
                onClick={scrollToForm}
                className="w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg transition-all"
              >
                <UserPlus className="inline-block mr-2" size={18} />
                पंजीकरण करें
              </button>
              <button
                onClick={goToLogin}
                className="w-full px-6 py-3 rounded-lg font-semibold border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-all"
              >
                <LogIn className="inline-block mr-2" size={18} />
                लॉगिन
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background with Marigold Garlands */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100">
          {/* Top Marigold Garland */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-orange-300/40 to-transparent">
            <div className="flex justify-around items-start">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center animate-swing" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 my-0.5 shadow-md"
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Animated Blobs */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="container relative z-10 px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Top Decorative Text */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 animate-fadeIn">
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border-2 border-orange-200">
                । जय नंदी बावा ।
              </span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border-2 border-orange-200">
                । श्री करुनला ।
              </span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border-2 border-orange-200">
                । जय गोमाता ।
              </span>
            </div>

            {/* Main Content Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-orange-200 p-8 md:p-12 animate-slideUp">
              {/* Three Pillars */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="px-8 py-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform border-2 border-yellow-500">
                  <span className="text-2xl md:text-3xl font-bold"> सेवा </span>
                </div>
                <div className="px-8 py-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform border-2 border-yellow-500">
                  <span className="text-2xl md:text-3xl font-bold"> सुरक्षा </span>
                </div>
                <div className="px-8 py-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform border-2 border-yellow-500">
                  <span className="text-2xl md:text-3xl font-bold"> सम्मान </span>
                </div>
              </div>

              {/* Central Logo and Title */}
              <div className="text-center space-y-6 mb-8">
                {/* Circular Logo */}
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-orange-300 shadow-2xl animate-pulse-slow">
                    <Image
                      src="/logo.jpg"
                      alt="गौ सम्मान लोगो"
                      width={256}
                      height={256}
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Main Title */}
                <div className="relative">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 animate-float">
                    <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
                      गौ सम्मान
                    </span>
                  </h1>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-700 mb-4">
                    आह्वान अभियान
                  </h2>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <button
                  onClick={scrollToForm}
                  className="group px-10 py-5 text-xl font-bold rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 text-white shadow-2xl hover:shadow-orange-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-3">
                    <UserPlus size={24} />
                    अभियान में शामिल हों
                  </span>
                </button>
                <button
                  onClick={goToLogin}
                  className="px-10 py-5 text-xl font-bold rounded-2xl bg-white border-4 border-orange-500 text-orange-600 shadow-xl hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-3">
                    <LogIn size={24} />
                    लॉगिन करें
                  </span>
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t-2 border-orange-200">
                <div className="flex flex-wrap justify-center gap-6 text-gray-700">
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg">
                    <Phone size={20} className="text-orange-600" />
                    <span className="font-semibold">संपर्क: +91 8239711108</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg">
                    <Mail size={20} className="text-orange-600" />
                    <span className="font-semibold">info@gosamman.org</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Decorative Elements */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg border-2 border-orange-200">
                <p className="text-sm md:text-base font-semibold text-gray-700">
                  सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामया
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Flowers */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-80">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="text-4xl md:text-6xl animate-grow" style={{ animationDelay: `${i * 0.3}s` }}>
              <Image
                src="/3.png"
                alt="Decorative Flower"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Cards Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* प्रधान संरक्षक */}
            <div className="relative group">
              {/* Soft ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-rose-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

              {/* Main card with ancient border pattern */}
              <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-500 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                {/* Decorative corner patterns */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-300 opacity-60"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-300 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-300 opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-300 opacity-60"></div>

                {/* Content */}
                <div className="relative px-8 py-6 md:px-12 md:py-8">
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-yellow-400/30 backdrop-blur-sm rounded-full border-2 border-yellow-300 shadow-lg">
                      <span className="text-xl md:text-2xl font-bold text-yellow-100">✦</span>
                      <span className="text-xl md:text-2xl font-bold text-white">प्रधान संरक्षक</span>
                      <span className="text-xl md:text-2xl font-bold text-yellow-100">✦</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-yellow-200 drop-shadow-lg pt-2">
                      गौमाता
                    </h3>
                    
                    <div className="inline-block px-6 py-2 bg-orange-700/50 backdrop-blur-sm rounded-lg border-2 border-yellow-400/50">
                      <p className="text-lg md:text-xl text-yellow-100 font-semibold">
                        (आद्यशक्ति मां सुरभि)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom decorative wave */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
              </div>
            </div>

            {/* अध्यक्षता */}
            <div className="relative group">
              {/* Soft ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

              {/* Main card with ancient border pattern */}
              <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-2xl overflow-hidden shadow-xl border-4 border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
                {/* Decorative corner patterns */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-cyan-300 opacity-60"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cyan-300 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-cyan-300 opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cyan-300 opacity-60"></div>

                {/* Content */}
                <div className="relative px-8 py-6 md:px-12 md:py-8">
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-cyan-400/30 backdrop-blur-sm rounded-full border-2 border-cyan-300 shadow-lg">
                      <span className="text-xl md:text-2xl font-bold text-cyan-100">✦</span>
                      <span className="text-xl md:text-2xl font-bold text-white">अध्यक्षता</span>
                      <span className="text-xl md:text-2xl font-bold text-cyan-100">✦</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-cyan-200 drop-shadow-lg pt-2">
                      नंदी बाबा
                    </h3>
                    
                    <div className="inline-block px-6 py-2 bg-indigo-800/50 backdrop-blur-sm rounded-lg border-2 border-cyan-400/50">
                      <p className="text-lg md:text-xl text-cyan-100 font-semibold">
                        (नीलमणि वृषभदेव)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom decorative wave */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes swing {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes grow {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.6); }
        }

        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-swing { animation: swing 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-grow { animation: grow 0.6s ease-out forwards; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .animation-delay-1000 { animation-delay: 0.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </>
  );
};

export default HeroWithNav;