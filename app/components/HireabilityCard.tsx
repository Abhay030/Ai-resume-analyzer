import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '~/components/ui/animations';

interface HireabilityCardProps {
    hireability: HireabilityResult;
    jobTitle: string;
}

const HireabilityCard: React.FC<HireabilityCardProps> = ({ hireability, jobTitle }) => {
    // Verdict styling
    const verdictStyles = {
        "Strong Shortlist": {
            bg: 'from-emerald-500 to-emerald-600',
            text: 'text-white',
            icon: '✓',
            iconBg: 'bg-white/20',
            scoreBg: 'bg-white/20',
        },
        "Borderline": {
            bg: 'from-amber-400 to-orange-500',
            text: 'text-white',
            icon: '~',
            iconBg: 'bg-white/20',
            scoreBg: 'bg-white/20',
        },
        "Unlikely": {
            bg: 'from-rose-400 to-rose-600',
            text: 'text-white',
            icon: '✗',
            iconBg: 'bg-white/20',
            scoreBg: 'bg-white/20',
        },
    };

    const style = verdictStyles[hireability.verdict];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
            {/* Header with verdict badge */}
            <div className={`bg-gradient-to-r ${style.bg} ${style.text} p-6`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className={`w-16 h-16 ${style.iconBg} backdrop-blur-sm rounded-2xl flex items-center justify-center`}
                        >
                            <span className="text-4xl">{style.icon}</span>
                        </motion.div>
                        <div>
                            <p className="text-sm opacity-80 font-medium mb-1">Recruiter Decision Score</p>
                            <motion.h2
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold"
                            >
                                {hireability.verdict}
                            </motion.h2>
                            <p className="text-sm opacity-80 mt-1">
                                For: <span className="font-semibold">{jobTitle}</span>
                            </p>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className={`${style.scoreBg} backdrop-blur-sm rounded-2xl px-6 py-4 text-center`}
                    >
                        <div className="text-4xl font-bold">
                            <AnimatedCounter value={hireability.hireabilityIndex} duration={1.5} />
                        </div>
                        <p className="text-xs opacity-80 mt-1">out of 100</p>
                    </motion.div>
                </div>
            </div>

            {/* Micro-copy */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-sm text-gray-600 text-center">
                    Would a recruiter shortlist you in <span className="font-semibold">10 seconds</span>?
                </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Two-column layout for reasons */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Shortlist Reasons */}
                    <div className="space-y-3">
                        <h3 className="text-base font-semibold text-emerald-700 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Why You'd Be Shortlisted
                        </h3>
                        <div className="space-y-2">
                            {hireability.shortlistReasons.length > 0 ? (
                                hireability.shortlistReasons.map((reason, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                        className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-sm text-emerald-800"
                                    >
                                        <span className="font-semibold text-emerald-500 mr-2">+</span>
                                        {reason}
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm italic">No clear shortlist signals detected</p>
                            )}
                        </div>
                    </div>

                    {/* Rejection Risks */}
                    <div className="space-y-3">
                        <h3 className="text-base font-semibold text-rose-700 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Rejection Risks
                        </h3>
                        <div className="space-y-2">
                            {hireability.rejectionRisks.length > 0 ? (
                                hireability.rejectionRisks.map((risk, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                        className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-sm text-rose-800"
                                    >
                                        <span className="font-semibold text-rose-500 mr-2">−</span>
                                        {risk}
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm italic">No major rejection risks detected</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Top Improvements */}
                {hireability.topImprovements.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="border-t border-gray-100 pt-6"
                    >
                        <h3 className="text-base font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Top Actions to Improve Hireability
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {hireability.topImprovements.map((improvement, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9 + idx * 0.1 }}
                                    whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)' }}
                                    className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 cursor-default transition-colors hover:bg-indigo-100/50"
                                >
                                    <span className="bg-indigo-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                        {idx + 1}
                                    </span>
                                    <p className="text-sm text-indigo-800">{improvement}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Footer note */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs text-slate-500 text-center">
                        <span className="font-semibold text-slate-600">How this works:</span> Simulates a 10-second recruiter evaluation.
                        Weighs job relevance (35%), ATS (20%), impact strength (20%), consistency (15%), with penalties for issues.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default HireabilityCard;

