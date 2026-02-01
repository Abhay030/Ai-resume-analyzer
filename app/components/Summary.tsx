import { motion } from "framer-motion";
import { AnimatedScoreRing, staggerItemVariants } from "~/components/ui/animations";

interface CategoryProps {
    title: string;
    score: number;
    delay: number;
}

const Category: React.FC<CategoryProps> = ({ title, score, delay }) => {
    const getColorClasses = () => {
        if (score >= 70) return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' };
        if (score >= 50) return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' };
        return { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' };
    };

    const colors = getColorClasses();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
            className={`flex items-center justify-between p-4 rounded-xl border ${colors.bg} ${colors.border}`}
        >
            <span className="text-gray-700 font-medium">{title}</span>
            <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
                        className={`h-full rounded-full ${score >= 70 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    />
                </div>
                <span className={`text-lg font-bold ${colors.text} w-12 text-right`}>{score}</span>
            </div>
        </motion.div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
            {/* Header with Score */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-6">
                    <AnimatedScoreRing score={feedback.overallScore} size={100} delay={0.2} />
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Overall Resume Score</h2>
                        <p className="text-sm text-gray-500">
                            Your resume health across 4 key dimensions
                        </p>
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="p-6 space-y-3">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} delay={0.3} />
                <Category title="Content Quality" score={feedback.content.score} delay={0.4} />
                <Category title="Structure" score={feedback.structure.score} delay={0.5} />
                <Category title="Skills Alignment" score={feedback.skills.score} delay={0.6} />
            </div>

            {/* Helper Text */}
            <div className="px-6 pb-6">
                <p className="text-xs text-gray-400 text-center">
                    Scores above 70 are considered strong • 50-69 need attention • Below 50 require improvement
                </p>
            </div>
        </motion.div>
    )
}
export default Summary