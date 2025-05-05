
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type VideoChunkProps = {
  chunk: {
    id: number;
    title: string;
    description: string;
    videoUrl: string | null;
    code: string;
  };
  onEdit: () => void;
};

const VideoChunk = ({ chunk, onEdit }: VideoChunkProps) => {
  return (
    <Card className="glass-card overflow-hidden flex flex-col">
      <div className="h-40 bg-gradient-to-br from-black to-manim-purple/30 flex items-center justify-center">
        {chunk.videoUrl ? (
          <video 
            src={chunk.videoUrl} 
            className="w-full h-full object-cover" 
            controls 
          />
        ) : (
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-manim-blue/30 mx-auto flex items-center justify-center animate-pulse-soft">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <p className="text-sm mt-2 text-white/70">Preview will appear here</p>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold mb-1">{chunk.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{chunk.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <Button variant="ghost" size="sm" className="text-manim-blue hover:text-white hover:bg-manim-blue/20">
            Preview
          </Button>
          <Button variant="outline" size="sm" onClick={onEdit} className="border-white/10 hover:bg-white/5">
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VideoChunk;
