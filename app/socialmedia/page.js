 
 import Image from "next/image";
import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaSpotify } from "react-icons/fa";
import { Menu, X, LogIn, UserPlus, Phone, Mail, MapPin } from "lucide-react";

export default function SocialMediaPage() {
       
 return(<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-orange-300/40 to-transparent">
            <div className="flex justify-around items-start">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center animate-swing" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 my-0.5 shadow-md"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 animate-fadeIn">
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2">।। जय नंदी बाबा ।।</span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2">।। श्री करनला ।।</span>
              <span className="text-lg md:text-xl font-bold text-red-600 px-4 py-2">।। जय गोमाता ।।</span>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-orange-200 p-8 md:p-12 animate-slideUp">
              <div className="flex flex-wrap justify-center items-center mb-10 gap-8">
                {["। सेवा ।", "। सुरक्षा ।", "। सम्मान ।"].map((text, i) => (
                  <span key={i} className="relative text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 drop-shadow-[0_0_10px_rgba(255,193,7,0.4)]">
                    {text}
                    <span className="absolute inset-x-0 -bottom-1 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></span>
                  </span>
                ))}
              </div>

              <div className="text-center space-y-6 mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-orange-300 shadow-2xl animate-pulse-slow">
                    <Image src="/logo.jpg" alt="गौ सम्मान लोगो" width={256} height={256} className="object-cover" priority />
                  </div>
                </div>

                <div className="relative flex flex-col items-center justify-center leading-none mx-auto">
                  <Image src="/gau.png" alt="गौ सम्मान टेक्स्ट लोगो" width={600} height={400} className="object-contain h-auto w-[250px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[550px] mt-2" priority />
                  <Image src="/samman.png" alt="आह्वान अभियान टेक्स्ट लोगो" width={600} height={400} className="object-contain h-auto w-[250px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[550px] -translate-y-[8px]" priority />
                </div>
              </div>
  
           

              <div className="mt-8 pt-6 border-t-2 border-orange-200">
                <div className="grid grid-cols-2 gap-6 justify-center text-gray-700">
                  <a href="https://wa.me/918239711008" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaWhatsapp className="text-green-600 text-2xl" />
                    <span className="font-semibold text-lg text-gray-800">WhatsApp</span>
                  </a>

                  <a href="mailto:GSAabhiyan2027@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaEnvelope className="text-orange-600 text-2xl" />
                    <span className="font-semibold text-lg text-gray-800">Gmail</span>
                  </a>
                        <a href="https://www.facebook.com/people/%E0%A4%97%E0%A5%8C-%E0%A4%B8%E0%A4%AE%E0%A5%8D%E0%A4%AE%E0%A4%BE%E0%A4%A8-%E0%A4%86%E0%A4%B9%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%A8-%E0%A4%85%E0%A4%AD%E0%A4%BF%E0%A4%AF%E0%A4%BE%E0%A4%A8/pfbid0tctmKc4T96rbmjdFGmDc2U77YfHheskkXdMJvsSwsuHGnNkvJdE9pszznsNx9sQVl/?rdid=dRlhRvimy7lcWToS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14MgSqbK6e6%2F" className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaFacebook className="text-blue-700 text-2xl" />
                    <span className="font-semibold text-lg text-gray-800">Facebook</span>
                  </a>
                        <a href="https://www.instagram.com/gausmmaanaahvaan/#" className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaInstagram className=" text-pink-700 text-2xl" />
                    <span className="font-semibold text-lg text-gray-800">Instragram</span>
                  </a>
                        <a href="mailto:gausamman@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaTwitter className=" text-blue-600 text-2xl" />
                    <span className="font-semibold text-lg text-gray-800">X</span>
                  </a>
                        <a href="mailto:gausamman@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaSpotify className="text-green-600 text-2xl" />
                    <span className="font-semibold text-lg text-gray-800">Spotify</span>
                  </a>
                </div>
              </div>
            </div>

            
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-80">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="text-4xl md:text-6xl" style={{ transform: i >= 3 ? "scale(1) scaleX(-1)" : "scale(1)" }}>
              <Image src="/3.png" alt="Decorative Flower" width={100} height={100} />
            </div>
          ))}
        </div>
      </section>);
}