"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroImage from "../public/hero-cow.jpg";

const Hero = () => {
  const router = useRouter();

  const scrollToForm = () => {
    document
      .getElementById("registration-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Hero Background"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 from-primary/70 via-secondary/70 to-primary/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-2 text-primary-foreground drop-shadow-md">
            <p className="text-2xl md:text-3xl font-semibold">।। जय नंदी बावा ।।</p>
            <p className="text-xl md:text-2xl">।। जय गोमाता ।।</p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight drop-shadow-lg">
            गो सम्मान आह्वान अभियान
          </h1>

          <div className="flex flex-wrap justify-center gap-4 text-2xl md:text-3xl font-semibold text-primary-foreground">
            <span className="px-6 py-2 bg-white/20 rounded-lg backdrop-blur-md border border-white/30 shadow-md">
              ।। सेवा ।।
            </span>
            <span className="px-6 py-2 bg-white/20 rounded-lg backdrop-blur-md border border-white/30 shadow-md">
              ।। सुरक्षा ।।
            </span>
            <span className="px-6 py-2 bg-white/20 rounded-lg backdrop-blur-md border border-white/30 shadow-md">
              ।। सम्मान ।।
            </span>
          </div>

          <p className="text-xl md:text-2xl text-primary-foreground/95 max-w-3xl mx-auto leading-relaxed">
            प्रधान संरक्षक - गौमाता (आद्यशक्ति मां सुरभि)
            <br />
            अध्यक्षता - नंदी बाबा (नीलमणि वृषभदेव)
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="text-lg px-8 py-4 rounded-xl bg-yellow-500/90 hover:bg-yellow-600 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
              अभियान में शामिल हों
            </button>

            <button
              onClick={goToLogin}
              className="text-lg px-8 py-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 border border-white/30 backdrop-blur-sm"
            >
              लॉगिन करें
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-md"></div>
    </section>
  );
};

export default Hero;
