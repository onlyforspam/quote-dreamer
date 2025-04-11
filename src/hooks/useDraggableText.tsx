import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export interface DraggableTextProps {
  id: string;
  initialPosition: Position;
  initialRotation?: number;
  onRotationChange?: (rotation: number) => void;
}

export const useDraggableText = ({ 
  id, 
  initialPosition, 
  initialRotation = 0,
  onRotationChange 
}: DraggableTextProps) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(initialRotation);
  
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

  const handleRotateStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);
  }, []);

  const handleRotateTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    setIsRotating(true);
  }, []);

  const calculateAngle = useCallback((centerX: number, centerY: number, pointX: number, pointY: number) => {
    return Math.atan2(pointY - centerY, pointX - centerX) * (180 / Math.PI);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = document.querySelector('.canvas-container');
    if (!canvas) return;
    
    const canvasRect = canvas.getBoundingClientRect();
    const element = document.getElementById(id);
    if (!element) return;
    
    if (isDragging) {
      let newX = e.clientX - canvasRect.left - dragOffset.x;
      let newY = e.clientY - canvasRect.top - dragOffset.y;
      
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;
      
      newX = Math.max(0, Math.min(newX, canvasRect.width - elementWidth));
      newY = Math.max(0, Math.min(newY, canvasRect.height - elementHeight));
      
      setPosition({ x: newX, y: newY });
    } 
    else if (isRotating) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const newRotation = calculateAngle(centerX, centerY, e.clientX, e.clientY) + 90;
      setRotation(newRotation);
      
      if (onRotationChange) {
        onRotationChange(newRotation);
      }
    }
  }, [isDragging, isRotating, dragOffset, id, calculateAngle, onRotationChange]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    const canvas = document.querySelector('.canvas-container');
    if (!canvas) return;
    
    const canvasRect = canvas.getBoundingClientRect();
    const element = document.getElementById(id);
    if (!element) return;
    
    if (isDragging) {
      let newX = touch.clientX - canvasRect.left - dragOffset.x;
      let newY = touch.clientY - canvasRect.top - dragOffset.y;
      
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;
      
      newX = Math.max(0, Math.min(newX, canvasRect.width - elementWidth));
      newY = Math.max(0, Math.min(newY, canvasRect.height - elementHeight));
      
      setPosition({ x: newX, y: newY });
    } 
    else if (isRotating) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const newRotation = calculateAngle(centerX, centerY, touch.clientX, touch.clientY) + 90;
      setRotation(newRotation);
      
      if (onRotationChange) {
        onRotationChange(newRotation);
      }
    }
  }, [isDragging, isRotating, dragOffset, id, calculateAngle, onRotationChange]);

  const handleUp = useCallback(() => {
    setIsDragging(false);
    setIsRotating(false);
  }, []);

  useEffect(() => {
    if (isDragging || isRotating) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, isRotating, handleMouseMove, handleUp, handleTouchMove]);

  return {
    position,
    rotation,
    isDragging,
    isRotating,
    handleMouseDown,
    handleTouchStart,
    handleRotateStart,
    handleRotateTouchStart,
    setPosition,
    setRotation
  };
};
