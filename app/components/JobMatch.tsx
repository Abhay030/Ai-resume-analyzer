import React from 'react';
import ScoreGauge from '~/components/ScoreGauge';

interface JobMatchProps {
    jobMatch: JobMatchResult;
    jobTitle: string;
}

const JobMatch: React.FC<JobMatchProps> = ({ jobMatch, jobTitle }) => {
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
