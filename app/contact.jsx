"use client";
import React from "react";
import { Phone, MessageCircle } from "lucide-react";
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

      </div>
    </section>
  );
};

export default Contact;
