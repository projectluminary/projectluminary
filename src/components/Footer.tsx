import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowRight, Github } from 'lucide-react';
import { SITE_CONFIG } from '../data';
import { Logo } from './Logo';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleQuickLink = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* About Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div>
              <Logo size={36} variant="light" />
            </div>
            <span className="font-sans font-bold text-xl text-white tracking-tight">{SITE_CONFIG.brandName}</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Protecting, restoring, and educating communities to achieve sustainable coexistence with our biosphere. Join our decentralized climate action movement.
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <a
              href={SITE_CONFIG.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg text-slate-400 transition-all cursor-pointer"
              id="footer-social-linkedin"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={SITE_CONFIG.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg text-slate-400 transition-all cursor-pointer"
              id="footer-social-twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg text-slate-400 transition-all cursor-pointer"
              id="footer-social-instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={SITE_CONFIG.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-lg text-slate-400 transition-all cursor-pointer"
              id="footer-social-github"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="font-sans font-semibold text-white text-base mb-5 tracking-wide">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'activities', label: 'Activities' },
              { id: 'opportunities', label: 'Opportunities' },
              { id: 'contact', label: 'Contact Us' }
            ].map((link) => (
              <li key={link.id}>
                <button
                  id={`footer-link-${link.id}`}
                  onClick={() => handleQuickLink(link.id)}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400 font-medium"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-4">
          <h3 className="font-sans font-semibold text-white text-base mb-5 tracking-wide">Contact Us</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-emerald-500 mt-0.5 shrink-0" />
              <span>{SITE_CONFIG.address}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-emerald-500 shrink-0" />
              <span>{SITE_CONFIG.phone}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-emerald-500 shrink-0" />
              <span>{SITE_CONFIG.email}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h3 className="font-sans font-semibold text-white text-base mb-5 tracking-wide">Stay Updated</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Subscribe to our bi-weekly newsletter to receive direct updates on environmental reports, local cleanups, and policy campaigns.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                id="footer-email-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all pr-12"
                required
              />
              <button
                id="footer-email-submit"
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-emerald-400 animate-fade-in font-medium">
                Awesome! You have been subscribed successfully.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-slate-850 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} {SITE_CONFIG.brandName} Initiative. All rights reserved. Registered 501(c)(3) nonprofit organization.
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
