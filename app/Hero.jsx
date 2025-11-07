"use client";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
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
      <nav className="fixed top-0  left-0 right-0 z-50 bg-white shadow-md border-b-2 border-orange-200">
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
<div className="flex flex items-center justify-center leading-none min-h-[60px]">
  <Image
    src="/gau.png"
    alt="गौ सम्मान टेक्स्ट लोगो"
    width={160}
    height={60}
    priority
    className="object-contain w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] h-auto"
  />
  <Image
    src="/samman.png"
    alt="आह्वान अभियान टेक्स्ट लोगो"
    width={160}
    height={60}
    priority
    className="object-contain w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] h-auto -mt-[6px]"
  />
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
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2">
                ।। जय नंदी बाबा ।।
              </span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2">
                ।। श्री करनला ।।
              </span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2">
                ।। जय गोमाता ।।
              </span>
            </div>

            {/* Main Content Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-orange-200 p-8 md:p-12 animate-slideUp">
              {/* Three Pillars */}
              <div className="flex flex-wrap justify-center items-center mb-10 gap-8">
  {["। सेवा ।", "। सुरक्षा ।", "। सम्मान ।"].map((text, i) => (
    <span
      key={i}
      className="relative text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 drop-shadow-[0_0_10px_rgba(255,193,7,0.4)]"
    >
      {text}
      <span className="absolute inset-x-0 -bottom-1 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></span>
    </span>
  ))}
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
<div className="relative flex flex-col items-center justify-center leading-none mx-auto">
  <Image
    src="/gau.png"
    alt="गौ सम्मान टेक्स्ट लोगो"
    width={600}
    height={400}
    className="object-contain h-auto w-[250px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[550px] mt-2"
    priority
  />
  <Image
    src="/samman.png"
    alt="आह्वान अभियान टेक्स्ट लोगो"
    width={600}
    height={400}
    className="object-contain h-auto w-[250px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[550px] -translate-y-[8px]"
    priority
  />
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
                
              </div>

              {/* Contact Info */}
               <div className="mt-8 pt-6 border-t-2 border-orange-200">
      {/* Heading */}
     

      {/* Contact Buttons */}
      <div className="flex flex-wrap justify-center gap-6 text-gray-700">
        {/* WhatsApp Contact */}
        <a
          href="https://wa.me/918239711008"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <FaWhatsapp className="text-green-600 text-2xl" />
          <span className="font-semibold text-lg text-gray-800">
            WhatsApp: +91 8239711008
          </span>
        </a>

        {/* Email Contact */}
        <a
          href="mailto:gausamman@gmail.com"
          className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <FaEnvelope className="text-orange-600 text-2xl" />
          <span className="font-semibold text-lg text-gray-800">
            gausamman@gmail.com
          </span>
        </a>
      </div>

      {/* Info Text Below */}
     
    </div>
            </div>

            {/* Bottom Decorative Elements */}
            <div className="mt-8  mb-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg border-2 border-orange-200">
                <p className="text-sm md:text-base font-semibold text-gray-700">
                  मातर: सर्वभूतानाम्,गाव: सर्वसुखप्रदा:।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Flowers */}
<div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-80">
  {[...Array(6)].map((_, i) => (
    <div
      key={i}
      className="text-4xl md:text-6xl "
      style={{
 
        transform: i >= 3 ? "scale(1) scaleX(-1)" : "scale(1)",
      }}
    >
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
               <div className="relative group">
  {/* Soft glowing background */}
  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

  {/* Main card */}
  <div className="relative bg-gradient-to-br from-orange-700 via-amber-400 to-yellow-700 rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
    {/* Decorative golden corners */}
    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-300 opacity-60"></div>
    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-300 opacity-60"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-300 opacity-60"></div>
    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-300 opacity-60"></div>

    {/* Content */}
    <div className="relative px-8 py-10 md:px-12 md:py-12 text-center space-y-8">
      {/* Title */}
      <div className="inline-flex items-center gap-3 px-8 py-3 bg-white  backdrop-blur-sm rounded-full border-2 border-yellow-300 shadow-lg">
        <span className="text-xl md:text-2xl font-bold text-red-600">✦</span>
        <span className="text-2xl md:text-4xl font-bold bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 text-transparent"> अभियान कार्यकारिणी  </span>
        <span className="text-xl md:text-2xl font-bold text-red-600">✦</span>
      </div>

      {/* Executive List */}
      <div className="space-y-6 text-yellow-100 font-semibold">
        <p className="text-2xl md:text-3xl font-extrabold text-yellow-200">
          प्रधान संरक्षक - <span className=" text-lg md:text-2xl text-red-700">गौमाता</span>   <span className="text-lg md:text-2xl text-red-700">(आद्यशक्ति मां सुरभि)</span>
        </p>
     

        <p className="text-2xl md:text-3xl font-semibold text-yellow-200 pt-4">
          अध्यक्षता - <span className="text-lg md:text-2xl text-red-700">नंदी बाबा</span> <span className="text-lg md:text-2xl  text-red-700">(नीलमणि वृषभदेव)</span>
        </p>
       
          <div className="w-28 h-1.5 mx-auto mt-4 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-900 rounded-full shadow-md"></div>
        <p className="text-2xl md:text-3xl font-bold text-yellow-200 pt-4">
          आशीर्वाद
        </p>
        <p className="text-lg md:text-2xl  text-red-700 leading-relaxed">
          भारतीय परम्परा के समस्त आराध्य देवी देवता
        </p>
 <div className="w-28 h-1.5 mx-auto mt-4 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-900 rounded-full shadow-md"></div>
        <p className="text-2xl md:text-3xl font-bold text-yellow-200 pt-4">
          सहयोग
        </p>
        
        <p className="text-lg md:text-2xl  text-red-700 leading-relaxed max-w-3xl mx-auto">
          भारतीय परम्परा के सभी आचार्य, मूर्धन्य संत, महापुरुष,  
          सभी गो संत, गो भक्त, गोरक्षक, गो सेवक, गो पालक,  
          गो पुत्र, गो वत्स, एवं गो प्रेमी जन
        </p>
      </div>
    </div>

    {/* Bottom border line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
  </div>
</div>


                {/* Bottom decorative wave */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
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