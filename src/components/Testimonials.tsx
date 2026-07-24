import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, Play, Pause, LayoutGrid, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';
import { Testimonial } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [direction, setDirection] = useState<number>(1); // 1 for next, -1 for prev

  const total = TESTIMONIALS_DATA.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPlaying && !isHovered && viewMode === 'slider') {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % total);
      }, 5000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, viewMode, total]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const filterCategories = ['All', 'Leadership & Advisory', 'Fellows & Alumni', 'Community & Mentors'];

  const getFilteredTestimonials = () => {
    if (activeFilter === 'All') return TESTIMONIALS_DATA;
    if (activeFilter === 'Leadership & Advisory') {
      return TESTIMONIALS_DATA.filter(t => 
        t.position.includes('Lead') || t.position.includes('President') || t.position.includes('Trustees') || t.position.includes('Advisor')
      );
    }
    if (activeFilter === 'Fellows & Alumni') {
      return TESTIMONIALS_DATA.filter(t => 
        t.position.includes('Fellow') || t.position.includes('Alumna') || t.position.includes('Scholar') || t.position.includes('Participant')
      );
    }
    if (activeFilter === 'Community & Mentors') {
      return TESTIMONIALS_DATA.filter(t => 
        t.position.includes('Educator') || t.position.includes('Mentor')
      );
    }
    return TESTIMONIALS_DATA;
  };

  const filteredList = getFilteredTestimonials();
  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  // Card variant for Grid view
  const renderGridCard = (testimonial: Testimonial) => (
    <div
      key={testimonial.id}
      id={`testimonial-card-${testimonial.id}`}
      className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between h-full group/card"
    >
      <div className="absolute top-6 right-6 text-emerald-100/80 group-hover/card:text-emerald-200 transition-colors shrink-0 pointer-events-none">
        <Quote size={40} className="transform rotate-180" />
      </div>

      <div className="space-y-4 relative z-10 pr-6">
        <div className="flex items-center space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="font-sans text-slate-700 text-sm leading-relaxed italic">
          &ldquo;{testimonial.comment}&rdquo;
        </p>
      </div>

      <div className="flex items-center space-x-3.5 pt-5 border-t border-slate-100 mt-5 relative z-10">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          referrerPolicy="no-referrer"
          className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/20 shadow-xs shrink-0"
        />
        <div className="min-w-0">
          <div className="font-sans font-bold text-sm text-slate-900 leading-snug truncate">{testimonial.name}</div>
          <div className="font-sans font-medium text-xs text-emerald-600 leading-snug truncate">{testimonial.position}</div>
        </div>
      </div>
    </div>
  );

  // Animation variants for slider
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.96
    })
  };

  return (
    <section id="testimonials-section" className="py-24 bg-slate-50/60 relative overflow-hidden">
      {/* Background soft blurs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full border border-emerald-100 shadow-2xs">
            <Sparkles size={14} className="text-emerald-600 animate-pulse" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider">Voices & Stories ({total})</span>
          </div>
          
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Hear From Our Active Coalition
          </h2>
          
          <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
            Discover inspiring perspectives from project leads, university leaders, research fellows, community mentors, and program alumni working together for Burmese youth.
          </p>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            
            {/* View Mode Switcher */}
            <div className="bg-white border border-slate-200/80 p-1 rounded-2xl shadow-xs inline-flex items-center">
              <button
                type="button"
                onClick={() => setViewMode('slider')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles size={14} />
                <span>Auto-Slider (5s)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid size={14} />
                <span>All Voices Grid</span>
              </button>
            </div>

            {/* Play/Pause Button for Auto-Slider Mode */}
            {viewMode === 'slider' && (
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl border text-xs font-bold shadow-xs transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                }`}
                title={isPlaying ? 'Pause 5s Timer' : 'Resume 5s Timer'}
              >
                {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
                <span>{isPlaying ? 'Auto-Advancing (5s)' : 'Paused'}</span>
              </button>
            )}

          </div>

          {/* Filter Categories for Grid Mode */}
          {viewMode === 'grid' && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {filterCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* View Mode 1: Step-by-Step 5s Auto-Advancing Single-Row Carousel */}
        {viewMode === 'slider' && (
          <div 
            className="max-w-3xl mx-auto relative px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Pause indicator notification on hover */}
            {isHovered && isPlaying && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[11px] font-medium px-3 py-0.5 rounded-full z-30 shadow-xs pointer-events-none transition-opacity">
                Hovering — timer paused
              </div>
            )}

            {/* Slider Container Box */}
            <div className="relative bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-lg min-h-[300px] md:min-h-[280px] flex flex-col justify-between overflow-hidden">
              
              {/* Quote Background Accent */}
              <div className="absolute top-6 right-8 text-emerald-100/70 pointer-events-none">
                <Quote size={64} className="transform rotate-180" />
              </div>

              {/* Progress Line Bar */}
              {isPlaying && !isHovered && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
                  <motion.div
                    key={currentIndex}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              )}

              {/* Animated Card Content */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="space-y-6 relative z-10"
                >
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-400 ml-2">
                      Story {currentIndex + 1} of {total}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="font-sans text-slate-800 text-base md:text-lg leading-relaxed italic">
                    &ldquo;{currentTestimonial.comment}&rdquo;
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/30 shadow-xs shrink-0"
                    />
                    <div>
                      <div className="font-sans font-extrabold text-base text-slate-900">{currentTestimonial.name}</div>
                      <div className="font-sans font-semibold text-xs md:text-sm text-emerald-600">{currentTestimonial.position}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Navigation Controls: Previous / Next Buttons */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute top-1/2 -left-3 md:-left-6 -translate-y-1/2 w-11 h-11 bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer z-20 focus:outline-none hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute top-1/2 -right-3 md:-right-6 -translate-y-1/2 w-11 h-11 bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer z-20 focus:outline-none hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center space-x-2 pt-6">
              {TESTIMONIALS_DATA.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => handleDotClick(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-7 h-2.5 bg-emerald-600 shadow-xs'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Go to story ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        )}

        {/* View Mode 2: Static Grid View */}
        {viewMode === 'grid' && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredList.map(testimonial => renderGridCard(testimonial))}
            </motion.div>
          </AnimatePresence>
        )}

      </div>
    </section>
  );
}


