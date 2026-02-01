/**
 * Animation Utilities
 * Reusable Framer Motion components for premium UI experience
 */

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import React, { useState, useEffect } from 'react';

// ============================================
// ANIMATION VARIANTS
// ============================================

export const fadeSlideVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { opacity: 0, y: -10 }
};

export const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const staggerItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

export const scaleInVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

export const chipVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
};

// ============================================
// WRAPPER COMPONENTS
// ============================================

interface FadeSlideInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

/**
 * Fade + slide up animation on mount
 */
export const FadeSlideIn: React.FC<FadeSlideInProps> = ({ children, delay = 0, className }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay }}
        className={className}
    >
        {children}
    </motion.div>
);

interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Container that staggers children animations
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({ children, className }) => (
    <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * Item to be used inside StaggerContainer
 */
export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <motion.div variants={staggerItemVariants} className={className}>
        {children}
    </motion.div>
);

// ============================================
// ANIMATED SCORE RING
// ============================================

interface AnimatedScoreRingProps {
    score: number;
    size?: number;
    strokeWidth?: number;
    colorClass?: string;
    delay?: number;
}

/**
 * Animated circular score display
 */
export const AnimatedScoreRing: React.FC<AnimatedScoreRingProps> = ({
    score,
    size = 120,
    strokeWidth = 10,
    colorClass = 'stroke-indigo-500',
    delay = 0
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(100, Math.max(0, score)) / 100;

    // Determine color based on score
    const getColorClass = () => {
        if (score >= 70) return 'stroke-emerald-500';
        if (score >= 50) return 'stroke-amber-500';
        return 'stroke-rose-500';
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-gray-100"
                />
                {/* Animated progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className={getColorClass()}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference * (1 - percentage) }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay }}
                    style={{ strokeDasharray: circumference }}
                />
            </svg>
            {/* Score text */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.5, duration: 0.3 }}
            >
                <span className="text-2xl font-bold text-gray-800">{score}</span>
                <span className="text-xs text-gray-500 -mt-1">/ 100</span>
            </motion.div>
        </div>
    );
};

// ============================================
// COLLAPSIBLE SECTION
// ============================================

interface CollapsibleSectionProps {
    title: string;
    icon?: React.ReactNode;
    defaultOpen?: boolean;
    badge?: React.ReactNode;
    helperText?: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * Accordion-style collapsible section with smooth animation
 */
export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title,
    icon,
    defaultOpen = false,
    badge,
    helperText,
    children,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
        >
            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon && <span className="text-gray-500">{icon}</span>}
                    <div className="text-left">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                            {badge}
                        </div>
                        {helperText && (
                            <p className="text-sm text-gray-500 mt-0.5">{helperText}</p>
                        )}
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

            {/* Content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="px-6 pb-6 pt-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ============================================
// ANIMATED CHIP
// ============================================

interface AnimatedChipProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'neutral';
    delay?: number;
}

/**
 * Animated chip/badge with scale-in animation
 */
export const AnimatedChip: React.FC<AnimatedChipProps> = ({
    children,
    variant = 'neutral',
    delay = 0
}) => {
    const variantClasses = {
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        warning: 'bg-amber-50 text-amber-700 border-amber-200',
        danger: 'bg-rose-50 text-rose-700 border-rose-200',
        neutral: 'bg-gray-50 text-gray-700 border-gray-200'
    };

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay
            }}
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${variantClasses[variant]}`}
        >
            {children}
        </motion.span>
    );
};

// ============================================
// HOVER CARD
// ============================================

interface HoverCardProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Card with subtle hover lift effect
 */
export const HoverCard: React.FC<HoverCardProps> = ({ children, className = '' }) => (
    <motion.div
        whileHover={{ y: -2, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.2 }}
        className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}
    >
        {children}
    </motion.div>
);

// ============================================
// ANIMATED COUNTER
// ============================================

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    className?: string;
}

/**
 * Animated number counter
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    duration = 1.5,
    className = ''
}) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            setDisplayValue(Math.floor(progress * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return <span className={className}>{displayValue}</span>;
};
