import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

// Animated preview card showing sample analysis results
const PreviewCard: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
        >
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 border border-gray-100 p-6 w-[340px]">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                        className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                    <div>
                        <p className="font-semibold text-gray-900">Analysis Complete</p>
                        <p className="text-sm text-gray-500">Senior Frontend Developer</p>
                    </div>
                </div>

                {/* Score Ring */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-28 h-28">
                        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 112 112">
                            <circle
                                cx="56"
                                cy="56"
                                r="48"
                                fill="none"
                                stroke="#f1f5f9"
                                strokeWidth="8"
                            />
                            <motion.circle
                                cx="56"
                                cy="56"
                                r="48"
                                fill="none"
                                stroke="url(#scoreGradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 48}
                                initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - 0.85) }}
                                transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <span className="text-3xl font-bold text-gray-900">85</span>
                            <span className="text-xs text-gray-500">Hireability</span>
                        </motion.div>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <span className="text-sm font-medium text-gray-700">Job Match</span>
                        </div>
                        <span className="text-sm font-bold text-emerald-600">Strong</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                            <span className="text-sm font-medium text-gray-700">ATS Score</span>
                        </div>
                        <span className="text-sm font-bold text-indigo-600">78/100</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 }}
                        className="flex items-center justify-between p-3 bg-amber-50 rounded-xl"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full" />
                            <span className="text-sm font-medium text-gray-700">Issues Found</span>
                        </div>
                        <span className="text-sm font-bold text-amber-600">3 Fixable</span>
                    </motion.div>
                </div>
            </div>

            {/* Floating badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.3, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-2"
            >
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Likely to Shortlist</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/50" />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            />

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
                    {/* Left: Text content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                AI-Powered Resume Analysis
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
                        >
                            Get Shortlisted,
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Not Ignored
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="text-xl text-gray-600 max-w-lg leading-relaxed"
                        >
                            Analyze your resume the way recruiters do. Get ATS scores,
                            job-specific insights, and AI-powered rewrites that actually
                            get you interviews.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/upload">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-4 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
                                >
                                    Analyze My Resume
                                </motion.button>
                            </Link>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2"
                            >
                                See How It Works
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.button>
                        </motion.div>

                        {/* Trust indicator */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-sm text-gray-500"
                        >
                            ✨ Free to use • No signup required • Results in seconds
                        </motion.p>
                    </div>

                    {/* Right: Animated preview */}
                    <div className="flex justify-center lg:justify-end">
                        <PreviewCard />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
