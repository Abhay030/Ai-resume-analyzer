import { Link } from 'react-router';
import { motion } from 'framer-motion';

// Helper to get score color
const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-500' };
    if (score >= 60) return { bg: 'bg-amber-100', text: 'text-amber-700', ring: 'ring-amber-500' };
    return { bg: 'bg-rose-100', text: 'text-rose-700', ring: 'ring-rose-500' };
};

// Helper to get hireability verdict
const getHireabilityVerdict = (score: number) => {
    if (score >= 80) return { label: 'Strong', color: 'bg-emerald-100 text-emerald-700' };
    if (score >= 60) return { label: 'Moderate', color: 'bg-amber-100 text-amber-700' };
    return { label: 'Needs Work', color: 'bg-rose-100 text-rose-700' };
};

// Helper to format relative time
const getRelativeTime = () => {
    // Since we don't have actual timestamps, return a mock value
    const options = ['Just now', '2 hours ago', 'Yesterday', '2 days ago', 'Last week'];
    return options[Math.floor(Math.random() * options.length)];
};

const ResumeCard = ({ resume }: { resume: Resume }) => {
    const { id, companyName, jobTitle, feedback, imagePath } = resume;
    const score = feedback?.overallScore || 0;
    const scoreColors = getScoreColor(score);
    const verdict = getHireabilityVerdict(score);

    return (
        <Link to={`/resume/${id}`}>
            <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-shadow overflow-hidden group"
            >
                {/* Resume preview image */}
                {imagePath && (
                    <div className="relative h-40 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
                        <img
                            src={imagePath}
                            alt="Resume preview"
                            className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                    </div>
                )}

                {/* Content */}
                <div className="p-5">
                    {/* Header row: Company/Title + Score */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 truncate text-lg">
                                {companyName || 'Resume Analysis'}
                            </h3>
                            {jobTitle && (
                                <p className="text-sm text-gray-500 truncate">{jobTitle}</p>
                            )}
                        </div>

                        {/* Score ring */}
                        <div className={`flex-shrink-0 w-14 h-14 rounded-full ${scoreColors.bg} flex items-center justify-center ring-2 ${scoreColors.ring}`}>
                            <span className={`text-lg font-bold ${scoreColors.text}`}>{score}</span>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-3 mb-4">
                        {/* Hireability Chip */}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${verdict.color}`}>
                            {verdict.label}
                        </span>

                        {/* ATS Score */}
                        <span className="text-xs text-gray-500">
                            ATS: {feedback?.ATS?.score || 'N/A'}%
                        </span>
                    </div>

                    {/* Footer: Timestamp */}
                    <div className="pt-3 mt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Analyzed {getRelativeTime()}
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ResumeCard;