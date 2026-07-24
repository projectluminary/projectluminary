import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Activity } from '../types';

interface ActivityCardProps {
  key?: string;
  activity: Activity;
  onReadMore: (activity: Activity) => void;
}

export default function ActivityCard({ activity, onReadMore }: ActivityCardProps) {
  return (
    <article
      id={`activity-card-${activity.id}`}
      className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full"
    >
      {/* Feature Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-900/10 shrink-0 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-xl opacity-25 scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${activity.image})` }}
        />
        <img
          src={activity.image}
          alt={activity.title}
          referrerPolicy="no-referrer"
          className="relative z-10 max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center gap-2 z-20">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50/95 border border-emerald-150 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-xs">
            {activity.category}
          </span>
          {activity.status && (
            <span className={`font-sans text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-xs ${
              activity.status.toLowerCase().includes('ongoing')
                ? 'bg-amber-500 text-white border-amber-400'
                : 'bg-slate-900/80 text-slate-100 border-slate-700/80'
            }`}>
              {activity.status}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 md:p-8 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata Block */}
          <div className="flex items-center space-x-4 text-xs text-slate-400 font-medium font-sans">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              {activity.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-slate-400" />
              {activity.readTime}
            </span>
          </div>

          <h3 className="font-sans font-bold text-xl text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
            {activity.title}
          </h3>

          <p className="font-sans text-slate-500 text-sm leading-relaxed line-clamp-3">
            {activity.description}
          </p>
        </div>

        {/* Read More Trigger */}
        <div className="pt-4 border-t border-slate-50">
          <button
            id={`activity-readmore-${activity.id}`}
            onClick={() => onReadMore(activity)}
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-emerald-700 hover:text-emerald-800 text-sm group/btn cursor-pointer"
          >
            <span>Read Full Story</span>
            <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform text-emerald-600" />
          </button>
        </div>
      </div>
    </article>
  );
}
