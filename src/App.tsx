import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  Mail, 
  Phone, 
  Shield, 
  Lightbulb, 
  Users, 
  Leaf, 
  Handshake, 
  ChevronRight, 
  Filter, 
  Info,
  Calendar,
  Sparkles,
  Globe,
  Plus
} from 'lucide-react';

// Import Types
import { Activity, Opportunity, OpportunityType } from './types';

import * as Icons from 'lucide-react';

// Import Data
import { 
  ACTIVITIES_DATA, 
  OPPORTUNITIES_DATA, 
  TEAM_DATA, 
  STATS_DATA,
  SITE_CONFIG,
  CORE_VALUES_DATA,
  TIMELINE_DATA
} from './data';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import StatCounter from './components/StatCounter';
import ContactForm from './components/ContactForm';
import ActivityCard from './components/ActivityCard';
import OpportunityCard from './components/OpportunityCard';
import Testimonials from './components/Testimonials';
import ActivityModal from './components/ActivityModal';
import OpportunityModal from './components/OpportunityModal';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // Activities Filter and Load More State
  const [activeActivityCategory, setActiveActivityCategory] = useState<string>('All');
  const [visibleActivitiesCount, setVisibleActivitiesCount] = useState<number>(4);

  // Opportunities Filter State
  const [selectedOppType, setSelectedOppType] = useState<string>('All');
  const [selectedOppCategory, setSelectedOppCategory] = useState<string>('All');
  const [selectedOppLocation, setSelectedOppLocation] = useState<string>('All');

  // Automatically scroll to top on page navigation and update browser title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const pageTitleMap: Record<string, string> = {
      home: 'Home',
      about: 'About Us',
      activities: 'Activities',
      opportunities: 'Opportunities',
      contact: 'Contact Us'
    };
    const currentLabel = pageTitleMap[activePage] || 'Home';
    document.title = `${currentLabel} | Project Luminary`;
  }, [activePage]);

  // Derived categories from data
  const activityCategories = ['All', ...Array.from(new Set(ACTIVITIES_DATA.map(a => a.category)))];
  const opportunityTypes = ['All', ...Array.from(new Set(OPPORTUNITIES_DATA.map(o => o.type)))];
  const opportunityCategories = ['All', ...Array.from(new Set(OPPORTUNITIES_DATA.map(o => o.category)))];
  const opportunityLocations = ['All', ...Array.from(new Set(OPPORTUNITIES_DATA.map(o => o.location)))];

  // Handle CTA redirection from home
  const handleHomePrimaryCTA = () => {
    setActivePage('opportunities');
  };

  const handleHomeSecondaryCTA = () => {
    setActivePage('about');
  };

  // Filter activities
  const filteredActivities = activeActivityCategory === 'All' 
    ? ACTIVITIES_DATA 
    : ACTIVITIES_DATA.filter(act => act.category === activeActivityCategory);

  // Filter opportunities
  const filteredOpportunities = OPPORTUNITIES_DATA.filter(opp => {
    const matchesType = selectedOppType === 'All' || opp.type === selectedOppType;
    const matchesCategory = selectedOppCategory === 'All' || opp.category === selectedOppCategory;
    const matchesLocation = selectedOppLocation === 'All' || opp.location === selectedOppLocation;
    return matchesType && matchesCategory && matchesLocation;
  });

  return (
    <div id="application-container" className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Sticky Translucent Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Multi-Screen Layout with Page Animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* HOME PAGE VIEW */}
          {activePage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Full Interactive Hero Banner */}
              <Hero onPrimaryClick={handleHomePrimaryCTA} onSecondaryClick={handleHomeSecondaryCTA} />

              {/* About US Quick Summary Preview */}
              <section id="home-about-preview" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                      <span className="font-sans text-xs font-bold uppercase tracking-wider">Who We Are</span>
                    </div>
                    <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
                      {SITE_CONFIG.aboutSummaryTitle}
                    </h2>
                    <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                      {SITE_CONFIG.aboutSummaryPara1}
                    </p>
                    <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                      {SITE_CONFIG.aboutSummaryPara2}
                    </p>
                    <button
                      id="learn-more-story-btn"
                      onClick={() => setActivePage('about')}
                      className="inline-flex items-center gap-1.5 font-sans font-bold text-emerald-700 hover:text-emerald-800 transition-colors group cursor-pointer"
                    >
                      <span>Read Our Story &amp; Values</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-slate-100 shadow-lg">
                    <img
                      src={SITE_CONFIG.aboutSummaryImage}
                      alt="Hands carefully planting organic soil bed saplings in community garden"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* Featured Activities Preview */}
              <section id="home-featured-activities" className="py-20 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-4">
                      <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                        <span className="font-sans text-xs font-bold uppercase tracking-wider">Active Programs</span>
                      </div>
                      <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
                        Featured Activism Campaigns
                      </h2>
                    </div>
                    <button
                      id="view-all-activities-btn"
                      onClick={() => setActivePage('activities')}
                      className="font-sans text-sm font-semibold text-slate-800 hover:text-emerald-700 bg-white hover:bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl transition-all shadow-sm shrink-0 self-start md:self-auto cursor-pointer"
                    >
                      View All Activities
                    </button>
                  </div>

                  {/* Render 3 Selected Activities */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ACTIVITIES_DATA.slice(0, 3).map((act) => (
                      <ActivityCard 
                        key={act.id} 
                        activity={act} 
                        onReadMore={(activity) => setSelectedActivity(activity)} 
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Opportunities Preview Section */}
              <section id="home-opportunities-preview" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-4">
                      <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                        <span className="font-sans text-xs font-bold uppercase tracking-wider">Get Involved</span>
                      </div>
                      <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
                        Immediate Roles Open for Application
                      </h2>
                    </div>
                    <button
                      id="view-all-opportunities-btn"
                      onClick={() => setActivePage('opportunities')}
                      className="font-sans text-sm font-semibold text-slate-800 hover:text-emerald-700 bg-white hover:bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl transition-all shadow-sm shrink-0 self-start md:self-auto cursor-pointer"
                    >
                      View All Openings
                    </button>
                  </div>

                  {/* Render 3 Selected Opportunities */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {OPPORTUNITIES_DATA.slice(0, 3).map((opp) => (
                      <OpportunityCard 
                        key={opp.id} 
                        opportunity={opp} 
                        onApply={(opportunity) => setSelectedOpportunity(opportunity)} 
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Animate Numbers Scrolling Impact Section */}
              <section id="home-impact-section" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent)]" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                  
                  {/* Impact Intro */}
                  <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-emerald-900/50 text-emerald-400 px-3.5 py-1 rounded-full border border-emerald-800/50">
                      <span className="font-sans text-xs font-bold uppercase tracking-wider">Our Track Record</span>
                    </div>
                    <h2 className="font-sans font-extrabold text-3xl md:text-4xl tracking-tight text-white">
                      {SITE_CONFIG.statsSectionTitle}
                    </h2>
                    <p className="font-sans text-emerald-100/70 text-sm md:text-base leading-relaxed">
                      {SITE_CONFIG.statsSectionDescription}
                    </p>
                  </div>

                  {/* Dynamically Counting Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STATS_DATA.map((stat) => (
                      <StatCounter
                        key={stat.id}
                        label={stat.label}
                        value={stat.value}
                        suffix={stat.suffix}
                        iconName={stat.iconName}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Modular Testimonials */}
              <Testimonials />

              {/* Call to Action Section Banner before footer */}
              <section id="home-join-cta-banner" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                  <div className="relative bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-8 md:p-16 overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent)]" />
                    
                    <div className="max-w-3xl relative z-10 space-y-6">
                      <div className="inline-flex items-center space-x-2 bg-emerald-800/40 text-emerald-400 px-3.5 py-1 rounded-full border border-emerald-700/30">
                        <Sparkles size={14} className="text-emerald-400" />
                        <span className="font-sans text-xs font-bold uppercase tracking-wider">Join The Coalition</span>
                      </div>
                      
                      <h2 className="font-sans font-extrabold text-3xl md:text-5xl tracking-tight text-white leading-tight">
                        Ready to make a measurable difference?
                      </h2>
                      
                      <p className="font-sans text-emerald-100/80 text-sm md:text-base leading-relaxed">
                        Text here
                      </p>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                        <button
                          id="cta-join-opportunities-btn"
                          onClick={() => setActivePage('opportunities')}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-sans font-bold text-sm px-6 py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                        >
                          Become a Volunteer
                        </button>
                        <button
                          id="cta-join-contact-btn"
                          onClick={() => setActivePage('contact')}
                          className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-sans font-bold text-sm px-6 py-4 rounded-xl transition-all text-center cursor-pointer"
                        >
                          Inquire about Partnership
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ABOUT US PAGE VIEW */}
          {activePage === 'about' && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 md:py-32 bg-[#f8fafc]"
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
                
                {/* About Main Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">{SITE_CONFIG.aboutPageBadge}</span>
                  </div>
                  <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight leading-none">
                    {SITE_CONFIG.aboutPageTitle}
                  </h1>
                  <p className="font-sans text-slate-500 text-base md:text-lg leading-relaxed">
                    {SITE_CONFIG.aboutPageDescription}
                  </p>
                </div>

                {/* Mission & Vision Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Mission */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm space-y-4">
                    <div className="bg-emerald-50 text-emerald-600 p-3.5 rounded-2xl w-fit">
                      <Icons.Leaf size={24} />
                    </div>
                    <h3 className="font-sans font-bold text-2xl text-slate-900 tracking-tight">{SITE_CONFIG.missionTitle}</h3>
                    <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                      {SITE_CONFIG.missionDescription}
                    </p>
                  </div>

                  {/* Vision */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm space-y-4">
                    <div className="bg-emerald-50 text-emerald-600 p-3.5 rounded-2xl w-fit">
                      <Icons.Globe size={24} />
                    </div>
                    <h3 className="font-sans font-bold text-2xl text-slate-900 tracking-tight">{SITE_CONFIG.visionTitle}</h3>
                    <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                      {SITE_CONFIG.visionDescription}
                    </p>
                  </div>
                </div>

                {/* Core Values Section */}
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="font-sans font-bold text-3xl text-slate-900 tracking-tight">{SITE_CONFIG.coreValuesSectionTitle}</h2>
                    <p className="font-sans text-slate-500 text-sm leading-relaxed">
                      {SITE_CONFIG.coreValuesSectionDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {CORE_VALUES_DATA.map((val, i) => {
                      const ValIcon = (Icons as any)[val.iconName] || Icons.HelpCircle;
                      return (
                        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 text-center space-y-3 shadow-sm hover:border-emerald-100 transition-colors">
                          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl mx-auto w-fit">
                            <ValIcon size={20} />
                          </div>
                          <h4 className="font-sans font-bold text-base text-slate-900">{val.title}</h4>
                          <p className="font-sans text-slate-500 text-xs leading-relaxed">{val.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Story/Journey Timeline */}
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="font-sans font-bold text-3xl text-slate-900 tracking-tight">{SITE_CONFIG.journeyTimelineSectionTitle}</h2>
                    <p className="font-sans text-slate-500 text-sm leading-relaxed">
                      {SITE_CONFIG.journeyTimelineSectionDescription}
                    </p>
                  </div>

                  <div className="relative border-l-2 border-slate-200 ml-4 md:ml-auto md:mr-auto max-w-3xl space-y-12 py-4">
                    {TIMELINE_DATA.map((item, idx) => (
                      <div key={idx} className="relative pl-8 md:pl-10 group">
                        {/* Timeline node */}
                        <div className="absolute -left-2.5 top-1.5 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-sm group-hover:bg-emerald-600 transition-colors" />
                        
                        <div className="space-y-2">
                          <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{item.year}</span>
                          <h4 className="font-sans font-bold text-lg text-slate-900">{item.title}</h4>
                          <p className="font-sans text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Section */}
                <div className="space-y-12 pt-6">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="font-sans font-bold text-3xl text-slate-900 tracking-tight">Meet the Team</h2>
                    <p className="font-sans text-slate-500 text-sm leading-relaxed">
                      Our leadership brings together environmental science research, municipal policy, and active community organizing.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TEAM_DATA.map((member) => (
                      <div key={member.id} id={`team-card-${member.id}`} className="bg-white border border-slate-100 rounded-3xl p-6 text-center space-y-4 shadow-sm">
                        <img
                          src={member.image}
                          alt={member.name}
                          referrerPolicy="no-referrer"
                          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-50 shadow-sm"
                        />
                        <div className="space-y-1">
                          <h4 className="font-sans font-bold text-base text-slate-900">{member.name}</h4>
                          <p className="font-sans font-semibold text-xs text-emerald-600 uppercase tracking-wider">{member.position}</p>
                        </div>
                        <p className="font-sans text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                        
                        {/* Social Links */}
                        <div className="flex items-center justify-center space-x-3 pt-2 text-slate-400">
                          {member.socials.linkedin && (
                            <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                              <LinkedinIcon />
                            </a>
                          )}
                          {member.socials.email && (
                            <a href={`mailto:${member.socials.email}`} className="hover:text-emerald-600 transition-colors">
                              <Mail size={16} />
                            </a>
                          )}
                          {member.socials.instagram && (
                            <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                              <InstagramIcon />
                            </a>
                          )}
                          {member.socials.github && (
                            <a href={member.socials.github} target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">
                              <GithubIcon />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ACTIVITIES PAGE VIEW */}
          {activePage === 'activities' && (
            <motion.div
              key="activities-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 md:py-32 bg-[#f8fafc]"
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">Our Activities</span>
                  </div>
                  <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight">
                    Environmental Campaigns in Action
                  </h1>
                  <p className="font-sans text-slate-500 text-sm md:text-base leading-relaxed">
                    Filter through our scientific and community restoration programs. Join as a volunteer or sponsor a project.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {activityCategories.map((category) => (
                    <button
                      key={category}
                      id={`activity-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => {
                        setActiveActivityCategory(category);
                        setVisibleActivitiesCount(4); // Reset pagination on filter change
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        activeActivityCategory === category
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                          : 'bg-white text-slate-600 hover:text-emerald-600 border border-slate-100 shadow-sm'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Grid Layout of Activities */}
                {filteredActivities.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-100 shadow-sm">
                    No active campaigns found matching this filter criteria.
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredActivities.slice(0, visibleActivitiesCount).map((act) => (
                        <ActivityCard
                          key={act.id}
                          activity={act}
                          onReadMore={(activity) => setSelectedActivity(activity)}
                        />
                      ))}
                    </div>

                    {/* Pagination / Load More */}
                    {visibleActivitiesCount < filteredActivities.length && (
                      <div className="flex justify-center pt-4">
                        <button
                          id="load-more-activities-btn"
                          onClick={() => setVisibleActivitiesCount(prev => prev + 2)}
                          className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-sans font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          <Plus size={16} />
                          <span>Load More Activities</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* OPPORTUNITIES PAGE VIEW */}
          {activePage === 'opportunities' && (
            <motion.div
              key="opportunities-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 md:py-32 bg-[#f8fafc]"
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">Join Us</span>
                  </div>
                  <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight">
                    Explore Available Opportunities
                  </h1>
                  <p className="font-sans text-slate-500 text-sm md:text-base leading-relaxed">
                    Apply for volunteer runs, academic research internships, corporate sponsor alignments, and climate advocacy roles.
                  </p>
                </div>

                {/* Filters Board */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4 max-w-4xl mx-auto">
                  <div className="flex items-center space-x-2 text-slate-800 font-semibold text-sm border-b border-slate-150 pb-3">
                    <Filter size={16} className="text-emerald-600" />
                    <span>Filter Opportunities Grid</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Filter Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="filter-opp-type" className="block text-xs font-bold text-slate-700 uppercase">Opportunity Type</label>
                      <select
                        id="filter-opp-type"
                        value={selectedOppType}
                        onChange={(e) => setSelectedOppType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        {opportunityTypes.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
                      </select>
                    </div>

                    {/* Filter Category */}
                    <div className="space-y-1.5">
                      <label htmlFor="filter-opp-cat" className="block text-xs font-bold text-slate-700 uppercase">Category</label>
                      <select
                        id="filter-opp-cat"
                        value={selectedOppCategory}
                        onChange={(e) => setSelectedOppCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        {opportunityCategories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                      </select>
                    </div>

                    {/* Filter Location */}
                    <div className="space-y-1.5">
                      <label htmlFor="filter-opp-loc" className="block text-xs font-bold text-slate-700 uppercase">Location</label>
                      <select
                        id="filter-opp-loc"
                        value={selectedOppLocation}
                        onChange={(e) => setSelectedOppLocation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        {opportunityLocations.map(l => <option key={l} value={l}>{l === 'All' ? 'All Locations' : l}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* List Results */}
                {filteredOpportunities.length === 0 ? (
                  <div className="bg-white rounded-3xl p-16 text-center text-slate-400 border border-slate-100 shadow-sm max-w-4xl mx-auto space-y-3">
                    <Info size={36} className="mx-auto text-emerald-500" />
                    <p className="font-sans font-bold text-lg text-slate-700">No active postings match your search.</p>
                    <p className="text-xs">Try clearing some filtering options to review alternative open listings.</p>
                    <button
                      id="reset-opp-filters-btn"
                      onClick={() => {
                        setSelectedOppType('All');
                        setSelectedOppCategory('All');
                        setSelectedOppLocation('All');
                      }}
                      className="mt-2 font-sans text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredOpportunities.map((opp) => (
                      <OpportunityCard
                        key={opp.id}
                        opportunity={opp}
                        onApply={(opportunity) => setSelectedOpportunity(opportunity)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* CONTACT US PAGE VIEW */}
          {activePage === 'contact' && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 md:py-32 bg-[#f8fafc]"
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">Contact Us</span>
                  </div>
                  <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight">
                    Get in Touch with Project Luminary
                  </h1>
                  <p className="font-sans text-slate-500 text-sm md:text-base leading-relaxed">
                    Have any questions, alignment ideas, or feedback? Send us a message and we will connect you very soon.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                  
                  {/* Left Column: Form component */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <ContactForm />
                  </div>

                  {/* Right Column: Contact Details & Vector Map Placeholder */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                    
                    {/* Information block */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6">
                      <h3 className="font-sans font-bold text-xl text-slate-900">Headquarters Relations</h3>
                      
                      <ul className="space-y-4 text-sm text-slate-600 font-sans font-medium">
                        <li className="flex items-start space-x-3.5">
                          <MapPin size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                          <span>{SITE_CONFIG.address}</span>
                        </li>
                        <li className="flex items-center space-x-3.5">
                          <Phone size={20} className="text-emerald-600 shrink-0" />
                          <span>{SITE_CONFIG.phone}</span>
                        </li>
                        <li className="flex items-center space-x-3.5">
                          <Mail size={20} className="text-emerald-600 shrink-0" />
                          <span>{SITE_CONFIG.email}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Elegant custom SVG map drawing placeholder reserving space */}
                    <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 shadow-sm flex-grow flex flex-col justify-between relative overflow-hidden h-72">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)]" />
                      
                      <div className="space-y-2 relative z-10">
                        <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold tracking-widest bg-emerald-950/40 px-2 py-0.5 border border-emerald-900/35 rounded-full">
                          Regional Presence Map
                        </span>
                        <h4 className="font-sans font-bold text-sm text-white">Seattle &amp; Puget Sound Chapter</h4>
                      </div>

                      {/* Clean stylized vector graphic instead of boring grey box */}
                      <div className="h-28 flex items-center justify-center relative z-10 border border-slate-800/80 rounded-2xl bg-slate-950/40 p-4">
                        <svg viewBox="0 0 100 50" className="w-full h-full opacity-60 text-emerald-500 fill-none stroke-current stroke-1">
                          {/* Map Contour path */}
                          <path d="M 10 10 Q 25 5 40 15 T 70 25 T 90 30" strokeDasharray="2 2" />
                          <path d="M 15 35 Q 35 25 55 45 T 85 20" strokeWidth="0.5" />
                          {/* Chapter nodes */}
                          <circle cx="40" cy="15" r="3" className="fill-emerald-400 animate-ping" />
                          <circle cx="40" cy="15" r="2.5" className="fill-emerald-500" />
                          
                          <circle cx="55" cy="45" r="2.5" className="fill-emerald-500" />
                          <circle cx="85" cy="20" r="2.5" className="fill-emerald-500" />
                          {/* Coordinate axes decoration */}
                          <line x1="5" y1="45" x2="15" y2="45" stroke="#334155" />
                          <line x1="5" y1="45" x2="5" y2="35" stroke="#334155" />
                        </svg>
                        <div className="absolute text-[10px] text-emerald-400 bg-slate-900/90 border border-emerald-900 px-2 py-1 rounded-md font-mono flex items-center gap-1.5 shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Active Monitoring Nodes</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 font-sans relative z-10 leading-normal">
                        This placeholder reserves area for real-time GIS Mapbox dashboard rendering integration in production releases.
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Global Modals for details overlays */}
      <AnimatePresence>
        {selectedActivity && (
          <ActivityModal 
            activity={selectedActivity} 
            onClose={() => setSelectedActivity(null)} 
          />
        )}
        {selectedOpportunity && (
          <OpportunityModal 
            opportunity={selectedOpportunity} 
            onClose={() => setSelectedOpportunity(null)} 
          />
        )}
      </AnimatePresence>

      {/* Shared Persistent Footer */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}

// Micro local helper icons for social icons inside team cards
function LinkedinIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" h="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  );
}
