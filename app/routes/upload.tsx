import { type FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage, extractPdfText } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";
import { analyzeJobMatch, type JobMatchResult } from "~/lib/jobMatchAnalyzer";
import { analyzeHireability, type HireabilityResult, type HireabilityInput } from "~/lib/hireabilityAnalyzer";

export function meta() {
    return [
        { title: "Upload Resume | Resumind" },
        { name: "description", content: "Upload your resume and get AI-powered analysis" },
    ];
}

const Upload = () => {
    const { fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    // Form state for validation
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const isFormValid = jobTitle.trim() && jobDescription.trim() && file;

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);

        setStatusText('Uploading your resume...');
        const uploadResult = await fs.upload([file]);
        if (!uploadResult) return setStatusText('Error: Failed to upload file');
        const uploadedFile = Array.isArray(uploadResult) ? uploadResult[0] : uploadResult;
        if (!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Processing resume...');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatusText('Error: Failed to convert PDF');

        const uploadImageResult = await fs.upload([imageFile.file]);
        if (!uploadImageResult) return setStatusText('Error: Failed to process resume');
        const uploadedImage = Array.isArray(uploadImageResult) ? uploadImageResult[0] : uploadImageResult;
        if (!uploadedImage) return setStatusText('Error: Failed to process resume');

        setStatusText('Preparing analysis...');
        const uuid = generateUUID();
        const data: {
            id: string;
            resumePath: string;
            imagePath: string;
            companyName: string;
            jobTitle: string;
            jobDescription: string;
            feedback: any;
            jobMatch: JobMatchResult | null;
            hireability: HireabilityResult | null;
        } = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
            jobMatch: null,
            hireability: null,
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing resume content...');
        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);

        setStatusText('Analyzing job fit...');
        const resumeText = await extractPdfText(file);
        if (resumeText && jobDescription) {
            const jobMatchResult = await analyzeJobMatch(resumeText, jobTitle, jobDescription);
            data.jobMatch = jobMatchResult;

            setStatusText('Calculating hireability score...');
            const hireabilityInput: HireabilityInput = {
                atsScore: data.feedback?.ATS?.score || 0,
                jobMatchScore: jobMatchResult?.jobMatchPercentage || 0,
                jobMatchVerdict: jobMatchResult?.jobFitVerdict || 'Poor',
                repetitionCount: jobMatchResult?.repetitions?.length || 0,
                weakBulletCount: jobMatchResult?.weakBullets?.length || 0,
                sectionScores: {
                    tone: data.feedback?.scores?.['Tone & Style'] || 0,
                    content: data.feedback?.scores?.Content || 0,
                    skills: data.feedback?.scores?.Skills || 0,
                    structure: data.feedback?.scores?.Structure || 0,
                },
                jobTitle,
                jobDescription,
                resumeText,
                matchedKeywords: jobMatchResult?.matchedKeywords || [],
                missingKeywords: jobMatchResult?.missingKeywords || [],
            };

            const hireabilityResult = await analyzeHireability(hireabilityInput);
            data.hireability = hireabilityResult;
        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete!');
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) return;
        handleAnalyze({ companyName, jobTitle, jobDescription, file: file! });
    }

    // Processing state UI
    if (isProcessing) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/50" style={{ paddingTop: 0 }}>
                {/* Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Resumind</span>
                        </Link>
                    </div>
                </nav>

                {/* Processing screen */}
                <div className="pt-24 min-h-screen flex items-center justify-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 max-w-md"
                    >
                        {/* Animated loader */}
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="w-20 h-20 mx-auto rounded-full border-4 border-indigo-100 border-t-indigo-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <motion.h2
                                key={statusText}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl font-semibold text-gray-900 mb-2"
                            >
                                {statusText}
                            </motion.h2>
                            <p className="text-gray-500">This typically takes 15-30 seconds</p>
                        </div>

                        {/* Progress steps */}
                        <div className="flex justify-center gap-2">
                            {['Upload', 'Process', 'Analyze', 'Score'].map((step, idx) => (
                                <div key={step} className="flex items-center gap-2">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0.5 }}
                                        animate={{
                                            scale: statusText.toLowerCase().includes(step.toLowerCase()) ? 1.1 : 1,
                                            opacity: 1
                                        }}
                                        className={`w-2 h-2 rounded-full ${statusText.toLowerCase().includes(step.toLowerCase())
                                            ? 'bg-indigo-500'
                                            : 'bg-gray-200'
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/50" style={{ paddingTop: 0 }}>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Resumind</span>
                    </Link>
                </div>
            </nav>

            {/* Main content */}
            <div className="pt-24 pb-16 px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: 'unset', color: '#111827' }}>
                            Analyze Your Resume
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-600"
                        >
                            Upload your resume and tell us about the job you're targeting
                        </motion.p>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 lg:p-10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6" style={{ alignItems: 'stretch' }}>
                            {/* Job Context Section */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Job Details</span>
                                </div>

                                {/* Company Name (Optional) */}
                                <div>
                                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Company Name <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        type="text"
                                        name="company-name"
                                        id="company-name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="e.g., Google, Microsoft, Startup Inc."
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                                        style={{ boxShadow: 'none', padding: '14px 16px' }}
                                    />
                                </div>

                                {/* Job Title */}
                                <div>
                                    <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 mb-2">
                                        Job Title <span className="text-rose-500">*</span>
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        type="text"
                                        name="job-title"
                                        id="job-title"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        placeholder="e.g., Senior Software Engineer"
                                        required
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                                        style={{ boxShadow: 'none', padding: '14px 16px' }}
                                    />
                                    <p className="text-xs text-gray-400 mt-1.5">The role you're applying for</p>
                                </div>

                                {/* Job Description */}
                                <div>
                                    <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Job Description <span className="text-rose-500">*</span>
                                    </label>
                                    <motion.textarea
                                        whileFocus={{ scale: 1.005 }}
                                        rows={5}
                                        name="job-description"
                                        id="job-description"
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        placeholder="Paste the full job description here..."
                                        required
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all resize-none"
                                        style={{ boxShadow: 'none', padding: '14px 16px' }}
                                    />
                                    <p className="text-xs text-gray-400 mt-1.5">
                                        The more details, the better our analysis
                                        {jobDescription.length > 0 && (
                                            <span className="float-right">{jobDescription.length} characters</span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100" />

                            {/* Resume Upload Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Your Resume</span>
                                </div>

                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={isFormValid ? { scale: 1.01 } : {}}
                                whileTap={isFormValid ? { scale: 0.99 } : {}}
                                type="submit"
                                disabled={!isFormValid}
                                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${isFormValid
                                    ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isFormValid ? 'Analyze Resume' : 'Fill in required fields'}
                            </motion.button>

                            {/* Trust indicator */}
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Your resume is analyzed securely and never shared</span>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
export default Upload
