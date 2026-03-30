
import { useParams, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useProject } from '../hooks/useProjects';
import BackButton from '../components/shared/BackButton';
import StatusBadge from '../components/shared/StatusBadge';
import LightboxModal from '../components/shared/LightboxModal';
import GalleryGrid from '../components/shared/GalleryGrid';

const GameDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, error } = useProject(slug);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <span className="material-symbols-outlined text-primary text-6xl animate-spin-slow">progress_activity</span>
      </div>
    );
  }

  if (!project || error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white font-display">Project Not Found</h2>
          <Link to="/portfolio" className="text-primary hover:underline">Back to Archive</Link>
        </div>
      </div>
    );
  }

  const links = (project.links || {}) as Record<string, string>;
  const hasLinks = Object.keys(links).length > 0;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <BackButton />

        {/* Hero Section */}
        <div className="relative rounded-[3rem] overflow-hidden border border-border-dark mb-12 shadow-2xl aspect-[21/9]">
          <img src={project.image_url || ''} className="w-full h-full object-cover" alt={project.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <StatusBadge status={project.status} />
              <h1 className="text-4xl md:text-7xl font-black text-white font-display uppercase tracking-tight">{project.title}</h1>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl text-center">
                <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">Engine</p>
                <p className="text-white font-black text-sm">{project.engine}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl text-center">
                <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">Genre</p>
                <p className="text-white font-black text-sm">{project.genre}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-12">
            <section className="bg-card-dark p-10 rounded-[2.5rem] border border-border-dark shadow-xl">
              <h2 className="text-2xl font-black text-white font-display mb-6 uppercase tracking-tighter flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">description</span>
                About This Project
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light italic">
                {project.long_description}
              </p>
            </section>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="bg-card-dark p-10 rounded-[2.5rem] border border-border-dark shadow-xl">
                <h2 className="text-2xl font-black text-white font-display mb-8 uppercase tracking-tighter flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">collections</span>
                  Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div
                    onClick={() => setLightboxImage(project.image_url || '')}
                    className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video group cursor-zoom-in hover:border-primary/50 transition-colors"
                  >
                    <img src={project.image_url || ''} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Main" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-white drop-shadow-lg">zoom_in</span>
                    </div>
                  </div>
                  {project.gallery.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video group cursor-zoom-in hover:border-primary/50 transition-colors"
                    >
                      <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${i}`} />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-white drop-shadow-lg">zoom_in</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-card-dark p-10 rounded-[2.5rem] border border-border-dark shadow-xl">
              <h2 className="text-2xl font-black text-white font-display mb-8 uppercase tracking-tighter flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">swords</span>
                Core Mechanics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.mechanics.map((mech, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-background-dark/60 rounded-2xl border border-white/5 hover:border-primary transition-colors group">
                    <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">bolt</span>
                    <span className="text-white font-bold text-sm tracking-wide">{mech}</span>
                  </div>
                ))}
              </div>
            </section>

            {project.systems && project.systems.length > 0 && (
              <section className="bg-card-dark p-10 rounded-[2.5rem] border border-border-dark shadow-xl">
                <h2 className="text-2xl font-black text-white font-display mb-8 uppercase tracking-tighter flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">settings_input_component</span>
                  Technical Systems
                </h2>
                <div className="space-y-4">
                  {project.systems.map((sys, i) => (
                    <div key={i} className="flex items-start gap-4 text-slate-400 text-sm italic font-light group">
                      <span className="text-primary font-black mt-1">/</span>
                      <span>{sys}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-card-dark p-8 rounded-[2.5rem] border border-border-dark shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-6xl">database</span>
              </div>
              <h3 className="text-white font-black font-display uppercase tracking-widest text-xs border-b border-white/10 pb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">hub</span>
                Links
              </h3>

              {hasLinks ? (
                <div className="space-y-3">
                  {links.steam && (
                    <a href={links.steam} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition-colors group">
                      <span className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">shopping_cart</span>
                        Steam Store
                      </span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                  )}
                  {links.github && (
                    <a href={links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition-colors group">
                      <span className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">terminal</span>
                        Source Code
                      </span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-6 bg-background-dark/80 rounded-2xl border border-dashed border-white/10 flex flex-col items-center text-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-slate-600 animate-pulse">lock</span>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Private Project</p>
                    <p className="text-[9px] text-slate-600 italic">This project is not yet publicly available. Contact me for access or demos.</p>
                  </div>
                  <Link to="/contact" className="flex items-center justify-center gap-2 w-full py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Request Access
                    <span className="material-symbols-outlined text-sm">key</span>
                  </Link>
                </div>
              )}
            </section>

            {project.roadmap && project.roadmap.length > 0 && (
              <section className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20 shadow-xl space-y-6">
                <h3 className="text-primary font-black font-display uppercase tracking-widest text-xs border-b border-primary/10 pb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  Roadmap
                </h3>
                <div className="space-y-4">
                  {project.roadmap.map((step, i) => (
                    <div key={i} className="flex gap-4 text-slate-300 text-xs italic font-light group">
                      <span className="text-primary font-black">#</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-card-dark p-8 rounded-[2.5rem] border border-border-dark space-y-4 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 size-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined font-bold">military_tech</span>
                <span className="font-black uppercase tracking-widest text-xs">Role</span>
              </div>
              <p className="text-white font-bold text-xl leading-tight">{project.role}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-black px-3 py-1 bg-primary/20 text-primary rounded-lg border border-primary/20 uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
};

export default GameDetailPage;
