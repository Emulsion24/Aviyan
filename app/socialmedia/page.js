"use client";
import Image from "next/image";
import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaSpotify, FaYoutube, FaApple } from "react-icons/fa";
import { Menu, X, LogIn, UserPlus, Phone, Mail, MapPin } from "lucide-react";

export default function SocialMediaPage() {
       
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6">
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
  
            {/* Responsive Circular Social Icons */}
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[500px] aspect-square mt-4 sm:mt-6 mx-auto mb-4 sm:mb-6">
              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-orange-50 to-white rounded-full shadow-xl flex items-center justify-center z-10 border-2 border-orange-200">
                <div className="text-center px-2">
                  <p className="text-orange-700 font-bold text-xs sm:text-sm md:text-base">Connect</p>
                  <p className="text-orange-500 text-[10px] sm:text-xs md:text-sm font-medium">With Us</p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918239711008"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-green-50 hover:bg-green-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-green-200"
                style={{ transform: 'translate(calc(-50% + 0px), calc(-50% + -130px))', transformOrigin: 'center' }}
              >
                <FaWhatsapp className="text-green-600 text-2xl sm:text-3xl md:text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/channel/UCC9dQTSQXl4FeN0a9KTWZjg"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-red-50 hover:bg-red-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-red-200"
                style={{ transform: 'translate(calc(-50% + 92px), calc(-50% + -92px))', transformOrigin: 'center' }}
              >
                <FaYoutube className="text-red-600 text-2xl sm:text-3xl md:text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Email */}
              <a
                href="mailto:GSAabhiyan2027@gmail.com"
                className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-orange-50 hover:bg-orange-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-orange-200"
                style={{ transform: 'translate(calc(-50% + 130px), calc(-50% + 0px))', transformOrigin: 'center' }}
              >
                <FaEnvelope className="text-orange-600 text-2xl sm:text-3xl md:text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/%E0%A4%97%E0%A5%8C-%E0%A4%B8%E0%A4%AE%E0%A5%8D%E0%A4%AE%E0%A4%BE%E0%A4%A8-%E0%A4%86%E0%A4%B9%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%A8-%E0%A4%85%E0%A4%AD%E0%A4%BF%E0%A4%AF%E0%A4%BE%E0%A4%A8/pfbid02xULUWGzGzaKavbxH6egvaq2ASTU6VWKsw7rukxDXQeGU8YN4hmxZpnyEYDETNDhol/?rdid=qaWNqeDzDHlXVYNo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Mtt9fjcZJ%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-blue-50 hover:bg-blue-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-blue-200"
                style={{ transform: 'translate(calc(-50% + 92px), calc(-50% + 92px))', transformOrigin: 'center' }}
              >
                <FaFacebook className="text-blue-700 text-2xl sm:text-3xl md:text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/gausmmaanaahvaan/?igsh=end1eGRrZ2ZlMHc%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-pink-50 hover:bg-pink-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-pink-200"
                style={{ transform: 'translate(calc(-50% + 0px), calc(-50% + 130px))', transformOrigin: 'center' }}
              >
                <FaInstagram className="text-pink-700 text-2xl sm:text-3xl md:text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Twitter */}
              <a
                href="https://x.com/GSAA2027?t=SGtchhWi3hqcLVeD5aF2Lg&s=09"
                className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-sky-50 hover:bg-sky-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-sky-200"
                style={{ transform: 'translate(calc(-50% + -92px), calc(-50% + 92px))', transformOrigin: 'center' }}
              >
                <FaTwitter className="text-sky-600 text-2xl sm:text-3xl md:text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Spotify */}
              <a
                href="https://open.spotify.com/user/31hpaxs5skl43g65frugwkxyzfwm?si=8N-tPs2GQ9ixaG-eKRU4rA&nd=1&dlsi=645dce9f1e184bff"
                className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-emerald-50 hover:bg-emerald-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-emerald-200"
                style={{ transform: 'translate(calc(-50% + -130px), calc(-50% + 0px))', transformOrigin: 'center' }}
              >
                <FaSpotify className="text-emerald-600 text-2xl sm:text-3xl md:text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-300" />
              </a>

              {/* Apple Music */}
              <a
                href="mailto:gausamman@gmail.com"
                className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gray-50 hover:bg-gray-100 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-gray-200"
                style={{ transform: 'translate(calc(-50% + -92px), calc(-50% + -92px))', transformOrigin: 'center' }}
              >
                <FaApple className="text-gray-800 text-2xl sm:text-3xl md:text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-300" />
              </a>
            </div>
            
           {/* --- UPDATED BUTTON --- */}
           <div className="flex mt-10 justify-center items-center">
            <a
              href="https://www.gausamman.cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base sm:text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-center justify-center text-center gap-1 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 animate-pulse-subtle"
            >
              <span>🌐 Visit Official Website</span>
              <span className="hidden sm:inline"> — </span>
              <span className="block sm:inline underline decoration-white/50 text-sm sm:text-base">www.gausamman.cloud</span>
            </a>
          </div>

            {/* Responsive scaling for larger screens */}
            <style jsx>{`
              @media (min-width: 640px) { /* sm */
                .relative.aspect-square a:nth-of-type(1) {
                  transform: translate(calc(-50% + 0px), calc(-50% + -150px)) !important;
                }
                .relative.aspect-square a:nth-of-type(2) {
                  transform: translate(calc(-50% + 106px), calc(-50% + -106px)) !important;
                }
                .relative.aspect-square a:nth-of-type(3) {
                  transform: translate(calc(-50% + 150px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(4) {
                  transform: translate(calc(-50% + 106px), calc(-50% + 106px)) !important;
                }
                .relative.aspect-square a:nth-of-type(5) {
                  transform: translate(calc(-50% + 0px), calc(-50% + 150px)) !important;
                }
                .relative.aspect-square a:nth-of-type(6) {
                  transform: translate(calc(-50% + -106px), calc(-50% + 106px)) !important;
                }
                .relative.aspect-square a:nth-of-type(7) {
                  transform: translate(calc(-50% + -150px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(8) {
                  transform: translate(calc(-50% + -106px), calc(-50% + -106px)) !important;
                }
              }
              
              @media (min-width: 768px) { /* md */
                .relative.aspect-square a:nth-of-type(1) {
                  transform: translate(calc(-50% + 0px), calc(-50% + -170px)) !important;
                }
                .relative.aspect-square a:nth-of-type(2) {
                  transform: translate(calc(-50% + 120px), calc(-50% + -120px)) !important;
                }
                .relative.aspect-square a:nth-of-type(3) {
                  transform: translate(calc(-50% + 170px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(4) {
                  transform: translate(calc(-50% + 120px), calc(-50% + 120px)) !important;
                }
                .relative.aspect-square a:nth-of-type(5) {
                  transform: translate(calc(-50% + 0px), calc(-50% + 170px)) !important;
                }
                .relative.aspect-square a:nth-of-type(6) {
                  transform: translate(calc(-50% + -120px), calc(-50% + 120px)) !important;
                }
                .relative.aspect-square a:nth-of-type(7) {
                  transform: translate(calc(-50% + -170px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(8) {
                  transform: translate(calc(-50% + -120px), calc(-50% + -120px)) !important;
                }
              }
              
              @media (min-width: 1024px) { /* lg */
                .relative.aspect-square a:nth-of-type(1) {
                  transform: translate(calc(-50% + 0px), calc(-50% + -190px)) !important;
                }
                .relative.aspect-square a:nth-of-type(2) {
                  transform: translate(calc(-50% + 134px), calc(-50% + -134px)) !important;
                }
                .relative.aspect-square a:nth-of-type(3) {
                  transform: translate(calc(-50% + 190px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(4) {
                  transform: translate(calc(-50% + 134px), calc(-50% + 134px)) !important;
                }
                .relative.aspect-square a:nth-of-type(5) {
                  transform: translate(calc(-50% + 0px), calc(-50% + 190px)) !important;
                }
                .relative.aspect-square a:nth-of-type(6) {
                  transform: translate(calc(-50% + -134px), calc(-50% + 134px)) !important;
                }
                .relative.aspect-square a:nth-of-type(7) {
                  transform: translate(calc(-50% + -190px), calc(-50% + 0px)) !important;
                }
                .relative.aspect-square a:nth-of-type(8) {
                  transform: translate(calc(-50% + -134px), calc(-50% + -134px)) !important;
                }
              }

              /* --- ADDED THIS ANIMATION --- */
              @keyframes pulse-subtle {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.03);
                }
              }
              .animate-pulse-subtle {
                animation: pulse-subtle 2.5s infinite ease-in-out;
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