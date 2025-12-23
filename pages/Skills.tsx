
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { STATS, EXPERIENCE, CERTIFICATIONS, USER_KNOWLEDGE } from '../constants';

const Skills: React.FC = () => {
  const [showAllExperience, setShowAllExperience] = useState(false);

  const arsenalItems = [
    { name: 'Selenium', category: 'Automation', icon: 'public' },
    { name: 'Appium', category: 'Mobile', icon: 'smartphone' },
    { name: 'Robot Framework', category: 'Automation', icon: 'precision_manufacturing' },
    { name: 'Cucumber', category: 'BDD', icon: 'eco' },
    { name: 'Gherkin', category: 'BDD', icon: 'description' },
    { name: 'RestAssured', category: 'API', icon: 'api' },
    { name: 'Karate', category: 'API', icon: 'shield' },
    { name: 'Postman', category: 'API', icon: 'send' },
    { name: 'Jenkins', category: 'CI/CD', icon: 'cyclone' },
    { name: 'Docker', category: 'CI/CD', icon: 'box' },
    { name: 'JIRA', category: 'Management', icon: 'assignment' },
    { name: 'Java', category: 'Language', icon: 'coffee' },
    { name: 'C#', category: 'Language', icon: 'terminal' },
    { name: 'Ember.js', category: 'Frontend', icon: 'web' },
    { name: 'Unity', category: 'Game Dev', icon: 'deployed_code' }
  ];

  const displayedExperience = showAllExperience ? EXPERIENCE : EXPERIENCE.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
      {/* High-Fidelity Character Header */}
      <div className="relative mb-20 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-[4rem] blur-xl opacity-50"></div>
        <div className="relative bg-card-dark/60 backdrop-blur-2xl border-2 border-white/5 rounded-[4rem] p-10 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2"></div>

          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="relative shrink-0">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="size-64 rounded-full border-4 border-white bg-background-dark shadow-glow relative z-10 overflow-hidden ring-8 ring-white/5 transition-transform duration-700 group-hover:scale-105">
                <img
                  src="/images/profile.png"
                  className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0"
                  alt="Emir Ata Yalçın Profile"
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-background-dark px-10 py-2.5 rounded-full font-black text-[10px] shadow-glow z-20 uppercase tracking-[0.3em] border-2 border-primary/20 whitespace-nowrap">
                MASTER ARCHITECT
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="space-y-2">
                <p className="text-primary font-bold text-xs tracking-[0.5em] uppercase opacity-80">Identification_Protocol</p>
                <h1 className="text-6xl md:text-8xl font-black text-white font-display uppercase tracking-tighter leading-[0.85] transition-all group-hover:tracking-tight">
                  {USER_KNOWLEDGE.name}
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-2">
                  <p className="text-white text-2xl font-black tracking-widest uppercase border-b-2 border-primary">QA ENGINEER</p>
                  <span className="hidden sm:inline size-2 rounded-full bg-primary/40"></span>
                  <p className="text-slate-400 font-medium tracking-[0.4em] text-sm uppercase italic opacity-60">Digital Architect</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <Link to="/contact" className="bg-primary hover:bg-blue-600 text-white px-12 py-5 rounded-[2rem] font-black text-xs transition-all shadow-glow hover:shadow-glow-hover flex items-center gap-4 active:scale-95 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-lg">terminal</span>
                  Establish Connection
                </Link>
                <a
                  href="/cv/emir-ata-yalcin-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-12 py-5 rounded-[2rem] font-black text-xs transition-all flex items-center gap-4 active:scale-95 uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-lg">description</span>
                  View Scroll (CV)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-4 space-y-10">
          {/* ATTRIBUTES */}
          <section className="bg-card-dark p-10 rounded-[3.5rem] border border-border-dark space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-40"></div>
            <h2 className="text-2xl font-black text-white font-display flex items-center gap-3 border-b border-border-dark pb-4 uppercase tracking-tighter">
              <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">pentagon</span>
              ATTRIBUTES
            </h2>
            <div className="space-y-6">
              {STATS.map(stat => (
                <div key={stat.name} className="space-y-3 group/stat">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover/stat:text-white transition-colors">
                    <span className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-background-dark/80 flex items-center justify-center text-sm material-symbols-outlined" style={{ color: stat.color }}>{stat.icon}</span>
                      {stat.name}
                    </span>
                    <span style={{ color: stat.color }} className="text-lg">{stat.value}</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <div className="h-full shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-1000" style={{ width: `${stat.value}%`, backgroundColor: stat.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE ARSENAL */}
          <section className="bg-card-dark p-10 rounded-[3.5rem] border border-border-dark space-y-8 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <h2 className="text-2xl font-black text-white font-display flex items-center gap-3 border-b border-border-dark pb-4 uppercase tracking-tighter">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">inventory_2</span>
              THE ARSENAL <span className="text-slate-500 text-[10px] font-normal lowercase tracking-widest italic">(Tech Stack)</span>
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {arsenalItems.map((item, idx) => (
                <div key={idx} className="relative group/item flex flex-col items-center">
                  <div className="size-14 rounded-2xl bg-background-dark/80 border border-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-primary group-hover/item:border-primary/50 transition-all cursor-help shadow-lg">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-all pointer-events-none z-50 translate-y-2 group-hover/item:translate-y-0">
                    <div className="bg-primary px-4 py-2 rounded-xl shadow-2xl border border-white/20 whitespace-nowrap text-center">
                      <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">{item.name}</p>
                      <p className="text-white/70 text-[8px] uppercase tracking-widest">{item.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ARTIFACTS */}
          <section className="bg-card-dark p-10 rounded-[3.5rem] border border-border-dark space-y-8 shadow-xl">
            <h2 className="text-2xl font-black text-white font-display flex items-center gap-3 border-b border-border-dark pb-4 uppercase tracking-tighter">
              <span className="material-symbols-outlined text-primary">military_tech</span>
              ARTIFACTS <span className="text-slate-500 text-[10px] font-normal lowercase tracking-widest italic">(Certifications)</span>
            </h2>
            <div className="space-y-4">
              {CERTIFICATIONS.map(cert => (
                <div key={cert.id} className="p-5 bg-background-dark/40 border border-white/5 rounded-3xl flex items-center gap-5 hover:border-primary transition-all group shadow-md hover:bg-primary/5 relative">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                    <span className="material-symbols-outlined text-2xl">{cert.icon}</span>
                  </div>
                  <div className="overflow-hidden flex-1">
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block group/link">
                        <h4 className="text-white font-bold text-xs uppercase tracking-tight group-hover/link:text-primary transition-colors truncate flex items-center gap-2">
                          {cert.title}
                          <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                        </h4>
                      </a>
                    ) : (
                      <h4 className="text-white font-bold text-xs uppercase tracking-tight group-hover:text-primary transition-colors truncate">{cert.title}</h4>
                    )}
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1 italic">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* IDENTITY */}
          <section className="bg-card-dark p-10 rounded-[3.5rem] border border-border-dark space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-7xl">format_quote</span>
            </div>
            <h2 className="text-2xl font-black text-white font-display border-b border-border-dark pb-4 uppercase tracking-tighter">Identity</h2>
            <p className="text-slate-300 text-sm italic leading-relaxed font-light relative z-10">
              {USER_KNOWLEDGE.identity}
            </p>
          </section>
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="lg:col-span-8 space-y-12">
          {/* EDUCATION */}
          <section className="bg-card-dark p-12 rounded-[4.5rem] border border-border-dark shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[150px]">school</span>
            </div>
            <h2 className="text-3xl font-black text-white font-display mb-10 flex items-center gap-4 uppercase tracking-tighter">
              <span className="material-symbols-outlined text-primary text-4xl">history_edu</span>
              EDUCATION
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-white">{USER_KNOWLEDGE.education.degree}</h3>
                  <p className="text-primary font-bold italic tracking-wider">{USER_KNOWLEDGE.education.institution}</p>
                </div>
                <span className="text-slate-500 font-mono text-sm px-4 py-1.5 bg-background-dark/80 rounded-full border border-white/5 whitespace-nowrap">{USER_KNOWLEDGE.education.period}</span>
              </div>
              <div className="mt-4 text-slate-400 text-sm space-y-6 leading-relaxed font-light italic">
                <ul className="space-y-2">
                  {USER_KNOWLEDGE.education.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="text-primary font-black">/</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* QUEST HISTORY (Expandable Experience) */}
          <section className="bg-card-dark p-12 rounded-[4.5rem] border border-border-dark shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[150px]">map</span>
            </div>
            <h2 className="text-3xl font-black text-white font-display mb-12 flex items-center gap-4 uppercase tracking-tighter">
              <span className="material-symbols-outlined text-primary text-4xl">map</span>
              QUEST HISTORY <span className="text-slate-500 text-xs font-normal lowercase tracking-[0.4em] italic">(Experience)</span>
            </h2>
            <div className="space-y-16 pl-10 border-l-4 border-primary/20 relative">
              {displayedExperience.map((exp, idx) => (
                <div key={exp.id} className="relative group/exp">
                  <div className="absolute -left-[54px] top-1.5 size-8 rounded-full bg-background-dark border-4 border-primary shadow-glow group-hover/exp:scale-110 transition-transform z-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-white">shield</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-baseline mb-6 gap-2">
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover/exp:text-primary transition-colors tracking-tight uppercase leading-none">{exp.title}</h3>
                      <p className="text-primary font-black uppercase tracking-[0.25em] text-[10px] mt-3 bg-primary/10 px-4 py-1.5 rounded-xl border border-primary/20 w-fit">{exp.company}</p>
                    </div>
                    <span className="text-slate-500 font-mono text-[10px] italic bg-slate-900 px-4 py-1 rounded-full border border-white/5 whitespace-nowrap">{exp.period}</span>
                  </div>
                  <ul className="space-y-4 text-slate-400 text-sm font-light leading-relaxed italic">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-4 group/li">
                        <span className="text-primary font-black mt-1 select-none opacity-50 group-hover/li:opacity-100 transition-opacity">/</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {EXPERIENCE.length > 2 && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowAllExperience(!showAllExperience)}
                  className="px-10 py-4 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-glow flex items-center gap-3 active:scale-95"
                >
                  <span className="material-symbols-outlined">
                    {showAllExperience ? 'expand_less' : 'expand_more'}
                  </span>
                  {showAllExperience ? 'Collapse Archives' : 'View Full History'}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Skills;
