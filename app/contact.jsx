"use client";
import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

const Contact = () => {
  return (
    <section id="contact"className="py-20 bg-yellow-50">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Section Header */}
       

        {/* Important Info */}
       <div className="relative p-10 bg-white/90 border border-yellow-200 rounded-2xl shadow-[0_10px_25px_rgba(255,183,0,0.15)] hover:shadow-[0_12px_40px_rgba(255,153,0,0.25)] transition-all duration-500">
  {/* glowing background */}
  <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/15 via-amber-200/10 to-orange-200/20 blur-xl opacity-70 rounded-2xl"></div>

  <div className="relative text-center space-y-8">
    {/* Title */}
    <h3 className="text-3xl pt-1 pb-1 md:text-4xl font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
      अत्यंत महत्वपूर्ण स्मरण बिंदु
    </h3>

    {/* Content List */}
    <ul className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl text-gray-800 text-left leading-relaxed">
      <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0">①</span>
        <span>
          यह अभियान किसी संस्था अथवा संगठन के बैनर तले ना होकर केवल ईश्वर, गोमाता, और नंदी बाबा के सानिध्य में होगा।
        </span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0">②</span>
        <span>
          इस अभियान में किसी आचार्य, संत, महंत, नेता, अभिनेता, कार्यकर्ता का फ़ोटो, पोस्टर, बैनर, होल्डिंग पर नहीं लगेगा; केवल नंदी महाराज और गोमाता का ही चित्र मुद्रित होगा।
        </span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0">③</span>
        <span>
          यह अभियान किसी भी राजनैतिक दल, संगठन, अथवा किसी भी राज्य अथवा केंद्र सरकार के विरुद्ध नहीं है। इस अभियान का उद्देश्य केवल यही है कि गोमाता को सेवा, सुरक्षा और सम्मान मिले।
        </span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0">④</span>
        <span>
          यह अभियान पूर्ण रूपेण अहिंसक होगा। इस दौरान किसी भी राष्ट्रीय अथवा निजी संपत्ति को नुक़सान पहुँचाने वाले विचारकों को पूरी तरह दूर रखा जाएगा।
        </span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0">⑤</span>
        <span>
          इस अभियान में कोई मंचीय उद्बोधन नहीं होगा, कोई माइक से भाषण नहीं होगा। गो प्रेमीजन अपनी वात, संकीर्तन, रैली और प्रार्थना पत्र के माध्यम से अपनी बात रखेंगे।
        </span>
      </li>
    </ul>
  </div>
</div>
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

      </div>
    </section>
  );
};

export default Contact;
