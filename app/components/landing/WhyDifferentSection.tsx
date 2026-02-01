import React from 'react';
import { motion } from 'framer-motion';

interface DifferentiatorProps {
    emoji: string;
    title: string;
    description: string;
    delay?: number;
}

const Differentiator: React.FC<DifferentiatorProps> = ({ emoji, title, description, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay }}
            className="flex items-start gap-4 py-6 border-b border-gray-100 last:border-b-0"
        >
            <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, delay: delay + 0.1 }}
                className="text-3xl"
            >
                {emoji}
            </motion.span>
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
};

const WhyDifferentSection: React.FC = () => {
    const differentiators = [
        {
            emoji: "✨",
            title: "Fix, don't just score",
            description: "Other tools tell you what's wrong. We rewrite your weak bullets on the spot with AI-powered suggestions."
        },
        {
            emoji: "🎯",
            title: "Job-specific, not generic",
            description: "Every suggestion is tailored to YOUR target role. Generic advice wastes time—we analyze for your exact job."
        },
        {
            emoji: "🧠",
            title: "Thinks like a recruiter",
            description: "We simulate the 10-second scan recruiters actually do. Understand what they see in those crucial first moments."
        },
        {
            emoji: "📊",
            title: "Hireability Index",
            description: "One score that predicts your interview chances. Based on real hiring signals, not just keyword matching."
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Why Resumind Is Different
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-lg text-gray-600"
                    >
                        Not another resume scanner. A hiring advantage.
                    </motion.p>
                </div>

                {/* Differentiators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
                >
                    {differentiators.map((item, index) => (
                        <Differentiator
                            key={item.title}
                            emoji={item.emoji}
                            title={item.title}
                            description={item.description}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>

                {/* Bottom comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-6 text-sm">
                        <span className="text-gray-400 line-through">Score your resume</span>
                        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span className="text-indigo-600 font-semibold">Get you shortlisted</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyDifferentSection;
