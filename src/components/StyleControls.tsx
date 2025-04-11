
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import ColorPicker from './ColorPicker';

interface StyleControlsProps {
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  textAlign: string;
  setTextAlign: (align: string) => void;
  backgroundStyle: string;
  setBackgroundStyle: (style: string) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
  textAlign,
  setTextAlign,
  backgroundStyle,
  setBackgroundStyle
}) => {
  const fontColors = ["#000000", "#FFFFFF", "#8E3B46", "#6E4C1E", "#32292F", "#4A76A8"];

  const fontOptions = [
    { value: 'font-serif', label: 'Serif' },
    { value: 'font-sans', label: 'Sans' },
    { value: 'font-handwriting', label: 'Script' },
  ];

  const alignOptions = [
    { value: 'text-left', label: 'Left' },
    { value: 'text-center', label: 'Center' },
    { value: 'text-right', label: 'Right' },
  ];

  const backgroundOptions = [
    { value: 'canvas-bg-1', label: 'Cream' },
    { value: 'canvas-bg-2', label: 'Blush' },
    { value: 'canvas-bg-3', label: 'Sky' },
    { value: 'canvas-bg-4', label: 'Dark' },
    { value: 'canvas-bg-5', label: 'Maroon' },
  ];

  return (
    <div className="w-full">
      <Tabs defaultValue="text">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="text">Text Style</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Font</Label>
            <div className="grid grid-cols-3 gap-2">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  className={`p-2 ${font.value} border rounded-md text-center transition-colors ${
                    fontFamily === font.value 
                      ? 'bg-secondary/20 border-secondary' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setFontFamily(font.value)}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Text Size</Label>
              <span className="text-xs text-muted-foreground">{fontSize}px</span>
            </div>
            <Slider
              value={[fontSize]}
              min={16}
              max={72}
              step={1}
              onValueChange={(value) => setFontSize(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Text Alignment</Label>
            <div className="grid grid-cols-3 gap-2">
              {alignOptions.map((align) => (
                <button
                  key={align.value}
                  className={`p-2 border rounded-md text-center transition-colors ${
                    textAlign === align.value 
                      ? 'bg-secondary/20 border-secondary' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setTextAlign(align.value)}
                >
                  {align.label}
                </button>
              ))}
            </div>
          </div>

          <ColorPicker
            colors={fontColors}
            selectedColor={fontColor}
            onChange={setFontColor}
            label="Text Color"
          />
        </TabsContent>

        <TabsContent value="background" className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Background Style</Label>
            <div className="grid grid-cols-2 gap-2">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.value}
                  className={`p-2 h-14 border rounded-md ${bg.value} transition-colors ${
                    backgroundStyle === bg.value 
                      ? 'ring-2 ring-primary' 
                      : 'hover:opacity-90'
                  }`}
                  onClick={() => setBackgroundStyle(bg.value)}
                >
                  <span className={`${bg.value === 'canvas-bg-4' || bg.value === 'canvas-bg-5' ? 'text-white' : 'text-book-charcoal'}`}>
                    {bg.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StyleControls;
