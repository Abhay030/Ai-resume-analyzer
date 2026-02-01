import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion';
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <div
                {...getRootProps()}
                className={`relative cursor-pointer transition-all duration-200 rounded-2xl border-2 border-dashed ${isDragActive
                        ? 'border-indigo-400 bg-indigo-50/50'
                        : file
                            ? 'border-emerald-300 bg-emerald-50/30'
                            : 'border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50'
                    }`}
            >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {file ? (
                        // Selected file state
                        <motion.div
                            key="selected"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="p-6"
                        >
                            <div className="flex items-center gap-4">
                                {/* PDF Icon with success checkmark */}
                                <div className="relative">
                                    <div className="w-14 h-14 bg-white rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
                                        <svg className="w-7 h-7 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 12h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M10 16h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                                        className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                                    >
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                </div>

                                {/* File info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{file.name}</p>
                                    <p className="text-sm text-gray-500">{formatSize(file.size)} • PDF</p>
                                </div>

                                {/* Remove button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFileSelect?.(null);
                                    }}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </div>

                            <p className="text-xs text-emerald-600 mt-3 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Ready to analyze • Click to change file
                            </p>
                        </motion.div>
                    ) : (
                        // Empty state
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-8 text-center"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="mx-auto w-14 h-14 bg-white rounded-2xl border border-gray-200 flex items-center justify-center mb-4 shadow-sm"
                            >
                                {isDragActive ? (
                                    <svg className="w-7 h-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                ) : (
                                    <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                )}
                            </motion.div>

                            {isDragActive ? (
                                <p className="text-indigo-600 font-medium">Drop your resume here</p>
                            ) : (
                                <>
                                    <p className="text-gray-700">
                                        <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">PDF only • Max {formatSize(maxFileSize)}</p>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
export default FileUploader
