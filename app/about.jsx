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
              

    {/* 🪔 Main Content Card */}
    <div className="relative group">
      {/* Glow behind card */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-amber-200/20 to-orange-300/20 blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-500 rounded-3xl"></div>

      {/* Card content */}
      <div className="relative p-8 md:p-12 bg-pink-200 backdrop-blur-sm border border-yellow-300 rounded-3xl shadow-[0_10px_40px_rgba(255,183,0,0.15)] group-hover:shadow-[0_12px_45px_rgba(255,153,0,0.25)] transition-all duration-500">
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
                <div className="flex-shrink-0 mb-2">
                  <h2
                    id="objectives"
                    className="text-4xl md:text-5xl pb-1 pt-1 font-extrabold leading-tight
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
              
            
            </div>
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
   <div className="max-w-4xl mx-auto px-4 space-y-12 mt-5">
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
        <span className="text-teal-600 font-bold ">
          यह अभियान किसी संस्था अथवा संगठन के बैनर तले ना होकर केवल ईश्वर, गोमाता, और नंदी बाबा के सानिध्य में होगा।
        </span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0">②</span>
        <span className="text-orange-900 font-bold ">
         इस अभियान में कोई नेतृत्व कर्ता नहीं होगा  भारत के समस्त गो प्रेमी संत भक्त कार्यकर्ता समान रूप से कार्य करेंगे।
        </span>
      </li>
            <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0">③</span>
        <span className="text-teal-600 font-bold ">
          इस अभियान में किसी आचार्य, संत, महंत, नेता, अभिनेता, कार्यकर्ता का फ़ोटो, पोस्टर, बैनर, होल्डिंग पर नहीं लगेगा; केवल नंदी महाराज और गोमाता का ही चित्र मुद्रित होगा।
        </span>
      </li>


      <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0">④</span>
          <span className="text-orange-900 font-bold ">
          यह अभियान किसी भी राजनैतिक दल, संगठन, अथवा किसी भी राज्य अथवा केंद्र सरकार के विरुद्ध नहीं है। इस अभियान का उद्देश्य केवल यही है कि गोमाता को सेवा, सुरक्षा और सम्मान मिले।
        </span>
      </li>

      <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0">⑤</span>
        <span className="text-teal-600 font-bold ">
          यह अभियान पूर्ण रूपेण अहिंसक होगा। इस दौरान किसी भी राष्ट्रीय अथवा निजी संपत्ति को नुक़सान पहुँचाने वाले विचारकों को पूरी तरह दूर रखा जाएगा।
        </span>
      </li>

       <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0"> ⑥</span>
  <span className="text-orange-900 font-bold ">
             इस अभियान में कोई मंचीय उद्बोधन नहीं होगा, कोई माइक से भाषण नहीं होगा। गो प्रेमीजन - संकीर्तन, रैली और प्रार्थना पत्र के माध्यम से अपनी बात रखेंगे।
        </span>
      </li>
      <li className="flex items-start gap-3">
        <span className="text-amber-600 font-bold shrink-0"> ⑦</span>
        <span className="text-teal-600 font-bold ">
            इस अभियान हेतु किसी भी प्रकार का दान या चंदा स्वीकार नहीं किया जा रहा है। अगर कोई इस अभियान के नाम से दान या चंदा मांगे, तो तुरंत 8239711008 नंबर पर शिकायत करें।
        </span>
      </li>
    </ul>
    </div>
  </div>
 
      </div>
</section>



  );
};

export default About;
