"use client";
import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-yellow-50">
     <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-700 mb-2">
          संपर्क और जुड़ाव
        </h3>
        <p className="text-gray-700 max-w-3xl mx-auto px-4 leading-relaxed">
          गो सेवा और गो रक्षा के माध्यम से होने वाले राष्ट्र रक्षा एवं संस्कृति रक्षा के इस 
          निष्काम और पवित्र अभियान में सम्मिलित होने के लिए 
          <span className="font-semibold text-orange-600"> व्हाट्सएप नंबर 8239711008 </span> 
          पर अपनी विस्तृत जानकारी भेजें।  
          अधिक जानकारी के लिए निम्न माध्यमों से संपर्क करें।
        </p>
      </div>
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
                href="mailto:GSAabhiyan2027@gmail.com"
                className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FaEnvelope className="text-orange-600 text-2xl" />
                <span className="font-semibold text-lg text-gray-800">
                  GSAabhiyan2027@gmail.com
                </span>
              </a>
            </div>
 <div className="max-w-4xl mx-auto mt-8 text-gray-700 text-center leading-relaxed px-4">
        <p className="mb-4">
          इस अभियान में सहयोग हेतु आप भी इस प्रकार के पत्रक छपवाकर वितरित कर सकते हैं। 
          ध्यान रखें — इसमें <span className="font-semibold text-orange-600">“सौजन्य से”</span>, 
          अपना नाम, संस्था या संगठन का नाम लिखे बिना यथारूप पर्चा छपवाकर अपने क्षेत्र में वितरित करें 
          एवं गौसेवा में सहयोग करें।
        </p>
        <p className="mb-4">
          छपवाने के लिए सीडीआर फाइल या पीडीएफ फाइल हेतु ऊपर दिए गए 
          <span className="font-semibold text-green-600"> व्हाट्सएप नंबर </span> 
          पर संपर्क करें।
        </p>
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