import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import JobMatch from "~/components/JobMatch";
import HireabilityCard from "~/components/HireabilityCard";
import { StaggerContainer, StaggerItem } from "~/components/ui/animations";

export const meta = () => ([
    { title: 'Resumind | Resume Review' },
    { name: 'description', content: 'Detailed AI-powered analysis of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [jobMatch, setJobMatch] = useState<JobMatchResult | null>(null);
    const [hireability, setHireability] = useState<HireabilityResult | null>(null);
    const [jobTitle, setJobTitle] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if (!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            setJobMatch(data.jobMatch || null);
            setHireability(data.hireability || null);
            setJobTitle(data.jobTitle || '');
        }

        loadResume();
    }, [id]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
            {/* Premium Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                        <motion.div
                            whileHover={{ x: -3 }}
                            className="flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back to Home</span>
                        </motion.div>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Analyzing:</span>
                        <span className="text-sm font-semibold text-gray-800">{jobTitle || 'Resume'}</span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8 max-lg:flex-col-reverse">

                    {/* Left: Resume Preview Panel */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:w-[400px] lg:shrink-0"
                    >
                        <div className="lg:sticky lg:top-24">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-gray-600">Resume Preview</h3>
                                    {resumeUrl && (
                                        <a
                                            href={resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                                        >
                                            Open PDF
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                                {imageUrl ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="aspect-[8.5/11] bg-gray-50 rounded-xl overflow-hidden"
                                    >
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={imageUrl}
                                                className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-300"
                                                alt="Resume preview"
                                            />
                                        </a>
                                    </motion.div>
                                ) : (
                                    <div className="aspect-[8.5/11] bg-gray-100 rounded-xl flex items-center justify-center">
                                        <div className="text-center text-gray-400">
                                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="text-sm">Loading...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.aside>

                    {/* Right: Analysis Journey */}
                    <div className="flex-1 min-w-0">
                        {/* Page Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mb-8"
                        >
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analysis</h1>
                            <p className="text-gray-500">
                                AI-powered insights to help you land your dream job
                            </p>
                        </motion.div>

                        {feedback ? (
                            <StaggerContainer className="flex flex-col gap-6">
                                {/* 1. Hireability Index - Top Priority */}
                                {hireability && (
                                    <StaggerItem>
                                        <HireabilityCard hireability={hireability} jobTitle={jobTitle} />
                                    </StaggerItem>
                                )}

                                {/* 2. Overall Score Summary */}
                                <StaggerItem>
                                    <Summary feedback={feedback} />
                                </StaggerItem>

                                {/* 3. Job Match Analysis */}
                                {jobMatch && (
                                    <StaggerItem>
                                        <JobMatch jobMatch={jobMatch} jobTitle={jobTitle} />
                                    </StaggerItem>
                                )}

                                {/* 4. ATS Score */}
                                <StaggerItem>
                                    <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                </StaggerItem>

                                {/* 5. Detailed Breakdown */}
                                <StaggerItem>
                                    <Details feedback={feedback} />
                                </StaggerItem>

                                {/* Footer */}
                                <StaggerItem>
                                    <div className="text-center py-8 text-gray-400 text-sm">
                                        Analysis powered by AI • Results are suggestions, not guarantees
                                    </div>
                                </StaggerItem>
                            </StaggerContainer>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <img src="/images/resume-scan-2.gif" className="w-64 mb-4" alt="Loading" />
                                <p className="text-gray-500">Loading your analysis...</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Resume