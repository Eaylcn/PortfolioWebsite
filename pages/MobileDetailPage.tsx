
import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { MobileProject } from '../types';

const MobileDetailPage: React.FC = () => {
   const { slug } = useParams<{ slug: string }>();
   const [project, setProject] = useState<MobileProject | null>(null);
   const [lightboxImage, setLightboxImage] = useState<string | null>(null);

   useEffect(() => {
      fetch('mobile.json')
         .then(res => res.json())
         .then((data: MobileProject[]) => {
            const found = data.find(p => p.slug === slug);
            setProject(found || null);
         });
   }, [slug]);

   if (!project) return null;

   const hasLinks = project.links && (project.links.appStore || project.links.playStore || project.links.github);

   return (
      <>
         <div className="min-h-screen pt-24 pb-20 bg-background-dark flex flex-col items-center">
            <div className="max-w-5xl w-full px-4 sm:px-6">

               {/* Back Button */}
               <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs mb-8 group">
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">chevron_left</span>
                  Back to Quest Log
               </Link>

               <div className="bg-card-dark rounded-[3.5rem] border border-border-dark overflow-hidden shadow-2xl">
                  {/* Header */}
                  <div className="p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center bg-gradient-to-br from-primary/10 to-transparent">
                     <div className="size-48 rounded-[3rem] bg-background-dark border-4 border-white/5 shadow-2xl flex items-center justify-center overflow-hidden shrink-0">
                        <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
                     </div>
                     <div className="flex-1 text-center md:text-left space-y-6">
                        <div className="flex flex-col gap-8"> {/* Status-Başlık mesafesi gap-8 ile artırıldı */}
                           <span className={`w-fit mx-auto md:mx-0 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md ${project.status === 'Released' ? 'bg-green-500/20 text-green-400' :
                              project.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400' :
                                 'bg-primary/20 text-primary-glow'
                              }`}>
                              {project.status}
                           </span>
                           <div className="space-y-3">
                              <h1 className="text-5xl md:text-7xl font-black text-white font-display uppercase tracking-tight leading-[0.85]">{project.title}</h1>
                              <p className="text-primary font-bold tracking-[0.4em] uppercase text-sm">
                                 {project.platforms?.join(' / ') || project.category}
                              </p>
                           </div>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                           {hasLinks ? (
                              <>
                                 {project.links.appStore && (
                                    <a href={project.links.appStore} target="_blank" rel="noopener noreferrer" className="bg-white text-background-dark px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-3 hover:scale-105 transition-transform group">
                                       <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.24-1.99 1.1-3.14-1.02.04-2.26.67-3.01 1.54-.68.76-1.28 1.96-1.12 3.07 1.13.09 2.3-.64 3.03-1.47z" /></svg>
                                       App Store
                                    </a>
                                 )}
                                 {project.links.playStore && (
                                    <a href={project.links.playStore} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-3 hover:scale-105 transition-transform group">
                                       <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5M16.81 15.12L18.67 17.07L16.81 18.93L13.69 12L16.81 5.07L18.67 7.02L16.81 8.88M14.4 12.71L4.54 22.56C4.69 22.63 4.84 22.67 5 22.67C5.3 22.67 5.58 22.56 5.81 22.33L14.4 13.71M14.4 10.29L5.81 1.67C5.58 1.44 5.3 1.33 5 1.33C4.84 1.33 4.69 1.37 4.54 1.44L14.4 11.29V10.29Z" /></svg>
                                       Play Store
                                    </a>
                                 )}
                              </>
                           ) : (
                              <div className="flex flex-col sm:flex-row items-center gap-4 bg-background-dark/50 p-4 rounded-3xl border border-white/5 backdrop-blur-sm">
                                 <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-xl">
                                    <span className="material-symbols-outlined text-primary animate-pulse">shield</span>
                                    <span className="text-[10px] text-white font-black uppercase tracking-widest">Internal Build Only</span>
                                 </div>
                                 <p className="text-[9px] text-slate-500 italic max-w-[200px]">This application is distributed through private channels for R&D purposes.</p>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* Info Grid */}
                  <div className="p-10 md:p-16 grid lg:grid-cols-2 gap-16 border-t border-white/5">
                     <div className="space-y-10">
                        <section className="space-y-4">
                           <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                              <span className="material-symbols-outlined text-primary">description</span>
                              Project Mission
                           </h2>
                           <p className="text-slate-400 leading-relaxed italic font-light">{project.longDescription}</p>
                        </section>

                        {project.systems && project.systems.length > 0 && (
                           <section className="space-y-4">
                              <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                                 <span className="material-symbols-outlined text-primary">memory</span>
                                 Internal Systems
                              </h2>
                              <div className="space-y-3">
                                 {project.systems.map((sys, i) => (
                                    <div key={i} className="flex gap-4 text-slate-400 text-sm italic font-light">
                                       <span className="text-primary font-black">/</span>
                                       {sys}
                                    </div>
                                 ))}
                              </div>
                           </section>
                        )}

                        <section className="space-y-4">
                           <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                              <span className="material-symbols-outlined text-primary">terminal</span>
                              Tech Stack
                           </h2>
                           <div className="flex flex-wrap gap-2">
                              {project.techStack.map(tech => (
                                 <span key={tech} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold border border-white/5 uppercase tracking-widest">{tech}</span>
                              ))}
                           </div>
                        </section>

                        {/* SCREENSHOT SECTION */}
                        {project.screenshots && project.screenshots.length > 0 && (
                           <section className="space-y-6">
                              <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                                 <span className="material-symbols-outlined text-primary">smartphone</span>
                                 Deployment Captures
                              </h2>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                 {/* Ana görsel ilk sırada */}
                                 <div
                                    onClick={() => setLightboxImage(project.imageUrl)}
                                    className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 group shadow-lg cursor-zoom-in hover:border-primary/50 transition-colors"
                                 >
                                    <img src={project.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Main" />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <span className="material-symbols-outlined text-3xl text-white drop-shadow-lg">zoom_in</span>
                                    </div>
                                 </div>
                                 {project.screenshots.map((img, i) => (
                                    <div
                                       key={i}
                                       onClick={() => setLightboxImage(img)}
                                       className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 group shadow-lg cursor-zoom-in hover:border-primary/50 transition-colors"
                                    >
                                       <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Screenshot ${i}`} />
                                       <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                          <span className="material-symbols-outlined text-3xl text-white drop-shadow-lg">zoom_in</span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </section>
                        )}
                     </div>

                     <div className="space-y-10">
                        <section className="bg-background-dark/40 p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
                           <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                              <span className="material-symbols-outlined text-primary">star</span>
                              Key Features
                           </h2>
                           <ul className="space-y-4">
                              {project.features.map((feat, i) => (
                                 <li key={i} className="flex gap-4 text-slate-400 text-sm italic font-light group">
                                    <span className="text-primary font-black group-hover:translate-x-1 transition-transform">/</span>
                                    {feat}
                                 </li>
                              ))}
                           </ul>
                        </section>

                        {project.roadmap && project.roadmap.length > 0 && (
                           <section className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20 space-y-4">
                              <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                                 <span className="material-symbols-outlined text-primary">track_changes</span>
                                 Deployment Roadmap
                              </h2>
                              <div className="space-y-3">
                                 {project.roadmap.map((step, i) => (
                                    <div key={i} className="flex gap-4 text-slate-300 text-sm italic font-light">
                                       <span className="text-primary font-black">#</span>
                                       {step}
                                    </div>
                                 ))}
                              </div>
                           </section>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Lightbox Modal */}
         {
            lightboxImage && (
               <div
                  className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                  onClick={() => setLightboxImage(null)}
               >
                  <button
                     className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
                     onClick={() => setLightboxImage(null)}
                  >
                     <span className="material-symbols-outlined text-4xl">close</span>
                  </button>
                  <img
                     src={lightboxImage}
                     className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-fade-in-up"
                     alt="Fullscreen view"
                     onClick={(e) => e.stopPropagation()}
                  />
               </div>
            )
         }
      </>
   );
};

export default MobileDetailPage;
