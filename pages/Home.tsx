
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { STATS, PROJECTS, REFERENCES } from '../constants';

const Home: React.FC = () => {
  const scrollRefs = useRef<(HTMLElement | null)[]>([]);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  useEffect(() => {
    // Parallax Effect Logic
    const handleScroll = () => {
      if (heroBgRef.current) {
        const scrolled = window.scrollY;
        heroBgRef.current.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
      }
    };

    // Scroll Reveal Logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            entry.target.classList.remove('opacity-0', 'translate-y-20', 'scale-95');
          }
        });
      },
      { threshold: 0.15 }
    );

    window.addEventListener('scroll', handleScroll);
    scrollRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const setRef = (el: HTMLElement | null, index: number) => {
    scrollRefs.current[index] = el;
  };

  const getDetailPath = (project: any) => {
    const catMap: Record<string, string> = {
      'Mobile': 'mobile',
      'PC': 'games',
      'Web': 'web'
    };
    return `/${catMap[project.category]}/${project.slug}`;
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* 1. Hero Section - With Parallax Background */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            ref={heroBgRef}
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30 scale-105 will-change-transform"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(16, 22, 34, 0.4), rgba(16, 22, 34, 1)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJDnxd82HOJjUo-StTsqkT1io2H3-c1yYmf7ozonvqdFxc7kj3cQSKmZty8sd5aZKndI7rXe0QXZYbjEDYWb8gGMOvxCezlR5vpx2PkXKB8PHHA8vV0jBTV3FeJQJRm7a1dwj4UdE5x6gR45CME7teyNiYCp6jbLSiICOaXT3qpIokF9yXqmMR1Oa8bfEqeoEPrJe3-3F7TpId7hbHHQ1LvE40e6hc7fz0rtnRBvoUhwwEAFbvbXDDOkVYK9ckSv0IEbF3bUu0plY")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-6 animate-fade-in-up">
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              QA Engineer | Emir Ata Yalcin
            </div>
            {/* Open to Work Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(34,197,94,0.2)] animate-pulse">
              <span className="material-symbols-outlined text-xs">rocket_launch</span>
              Available for New Campaigns
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black font-display tracking-tight text-white leading-[0.85] drop-shadow-2xl">
            Bug Hunter in a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400 animate-gradient-x">Digital Realm</span>
          </h1>
          <p className="text-lg sm:text-2xl text-slate-300 max-w-3xl font-body font-light leading-relaxed mt-4">
            Forging software stability through technical precision and RPG-inspired creativity. QA Engineer, Game Dev, and Prompt Sorcerer.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 mt-6">
            <Link to="/portfolio" className="bg-primary hover:bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-glow hover:shadow-glow-hover hover:-translate-y-2 flex items-center justify-center gap-2 min-w-[200px] active:scale-95">
              <span>Begin Quest</span>
              <span className="material-symbols-outlined">swords</span>
            </Link>
            <Link to="/skills" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-2 flex items-center justify-center gap-2 min-w-[200px] backdrop-blur-md active:scale-95">
              <span>Inspect Stats</span>
              <span className="material-symbols-outlined">person_search</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Combat Attributes (Stats) */}
      <section
        ref={(el) => setRef(el, 0)}
        className="py-24 bg-background-dark transition-all duration-1000 opacity-0 translate-y-20 scale-95"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white font-display mb-16 text-center uppercase tracking-tighter">
            Combat <span className="text-primary">Attributes</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div
                key={stat.name}
                onMouseEnter={() => setHoveredStat(stat.name)}
                onMouseLeave={() => setHoveredStat(null)}
                className="group p-8 rounded-[2rem] bg-card-dark border border-border-dark hover:border-primary transition-all duration-500 hover:shadow-glow relative overflow-visible transform hover:-translate-y-3 cursor-help"
              >
                {/* RPG Style Tooltip */}
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-glow border border-white/20 transition-all duration-300 pointer-events-none whitespace-nowrap ${hoveredStat === stat.name ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-2'}`}>
                  {stat.description}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45 border-b border-r border-white/20"></div>
                </div>


                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <span className="material-symbols-outlined text-3xl" style={{ color: stat.color }}>{stat.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">{stat.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light line-clamp-2 italic">{stat.description}</p>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-[2000ms]"
                    style={{ backgroundColor: stat.color, width: `${stat.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Quest Log (Projects) */}
      <section
        ref={(el) => setRef(el, 1)}
        className="py-24 border-t border-border-dark/50 bg-background-dark/50 relative overflow-hidden transition-all duration-1000 opacity-0 translate-y-20 scale-95"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white font-display flex items-center gap-4 uppercase tracking-tighter">
                <span className="material-symbols-outlined text-primary text-5xl">map</span>
                Quest Log
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl font-light italic">
                A chronicle of previous campaigns where software quality was defended. From mobile battlegrounds to PC high-fidelity simulations.
              </p>
            </div>
            <Link to="/portfolio" className="text-primary hover:text-white font-bold flex items-center gap-2 transition-all uppercase tracking-widest text-sm bg-primary/5 px-6 py-3 rounded-xl border border-primary/20 hover:bg-primary/10">
              Full Archive
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map(project => (
              <Link to={getDetailPath(project)} key={project.id} className="block group rounded-[2.5rem] bg-card-dark border border-border-dark overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-xl transform hover:-translate-y-2">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-lg text-[10px] text-white font-bold border border-primary/30 uppercase tracking-[0.1em]">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold text-white font-display group-hover:text-primary transition-colors uppercase tracking-tight">{project.title}</h3>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">person</span>
                    {project.role}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 italic font-light">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Droid Shikai Teaser */}
      <section
        ref={(el) => setRef(el, 2)}
        className="py-24 bg-card-dark/20 border-y border-border-dark relative overflow-hidden group transition-all duration-1000 opacity-0 translate-y-20 scale-95"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[80px] animate-pulse"></div>
              <div className="relative rounded-[3rem] border border-border-dark overflow-hidden shadow-2xl group/img">
                <img
                  src="/projects/shikai/mainpageshikai.png"
                  className="w-full grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-1000"
                  alt="Droid Shikai Portal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent flex items-end p-10">
                  <div className="space-y-2">
                    <p className="text-primary font-bold text-xs tracking-[0.4em] uppercase">Status: Connected</p>
                    <p className="text-white font-display text-2xl font-bold">Parallel Dimension Detected</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                <span className="material-symbols-outlined text-lg">cognition</span>
                Experimental AI Node
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white font-display uppercase tracking-tighter">DROID SHIKAI</h2>
              <p className="text-xl text-slate-300 leading-relaxed font-light italic">
                A sentient-style AI artist persona observing reality through algorithmic eyes. Enter the frequency to see artifacts from another realm.
              </p>
              <Link to="/droid-shikai" className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-glow hover:shadow-glow-hover transform hover:-translate-y-1 active:scale-95">
                Enter The Signal
                <span className="material-symbols-outlined">sensors</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI Familiar Companion Teaser & References */}
      <section
        ref={(el) => setRef(el, 3)}
        className="py-24 bg-background-dark relative overflow-hidden transition-all duration-1000 opacity-0 translate-y-20 scale-95"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-24">
          <div className="bg-card-dark rounded-[3rem] p-12 md:p-20 border border-border-dark relative overflow-hidden shadow-2xl group/card transform hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute top-0 right-0 p-12 text-primary/10 group-hover/card:scale-110 transition-transform duration-1000">
              <img src="/icons/datadrake.svg" alt="Data Drake" className="w-48 h-48 opacity-10 floating-element" style={{ filter: 'invert(35%) sepia(98%) saturate(1500%) hue-rotate(210deg)' }} />
            </div>
            <div className="max-w-3xl space-y-8 relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white font-display uppercase tracking-tighter">THE DATA DRAKE</h2>
              <p className="text-xl text-slate-300 leading-relaxed font-light italic">
                A spectral dragon companion that guards Emir's Grand Archive. Curious about the Master's spells (skills), past campaigns (work experience), or his philosophy of quality?
                Consult the Drake for an instant report from the Master's private scrolls.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('toggle-oracle'))}
                  className="bg-primary hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-glow hover:shadow-glow-hover flex items-center gap-3 active:scale-95"
                >
                  <span className="material-symbols-outlined">psychology</span>
                  Consult the Drake
                </button>
              </div>
            </div>
          </div>

          {/* References Area */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight">Guild Endorsements</h3>
              <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">Testimonials from fellow explorers</p>
            </div>

            {/* Horizontal Scrollable Carousel */}
            <div className="relative">
              <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pt-8 pb-6 pl-8 pr-4">
                {REFERENCES.map((ref, i) => (
                  <a
                    key={i}
                    href={ref.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-none w-[90%] sm:w-[480px] bg-card-dark p-8 sm:p-10 rounded-[2.5rem] border border-border-dark relative group transition-all hover:-translate-y-3 hover:border-primary/50 shadow-xl snap-center cursor-pointer"
                  >
                    <div className="absolute -top-6 -left-6 size-18 sm:size-20 rounded-3xl border-4 border-primary overflow-hidden shadow-glow bg-card-dark">
                      <img src={ref.avatar} alt={ref.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-primary text-xl">open_in_new</span>
                    </div>
                    <div className="space-y-5 pt-6">
                      <p className="text-white text-base sm:text-lg font-medium italic leading-relaxed">"{ref.text}"</p>
                      <div>
                        <cite className="not-italic text-white font-black uppercase tracking-widest text-sm">— {ref.name}</cite>
                        <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mt-1">{ref.role}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Scroll Hint */}
              <div className="flex justify-center mt-4 gap-2 text-slate-600">
                <span className="material-symbols-outlined text-sm animate-pulse">swipe</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">Scroll for more</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
