"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Shield, Heart, Award, Leaf, BookOpen, Users, Stethoscope, BookA, BookOpenCheck } from "lucide-react";
import { GiIndiaGate, GiThrust, GiWorld } from "react-icons/gi";
import { SiIndiansuperleague, SiTrustedshops } from "react-icons/si";
import { PiCow } from "react-icons/pi";
import { FaCow } from "react-icons/fa6";
import { RiGovernmentFill } from "react-icons/ri";

const Objectives = () => {
  const [showAll, setShowAll] = useState(false);

  const mainDemands = [
    {
      icon: <RiGovernmentFill className="w-8 h-8 text-yellow-600" />,
      title: "गौ माता को राष्ट्र माता के पद पर विराजमान करे \n(गौ माता को सम्मान मिले)",

    },
    {
      icon: <BookOpenCheck className="w-8 h-8 text-yellow-600" />,
      title: "गो रक्षा हेतु केंद्रीय कानून बने ",

    },
    {
      icon: <GiIndiaGate className="w-8 h-8 text-yellow-600" />,
      title: "भारतवर्ष में गौ हत्या पूरी तरह समाप्त हो ",

    },
  ];

  const allDemands = [
    {
      category: "गोगव्य महत्व संबंधित मुख्य आग्रह",
      icon: <Leaf className="w-6 h-6" />,
      demands: [
        "गोबर, गोमूत्र को लेकर के बृहद अनुसंधान और विश्वविद्यालय बने जिससे गोबर, गोमूत्र का कृषि और अन्य उपयोग में महत्व बढ़े।",
        "गौ माता का दूध, दही, घी, गोबर, गोमूत्र को बढ़ावा मिले, उस संदर्भ में शासन उचित नीतियां बनाए।",
        "गोबर, गोमूत्र से जुड़े प्रसंस्करण यूनिट को बढ़ावा दिया जाए और नवीन अनुसंधान हो।",
        "रासायनिक कृषि को नियंत्रित कर गो आधारित कृषि को बढ़ावा दिया जाए।",
        "सरकारी भवनों और चिकित्सालय में सामान्य पेंट की जगह गोबर पेंट और फिनायल की जगह गौनाईल उपयोग अनिवार्य किया जाए।",
        "आयुर्वेदिक चिकित्सालय में पंचगव्य औषधियों का निःशुल्क वितरण किया जाए।",
        "गोबर गोमूत्र से जुड़े उद्यम लगाने के लिए उद्यमियों को प्रेरित करें।",
        "सरकारी नियंत्रण में चल रहे मंदिरों में भोग, आरती, पूजा और प्रसाद में देशी गोमाता का दूध, दही, घी का उपयोग अनिवार्य किया जाए।",
        "बड़े शॉपिंग मॉल में गो आधारित कृषि उत्पाद और देशी गो से संबंधित डेयरी और गोबर गोमुत्र उत्पाद विक्रय हेतु एक काउंटर की अनिवार्यता लागू की जाए।",
        "बैल आधारित कृषि करने वाले बैल धारक किसानों को विशेष आर्थिक सहायता प्रदान की जाए।"
      ]
    },
    {
      category: "अनुदान एवं चारा संबंधित मुख्य आग्रह",
      icon: <Heart className="w-6 h-6" />,
      demands: [
        "सभी राज्यों में निराश्रित गोवंश हेतु संचालित गौशालाओं को अनुदान प्राप्त हो, जिससे निराश्रित गोवंश की उचित सेवा हो।",
        "चारे की उचित कीमत तय की जाए, चारे के अवैध भंडारण पर रोक लगे जिससे माफिया पर लगाम लगे।",
        "घास का उपयोग केवल गो आहार और पशु आहार के रूप में हो, अन्य उपयोग न हो, चारे को फैक्ट्रियों में जलाने पर प्रतिबंध लगे।",
        "देश भर में आरक्षित गोचर भूमि को अतिक्रमण से मुक्त करने हेतु कार्यवाही हो गोचर विकास बोर्ड की स्थापना हो गोचर भूमि का उपयोग केवल गोशाला संचालन और गो चारण हेतु उपयोग ली जाए।"
      ]
    },
    {
      category: "गोशाला संबंधित मुख्य आग्रह",
      icon: <Users className="w-6 h-6" />,
      demands: [
        "प्रत्येक ग्राम पंचायत पर निराश्रित नर गोवंश के लिए नंदीशाला की स्थापना हो।",
        "गौशालाओं को मनरेगा से जोड़ा जाए, ताकि गौशाला में काम करने वाले लोगों को 100 दिन का ग्वाल वेतन मनरेगा से प्राप्त हो एवं मनरेगा योजना के तहत गौशालाओं में निर्माण कार्य हो।",
        "सम्पूर्ण देश में गोवंश संख्या के आधार पर गौशालाओं को एक निश्चित बिजली यूनिट निःशुल्क आवंटित हो अथवा बिजली बिल में एक निश्चित प्रतिशत छूट मिले।",
        "अधिक दान प्राप्त करने वाले सरकारी नियंत्रण में चल रहे मंदिरों के साथ गोशाला संचालन अनिवार्य किया जाये।",
        "महानगरों में बड़े आवासीय क्षेत्र में गोशाला स्थापित करने हेतु बिल्डर को पृथक स्थान छोड़ने के निर्देश जारी किए जाए ताकि वहाँ रहने वाले गोप्रेमियों को गो दर्शन और गो ग्रास का लाभ प्राप्त हो एवं निराश्रित गोवंश को आश्रय प्राप्त हो सके।"
      ]
    },
    {
      category: "कानून संबंधित मुख्य आग्रह",
      icon: <Shield className="w-6 h-6" />,
      demands: [
        "गौ हत्यारों, गो तस्करी में लिप्त अपराधियों के लिए आजीवन कठोर कारावास जैसी सजा का प्रावधान हो।",
        "गो तस्करी में उपयोग आने वाले वाहनों की जब्ती होने पर जमानत न हो व सदा सदा के लिए राजसाद हो और उन्हें नीलाम किया जाए अथवा गौशालाओं को उपयोग हेतु सौंप दिया जाए।",
        "कंपनियों के CSR फंड में से एक निश्चित राशि गो सेवा से जुड़े कार्यों हेतु खर्च करने की अनिवार्यता लागू हो।",
        "सिंगल यूज़ पॉलीथिन कैरी बैग के उपयोग पर शक्तिपूर्वक प्रतिबंध लगाया जाए अथवा उसके उपयोग के पश्चात विधिवत निस्तारण किया जाये।",
        "पशु मेलों के नाम पर हो रही अवैध गो तस्करी पर अंकुश लगाने हेतु केंद्रीय कानून बने।"
      ]
    },
    {
      category: "गो चिकित्सालय एवं विद्यालय से संबंधित मुख्य आग्रह",
      icon: <Stethoscope className="w-6 h-6" />,
      demands: [
        "जिला स्तर पर पृथक से पंचगव्य चिकित्सालयों की स्थापना हो।",
        "विद्यार्थियों को दिए जाने वाले मिड डे मील में देशी गाय माता के ताजा दूध अथवा देशी गाय माता के दूध का पाउडर को शामिल किया जाये।",
        "संस्कृत महाविद्यालय में गोसेवा प्रकल्प अनिवार्य किए जाये।",
        "सरकारी और गैर सरकारी विद्यालयों और महाविद्यालयों में देशी गाय के आर्थिक वैज्ञानिक और धार्मिक महत्व के विषय अनिवार्य किए जाए।",
        "राजमार्गों पर होने वाली गो दुर्घटनाओं पर नियंत्रण के उपाय किए जाए, प्रत्येक 50 किमी अथवा प्रत्येक टोल प्लाजा पर घायल गोवंश को तत्काल उपचार मुहैया कराने हेतु गो वाहिनी एम्बुलेंस और गो चिकित्सा की व्यवस्था हो।"
      ]
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 overflow-hidden">
      {/* Soft glowing aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-yellow-100/20 to-orange-100/30 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 space-y-16">
        {/* 🌸 Header Section */}
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-10 flex-nowrap text-center">
            {/* Left ornament */}
            <div className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center animate-bounce drop-shadow-[0_4px_8px_rgba(255,166,0,0.4)] flex-shrink-0">
              <Image
                src="/3.png"
                alt="left decoration"
                width={64}
                height={64}
                className="w-8 sm:w-10 md:w-14 opacity-95 drop-shadow-[0_4px_8px_rgba(255,166,0,0.4)]"
              />
            </div>

            {/* Main Heading */}
            <div className="flex-shrink text-center">
              <h2
                id="objectives"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight
        bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent
        tracking-wide drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)]
        pb-1 pt-1"
              >
                भारत सरकार से गो रक्षा सम्बंधित मुख्य आग्रह
              </h2>
            </div>

            {/* Right ornament */}
            <div
              className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-gradient-to-br from-yellow-500 to-amber-400 rounded-full flex items-center justify-center animate-bounce drop-shadow-[0_4px_8px_rgba(255,166,0,0.4)] flex-shrink-0"
              style={{ animationDelay: '1s' }}
            >
              <Image
                src="/2.png"
                alt="right decoration"
                width={64}
                height={64}
                className="w-8 sm:w-10 md:w-14 opacity-95 drop-shadow-[0_4px_8px_rgba(255,166,0,0.4)]"
              />
            </div>
          </div>



          {/* Underline */}
          <div className="w-28 h-1.5 mx-auto mt-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full shadow-md"></div>
        </div>

        {/* 🪔 Main 3 Demands Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {mainDemands.map((demand, index) => (
            <div
              key={index}
              className="relative group p-8 border-2 border-yellow-200 bg-white/90 backdrop-blur-sm rounded-2xl 
                         shadow-[0_10px_25px_rgba(255,183,0,0.12)] hover:shadow-[0_12px_40px_rgba(255,153,0,0.2)]
                         hover:border-amber-400 transition-all duration-500 hover:scale-105"
            >
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-amber-100/10 to-orange-200/20 
                              opacity-70 rounded-2xl blur-xl group-hover:opacity-90 transition-all duration-500"></div>

              <div className="relative flex flex-col items-center text-center gap-5">
                <div className="p-4 bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-50 
                                rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {demand.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl whitespace-pre-line font-extrabold text-red-600">
                    {demand.title}
                  </h3>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔽 UPDATED VIEW MORE SECTION: Long & Expanded Background 🔽 */}
        <div className="relative w-full flex items-center justify-center py-24 my-8">
          
          {/* 1. Long Wide Horizontal Glow (The Expanded Background) */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-full h-32 bg-gradient-to-r from-transparent via-amber-100/60 to-transparent blur-3xl"></div>
          </div>

          {/* 2. Sharp Decorative Lines (To give it structure) */}
          <div className="absolute left-0 w-full flex items-center justify-center opacity-60">
             <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>

          {/* 3. The Original Button (Unchanged as requested) */}
          <div className="relative group z-10">
            {/* The Outer Glow (Blur effect behind the button) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

            {/* The Button Itself */}
            <button
              onClick={() => setShowAll(!showAll)}
              className="relative px-8 py-4 bg-white ring-1 ring-gray-900/5 rounded-full leading-none flex items-center divide-x divide-gray-600 shadow-xl"
            >
              <span className="flex items-center space-x-5">
                <span className="pr-6 text-amber-600 font-bold text-lg">
                  {showAll ? "कम देखें" : "अन्य सभी आग्रह विस्तार से देखे"}
                </span>
              </span>
              <span className={`pl-6 text-amber-600 transition-transform duration-300 ${showAll ? '-rotate-180' : ''}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </button>
          </div>
        </div>
        {/* 🔼 END UPDATED SECTION 🔼 */}


        {/* 🌿 Detailed Demands - Expandable */}
        {showAll && (
          <div className="space-y-8 opacity-0 animate-fadeIn mb-15">
            {allDemands.map((section, idx) => (
              <div
                key={idx}
                className="relative p-8 bg-white/90 border-2 border-yellow-200 rounded-2xl 
                           shadow-[0_10px_25px_rgba(255,183,0,0.15)] hover:shadow-[0_12px_40px_rgba(255,153,0,0.25)] 
                           transition-all duration-500"
              >
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/15 via-amber-200/10 to-orange-200/20 blur-xl opacity-70 rounded-2xl"></div>

                <div className="relative space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg text-amber-600">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
                      {section.category}
                    </h3>
                  </div>

                  <ul className="space-y-4 text-base text-gray-800">
                    {section.demands.map((demand, demandIdx) => (
                      <li key={demandIdx} className="flex items-start gap-3 group">
                        <span className="text-amber-600 font-bold shrink-0 mt-1 text-xl group-hover:scale-125 transition-transform duration-200">
                          •
                        </span>
                        <span className="leading-relaxed">{demand}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          </div>


        )}

      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-80">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="text-4xl md:text-6xl" style={{ transform: i >= 3 ? "scale(1) scaleX(-1)" : "scale(1)" }}>
            <Image src="/3.png" alt="Decorative Flower" width={100} height={100} />
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}} />
    </section>
  );
};

export default Objectives;