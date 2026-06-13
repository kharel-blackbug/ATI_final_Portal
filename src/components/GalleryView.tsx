import React, { useState, useMemo } from 'react';
import { CompletedTraining } from '../types';
import { motion } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Users, 
  Clock, 
  Sparkles, 
  Tag, 
  RefreshCw, 
  Award,
  BookOpen
} from 'lucide-react';

interface GalleryViewProps {
  completedTrainings: CompletedTraining[];
  user: { isAdmin?: boolean };
  onNavigateToConsole?: () => void;
}

export default function GalleryView({ 
  completedTrainings, 
  user,
  onNavigateToConsole 
}: GalleryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 1. Extract dynamic tags and calculate frequency counts to drive the implied font size tag cloud
  const { tagCounts, maxCount } = useMemo(() => {
    const counts: { [tag: string]: number } = {};
    completedTrainings.forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((t) => {
          counts[t] = (counts[t] || 0) + 1;
        });
      }
    });
    
    const countValues = Object.values(counts);
    const max = countValues.length > 0 ? Math.max(...countValues) : 1;
    
    return { tagCounts: counts, maxCount: max };
  }, [completedTrainings]);

  // 2. Map word counts to font sizing (implied visual importance)
  const getImpliedTagStyle = (count: number, isSelected: boolean) => {
    if (isSelected) {
      return {
        className: 'bg-primary text-on-primary font-black shadow-md border-primary ring-2 ring-primary/20 scale-105',
        fontSize: 'text-sm md:text-base px-4 py-2'
      };
    }

    const ratio = count / maxCount;
    if (ratio >= 0.8) {
      return {
        className: 'bg-amber-50 text-amber-900 border-amber-300 font-black hover:bg-amber-100/60 hover:border-amber-400',
        fontSize: 'text-xs md:text-base px-3.5 py-1.5'
      };
    } else if (ratio >= 0.5) {
      return {
        className: 'bg-emerald-50 text-emerald-900 border-emerald-300 font-extrabold hover:bg-emerald-100/60 hover:border-emerald-400',
        fontSize: 'text-xs md:text-sm px-3 py-1.5'
      };
    } else if (ratio >= 0.3) {
      return {
        className: 'bg-indigo-50/70 text-indigo-900 border-indigo-200 font-bold hover:bg-indigo-100/60 hover:border-indigo-300',
        fontSize: 'text-[11px] md:text-xs px-2.5 py-1'
      };
    } else {
      return {
        className: 'bg-slate-50 text-slate-800 border-slate-200 font-semibold hover:bg-slate-100 hover:border-slate-300',
        fontSize: 'text-[10px] md:text-xs px-2.5 py-1'
      };
    }
  };

  // 3. Dynamic Filtering based on search query and selected tag cloud filter
  const filteredTrainings = useMemo(() => {
    return completedTrainings.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !selectedTag || (item.tags && item.tags.includes(selectedTag));
      
      return matchesSearch && matchesTag;
    });
  }, [completedTrainings, searchQuery, selectedTag]);

  // Total summary statistics
  const totalOfficersTrained = useMemo(() => {
    return completedTrainings.reduce((sum, item) => sum + item.participantsCount, 0);
  }, [completedTrainings]);

  return (
    <main className="pt-24 pb-16 px-4 md:px-10 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Page Title Header */}
      <div className="border-l-4 border-[#002540] pl-6 py-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-xl md:text-2xl font-extrabold text-[#002540] mb-2">
            Completed Trainings & Alumni Gallery
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Review detailed reports, photographic archives, and key indicators of state programs successfully concluded at the Sikkim Administrative Training Institute.
          </p>
        </div>
        
        {user.isAdmin && onNavigateToConsole && (
          <button
            onClick={onNavigateToConsole}
            className="self-start md:self-center bg-[#002540] hover:bg-[#001729] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer leading-none"
          >
            <Sparkles className="w-3.5 h-3.5" /> Manage Completed Database
          </button>
        )}
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4.5">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Completed Programs</span>
            <span className="text-lg font-black text-slate-850 font-heading leading-none block mt-1">{completedTrainings.length} Modules</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Certified Alumni</span>
            <span className="text-lg font-black text-slate-850 font-heading leading-none block mt-1">{totalOfficersTrained} Officers</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4.5">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">State Accreditation</span>
            <span className="text-lg font-black text-slate-850 font-heading leading-none block mt-1">100% Verified</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE IMPLYING TAG CLOUD */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex justify-between items-center pb-2.5 border-b border-light-separator">
          <h3 className="text-[11px] font-black uppercase tracking-wider text-[#002540] flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-600" /> Administrative Competency Tag Cloud
          </h3>
          {(selectedTag || searchQuery) && (
            <button
              onClick={() => {
                setSelectedTag(null);
                setSearchQuery('');
              }}
              className="text-[10px] font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 hover:underline transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Clear Active Filters
            </button>
          )}
        </div>

        <p className="text-[11px] text-slate-500 italic max-w-xl">
          💡 <strong>Tag Cloud Sizing Guide:</strong> The font sizes below dynamically expand or contract based on training frequency in our academic curriculum.
        </p>

        {/* Dynamic Tag Cloud list layout */}
        <div className="flex flex-wrap gap-2.5 justify-center items-center py-4 px-2 min-h-[100px] border border-dashed border-slate-150 rounded-xl bg-slate-50/55">
          {Object.keys(tagCounts).map((tag) => {
            const isSelected = selectedTag === tag;
            const style = getImpliedTagStyle(tagCounts[tag], isSelected);

            return (
              <motion.button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-all border rounded-xl flex items-center gap-1 shadow-2xs cursor-pointer ${style.fontSize} ${style.className}`}
              >
                <span>#{tag}</span>
                <span className="text-[9px] bg-white/50 text-slate-700 px-1.5 py-0.2 rounded-full font-bold ml-1">
                  {tagCounts[tag]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Live search input field */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search completed trainings by title, details description or sponsor department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#002540] focus:border-[#002540]"
          />
        </div>
        <div className="text-[11px] text-slate-500 font-medium shrink-0 self-center">
          Showing <strong className="text-[#002540]">{filteredTrainings.length}</strong> of {completedTrainings.length} reports
        </div>
      </div>

      {/* Grid displaying the completed trainings list */}
      {filteredTrainings.length === 0 ? (
        <div className="bg-white border border-slate-200 p-12 rounded-2xl text-center space-y-3">
          <Users className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="font-bold text-slate-800 text-sm">No completed trainings match your parameters.</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query or selecting another dynamic competency tag from the tag cloud above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTrainings.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card visual header */}
              <div className="h-44 relative bg-slate-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Department badge overlay */}
                <span className="absolute top-4 left-4 text-[9px] font-black uppercase text-white bg-[#002540]/90 border border-white/25 px-2.5 py-1 rounded-md backdrop-blur-xs tracking-wider shadow-sm">
                  {item.department}
                </span>

                {/* Duration overlay */}
                <span className="absolute bottom-4 right-4 text-[9.5px] font-bold text-slate-800 bg-white/95 px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.duration}
                </span>
              </div>

              {/* Card body contents */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Concluded Date: {item.completionDate}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {/* Trained count footprint */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-semibold bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-md">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Trained: {item.participantsCount} Gazetted Officers</span>
                  </div>

                  {/* Badges container */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((t) => (
                      <span 
                        key={t} 
                        onClick={() => setSelectedTag(t)}
                        className="text-[9.5px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors px-2 py-0.5 rounded cursor-pointer"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
