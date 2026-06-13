import React, { useState, useEffect } from 'react';
import { Course, User, Application } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Grid, List, Sparkles, Plus, Bookmark, HelpCircle } from 'lucide-react';
import SikkimLogo from './SikkimLogo';
import ProgressiveImage from './ProgressiveImage';
import PerspectiveCard from './PerspectiveCard';
import WordCloud from './WordCloud';

interface DirectoryViewProps {
  courses: Course[];
  user: User;
  onViewDetails: (courseId: string) => void;
  onOpenProposeModal: () => void;
  onOpenCustomRequest: () => void;
  applications: Application[];
  onOpenSettings: () => void;
  onOpenSupport: () => void;
}

export default function DirectoryView({
  courses,
  user,
  onViewDetails,
  onOpenProposeModal,
  onOpenCustomRequest,
  applications,
  onOpenSettings,
  onOpenSupport
}: DirectoryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Specific filters
  const [filterDuration, setFilterDuration] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // My Applications Toggle tab
  const [showOnlyMyApplications, setShowOnlyMyApplications] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // expand to 8 items since full wide layout supports more content

  // Listen to 'show-my-applications' custom header event
  useEffect(() => {
    const handleShowApps = () => {
      setShowOnlyMyApplications(true);
      setSelectedCategory('All');
    };
    window.addEventListener('show-my-applications', handleShowApps);
    return () => window.removeEventListener('show-my-applications', handleShowApps);
  }, []);

  // Filter Algorithm
  const filteredCourses = courses.filter((course) => {
    // Category check
    if (selectedCategory !== 'All' && course.category !== selectedCategory) {
      return false;
    }

    // Search query check
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchTitle = course.title.toLowerCase().includes(query);
      const matchDesc = course.description.toLowerCase().includes(query);
      const matchFaculty = course.faculty.toLowerCase().includes(query);
      const matchSub = course.subcategory?.toLowerCase().includes(query);
      const matchBadges = course.badges.some(b => b.toLowerCase().includes(query));
      
      if (!matchTitle && !matchDesc && !matchFaculty && !matchSub && !matchBadges) {
        return false;
      }
    }

    // Duration filter
    if (filterDuration !== 'all') {
      const dur = course.duration.toLowerCase();
      if (filterDuration === 'short' && !dur.includes('1 week')) return false;
      if (filterDuration === 'medium' && !dur.includes('2 weeks') && !dur.includes('3 weeks')) return false;
      if (filterDuration === 'long' && !dur.includes('4 weeks')) return false;
    }

    // Tag Filter
    if (filterTag !== 'all') {
      const hasTag = course.badges.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase()));
      if (!hasTag) return false;
    }

    // Only My Applications
    if (showOnlyMyApplications) {
      const isApplied = applications.some(app => app.courseId === course.id);
      if (!isApplied) return false;
    }

    return true;
  });

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, filterDuration, filterTag, showOnlyMyApplications]);

  // Pagination slices
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

  const getApplicationStatus = (courseId: string) => {
    const foundApp = applications.find(app => app.courseId === courseId);
    return foundApp ? foundApp.status : null;
  };

  // Stagger configurations for Framer Motion grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const badgeColors: Record<string, string> = {
    'Governance': 'bg-amber-100 text-amber-950 border-amber-200',
    'Finance': 'bg-emerald-100 text-emerald-950 border-emerald-200',
    'IT & Digital': 'bg-cyan-100 text-cyan-950 border-cyan-200',
    'Public Policy': 'bg-indigo-100 text-indigo-950 border-indigo-200',
    'Disaster Management': 'bg-orange-100 text-orange-950 border-orange-200'
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#fafbfc] text-slate-900 font-sans">
      
      {/* Centered spacious widescreen container */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Elite Master Admin Welcome & Shortcuts Hub */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center p-1.5 border border-primary/10">
              <SikkimLogo className="w-10 h-10" />
            </div>
            <div>
              <h2 className="font-heading text-base font-black text-slate-800 leading-tight">
                ATI Sikkim Academic Directory
              </h2>
              <p className="text-stone-500 text-xs mt-0.5">
                Administrative Training Institute, Government of Sikkim
              </p>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => {
                setShowOnlyMyApplications(!showOnlyMyApplications);
                setSelectedCategory('All');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer ${
                showOnlyMyApplications
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-600" />
              Enrollments ({applications.length})
            </button>

            <button
              onClick={onOpenProposeModal}
              className="bg-primary text-on-primary hover:bg-opacity-95 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Propose Category Program
            </button>

            <button
              onClick={onOpenSettings}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 p-2.5 rounded-xl transition-all cursor-pointer"
              title="State System Preferences"
            >
              <span className="material-symbols-outlined text-[18px] leading-none">settings</span>
            </button>

            <button
              onClick={onOpenSupport}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 p-2.5 rounded-xl transition-all cursor-pointer"
              title="IT Helpdesk Coordination"
            >
              <span className="material-symbols-outlined text-[18px] leading-none">contact_support</span>
            </button>
          </div>

        </div>

        {/* 2. THEMATIC TOPIC INTERACTIVE WORD CLOUD (Directly Replaces static Vertical Left Menu) */}
        <WordCloud
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          showOnlyMyApplications={showOnlyMyApplications}
          setShowOnlyMyApplications={setShowOnlyMyApplications}
        />

        {/* 3. Search and filtering toolbar */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Real Search inputs */}
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search training programs, rules, codes, instructors..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-xs font-semibold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 text-xs font-extrabold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Toggle and View Mode Layout Switches */}
            <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-5 py-3 border rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  showFilters || filterDuration !== 'all' || filterTag !== 'all'
                    ? 'bg-primary text-on-primary border-primary shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-800'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                Duration Filters {(filterDuration !== 'all' || filterTag !== 'all') && '•'}
              </button>

              <div className="flex border border-slate-200 rounded-xl overflow-hidden shrink-0 bg-white">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 cursor-pointer flex items-center transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-primary' : 'hover:bg-slate-50 text-slate-400'}`}
                  title="Widescreen Grid"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 cursor-pointer flex items-center transition-all ${viewMode === 'list' ? 'bg-slate-100 text-primary' : 'hover:bg-slate-50 text-slate-400'}`}
                  title="List Feed"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Drawer Dropdown parameters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Academic Duration Scale</label>
                    <select
                      value={filterDuration}
                      onChange={(e) => setFilterDuration(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:border-primary"
                    >
                      <option value="all">All Durations</option>
                      <option value="short">Short Intensive (1 Week)</option>
                      <option value="medium">Medium Term (2-3 Weeks)</option>
                      <option value="long">Extended Module (4 Weeks+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Subject Focal Badge</label>
                    <select
                      value={filterTag}
                      onChange={(e) => setFilterTag(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 outline-none focus:border-primary"
                    >
                      <option value="all">All Focal Tags</option>
                      <option value="Policy">Policy & Institutional Law</option>
                      <option value="Digital">Digital & E-Gov Systems</option>
                      <option value="Security">Cyber Security Protocols</option>
                      <option value="Finance">Treasury & GST Accounts</option>
                      <option value="Resilience">Climate & Mountain Resilience</option>
                    </select>
                  </div>

                  <div className="flex items-end justify-between pt-2 md:pt-0">
                    <button
                      onClick={() => {
                        setFilterDuration('all');
                        setFilterTag('all');
                        setSearchQuery('');
                      }}
                      className="text-primary hover:underline font-bold text-xs cursor-pointer"
                    >
                      Clear Parameters
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-bold text-xs"
                    >
                      Apply & Close
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. Filter feedback and active category labels */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-200 pb-3 gap-2">
          <div>
            <h1 className="font-heading text-lg md:text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              {showOnlyMyApplications ? 'Your Personal Academic Enrollment Ledger' : `${selectedCategory} Courses`}
              {filterTag !== 'all' && <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">#{filterTag}</span>}
            </h1>
            <p className="text-stone-500 text-xs mt-1 font-medium">
              ATI directory registers <span className="font-bold text-primary">{filteredCourses.length}</span> active qualification schedules corresponding to your filter preferences.
            </p>
          </div>
          
          {showOnlyMyApplications && (
            <button
              onClick={() => {
                setShowOnlyMyApplications(false);
                setSelectedCategory('All');
                setFilterTag('all');
              }}
              className="text-xs text-primary font-bold hover:underline cursor-pointer"
            >
              Browse General Catalogue →
            </button>
          )}
        </div>

        {/* empty grid state layout */}
        {filteredCourses.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
            <span className="material-symbols-outlined text-stone-300 text-[60px] mb-3">school</span>
            <h3 className="font-bold text-slate-800 text-base mb-1">No Active Schedules Map the Request</h3>
            <p className="text-stone-500 text-xs max-w-sm mx-auto mb-6">
              We couldn't locate any matching government training schedules. Submit an administrative proposal or expand keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterDuration('all');
                setFilterTag('all');
                setSelectedCategory('All');
                setShowOnlyMyApplications(false);
              }}
              className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-opacity-95"
            >
              Reset Search Parameters
            </button>
          </div>
        )}

        {/* 5. Main Widescreen Dynamic grid layout with motion and 3D Perspective hover */}
        {viewMode === 'grid' ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentCourses.map((course) => {
              const appStatus = getApplicationStatus(course.id);
              const colorTheme = badgeColors[course.category] || 'bg-slate-100 text-slate-900 border-slate-200';
              
              return (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  layoutId={`course-card-${course.id}`} // Shared Element transition layout ID binding!
                >
                  <PerspectiveCard 
                    onClick={() => onViewDetails(course.id)}
                    className="bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-primary/45 overflow-hidden flex flex-col h-full group"
                  >
                    {/* Visual Media Header using Progressive Image with Blur Up */}
                    <div className="h-40 bg-slate-900 overflow-hidden relative">
                      <ProgressiveImage
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Department overlay badge */}
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest shadow-sm border ${colorTheme}`}>
                        {course.subcategory || course.category}
                      </div>
                      
                      {/* Live Application Status Banner overlay */}
                      {appStatus && (
                        <div className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow border ${
                          appStatus === 'Approved'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : appStatus === 'Requires NOC'
                            ? 'bg-rose-100 text-rose-900 border-rose-300 animate-pulse'
                            : 'bg-amber-100 text-amber-900 border-amber-300'
                        }`}>
                          ● {appStatus}
                        </div>
                      )}
                    </div>

                    {/* Metadata Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest block mb-1.5">
                          {course.category} Department
                        </span>
                        
                        <h3 className="font-heading text-xs md:text-sm font-black text-slate-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-3">
                          {course.title}
                        </h3>

                        {/* Tag list */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {course.badges.map((badge) => (
                            <span
                              key={badge}
                              className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg text-[9px] font-bold border border-slate-250 shrink-0"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer scheduling metadata */}
                      <div className="pt-3.5 border-t border-slate-100 flex justify-between items-center">
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] font-black text-stone-400 uppercase tracking-wider">Deadline</span>
                          <span className="text-xs text-rose-600 font-extrabold italic mt-0.5">{course.deadline.split(',')[0]}</span>
                        </div>
                        <div className="text-primary group-hover:translate-x-1 transition-transform font-extrabold flex items-center gap-0.5 text-xs">
                          Details ➔
                        </div>
                      </div>
                    </div>
                  </PerspectiveCard>
                </motion.div>
              );
            })}

            {/* Custom Department Request card block */}
            {!showOnlyMyApplications && (
              <motion.div variants={itemVariants}>
                <div className="border-2 border-dashed border-slate-200 hover:border-primary/40 rounded-2xl flex flex-col items-center justify-center p-6 text-center bg-slate-50/60 hover:bg-slate-50 transition-colors h-full min-h-[300px]">
                  <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center mb-3 border border-slate-200">
                    <HelpCircle className="w-5 h-5 text-stone-500" />
                  </div>
                  <h4 className="font-heading text-xs font-black text-slate-800 mb-1">Request Custom Training</h4>
                  <p className="text-stone-500 text-xs mb-4 max-w-[200px] leading-relaxed mx-auto">
                    Can't find a program covering your specific agency's administrative systems? Draft a prompt requests.
                  </p>
                  <button
                    onClick={onOpenCustomRequest}
                    className="bg-white text-primary border border-slate-200 hover:border-primary px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-xs"
                  >
                    Submit Prompt Request
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* List Mode Feed */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {currentCourses.map((course) => {
              const appStatus = getApplicationStatus(course.id);
              const colorTheme = badgeColors[course.category] || 'bg-slate-100 text-slate-900 border-slate-200';

              return (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  layoutId={`course-card-${course.id}`} // Shared Layout Transition morph logic
                  onClick={() => onViewDetails(course.id)}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-5 items-start md:items-center transition-all hover:shadow-xs hover:border-primary/45 cursor-pointer group"
                >
                  <div className="w-full md:w-44 h-28 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative">
                    <ProgressiveImage src={course.image} alt={course.title} />
                    {appStatus && (
                      <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-white px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider shadow">
                        {appStatus}
                      </div>
                    )}
                  </div>

                  <div className="flex-grow space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${colorTheme}`}>
                        {course.category}
                      </span>
                      <span className="text-stone-300 text-xs">•</span>
                      <span className="text-xs text-stone-500 font-bold">{course.subcategory}</span>
                    </div>
                    
                    <h3 className="font-heading text-sm md:text-base font-black text-slate-800 group-hover:text-primary transition-colors leading-snug">
                      {course.title}
                    </h3>
                    
                    <p className="text-stone-500 text-xs line-clamp-1 leading-normal max-w-3xl font-medium">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {course.badges.map(b => (
                        <span key={b} className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-lg text-[9px] font-bold">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex md:flex-col justify-between items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-150 shrink-0">
                    <div className="text-left md:text-right">
                      <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Enrollment Deadline</p>
                      <p className="text-xs text-rose-600 font-extrabold italic mt-0.5">{course.deadline.split(',')[0]}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(course.id);
                      }}
                      className="bg-primary text-on-primary hover:bg-opacity-95 px-4.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                    >
                      Browse
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {!showOnlyMyApplications && (
              <div className="border-2 border-dashed border-slate-250 rounded-2xl p-6 bg-slate-50/70 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                    <HelpCircle className="w-5 h-5 text-stone-500" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-black text-slate-800">Can't locate appropriate schedules?</h4>
                    <p className="text-stone-500 text-xs mt-0.5 font-medium">Coordinate custom qualification curricula or training formats directly with the Director office.</p>
                  </div>
                </div>
                <button
                  onClick={onOpenCustomRequest}
                  className="bg-primary hover:bg-opacity-95 text-on-primary px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-xs"
                >
                  Submit Custom Proposal
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* 6. Dynamic Widescreen Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-6">
            <nav className="flex items-center gap-1.5 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-xs">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                className="p-2 border border-slate-150 hover:bg-slate-50 text-slate-600 rounded-xl disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                title="Previous Page"
              >
                ←
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-primary border-primary text-on-primary shadow-xs'
                      : 'border-slate-150 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                className="p-2 border border-slate-150 hover:bg-slate-50 text-slate-600 rounded-xl disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                title="Next Page"
              >
                →
              </button>
            </nav>
          </div>
        )}

      </main>
    </div>
  );
}
