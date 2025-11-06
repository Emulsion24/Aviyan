'use client';
import React from "react";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp,FaFacebook,FaInstagram,FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          
          {/* Logo and About Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
             
             <Image
                src="/logo.jpg"
                alt="गौ सम्मान लोगो"
                width={80}
                height={80}
                className="rounded-full object-cover"
                priority
              />
              </div>
              <div>
                <h3 className="text-2xl font-bold">गो सम्मान आह्वान अभियान</h3>
                <p className="text-sm text-orange-100">Go Samman Ahvaan Abhiyan</p>
              </div>
            </div>
            <p className="text-orange-50 leading-relaxed">
              गो सेवा और गो रक्षा के माध्यम से राष्ट्र रक्षा एवं संस्कृति रक्षा का संकल्प
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-orange-400 pb-2">त्वरित लिंक</h4>
            <ul className="space-y-2 text-orange-50">
              <li><a href="#about" className="hover:text-white transition-colors">हमारे बारे में</a></li>
              <li><a href="#objectives" className="hover:text-white transition-colors">सरकार से माँगे</a></li>
              
              <li><a href="#registration-form" className="hover:text-white transition-colors">हमारे साथ जुड़ें</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-orange-400 pb-2">संपर्क सूत्र</h4>
            <div className="space-y-3 text-orange-50">
              <div className="flex items-start space-x-2">
                <FaWhatsapp className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>+91 8239711008</span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="break-all">gausamman@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>भारत</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 pt-8 border-t border-orange-500">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-orange-100 text-sm">हमसे जुड़ें:</span>
              <a 
                href="https://www.facebook.com/share/14MgSqbK6e6/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/gausmmaanaahvaan/?igsh=end1eGRrZ2ZlMHc%3D#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-orange-100">
                © 2025 गो सम्मान आह्वान अभियान। सर्वाधिकार सुरक्षित।
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;