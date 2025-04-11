
import React from 'react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onChange,
  label
}) => {
  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}
      <div className="flex items-center gap-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color}
            className={cn(
              "w-6 h-6 rounded-full transition-transform border",
              selectedColor === color ? "ring-2 ring-primary scale-110" : "ring-0 hover:scale-105"
            )}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
