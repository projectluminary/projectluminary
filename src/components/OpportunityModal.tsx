import React, { useState } from 'react';
import { X, MapPin, Calendar, Check, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Opportunity } from '../types';

interface OpportunityModalProps {
  opportunity: Opportunity;
  onClose: () => void;
}

export default function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    motivation: '',
    agreeToTerms: false
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    }
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address.';
    }
    if (!formData.motivation.trim() || formData.motivation.trim().length < 10) {
      errors.motivation = 'Please tell us a bit about your motivation (min 10 characters).';
    }
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the volunteer code of conduct.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1200);
    }
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

        {/* Right Side: Apply Form or Success State */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh] flex flex-col justify-center relative">
          {/* Close button (desktop only) */}
          <button
            id="opportunity-modal-close-desktop"
            onClick={onClose}
            className="hidden md:block absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full focus:outline-none cursor-pointer"
          >
            <X size={20} />
          </button>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="apply-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4 py-8"
              >
                <div className="inline-flex bg-emerald-100 text-emerald-600 p-4 rounded-full mb-2">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-sans font-bold text-xl text-slate-900 tracking-tight">Application Submitted!</h4>
                <p className="font-sans text-slate-500 text-xs leading-relaxed">
                  Thank you for applying for the <strong>{opportunity.title}</strong> role. Our program coordinators have received your application and will follow up with you by email soon.
                </p>
                <button
                  id="opportunity-success-close"
                  onClick={onClose}
                  className="mt-6 font-sans text-xs font-semibold text-white bg-slate-900 hover:bg-emerald-600 px-6 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Close Panel
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="apply-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-lg text-slate-900 tracking-tight">Apply for this Role</h4>
                  <p className="font-sans text-xs text-slate-400 font-medium">Please complete the short intake form below.</p>
                </div>

                <form id="opportunity-apply-form" onSubmit={handleApplySubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label htmlFor="apply-fullName" className="block text-xs font-bold text-slate-700">
                      Full Name
                    </label>
                    <input
                      id="apply-fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                        formErrors.fullName ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[10px] text-red-500 font-medium">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="apply-emailAddress" className="block text-xs font-bold text-slate-700">
                      Email Address
                    </label>
                    <input
                      id="apply-emailAddress"
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                        formErrors.emailAddress ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                      }`}
                    />
                    {formErrors.emailAddress && (
                      <p className="text-[10px] text-red-500 font-medium">{formErrors.emailAddress}</p>
                    )}
                  </div>

                  {/* Motivation */}
                  <div className="space-y-1">
                    <label htmlFor="apply-motivation" className="block text-xs font-bold text-slate-700">
                      Why are you interested in this role?
                    </label>
                    <textarea
                      id="apply-motivation"
                      name="motivation"
                      rows={3}
                      value={formData.motivation}
                      onChange={handleInputChange}
                      placeholder="Briefly share why you'd like to support our sustainability mission..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all resize-none ${
                        formErrors.motivation ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500'
                      }`}
                    />
                    {formErrors.motivation && (
                      <p className="text-[10px] text-red-500 font-medium">{formErrors.motivation}</p>
                    )}
                  </div>

                  {/* Agree checkbox */}
                  <div className="space-y-1.5 pt-2">
                    <label className="flex items-start gap-2 text-slate-600 text-[11px] cursor-pointer font-sans select-none">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }))}
                        className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>I agree to Project Luminary's Volunteer Code of Conduct and Environmental standards.</span>
                    </label>
                    {formErrors.agreeToTerms && (
                      <p className="text-[10px] text-red-500 font-medium">{formErrors.agreeToTerms}</p>
                    )}
                  </div>

                  {/* Submit Apply */}
                  <button
                    id="apply-form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold py-3 rounded-xl text-xs transition-all shadow-sm cursor-pointer disabled:bg-emerald-400"
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
