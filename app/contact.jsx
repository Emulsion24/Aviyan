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
                href="mailto:gausamman@gmail.com"
                className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FaEnvelope className="text-orange-600 text-2xl" />
                <span className="font-semibold text-lg text-gray-800">
                  gausamman@gmail.com
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
        <p className="text-red-600 font-semibold">
          ⚠️ इस अभियान हेतु किसी भी प्रकार का दान या चंदा स्वीकार नहीं किया जा रहा है।  
          अगर कोई इस अभियान के नाम से दान या चंदा मांगे, तो तुरंत  
          <span className="text-green-700"> 8239711008 </span> नंबर पर शिकायत करें।
        </p>
      </div>

    </section>
  );
};

export default Contact;
