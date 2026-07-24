import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Heart, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function DonateForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    presetAmount: 50 as number | 'custom',
    customAmount: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const getEffectiveAmount = (): string => {
    if (formData.presetAmount === 'custom') {
      return formData.customAmount.trim();
    }
    return String(formData.presetAmount);
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      tempErrors.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      tempErrors.lastName = 'Last name is required.';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Please provide an email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email address (e.g., name@domain.com).';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    }
    if (!formData.address.trim()) {
      tempErrors.address = 'Mailing / Physical address is required.';
    }

    const amt = getEffectiveAmount();
    if (!amt || isNaN(Number(amt)) || Number(amt) <= 0) {
      tempErrors.amount = 'Please select or enter a valid donation amount.';
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
      if (!accessKey) {
        setSubmitError('Web3Forms Access Key is not configured. Please add VITE_WEB3FORMS_ACCESS_KEY in your environment/secrets configuration.');
        setIsSubmitting(false);
        return;
      }

      const finalAmount = getEffectiveAmount();
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Donation Request ($${finalAmount}) - ${fullName}`,
            from_name: 'Project Luminary - Donation',
            name: fullName,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            donation_amount: `$${finalAmount}`,
            message: `New Donation Intent Received:\n\nDonor Name: ${fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nDonation Amount: $${finalAmount}`
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setIsSuccess(true);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            presetAmount: 50,
            customAmount: ''
          });
          setErrors({});
        } else {
          setSubmitError(result.message || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        setSubmitError('Unable to connect to Web3Forms. Please check your internet connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.amount && (name === 'customAmount')) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        id="donate-form-success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-10 md:p-14 text-center flex flex-col items-center justify-center space-y-5 shadow-sm"
      >
        <div className="bg-emerald-600 text-white p-4 rounded-full shadow-lg shadow-emerald-600/20">
          <CheckCircle2 size={42} />
        </div>
        <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
          Donation Request Received!
        </h3>
        <p className="text-slate-700 text-base md:text-lg max-w-lg leading-relaxed font-semibold">
          Thank you for your generosity! The Luminary Team will reach you back soon.
        </p>
        <p className="text-slate-500 text-xs max-w-md leading-relaxed">
          Our team will contact you at your email or phone number to confirm details and provide payment instructions for your contribution.
        </p>
        <button
          id="donate-form-reset-btn"
          onClick={() => setIsSuccess(false)}
          className="mt-4 font-sans text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200/80 px-6 py-3 rounded-xl transition-all cursor-pointer"
        >
          Submit Another Contribution
        </button>
      </motion.div>
    );
  }

  return (
    <form id="donate-us-form" onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
      
      {/* Donation Amount Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-800 uppercase tracking-wide">
          Select Donation Amount ($USD) <span className="text-red-500">*</span>
        </label>
        
        {/* Choice Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {PRESET_AMOUNTS.map((amount) => {
            const isSelected = formData.presetAmount === amount;
            return (
              <button
                key={amount}
                type="button"
                id={`donate-amount-btn-${amount}`}
                onClick={() => {
                  setFormData(prev => ({ ...prev, presetAmount: amount, customAmount: '' }));
                  if (errors.amount) setErrors(prev => ({ ...prev, amount: '' }));
                }}
                className={`py-3.5 px-3 rounded-2xl font-sans font-extrabold text-sm border transition-all cursor-pointer text-center ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 scale-[1.02]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                ${amount}
              </button>
            );
          })}
        </div>

        {/* Custom Amount Toggle & Input */}
        <div className="pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="donate-amount-custom-btn"
              onClick={() => {
                setFormData(prev => ({ ...prev, presetAmount: 'custom' }));
              }}
              className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold border transition-all cursor-pointer ${
                formData.presetAmount === 'custom'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              Custom Amount
            </button>

            {formData.presetAmount === 'custom' && (
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                <input
                  id="donate-custom-amount-input"
                  type="number"
                  name="customAmount"
                  min="1"
                  step="any"
                  value={formData.customAmount}
                  onChange={handleChange}
                  placeholder="Enter custom amount (e.g. 150)"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 font-sans"
                />
              </div>
            )}
          </div>
        </div>

        {errors.amount && (
          <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
            <AlertCircle size={14} /> {errors.amount}
          </p>
        )}
      </div>

      <div className="border-t border-slate-100 pt-6 space-y-6">
        <h4 className="font-sans font-bold text-lg text-slate-900">Your Contact Details</h4>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="donate-first-name" className="block text-sm font-semibold text-slate-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="donate-first-name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Aung"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                errors.firstName
                  ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
                <AlertCircle size={14} /> {errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="donate-last-name" className="block text-sm font-semibold text-slate-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="donate-last-name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Kyaw"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                errors.lastName
                  ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
              }`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
                <AlertCircle size={14} /> {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="donate-email" className="block text-sm font-semibold text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="donate-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="aungkyaw@example.com"
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

          <div className="space-y-2">
            <label htmlFor="donate-phone" className="block text-sm font-semibold text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="donate-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+95 9 123 456 789"
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                errors.phone
                  ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
                <AlertCircle size={14} /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label htmlFor="donate-address" className="block text-sm font-semibold text-slate-700">
            Mailing Address / Location <span className="text-red-500">*</span>
          </label>
          <input
            id="donate-address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="No. 123, Pyay Road, Kamayut Township, Yangon, Myanmar"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
              errors.address
                ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                : 'border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
            }`}
          />
          {errors.address && (
            <p className="text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
              <AlertCircle size={14} /> {errors.address}
            </p>
          )}
        </div>
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <AlertCircle size={16} />
          <span>{submitError}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        id="donate-submit-btn"
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-base py-4 rounded-xl transition-all shadow-md disabled:bg-emerald-400 active:scale-98 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Processing Donation Request...</span>
          </>
        ) : (
          <>
            <Heart size={20} className="fill-white" />
            <span>Submit Donation Request (${getEffectiveAmount() || '0'})</span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400 font-sans">
        By submitting, your details will be securely sent to the Project Luminary team via Web3Forms.
      </p>
    </form>
  );
}
