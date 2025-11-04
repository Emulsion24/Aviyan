"use client";
import React from "react";
import Image from "next/image";
import { Shield, Heart, Award, Leaf } from "lucide-react";

const Objectives = () => {
  const mainDemands = [
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: "गौ माता को राष्ट्र माता",
      description: "गौ माता को राष्ट्र माता के पद पर विराजमान करना",
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-600" />,
      title: "केंद्रीय कानून",
      description: "गो रक्षा हेतु केंद्रीय कानून का निर्माण",
    },
    {
      icon: <Heart className="w-8 h-8 text-yellow-600" />,
      title: "गौ हत्या समाप्ति",
      description: "भारतवर्ष में गौ हत्या पूरी तरह समाप्त हो",
    },
    {
      icon: <Leaf className="w-8 h-8 text-yellow-600" />,
      title: "गोवर गोमूत्र उपयोग",
      description: "गोवर, गोमूत्र के वृहद अनुसंधान और उपयोग को बढ़ावा",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 overflow-hidden">
      {/* soft glowing aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-yellow-100/20 to-orange-100/30 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 space-y-16">
        {/* 🌸 Header Section */}
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
                सरकार से मुख्य आग्रह
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

          {/* Subheading */}
          <p className="mt-4 text-xl md:text-2xl text-gray-700 font-medium">
            गौरक्षा संबंधित मुख्य आग्रह
          </p>
        </div>

        {/* 🪔 Main Demands Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {mainDemands.map((demand, index) => (
            <div
              key={index}
              className="relative group p-8 border border-yellow-200 bg-white/90 backdrop-blur-sm rounded-2xl 
                         shadow-[0_10px_25px_rgba(255,183,0,0.12)] hover:shadow-[0_12px_40px_rgba(255,153,0,0.2)]
                         hover:border-amber-400 transition-all duration-500"
            >
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-amber-100/10 to-orange-200/20 
                              opacity-70 rounded-2xl blur-xl group-hover:opacity-90 transition-all duration-500"></div>

              <div className="relative flex items-start gap-5">
                <div className="p-3 bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-50 
                                rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {demand.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {demand.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {demand.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🌿 Other Demands */}
        <div className="relative p-10 bg-white/90 border border-yellow-200 rounded-2xl shadow-[0_10px_25px_rgba(255,183,0,0.15)] hover:shadow-[0_12px_40px_rgba(255,153,0,0.25)] transition-all duration-500">
          {/* glowing background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/15 via-amber-200/10 to-orange-200/20 blur-xl opacity-70 rounded-2xl"></div>

          <div className="relative text-center space-y-6">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
              अन्य मुख्य आग्रह
            </h3>

            <ul className="max-w-3xl mx-auto space-y-4 text-lg text-gray-800 text-left">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold shrink-0">•</span>
                <span>सभी राज्यों में निराश्रित गोवंश हेतु संचालित गौशालाओं को अनुदान प्राप्त हो।</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold shrink-0">•</span>
                <span>गौ माता का दूध, दही, घी, गोवर, गोमूत्र को बढ़ावा मिले।</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold shrink-0">•</span>
                <span>प्रत्येक ग्राम पंचायत पर गौशाला की स्थापना हो।</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold shrink-0">•</span>
                <span>जिला स्तर पर पंचगव्य चिकित्सालय की स्थापना हो।</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Objectives;