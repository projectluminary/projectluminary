import React from 'react';
import { MapPin, Calendar, Briefcase, ChevronRight } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityCardProps {
  key?: string;
  opportunity: Opportunity;
  onApply: (opportunity: Opportunity) => void;
}

export default function OpportunityCard({ opportunity, onApply }: OpportunityCardProps) {
  // Helper to get color code for opportunity types
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'Volunteer':
        return 'text-blue-700 bg-blue-50 border-blue-150';
      case 'Internship':
        return 'text-indigo-700 bg-indigo-50 border-indigo-150';
      case 'Job':
        return 'text-purple-700 bg-purple-50 border-purple-150';
      case 'Event':
        return 'text-orange-700 bg-orange-50 border-orange-150';
      case 'Training':
        return 'text-amber-700 bg-amber-50 border-amber-150';
      case 'Partnership':
        return 'text-emerald-700 bg-emerald-50 border-emerald-150';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-150';
    }
  };

  return (
    <div
      id={`opportunity-card-${opportunity.id}`}
      className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 h-full hover:border-emerald-100"
    >
      <div className="space-y-4">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-sans text-xs font-semibold px-3 py-1 rounded-full border ${getTypeStyles(opportunity.type)}`}>
            {opportunity.type}
          </span>
          <span className="font-sans text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
            {opportunity.category}
          </span>
          {opportunity.isAvailable !== false ? (
            <span className="font-sans text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 text-emerald-700 bg-emerald-50">
              ● Open
            </span>
          ) : (
            <span className="font-sans text-[11px] font-bold px-2.5 py-1 rounded-full border border-rose-100 text-rose-700 bg-rose-50">
              ● Closed
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-sans font-bold text-lg md:text-xl text-slate-900 group-hover:text-emerald-700 leading-snug">
          {opportunity.title}
        </h3>

        {/* Info Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500 font-sans font-medium">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-emerald-600 shrink-0" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-emerald-600 shrink-0" />
            <span>Apply by: {opportunity.deadline}</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-slate-500 text-sm leading-relaxed line-clamp-3">
          {opportunity.description}
        </p>
      </div>

      {/* Footer Block with Action */}
      <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
        <button
          id={`opportunity-apply-${opportunity.id}`}
          onClick={() => onApply(opportunity)}
          className="flex items-center justify-center gap-1.5 font-sans font-semibold text-emerald-700 hover:text-emerald-800 text-sm group cursor-pointer"
        >
          <span>View Details &amp; Apply</span>
          <ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform text-emerald-600" />
        </button>
      </div>
    </div>
  );
}
