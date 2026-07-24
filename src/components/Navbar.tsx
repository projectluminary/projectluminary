import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG } from '../data';
import { Logo } from './Logo';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'activities', label: 'Our Work' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'contact', label: 'Contact' },
    { id: 'donate-us', label: 'Donate Us' }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          id="navbar-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2 group focus:outline-none cursor-pointer"
        >
          <div className="transform group-hover:scale-105 transition-transform duration-300">
            <Logo size={40} />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
            {SITE_CONFIG.brandName}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-3.5 py-2 rounded-lg font-sans text-sm font-medium transition-colors cursor-pointer ${
                (activePage === item.id || (item.id === 'activities' && activePage === 'activity-detail') || (item.id === 'opportunities' && activePage === 'opportunity-detail'))
                  ? 'text-emerald-700 bg-emerald-50/60 font-semibold'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
              {(activePage === item.id || (item.id === 'activities' && activePage === 'activity-detail') || (item.id === 'opportunities' && activePage === 'opportunity-detail')) && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-emerald-600 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            id="nav-donate-btn"
            onClick={() => handleNavClick('donate-us')}
            className="font-sans text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Heart size={14} className="fill-emerald-600 text-emerald-600" />
            <span>Donate Us</span>
          </button>
          <button
            id="nav-join-btn"
            onClick={() => handleNavClick('opportunities')}
            className="font-sans text-xs font-bold text-white bg-slate-900 hover:bg-emerald-600 px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Get Involved
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-sans text-base font-medium transition-colors ${
                    (activePage === item.id || (item.id === 'activities' && activePage === 'activity-detail') || (item.id === 'opportunities' && activePage === 'opportunity-detail'))
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-50">
                <button
                  id="mobile-nav-join-btn"
                  onClick={() => handleNavClick('opportunities')}
                  className="w-full text-center font-sans font-semibold text-white bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl transition-colors shadow-sm"
                >
                  Get Involved
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
