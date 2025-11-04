"use client";
import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";

const Contact = () => {
  return (
    <section id="contact"className="py-20 bg-yellow-50">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Section Header */}
        <div className="relative text-center">
                 <div className="flex items-center justify-center gap-6 md:gap-8">
                   {/* Left ornament */}
                   <Image
                     src="/3.png"
                     alt="left decoration"
                     width={64}
                     height={64}
                     className="w-12 md:w-16 opacity-95 animate-bounce drop-shadow-[0_4px_8px_rgba(255,166,0,0.4)]"
                   />
       
                   {/* Main Heading */}
                   <div className="flex-shrink-0">
                     <h2
                       id="objectives"
                       className="text-4xl md:text-5xl font-extrabold leading-tight
                         bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent
                         tracking-wide drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)]"
                     >
                     संपर्क करे
                     </h2>
                   </div>
       
                   {/* Right ornament */}
                   <Image
                     src="/2.png"
                     alt="right decoration"
                     width={64}
                     height={64}
                     className="w-12 md:w-16 opacity-95 animate-bounce drop-shadow-[0_4px_8px_rgba(255,166,0,0.4)]"
                     style={{ animationDelay: '1s' }}
                   />
                 </div>
       
                 {/* Underline */}
                 <div className="w-28 h-1.5 mx-auto mt-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full shadow-md"></div>
       
                
               </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Phone Card */}
          <div className="p-8 text-center bg-white border-2 border-yellow-200 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-yellow-100 rounded-full">
                <Phone className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  फ़ोन नंबर
                </h3>
                <a
                  href="tel:8239711108"
                  className="text-2xl font-semibold text-yellow-700 hover:underline"
                >
                  8239711108
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="p-8 text-center bg-white border-2 border-yellow-200 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-green-100 rounded-full">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  WhatsApp
                </h3>
                <a
                  href="https://wa.me/918239711108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-semibold text-green-700 hover:underline"
                >
                  8239711108
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="p-8 bg-white border border-yellow-200 rounded-xl shadow-sm">
          <div className="space-y-4 text-center">
            <h3 className="text-2xl md:text-3xl mt-1.5 font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-3">
              महत्वपूर्ण सूचना
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="text-lg">
                यह अभियान पूर्णतः अहिंसक होगा और किसी भी राष्ट्रीय अथवा किसी भी व्यक्ति या संस्था का विरोध नहीं करेगा।
              </p>
              <p className="text-lg font-semibold text-yellow-700">
                इस अभियान हेतु किसी भी प्रकार का दान नहीं लिया जाता है।
              </p>
              <p>
                यदि कोई इस अभियान के नाम में दान मांगे तो{" "}
                <span className="font-semibold text-yellow-700">
                  8239711108
                </span>{" "}
                नंबर पर शिकायत करें।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
