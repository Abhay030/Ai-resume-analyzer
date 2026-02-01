import React from 'react';
import { motion } from 'framer-motion';

const FooterSection: React.FC = () => {
    return (
        <footer className="py-12 bg-gray-50 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & tagline */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900">Resumind</span>
                            <p className="text-xs text-gray-500">AI-powered resume analysis</p>
                        </div>
                    </div>

                    {/* Tech stack */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 text-xs text-gray-400"
                    >
                        <span>Built with</span>
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-1 bg-white rounded border border-gray-200">React</span>
                            <span className="px-2 py-1 bg-white rounded border border-gray-200">TypeScript</span>
                            <span className="px-2 py-1 bg-white rounded border border-gray-200">AI</span>
                        </div>
                    </motion.div>

                    {/* Copyright */}
                    <p className="text-sm text-gray-400">
                        © 2025 Resumind. Made for job seekers.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
