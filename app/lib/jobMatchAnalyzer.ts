/**
 * Job Match Analyzer Module
 * Compares resume against specific job description to quantify alignment
 * Includes repetition detection and weak bullet point analysis with job-specific rewrites
 */

import { usePuterStore } from "~/lib/puter";

// Repetition issue detected in resume bullets
export interface RepetitionIssue {
    originalBullet: string;
    repeatedConcept: string;
    suggestion: string;
}

// Weak bullet point with job-specific rewrite
export interface WeakBulletPoint {
    original: string;
    issue: string;
    rewrite: string;
}

// Result of job match analysis
export interface JobMatchResult {
    jobMatchPercentage: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    jobFitVerdict: "Poor" | "Moderate" | "Strong";
    jobSpecificSuggestions: string[];
    repetitions: RepetitionIssue[];
    weakBullets: WeakBulletPoint[];
}

/**
 * AI prompt format for job match response (enhanced with actionable fixes)
 */
export const JOB_MATCH_RESPONSE_FORMAT = `{
  "jobMatchPercentage": number,
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "jobFitVerdict": "Poor" | "Moderate" | "Strong",
  "jobSpecificSuggestions": string[],
  "repetitions": [
    {
      "originalBullet": string,
      "repeatedConcept": string,
      "suggestion": string
    }
  ],
  "weakBullets": [
    {
      "original": string,
      "issue": string,
      "rewrite": string
    }
  ]
}`;

/**
 * Creates the enhanced AI prompt for job match analysis with actionable fixes
 */
export const createJobMatchPrompt = ({
    resumeText,
    jobTitle,
    jobDescription,
}: {
    resumeText: string;
    jobTitle: string;
    jobDescription: string;
}): string => `You are an expert job matching analyst. Analyze how well a resume matches a SPECIFIC job description and provide actionable fixes.

IMPORTANT RULES:
1. Focus ONLY on resume ↔ job relevance. Do NOT evaluate tone, structure, or formatting.
2. Use SEMANTIC matching (e.g., "React.js" matches "React", "ML" matches "Machine Learning")
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
- 80-100: Strong match - resume addresses most key requirements
- 50-79: Moderate match - some relevant skills but gaps in key areas
- 0-49: Poor match - lacks critical skills for this role

ACTIONABLE FIXES (CRITICAL):

1. REPETITION DETECTION:
   - Scan ALL bullet points for repeated concepts (leadership, teamwork, communication, etc.)
   - Flag bullets that say the same thing in different words
   - Limit to 3 most impactful repetitions
   - Suggestion must tell user HOW to fix (consolidate, remove, or diversify)

2. WEAK BULLET POINT ANALYSIS:
   - Find bullet points that mention job-relevant skills but are WEAK because:
     * Vague language ("worked with", "helped", "assisted")
     * No metrics or quantifiable outcomes
     * Passive voice or unclear impact
     * Generic descriptions that could apply to anyone
   - Limit to 5 most impactful weak bullets
   - REWRITE must be specific to THIS job description
   - REWRITE must include metrics (estimate if needed), action verbs, and clear outcomes

REWRITE RULES:
- Start with strong action verbs (Led, Built, Designed, Optimized, etc.)
- Include numbers/percentages when possible (even estimates are better than nothing)
- Tie the achievement to skills mentioned in the job description
- Keep rewrites concise (1-2 sentences max)

Return ONLY a valid JSON object matching this format:
${JOB_MATCH_RESPONSE_FORMAT}

CONSTRAINTS:
- repetitions array: max 3 items (or empty if no repetitions found)
- weakBullets array: max 5 items (or empty if all bullets are strong)
- Ensure ALL string values are properly escaped for JSON

Do not include any other text, markdown, or explanation.`;

/**
 * Extracts JSON from a string that may contain markdown code blocks
 */
const extractJsonFromResponse = (content: string): string => {
    // Remove markdown code blocks if present
    let cleaned = content.trim();

    // Handle ```json ... ``` blocks
    const jsonBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonBlockMatch) {
        cleaned = jsonBlockMatch[1].trim();
    }

    // Handle responses that start with text before JSON
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
    }

    return cleaned;
};

/**
 * Analyzes how well a resume matches a specific job description
 * Returns actionable fixes including repetition detection and weak bullet rewrites
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

    // Default empty result for missing job description
    if (!jobDescription || jobDescription.trim().length < 50) {
        return {
            jobMatchPercentage: 0,
            matchedKeywords: [],
            missingKeywords: [],
            jobFitVerdict: "Poor",
            jobSpecificSuggestions: [
                "Provide a detailed job description for accurate job match analysis"
            ],
            repetitions: [],
            weakBullets: [],
        };
    }

    try {
        const prompt = createJobMatchPrompt({ resumeText, jobTitle, jobDescription });
        console.log("Sending job match analysis request...");

        const response = await puter.ai.chat(prompt, { model: "claude-sonnet-4" }) as any;

        if (!response) {
            console.error("No response from AI for job match analysis");
            return null;
        }

        const rawContent = typeof response.message?.content === "string"
            ? response.message.content
            : response.message?.content?.[0]?.text;

        if (!rawContent) {
            console.error("Empty content from AI response");
            return null;
        }

        console.log("Raw AI response (first 200 chars):", rawContent.substring(0, 200));

        // Extract JSON from potential markdown blocks
        const content = extractJsonFromResponse(rawContent);
        console.log("Extracted JSON (first 200 chars):", content.substring(0, 200));

        // Parse and validate the response
        const result: JobMatchResult = JSON.parse(content);

        // Validate core required fields
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

        // Ensure new fields exist (fallback to empty arrays if AI omits them)
        result.repetitions = Array.isArray(result.repetitions) ? result.repetitions.slice(0, 3) : [];
        result.weakBullets = Array.isArray(result.weakBullets) ? result.weakBullets.slice(0, 5) : [];

        // Clamp percentage to 0-100
        result.jobMatchPercentage = Math.max(0, Math.min(100, Math.round(result.jobMatchPercentage)));

        console.log("Job match analysis successful:", result);
        return result;
    } catch (error) {
        console.error("Job match analysis failed:", error);
        return null;
    }
};
