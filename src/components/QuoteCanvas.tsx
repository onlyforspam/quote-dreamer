
import React, { useRef, useCallback } from 'react';
import { useDraggableText } from '@/hooks/useDraggableText';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { backgroundImages } from './ImagePicker';

interface QuoteCanvasProps {
  quoteText: string;
  authorName: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  textAlign: string;
  backgroundStyle: string;
}

const QuoteCanvas: React.FC<QuoteCanvasProps> = ({
  quoteText,
  authorName,
  fontFamily,
  fontSize,
  fontColor,
  textAlign,
  backgroundStyle
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const { position: quotePosition, handleMouseDown: handleQuoteMouseDown, handleTouchStart: handleQuoteTouchStart } = 
    useDraggableText({ id: 'draggable-quote', initialPosition: { x: 40, y: 40 } });

  const { position: authorPosition, handleMouseDown: handleAuthorMouseDown, handleTouchStart: handleAuthorTouchStart } = 
    useDraggableText({ id: 'draggable-author', initialPosition: { x: 40, y: 150 } });
  
  const resetPositions = () => {
    if (canvasRef.current) {
      const width = canvasRef.current.offsetWidth;
      const height = canvasRef.current.offsetHeight;
      
      // Center the quote
      const quoteElement = document.getElementById('draggable-quote');
      const authorElement = document.getElementById('draggable-author');
      
      if (quoteElement && authorElement) {
        const centerX = width / 2;
        const centerY = height / 2;
        
        handleQuoteMouseDown({ 
          clientX: centerX - quoteElement.offsetWidth / 2,
          clientY: centerY - 50
        } as React.MouseEvent);
        
        handleAuthorMouseDown({ 
          clientX: centerX - authorElement.offsetWidth / 2, 
          clientY: centerY + 50
        } as React.MouseEvent);
      }
      
      toast.success("Quote position reset");
    }
  };

  const downloadImage = useCallback(() => {
    if (canvasRef.current) {
      import('html-to-image').then(({ toPng }) => {
        toPng(canvasRef.current!, { quality: 0.95 })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'book-quote.png';
            link.href = dataUrl;
            link.click();
            toast.success("Image downloaded successfully!");
          })
          .catch((error) => {
            console.error('Error generating image:', error);
            toast.error("Failed to download image");
          });
      });
    }
  }, []);

  const selectedBackground = backgroundImages.find(bg => bg.id === backgroundStyle) || backgroundImages[0];
  const backgroundStyle1 = backgroundStyle.startsWith('canvas-bg') 
    ? { background: selectedBackground.url } 
    : { backgroundImage: selectedBackground.url, backgroundSize: 'cover', backgroundPosition: 'center' };

  return (
    <div className="space-y-4 w-full">
      <div 
        ref={canvasRef} 
        className={`canvas-container w-full aspect-[4/3] sm:aspect-[3/2]`}
        style={backgroundStyle1}
      >
        <div
          id="draggable-quote"
          className={`draggable-text max-w-[80%] ${fontFamily} ${textAlign}`}
          style={{ 
            fontSize: `${fontSize}px`, 
            color: fontColor, 
            left: `${quotePosition.x}px`, 
            top: `${quotePosition.y}px`,
            textShadow: !backgroundStyle.startsWith('canvas-bg') ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
          }}
          onMouseDown={handleQuoteMouseDown}
          onTouchStart={handleQuoteTouchStart}
        >
          {quoteText || "Enter your quote..."}
        </div>

        {authorName && (
          <div
            id="draggable-author"
            className={`draggable-text ${fontFamily} ${textAlign}`}
            style={{ 
              fontSize: `${Math.max(16, fontSize * 0.7)}px`, 
              color: fontColor,
              opacity: 0.85,
              left: `${authorPosition.x}px`, 
              top: `${authorPosition.y}px`,
              textShadow: !backgroundStyle.startsWith('canvas-bg') ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
            }}
            onMouseDown={handleAuthorMouseDown}
            onTouchStart={handleAuthorTouchStart}
          >
            {"— " + authorName}
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <Button variant="outline" onClick={resetPositions} className="flex gap-2 items-center">
          <RefreshCw size={16} />
          Reset Position
        </Button>
        <Button onClick={downloadImage} className="flex gap-2 items-center">
          <Download size={16} />
          Download Image
        </Button>
      </div>
    </div>
  );
};

export default QuoteCanvas;
