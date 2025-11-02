"use client";
import React from "react";
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
    <section className="py-20 bg-yellow-50">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            सरकार से मुख्य आग्रह
          </h2>
          <div className="w-24 h-1 mx-auto bg-yellow-600 rounded-full"></div>
          <p className="text-xl text-gray-600">
            गौरक्षा संबंधित मुख्य आग्रह
          </p>
        </div>

        {/* Main Demands Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {mainDemands.map((demand, index) => (
            <div
              key={index}
              className="p-6 border-2 border-yellow-200 bg-white rounded-xl shadow-sm hover:shadow-md hover:border-yellow-400 transition duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg shrink-0">
                  {demand.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {demand.title}
                  </h3>
                  <p className="text-gray-600">{demand.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Demands */}
        <div className="p-8 bg-white border border-yellow-200 rounded-xl shadow-sm">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            अन्य मुख्य आग्रह
          </h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold shrink-0">•</span>
              <span>
                सभी राज्यों में निराश्रित गोवंश हेतु संचालित गौशालाओ को अनुदान प्राप्त हो
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold shrink-0">•</span>
              <span>गौ माता का दूध, दही, घी, गोवर, गोमूत्र को बढ़ावा मिले</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold shrink-0">•</span>
              <span>प्रत्येक ग्राम पंचायत पर गौशाला की स्थापना हो</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold shrink-0">•</span>
              <span>जिला स्तर पर पंचगव्य चिकित्सालय की स्थापना हो</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Objectives;
