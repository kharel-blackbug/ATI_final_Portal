import React from 'react';

interface SikkimLogoProps {
  className?: string;
  isDark?: boolean;
}

export default function SikkimLogo({ className = 'w-10 h-10', isDark = false }: SikkimLogoProps) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      className={`${className} transition-transform duration-300 hover:scale-[1.05]`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Rich Gold Gradient for the royal crest boundaries */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF099" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA7C11" />
        </linearGradient>
        
        {/* Heavenly Blue sky background */}
        <radialGradient id="skyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7CC6FE" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>

        {/* Snow mountains gradient */}
        <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Red sun gradient */}
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EF4444" />
        </radialGradient>
      </defs>

      {/* Outer Circle Ring */}
      <circle cx="60" cy="65" r="50" fill="none" stroke="url(#goldGrad)" strokeWidth="3" />
      <circle cx="60" cy="65" r="46" fill={isDark ? "#0c152a" : "#ffffff"} stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="4 2" />

      {/* Inner Sky Globe */}
      <circle cx="60" cy="65" r="38" fill="url(#skyGrad)" />

      {/* Himalayan Peaks (Mt Kanchenjunga) with snow caps */}
      <path d="M 33 80 L 53 50 L 68 70 L 87 45 L 87 80 Z" fill="#475569" />
      
      {/* Front Snow Peaks */}
      <path d="M 33 80 L 53 50 L 60 80 Z" fill="url(#snowGrad)" opacity="0.95" />
      <path d="M 50 80 L 68 70 L 73 80 Z" fill="url(#snowGrad)" opacity="0.8" />
      <path d="M 64 80 L 87 45 L 87 80 Z" fill="url(#snowGrad)" opacity="0.95" />

      {/* Peaceful Radiant Sun above peaks */}
      <circle cx="60" cy="40" r="7" fill="url(#sunGrad)" />
      
      {/* Mystical Crest Cloud arches - representative of traditional Tibetan scrolls */}
      <path d="M 28 65 Q 40 60 52 65" fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M 68 65 Q 80 60 92 65" fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Golden Buddhist Prayer Wheel (Dharmachakra) - base focal of Sikkim seal */}
      <g transform="translate(60, 84)">
        <circle cx="0" cy="0" r="11" fill="#FFFFFF" stroke="url(#goldGrad)" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="3" fill="#EF4444" />
        {/* Spokes */}
        <line x1="0" y1="-11" x2="0" y2="11" stroke="url(#goldGrad)" strokeWidth="1.5" />
        <line x1="-11" y1="0" x2="11" y2="0" stroke="url(#goldGrad)" strokeWidth="1.5" />
        <line x1="-8" y1="-8" x2="8" y2="8" stroke="url(#goldGrad)" strokeWidth="1" />
        <line x1="8" y1="-8" x2="-8" y2="8" stroke="url(#goldGrad)" strokeWidth="1" />
      </g>

      {/* Royal dragons' prayer flags / wings flanking left & right */}
      <path d="M 12 55 Q 26 23 48 24 Q 40 45 22 58 Z" fill="url(#goldGrad)" opacity="0.85" />
      <path d="M 108 55 Q 94 23 72 24 Q 80 45 98 58 Z" fill="url(#goldGrad)" opacity="0.85" />

      {/* Topmost Royal Helmet/Umbrella Crest */}
      <path d="M 50 20 C 50 14 70 14 70 20 Z" fill="url(#goldGrad)" />
      <rect x="58" y="10" width="4" height="10" fill="url(#goldGrad)" rx="1" />
      <circle cx="60" cy="8" r="3" fill="#EF4444" />
      
      {/* Decorative Golden Star anchors */}
      <circle cx="20" cy="22" r="2.5" fill="url(#goldGrad)" />
      <circle cx="100" cy="22" r="2.5" fill="url(#goldGrad)" />
    </svg>
  );
}
