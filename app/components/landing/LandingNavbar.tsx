import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const LandingNavbar: React.FC = () => {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/images/resumind-logo.png"
                        alt="ResuMind"
                        className="w-10 h-10 object-contain"
                    />
                    <span className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
                        ResuMind
                    </span>
                </Link>

                {/* CTA */}
                <Link to="/upload">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-2.5 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white font-medium rounded-full shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-shadow"
                    >
                        Analyze Resume
                    </motion.button>
                </Link>
            </div>
        </motion.nav>
    );
};

export default LandingNavbar;
