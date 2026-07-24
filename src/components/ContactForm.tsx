import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Please provide an email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email address (e.g., name@domain.com).';
    }
    if (!formData.subject.trim()) {
      tempErrors.subject = 'Please select or enter a subject.';
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Please write your message.';
    } else if (formData.message.trim().length < 15) {
      tempErrors.message = 'Please provide a bit more detail (minimum 15 characters).';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      
      if (accessKey) {
        try {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: accessKey,
              name: formData.name,
              email: formData.email,
              subject: formData.subject,
              message: formData.message,
              from_name: 'Project Luminary'
            })
          });

          const result = await response.json();
          
          if (response.ok && result.success) {
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setErrors({});
          } else {
            setSubmitError(result.message || 'Something went wrong. Please try again.');
          }
        } catch (err) {
          setSubmitError('Unable to connect to Web3Forms. Please check your internet connection and try again.');
        } finally {
          setIsSubmitting(false);
        }
      } else {
        // Fallback simulation mode when Web3Forms key is not configured in preview environment
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        id="contact-form-success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-10 text-center flex flex-col items-center justify-center space-y-4"
      >
        <div className="bg-emerald-500 text-white p-4 rounded-full shadow-lg shadow-emerald-500/20">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="font-sans font-bold text-2xl text-slate-900 tracking-tight">Message Received!</h3>
        <p className="text-slate-600 text-sm max-w-md leading-relaxed">
          Thank you for reaching out to Project Luminary. A dedicated member of our regional relations team will review your inquiry and get back to you within 24-48 business hours.
        </p>
        <button
          id="contact-form-reset-btn"
          onClick={() => setIsSuccess(false)}
          className="mt-4 font-sans text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-100/50 hover:bg-emerald-100 px-5 py-2.5 rounded-xl transition-all cursor-pointer"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form id="contact-us-form" onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Sarah Connor"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
              errors.name
                ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
              <AlertCircle size={14} /> {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="sarah@example.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
              errors.email
                ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
              <AlertCircle size={14} /> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700">
          Inquiry Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-all cursor-pointer ${
            errors.subject
              ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
              : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
          }`}
        >
          <option value="">-- Please select a subject --</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Partnership & Collaboration">Partnership &amp; Collaboration</option>
          <option value="Programme Participation">Programme Participation</option>
          <option value="Research & Academic Collaboration">Research &amp; Academic Collaboration</option>
          <option value="Media & Speaking Requests">Media &amp; Speaking Requests</option>
          <option value="Support Project Luminary">Support Project Luminary</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && (
          <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
            <AlertCircle size={14} /> {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe how you'd like to get involved or what you're interested in collaborating on..."
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none ${
            errors.message
              ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
              : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
          }`}
        />
        {errors.message && (
          <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
            <AlertCircle size={14} /> {errors.message}
          </p>
        )}
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <AlertCircle size={16} />
          <span>{submitError}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        id="contact-submit-btn"
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold py-4 rounded-xl transition-all shadow-sm disabled:bg-emerald-400 active:scale-98 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Submitting Message...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}
