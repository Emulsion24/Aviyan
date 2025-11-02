"use client";
import React from "react";
import { Phone, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-yellow-50">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            संपर्क करें
          </h2>
          <div className="w-24 h-1 mx-auto bg-yellow-600 rounded-full"></div>
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
            <h3 className="text-2xl font-bold text-gray-800">
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
