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
                  गौ सम्मान आह्वान
                </h1>
                <p className="text-xs md:text-sm text-gray-600">
                  सेवा • सुरक्षा • सम्मान
                </p>
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
                ।। जय नंदी बावा ।।
              </span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border-2 border-orange-200">
                ।। श्री करुनला ।।
              </span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border-2 border-orange-200">
                ।। जय गोमाता ।।
              </span>
            </div>

            {/* Main Content Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-orange-200 p-8 md:p-12 animate-slideUp">
              {/* Three Pillars */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="px-8 py-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform border-2 border-yellow-500">
                  <span className="text-2xl md:text-3xl font-bold">।। सेवा ।।</span>
                </div>
                <div className="px-8 py-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform border-2 border-yellow-500">
                  <span className="text-2xl md:text-3xl font-bold">।। सुरक्षा ।।</span>
                </div>
                <div className="px-8 py-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform border-2 border-yellow-500">
                  <span className="text-2xl md:text-3xl font-bold">।। सम्मान ।।</span>
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

               

                {/* Subtitle with Highlighted Leadership Roles */}
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 blur-xl opacity-60 animate-pulse-slow"></div>
                    <div className="relative px-6 py-5 md:px-10 md:py-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl border-4 border-yellow-300 shadow-2xl">
                      <p className="text-xl md:text-3xl font-black text-white drop-shadow-lg">
                        <span className="inline-block px-3 py-1 bg-white/30 rounded-lg animate-float mr-2">प्रधान संरक्षक</span> 
                        <span className="text-white"> - गौमाता (आद्यशक्ति मां सुरभि)</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 blur-xl opacity-60 animate-pulse-slow animation-delay-1000"></div>
                    <div className="relative px-6 py-5 md:px-10 md:py-6 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 rounded-2xl border-4 border-orange-300 shadow-2xl">
                      <p className="text-xl md:text-3xl font-black text-white drop-shadow-lg">
                        <span className="inline-block px-3 py-1 bg-white/30 rounded-lg animate-float animation-delay-1000 mr-2">अध्यक्षता</span> 
                        <span className="text-white"> - नंदी बाबा (नीलमणि वृषभदेव)</span>
                      </p>
                    </div>
                  </div>
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
                    <span className="font-semibold">संपर्क: +91 XXXXX XXXXX</span>
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
                <span className="text-2xl">🕉️</span>
                <p className="text-sm md:text-base font-semibold text-gray-700">
                  सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
                </p>
                <span className="text-2xl">🙏</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Flowers */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-50">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="text-4xl md:text-6xl animate-grow" style={{ animationDelay: `${i * 0.3}s` }}>
              🌺
            </div>
          ))}
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
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes grow {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-swing { animation: swing 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-grow { animation: grow 0.6s ease-out forwards; }

        .animation-delay-1000 { animation-delay: 0.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </>
  );
};

export default HeroWithNav;