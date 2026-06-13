import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface PerspectiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function PerspectiveCard({ children, className = '', onClick }: PerspectiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for x/y mouse positions relative to center of the card
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Set up smooth physics springs
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Subtle lift translate spring
  const liftY = useMotionValue(0);
  const liftYSpring = useSpring(liftY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    
    // Width and height
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card element top-left
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Translate to center coordinates
    const centerX = width / 2;
    const centerY = height / 2;

    // Normalised position between -1 and 1
    const x = (mouseX - centerX) / centerX;
    const y = (mouseY - centerY) / centerY;

    // Calculate elegant rotation amplitudes (max 8 degrees tilt)
    const maxRotate = 8;
    
    rotateX.set(-y * maxRotate);
    rotateY.set(x * maxRotate);
    liftY.set(-6); // subtle upward lift when hovered
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    liftY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        y: liftYSpring,
        transformStyle: 'preserve-3d',
      }}
      className={`perspective-1000 will-change-transform cursor-pointer transition-shadow ${className}`}
    >
      <div 
        style={{ transform: 'translateZ(15px)' }} 
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
