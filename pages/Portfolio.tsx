
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GameProject, MobileProject, WebProject } from '../types';

type Category = 'Games' | 'Mobile' | 'Web';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Games');
  const [data, setData] = useState<{
    Games: GameProject[];
    Mobile: MobileProject[];
    Web: WebProject[];
  }>({ Games: [], Mobile: [], Web: [] });

  useEffect(() => {
    Promise.all([
      fetch('/games.json').then(r => r.json()),
      fetch('/mobile.json').then(r => r.json()),
      fetch('/web.json').then(r => r.json()),
    ]).then(([games, mobile, web]) => {
      setData({ Games: games, Mobile: mobile, Web: web });
    });
  }, []);

  const categories = [
    { name: 'Games' as Category, icon: 'stadia_controller', color: '#135bec' },
    { name: 'Mobile' as Category, icon: 'smartphone', color: '#8b5cf6' },
    { name: 'Web' as Category, icon: 'language', color: '#10b981' }
  ];

  const currentProjects = data[activeCategory];

  const getDetailPath = (slug: string) => {
    const catMap = {
      'Games': 'games',
      'Mobile': 'mobile',
      'Web': 'web'
    };
    return `/${catMap[activeCategory]}/${slug}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
      {/* Hero Header */}
      <section className="mb-20">
        <div className="relative overflow-hidden rounded-[3rem] bg-card-dark min-h-[450px] flex flex-col items-center justify-center text-center p-8 gap-6 group border border-border-dark shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-40 transition-transform duration-1000 group-hover:scale-110"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCW2VwRFd98nw76ViF53yc7cEJNDdgUgRy-uNaPLOpFHu3XvkeAQDOG3Yoj5UANaWa3FUiuYbFHjN1ivRsSdPKIZY9ztzy_4NvOIo6yshKAUM9AlKbakxqDIdROsdLIbYd0Dp8hHes1IdZGDNd-3k06ayyBBuvK6xnw2v3k6XC7F_KE7anFN8070WMPRrbf3AAJFHiuWKuryaCyh7JfO22fSOdpCrLO7JLcnrEwHPgOshTPXd5PO3pyvSjhVBBc-T2L3wAGbN_wNko")' }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-black uppercase tracking-[0.3em] mb-2 backdrop-blur-md">
              <span className="material-symbols-outlined text-sm animate-spin-slow">auto_fix_high</span>
              The Grand Archive
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl font-display uppercase leading-[0.85]">
              QUEST <span className="text-primary">HISTORY</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-lg italic">
              A chronicle of digital worlds explored, built, and fortified. Every project is an artifact of quality.
            </p>
          </div>
        </div>
      </section>

      {/* RPG Style Category Tabs */}
      <div className="flex flex-wrap gap-4 justify-center mb-16 relative">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`flex h-16 items-center gap-4 rounded-[1.5rem] px-8 transition-all duration-500 font-black text-sm uppercase tracking-widest relative overflow-hidden group ${activeCategory === cat.name
                ? 'bg-primary text-white shadow-glow scale-105'
                : 'bg-card-dark text-slate-500 border border-white/5 hover:border-primary/50'
              }`}
          >
            <span className={`material-symbols-outlined text-2xl transition-transform ${activeCategory === cat.name ? 'scale-110' : 'group-hover:rotate-12'}`} style={{ color: activeCategory === cat.name ? '#fff' : cat.color }}>
              {cat.icon}
            </span>
            <span>{cat.name}</span>
            {activeCategory === cat.name && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-40"></span>
            )}
          </button>
        ))}
      </div>

      {/* Animated Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentProjects.map(project => (
          <Link
            to={getDetailPath(project.slug)}
            key={project.id}
            className="group flex flex-col rounded-[2.5rem] bg-card-dark border border-border-dark overflow-hidden hover:border-primary/50 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(19,91,236,0.2)] transform hover:-translate-y-3"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-125"
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-transparent to-transparent"></div>

              <div className="absolute top-5 right-5 flex gap-2">
                <span className="bg-background-dark/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black text-white uppercase tracking-widest">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-1 space-y-4">
              <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors font-display uppercase tracking-tight">
                {project.title}
              </h3>
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{project.role}</p>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-body flex-1 line-clamp-3 italic font-light">
                {project.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div className="flex gap-2">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-3 py-1 text-[8px] font-black bg-slate-800 text-slate-400 rounded-lg border border-white/5 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] font-black text-white group-hover:text-primary flex items-center gap-2 transition-all group/btn uppercase tracking-widest">
                  INSPECT ARCHIVE
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {currentProjects.length === 0 && (
        <div className="py-32 text-center space-y-4">
          <span className="material-symbols-outlined text-slate-700 text-8xl">inventory_2</span>
          <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Archive slice is currently empty or encrypted.</p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
