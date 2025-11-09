"use client";
import Image from "next/image";
import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaSpotify, FaYoutube, FaApple } from "react-icons/fa";
import { Menu, X, LogIn, UserPlus, Phone, Mail, MapPin } from "lucide-react";

export default function SocialMediaPage() {
       
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20 px-4">
      <div className="container relative z-10 px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border-2 md:border-4 border-orange-200 p-6 sm:p-8 md:p-10 lg:p-12 animate-slideUp">
            
            <div className="text-center space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 md:border-6 border-orange-300 shadow-2xl animate-pulse-slow">
                  <Image src="/logo.jpg" alt="गौ सम्मान लोगो" width={256} height={256} className="object-cover" priority />
                </div>
              </div>

              <div className="relative flex flex-col items-center justify-center leading-none mx-auto">
                <Image src="/gau.png" alt="गौ सम्मान टेक्स्ट लोगो" width={600} height={400} className="object-contain h-auto w-[180px] sm:w-[230px] md:w-[300px] lg:w-[360px] xl:w-[420px] mt-1" priority />
                <Image src="/samman.png" alt="आह्वान अभियान टेक्स्ट लोगो" width={600} height={400} className="object-contain h-auto w-[180px] sm:w-[230px] md:w-[300px] lg:w-[360px] xl:w-[420px] -translate-y-[4px] md:-translate-y-[6px]" priority />
              </div>
            </div>
  
            {/* Responsive Circular Social Icons - 7 icons evenly spaced */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] aspect-square mt-4 sm:mt-6 mx-auto mb-4 sm:mb-6">
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-50 to-white rounded-full shadow-xl flex items-center justify-center z-10 border-2 border-orange-200">
                <div className="text-center px-2">
                  <p className="text-orange-700 font-bold text-[11px] sm:text-xs md:text-sm">Connect</p>
                  <p className="text-orange-500 text-[9px] sm:text-[10px] md:text-xs font-medium">With Us</p>
                </div>
              </div>

              {/* WhatsApp - Position 1 (0° - Top) */}
              <a
                href="https://wa.me/918239711008"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-green-50 hover:bg-green-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-green-200"
                style={{ transform: 'translate(calc(-50% + 0px), calc(-50% + -110px))', transformOrigin: 'center' }}
              >
                <FaWhatsapp className="text-green-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* YouTube - Position 2 (45°) */}
              <a
                href="https://www.youtube.com/@dhenutv"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-red-50 hover:bg-red-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-red-200"
                style={{ transform: 'translate(calc(-50% + 78px), calc(-50% + -78px))', transformOrigin: 'center' }}
              >
                <FaYoutube className="text-red-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Email - Position 3 (90° - Right) */}
              <a
                href="mailto:GSAabhiyan2027@gmail.com"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-orange-50 hover:bg-orange-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-orange-200"
                style={{ transform: 'translate(calc(-50% + 110px), calc(-50% + 0px))', transformOrigin: 'center' }}
              >
                <FaEnvelope className="text-orange-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Facebook - Position 4 (135°) */}
              <a
                href="https://www.facebook.com/people/%E0%A4%97%E0%A5%8C-%E0%A4%B8%E0%A4%AE%E0%A5%8D%E0%A4%AE%E0%A4%BE%E0%A4%A8-%E0%A4%86%E0%A4%B9%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%A8-%E0%A4%85%E0%A4%AD%E0%A4%BF%E0%A4%AF%E0%A4%BE%E0%A4%A8/pfbid0tctmKc4T96rbmjdFGmDc2U77YfHheskkXdMJvsSwsuHGnNkvJdE9pszznsNx9sQVl/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-blue-50 hover:bg-blue-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-blue-200"
                style={{ transform: 'translate(calc(-50% + 78px), calc(-50% + 78px))', transformOrigin: 'center' }}
              >
                <FaFacebook className="text-blue-700 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Instagram - Position 5 (180° - Bottom) */}
              <a
                href="https://www.instagram.com/gausmmaanaahvaan/#"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-pink-50 hover:bg-pink-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-pink-200"
                style={{ transform: 'translate(calc(-50% + 0px), calc(-50% + 110px))', transformOrigin: 'center' }}
              >
                <FaInstagram className="text-pink-700 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Twitter - Position 6 (225°) */}
              <a
                href="mailto:gausamman@gmail.com"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-sky-50 hover:bg-sky-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-sky-200"
                style={{ transform: 'translate(calc(-50% + -78px), calc(-50% + 78px))', transformOrigin: 'center' }}
              >
                <FaTwitter className="text-sky-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Spotify - Position 7 (270° - Left) */}
              <a
                href="mailto:gausamman@gmail.com"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-emerald-50 hover:bg-emerald-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-emerald-200"
                style={{ transform: 'translate(calc(-50% + -110px), calc(-50% + 0px))', transformOrigin: 'center' }}
              >
                <FaSpotify className="text-emerald-600 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Apple Music - Position 8 (315°) */}
              <a
                href="mailto:gausamman@gmail.com"
                className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 bg-gray-50 hover:bg-gray-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-gray-200"
                style={{ transform: 'translate(calc(-50% + -78px), calc(-50% + -78px))', transformOrigin: 'center' }}
              >
                <FaApple className="text-gray-800 text-xl sm:text-2xl md:text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300" />
              </a>
            </div>

            {/* Responsive scaling for larger screens */}
            <style jsx>{`
              @media (min-width: 640px) {
                .relative.aspect-square a:nth-of-type(1) {
                  transform: translate(calc(-50% + 0px), calc(-50% + -120px)) !important;
                }
                .relative.aspect-square a:nth-of-type(2) {
                  transform: translate(calc(-50% + 85px), calc(-50% + -85px)) !important;
                }
                .relative.aspect-square a:nth-of-type(3) {
                  transform: translate(calc(-50% + 120px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(4) {
                  transform: translate(calc(-50% + 85px), calc(-50% + 85px)) !important;
                }
                .relative.aspect-square a:nth-of-type(5) {
                  transform: translate(calc(-50% + 0px), calc(-50% + 120px)) !important;
                }
                .relative.aspect-square a:nth-of-type(6) {
                  transform: translate(calc(-50% + -85px), calc(-50% + 85px)) !important;
                }
                .relative.aspect-square a:nth-of-type(7) {
                  transform: translate(calc(-50% + -120px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(8) {
                  transform: translate(calc(-50% + -85px), calc(-50% + -85px)) !important;
                }
              }
              
              @media (min-width: 768px) {
                .relative.aspect-square a:nth-of-type(1) {
                  transform: translate(calc(-50% + 0px), calc(-50% + -130px)) !important;
                }
                .relative.aspect-square a:nth-of-type(2) {
                  transform: translate(calc(-50% + 92px), calc(-50% + -92px)) !important;
                }
                .relative.aspect-square a:nth-of-type(3) {
                  transform: translate(calc(-50% + 130px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(4) {
                  transform: translate(calc(-50% + 92px), calc(-50% + 92px)) !important;
                }
                .relative.aspect-square a:nth-of-type(5) {
                  transform: translate(calc(-50% + 0px), calc(-50% + 130px)) !important;
                }
                .relative.aspect-square a:nth-of-type(6) {
                  transform: translate(calc(-50% + -92px), calc(-50% + 92px)) !important;
                }
                .relative.aspect-square a:nth-of-type(7) {
                  transform: translate(calc(-50% + -130px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(8) {
                  transform: translate(calc(-50% + -92px), calc(-50% + -92px)) !important;
                }
              }
              
              @media (min-width: 1024px) {
                .relative.aspect-square a:nth-of-type(1) {
                  transform: translate(calc(-50% + 0px), calc(-50% + -145px)) !important;
                }
                .relative.aspect-square a:nth-of-type(2) {
                  transform: translate(calc(-50% + 103px), calc(-50% + -103px)) !important;
                }
                .relative.aspect-square a:nth-of-type(3) {
                  transform: translate(calc(-50% + 145px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(4) {
                  transform: translate(calc(-50% + 103px), calc(-50% + 103px)) !important;
                }
                .relative.aspect-square a:nth-of-type(5) {
                  transform: translate(calc(-50% + 0px), calc(-50% + 145px)) !important;
                }
                .relative.aspect-square a:nth-of-type(6) {
                  transform: translate(calc(-50% + -103px), calc(-50% + 103px)) !important;
                }
                .relative.aspect-square a:nth-of-type(7) {
                  transform: translate(calc(-50% + -145px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(8) {
                  transform: translate(calc(-50% + -103px), calc(-50% + -103px)) !important;
                }
              }
            `}</style>
            
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-80 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl" style={{ transform: i >= 3 ? "scale(1) scaleX(-1)" : "scale(1)" }}>
            <Image src="/3.png" alt="Decorative Flower" width={100} height={100} />
          </div>
        ))}
      </div>
    </section>
  );
}