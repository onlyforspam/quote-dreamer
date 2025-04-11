import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export interface DraggableTextProps {
  id: string;
  initialPosition: Position;
}

export const useDraggableText = ({ id, initialPosition }: DraggableTextProps) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [id]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
  }, [id]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const canvas = document.querySelector('.canvas-container');
      if (canvas) {
        const canvasRect = canvas.getBoundingClientRect();
        
        // Calculate new position relative to the canvas
        let newX = e.clientX - canvasRect.left - dragOffset.x;
        let newY = e.clientY - canvasRect.top - dragOffset.y;
        
        const element = document.getElementById(id);
        if (element) {
          const elementWidth = element.offsetWidth;
          const elementHeight = element.offsetHeight;
          
          // Keep the element within the canvas bounds
          newX = Math.max(0, Math.min(newX, canvasRect.width - elementWidth));
          newY = Math.max(0, Math.min(newY, canvasRect.height - elementHeight));
          
          setPosition({ x: newX, y: newY });
        }
      }
    }
  }, [isDragging, dragOffset, id]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      const canvas = document.querySelector('.canvas-container');
      if (canvas) {
        const canvasRect = canvas.getBoundingClientRect();
        
        // Calculate new position relative to the canvas
        let newX = touch.clientX - canvasRect.left - dragOffset.x;
        let newY = touch.clientY - canvasRect.top - dragOffset.y;
        
        const element = document.getElementById(id);
        if (element) {
          const elementWidth = element.offsetWidth;
          const elementHeight = element.offsetHeight;
          
          // Keep the element within the canvas bounds
          newX = Math.max(0, Math.min(newX, canvasRect.width - elementWidth));
          newY = Math.max(0, Math.min(newY, canvasRect.height - elementHeight));
          
          setPosition({ x: newX, y: newY });
        }
      }
    }
  }, [isDragging, dragOffset, id]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return {
    position,
    isDragging,
    handleMouseDown,
    handleTouchStart,
    setPosition
  };
};
