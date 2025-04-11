
import React from 'react';
import { cn } from '@/lib/utils';
import { Grid3X3 } from 'lucide-react';
import book1 from '../assets/backgrounds/book1.jpeg';
import book2 from '../assets/backgrounds/book2.jpg';
import book3 from '../assets/backgrounds/book3.jpg';
import book4 from '../assets/backgrounds/book4.jpg';
import book5 from '../assets/backgrounds/book5.jpg';
import book6 from '../assets/backgrounds/book6.jpg';
import paper1 from '../assets/backgrounds/paper1.jpg';

interface ImagePickerProps {
  selectedImage: string;
  onChange: (image: string) => void;
  label?: string;
}

export interface BackgroundImage {
  id: string;
  url: string;
  thumbnail: string;
  name: string;
}

export const backgroundImages: BackgroundImage[] = [
  { id: 'canvas-bg-1', url: 'linear-gradient(135deg, #F8F0E3, #EADDCF)', thumbnail: 'linear-gradient(135deg, #F8F0E3, #EADDCF)', name: 'Cream' },
  { id: 'canvas-bg-2', url: 'linear-gradient(135deg, #F8F0E3, #E6C9C9)', thumbnail: 'linear-gradient(135deg, #F8F0E3, #E6C9C9)', name: 'Blush' },
  { id: 'canvas-bg-3', url: 'linear-gradient(135deg, #EFE7DA, #D9E4EC)', thumbnail: 'linear-gradient(135deg, #EFE7DA, #D9E4EC)', name: 'Sky' },
  { id: 'canvas-bg-4', url: 'linear-gradient(135deg, #32292F, #4A3E48)', thumbnail: 'linear-gradient(135deg, #32292F, #4A3E48)', name: 'Dark' },
  { id: 'canvas-bg-5', url: 'linear-gradient(135deg, #8E3B46, #A65154)', thumbnail: 'linear-gradient(135deg, #8E3B46, #A65154)', name: 'Maroon' },
  { id: 'book1', url: `url('https://getbookquotes.vercel.app/_next/static/media/book5.4ab50fc7.jpg')`, thumbnail: book1, name: 'Vintage Book' },
   { id: 'book2', url: `url('https://getbookquotes.vercel.app/_next/static/media/book3.61b073c2.jpg')`, thumbnail: book2, name: 'Dark Book' },
   { id: 'book3', url: `url('https://getbookquotes.vercel.app/_next/static/media/paper1.c5abfec9.jpg')`, thumbnail: book3, name: 'Old Paper' },
   { id: 'book4', url: `url('https://getbookquotes.vercel.app/_next/static/media/book2.989d7c46.jpg')`, thumbnail: book4, name: 'Book Page' },
   { id: 'book5', url: `url('https://getbookquotes.vercel.app/_next/static/media/book6.ebd676df.jpg')`, thumbnail: book5, name: 'White Pages' },
   { id: 'book6', url: `url('https://getbookquotes.vercel.app/_next/static/media/book4.29dd4bfd.jpg')`, thumbnail: book6, name: 'Texture' },
  // { id: 'paper1', url: `url(${paper1})`, thumbnail: paper1, name: 'Parchment' },
];

const ImagePicker: React.FC<ImagePickerProps> = ({
  selectedImage,
  onChange,
  label
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center gap-2">
          <Grid3X3 className="h-4 w-4" />
          <p className="text-sm font-medium">{label}</p>
        </div>
      )}
      <div className="grid grid-cols-4 gap-2">
        {backgroundImages.map((image) => {
          const isGradient = image.id.startsWith('canvas-bg');
          
          return (
            <button
              key={image.id}
              className={cn(
                "aspect-square rounded-md border transition-all overflow-hidden relative",
                selectedImage === image.id ? "ring-2 ring-primary border-primary" : "hover:opacity-90"
              )}
              onClick={() => onChange(image.id)}
              title={image.name}
            >
              {isGradient ? (
                <div 
                  className="w-full h-full" 
                  style={{ background: image.thumbnail }}
                />
              ) : (
                <img 
                  src={image.thumbnail} 
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              )}
              <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                {image.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePicker;
