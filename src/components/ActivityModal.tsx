import { X, Calendar, Clock, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { Activity } from '../types';

interface ActivityModalProps {
  activity: Activity;
  onClose: () => void;
}

export default function ActivityModal({ activity, onClose }: ActivityModalProps) {
  return (
    <div
      id="activity-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div
        id="activity-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-150"
      >
        {/* Modal Header Cover */}
        <div className="relative h-64 md:h-80 shrink-0 bg-slate-950 overflow-hidden flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${activity.image})` }}
          />
          <img
            src={activity.image}
            alt={activity.title}
            referrerPolicy="no-referrer"
            className="relative z-10 max-w-full max-h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10 pointer-events-none" />
          
          {/* Close button inside image */}
          <button
            id="activity-modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer z-20"
            aria-label="Close details"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-6 left-6 right-6 space-y-2 z-20">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 px-3 py-1 rounded-full">
                {activity.category}
              </span>
              {activity.status && (
                <span className={`font-sans text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  activity.status.toLowerCase().includes('ongoing')
                    ? 'bg-amber-500 text-white border-amber-400'
                    : 'bg-black/60 text-slate-100 border-white/20'
                }`}>
                  {activity.status}
                </span>
              )}
            </div>
            <h3 className="font-sans font-bold text-2xl md:text-3xl text-white leading-tight">
              {activity.title}
            </h3>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-b border-slate-100 pb-4 font-medium">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-emerald-600" />
              Published: {activity.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-emerald-600" />
              {activity.readTime}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen size={16} className="text-emerald-600" />
              Action Report
            </span>
          </div>

          {/* Description Block */}
          <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base font-sans">
            <p className="font-semibold text-slate-850">
              {activity.description}
            </p>
            <p className="whitespace-pre-line text-slate-500">
              {activity.content}
            </p>
          </div>

          {/* Additional Gallery Images */}
          {activity.additionalImages && activity.additionalImages.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h4 className="font-sans font-bold text-slate-800 text-sm tracking-wide uppercase">Programme Highlights & Session Photos</h4>
              <div className="grid grid-cols-1 gap-6">
                {activity.additionalImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
                    <img
                      src={imgUrl}
                      alt={`${activity.title} - Session Photo ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain max-h-[450px] block mx-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action Inside Modal */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
            <div>
              <div className="font-sans font-bold text-sm text-slate-900">Want to help with this?</div>
              <div className="font-sans text-xs text-slate-500 font-medium">We host restoring initiatives every month.</div>
            </div>
            <button
              id="activity-modal-action-btn"
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold px-5 py-2.5 rounded-xl transition-all text-center cursor-pointer"
            >
              Back to Activities
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
