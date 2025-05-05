
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToInput = () => {
    const inputSection = document.getElementById('input-section');
    if (inputSection) {
      inputSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[90vh] w-full flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-manim-blue/20 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-manim-purple/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-manim-pink/20 blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="z-10 max-w-4xl animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Create Beautiful <span className="text-gradient">Educational Videos</span> With AI
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Generate stunning animated explanations with Manim code. Simply describe what you want to visualize and watch your ideas come to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-manim-blue to-manim-purple hover:opacity-90 text-lg px-8"
            onClick={scrollToInput}
          >
            Start Creating
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 text-lg px-8">
            Watch Demo
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce cursor-pointer" onClick={scrollToInput}>
        <ArrowDown className="h-8 w-8 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
