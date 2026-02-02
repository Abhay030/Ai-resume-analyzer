import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { usePuterStore } from '~/lib/puter';

// Type for resume index entry
export interface ResumeIndexEntry {
    id: string;
    companyName: string;
    jobTitle: string;
    overallScore: number;
    hireabilityVerdict: string;
    analyzedAt: number; // timestamp
}

// Helper to get score color
const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-500' };
    if (score >= 60) return { bg: 'bg-amber-100', text: 'text-amber-700', ring: 'ring-amber-500' };
    return { bg: 'bg-rose-100', text: 'text-rose-700', ring: 'ring-rose-500' };
};

// Helper to get verdict chip color
const getVerdictColor = (verdict: string) => {
    if (verdict === 'Strong' || verdict === 'Excellent') return 'bg-emerald-100 text-emerald-700';
    if (verdict === 'Moderate' || verdict === 'Good') return 'bg-amber-100 text-amber-700';
    return 'bg-rose-100 text-rose-700';
};

// Helper to format relative time
const getRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
};

const PreviouslyAnalyzed = () => {
    const { kv, auth } = usePuterStore();
    const [resumes, setResumes] = useState<ResumeIndexEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadResumes = async () => {
            if (!auth.isAuthenticated) {
                setIsLoading(false);
                return;
            }

            try {
                const indexData = await kv.get('resume-index');
                if (indexData) {
                    const parsed = JSON.parse(indexData);
                    // Get last 3 resumes
                    setResumes(parsed.slice(0, 3));
                }
            } catch (error) {
                console.error('Failed to load resume index:', error);
            }
            setIsLoading(false);
        };

        loadResumes();
    }, [auth.isAuthenticated, kv]);

    // Don't show if not authenticated or loading
    if (!auth.isAuthenticated || isLoading) return null;

    // Don't show if no resumes
    if (resumes.length === 0) return null;

    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Previously Analyzed
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Jump back into your recent analyses instantly
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume, index) => {
                        const scoreColors = getScoreColor(resume.overallScore);
                        const verdictColor = getVerdictColor(resume.hireabilityVerdict);

                        return (
                            <motion.div
                                key={resume.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <Link to={`/resume/${resume.id}`}>
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-shadow p-6 h-full"
                                    >
                                        {/* Header: Company + Score */}
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-gray-900 truncate text-lg">
                                                    {resume.companyName || 'Resume Analysis'}
                                                </h3>
                                                {resume.jobTitle && (
                                                    <p className="text-sm text-gray-500 truncate">{resume.jobTitle}</p>
                                                )}
                                            </div>

                                            {/* Score ring */}
                                            <div className={`flex-shrink-0 w-14 h-14 rounded-full ${scoreColors.bg} flex items-center justify-center ring-2 ${scoreColors.ring}`}>
                                                <span className={`text-lg font-bold ${scoreColors.text}`}>{resume.overallScore}</span>
                                            </div>
                                        </div>

                                        {/* Verdict chip */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${verdictColor}`}>
                                                {resume.hireabilityVerdict || 'Analyzed'}
                                            </span>
                                        </div>

                                        {/* Timestamp */}
                                        <div className="pt-3 border-t border-gray-100">
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {getRelativeTime(resume.analyzedAt)}
                                            </p>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Link (if more than 3) */}
                {resumes.length >= 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-8"
                    >
                        <Link
                            to="/dashboard"
                            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm inline-flex items-center gap-1"
                        >
                            View all analyses
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default PreviouslyAnalyzed;
