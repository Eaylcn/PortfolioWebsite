
import React, { useEffect } from 'react';
import { useStoryChapters } from '../hooks/useData';

interface Chapter {
    id: string;
    title: string;
    subtitle: string | null;
    years: string;
    icon: string | null;
    content: string;
    achievement: string | null;
    achievement_icon: string | null;
    sort_order: number;
}

const FALLBACK_CHAPTERS: Chapter[] = [
    {
        id: '1', title: "The Origin", subtitle: "Where Curiosity Began",
        years: "2010 — 2014", icon: "child_care", sort_order: 1,
        content: "Most people in this industry started by playing games. I started by breaking them. In elementary school, I used Cheat Engine to modify variables in Facebook games — not to win, but to figure out how things worked under the hood. By 4th grade, I was making my own top-down fighting game in GameMaker Studio. That curiosity never left me. It just shifted from 'how does this game work?' to 'how do we make this game better for players?'",
        achievement: "First Game Created", achievement_icon: "sports_esports"
    },
    {
        id: '2', title: "The Foundation", subtitle: "Building the Technical Base",
        years: "2015 — 2021", icon: "school", sort_order: 2,
        content: "I pursued a Software Engineering degree at Bahçeşehir University. During these years, I built a solid understanding of programming fundamentals, algorithms, and software architecture. The academic foundation combined with personal projects shaped how I think about complex systems — a skill that would later become essential for product thinking.",
        achievement: "Software Engineering Degree", achievement_icon: "workspace_premium"
    },
    {
        id: '3', title: "The QA Discipline", subtitle: "Learning to Think Like the User",
        years: "2021 — 2024", icon: "bug_report", sort_order: 3,
        content: "I spent three years working in QA at companies like Huawei, IBTECH, and ERIKLABS. Honestly, QA was not my dream job — but it taught me something I could not have learned anywhere else: how to think like a user who is about to have a bad experience. I got really good at finding problems before users do, understanding why something feels off, and communicating those issues clearly to developers. These are the exact same skills I now bring to product thinking.",
        achievement: "QA Mastery Achieved", achievement_icon: "verified"
    },
    {
        id: '4', title: "The Turning Point", subtitle: "Crisis Into Opportunity",
        years: "2024", icon: "local_fire_department", sort_order: 4,
        content: "I was accepted into a Master's program at Northeastern University, but due to financial difficulties, I had to cancel my enrollment. Instead of letting this stop me, I turned this setback into a creative opportunity. I focused fully on building my own projects to prove my skills — and in doing so, discovered what I truly wanted to do.",
        achievement: "Resilience Built", achievement_icon: "diamond"
    },
    {
        id: '5', title: "The PM Awakening", subtitle: "Discovering My True Path",
        years: "2024 — Early 2025", icon: "lightbulb", sort_order: 5,
        content: "While developing Tuty — a mobile app for tracking makeup inventory — I found myself naturally gravitating toward the product side. I was the developer, QA lead, product owner, and UX designer all at once. I was making real trade-offs, prioritizing features, analyzing user needs, and managing the product end to end. That's when it clicked: I didn't just want to build software. I wanted to own the product vision, define the roadmap, and make the strategic decisions that shape what gets built and why.",
        achievement: "Product Mindset Unlocked", achievement_icon: "psychology"
    },
    {
        id: '6', title: "The Product Builder", subtitle: "Building the Future with AI",
        years: "March 2025 — Present", icon: "rocket_launch", sort_order: 6,
        content: "In March 2025, I fully committed to Product Management. To track my own growth and sharpen my PM skills, I started building an AI-powered analysis tool for Gaming PMs — handling everything from problem discovery to roadmap planning, interface design, and development using Next.js, Supabase, and Generative AI. I embraced Agentic Coding, using AI as a pair-programming partner in my terminal to accelerate development. This portfolio itself was built with the same approach — proving that a PM who understands the technical side can move faster and make better decisions.",
        achievement: "Full PM Pivot", achievement_icon: "trending_up"
    }
];

const Story: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const { data: dbChapters, loading } = useStoryChapters();
    const chapters: Chapter[] = dbChapters.length > 0 ? dbChapters : FALLBACK_CHAPTERS;

    return (
        <div className="min-h-screen bg-background-dark pt-24 sm:pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-8">

                {/* Header */}
                <div className="text-center mb-16 sm:mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm">auto_stories</span>
                        My Journey
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-display uppercase tracking-tight mb-6">
                        From Breaking Games<br />
                        <span className="text-primary">To Managing Products</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        A journey through curiosity, discipline, setbacks, and discovery.
                        This is the story of how a kid with Cheat Engine became a Product Manager with a vision.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    <>
                        {/* Timeline */}
                        <div className="relative">
                            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

                            <div className="space-y-12 sm:space-y-16">
                                {chapters.map((chapter, index) => (
                                    <div
                                        key={chapter.id}
                                        className="relative pl-12 sm:pl-20 group"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="absolute left-0 sm:left-4 top-0 size-8 sm:size-12 rounded-full bg-card-dark border-2 border-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-primary text-sm sm:text-xl">{chapter.icon}</span>
                                        </div>

                                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                                            {chapter.years}
                                        </div>

                                        <div className="bg-card-dark border border-border-dark rounded-3xl p-6 sm:p-8 hover:border-primary/50 transition-all group-hover:-translate-y-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">
                                                        Chapter {index + 1}
                                                    </h3>
                                                    <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
                                                        {chapter.title}
                                                    </h2>
                                                    <p className="text-primary text-sm font-medium italic">{chapter.subtitle}</p>
                                                </div>

                                                {chapter.achievement && (
                                                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider shrink-0">
                                                        <span className="material-symbols-outlined text-sm">{chapter.achievement_icon}</span>
                                                        {chapter.achievement}
                                                    </div>
                                                )}
                                            </div>

                                            <p className="text-slate-300 leading-relaxed">
                                                {chapter.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* End Node */}
                            <div className="relative pl-12 sm:pl-20 mt-12">
                                <div className="absolute left-0 sm:left-4 top-0 size-8 sm:size-12 rounded-full bg-primary flex items-center justify-center shadow-glow animate-pulse">
                                    <span className="material-symbols-outlined text-white text-sm sm:text-xl">flag</span>
                                </div>
                                <div className="pt-2">
                                    <p className="text-primary font-bold uppercase tracking-widest text-sm">To Be Continued...</p>
                                    <p className="text-slate-500 text-sm mt-1">The next chapter is being written.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Closing Quote */}
                <div className="mt-24 text-center border-t border-border-dark/50 pt-16">
                    <blockquote className="text-xl sm:text-2xl text-slate-300 italic font-light max-w-3xl mx-auto leading-relaxed">
                        "A PM who understands what the engineering team actually does
                        can make <span className="text-primary font-semibold">much better decisions</span>.
                        That's why I don't just plan — I build."
                    </blockquote>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">format_quote</span>
                        </div>
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Emir Ata Yalçın</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Story;
