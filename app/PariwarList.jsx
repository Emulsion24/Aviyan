"use client";
import React, { useState } from "react";
import { Search, MapPin, User, Phone, Mail, Award } from "lucide-react";

const PravariList = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTehsil, setSelectedTehsil] = useState("");
  const [filteredPravari, setFilteredPravari] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Mock data structure
  const mockData = {
    states: [
      {
        id: "rajasthan",
        name: "राजस्थान",
        districts: [
          {
            id: "jaipur",
            name: "जयपुर",
            tehsils: [
              { id: "jaipur-city", name: "जयपुर सिटी" },
              { id: "amber", name: "आमेर" },
              { id: "sanganer", name: "सांगानेर" }
            ]
          },
          {
            id: "jodhpur",
            name: "जोधपुर",
            tehsils: [
              { id: "jodhpur-city", name: "जोधपुर सिटी" },
              { id: "bilara", name: "बिलाड़ा" },
              { id: "phalodi", name: "फलोदी" }
            ]
          },
          {
            id: "udaipur",
            name: "उदयपुर",
            tehsils: [
              { id: "udaipur-city", name: "उदयपुर सिटी" },
              { id: "girwa", name: "गिरवा" },
              { id: "mavli", name: "मावली" }
            ]
          }
        ]
      },
      {
        id: "maharashtra",
        name: "महाराष्ट्र",
        districts: [
          {
            id: "mumbai",
            name: "मुंबई",
            tehsils: [
              { id: "mumbai-city", name: "मुंबई सिटी" },
              { id: "andheri", name: "अंधेरी" },
              { id: "kurla", name: "कुर्ला" }
            ]
          },
          {
            id: "pune",
            name: "पुणे",
            tehsils: [
              { id: "pune-city", name: "पुणे सिटी" },
              { id: "haveli", name: "हवेली" },
              { id: "mulshi", name: "मुळशी" }
            ]
          },
          {
            id: "nagpur",
            name: "नागपुर",
            tehsils: [
              { id: "nagpur-city", name: "नागपुर सिटी" },
              { id: "kamptee", name: "कामठी" },
              { id: "hingna", name: "हिंगणा" }
            ]
          }
        ]
      },
      {
        id: "uttar-pradesh",
        name: "उत्तर प्रदेश",
        districts: [
          {
            id: "lucknow",
            name: "लखनऊ",
            tehsils: [
              { id: "lucknow-city", name: "लखनऊ सिटी" },
              { id: "malihabad", name: "मलीहाबाद" },
              { id: "mohanlalganj", name: "मोहनलालगंज" }
            ]
          },
          {
            id: "varanasi",
            name: "वाराणसी",
            tehsils: [
              { id: "varanasi-city", name: "वाराणसी सिटी" },
              { id: "pindra", name: "पिंड्रा" },
              { id: "chiraigaon", name: "चिरईगांव" }
            ]
          },
          {
            id: "agra",
            name: "आगरा",
            tehsils: [
              { id: "agra-city", name: "आगरा सिटी" },
              { id: "fatehabad", name: "फतेहाबाद" },
              { id: "kheragarh", name: "खैरागढ़" }
            ]
          }
        ]
      }
    ],
    pravariData: [
      // Rajasthan - Jaipur
      {
        id: 1,
        state: "rajasthan",
        district: "jaipur",
        tehsil: "jaipur-city",
        name: "पंडित राजेश शर्मा",
        role: "प्रमुख गो भक्त",
        phone: "+91 98765 43210",
        email: "rajesh.sharma@example.com",
        address: "C-स्कीम, जयपुर",
        experience: "15 वर्ष का गो सेवा अनुभव"
      },
      {
        id: 2,
        state: "rajasthan",
        district: "jaipur",
        tehsil: "jaipur-city",
        name: "स्वामी गोपाल दास",
        role: "प्रमुख संत",
        phone: "+91 98765 43211",
        email: "gopal.das@example.com",
        address: "मालवीय नगर, जयपुर",
        experience: "20 वर्ष का गो सेवा अनुभव"
      },
      {
        id: 3,
        state: "rajasthan",
        district: "jaipur",
        tehsil: "sanganer",
        name: "श्रीमती सुनीता देवी",
        role: "सहयोगी गो भक्त",
        phone: "+91 98765 43212",
        email: "sunita.devi@example.com",
        address: "सांगानेर, जयपुर",
        experience: "10 वर्ष का गो सेवा अनुभव"
      },
      // Rajasthan - Jodhpur
      {
        id: 4,
        state: "rajasthan",
        district: "jodhpur",
        tehsil: "jodhpur-city",
        name: "महंत रामकृष्ण जी",
        role: "प्रमुख संत",
        phone: "+91 98765 43213",
        email: "ramkrishna@example.com",
        address: "पाओटा, जोधपुर",
        experience: "25 वर्ष का गो सेवा अनुभव"
      },
      {
        id: 5,
        state: "rajasthan",
        district: "jodhpur",
        tehsil: "jodhpur-city",
        name: "श्री विक्रम सिंह",
        role: "प्रमुख गो भक्त",
        phone: "+91 98765 43214",
        email: "vikram.singh@example.com",
        address: "रातानाडा, जोधपुर",
        experience: "12 वर्ष का गो सेवा अनुभव"
      },
      // Maharashtra - Mumbai
      {
        id: 6,
        state: "maharashtra",
        district: "mumbai",
        tehsil: "mumbai-city",
        name: "श्री गणेश पाटिल",
        role: "प्रमुख गो भक्त",
        phone: "+91 98765 43215",
        email: "ganesh.patil@example.com",
        address: "दादर, मुंबई",
        experience: "18 वर्ष का गो सेवा अनुभव"
      },
      {
        id: 7,
        state: "maharashtra",
        district: "mumbai",
        tehsil: "andheri",
        name: "स्वामी आनंद स्वरूप",
        role: "प्रमुख संत",
        phone: "+91 98765 43216",
        email: "anand.swaroop@example.com",
        address: "अंधेरी पूर्व, मुंबई",
        experience: "22 वर्ष का गो सेवा अनुभव"
      },
      // Maharashtra - Pune
      {
        id: 8,
        state: "maharashtra",
        district: "pune",
        tehsil: "pune-city",
        name: "डॉ. संजय देशमुख",
        role: "प्रमुख गो भक्त",
        phone: "+91 98765 43217",
        email: "sanjay.deshmukh@example.com",
        address: "कोथरूड, पुणे",
        experience: "14 वर्ष का गो सेवा अनुभव"
      },
      {
        id: 9,
        state: "maharashtra",
        district: "pune",
        tehsil: "haveli",
        name: "श्रीमती मीरा कुलकर्णी",
        role: "सहयोगी गो भक्त",
        phone: "+91 98765 43218",
        email: "meera.kulkarni@example.com",
        address: "हवेली, पुणे",
        experience: "8 वर्ष का गो सेवा अनुभव"
      },
      // Uttar Pradesh - Lucknow
      {
        id: 10,
        state: "uttar-pradesh",
        district: "lucknow",
        tehsil: "lucknow-city",
        name: "पंडित अमर नाथ तिवारी",
        role: "प्रमुख संत",
        phone: "+91 98765 43219",
        email: "amar.tiwari@example.com",
        address: "हजरतगंज, लखनऊ",
        experience: "30 वर्ष का गो सेवा अनुभव"
      },
      {
        id: 11,
        state: "uttar-pradesh",
        district: "lucknow",
        tehsil: "malihabad",
        name: "श्री राकेश वर्मा",
        role: "प्रमुख गो भक्त",
        phone: "+91 98765 43220",
        email: "rakesh.verma@example.com",
        address: "मलीहाबाद, लखनऊ",
        experience: "16 वर्ष का गो सेवा अनुभव"
      },
      // Uttar Pradesh - Varanasi
      {
        id: 12,
        state: "uttar-pradesh",
        district: "varanasi",
        tehsil: "varanasi-city",
        name: "महंत विश्वनाथ पांडे",
        role: "प्रमुख संत",
        phone: "+91 98765 43221",
        email: "vishwanath.pandey@example.com",
        address: "दशाश्वमेध घाट, वाराणसी",
        experience: "28 वर्ष का गो सेवा अनुभव"
      },
      {
        id: 13,
        state: "uttar-pradesh",
        district: "varanasi",
        tehsil: "varanasi-city",
        name: "श्री सुरेश मिश्रा",
        role: "सहयोगी गो भक्त",
        phone: "+91 98765 43222",
        email: "suresh.mishra@example.com",
        address: "सिगरा, वाराणसी",
        experience: "11 वर्ष का गो सेवा अनुभव"
      }
    ]
  };

  const getDistricts = () => {
    const state = mockData.states.find(s => s.id === selectedState);
    return state ? state.districts : [];
  };

  const getTehsils = () => {
    const state = mockData.states.find(s => s.id === selectedState);
    if (!state) return [];
    const district = state.districts.find(d => d.id === selectedDistrict);
    return district ? district.tehsils : [];
  };

  const handleSearch = () => {
    if (!selectedState || !selectedDistrict || !selectedTehsil) {
      alert("कृपया राज्य, जिला और तहसील का चयन करें");
      return;
    }

    const results = mockData.pravariData.filter(
      p => p.state === selectedState && 
           p.district === selectedDistrict && 
           p.tehsil === selectedTehsil
    );

    setFilteredPravari(results);
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedTehsil("");
    setFilteredPravari([]);
    setShowResults(false);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
            <span className="text-white pt-1 pb-1 font-bold text-sm tracking-wide">प्रवारी खोजें</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl pt-1 pb-2 font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            प्रवारी सूची
          </h2>
          
          <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-md"></div>
          
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            अपने क्षेत्र के गो सेवा प्रवारी की जानकारी प्राप्त करें
          </p>
        </div>

        {/* Search Form */}
        <div className="relative max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-blue-100">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl blur-xl"></div>
          
          <div className="relative space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* State Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  राज्य चुनें
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict("");
                    setSelectedTehsil("");
                    setShowResults(false);
                  }}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-gray-700"
                >
                  <option value="">राज्य का चयन करें</option>
                  {mockData.states.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
              </div>

              {/* District Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  जिला चुनें
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedTehsil("");
                    setShowResults(false);
                  }}
                  disabled={!selectedState}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                >
                  <option value="">जिला का चयन करें</option>
                  {getDistricts().map(district => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>

              {/* Tehsil Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  तहसील चुनें
                </label>
                <select
                  value={selectedTehsil}
                  onChange={(e) => {
                    setSelectedTehsil(e.target.value);
                    setShowResults(false);
                  }}
                  disabled={!selectedDistrict}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
                >
                  <option value="">तहसील का चयन करें</option>
                  {getTehsils().map(tehsil => (
                    <option key={tehsil.id} value={tehsil.id}>{tehsil.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <button
                onClick={handleSearch}
                className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  खोजें
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                रीसेट करें
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="space-y-6 animate-fadeIn">
            {filteredPravari.length > 0 ? (
              <>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {filteredPravari.length} प्रवारी मिले
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPravari.map((pravari) => (
                    <div
                      key={pravari.id}
                      className="group relative p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-blue-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                    >
                      {/* Gradient background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

                      <div className="relative space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-800">{pravari.name}</h4>
                              <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1">
                                <p className="text-white text-sm font-semibold">{pravari.role}</p>
                              </div>
                            </div>
                          </div>
                          <Award className="w-8 h-8 text-yellow-500" />
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 pl-14">
                          <div className="flex items-center gap-3 text-gray-700">
                            <Phone className="w-4 h-4 text-green-600" />
                            <span>{pravari.phone}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-700">
                            <Mail className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{pravari.email}</span>
                          </div>
                          <div className="flex items-start gap-3 text-gray-700">
                            <MapPin className="w-4 h-4 text-red-600 mt-1" />
                            <span>{pravari.address}</span>
                          </div>
                        </div>

                        {/* Experience Badge */}
                        <div className="pl-14 pt-2">
                          <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-orange-200 rounded-lg">
                            <p className="text-orange-700 font-semibold text-sm">
                              ✨ {pravari.experience}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center p-12 bg-white/90 rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  कोई प्रवारी नहीं मिला
                </h3>
                <p className="text-gray-600">
                  इस क्षेत्र के लिए अभी प्रवारी की जानकारी उपलब्ध नहीं है।
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
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

export default PravariList;