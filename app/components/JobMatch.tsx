import React, { useState } from 'react';
import ScoreGauge from '~/components/ScoreGauge';

interface JobMatchProps {
    jobMatch: JobMatchResult;
    jobTitle: string;
}

const JobMatch: React.FC<JobMatchProps> = ({ jobMatch, jobTitle }) => {
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

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

    // Determine gradient based on verdict
    const gradientClass = jobMatch.jobFitVerdict === 'Strong'
        ? 'from-blue-100'
        : jobMatch.jobFitVerdict === 'Moderate'
            ? 'from-purple-100'
            : 'from-orange-100';

    // Verdict badge styling
    const verdictStyle = {
        Strong: 'bg-blue-500 text-white',
        Moderate: 'bg-purple-500 text-white',
        Poor: 'bg-orange-500 text-white',
    };

    return (
        <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-6`}>
            {/* Header with score gauge */}
            <div className="flex items-center gap-6 mb-6">
                <ScoreGauge score={jobMatch.jobMatchPercentage} />
                <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold">Job Match Score</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${verdictStyle[jobMatch.jobFitVerdict]}`}>
                            {jobMatch.jobFitVerdict} Fit
                        </span>
                    </div>
                    <p className="text-gray-600 mt-1">
                        Match analysis for: <span className="font-semibold">{jobTitle}</span>
                    </p>
                </div>
            </div>

            {/* Keywords Section */}
            <div className="mb-6">
                {/* Matched Keywords */}
                {jobMatch.matchedKeywords.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
                            <img src="/icons/check.svg" alt="check" className="w-5 h-5" />
                            Matched Skills & Keywords
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {jobMatch.matchedKeywords.map((keyword, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Missing Keywords */}
                {jobMatch.missingKeywords.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-red-700 mb-2 flex items-center gap-2">
                            <img src="/icons/warning.svg" alt="warning" className="w-5 h-5" />
                            Missing from Resume
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {jobMatch.missingKeywords.map((keyword, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium border border-red-200"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Repetition Alerts */}
            {jobMatch.repetitions && jobMatch.repetitions.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-amber-700 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Repetition Detected
                    </h3>
                    <div className="space-y-3">
                        {jobMatch.repetitions.map((rep, idx) => (
                            <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded">
                                        {rep.repeatedConcept}
                                    </span>
                                </div>
                                <p className="text-gray-700 mt-2 text-sm italic border-l-2 border-amber-300 pl-3">
                                    "{rep.originalBullet}"
                                </p>
                                <p className="text-amber-800 mt-2 text-sm font-medium">
                                    💡 {rep.suggestion}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Weak Bullet Points with Rewrites */}
            {jobMatch.weakBullets && jobMatch.weakBullets.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Suggested Rewrites
                    </h3>
                    <div className="space-y-4">
                        {jobMatch.weakBullets.map((bullet, idx) => (
                            <div key={idx} className="bg-white border border-indigo-200 rounded-lg overflow-hidden shadow-sm">
                                {/* Issue Badge */}
                                <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100">
                                    <span className="text-indigo-600 text-xs font-medium">
                                        Issue: {bullet.issue}
                                    </span>
                                </div>

                                {/* Before/After Comparison */}
                                <div className="p-4 space-y-3">
                                    {/* Original */}
                                    <div>
                                        <span className="text-xs font-bold text-red-500 uppercase tracking-wide">Before</span>
                                        <p className="text-gray-600 text-sm mt-1 line-through decoration-red-300">
                                            {bullet.original}
                                        </p>
                                    </div>

                                    {/* Rewrite */}
                                    <div>
                                        <span className="text-xs font-bold text-green-500 uppercase tracking-wide">After</span>
                                        <div className="flex items-start gap-2 mt-1">
                                            <p className="text-gray-800 text-sm font-medium flex-1">
                                                {bullet.rewrite}
                                            </p>
                                            <button
                                                onClick={() => copyToClipboard(bullet.rewrite, idx)}
                                                className="shrink-0 p-1.5 text-indigo-500 hover:bg-indigo-50 rounded transition-colors"
                                                title="Copy to clipboard"
                                            >
                                                {copiedIdx === idx ? (
                                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Job-Specific Suggestions */}
            {jobMatch.jobSpecificSuggestions.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">How to Improve Your Match</h3>
                    <div className="space-y-2">
                        {jobMatch.jobSpecificSuggestions.map((suggestion, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <span className="text-blue-500 font-bold">{idx + 1}.</span>
                                <p className="text-gray-700">{suggestion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Disclaimer */}
            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Note:</span> This score reflects fit for <span className="font-semibold">THIS job only</span>.
                    Your resume may score differently for other positions. Tailor your resume to each job for best results.
                </p>
            </div>
        </div>
    );
};

export default JobMatch;
