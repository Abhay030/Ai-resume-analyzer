import React from 'react';
import { motion } from 'framer-motion';

interface StepProps {
    number: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    delay?: number;
    isLast?: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, delay = 0, isLast = false }) => {
    return (
        <div className="flex flex-col items-center relative">
            {/* Step card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all w-full max-w-[200px] text-center"
            >
                {/* Number badge */}
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-sm shadow-lg shadow-indigo-500/30">
                    {number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    {icon}
                </div>

                {/* Content */}
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
            </motion.div>

            {/* Connector line (hidden on last item and mobile) */}
            {!isLast && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: delay + 0.3 }}
                    className="hidden lg:block absolute top-1/2 left-full w-12 h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 origin-left -translate-y-1/2"
                    style={{ marginLeft: '8px' }}
                />
            )}
        </div>
    );
};

const HowItWorksSection: React.FC = () => {
    const steps = [
        {
            title: "Upload Resume",
            description: "Drop your PDF, we do the rest",
            icon: (
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            )
        },
        {
            title: "Add Job Details",
            description: "Paste the job description",
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Get Analysis",
            description: "ATS + Match + Hireability in seconds",
            icon: (
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: "Fix Issues",
            description: "AI rewrites weak bullets",
            icon: (
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            )
        },
        {
            title: "Apply Confidently",
            description: "Submit & get shortlisted",
            icon: (
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-lg text-gray-600 max-w-md mx-auto"
                    >
                        Five simple steps to a better resume
                    </motion.p>
                </div>

                {/* Steps - Desktop horizontal */}
                <div className="hidden lg:flex items-center justify-center gap-8">
                    {steps.map((step, index) => (
                        <Step
                            key={step.title}
                            number={index + 1}
                            title={step.title}
                            description={step.description}
                            icon={step.icon}
                            delay={index * 0.15}
                            isLast={index === steps.length - 1}
                        />
                    ))}
                </div>

                {/* Steps - Mobile vertical */}
                <div className="lg:hidden space-y-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex items-start gap-4"
                        >
                            {/* Number */}
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-indigo-500/30">
                                {index + 1}
                            </div>

                            {/* Content */}
                            <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                                </div>
                                <p className="text-sm text-gray-500 ml-11">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
