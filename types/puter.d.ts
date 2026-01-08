/**
 * Type definitions for Puter.js cloud platform
 * Provides authentication, file storage, AI services, and key-value storage
 */

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