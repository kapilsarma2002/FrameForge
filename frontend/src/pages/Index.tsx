
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InputSection from '@/components/InputSection';
import ResultsSection from '@/components/ResultsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f0f17] to-[#121220] text-white">
      <Header />
      <Hero />
      <InputSection />
      <ResultsSection />
      <Footer />
    </div>
  );
};

export default Index;
