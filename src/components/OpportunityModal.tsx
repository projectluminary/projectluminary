import React, { useState } from 'react';
import { X, MapPin, Calendar, Check, Mail, FileText, Send, Copy, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Opportunity } from '../types';
import { SITE_CONFIG } from '../data';

interface OpportunityModalProps {
  opportunity: Opportunity;
  onClose: () => void;
}

export default function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="opportunity-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div
        id="opportunity-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row border border-slate-150"
      >
        {/* Left Side: Detail Overview */}
        <div className="md:w-1/2 bg-slate-900 text-white p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-[90vh]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-900/40">
                {opportunity.type}
              </span>
              {/* Close button inside detailed sidebar (visible on mobile only) */}
              <button
                onClick={onClose}
                className="md:hidden text-slate-400 hover:text-white p-2 rounded-full focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-sans font-bold text-2xl tracking-tight leading-tight">
                {opportunity.title}
              </h3>
              <p className="font-sans text-xs text-slate-400 font-medium">{opportunity.category}</p>
            </div>

            <div className="space-y-3 text-xs font-sans text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-400 shrink-0" />
                <span>{opportunity.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-emerald-400 shrink-0" />
                <span>Application Deadline: {opportunity.deadline}</span>
              </div>
            </div>

            {opportunity.description && (
              <div className="pt-4 border-t border-slate-800">
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  {opportunity.description}
                </p>
              </div>
            )}

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="font-sans font-bold text-sm text-white tracking-wide uppercase">
                Core Requirements
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {opportunity.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 text-[10px] text-slate-500 font-sans hidden md:block">
            Project Luminary ensures equal opportunities for all volunteers, employees, and community participants.
          </div>
        </div>

        {/* Right Side: Apply Instructions Panel */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh] flex flex-col justify-start relative">
          {/* Close button (desktop only) */}
          <button
            id="opportunity-modal-close-desktop"
            onClick={onClose}
            className="hidden md:block absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full focus:outline-none cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="space-y-6 pt-2">
            <div className="space-y-1">
              <h4 className="font-sans font-bold text-xl text-slate-900 tracking-tight">How to Apply</h4>
              <p className="font-sans text-xs text-slate-400 font-medium leading-relaxed">
                We are excited that you are interested in joining us! Please follow the guidelines below to submit your application.
              </p>
            </div>

            {/* Email Box */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
                  <Mail size={18} />
                </div>
                <div>
                  <h5 className="font-sans text-xs font-bold text-slate-700">Submit Your Application To</h5>
                  <p className="font-sans text-xs font-semibold text-slate-900 select-all">{SITE_CONFIG.email}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-600 font-sans font-medium py-2 px-3 rounded-xl text-xs transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      <span>Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${SITE_CONFIG.email}?subject=Application: ${opportunity.title}`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold py-2 px-3 rounded-xl text-xs transition-all text-center"
                >
                  <Send size={13} />
                  <span>Send Email</span>
                </a>
              </div>
            </div>

            {/* Application Requirements */}
            <div className="space-y-3">
              <h5 className="font-sans text-xs font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                <FileText size={14} className="text-slate-500" />
                <span>What to Include</span>
              </h5>
              <div className="space-y-3">
                <div className="bg-slate-50/50 border border-slate-100/80 rounded-xl p-3.5 space-y-1">
                  <span className="inline-block bg-slate-200 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-sans">Required</span>
                  <h6 className="font-sans text-xs font-bold text-slate-800">Your Full CV / Resume</h6>
                  <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                    Include an updated CV highlighting your relevant skills, previous roles, or educational background.
                  </p>
                </div>

                <div className="bg-slate-50/50 border border-slate-100/80 rounded-xl p-3.5 space-y-1">
                  <span className="inline-block bg-slate-200 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-sans">Required</span>
                  <h6 className="font-sans text-xs font-bold text-slate-800">Brief Motivation Statement</h6>
                  <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                    Explain why you want to support Project Luminary, what excites you about this specific role, and how your background aligns with our mission.
                  </p>
                </div>

                <div className="bg-slate-50/50 border border-slate-100/80 rounded-xl p-3.5 space-y-1">
                  <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-sans">Recommended</span>
                  <h6 className="font-sans text-xs font-bold text-slate-800">Subject Line Format</h6>
                  <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                    Please use the following format: <code className="bg-slate-100 text-emerald-700 px-1 py-0.5 rounded font-mono text-[10px] select-all">[Application] {opportunity.title} - [Your Name]</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="font-sans text-[10px] text-slate-400 leading-relaxed pt-2">
              Our teams review applications on a rolling basis. You can expect to hear back from our HR or Program Coordinator team within 5-7 business days of submission.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
