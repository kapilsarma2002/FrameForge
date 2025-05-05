
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, Edit, Play, RefreshCw } from "lucide-react";

const mockChunks = [
  { 
    id: 1, 
    title: "Client sends request", 
    description: "The client initiates an HTTP request to the server",
    videoUrl: null, // Would contain actual video URL in production
    code: `from manim import *\n\nclass ClientServerRequest(Scene):\n    def construct(self):\n        # Create client and server shapes\n        client = Square().shift(LEFT*3)\n        server = Square().shift(RIGHT*3)\n        \n        # Add labels\n        client_label = Text("Client").scale(0.5).next_to(client, DOWN)\n        server_label = Text("Server").scale(0.5).next_to(server, DOWN)\n        \n        # Show initial state\n        self.play(FadeIn(client), FadeIn(server))\n        self.play(FadeIn(client_label), FadeIn(server_label))\n        self.wait(0.5)\n        \n        # Animate the request\n        request = Arrow(client.get_right(), server.get_left(), buff=0.1)\n        request_label = Text("Request").scale(0.4).next_to(request, UP, buff=0.1)\n        \n        self.play(GrowArrow(request))\n        self.play(FadeIn(request_label))\n        self.wait(1)`
  },
  { 
    id: 2, 
    title: "Server processes request", 
    description: "The server receives and processes the client's request",
    videoUrl: null, // Would contain actual video URL in production
    code: `from manim import *\n\nclass ServerProcessing(Scene):\n    def construct(self):\n        # Create server shape\n        server = Square().shift(RIGHT*3)\n        server_label = Text("Server").scale(0.5).next_to(server, DOWN)\n        \n        # Show initial state\n        self.play(FadeIn(server), FadeIn(server_label))\n        self.wait(0.5)\n        \n        # Animate the processing\n        processing = Circle(radius=0.3).move_to(server.get_center())\n        self.play(Create(processing))\n        self.play(processing.animate.scale(1.5), rate_func=there_and_back, run_time=2)\n        self.wait(1)`
  },
  { 
    id: 3, 
    title: "Server queries database", 
    description: "The server sends a query to the database",
    videoUrl: null, // Would contain actual video URL in production
    code: `from manim import *\n\nclass ServerDatabaseQuery(Scene):\n    def construct(self):\n        # Create shapes\n        server = Square().shift(LEFT*3)\n        database = Circle().shift(RIGHT*3)\n        \n        # Add labels\n        server_label = Text("Server").scale(0.5).next_to(server, DOWN)\n        db_label = Text("Database").scale(0.5).next_to(database, DOWN)\n        \n        # Show initial state\n        self.play(FadeIn(server), FadeIn(database))\n        self.play(FadeIn(server_label), FadeIn(db_label))\n        self.wait(0.5)\n        \n        # Animate query\n        query = Arrow(server.get_right(), database.get_left(), buff=0.1)\n        query_label = Text("Query").scale(0.4).next_to(query, UP, buff=0.1)\n        \n        self.play(GrowArrow(query))\n        self.play(FadeIn(query_label))\n        self.wait(1)`
  },
  { 
    id: 4, 
    title: "Database returns results", 
    description: "The database processes the query and returns results",
    videoUrl: null, // Would contain actual video URL in production
    code: `from manim import *\n\nclass DatabaseResponse(Scene):\n    def construct(self):\n        # Create shapes\n        server = Square().shift(LEFT*3)\n        database = Circle().shift(RIGHT*3)\n        \n        # Add labels\n        server_label = Text("Server").scale(0.5).next_to(server, DOWN)\n        db_label = Text("Database").scale(0.5).next_to(database, DOWN)\n        \n        # Show initial state\n        self.play(FadeIn(server), FadeIn(database))\n        self.play(FadeIn(server_label), FadeIn(db_label))\n        self.wait(0.5)\n        \n        # Animate response\n        response = Arrow(database.get_left(), server.get_right(), buff=0.1, color=BLUE)\n        response_label = Text("Response").scale(0.4).next_to(response, DOWN, buff=0.1)\n        \n        self.play(GrowArrow(response))\n        self.play(FadeIn(response_label))\n        self.wait(1)`
  },
  { 
    id: 5, 
    title: "Server sends response to client", 
    description: "The server processes the data and sends back a response to the client",
    videoUrl: null, // Would contain actual video URL in production
    code: `from manim import *\n\nclass ServerClientResponse(Scene):\n    def construct(self):\n        # Create client and server shapes\n        client = Square().shift(LEFT*3)\n        server = Square().shift(RIGHT*3)\n        \n        # Add labels\n        client_label = Text("Client").scale(0.5).next_to(client, DOWN)\n        server_label = Text("Server").scale(0.5).next_to(server, DOWN)\n        \n        # Show initial state\n        self.play(FadeIn(client), FadeIn(server))\n        self.play(FadeIn(client_label), FadeIn(server_label))\n        self.wait(0.5)\n        \n        # Animate the response\n        response = Arrow(server.get_left(), client.get_right(), buff=0.1, color=GREEN)\n        response_label = Text("Response").scale(0.4).next_to(response, UP, buff=0.1)\n        \n        self.play(GrowArrow(response))\n        self.play(FadeIn(response_label))\n        self.wait(1)`
  }
];

const ResultsSection = () => {
  const [chunks, setChunks] = useState(mockChunks);
  const [selectedChunk, setSelectedChunk] = useState<number | null>(1); // Default to first chunk
  const [editPrompt, setEditPrompt] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

  const handleRegenerateChunk = () => {
    if (!selectedChunk || !editPrompt.trim() || isRegenerating) return;
    
    setIsRegenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegenerating(false);
      // In a real app, this would update with new data from the API
    }, 2000);
  };

  const handleDownload = () => {
    console.log('Downloading video')
  }

  const handleSelectChunk = (chunkId: number) => {
    setSelectedChunk(chunkId);
    const chunk = chunks.find(c => c.id === chunkId);
    setEditPrompt(chunk ? chunk.description : "");
    
    // In a real implementation, we would seek to the chunk's timestamp in the video
    // For this mockup, we'll just simulate different times for different chunks
    setCurrentVideoTime(chunkId * 5); // Just a placeholder, 5 seconds per chunk
  };

  return (
    <section id="results-section" className="py-20 px-4 max-w-7xl w-4/5 mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Your Visualization</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <Card className="glass-card overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-black to-manim-purple/30 flex items-center justify-center">
              {/* Placeholder for video player */}
              <div className="text-center p-4">
                <div className="w-20 h-20 rounded-full bg-manim-blue/30 mx-auto flex items-center justify-center animate-pulse-soft">
                  <Play className="h-10 w-10 text-white" />
                </div>
                <p className="text-lg mt-4 text-white/70">
                  Full visualization video will appear here
                </p>
                <p className="text-sm mt-2 text-white/50">
                  Currently showing: {chunks.find(c => c.id === selectedChunk)?.title}
                </p>
                <div className="mt-6 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  {/* Video progress bar with highlighted chunks */}
                  <div className="flex h-full">
                    {chunks.map(chunk => (
                      <div 
                        key={chunk.id}
                        className={`h-full flex-1 ${chunk.id === selectedChunk ? 'bg-manim-blue animate-pulse-soft' : 'bg-white/30'}`}
                        onClick={() => handleSelectChunk(chunk.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                {selectedChunk ? chunks.find(c => c.id === selectedChunk)?.title : 'Full Visualization'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedChunk ? chunks.find(c => c.id === selectedChunk)?.description : 'Complete visualization of the requested scenario'}
              </p>
            </div>
          </Card>
        </div>
        
        <div className="w-full md:w-1/3">
          <Card className="glass-card h-full overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold">Timeline Chunks</h3>
              <p className="text-xs text-muted-foreground">Select a chunk to edit</p>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto">
              {chunks.map(chunk => (
                <div 
                  key={chunk.id}
                  className={`p-3 border-b border-white/5 cursor-pointer transition-colors ${
                    chunk.id === selectedChunk 
                      ? 'bg-manim-blue/20 border-l-2 border-l-manim-blue' 
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => handleSelectChunk(chunk.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{chunk.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{chunk.description}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectChunk(chunk.id);
                      }}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {/* Time indicator */}
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="h-1 w-full bg-white/10 rounded-full">
                      <div className="h-full bg-white/30 rounded-full" style={{ width: '100%' }} />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {chunk.id * 5}s
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Edit panel for selected chunk */}
      {selectedChunk && (
        <Card className="glass-card p-6 mt-6 animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">Edit Chunk: {chunks.find(c => c.id === selectedChunk)?.title}</h3>
          <Tabs defaultValue="prompt">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="prompt">Edit Prompt</TabsTrigger>
              <TabsTrigger value="code">View Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="prompt" className="space-y-4">
              <Textarea 
                placeholder="Describe how you'd like to modify this chunk"
                className="min-h-[120px] bg-transparent border border-white/10"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
              />
              
              <div className="flex items-center justify-between gap-2">
                <div>
                  <Button 
                    className="bg-gradient-to-r from-manim-blue to-manim-purple hover:opacity-90"
                    onClick={handleRegenerateChunk}
                    disabled={isRegenerating}
                  >
                    {isRegenerating ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Regenerating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate Chunk
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedChunk(null)}
                  >
                    Cancel
                  </Button>
                </div>

                <div>
                <Button 
                  className="bg-gradient-to-r from-manim-blue to-manim-purple hover:opacity-90"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <ArrowDown className="mr-2 h-4 w-4" />
                      Download video
                    </>
                  )}
                </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="code">
              <div className="bg-black/50 p-4 rounded-md overflow-auto max-h-[400px]">
                <pre className="text-sm font-mono text-white/80">
                  {chunks.find(c => c.id === selectedChunk)?.code || ""}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </section>
  );
};

export default ResultsSection;
