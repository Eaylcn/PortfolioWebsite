
import { useParams, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useProject } from '../hooks/useProjects';
import BackButton from '../components/shared/BackButton';
import LightboxModal from '../components/shared/LightboxModal';

const WebDetailPage: React.FC = () => {
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
   const hasLinks = links.live || links.github;

   return (
      <>
         <div className="min-h-screen pt-24 pb-20 bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

               {/* Back Button */}
               <BackButton />

               <div className="space-y-12">
                  {/* Web Header/Preview */}
                  <div className="relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[4rem] blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                     <div className="relative bg-card-dark border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl">
                        <div className="aspect-[21/9] w-full relative">
                           <img src={project.image_url || ''} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[3s]" alt={project.title} />
                           <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
                           <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center space-y-4 animate-fade-in-up">
                              <h1 className="text-6xl md:text-8xl font-black text-white font-display tracking-tighter uppercase leading-[0.85]">{project.title}</h1>
                              <p className="text-xl text-primary font-bold uppercase tracking-[0.4em] drop-shadow-glow">{project.role}</p>
                              <div className="flex gap-2">
                                 {project.platforms?.map(p => (
                                    <span key={p} className="text-[10px] text-white/40 border border-white/20 px-3 py-1 rounded-full uppercase tracking-widest font-black">{p}</span>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="grid lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 space-y-8">
                        <section className="bg-card-dark p-12 rounded-[3.5rem] border border-white/5 shadow-xl">
                           <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                              <span className="material-symbols-outlined text-primary">analytics</span>
                              Overview
                           </h2>
                           <p className="text-slate-300 text-lg leading-relaxed font-light italic mb-10">{project.long_description}</p>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {project.features.map((f, i) => (
                                 <div key={i} className="flex items-center gap-4 p-5 bg-background-dark/40 rounded-2xl border border-white/5 hover:border-primary/40 transition-colors">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    <span className="text-white text-[11px] font-black uppercase tracking-wide">{f}</span>
                                 </div>
                              ))}
                           </div>
                        </section>

                        {/* Gallery */}
                        {project.screenshots && project.screenshots.length > 0 && (
                           <section className="bg-card-dark p-12 rounded-[3.5rem] border border-white/5 shadow-xl">
                              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                                 <span className="material-symbols-outlined text-primary">desktop_windows</span>
                                 Previews
                              </h2>
                              <div className="grid grid-cols-1 gap-6">
                                 <div
                                    onClick={() => setLightboxImage(project.image_url || '')}
                                    className="relative rounded-2xl overflow-hidden border border-white/10 group shadow-lg aspect-video cursor-zoom-in hover:border-primary/50 transition-colors"
                                 >
                                    <img src={project.image_url || ''} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Main" />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <span className="material-symbols-outlined text-4xl text-white drop-shadow-lg">zoom_in</span>
                                    </div>
                                 </div>
                                 {project.screenshots.map((img, i) => (
                                    <div
                                       key={i}
                                       onClick={() => setLightboxImage(img)}
                                       className="relative rounded-2xl overflow-hidden border border-white/10 group shadow-lg aspect-video cursor-zoom-in hover:border-primary/50 transition-colors"
                                    >
                                       <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={`Preview ${i}`} />
                                       <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                          <span className="material-symbols-outlined text-4xl text-white drop-shadow-lg">zoom_in</span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </section>
                        )}
                     </div>

                     <div className="space-y-8">
                        <section className="bg-primary/10 border border-primary/20 p-10 rounded-[3rem] shadow-xl space-y-8 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                              <span className="material-symbols-outlined text-7xl">sensors</span>
                           </div>
                           <div className="space-y-2 text-center relative z-10">
                              <p className="text-primary text-[10px] font-black uppercase tracking-[0.5em]">Status</p>
                              <p className="text-white text-2xl font-black uppercase tracking-widest">{project.status}</p>
                           </div>

                           {hasLinks ? (
                              <div className="space-y-4 relative z-10">
                                 {links.live && (
                                    <a href={links.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-glow hover:bg-blue-600 hover:-translate-y-1 transition-all">
                                       <span className="material-symbols-outlined">launch</span>
                                       Live Site
                                    </a>
                                 )}
                                 {links.github && (
                                    <a href={links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full h-14 border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 hover:-translate-y-1 transition-all">
                                       <span className="material-symbols-outlined text-lg">terminal</span>
                                       Repository
                                    </a>
                                 )}
                              </div>
                           ) : (
                              <div className="space-y-4 relative z-10">
                                 <div className="bg-background-dark/80 p-6 rounded-2xl border border-dashed border-white/10 text-center">
                                    <span className="material-symbols-outlined text-slate-600 text-3xl mb-2 animate-pulse">encrypted</span>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Private Repository</p>
                                    <p className="text-[9px] text-slate-700 italic mt-2">Source code available upon request.</p>
                                 </div>
                                 <Link to="/contact" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                    Inquire Access
                                    <span className="material-symbols-outlined text-sm">mail</span>
                                 </Link>
                              </div>
                           )}
                        </section>

                        <section className="bg-card-dark border border-white/5 p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                           <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-6 text-center opacity-60">Tech Stack</h3>
                           <div className="flex flex-wrap gap-2 justify-center">
                              {project.tech_stack.map(t => (
                                 <span key={t} className="px-3 py-1.5 bg-background-dark/80 text-primary text-[9px] font-black border border-primary/30 rounded-lg uppercase tracking-widest hover:bg-primary hover:text-white transition-colors cursor-default">{t}</span>
                              ))}
                           </div>
                        </section>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Lightbox Modal */}
         <LightboxModal image={lightboxImage} onClose={() => setLightboxImage(null)} />
      </>
   );
};

export default WebDetailPage;
