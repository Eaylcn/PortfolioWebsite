
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
        content: "While many developers started their journey just playing games, mine started by trying to break them. In elementary school, I used tools like Cheat Engine to modify variables in Facebook games. I wanted to understand the mechanism underneath. This curiosity led me to GameMaker Studio in 4th grade, where I created my first top-down fighting game.",
        achievement: "First Game Created", achievement_icon: "sports_esports"
    },
    {
        id: '2', title: "The Training", subtitle: "Forging the Foundation",
        years: "2015 — 2021", icon: "school", sort_order: 2,
        content: "I pursued a Software Engineering degree at Bahcesehir University. During these years, I delved deep into programming fundamentals, algorithms, and software architecture. The academic foundation combined with personal projects shaped my understanding of how complex systems work together.",
        achievement: "Software Engineering Degree", achievement_icon: "workspace_premium"
    },
    {
        id: '3', title: "The QA Chapter", subtitle: "The Secret Weapon",
        years: "2021 — 2024", icon: "bug_report", sort_order: 3,
        content: "My career path led me to Quality Assurance first. I worked as a QA Automation Engineer at companies like Huawei and IBTECH. Although my heart was always in game development, my time in QA became my secret weapon. It taught me how to dissect a problem, foresee potential bugs, and understand the user experience deeply.",
        achievement: "QA Mastery Achieved", achievement_icon: "verified"
    },
    {
        id: '4', title: "The Turning Point", subtitle: "Crisis Into Opportunity",
        years: "2024", icon: "local_fire_department", sort_order: 4,
        content: "I was accepted into a Master's program at Northeastern University, but due to financial difficulties, I had to cancel my enrollment. Instead of letting this stop me, I turned this crisis into a creative opportunity. I focused fully on building my own projects to prove my skills.",
        achievement: "Resilience Built", achievement_icon: "diamond"
    },
    {
        id: '5', title: "The Builder", subtitle: "Building the Legacy",
        years: "2024 — Present", icon: "construction", sort_order: 5,
        content: "I built eaylcn.com, a portfolio with an AI assistant I coded myself. I created Droid Shikai, a Generative AI art universe. I'm developing Tuty, a mobile app for makeup tracking, handling Developer, QA Lead, and Product Owner roles. I also create 3D models in Blender and 2D pixel art in Aseprite.",
        achievement: "Multi-Project Launch", achievement_icon: "rocket_launch"
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
                        <span className="text-primary">To Building Them</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        A journey through curiosity, discipline, trials, and creation.
                        This is the story of how a kid with Cheat Engine became a developer with a vision.
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
                        "Now, when I code a game in Unity or Unreal Engine, I don't just write code that works;
                        I write code that is <span className="text-primary font-semibold">robust and optimized</span>,
                        thanks to my QA mindset."
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
