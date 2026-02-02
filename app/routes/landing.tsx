import type { Route } from "./+types/home";
import LandingNavbar from "~/components/landing/LandingNavbar";
import HeroSection from "~/components/landing/HeroSection";
import FeaturesSection from "~/components/landing/FeaturesSection";
import HowItWorksSection from "~/components/landing/HowItWorksSection";
import WhyDifferentSection from "~/components/landing/WhyDifferentSection";
import CTASection from "~/components/landing/CTASection";
import FooterSection from "~/components/landing/FooterSection";
import PreviouslyAnalyzed from "~/components/PreviouslyAnalyzed";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "ResuMind | AI-Powered Resume Analyzer" },
        { name: "description", content: "Analyze your resume the way recruiters do. Get ATS scores, job-specific insights, and AI-powered rewrites that actually get you interviews." },
    ];
}

export default function Landing() {
    return (
        <main className="min-h-screen bg-white">
            <LandingNavbar />
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <PreviouslyAnalyzed />
            <WhyDifferentSection />
            <CTASection />
            <FooterSection />
        </main>
    );
}
