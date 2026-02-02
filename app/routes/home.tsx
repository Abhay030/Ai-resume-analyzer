import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate, Link } from "react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard | ResuMind" },
    { name: "description", content: "Track your resume analyses and ratings" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/dashboard');
  }, [auth.isAuthenticated, navigate])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" style={{ paddingTop: 0 }}>
      <Navbar />

      {/* Content with navbar offset */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              style={{ background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: 'unset', color: '#111827' }}
            >
              Your Analyzed Resumes
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Review your analyses and track improvement over time
            </motion.p>
          </motion.div>

          {/* Resume cards grid */}
          {resumes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <ResumeCard resume={resume} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-indigo-100 rounded-3xl flex items-center justify-center">
                <img
                  src="/images/resumind-logo.png"
                  alt="ResuMind"
                  className="w-16 h-16 opacity-60"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2" style={{ background: 'none', WebkitTextFillColor: 'unset' }}>
                No resumes analyzed yet
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Upload your first resume to get AI-powered feedback and improve your chances of getting hired.
              </p>
              <Link to="/upload">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-shadow"
                >
                  Analyze Your First Resume
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
