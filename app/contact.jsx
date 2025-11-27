"use client";
import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-yellow-50">
    <div
  className="relative text-center mb-10 rounded-3xl p-10 
             bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-300 
             border-4 border-yellow-200 shadow-[0_10px_40px_-5px_rgba(255,140,0,0.5)]
             overflow-hidden"
>
  {/* Animated glow overlay */}
  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/20 to-transparent animate-pulse-slow"></div>

  {/* Heading */}
  <h3 className="relative text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-4 tracking-wide">
    संपर्क और जुड़ाव
  </h3>
<div className="w-40 h-2 mx-auto mb-8 bg-gradient-to-r from-orange-600 via-amber-400 to-orange-700 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.7)]"></div>

  {/* Description */}
<p className="relative text-lg md:text-xl text-orange-900/90 font-medium max-w-3xl mx-auto leading-relaxed mb-8">
  गो सेवा और गो रक्षा के माध्यम से होने वाले राष्ट्र रक्षा एवं संस्कृति रक्षा के इस 
  निष्काम और पवित्र अभियान में सम्मिलित होने के लिए{" "}
  <span className="font-semibold text-white bg-orange-600/70 px-2 py-1 rounded-lg shadow-sm">
    व्हाट्सएप नंबर 8239711008
  </span>{" "}
  पर अपनी विस्तृत जानकारी भेजें। अधिक जानकारी के लिए निम्न माध्यमों से संपर्क करें।
</p>


  {/* Contact Buttons */}
  <div className="relative flex flex-wrap justify-center gap-6">
    
    {/* Calling Number */}
    <a
      href="tel:9571712140"
      className="flex items-center gap-3 px-7 py-3.5 
                 bg-white/80 backdrop-blur-sm rounded-2xl 
                 border border-blue-200 hover:border-blue-400
                 hover:bg-blue-50 transition-all duration-300 
                 shadow-lg hover:shadow-blue-300/40"
    >
      <Phone className="text-blue-600 text-3xl" />
      <span className="font-bold text-lg text-blue-800">
        कॉलिंग नंबर: +91 9571712140
      </span>
    </a>

    {/* Missed Call Number */}
    <a
      href="tel:9067777323"
      className="flex items-center gap-3 px-7 py-3.5 
                 bg-white/80 backdrop-blur-sm rounded-2xl 
                 border border-red-200 hover:border-red-400
                 hover:bg-red-50 transition-all duration-300 
                 shadow-lg hover:shadow-red-300/40"
    >
      <Phone className="text-red-600 text-3xl" />
      <span className="font-bold text-lg text-red-800">
        मिस्ड कॉल नंबर: +91 9067777323
      </span>
    </a>
    
    {/* WhatsApp Contact */}
    <a
      href="https://wa.me/918239711008"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-7 py-3.5 
                 bg-white/80 backdrop-blur-sm rounded-2xl 
                 border border-green-200 hover:border-green-400
                 hover:bg-green-50 transition-all duration-300 
                 shadow-lg hover:shadow-green-300/40"
    >
      <FaWhatsapp className="text-green-600 text-3xl" />
      <span className="font-bold text-lg text-green-800">
        WhatsApp: +91 8239711008
      </span>
    </a>

    {/* Email Contact */}
    <a
      href="mailto:GSAabhiyan2027@gmail.com"
      className="flex items-center gap-3 px-7 py-3.5 
                 bg-white/80 backdrop-blur-sm rounded-2xl 
                 border border-orange-200 hover:border-orange-400
                 hover:bg-orange-50 transition-all duration-300 
                 shadow-lg hover:shadow-orange-300/40"
    >
      <FaEnvelope className="text-orange-600 text-3xl" />
      <span className="font-bold text-lg text-orange-800">
        GSAabhiyan2027@gmail.com
      </span>
    </a>
  </div>

  {/* Subtle background accent */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-yellow-100/20 via-orange-200/10 to-transparent blur-2xl"></div>
</div>

     
         
 <div className="max-w-4xl mx-auto mt-8 text-gray-700 text-center font-extrabold leading-relaxed px-4">
     <div className="bg-orange-400 border-4 border-yellow-300 text-white rounded-2xl p-6 shadow-2xl shadow-orange-900/50 my-8
                 relative overflow-hidden
                 before:content-[''] before:absolute before:inset-0 before:bg-yellow-300 before:opacity-20 before:animate-pulse-strong 
                 before:rounded-2xl">
               <h3 className="relative text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-4 tracking-wide">
आपसे विशेष आग्रह
  </h3>

<div className="w-40 h-2 mx-auto mb-8 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.7)]"></div>




        <p className="mb-4">
          इस अभियान में सहयोग हेतु आप भी इस प्रकार के पत्रक छपवाकर वितरित कर सकते हैं। 
          ध्यान रखें — इसमें <span className="font-semibold text-red-600">“सौजन्य से”</span>, 
          अपना नाम, संस्था या संगठन का नाम लिखे बिना यथारूप पर्चा छपवाकर अपने क्षेत्र में वितरित करें 
          एवं गौसेवा में सहयोग करें।
        </p>
        <p className="mb-4">
          छपवाने के लिए सीडीआर फाइल या पीडीएफ फाइल हेतु ऊपर दिए गए 
          <span className="font-semibold text-red-600"> व्हाट्सएप नंबर </span> 
          पर संपर्क करें।
        </p>
        </div>
    {/* HIGHLIGHTED NO DONATION BOX START */}
    <div className="bg-red-800 border-4 border-yellow-300 rounded-2xl p-6 shadow-2xl shadow-red-900/50 my-8 
                    relative overflow-hidden
                    before:content-[''] before:absolute before:inset-0 before:bg-yellow-300 before:opacity-20 before:animate-pulse-strong 
                    before:rounded-2xl">
      <div className="relative z-10 flex items-center justify-center gap-3 mb-4">
        <span className="text-5xl animate-bounce-slow">🚨</span>
        <h3 className="text-3xl md:text-4xl font-extrabold text-yellow-50 uppercase tracking-wide">
          NO Donation | कोई दान नहीं
        </h3>
        
        <span className="text-5xl animate-bounce-slow">🚨</span>
      </div>
      
      <p className="relative z-10 text-yellow-100 font-bold text-xl md:text-2xl text-center leading-relaxed mb-4">
        इस अभियान हेतु किसी भी प्रकार का दान या चंदा स्वीकार नहीं किया जा रहा है।
      </p>
      
      <p className="relative z-10 text-white font-semibold text-lg md:text-xl text-center mt-4">
        अगर कोई इस अभियान के नाम से दान या चंदा मांगे, तो तुरंत
        <a 
          href="tel:8239711008" 
          className="inline-flex items-center gap-2 mx-2 px-5 py-2 bg-green-500 text-white rounded-lg 
                     hover:bg-green-600 transition-all font-bold shadow-lg hover:shadow-xl text-xl 
                     ring-2 ring-green-400 animate-pulse-fast"
        >
          📞 8239711008
        </a>
        नंबर पर शिकायत करें।
      </p>
      
      <div className="relative z-10 mt-6 text-center">
        <p className="text-yellow-300 font-bold text-lg md:text-xl italic">
          ⚡ सावधान रहें | किसी को भी पैसे न दें ⚡
        </p>
      </div>
    </div>
    {/* HIGHLIGHTED NO DONATION BOX END */}
      </div>

    </section>
  );
};

export default Contact;