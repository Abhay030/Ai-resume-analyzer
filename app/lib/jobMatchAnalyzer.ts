/**
 * Job Match Analyzer Module
 * Compares resume against specific job description to quantify alignment
 * This is SEPARATE from ATS scoring - focuses only on resume ↔ job relevance
 */

import { usePuterStore } from "~/lib/puter";

/**
 * Result of job match analysis
 */
export interface JobMatchResult {
    jobMatchPercentage: number; // 0-100
    matchedKeywords: string[];
    missingKeywords: string[];
    jobFitVerdict: "Poor" | "Moderate" | "Strong";
    jobSpecificSuggestions: string[];
}

/**
 * AI prompt format for job match response
 */
export const JOB_MATCH_RESPONSE_FORMAT = `{
  "jobMatchPercentage": number, // 0-100, quantifying how well the resume matches THIS specific job
  "matchedKeywords": string[], // Technical skills, tools, and role keywords from the job description found in the resume
  "missingKeywords": string[], // Critical keywords from the job description NOT found in the resume
  "jobFitVerdict": "Poor" | "Moderate" | "Strong", // Overall fit assessment
  "jobSpecificSuggestions": string[] // 3-5 actionable suggestions specific to THIS job, not generic resume advice
}`;

/**
 * Creates the AI prompt for job match analysis
 */
export const createJobMatchPrompt = ({
    resumeText,
    jobTitle,
    jobDescription,
}: {
    resumeText: string;
    jobTitle: string;
    jobDescription: string;
}): string => `You are an expert job matching analyst. Your task is to analyze how well a resume matches a SPECIFIC job description.

IMPORTANT RULES:
1. Focus ONLY on resume ↔ job relevance. Do NOT evaluate tone, structure, or formatting.
2. Use SEMANTIC matching, not just exact string matching (e.g., "React.js" matches "React", "ML" matches "Machine Learning")
3. Weight technical skills, tools, and frameworks HIGHER than soft skills
4. Penalize resumes that appear generic and not tailored to this specific job
5. Be strict - a resume that doesn't address key job requirements should score low
6. Provide job-specific suggestions, not generic resume advice

JOB TITLE: ${jobTitle}

JOB DESCRIPTION:
${jobDescription}

RESUME TEXT:
${resumeText}

SCORING GUIDELINES:
- 80-100: Strong match - resume addresses most key requirements with relevant experience
- 50-79: Moderate match - resume has some relevant skills but gaps in key areas
- 0-49: Poor match - resume lacks critical skills or experience for this role

ANALYSIS PROCESS:
1. Extract core technical skills, tools, frameworks, and role keywords from the job description
2. Extract corresponding skills and experience from the resume
3. Identify which job keywords are present in the resume (matched)
4. Identify which job keywords are absent or weak (missing)
5. Calculate match percentage weighted toward technical skills
6. Generate job-specific improvement suggestions

Return ONLY a valid JSON object matching this format:
${JOB_MATCH_RESPONSE_FORMAT}

Do not include any other text, markdown, or explanation.`;

/**
 * Analyzes how well a resume matches a specific job description
 * Uses Puter AI API for semantic matching
 */
export const analyzeJobMatch = async (
    resumeText: string,
    jobTitle: string,
    jobDescription: string
): Promise<JobMatchResult | null> => {
    const puter = typeof window !== "undefined" && window.puter ? window.puter : null;

    if (!puter) {
        console.error("Puter.js not available for job match analysis");
        return null;
    }

    // Skip analysis if job description is too short to be meaningful
    if (!jobDescription || jobDescription.trim().length < 50) {
        return {
            jobMatchPercentage: 0,
            matchedKeywords: [],
            missingKeywords: [],
            jobFitVerdict: "Poor",
            jobSpecificSuggestions: [
                "Provide a detailed job description for accurate job match analysis"
            ],
        };
    }

    try {
        const prompt = createJobMatchPrompt({ resumeText, jobTitle, jobDescription });

        const response = await puter.ai.chat(prompt, { model: "claude-sonnet-4" }) as any;

        if (!response) {
            console.error("No response from AI for job match analysis");
            return null;
        }

        const content = typeof response.message?.content === "string"
            ? response.message.content
            : response.message?.content?.[0]?.text;

        if (!content) {
            console.error("Empty content from AI response");
            return null;
        }

        // Parse and validate the response
        const result: JobMatchResult = JSON.parse(content);

        // Validate required fields
        if (
            typeof result.jobMatchPercentage !== "number" ||
            !Array.isArray(result.matchedKeywords) ||
            !Array.isArray(result.missingKeywords) ||
            !["Poor", "Moderate", "Strong"].includes(result.jobFitVerdict) ||
            !Array.isArray(result.jobSpecificSuggestions)
        ) {
            console.error("Invalid job match result format:", result);
            return null;
        }

        // Clamp percentage to 0-100
        result.jobMatchPercentage = Math.max(0, Math.min(100, Math.round(result.jobMatchPercentage)));

        return result;
    } catch (error) {
        console.error("Job match analysis failed:", error);
        return null;
    }
};
