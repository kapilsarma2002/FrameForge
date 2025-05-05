
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-gradient-to-br from-manim-blue to-manim-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">FF</span>
              </div>
              <h2 className="text-xl font-bold">Frame<span className="text-gradient">Forge</span></h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Create beautiful educational videos with AI and Manim
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-3">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white">Examples</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FrameForge. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-white">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
