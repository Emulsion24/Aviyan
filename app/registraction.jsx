"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, User, Mail, Phone, MapPin, Home, Building2, Map } from "lucide-react";
import Image from "next/image";

// State-District mapping for India
const STATE_DISTRICTS = {
  "Rajasthan": [
    "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", 
    "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur",
    "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu",
    "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand",
    "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
  ],
  "West Bengal": [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong",
    "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas",
    "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur",
    "Purulia", "South 24 Parganas", "Uttar Dinajpur"
  ]
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    altphone: "",
    description: "",
    state: "",
    district: "",
    village: "",
    pincode: "",
  });

  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Update available districts when state changes
  useEffect(() => {
    if (formData.state) {
      setAvailableDistricts(STATE_DISTRICTS[formData.state] || []);
      // Reset district if it doesn't belong to new state
      if (!STATE_DISTRICTS[formData.state]?.includes(formData.district)) {
        setFormData(prev => ({ ...prev, district: "" }));
      }
    } else {
      setAvailableDistricts([]);
      setFormData(prev => ({ ...prev, district: "" }));
    }
  }, [formData.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validation for required fields
    if (!formData.name.trim()) {
      setError("कृपया अपना पूरा नाम दर्ज करें");
      setLoading(false);
      return;
    }

    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone)) {
      setError("कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें");
      setLoading(false);
      return;
    }

    if (formData.altphone && !/^[0-9]{10}$/.test(formData.altphone)) {
      setError("वैकल्पिक मोबाइल नंबर 10 अंकों का होना चाहिए");
      setLoading(false);
      return;
    }

    if (!formData.state.trim()) {
      setError("कृपया राज्य चुनें");
      setLoading(false);
      return;
    }

    if (!formData.district.trim()) {
      setError("कृपया जिला चुनें");
      setLoading(false);
      return;
    }

    if (!formData.village.trim()) {
      setError("कृपया गांव/शहर का नाम दर्ज करें");
      setLoading(false);
      return;
    }

    if (!formData.pincode.trim() || !/^[0-9]{6}$/.test(formData.pincode)) {
      setError("कृपया 6 अंकों का वैध पिन कोड दर्ज करें");
      setLoading(false);
      return;
    }

    // Optional email validation
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("कृपया एक वैध ईमेल दर्ज करें");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          altphone: "",
          description: "",
          state: "",
          district: "",
          village: "",
          pincode: "",
        });
        
        // Scroll to top to show success message
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.message || "पंजीकरण में समस्या हुई। कृपया पुनः प्रयास करें।");
      }
    } catch (err) {
      console.error(err);
      setError("सबमिट करने में समस्या हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="registration-form"
      className="relative py-24 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-block bg-gradient-to-br from-orange-400 to-yellow-500 p-4 rounded-2xl shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
        <Image
                         src="/logo.jpg"
                         alt="गौ सम्मान लोगो"
                         width={80}
                         height={80}
                         className="rounded-full object-cover"
                         priority
                       />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-3">
            अभियान पंजीकरण फॉर्म
          </h2>
          <p className="text-gray-600 text-lg font-medium">गौ सम्मान आह्वान अभियान में शामिल हों</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 text-green-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl animate-slideIn">
            <CheckCircle2 size={32} className="text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-1">✅ पंजीकरण सफल हुआ!</h3>
              <p className="text-green-700">आपका पंजीकरण सफलतापूर्वक पूर्ण हो गया है। धन्यवाद!</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-500 text-red-800 p-6 rounded-2xl flex items-center gap-4 shadow-xl animate-shake">
            <span className="text-3xl flex-shrink-0">❌</span>
            <div>
              <h3 className="font-bold text-xl mb-1">त्रुटि!</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white/90 backdrop-blur-xl border-2 border-orange-100 shadow-2xl rounded-3xl p-8 md:p-12 animate-slideUp">
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 pb-3 border-b-2 border-orange-200">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg shadow-md">
                  <User size={24} className="text-white" />
                </div>
                व्यक्तिगत जानकारी
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={16} className="text-orange-500" />
                    पूरा नाम <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="अपना पूरा नाम दर्ज करें"
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    ईमेल
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="example@email.com (वैकल्पिक)"
                  />
                </div>

                {/* Phone */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-orange-500" />
                    मोबाइल नंबर <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    maxLength="10"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="10 अंकों का मोबाइल नंबर"
                  />
                </div>

                {/* Alternative Phone */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    वैकल्पिक मोबाइल नंबर
                  </label>
                  <input
                    type="tel"
                    name="altphone"
                    value={formData.altphone}
                    onChange={handleChange}
                    disabled={loading}
                    maxLength="10"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="वैकल्पिक नंबर (यदि हो)"
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 pb-3 border-b-2 border-orange-200">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg shadow-md">
                  <MapPin size={24} className="text-white" />
                </div>
                पता जानकारी
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* State */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Map size={16} className="text-orange-500" />
                    राज्य <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                  >
                    <option value="">राज्य चुनें</option>
                    {Object.keys(STATE_DISTRICTS).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 top-8">
                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>

                {/* District */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 size={16} className="text-orange-500" />
                    जिला <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    disabled={loading || !formData.state}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                  >
                    <option value="">जिला चुनें</option>
                    {availableDistricts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 top-8">
                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                  {!formData.state && (
                    <p className="text-xs text-gray-500 mt-1">पहले राज्य चुनें</p>
                  )}
                </div>

                {/* Village */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Home size={16} className="text-orange-500" />
                    गांव / शहर <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="गांव या शहर का नाम"
                  />
                </div>

                {/* Pincode */}
                <div className="relative group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-orange-500" />
                    पिन कोड <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    maxLength="6"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="6 अंकों का पिन कोड"
                  />
                </div>
              </div>

              {/* Full Address (Description) */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Home size={16} className="text-gray-400" />
                  विवरण (वैकल्पिक)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={loading}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all shadow-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="औपचारिक विवरण:कार्य विवरण, पता आदि, यदि आवश्यक हो तो यहां दर्ज करें"
                />
              </div>
            </div>

            {/* Required Fields Note */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-orange-800 flex items-center gap-2">
                <span className="text-lg">ℹ️</span>
                <span><span className="font-bold">नोट:</span> <span className="text-red-500">*</span> चिह्नित फील्ड अनिवार्य हैं</span>
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !formData.name || !formData.phone || !formData.state || !formData.district || !formData.village || !formData.pincode}
                className="group relative px-12 py-5 text-xl font-bold rounded-2xl text-white shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 hover:from-yellow-600 hover:via-orange-600 hover:to-amber-700 hover:shadow-orange-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      भेजा जा रहा है...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={24} />
                      सबमिट करें
                    </>
                  )}
                </span>
                {!loading && (
                  <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-600 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
            <span className="text-lg">🔒</span>
            <p className="text-sm font-medium">
              आपकी जानकारी सुरक्षित है और केवल अभियान के उद्देश्य से उपयोग की जाएगी
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}