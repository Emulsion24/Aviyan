'use client';
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold">
              ।। जय गोमाता ।।
            </h3>
            <p className="text-xl">
              गो सम्मान आह्वान अभियान
            </p>
          </div>
          
          <div className="pt-4 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/90">
              गो सेवा और गो रक्षा के माध्यम से राष्ट्र रक्षा एवं संस्कृति रक्षा
            </p>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-primary-foreground/70">
              © 2024 गो सम्मान आह्वान अभियान। सर्वाधिकार सुरक्षित।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
