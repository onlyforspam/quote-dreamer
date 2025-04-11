
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import QuoteCanvas from '@/components/QuoteCanvas';
import TextControls from '@/components/TextControls';
import StyleControls from '@/components/StyleControls';
import { Separator } from '@/components/ui/separator';
import { Book } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [quoteText, setQuoteText] = useState("The world breaks everyone, and afterward, many are strong at the broken places.");
  const [authorName, setAuthorName] = useState("Ernest Hemingway");
  
  // Quote styling
  const [fontFamily, setFontFamily] = useState("font-serif");
  const [fontSize, setFontSize] = useState(28);
  const [fontColor, setFontColor] = useState("#32292F");
  const [textAlign, setTextAlign] = useState("text-center");
  const [textRotation, setTextRotation] = useState(0);
  
  // Author styling
  const [authorFontFamily, setAuthorFontFamily] = useState("font-serif");
  const [authorFontSize, setAuthorFontSize] = useState(22);
  const [authorFontColor, setAuthorFontColor] = useState("#32292F");
  const [authorTextAlign, setAuthorTextAlign] = useState("text-center");
  const [authorRotation, setAuthorRotation] = useState(0);
  
  // Background
  const [backgroundStyle, setBackgroundStyle] = useState("canvas-bg-1");

  // Show welcome toast
  React.useEffect(() => {
    toast("Welcome to Quote Dreamer!", {
      description: "Create beautiful book quotes by dragging text to position it perfectly.",
      duration: 5000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Book className="h-8 w-8 text-book-maroon" />
            <h1 className="text-3xl font-serif font-bold text-book-charcoal">Quote Dreamer</h1>
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Create beautiful images with your favorite book quotes. 
            Customize text style, position, and background.
          </p>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          <Card className="shadow-md bg-white">
            <CardContent className="pt-6">
              <QuoteCanvas
                quoteText={quoteText}
                authorName={authorName}
                
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontColor={fontColor}
                textAlign={textAlign}
                textRotation={textRotation}
                
                authorFontFamily={authorFontFamily}
                authorFontSize={authorFontSize}
                authorFontColor={authorFontColor}
                authorTextAlign={authorTextAlign}
                authorRotation={authorRotation}
                
                backgroundStyle={backgroundStyle}
              />
            </CardContent>
          </Card>

          <Card className="shadow-md bg-white">
            <CardContent className="pt-6 space-y-6">
              <TextControls
                quoteText={quoteText}
                setQuoteText={setQuoteText}
                authorName={authorName}
                setAuthorName={setAuthorName}
              />

              <Separator />

              <StyleControls
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                fontSize={fontSize}
                setFontSize={setFontSize}
                fontColor={fontColor}
                setFontColor={setFontColor}
                textAlign={textAlign}
                setTextAlign={setTextAlign}
                textRotation={textRotation}
                setTextRotation={setTextRotation}
                
                authorFontFamily={authorFontFamily}
                setAuthorFontFamily={setAuthorFontFamily}
                authorFontSize={authorFontSize}
                setAuthorFontSize={setAuthorFontSize}
                authorFontColor={authorFontColor}
                setAuthorFontColor={setAuthorFontColor}
                authorTextAlign={authorTextAlign}
                setAuthorTextAlign={setAuthorTextAlign}
                authorRotation={authorRotation}
                setAuthorRotation={setAuthorRotation}
                
                backgroundStyle={backgroundStyle}
                setBackgroundStyle={setBackgroundStyle}
              />
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Drag text elements to position them perfectly on your image.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
