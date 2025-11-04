"use client";
import React from "react";
import Image from "next/image";

const About = () => {
  return (
<section id="about" className="relative  py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
  {/* subtle glowing aura background */}
  <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/40 via-amber-100/20 to-orange-100/30 blur-3xl"></div>

  <div className="relative max-w-5xl mx-auto px-4 space-y-16">
    {/* 🌸 Section Header */}
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
                   अभियान का मुख्य उद्देश्य
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

    {/* 🪔 Main Content Card */}
    <div className="relative group">
      {/* Glow behind card */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-amber-200/20 to-orange-300/20 blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-500 rounded-3xl"></div>

      {/* Card content */}
      <div className="relative p-8 md:p-12 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-3xl shadow-[0_10px_40px_rgba(255,183,0,0.15)] group-hover:shadow-[0_12px_45px_rgba(255,153,0,0.25)] transition-all duration-500">
        <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-medium">
          केंद्र सरकार और देश की सभी राज्य सरकारों से राष्ट्र और भारतीय संस्कृति के हित में संविधान के दायरे में रहकर अहिंसक तरीके से
          गौ माता को{" "}
          <span className="font-bold text-amber-700">सेवा</span> (गौ माता को उचित अनुदान मिले),{" "}
          <span className="font-bold text-amber-700">सुरक्षा</span> (भारत से गौहत्या पूरी तरह समाप्त हो) और{" "}
          <span className="font-bold text-amber-700">सम्मान</span> (गौ माता राष्ट्रमाता बने)
          का मौलिक अधिकार प्रदान करवाना।
        </p>
      </div>
    </div>


  </div>
</section>

  );
};

export default About;
