import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft,
  Clock,
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
  Plus,
  Check,
  Send,
  Copy,
  CheckCircle2,
  FileText,
  ExternalLink,
  Heart
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
import ArticleRenderer from './components/ArticleRenderer';
import DonateForm from './components/DonateForm';

export default function App() {
  // Mapping between activePage state and URL path
  const PAGE_TO_PATH: Record<string, string> = {
    home: '/',
    about: '/about-us',
    activities: '/our-work',
    opportunities: '/opportunities',
    contact: '/contact',
    'donate-us': '/donate-us'
  };

  const PATH_TO_PAGE: Record<string, string> = {
    '/': 'home',
    '/home': 'home',
    '/about-us': 'about',
    '/activities': 'activities',
    '/our-work': 'activities',
    '/opportunities': 'opportunities',
    '/contact': 'contact',
    '/donate-us': 'donate-us',
    '/donate': 'donate-us'
  };

  const getCleanPath = (): string => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      const parsed = hash.substring(1);
      if (parsed === '/home') return '/';
      if (parsed === '/activities') return '/our-work';
      return parsed;
    }
    const path = window.location.pathname || '/';
    if (path === '/home') return '/';
    if (path === '/activities') return '/our-work';
    return path;
  };

  const getInitialPage = (): string => {
    const path = getCleanPath();
    if (path.startsWith('/activities/')) {
      const id = path.substring('/activities/'.length);
      const hasActivity = ACTIVITIES_DATA.some(a => a.id === id);
      return hasActivity ? 'activity-detail' : 'activities';
    }
    if (path.startsWith('/our-work/')) {
      const id = path.substring('/our-work/'.length);
      const hasActivity = ACTIVITIES_DATA.some(a => a.id === id);
      return hasActivity ? 'activity-detail' : 'activities';
    }
    if (path.startsWith('/opportunities/')) {
      const id = path.substring('/opportunities/'.length);
      const hasOpp = OPPORTUNITIES_DATA.some(o => o.id === id);
      return hasOpp ? 'opportunity-detail' : 'opportunities';
    }
    return PATH_TO_PAGE[path] || 'home';
  };

  const getInitialActivity = (): Activity | null => {
    const path = getCleanPath();
    if (path.startsWith('/activities/')) {
      const id = path.substring('/activities/'.length);
      return ACTIVITIES_DATA.find(a => a.id === id) || null;
    }
    if (path.startsWith('/our-work/')) {
      const id = path.substring('/our-work/'.length);
      return ACTIVITIES_DATA.find(a => a.id === id) || null;
    }
    return null;
  };

  const getInitialOpportunity = (): Opportunity | null => {
    const path = getCleanPath();
    if (path.startsWith('/opportunities/')) {
      const id = path.substring('/opportunities/'.length);
      return OPPORTUNITIES_DATA.find(o => o.id === id) || null;
    }
    return null;
  };

  const [activePage, setActivePage] = useState<string>(getInitialPage);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(getInitialActivity);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(getInitialOpportunity);
  const [oppCopied, setOppCopied] = useState(false);

  // Activities Filter and Load More State
  const [activeActivityCategory, setActiveActivityCategory] = useState<string>('All');
  const [visibleActivitiesCount, setVisibleActivitiesCount] = useState<number>(4);

  // Opportunities Filter State
  const [selectedOppType, setSelectedOppType] = useState<string>('All');
  const [selectedOppCategory, setSelectedOppCategory] = useState<string>('All');
  const [selectedOppLocation, setSelectedOppLocation] = useState<string>('All');
  const [selectedOppStatus, setSelectedOppStatus] = useState<string>('All');

  // Automatically scroll to top on page navigation and update browser title & URL pathname
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    let currentLabel = 'Home';
    if (activePage === 'activity-detail' && selectedActivity) {
      currentLabel = selectedActivity.title;
    } else if (activePage === 'opportunity-detail' && selectedOpportunity) {
      currentLabel = selectedOpportunity.title;
    } else {
      const pageTitleMap: Record<string, string> = {
        home: 'Home',
        about: 'About',
        activities: 'Our Work',
        opportunities: 'Opportunities',
        contact: 'Contact',
        'donate-us': 'Donate Us'
      };
      currentLabel = pageTitleMap[activePage] || 'Home';
    }
    
    if (activePage === 'home') {
      document.title = 'Project Luminary';
    } else {
      document.title = `${currentLabel} | Project Luminary`;
    }

    // Sync state with URL pathname
    let targetPath = '/';
    if (activePage === 'activity-detail' && selectedActivity) {
      targetPath = `/our-work/${selectedActivity.id}`;
    } else if (activePage === 'opportunity-detail' && selectedOpportunity) {
      targetPath = `/opportunities/${selectedOpportunity.id}`;
    } else {
      targetPath = PAGE_TO_PATH[activePage] || '/';
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  }, [activePage, selectedActivity, selectedOpportunity]);

  // Clear selectedActivity state when navigating away from the activity-detail page
  useEffect(() => {
    if (activePage !== 'activity-detail' && selectedActivity !== null) {
      setSelectedActivity(null);
    }
  }, [activePage, selectedActivity]);

  // Clear selectedOpportunity state when navigating away from the opportunity-detail page
  useEffect(() => {
    if (activePage !== 'opportunity-detail' && selectedOpportunity !== null) {
      setSelectedOpportunity(null);
    }
  }, [activePage, selectedOpportunity]);

  // Listen to browser navigation (popstate event)
  useEffect(() => {
    const handlePopState = () => {
      const path = getCleanPath();
      if (path.startsWith('/activities/')) {
        const id = path.substring('/activities/'.length);
        const act = ACTIVITIES_DATA.find(a => a.id === id);
        if (act) {
          setSelectedActivity(act);
          setActivePage('activity-detail');
        } else {
          setActivePage('activities');
          setSelectedActivity(null);
        }
      } else if (path.startsWith('/our-work/')) {
        const id = path.substring('/our-work/'.length);
        const act = ACTIVITIES_DATA.find(a => a.id === id);
        if (act) {
          setSelectedActivity(act);
          setActivePage('activity-detail');
        } else {
          setActivePage('activities');
          setSelectedActivity(null);
        }
      } else if (path.startsWith('/opportunities/')) {
        const id = path.substring('/opportunities/'.length);
        const opp = OPPORTUNITIES_DATA.find(o => o.id === id);
        if (opp) {
          setSelectedOpportunity(opp);
          setActivePage('opportunity-detail');
        } else {
          setActivePage('opportunities');
          setSelectedOpportunity(null);
        }
      } else {
        const matchedPage = PATH_TO_PAGE[path] || 'home';
        setActivePage(matchedPage);
        setSelectedActivity(null);
        setSelectedOpportunity(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Redirect / clean up hashes if we started with one (hash url migration)
    const initialHash = window.location.hash;
    if (initialHash && initialHash.startsWith('#/')) {
      const cleanPath = getCleanPath();
      window.history.replaceState({}, '', cleanPath);
      handlePopState();
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleReadActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setActivePage('activity-detail');
  };

  const handleSelectOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setActivePage('opportunity-detail');
  };

  // Derived categories from data
  const activityCategories = ['All', ...Array.from(new Set(ACTIVITIES_DATA.map(a => a.category)))];
  const opportunityTypes = ['All', ...Array.from(new Set(OPPORTUNITIES_DATA.map(o => o.type)))];
  const opportunityCategories = ['All', ...Array.from(new Set(OPPORTUNITIES_DATA.map(o => o.category)))];
  const opportunityLocations = ['All', ...Array.from(new Set(OPPORTUNITIES_DATA.map(o => o.location)))];

  // Handle CTA redirection from home
  const handleHomePrimaryCTA = () => {
    setActivePage('activities');
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
    const matchesStatus = selectedOppStatus === 'All' || 
      (selectedOppStatus === 'Open' && opp.isAvailable !== false) ||
      (selectedOppStatus === 'Closed' && opp.isAvailable === false);
    return matchesType && matchesCategory && matchesLocation && matchesStatus;
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
                      <span>Read Our Story</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-white">
                    <img
                      src={SITE_CONFIG.aboutSummaryImage}
                      alt="Project Luminary Community Work"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover block"
                    />
                  </div>
                </div>
              </section>

              {/* What We Do Section */}
              <section id="home-what-we-do" className="py-20 bg-slate-50 border-y border-slate-100/80">
                <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
                  <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                      <span className="font-sans text-xs font-bold uppercase tracking-wider">What We Do</span>
                    </div>
                    <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
                      Empowering Youth Through Learning and Action
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* ACCESS CARD */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl uppercase tracking-wider">
                            Access
                          </span>
                          <div className="text-emerald-600 bg-emerald-50 p-2.5 rounded-xl">
                            <Icons.Compass size={20} />
                          </div>
                        </div>
                        <h3 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight">
                          Opening Pathways
                        </h3>
                        <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                          Helping young people navigate higher education, scholarships, and opportunities that might otherwise remain out of reach.
                        </p>
                      </div>
                    </div>

                    {/* CAPABILITY CARD */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl uppercase tracking-wider">
                            Capability
                          </span>
                          <div className="text-emerald-600 bg-emerald-50 p-2.5 rounded-xl">
                            <Icons.BookOpen size={20} />
                          </div>
                        </div>
                        <h3 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight">
                          Building Practical Skills
                        </h3>
                        <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                          Developing research, digital, professional, and other capabilities that young people can apply to further study, work, and real-world challenges.
                        </p>
                      </div>
                    </div>

                    {/* ENGAGEMENT CARD */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl uppercase tracking-wider">
                            Engagement
                          </span>
                          <div className="text-emerald-600 bg-emerald-50 p-2.5 rounded-xl">
                            <Icons.Globe size={20} />
                          </div>
                        </div>
                        <h3 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight">
                          Learning Beyond the Individual
                        </h3>
                        <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                          Creating spaces where young people critically explore social issues, exchange perspectives, and develop the confidence and responsibility to contribute to their communities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured Activities Preview */}
              <section id="home-featured-activities" className="py-20 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-4">
                      <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                        <span className="font-sans text-xs font-bold uppercase tracking-wider">ACTIVITIES</span>
                      </div>
                      <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
                        Learning in Action
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
                        onReadMore={handleReadActivity} 
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
                        <span className="font-sans text-xs font-bold uppercase tracking-wider">Opportunities</span>
                      </div>
                      <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
                        Opportunities to Join Our Work
                      </h2>
                      <p className="font-sans text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed">
                        Join a growing youth-led organisation working to better understand and respond to the changing needs of young people from Myanmar.
                      </p>
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
                        onApply={handleSelectOpportunity} 
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
                  </div>

                  {/* Dynamically Counting Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

                  {/* Geographic Reach Supporting Text */}
                  <div className="text-center max-w-4xl mx-auto">
                    <p className="font-sans text-emerald-100/70 text-sm md:text-base leading-relaxed">
                      Participants have joined Project Luminary from communities across Myanmar - including Yangon, Mandalay, Bago, Magway, Shan, Ayeyarwady, Mon, Kayin, Kayah, and Tanintharyi - as well as Thailand, Malaysia, and the refugee context of Cox’s Bazar, Bangladesh.
                    </p>
                  </div>
                </div>
              </section>

              {/* International Recognition Section */}
              <section id="home-recognition-section" className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Info & Description */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-800 px-3.5 py-1 rounded-full border border-amber-100 shadow-sm">
                        <Icons.Award size={14} className="text-amber-600 animate-pulse" />
                        <span className="font-sans text-xs font-bold uppercase tracking-wider">International Recognition</span>
                      </div>
                      
                      <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
                        First-Place Winner of the 2026 MacJannet Prize for Global Citizenship
                      </h2>
                      
                      <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                        In 2026, Project Luminary was awarded First Place in the MacJannet Prize for Global Citizenship by the Talloires Network. The Selection Committee recognised the scale of the initiative’s accomplishments within its short lifespan, its work amid Myanmar’s challenging circumstances, its student leadership, and its promising path towards continued growth and impact.
                      </p>
                      
                      <div className="pt-2">
                        <a 
                          href="https://talloiresnetwork.tufts.edu/about-the-macjannet-prize/2026-macjannet-prize-winners/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all group"
                        >
                          <span>Read About the Recognition</span>
                          <Icons.ExternalLink size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Quote Card */}
                    <div className="lg:col-span-5">
                      <div className="relative bg-gradient-to-tr from-amber-50/60 to-orange-50/40 border border-amber-100/70 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                        <div className="absolute top-6 right-8 text-amber-200/50 shrink-0">
                          <Icons.Quote size={64} className="transform rotate-180" />
                        </div>
                        
                        <div className="space-y-6 relative z-10">
                          <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed italic font-medium">
                            &ldquo;We see this award not only as a recognition of Project Luminary, but also as a tribute to the wider community of grassroots initiatives and Burmese youth who continue to learn, lead, and imagine better futures despite increasing challenges.&rdquo;
                          </p>
                          
                          <div className="flex items-center space-x-3 pt-4 border-t border-amber-100/60">
                            <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                              <Icons.Users size={16} />
                            </div>
                            <div>
                              <div className="font-sans font-bold text-xs text-slate-900 uppercase tracking-wider">Project Luminary Team</div>
                              <div className="font-sans text-[11px] text-slate-500">Talloires Network Global Recognition</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

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

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                        <button
                          id="cta-join-opportunities-btn"
                          onClick={() => setActivePage('opportunities')}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-sans font-bold text-sm px-6 py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                        >
                          Become a Volunteer
                        </button>
                        <button
                          id="cta-join-donate-btn"
                          onClick={() => setActivePage('donate-us')}
                          className="bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60 font-sans font-bold text-sm px-6 py-4 rounded-xl transition-all text-center cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Heart size={16} className="fill-emerald-400 text-emerald-400" />
                          <span>Donate Us</span>
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
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <h2 className="font-sans font-bold text-3xl text-slate-900 tracking-tight">Meet the People Behind Project Luminary</h2>
                    <p className="font-sans text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                      Project Luminary is built by young people who believe that the challenges facing our generation should also inspire us to create better opportunities for one another.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {TEAM_DATA.map((member) => {
                      const isInitials = member.image.startsWith('initials:');
                      const initials = isInitials ? member.image.split(':')[1] : '';
                      
                      // Map custom premium gradients based on initials
                      let bgGradient = 'from-emerald-600 to-teal-700';
                      if (initials === 'KM') bgGradient = 'from-emerald-500 to-teal-600';
                      else if (initials === 'EP') bgGradient = 'from-teal-500 to-emerald-600';
                      else if (initials === 'MH') bgGradient = 'from-amber-500 to-orange-600';
                      else if (initials === 'PM') bgGradient = 'from-purple-500 to-pink-600';

                      return (
                        <div key={member.id} id={`team-card-${member.id}`} className="bg-white border border-slate-100 rounded-3xl p-6 text-center flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all">
                          <div className="space-y-4">
                            {isInitials ? (
                              <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br ${bgGradient} text-white font-sans font-bold text-xl border-4 border-emerald-50/50 shadow-sm uppercase`}>
                                {initials}
                              </div>
                            ) : (
                              <img
                                src={member.image}
                                alt={member.name}
                                referrerPolicy="no-referrer"
                                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-50 shadow-sm"
                              />
                            )}
                            <div className="space-y-1">
                              <h4 className="font-sans font-bold text-base text-slate-900 min-h-[48px] flex items-center justify-center leading-tight">{member.name}</h4>
                              <p className="font-sans font-semibold text-[11px] text-emerald-600 uppercase tracking-wider min-h-[32px] flex items-center justify-center leading-normal">{member.position}</p>
                            </div>
                            <p className="font-sans text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                          </div>
                          
                          {/* Social Links */}
                          <div className="flex items-center justify-center space-x-3 pt-4 border-t border-slate-50 text-slate-400">
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
                      );
                    })}
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
                    Ideas Become Learning. Learning Becomes Action.
                  </h1>
                  <p className="font-sans text-slate-500 text-sm md:text-base leading-relaxed">
                    Explore Project Luminary’s programmes, research initiatives, partnerships, and efforts to expand meaningful opportunities for young people.
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
                          onReadMore={handleReadActivity}
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

          {/* ACTIVITY DETAIL PAGE VIEW */}
          {activePage === 'activity-detail' && selectedActivity && (
            <motion.div
              key="activity-detail-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 md:py-32 bg-[#f8fafc]"
            >
              <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8">
                
                {/* Back button */}
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setActivePage('activities');
                      setSelectedActivity(null);
                    }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors group cursor-pointer"
                  >
                    <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Activities</span>
                  </button>
                </div>

                {/* Main Article Card */}
                <article className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm p-6 md:p-12 space-y-8">
                  {/* Category and Title */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-150 px-3.5 py-1.5 rounded-full">
                        {selectedActivity.category}
                      </span>
                      {selectedActivity.status && (
                        <span className={`font-sans text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${
                          selectedActivity.status.toLowerCase().includes('ongoing')
                            ? 'bg-amber-100 text-amber-900 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {selectedActivity.status}
                        </span>
                      )}
                    </div>
                    <h1 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                      {selectedActivity.title}
                    </h1>

                    {/* Metadata bar */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium font-sans border-y border-slate-100 py-4">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} className="text-emerald-600" />
                        Published: {selectedActivity.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={16} className="text-emerald-600" />
                        {selectedActivity.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Feature Image */}
                  <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900/5 border border-slate-200/80 shadow-xs flex items-center justify-center p-2 sm:p-4 md:p-6 min-h-[260px] max-h-[600px]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-110 pointer-events-none"
                      style={{ backgroundImage: `url(${selectedActivity.image})` }}
                    />
                    <img
                      src={selectedActivity.image}
                      alt={selectedActivity.title}
                      referrerPolicy="no-referrer"
                      className="relative z-10 max-w-full max-h-[520px] w-auto h-auto object-contain rounded-xl shadow-xs"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="space-y-6 pt-2">
                    <p className="font-sans font-semibold text-slate-900 text-lg md:text-xl leading-relaxed bg-slate-50 border-l-4 border-emerald-600 p-5 rounded-r-2xl">
                      {selectedActivity.description}
                    </p>
                    <ArticleRenderer content={selectedActivity.content} />
                  </div>

                  {/* Additional Gallery Images */}
                  {selectedActivity.additionalImages && selectedActivity.additionalImages.length > 0 && (
                    <div className="space-y-6 pt-8 border-t border-slate-100">
                      <h4 className="font-sans font-extrabold text-slate-800 text-sm tracking-wide uppercase">Programme Highlights & Session Photos</h4>
                      <div className="grid grid-cols-1 gap-8">
                        {selectedActivity.additionalImages.map((imgUrl, idx) => (
                          <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-150 shadow-xs bg-slate-900/5 flex items-center justify-center p-2 sm:p-4 min-h-[200px]">
                            <div 
                              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-15 scale-110 pointer-events-none"
                              style={{ backgroundImage: `url(${imgUrl})` }}
                            />
                            <img
                              src={imgUrl}
                              alt={`${selectedActivity.title} - Session Photo ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              className="relative z-10 max-w-full max-h-[580px] w-auto h-auto object-contain rounded-xl shadow-xs block mx-auto"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Call to Action Card */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-12 shadow-sm">
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-lg text-slate-900">Want to help with this initiative?</h4>
                      <p className="font-sans text-sm text-slate-500 font-medium">We host monthly education workshops, mentor pairings, and training programs.</p>
                    </div>
                    <button
                      onClick={() => setActivePage('opportunities')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                    >
                      Explore Open Opportunities
                    </button>
                  </div>
                </article>

              </div>
            </motion.div>
          )}

          {/* OPPORTUNITY DETAIL PAGE VIEW */}
          {activePage === 'opportunity-detail' && selectedOpportunity && (
            <motion.div
              key="opportunity-detail-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 md:py-32 bg-[#f8fafc]"
            >
              <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-8">
                
                {/* Back button */}
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setActivePage('opportunities');
                      setSelectedOpportunity(null);
                    }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors group cursor-pointer"
                  >
                    <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Opportunities</span>
                  </button>
                </div>

                {/* Main Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Details & Requirements (7 cols) */}
                  <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-150 px-3.5 py-1.5 rounded-full">
                          {selectedOpportunity.type}
                        </span>
                        <span className="font-sans text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                          {selectedOpportunity.category}
                        </span>
                        {selectedOpportunity.isAvailable !== false ? (
                          <span className="font-sans text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-150 text-emerald-700 bg-emerald-50">
                            ● Open
                          </span>
                        ) : (
                          <span className="font-sans text-xs font-bold px-3 py-1.5 rounded-full border border-rose-150 text-rose-700 bg-rose-50">
                            ● Closed
                          </span>
                        )}
                      </div>
                      <h1 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight">
                        {selectedOpportunity.title}
                      </h1>

                      {/* Metadata bar */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium font-sans border-y border-slate-100 py-4">
                        <span className="flex items-center gap-2 flex-wrap">
                          <MapPin size={15} className="text-emerald-600 shrink-0" />
                          {selectedOpportunity.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar size={15} className="text-emerald-600 shrink-0" />
                          Apply by: {selectedOpportunity.deadline}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                      <h3 className="font-sans font-bold text-lg text-slate-900">Role Description</h3>
                      <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {selectedOpportunity.description}
                      </p>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-4 pt-6 border-t border-slate-100">
                      <h3 className="font-sans font-bold text-lg text-slate-900 uppercase tracking-wide">
                        Core Requirements
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600 font-sans">
                        {selectedOpportunity.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>

                      {selectedOpportunity.jdUrl && (
                        <div className="pt-6 border-t border-slate-100">
                          <a
                            href={selectedOpportunity.jdUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-sans font-semibold py-2.5 px-5 rounded-xl text-sm transition-all shadow-sm border border-slate-200 cursor-pointer"
                          >
                            <ExternalLink size={16} className="text-emerald-600" />
                            <span>View Full Job Description</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: How to Apply (5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-sans font-bold text-xl text-slate-900 tracking-tight">How to Apply</h3>
                        <p className="font-sans text-xs text-slate-500 leading-relaxed">
                          We are excited that you want to join us! Please follow these guidelines to submit your application.
                        </p>
                      </div>

                      {/* Email box */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl">
                            <Mail size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="font-sans text-xs font-bold text-slate-700">Submit Your Application To</h5>
                            <p className="font-sans text-xs font-semibold text-slate-900 select-all truncate">{SITE_CONFIG.applyEmail}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(SITE_CONFIG.applyEmail);
                              setOppCopied(true);
                              setTimeout(() => setOppCopied(false), 2000);
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-600 font-sans font-medium py-2 px-3 rounded-xl text-xs transition-all cursor-pointer"
                          >
                            {oppCopied ? (
                              <>
                                <CheckCircle2 size={13} className="text-emerald-500" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Copy Email</span>
                              </>
                            )}
                          </button>
                          <a
                            href={`mailto:${SITE_CONFIG.applyEmail}?subject=Application: ${selectedOpportunity.title}`}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold py-2 px-3 rounded-xl text-xs transition-all text-center"
                          >
                            <Send size={13} />
                            <span>Send Email</span>
                          </a>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h5 className="font-sans text-xs font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                          <FileText size={14} className="text-slate-500" />
                          <span>What to Include</span>
                        </h5>
                        <div className="space-y-3">
                          <div className="bg-slate-50/50 border border-slate-100/80 rounded-xl p-3.5 space-y-1">
                            <span className="inline-block bg-slate-200 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-sans">Required</span>
                            <h6 className="font-sans text-xs font-bold text-slate-800">Your Full CV / Resume</h6>
                            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                              Include an updated CV highlighting relevant skills and experiences.
                            </p>
                          </div>

                          <div className="bg-slate-50/50 border border-slate-100/80 rounded-xl p-3.5 space-y-1">
                            <span className="inline-block bg-slate-200 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-sans">Required</span>
                            <h6 className="font-sans text-xs font-bold text-slate-800">Motivation Statement</h6>
                            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                              Explain why you want to support Project Luminary and how your background aligns.
                            </p>
                          </div>

                          <div className="bg-slate-50/50 border border-slate-100/80 rounded-xl p-3.5 space-y-1">
                            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-sans">Recommended</span>
                            <h6 className="font-sans text-xs font-bold text-slate-800">Subject Line Format</h6>
                            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                              Use: <code className="bg-slate-100 text-emerald-700 px-1 py-0.5 rounded font-mono text-[10px] select-all">[Application] {selectedOpportunity.title} - [Your Name]</code>
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="font-sans text-[10px] text-slate-400 leading-relaxed">
                        Our teams review applications on a rolling basis. You can expect to hear back from our team within 5-7 business days of submission.
                      </p>
                    </div>
                  </div>

                </div>

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
                    Find Your Place in What Comes Next.
                  </h1>
                  <p className="font-sans text-slate-500 text-sm md:text-base leading-relaxed">
                    Whether you want to join our team, contribute to research, participate in a programme, share your expertise, or explore a partnership, discover opportunities to contribute to Project Luminary’s growing work.
                  </p>
                </div>

                {/* Filters Board */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4 max-w-4xl mx-auto">
                  <div className="flex items-center space-x-2 text-slate-800 font-semibold text-sm border-b border-slate-150 pb-3">
                    <Filter size={16} className="text-emerald-600" />
                    <span>Filter Opportunities Grid</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

                    {/* Filter Status */}
                    <div className="space-y-1.5">
                      <label htmlFor="filter-opp-status" className="block text-xs font-bold text-slate-700 uppercase">Status</label>
                      <select
                        id="filter-opp-status"
                        value={selectedOppStatus}
                        onChange={(e) => setSelectedOppStatus(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Open">Open Only</option>
                        <option value="Closed">Closed Only</option>
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
                        setSelectedOppStatus('All');
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
                        onApply={handleSelectOpportunity}
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
                    Start a Conversation with Us.
                  </h1>
                  <p className="font-sans text-slate-500 text-sm md:text-base leading-relaxed">
                    Whether you are interested in collaborating, supporting our work, sharing expertise, or simply learning more about Project Luminary, we would be glad to hear from you.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                  
                  {/* Left Column: Form component */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <ContactForm />
                  </div>

                  {/* Right Column: Contact Details */}
                  <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
                    
                    {/* Information block */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6">
                      <h3 className="font-sans font-bold text-xl text-slate-900">Contact Information</h3>
                      
                      <ul className="space-y-4 text-sm text-slate-600 font-sans font-medium">
                        <li className="flex items-start space-x-3.5">
                          <MapPin size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                          <span>{SITE_CONFIG.address}</span>
                        </li>
                        <li className="flex items-center space-x-3.5">
                          <Mail size={20} className="text-emerald-600 shrink-0" />
                          <span>{SITE_CONFIG.email}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Donate Us Callout Box */}
                    <div id="donate-us-callout-box" className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white border border-emerald-800/40 rounded-3xl p-8 shadow-sm space-y-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                        <Heart size={100} className="text-emerald-300 fill-emerald-300" />
                      </div>
                      <div className="inline-flex items-center space-x-2 bg-emerald-800/50 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-700/50">
                        <Heart size={13} className="text-emerald-400 fill-emerald-400" />
                        <span>Support Our Mission</span>
                      </div>
                      <h3 className="font-sans font-bold text-2xl text-white tracking-tight leading-tight">
                        Support Project Luminary
                      </h3>
                      <p className="font-sans text-xs text-emerald-100/80 leading-relaxed">
                        Your contributions empower young leaders across Myanmar through accessible learning programs, youth mentorship, and grassroots civic initiatives.
                      </p>
                      <button
                        id="donate-us-box-btn"
                        onClick={() => {
                          setActivePage('donate-us');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer"
                      >
                        <Heart size={18} className="fill-slate-950" />
                        <span>Donate Us</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* DONATE US PAGE VIEW */}
          {activePage === 'donate-us' && (
            <motion.div
              key="donate-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 md:py-32 bg-[#f8fafc]"
            >
              <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
                    <Heart size={14} className="text-emerald-600 fill-emerald-600" />
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">Support Project Luminary</span>
                  </div>
                  <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight">
                    Invest in Myanmar&apos;s Next Generation.
                  </h1>
                  <p className="font-sans text-slate-500 text-sm md:text-base leading-relaxed">
                    Every contribution directly funds student learning stipends, open research programs, community initiatives, and educational workshops.
                  </p>
                </div>

                {/* Form Container */}
                <DonateForm />

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Global Modals for details overlays */}
      <AnimatePresence>
        {selectedActivity && activePage !== 'activity-detail' && (
          <ActivityModal 
            activity={selectedActivity} 
            onClose={() => setSelectedActivity(null)} 
          />
        )}
        {selectedOpportunity && activePage !== 'opportunity-detail' && (
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
