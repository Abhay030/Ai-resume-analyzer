import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedScoreRing } from '~/components/ui/animations';

interface JobMatchProps {
    jobMatch: JobMatchResult;
    jobTitle: string;
}

const JobMatch: React.FC<JobMatchProps> = ({ jobMatch, jobTitle }) => {
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(true);

    // Copy rewrite to clipboard
    const copyToClipboard = async (text: string, idx: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIdx(idx);
            setTimeout(() => setCopiedIdx(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Determine styling based on verdict
    const getConfig = () => {
        if (jobMatch.jobFitVerdict === 'Strong') {
            return {
                gradient: 'from-emerald-50 to-white',
                badge: 'bg-emerald-500 text-white',
                label: 'Strong Match'
            };
        }
        if (jobMatch.jobFitVerdict === 'Moderate') {
            return {
                gradient: 'from-amber-50 to-white',
                badge: 'bg-amber-500 text-white',
                label: 'Moderate'
            };
        }
        return {
            gradient: 'from-rose-50 to-white',
            badge: 'bg-rose-500 text-white',
            label: 'Needs Work'
        };
    };

    const config = getConfig();

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
                    <AnimatedScoreRing score={jobMatch.jobMatchPercentage} size={64} delay={0.1} />
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-lg font-bold text-gray-900">Job Match Analysis</h2>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>
                                {config.label}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">
                            How aligned your resume is with <span className="font-semibold">{jobTitle}</span>
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
                        <div className="px-6 pb-6 space-y-6">
                            {/* Keywords Section */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Matched Keywords */}
                                {jobMatch.matchedKeywords.length > 0 && (
                                    <div className="bg-white rounded-xl p-4 border border-emerald-100">
                                        <h3 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Matched Skills ({jobMatch.matchedKeywords.length})
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {jobMatch.matchedKeywords.map((keyword, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.05, type: 'spring', stiffness: 300 }}
                                                    className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-200"
                                                >
                                                    {keyword}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Missing Keywords */}
                                {jobMatch.missingKeywords.length > 0 && (
                                    <div className="bg-white rounded-xl p-4 border border-rose-100">
                                        <h3 className="text-sm font-semibold text-rose-700 mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            Missing ({jobMatch.missingKeywords.length})
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {jobMatch.missingKeywords.map((keyword, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.05, type: 'spring', stiffness: 300 }}
                                                    className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs font-medium border border-rose-200"
                                                >
                                                    {keyword}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Repetition Alerts */}
                            {jobMatch.repetitions && jobMatch.repetitions.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Repetition Detected
                                    </h3>
                                    <div className="space-y-2">
                                        {jobMatch.repetitions.map((rep, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-amber-50 border border-amber-200 rounded-xl p-4"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">
                                                        {rep.repeatedConcept}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm italic border-l-2 border-amber-300 pl-3 mb-2">
                                                    "{rep.originalBullet}"
                                                </p>
                                                <p className="text-amber-800 text-sm font-medium">
                                                    💡 {rep.suggestion}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Weak Bullet Points with Rewrites */}
                            {jobMatch.weakBullets && jobMatch.weakBullets.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Suggested Rewrites
                                    </h3>
                                    <div className="space-y-3">
                                        {jobMatch.weakBullets.map((bullet, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-white border border-indigo-200 rounded-xl overflow-hidden"
                                            >
                                                {/* Issue Badge */}
                                                <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100">
                                                    <span className="text-indigo-600 text-xs font-medium">
                                                        Issue: {bullet.issue}
                                                    </span>
                                                </div>

                                                {/* Before/After Comparison */}
                                                <div className="p-4 grid md:grid-cols-2 gap-4">
                                                    {/* Original */}
                                                    <div className="bg-rose-50/50 rounded-lg p-3 border border-rose-100">
                                                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wide">Before</span>
                                                        <p className="text-gray-600 text-sm mt-1 line-through decoration-rose-300">
                                                            {bullet.original}
                                                        </p>
                                                    </div>

                                                    {/* Rewrite */}
                                                    <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wide">After</span>
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => copyToClipboard(bullet.rewrite, idx)}
                                                                className="p-1 text-indigo-500 hover:bg-indigo-100 rounded transition-colors"
                                                                title="Copy to clipboard"
                                                            >
                                                                {copiedIdx === idx ? (
                                                                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                    </svg>
                                                                )}
                                                            </motion.button>
                                                        </div>
                                                        <p className="text-gray-800 text-sm font-medium">
                                                            {bullet.rewrite}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Job-Specific Suggestions */}
                            {jobMatch.jobSpecificSuggestions.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">How to Improve Your Match</h3>
                                    <div className="space-y-2">
                                        {jobMatch.jobSpecificSuggestions.map((suggestion, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100"
                                            >
                                                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                                                    {idx + 1}
                                                </span>
                                                <p className="text-gray-700 text-sm">{suggestion}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Disclaimer */}
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <p className="text-xs text-slate-500 text-center">
                                    This analysis is for <span className="font-semibold text-slate-600">{jobTitle}</span> only.
                                    Results vary by position. Tailor your resume for each job.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default JobMatch;

