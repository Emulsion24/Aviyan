"use client";
import React from "react";

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            अभियान का मुख्य उद्देश्य
          </h2>
          <div className="w-24 h-1 mx-auto bg-yellow-600 rounded-full"></div>
        </div>

        {/* Card Replacement */}
        <div className="p-8 md:p-12 bg-white border border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            केंद्र सरकार और देश की सभी राज्य सरकारों से राष्ट्र और भारतीय संस्कृति के हित में संविधान के दायरे में रहकर अहिंसक तरीके से
            गो माता को{" "}
            <span className="font-bold text-yellow-700">सेवा</span> (गौ माता को उचित अनुदान मिले),{" "}
            <span className="font-bold text-yellow-700">सुरक्षा</span> (भारत से गौहत्या पूरी तरह समाप्त हो) और{" "}
            <span className="font-bold text-yellow-700">सम्मान</span> (गौ माता राष्ट्रमाता बने)
            का मौलिक अधिकार प्रदान करवाना।
          </p>
        </div>

        {/* Blessing Section */}
        <div className="text-center py-8">
          <p className="text-2xl md:text-3xl font-semibold text-yellow-700 mb-4">
            आशीर्वाद
          </p>
          <p className="text-lg text-gray-700">
            भारतीय परम्परा के समस्त आराध्य देवी देवता
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
