import React from 'react';
import ScoreGauge from '~/components/ScoreGauge';

interface HireabilityCardProps {
    hireability: HireabilityResult;
    jobTitle: string;
}

const HireabilityCard: React.FC<HireabilityCardProps> = ({ hireability, jobTitle }) => {
    // Verdict styling
    const verdictStyles = {
        "Strong Shortlist": {
            bg: 'bg-gradient-to-br from-emerald-500 to-green-600',
            text: 'text-white',
            icon: '✓',
            glow: 'shadow-emerald-200',
        },
        "Borderline": {
            bg: 'bg-gradient-to-br from-amber-400 to-orange-500',
            text: 'text-white',
            icon: '~',
            glow: 'shadow-amber-200',
        },
        "Unlikely": {
            bg: 'bg-gradient-to-br from-red-400 to-rose-600',
            text: 'text-white',
            icon: '✗',
            glow: 'shadow-red-200',
        },
    };

    const style = verdictStyles[hireability.verdict];

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full overflow-hidden">
            {/* Header with verdict badge */}
            <div className={`${style.bg} ${style.text} p-6`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm opacity-80 font-medium mb-1">Recruiter Decision Score</p>
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <span className="text-5xl">{style.icon}</span>
                            {hireability.verdict}
                        </h2>
                        <p className="text-sm opacity-80 mt-2">
                            For: <span className="font-semibold">{jobTitle}</span>
                        </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-center">
                            <span className="text-4xl font-bold">{hireability.hireabilityIndex}</span>
                            <span className="text-lg opacity-80">/100</span>
                        </div>
                        <p className="text-xs opacity-80 mt-1">Hireability Index</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Two-column layout for reasons */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Shortlist Reasons */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-emerald-700 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Why You'd Be Shortlisted
                        </h3>
                        <div className="space-y-2">
                            {hireability.shortlistReasons.length > 0 ? (
                                hireability.shortlistReasons.map((reason, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-sm text-emerald-800"
                                    >
                                        <span className="font-medium text-emerald-600 mr-2">+</span>
                                        {reason}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm italic">No clear shortlist signals detected</p>
                            )}
                        </div>
                    </div>

                    {/* Rejection Risks */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Rejection Risks
                        </h3>
                        <div className="space-y-2">
                            {hireability.rejectionRisks.length > 0 ? (
                                hireability.rejectionRisks.map((risk, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-red-50 border border-red-100 rounded-lg p-3 text-sm text-red-800"
                                    >
                                        <span className="font-medium text-red-600 mr-2">−</span>
                                        {risk}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm italic">No major rejection risks detected</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Top Improvements */}
                {hireability.topImprovements.length > 0 && (
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Top Actions to Improve Hireability
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {hireability.topImprovements.map((improvement, idx) => (
                                <div
                                    key={idx}
                                    className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-start gap-3"
                                >
                                    <span className="bg-indigo-200 text-indigo-800 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                        {idx + 1}
                                    </span>
                                    <p className="text-sm text-indigo-800">{improvement}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer note */}
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">How this works:</span> This score simulates how a recruiter would evaluate your resume in 10 seconds for this specific role. It weighs job relevance (35%), ATS readability (20%), impact strength (20%), and section consistency (15%), with penalties for weak bullets and repetition.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HireabilityCard;
