/**
 * Hireability Analyzer Module
 * Simulates recruiter decision-making by combining multiple resume signals
 * into a single "Would this resume be shortlisted?" verdict
 */

// Input data required for hireability analysis
export interface HireabilityInput {
    atsScore: number;
    jobMatchScore: number;
    jobMatchVerdict: string;
    repetitionCount: number;
    weakBulletCount: number;
    sectionScores: {
        tone: number;
        content: number;
        skills: number;
        structure: number;
    };
    jobTitle: string;
    jobDescription: string;
    resumeText: string;
    matchedKeywords: string[];
    missingKeywords: string[];
}

// Hireability analysis result
export interface HireabilityResult {
    hireabilityIndex: number;
    verdict: "Strong Shortlist" | "Borderline" | "Unlikely";
    shortlistReasons: string[];
    rejectionRisks: string[];
    topImprovements: string[];
}

/**
 * Expected JSON response format for AI
 */
export const HIREABILITY_RESPONSE_FORMAT = `{
  "hireabilityIndex": number,
  "verdict": "Strong Shortlist" | "Borderline" | "Unlikely",
  "shortlistReasons": string[],
  "rejectionRisks": string[],
  "topImprovements": string[]
}`;

/**
 * Creates the AI prompt for hireability analysis
 */
export const createHireabilityPrompt = (input: HireabilityInput): string => `You are a senior technical recruiter screening resumes for a ${input.jobTitle} position. You have 10 seconds to decide: SHORTLIST or REJECT.

YOUR TASK:
Analyze this resume and give a final hireability verdict combining all signals.

====================================================
RESUME SIGNALS PROVIDED:
====================================================

ATS Score: ${input.atsScore}/100
Job Match Score: ${input.jobMatchScore}/100
Job Fit Assessment: ${input.jobMatchVerdict}

Section Scores:
- Tone & Style: ${input.sectionScores.tone}/100
- Content Quality: ${input.sectionScores.content}/100
- Skills Alignment: ${input.sectionScores.skills}/100
- Structure: ${input.sectionScores.structure}/100

Penalty Signals:
- Repetitions found: ${input.repetitionCount} (more = worse)
- Weak bullets found: ${input.weakBulletCount} (more = worse)

Keywords MATCHED: ${input.matchedKeywords.join(', ') || 'None'}
Keywords MISSING: ${input.missingKeywords.join(', ') || 'None'}

====================================================
JOB CONTEXT:
====================================================

Job Title: ${input.jobTitle}
Job Description:
${input.jobDescription}

====================================================
RESUME TEXT:
====================================================
${input.resumeText}

====================================================
SIGNAL WEIGHTING (CRITICAL):
====================================================

Calculate Hireability Index (0-100) using these weights:

| Signal                  | Weight |
|-------------------------|--------|
| Job Match Relevance     | 35%    |
| ATS Readability         | 20%    |
| Bullet Impact Strength  | 20%    |
| Section Consistency     | 15%    |
| Penalties               | -10%   |

Penalties apply when:
- Repetitions > 2: -3 points each
- Weak bullets > 3: -2 points each
- Missing critical keywords: -2 points each (max -10)
- Vague/generic bullets: -5 points

Impact Strength Score (20%) based on:
- Metrics and quantified results
- Ownership language ("Led", "Built", "Designed")
- Scale indicators ("100K users", "5-person team")
- Technical depth

====================================================
VERDICT CLASSIFICATION:
====================================================

- 75-100: "Strong Shortlist" — Would definitely call for interview
- 50-74: "Borderline" — Might consider if no better candidates
- 0-49: "Unlikely" — Would likely pass on this resume

====================================================
RECRUITER REASONING (CRITICAL):
====================================================

Think like a REAL recruiter, not a resume coach.

For shortlistReasons (2-3 items):
- What caught your eye in the first 10 seconds?
- What signals "this person can do this job"?
- Use phrases like "Shows experience in...", "Demonstrates..."

For rejectionRisks (2-3 items):
- What would make you hesitate?
- What's missing that this job needs?
- Use phrases like "No evidence of...", "Lacks...", "Unclear if..."

For topImprovements (3-4 items):
- What would MOST increase shortlist chances?
- Be specific: "Add metrics to the React project", not "Quantify achievements"
- Prioritize by impact on THIS job

====================================================
OUTPUT RULES:
====================================================

1. Return ONLY valid JSON matching this format:
${HIREABILITY_RESPONSE_FORMAT}

2. shortlistReasons: 2-3 items max
3. rejectionRisks: 2-3 items max
4. topImprovements: 3-4 items max, prioritized by impact

5. All reasoning must be job-specific, not generic
6. Be honest and slightly strict — recruiters are busy
7. No formatting/grammar feedback
8. No generic resume advice like "use action verbs"

Do not include any markdown, explanation, or text outside the JSON.`;

/**
 * Extracts JSON from AI response that may contain markdown blocks
 */
const extractJsonFromResponse = (content: string): string => {
    let cleaned = content.trim();

    // Handle ```json ... ``` blocks
    const jsonBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonBlockMatch) {
        cleaned = jsonBlockMatch[1].trim();
    }

    // Extract JSON object
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
    }

    return cleaned;
};

/**
 * Analyzes hireability by combining all resume signals into a recruiter decision
 */
export const analyzeHireability = async (
    input: HireabilityInput
): Promise<HireabilityResult | null> => {
    const puter = typeof window !== "undefined" && window.puter ? window.puter : null;

    if (!puter) {
        console.error("Puter.js not available for hireability analysis");
        return null;
    }

    // Skip if job description is too short
    if (!input.jobDescription || input.jobDescription.trim().length < 50) {
        return {
            hireabilityIndex: 0,
            verdict: "Unlikely",
            shortlistReasons: [],
            rejectionRisks: ["Insufficient job description to assess fit"],
            topImprovements: ["Provide a detailed job description for accurate analysis"],
        };
    }

    try {
        const prompt = createHireabilityPrompt(input);
        console.log("Sending hireability analysis request...");

        const response = await puter.ai.chat(prompt, { model: "claude-sonnet-4" }) as any;

        if (!response) {
            console.error("No response from AI for hireability analysis");
            return null;
        }

        const rawContent = typeof response.message?.content === "string"
            ? response.message.content
            : response.message?.content?.[0]?.text;

        if (!rawContent) {
            console.error("Empty content from AI response");
            return null;
        }

        console.log("Raw hireability response (first 200 chars):", rawContent.substring(0, 200));

        const content = extractJsonFromResponse(rawContent);
        const result: HireabilityResult = JSON.parse(content);

        // Validate required fields
        if (
            typeof result.hireabilityIndex !== "number" ||
            !["Strong Shortlist", "Borderline", "Unlikely"].includes(result.verdict) ||
            !Array.isArray(result.shortlistReasons) ||
            !Array.isArray(result.rejectionRisks) ||
            !Array.isArray(result.topImprovements)
        ) {
            console.error("Invalid hireability result format:", result);
            return null;
        }

        // Clamp index to 0-100
        result.hireabilityIndex = Math.max(0, Math.min(100, Math.round(result.hireabilityIndex)));

        // Limit array sizes
        result.shortlistReasons = result.shortlistReasons.slice(0, 3);
        result.rejectionRisks = result.rejectionRisks.slice(0, 3);
        result.topImprovements = result.topImprovements.slice(0, 4);

        console.log("Hireability analysis successful:", result);
        return result;
    } catch (error) {
        console.error("Hireability analysis failed:", error);
        return null;
    }
};
