import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface CategorySectionProps {
  title: string;
  score: number;
  tips: Tip[];
  defaultOpen?: boolean;
}

const ScoreBadge = ({ score }: { score: number }) => {
  const getConfig = () => {
    if (score >= 70) return { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' };
    if (score >= 50) return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' };
    return { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' };
  };

  const config = getConfig();

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.text} border ${config.border}`}>
      {score}/100
    </span>
  );
};

const CategorySection: React.FC<CategorySectionProps> = ({ title, score, tips, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors px-1"
      >
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-gray-900">{title}</span>
          <ScoreBadge score={score} />
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="pb-4 space-y-2">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl p-4 ${tip.type === "good"
                      ? "bg-emerald-50 border border-emerald-100"
                      : "bg-amber-50 border border-amber-100"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    {tip.type === "good" ? (
                      <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-semibold mb-1 ${tip.type === "good" ? "text-emerald-800" : "text-amber-800"
                        }`}>
                        {tip.tip}
                      </p>
                      <p className={`text-sm ${tip.type === "good" ? "text-emerald-700" : "text-amber-700"
                        }`}>
                        {tip.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Detailed Breakdown</h2>
        <p className="text-sm text-gray-500 mt-1">
          Expand each category for tips and explanations
        </p>
      </div>

      {/* Categories */}
      <div className="px-6">
        <CategorySection
          title="Tone & Style"
          score={feedback.toneAndStyle.score}
          tips={feedback.toneAndStyle.tips}
          defaultOpen={false}
        />
        <CategorySection
          title="Content Quality"
          score={feedback.content.score}
          tips={feedback.content.tips}
          defaultOpen={false}
        />
        <CategorySection
          title="Structure"
          score={feedback.structure.score}
          tips={feedback.structure.tips}
          defaultOpen={false}
        />
        <CategorySection
          title="Skills Alignment"
          score={feedback.skills.score}
          tips={feedback.skills.tips}
          defaultOpen={false}
        />
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Click each section above to see specific tips and improvement suggestions
        </p>
      </div>
    </motion.div>
  );
};

export default Details;
