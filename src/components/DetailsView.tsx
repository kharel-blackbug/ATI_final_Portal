import React, { useState } from 'react';
import { Course } from '../types';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Clock, Award, ZoomIn, ChevronLeft, ChevronRight, Share2, Shield, Heart } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

interface DetailsViewProps {
  course: Course;
  onGoBack: () => void;
  onInterested: (courseId: string) => void;
  hasApplied: boolean;
}

// Gallery fallbacks for interactive horizontal swipe preview
function getGalleryImages(category: string, mainImage: string): string[] {
  // Proactively generate 3 beautiful Unsplash assets matching content
  const c = category.toLowerCase();
  let img1 = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800'; // Sikkim Himalayan
  let img2 = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800'; // Active Seminar
  let img3 = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'; // Digital Technology

  if (c.includes('finance')) {
    img1 = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800';
    img2 = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800';
    img3 = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800';
  } else if (c.includes('disaster')) {
    img1 = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800';
    img2 = 'https://images.unsplash.com/photo-1533240332867-cb9c6eed241d?auto=format&fit=crop&q=80&w=800';
    img3 = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800';
  } else if (c.includes('security') || c.includes('digital') || c.includes('it')) {
    img1 = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800';
    img2 = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800';
    img3 = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800';
  }

  return [mainImage, img1, img2, img3];
}

export default function DetailsView({
  course,
  onGoBack,
  onInterested,
  hasApplied
}: DetailsViewProps) {
  const images = getGalleryImages(course.category, course.image);
  
  // Gallery state hooks
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [liked, setLiked] = useState(false);

  // Motion state variables for vertical swipe-down drag-to-close behavior
  const dragY = useMotionValue(0);
  const opacity = useTransform(dragY, [-180, 0, 180], [0.4, 1, 0.4]);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Lightbox swipe handlers
  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
    setLightboxScale(1); // reset zoom scaling on slide switch
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    setLightboxScale(1);
  };

  const handleDragEnd = (_event: any, info: any) => {
    // If vertical deflection exceeds 120px, slide close the lightbox
    if (Math.abs(info.offset.y) > 120) {
      setShowLightbox(false);
      setLightboxScale(1);
    }
  };

  const toggleLiked = () => {
    setLiked(!liked);
  };

  return (
    <motion.div 
      layoutId={`course-card-${course.id}`} // Fluid shared element transition link!
      className="pt-24 pb-16 bg-[#fafbfc] min-h-screen text-slate-900 font-sans"
    >
      <main className="w-full max-w-5xl mx-auto px-4 md:px-8 space-y-6">
        
        {/* Breadcrumb style Navigation line */}
        <div className="flex items-center justify-between bg-white border border-slate-200 px-5 py-3.5 rounded-2xl shadow-xs">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 text-xs font-black text-primary hover:text-primary-container transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Academic Directory
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase text-secondary tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-250 px-2.5 py-1 rounded-full">
              {course.category}
            </span>
            <button 
              onClick={toggleLiked} 
              className="p-1.5 focus:scale-110 active:scale-95 text-rose-500 transition-transform cursor-pointer"
            >
              <Heart className={`w-4.5 h-4.5 ${liked ? 'fill-rose-500' : ''}`} />
            </button>
            <button 
              onClick={() => alert(`Registration details referenced: ${window.location.origin}/courses/${course.id}`)}
              className="p-1.5 hover:bg-slate-100 rounded text-stone-500 transition-colors cursor-pointer"
              title="Copy State Registry Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Major details column division */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* L. Primary columns */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="space-y-3 text-left">
              <span className="bg-primary/10 text-primary border border-primary/25 font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-md">
                {course.badges[0] || 'CRITICAL QUALIFICATION'}
              </span>
              
              <h1 className="font-heading text-xl md:text-2xl lg:text-3xl font-black text-slate-800 leading-tight tracking-tight">
                {course.title}
              </h1>
              
              <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-medium">
                {course.description}
              </p>
            </div>

            {/* INTERACTIVE GALLERY SLIDESHOW SCREEN (Direction-aware swipes, zoom trigger) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Interactive Campus Gallery</span>
                <span className="text-[10px] font-bold text-slate-400">Slide {activeImageIndex + 1} of {images.length}</span>
              </div>

              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 group">
                <ProgressiveImage
                  src={images[activeImageIndex]}
                  alt="Sikkim ATI Campus View"
                  className="w-full h-full object-cover select-none"
                />

                {/* Left/Right click triggers */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/75 backdrop-blur-md hover:bg-white text-slate-800 p-2 rounded-full cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/75 backdrop-blur-md hover:bg-white text-slate-800 p-2 rounded-full cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Immersive location footer badge */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 rounded-xl text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold leading-none">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {course.location || 'Main Auditorium, ATI West Complex, Gangtok'}
                  </div>
                  
                  {/* Zoom full screen button */}
                  <button
                    onClick={() => {
                      setLightboxIndex(activeImageIndex);
                      setShowLightbox(true);
                    }}
                    className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer shadow"
                  >
                    <ZoomIn className="w-3 h-3" /> Zoom Full
                  </button>
                </div>
              </div>

              {/* Little interactive thumbs list */}
              <div className="grid grid-cols-4 gap-2.5">
                {images.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-12 md:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-primary scale-[1.03] shadow' : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    <ProgressiveImage src={thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Syllabus Section */}
            <div className="space-y-4 text-left">
              <h2 className="font-heading text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-2">
                Program Syllabus & Directives Overview
              </h2>
              
              <div className="text-xs text-stone-500 space-y-4 leading-relaxed font-sans font-medium">
                {course.longDescription && course.longDescription.length > 0 ? (
                  course.longDescription.map((desc, i) => <p key={i}>{desc}</p>)
                ) : (
                  <>
                    <p>
                      This structured framework represents a core strategic competency directive of the state secretariat. In coordination with national and state departments, the module establishes procedural frameworks needed to maintain high organizational ethics, complete financial records audits, and design regional resilience schedules under extreme constraints.
                    </p>
                    <p>
                      Civil servants learn practical diagnostics through active simulation rooms, resolving case issues regarding gazetted authority constraints, landslide/earthquake protocols, and transparent disbursement tracking systems.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Key Objectives Bullet list */}
            <div className="space-y-4 text-left">
              <h3 className="font-heading text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-2">
                Primary Course Milestones & Directives
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.objectives && course.objectives.length > 0 ? (
                  course.objectives.map((obj, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-xs text-stone-500 font-sans font-medium bg-white p-3 rounded-xl border border-slate-200">
                      <Award className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span className="leading-snug">{obj}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex gap-2.5 items-start text-xs text-stone-500 font-sans font-medium bg-white p-3 rounded-xl border border-slate-200">
                      <Award className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span className="leading-snug">Design, implement and evaluate decentralized programs effectively.</span>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs text-stone-500 font-sans font-medium bg-white p-3 rounded-xl border border-slate-200">
                      <Award className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span className="leading-snug">Assess financial reporting compliance issues using statutory metrics.</span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* R. Parameter / audit sidebar */}
          <div className="space-y-6">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs divide-y divide-slate-150">
              
              <div className="pb-4 text-left">
                <div className="flex items-center gap-1.5 text-xs text-primary font-black uppercase tracking-wider mb-2">
                  <Shield className="w-4 h-4" />
                  State Personnel Audit
                </div>
                <p className="text-[10px] text-stone-400 italic leading-snug">
                  Integrated with Central Department pay registries. Qualified certificate grants require 80% passing metrics.
                </p>
              </div>

              {/* Deadline */}
              <div className="py-4 text-left space-y-1">
                <span className="text-[9px] font-black uppercase text-stone-400 tracking-wider">Enrollment Threshold</span>
                <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm font-sans">
                  <Calendar className="w-4 h-4" />
                  {course.deadline}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="py-4 text-left space-y-1">
                <span className="text-[9px] font-black uppercase text-stone-400 tracking-wider">Service Requirements</span>
                <p className="text-xs text-slate-800 font-bold leading-relaxed">
                  {course.prerequisites}
                </p>
              </div>

              {/* Duration */}
              <div className="py-4 text-left space-y-1">
                <span className="text-[9px] font-black uppercase text-stone-400 tracking-wider">Syllabus Span</span>
                <div className="flex items-center gap-2 text-slate-700 font-bold text-xs">
                  <Clock className="w-4 h-4 text-primary" />
                  {course.duration}
                </div>
              </div>

              {/* Instructor */}
              <div className="py-4 text-left space-y-2">
                <span className="text-[9px] font-black uppercase text-stone-400 tracking-wider block">Faculty Chair</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    {course.facultyAvatar ? (
                      <ProgressiveImage src={course.facultyAvatar} alt={course.faculty} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary text-on-primary font-bold flex items-center justify-center text-xs">
                        {course.faculty.split(' ').map(p => p[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 leading-none">{course.faculty}</p>
                    <p className="text-[9px] text-stone-500 mt-1 leading-tight font-medium">{course.facultyTitle || 'Advisor, Department of Personnel'}</p>
                  </div>
                </div>
              </div>

              {/* Enrollment Trigger */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={() => onInterested(course.id)}
                  className={`w-full py-3.5 px-6 rounded-xl text-xs font-black uppercase tracking-wider transition-all scale-100 active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                    hasApplied
                      ? 'bg-secondary text-on-secondary hover:bg-secondary/90'
                      : 'bg-primary text-on-primary hover:bg-opacity-95'
                  }`}
                >
                  <span>{hasApplied ? 'Expression Sent Successfully' : "Request Enrollment Info"}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
                
                <span className="block text-center text-[9px] text-stone-400 italic">
                  {hasApplied ? 'Verified token dispatched to State secretariat.' : "Clicking 'Request' pre-fills the Expression of Interest."}
                </span>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* 7. IMMERSIVE CONTEXTUAL LIGHTBOX (Drag vertical, swipe horizontal list, zoom scale) */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#090b11]/95 backdrop-blur-xl z-[100] flex flex-col justify-between p-4 md:p-6"
          >
            {/* Header control */}
            <div className="flex justify-between items-center text-white p-2">
              <div className="text-left">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#fbbf24]">Sikkim State Registry View</h4>
                <p className="text-[10px] text-slate-400 font-semibold">{course.title}</p>
              </div>
              <button
                onClick={() => {
                  setShowLightbox(false);
                  setLightboxScale(1);
                }}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 text-xs font-extrabold cursor-pointer"
                title="Dismiss (Swipe down to close)"
              >
                ✕ Close
              </button>
            </div>

            {/* Immersive core canvas: features DRAG-Y back and DRAG-X swipe simulation */}
            <div className="relative flex-grow flex items-center justify-center overflow-hidden max-w-4xl mx-auto w-full">
              
              {/* Swipe Left navigation */}
              <button
                onClick={handleLightboxPrev}
                className="absolute left-2 z-20 bg-white/10 hover:bg-white/20 hover:scale-105 text-white p-3 rounded-full cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <motion.div
                drag="y" // Drag vertically down to close!
                dragConstraints={{ top: 0, bottom: 250 }}
                dragElastic={0.4}
                onDragEnd={handleDragEnd}
                style={{ y: dragY, opacity }}
                className="relative select-none max-h-[70vh] w-full flex items-center justify-center cursor-ns-resize"
              >
                <motion.div 
                  animate={{ scale: lightboxScale }} 
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="rounded-2xl overflow-hidden border border-white/10 max-w-full shadow-2xl relative bg-slate-950"
                >
                  <img
                    src={images[lightboxIndex]}
                    alt="Lightbox Gallery render"
                    className="max-h-[60vh] max-w-full object-contain pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle info pill on image */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#fbbf24]">
                    #{lightboxIndex + 1} • {course.category}
                  </div>
                </motion.div>
              </motion.div>

              {/* Swipe Right navigation */}
              <button
                onClick={handleLightboxNext}
                className="absolute right-2 z-20 bg-white/10 hover:bg-white/20 hover:scale-105 text-white p-3 rounded-full cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* Footer controls: pinch instructions and thumbs indicators */}
            <div className="space-y-4 text-center text-white">
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setLightboxScale((s) => Math.max(s - 0.25, 0.75))}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-black uppercase cursor-pointer"
                >
                  Zoom Out
                </button>
                <button
                  onClick={() => setLightboxScale((s) => Math.min(s + 0.25, 2.5))}
                  className="px-3.5 py-1.5 bg-[#fbbf24] hover:bg-[#d97706] text-black rounded-lg text-[10px] font-black uppercase cursor-pointer"
                >
                  Pinch / Zoom In
                </button>
              </div>

              <div className="text-[10px] text-slate-400 max-w-md mx-auto leading-relaxed">
                💡 Physical Gestures: Mobile users can swipe left/right to browse slides, zoom with controls, or <strong className="text-white hover:underline cursor-pointer" onClick={() => setShowLightbox(false)}>drag vertically down</strong> to dismiss this immersive portal instantly.
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
