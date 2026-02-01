import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const CTASection: React.FC = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-indigo-50/50">
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    {/* Headline */}
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        Ready to get shortlisted?
                    </h2>

                    {/* Subheadline */}
                    <p className="text-xl text-gray-600 max-w-lg mx-auto">
                        Improve your chances, not just your resume.
                    </p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/upload">
                            <motion.button
                                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-5 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-indigo-500/30 transition-all"
                            >
                                Analyze My Resume — It's Free
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-6 pt-4 text-sm text-gray-500"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>No signup required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Results in seconds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>100% private</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
