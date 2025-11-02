"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    altphone:"",
    phone: "",
    state: "",
    district: "",
    village: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Server error");

    const result = await res.json();

    if (result.success) {
      toast.success("✅ पंजीकरण सफल हुआ!");
      setFormData({
        name: "",
        phone: "",
        state: "",
        district: "",
        village: "",
        pincode: "",
        email: "",
        altphone: "",
      });
    } else {
      toast.error(result.message || "⚠️ कुछ गड़बड़ हुई!");
    }
  } catch (err) {
    console.error(err);
    toast.error("❌ सबमिट करने में समस्या हुई!");
  } finally {
    setLoading(false);
  }
};

  return (
    <section
      id="registration-form"
      className="relative py-24 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100"
    >
      {/* Glow background */}
      <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-yellow-300/20 via-orange-300/10 to-amber-200/20" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-3xl p-10 md:p-14">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-amber-700 drop-shadow-sm mb-10">
            अभियान पंजीकरण फॉर्म
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 outline-none text-lg py-2 placeholder-transparent"
                  placeholder="पूरा नाम"
                />
                <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
                  पूरा नाम
                </label>
              </div>
              <div className="relative">
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 outline-none text-lg py-2 placeholder-transparent"
    placeholder="ईमेल"
  />
  <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
    ईमेल
  </label>
</div>

              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 outline-none text-lg py-2 placeholder-transparent"
                  placeholder="मोबाइल नंबर"
                />
                <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
                  मोबाइल नंबर
                </label>
              </div>
               <div className="relative">
                <input
                  type="tel"
                  name="altphone"
                  value={formData.altphone}
                  onChange={handleChange}
                 
                  className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 outline-none text-lg py-2 placeholder-transparent"
                  placeholder="Alternative:मोबाइल नंबर"
                />
                <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
                 Alt: मोबाइल नंबर
                </label>
              </div>
            </div>

            {/* Address fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="राज्य"
                  className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 outline-none text-lg py-2 placeholder-transparent"
                />
                <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
                  राज्य
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="जिला"
                  className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 outline-none text-lg py-2 placeholder-transparent"
                />
                <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
                  जिला
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  placeholder="गांव"
                  className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 outline-none text-lg py-2 placeholder-transparent"
                />
                <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
                  गांव
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="पिन कोड"
                  className="peer w-full bg-transparent border-b-2 border-gray-300 focus:border-yellow-600 outline-none text-lg py-2 placeholder-transparent"
                />
                <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all">
                  पिन कोड
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`relative px-10 py-4 text-lg font-semibold rounded-xl text-white shadow-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                }`}
              >
                {loading ? "भेजा जा रहा है..." : "सबमिट करें"}
                {!loading && (
                  <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition-all duration-300" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
