import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section id="testimonials-section" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full border border-emerald-100">
            <span className="font-sans text-xs font-bold uppercase tracking-wider">Voices of Impact</span>
          </div>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Hear From Our Active Coalition
          </h2>
          <p className="font-sans text-slate-500 text-sm md:text-base leading-relaxed">
            Real stories from volunteers, policy interns, and community partners making a tangible difference for our planet every single day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              id={`testimonial-card-${testimonial.id}`}
              className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between h-full"
            >
              {/* Card Quote Decorator */}
              <div className="absolute top-6 right-8 text-emerald-100 shrink-0">
                <Quote size={48} className="transform rotate-180" />
              </div>

              {/* Comment */}
              <div className="space-y-4 relative z-10">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="font-sans text-slate-600 text-sm leading-relaxed italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-6 border-t border-slate-50 mt-6 relative z-10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                />
                <div>
                  <div className="font-sans font-bold text-sm text-slate-900">{testimonial.name}</div>
                  <div className="font-sans font-medium text-xs text-emerald-600">{testimonial.position}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
