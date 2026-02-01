import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedScoreRing } from '~/components/ui/animations';

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Determine styling based on score
  const getScoreConfig = () => {
    if (score >= 70) return {
      gradient: 'from-emerald-50 to-white',
      badge: 'bg-emerald-100 text-emerald-700',
      label: 'ATS Friendly'
    };
    if (score >= 50) return {
      gradient: 'from-amber-50 to-white',
      badge: 'bg-amber-100 text-amber-700',
      label: 'Needs Work'
    };
    return {
      gradient: 'from-rose-50 to-white',
      badge: 'bg-rose-100 text-rose-700',
      label: 'At Risk'
    };
  };

  const config = getScoreConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-gradient-to-b ${config.gradient} rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}
    >
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <AnimatedScoreRing score={score} size={64} delay={0.1} />
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-gray-900">ATS Compatibility</h2>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>
                {config.label}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              How well ATS software can parse your resume
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6">
              {/* Why it matters */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Why this matters:</span> Most companies use ATS to filter resumes before human review. A low score means your resume might be rejected automatically.
                </p>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start gap-3 p-3 rounded-lg ${suggestion.type === "good"
                        ? "bg-emerald-50 border border-emerald-100"
                        : "bg-amber-50 border border-amber-100"
                      }`}
                  >
                    {suggestion.type === "good" ? (
                      <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    <p className={`text-sm ${suggestion.type === "good" ? "text-emerald-800" : "text-amber-800"
                      }`}>
                      {suggestion.tip}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ATS