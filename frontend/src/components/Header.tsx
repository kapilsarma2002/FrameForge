
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Header = () => {
  const scrollToInput = () => {
    const inputSection = document.getElementById('input-section');
    if (inputSection) {
      inputSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full py-6 px-4 flex justify-between items-center z-10">
      <div className="flex items-center gap-2">
        <div className="size-10 rounded-full bg-gradient-to-br from-manim-blue to-manim-purple flex items-center justify-center">
          <span className="text-white font-bold text-lg">FF</span>
        </div>
        <h1 className="text-2xl font-bold">Frame<span className="text-gradient">Forge</span></h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-muted-foreground hover:text-white">Examples</Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-white">Gallery</Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-white">About</Button>
        <Button variant="default" className="bg-gradient-to-r from-manim-blue to-manim-purple hover:opacity-90" onClick={scrollToInput}>
          Create Video
        </Button>
      </div>
    </header>
  );
};

export default Header;
