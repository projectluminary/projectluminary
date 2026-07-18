import React from 'react';
import { ArrowRight, Leaf, ShieldAlert, Sparkles, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../data';

interface HeroProps {
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

export default function Hero({ onPrimaryClick, onSecondaryClick }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen pt-28 pb-16 md:py-36 overflow-hidden bg-slate-50 flex items-center"
    >
      {/* Background organic blur bubbles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Headline, Description, CTAs */}
        <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full border border-emerald-150/50 w-fit"
          >
            <Sparkles size={14} className="text-emerald-600 animate-pulse" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider">
              {SITE_CONFIG.heroBadge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1]"
          >
            {SITE_CONFIG.heroTitlePrimary} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              {SITE_CONFIG.heroTitleGradient}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-lg text-slate-600 leading-relaxed max-w-2xl"
          >
            {SITE_CONFIG.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <button
              id="hero-primary-cta"
              onClick={onPrimaryClick}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-600/15 hover:shadow-emerald-600/25 transition-all cursor-pointer group"
            >
              <span>Explore Our Work</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-secondary-cta"
              onClick={onSecondaryClick}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-sans font-semibold px-8 py-4 rounded-2xl shadow-sm transition-all cursor-pointer"
            >
              Discover Our Story
            </button>
          </motion.div>


        </div>

        {/* Right Column: Visual Mockup / Clean Photo Box */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-xl lg:max-w-full rounded-3xl overflow-hidden shadow-xl shadow-slate-900/5 border border-slate-100 bg-white"
          >
            <img
              src={SITE_CONFIG.heroImage}
              alt="Project Luminary Feature"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover block"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
