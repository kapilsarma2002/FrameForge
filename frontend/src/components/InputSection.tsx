
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const InputSection = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // Navigate to results page or show results here
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3000);
  };

  return (
    <section id="input-section" className="py-20 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What would you like to visualize?</h2>
      
      <Card className="glass-card p-6 md:p-8 relative overflow-hidden">
        <Textarea 
          placeholder="Describe your visualization, e.g., 'Show me a visual representation of a web request from client to server to database and back'"
          className="min-h-[150px] bg-transparent border border-white/10 text-lg focus-visible:ring-primary/30"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <div className="mt-6 flex justify-end">
          <Button 
            className="bg-gradient-to-r from-manim-blue to-manim-purple hover:opacity-90 text-lg px-8"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Generating...
              </>
            ) : (
              <>
                Generate Video
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Example prompts:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setPrompt("Show me a visual representation of a web request from client to server to database and back")}>
              Show me a visual representation of a web request from client to server to database and back
            </li>
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setPrompt("Explain how a binary search algorithm works with a step-by-step visualization")}>
              Explain how a binary search algorithm works with a step-by-step visualization
            </li>
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setPrompt("Visualize how DNS resolution works when a user types a URL in their browser")}>
              Visualize how DNS resolution works when a user types a URL in their browser
            </li>
          </ul>
        </div>
      </Card>
    </section>
  );
};

export default InputSection;
