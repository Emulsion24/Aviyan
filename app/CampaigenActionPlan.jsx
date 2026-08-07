"use client";
import React, { useState } from "react";
import { Calendar, Users, MapPin, Flag, FileText, Bell } from "lucide-react";

const CampaignActionPlan = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);

  const phases = [
    {
      id: 1,
      title: "प्रथम चरण - प्रचार प्रसार",
      date: "दिसम्बर 2025 - अप्रैल 2026",
      actionDate: "27 अप्रैल 2026 (सोमवार) - प्रातः 11 बजे",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      description: " 28 राज्य, 8  केंद्र शाषित प्रदेश, 780 जिले और 5000 तहसीलो तक 5 माह में गहन प्रचार प्रसार एवं जनसम्पर्क",
      action: "प्रत्येक तहसील क्षेत्र के 1000 गो भक्तों एवं संतों के साथ मिलकर उस जिले में जितने तहसील मुख्यालय है, वहाँ जाकर तहसीलदार अथवा SDM को, माननीय राष्ट्रपति महोदया, भारत के प्रधानमंत्री महोदय, राज्य के माननीय राज्यपाल महोदय, राज्य के मुख्यमंत्री महोदय के नाम प्रार्थना पत्र देंगे।",
      details: [
        "प्रत्येक जिला एवं तहसील मुख्यालय से 3 गो भक्त और 3 गो संत",
        "1 गो भक्त और 1 संत प्रमुख रहेंगे",
        "2 गो भक्त और 2 संत सहयोगी के रूप में",
        "गहन प्रचार प्रसार एवं जनसंपर्क"
      ]
    },
    {
      id: 2,
      title: "द्वितीय चरण - जिला स्तर",
      date: "मई - जुलाई 2026",
      actionDate: "27 जुलाई 2026 (सोमवार) - प्रातः 11 बजे",
      icon: <MapPin className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      description: "3 माह तक सरकार से संवाद करते हुए प्रतीक्षा करेंगे तथा राज्य सरकार और केंद्र सरकार की ओर से आशा अनुकूल उत्तर और परिणाम नहीं मिलने पर  ",
      action: "देश के प्रत्येक जिले के 5000 गौ भक्तों एवं संतों के साथ अपने-अपने जिला मुख्यालय पर जाकर जिला कलक्टर को, माननीय राष्ट्रपति महोदया, भारत के प्रधानमंत्री महोदय, राज्य के माननीय राज्यपाल महोदय, राज्य के मुख्यमंत्री महोदय के नाम प्रार्थना पत्र देंगे।",
      details: [
        
      ]
    },
    {
      id: 3,
      title: "तृतीय चरण - राज्य स्तर",
      date: "अगस्त - अक्टूबर 2026",
      actionDate: "27 अक्टूबर 2026 (मंगलवार) - प्रातः 11 बजे",
      icon: <Flag className="w-6 h-6" />,
      color: "from-orange-500 to-amber-500",
      bgColor: "from-orange-50 to-amber-50",
      description: "3 माह (अगस्त, सितम्बर, अक्टूबर) सरकार से संवाद सहित पुनः प्रतीक्षा के पश्चात्र राज्य सरकार और केंद्र सरकार की ओर से आशा अनुकूल उत्तर और परिणाम नहीं मिलने पर ",
      action: "सभी जिला एवं तहसील के संत अपने- अपने जिले के सभी गो भक्तों को लेकर अपने प्रदेश की राजधानी में पहुंचकर, मुख्यमंत्री जी एंव राज्यपाल महोदय के माध्यम से माननीय राष्ट्रपति महोदया जी और भारत के प्रधानमंत्री जी के नाम प्रार्थना पत्र देंगे।",
      details: [
        "सभी जिला एवं तहसील के संत",
        "अपने-अपने जिले के सभी गो भक्तों के साथ",
        "प्रदेश की राजधानी में पहुंचकर",
        "मुख्यमंत्री एवं राज्यपाल के माध्यम से प्रार्थना पत्र"
      ]
    },
    {
      id: 4,
      title: "चतुर्थ चरण - राष्ट्रीय राजधानी",
      date: "नवम्बर 2026 - फरवरी 2027",
      actionDate: "27 फरवरी 2027 (शनिवार) ",
      icon: <Bell className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      description: "3 माह संवाद सहित प्रतीक्षा करने पर राज्य सरकार और केंद्र सरकार की ओर से आशा अनुकूल उत्तर और परिणाम नहीं मिलने पर, लाल किले की प्राचीर से सकारात्मक उद्बोधन नहीं मिलने पर सभी राज्यों के 5000 तहसील और 780 जिलो के नियुक्त किए संत एवं गो भक्त एक महीने तैयारी करके अधिकाधिक गो प्रेमियों को लेकर ",
      action: "राष्ट्र की राजधानी दिल्ली पहुंचकर शांतिपूर्ण तरीके से संकीर्तन करते हुए गौ सेवा गौ सुरक्षा एवं गौ सम्मान के लिए केंद्र सरकार से नियमित पत्र लेखन के माध्यम से आह्वान करेंगे जो साढ़े पाँच माह अर्थात् 15 अगस्त 2027 (रविवार) तक चलेगा।",
      details: [
        "एक समय में 30 जिले बैठेगे,सात दिन व्यतीत होने के बाद नए ३० जिलो के गो भक्त आएँगे,780 जिलो से ७/७ दिन ये क्रम चलेगा तो साढ़े 5 माह तक 30000 गो भक्तों की संख्या बनी रहेगी लगातार",
        "3 लाख पत्र नित्य प्रधान मंत्री जी के कार्यालय जाएँगे",
      
      ]
    },
    /*{
      id: 5,
      title: "पंचम चरण -  कठोर सत्याग्रह",
      date: "27 फ़रवरी - 15 अगस्त 2027 ",
      actionDate: "16 अगस्त 2027 (सोमवार)- कठोर सत्याग्रह",
      icon: <FileText className="w-6 h-6" />,
      color: "from-red-500 to-rose-500",
      bgColor: "from-red-50 to-rose-50",
      description: "यदि 15 अगस्त 2027 तक समाधान न हो, तो 16 अगस्त 2027 से संतों और गो-भक्तों द्वारा 'नौ-दिवसीय क्रमिक उपवास' (कठोर सत्याग्रह) प्रारंभ किया जाएगा. ",
      action: "यह क्रम तब तक निरंतर चलेगा जब तक गो-वंश हित में कार्य सिद्ध नहीं हो जाता.",
      details: [
       "यदि 15 अगस्त 2027 तक समाधान न हो, तो 16 अगस्त 2027 से संतों और गो-भक्तों द्वारा 'नौ-दिवसीय क्रमिक उपवास' (कठोर सत्याग्रह) प्रारंभ किया जाएगा."
      ]
    }*/
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg">
            <span className="text-white font-bold text-sm tracking-wide">कार्य योजना</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl pt-1 pb-1 font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            गो सम्मान आह्वान अभियान
          </h2>
          
          <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full shadow-md"></div>
          
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            चरणबद्ध कार्य योजना - दिसम्बर 2025 से आगे
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 via-orange-500 via-purple-500 to-red-500 transform md:-translate-x-1/2"></div>

          {/* Phases */}
          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${phase.color} shadow-lg flex items-center justify-center text-white`}>
                    {phase.icon}
                  </div>
                </div>

                {/* Content card */}
                <div className={`flex-1 ml-24 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                    className={`relative group cursor-pointer p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-transparent hover:border-orange-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105`}
                  >
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${phase.bgColor} opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-500`}></div>

                    <div className="relative space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className={`text-2xl font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                            {phase.title}
                          </h3>
                         
                          <p className="text-gray-600 font-medium mt-1">{phase.date}</p>
                           <p className="text-black-700 font-bold font-medium">{phase.description}</p>
                        </div>
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${phase.bgColor}`}>
                          <Calendar className="w-5 h-5 text-gray-700" />
                        </div>
                      </div>

                      {/* Action Date */}
                      <div className={`inline-block px-4 py-2 bg-gradient-to-r ${phase.color} rounded-lg shadow-md`}>
                        <p className="text-white font-bold text-sm">{phase.actionDate}</p>
                      </div>

                      {/* Description */}
       
                      
                      {/* Action */}
                      <div className="p-4 bg-amber-50 border-l-4 border-orange-500 rounded-r-lg">
                        <p className="text-gray-800 font-semibold">
                          📋 {phase.action}
                        </p>
                      </div>

                      {/* Expandable details */}
                      {expandedPhase === phase.id && (
                        <div className="pt-4 mt-4 border-t border-gray-200 space-y-2 animate-fadeIn">
                          <p className="font-bold text-gray-700 mb-3">विस्तृत जानकारी:</p>
                          {phase.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-gray-700">
                              <span className="text-orange-500 font-bold mt-1">✓</span>
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Expand button */}
                      <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-2 mt-2">
                        {expandedPhase === phase.id ? '▲ कम देखें' : '▼ विस्तार से देखें'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="relative mt-16 p-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-orange-100/50 rounded-2xl blur-xl"></div>
          <div className="relative text-center space-y-4 ">
            <h4 className="text-2xl font-bold  bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              संकल्प
            </h4>
            <p className="text-lg text-gray-800 font-medium leading-relaxed max-w-4xl mx-auto">
              <span className="font-bold text-orange-600">गौ सेवा, गौ सुरक्षा और गौ सम्मान </span> हेतु प्रार्थना का क्रम तब तक जारी रहेगा जब तक की गौ माता जी को  सेवा,  सुरक्षा और  सम्मान नहीं मिल जाता
            </p>
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
        
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}} />
    </section>
  );
};

export default CampaignActionPlan;