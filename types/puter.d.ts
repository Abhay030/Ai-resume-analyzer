/**
 * Type definitions for Puter.js cloud platform
 * Provides authentication, file storage, AI services, and key-value storage
 */

// Module declarations for pdfjs-dist
declare module 'pdfjs-dist/build/pdf.mjs' {
    const content: any;
    export = content;
}

declare module 'pdfjs-dist/build/pdf.worker.mjs?url' {
    const url: string;
    export default url;
}

// File or directory metadata in cloud storage
interface FSItem {
    id: string;
    uid: string;
    name: string;
    path: string;
    is_dir: boolean;
    parent_id: string;
    parent_uid: string;
    created: number; // Unix timestamp
    modified: number; // Unix timestamp
    accessed: number; // Unix timestamp
    size: number | null; // bytes, null for directories
    writable: boolean;
}

// Authenticated user information
interface PuterUser {
    uuid: string;
    username: string;
}

// Key-value store item
interface KVItem {
    key: string;
    value: string;
}

// Content within a chat message (text or file reference)
interface ChatMessageContent {
    type: "file" | "text";
    puter_path?: string; // Path to file in cloud storage
    text?: string;
}

// Single message in AI conversation
interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string | ChatMessageContent[];
}

// AI chat configuration options
interface PuterChatOptions {
    model?: string; // e.g., "claude-sonnet-4", "gpt-4"
    stream?: boolean;
    max_tokens?: number;
    temperature?: number; // 0.0 to 2.0
    tools?: {
        type: "function";
        function: {
            name: string;
            description: string;
            parameters: { type: string; properties: {} };
        }[];
    };
}

// AI response structure
interface AIResponse {
    index: number;
    message: {
        role: string;
        content: string | any[];
        refusal: null | string;
        annotations: any[];
    };
    logprobs: null | any;
    finish_reason: string; // "stop", "length", "function_call", "content_filter"
    usage: {
        type: string;
        model: string;
        amount: number;
        cost: number;
    }[];
    via_ai_chat_service: boolean;
}

// Repetition issue detected in resume bullets
interface RepetitionIssue {
    originalBullet: string;    // The repeated bullet point
    repeatedConcept: string;   // What concept is being repeated
    suggestion: string;        // How to fix (consolidate, remove, or diversify)
}

// Weak bullet point with job-specific rewrite
interface WeakBulletPoint {
    original: string;          // Original weak bullet point
    issue: string;             // Why it's weak (vague, no metrics, passive voice, etc.)
    rewrite: string;           // Job-specific rewritten version
}

// Job match analysis result
interface JobMatchResult {
    jobMatchPercentage: number; // 0-100
    matchedKeywords: string[];
    missingKeywords: string[];
    jobFitVerdict: "Poor" | "Moderate" | "Strong";
    jobSpecificSuggestions: string[];
    repetitions: RepetitionIssue[];    // Detected repetitive bullet points (max 3)
    weakBullets: WeakBulletPoint[];    // Weak but relevant bullet points with rewrites (max 5)
}