import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

// Map keywords in titles to stunning reliable Unsplash assets
function getAssetFallback(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('public administration') || t.includes('governance')) {
    return 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800';
  }
  if (t.includes('ethics') || t.includes('citizen')) {
    return 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800';
  }
  if (t.includes('rules') || t.includes('conduct') || t.includes('sikkim civil')) {
    return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800';
  }
  if (t.includes('performance') || t.includes('productivity') || t.includes('management')) {
    return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800';
  }
  if (t.includes('security') || t.includes('cyber')) {
    return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800';
  }
  if (t.includes('disaster') || t.includes('earthquake') || t.includes('landslide') || t.includes('crisis')) {
    return 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800';
  }
  if (t.includes('finance') || t.includes('treasury') || t.includes('gst')) {
    return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800';
  }
  return 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800';
}

export default function ProgressiveImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  placeholderColor = 'bg-slate-200'
}: ProgressiveImageProps) {
  const [activeSrc, setActiveSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    
    // Proactively replace lh3.googleusercontent urls if we want guaranteed stunning load
    const isGoogleUrl = src.includes('googleusercontent.com');
    const loadUrl = isGoogleUrl ? getAssetFallback(alt) : src;
    setActiveSrc(loadUrl);

    const img = new Image();
    img.src = loadUrl;
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      if (!hasFailedOnce) {
        setHasFailedOnce(true);
        const fallback = getAssetFallback(alt);
        setActiveSrc(fallback);
        
        // Try loading the fallback
        const fbImg = new Image();
        fbImg.src = fallback;
        fbImg.onload = () => setIsLoaded(true);
      } else {
        setIsLoaded(true); // stop spinning
      }
    };
  }, [src, alt]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-900 flex items-center justify-center">
      {/* 1. Shimmering placeholder / skeleton */}
      <AnimatePresence mode="popLayout">
        {!isLoaded && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 z-10 flex items-center justify-center ${placeholderColor} overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            <div className="w-6 h-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Target high-resolution image */}
      <motion.img
        src={activeSrc}
        alt={alt}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          scale: isLoaded ? 1 : 1.04 
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={className}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
