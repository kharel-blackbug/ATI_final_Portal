import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface WordCloudProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  filterTag: string;
  setFilterTag: (tag: string) => void;
  showOnlyMyApplications: boolean;
  setShowOnlyMyApplications: (val: boolean) => void;
}

interface CloudWord {
  text: string;
  type: 'category' | 'tag' | 'all';
  value: string;
  size: 'text-xs' | 'text-sm' | 'text-stone' | 'text-base' | 'text-lg' | 'text-xl';
  weight: 'font-medium' | 'font-semibold' | 'font-bold' | 'font-extrabold' | 'font-black';
  color: string;
}

const CLOUD_WORDS: CloudWord[] = [
  { text: 'All Programs', type: 'all', value: 'All', size: 'text-sm', weight: 'font-black', color: 'border-slate-300 hover:border-slate-500' },
  { text: 'Governance', type: 'category', value: 'Governance', size: 'text-xl', weight: 'font-black', color: 'border-amber-400 hover:border-amber-500 text-amber-900 bg-amber-50/35' },
  { text: 'Finance', type: 'category', value: 'Finance', size: 'text-lg', weight: 'font-black', color: 'border-emerald-400 hover:border-emerald-500 text-emerald-900 bg-emerald-50/35' },
  { text: 'IT & Digital Technology', type: 'category', value: 'IT & Digital', size: 'text-xl', weight: 'font-black', color: 'border-cyan-400 hover:border-cyan-500 text-cyan-900 bg-cyan-50/35' },
  { text: 'Public Policy', type: 'category', value: 'Public Policy', size: 'text-base', weight: 'font-bold', color: 'border-indigo-400 hover:border-indigo-500 text-indigo-900 bg-indigo-50/35' },
  { text: 'Disaster Management', type: 'category', value: 'Disaster Management', size: 'text-lg', weight: 'font-black', color: 'border-orange-400 hover:border-orange-500 text-orange-900 bg-orange-50/35' },
  
  // Tag focus rules
  { text: 'Strategic Policy', type: 'tag', value: 'Policy', size: 'text-stone', weight: 'font-semibold', color: 'border-slate-200 hover:border-slate-400 text-slate-800' },
  { text: 'E-Gov Systems', type: 'tag', value: 'Digital', size: 'text-sm', weight: 'font-bold', color: 'border-sky-200 hover:border-sky-400 text-sky-800' },
  { text: 'Cyber Security Protocol', type: 'tag', value: 'Security', size: 'text-stone', weight: 'font-extrabold', color: 'border-red-200 hover:border-red-400 text-red-800' },
  { text: 'Public Treasury Accounts', type: 'tag', value: 'Finance', size: 'text-sm', weight: 'font-bold', color: 'border-emerald-200 hover:border-emerald-400 text-emerald-800' },
  { text: 'Landslide Risk Management', type: 'tag', value: 'Resilience', size: 'text-stone', weight: 'font-extrabold', color: 'border-amber-300 hover:border-amber-500 text-amber-800' },
  { text: 'Ethics Standards', type: 'tag', value: 'Policy', size: 'text-xs', weight: 'font-medium', color: 'border-indigo-200 hover:border-indigo-400 text-indigo-800' },
  { text: 'Conduct Manuals', type: 'tag', value: 'Policy', size: 'text-xs', weight: 'font-semibold', color: 'border-rose-200 hover:border-rose-400 text-rose-800' },
  { text: 'Climate Adaptation', type: 'tag', value: 'Resilience', size: 'text-xs', weight: 'font-semibold', color: 'border-lime-200 hover:border-lime-400 text-lime-800' },
  { text: 'GIS Mapping & GPS', type: 'tag', value: 'Digital', size: 'text-xs', weight: 'font-medium', color: 'border-teal-200 hover:border-teal-400 text-teal-800' },
  { text: 'Sikkim Conduct Rules', type: 'tag', value: 'Policy', size: 'text-sm', weight: 'font-bold', color: 'border-pink-200 hover:border-pink-400 text-pink-800' },
];

export default function WordCloud({
  selectedCategory,
  setSelectedCategory,
  filterTag,
  setFilterTag,
  showOnlyMyApplications,
  setShowOnlyMyApplications
}: WordCloudProps) {
  
  const handleWordClick = (word: CloudWord) => {
    // Turn off individual selections depending on click
    setShowOnlyMyApplications(false);
    
    if (word.type === 'all') {
      setSelectedCategory('All');
      setFilterTag('all');
    } else if (word.type === 'category') {
      setSelectedCategory(word.value);
      setFilterTag('all'); // override tag filter when filtering categories majorly
    } else if (word.type === 'tag') {
      setFilterTag(word.value);
      // Auto-set parent category to All or matching if tag represents a specific category
      if (word.value === 'Security' || word.value === 'Digital') {
        setSelectedCategory('IT & Digital');
      } else if (word.value === 'Finance') {
        setSelectedCategory('Finance');
      } else if (word.value === 'Resilience') {
        setSelectedCategory('Disaster Management');
      } else if (word.value === 'Policy') {
        setSelectedCategory('All'); // apply and search all categories
      }
    }
  };

  const handleReset = () => {
    setSelectedCategory('All');
    setFilterTag('all');
    setShowOnlyMyApplications(false);
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-xs space-y-4">
      {/* Word Cloud Title Area */}
      <div className="flex justify-between items-center pb-2.5 border-b border-outline-variant">
        <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5 leading-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Sikkim ATI Academic Word Cloud
        </h3>
        <button
          onClick={handleReset}
          className="text-[10px] font-black uppercase tracking-wider text-outline hover:text-primary flex items-center gap-1 hover:underline transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Reset Cloud Filters
        </button>
      </div>

      {/* Cloud Keywords list wrapper */}
      <div className="flex flex-wrap gap-2.5 justify-center items-center py-4 px-2 min-h-36">
        {CLOUD_WORDS.map((word) => {
          // Check if currently active or highlighted
          const isAllActive = word.type === 'all' && selectedCategory === 'All' && filterTag === 'all' && !showOnlyMyApplications;
          const isCategoryActive = word.type === 'category' && selectedCategory === word.value && !showOnlyMyApplications;
          const isTagActive = word.type === 'tag' && filterTag === word.value && !showOnlyMyApplications;
          const isActive = isAllActive || isCategoryActive || isTagActive;

          return (
            <motion.button
              key={word.text}
              onClick={() => handleWordClick(word)}
              whileHover={{ 
                scale: 1.12, 
                z: 20,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.96 }}
              className={`px-3.5 py-2 rounded-xl border text-center transition-all cursor-pointer select-none leading-none flex items-center gap-1 ${
                word.size === 'text-xl' ? 'text-sm md:text-base' : 
                word.size === 'text-lg' ? 'text-xs md:text-sm' : 'text-[11px] md:text-xs'
              } ${word.weight} ${word.color} ${
                isActive
                  ? 'bg-primary text-on-primary border-primary font-black shadow-md scale-105'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              {word.type === 'category' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
              {word.type === 'tag' && <span className="text-[9px] text-outline opacity-60">#</span>}
              {word.text}
            </motion.button>
          );
        })}
      </div>

      <div className="text-center text-[10px] text-outline font-medium italic">
        💡 Micro-interaction: Clicking a subject bubble filters the training directories instantly. Try filtering on <span className="font-bold underline text-primary cursor-pointer" onClick={() => handleWordClick(CLOUD_WORDS[8])}>#Cyber Security</span> or <span className="font-bold underline text-primary cursor-pointer" onClick={() => handleWordClick(CLOUD_WORDS[10])}>#Landslide</span>.
      </div>
    </div>
  );
}
