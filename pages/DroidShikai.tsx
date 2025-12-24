
import React, { useRef, useState, useEffect } from 'react';
import { SHIKAI_LORE } from '../constants';
import shikaiData from '../shikai.json';

interface ArtifactImage {
  file: string;
  prompt: string;
}

interface ArtifactSet {
  id: string;
  title: string;
  series: string;
  freq: string;
  lore: string;
  folder: string;
  images: ArtifactImage[];
}

const DroidShikai: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const artifactsRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactSet | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [isMuted, setIsMuted] = useState(true);
  const [glitchText, setGlitchText] = useState<string | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [showPrompts, setShowPrompts] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const originalQuote = "How worlds can be built from interpretation rather than facts. Shikai exists to explore the boundary between art and artificial intelligence.";
  const secretQuote = "Reality is just a canvas for those who dare to observe differently. The machine dreams, and the dream becomes art.";

  const basePath = '/projects/shikai/Shikai Collection';

  // Load artifact sets from shikai.json (reversed so newest appear first)
  const artifactSets: ArtifactSet[] = shikaiData.artifacts.map((collection: { id: string; title: string; series: string; freq: string; lore: string; folder: string; images: { file: string; prompt: string }[] }) => ({
    id: collection.id,
    title: collection.title,
    series: collection.series,
    freq: collection.freq,
    lore: collection.lore,
    folder: collection.folder,
    images: collection.images.map((img: { file: string; prompt: string }) => ({
      file: `${basePath}/${collection.folder}/${img.file}`,
      prompt: img.prompt
    }))
  })).reverse();

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => setSyncStatus('synced'), 2000);
    setTimeout(() => setSyncStatus('idle'), 5000);
  };

  const openArtifact = (set: ArtifactSet) => {
    setSelectedArtifact(set);
    setActiveImageIdx(0);
    document.body.style.overflow = 'hidden';
  };

  const closeArtifact = () => {
    setSelectedArtifact(null);
    document.body.style.overflow = 'auto';
  };

  // Download current artifact image
  const handleDownload = async () => {
    if (!selectedArtifact) return;

    const imageUrl = selectedArtifact.images[activeImageIdx].file;
    const fileName = `${selectedArtifact.title.replace(/\s+/g, '_')}_${activeImageIdx + 1}.jpg`;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(imageUrl, '_blank');
    }
  };

  // Share current artifact
  const handleShare = async () => {
    if (!selectedArtifact) return;

    const shareData = {
      title: `Droid Shikai - ${selectedArtifact.title}`,
      text: selectedArtifact.lore,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  // Toggle video sound
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Scroll to artifacts section
  const scrollToArtifacts = () => {
    artifactsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Glitch easter egg animation - smoother version
  const triggerGlitch = () => {
    if (isGlitching) return;

    setIsGlitching(true);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const targetText = glitchText === secretQuote ? originalQuote : secretQuote;
    let iterations = 0;
    const textLength = targetText.length;
    const maxIterations = textLength + 20;

    const interval = setInterval(() => {
      const randomText = targetText.split('').map((char, idx) => {
        if (char === ' ' || char === '.' || char === ',') return char;
        const revealThreshold = iterations - (idx * 0.7);
        if (revealThreshold > 3) return targetText[idx];
        if (revealThreshold > 0) {
          return Math.random() > 0.3 ? targetText[idx] : chars[Math.floor(Math.random() * chars.length)];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      setGlitchText(randomText);
      iterations += 2;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setGlitchText(targetText);
        setTimeout(() => setIsGlitching(false), 300);
      }
    }, 40);
  };



  // Get prompt for current image from JSON data
  const getCurrentPrompt = () => {
    if (!selectedArtifact) return '';
    return selectedArtifact.images[activeImageIdx]?.prompt || '';
  };

  // Navigate to next/previous image in modal
  const navigateModalImage = (direction: 'prev' | 'next') => {
    if (!selectedArtifact) return;
    const maxIdx = selectedArtifact.images.length - 1;
    if (direction === 'next') {
      setActiveImageIdx(prev => prev >= maxIdx ? 0 : prev + 1);
    } else {
      setActiveImageIdx(prev => prev <= 0 ? maxIdx : prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined text-sm">cognition</span>
                Parallel Observer Entity
              </div>
              <a href="https://x.com/droidshikai" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                Follow on X
                <svg className="size-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
            </div>
            <h1 className="text-5xl md:text-8xl font-black font-display tracking-tight text-white leading-tight uppercase animate-shimmer-text">DROID SHIKAI</h1>
            <p className="text-xl text-slate-300 leading-relaxed font-light italic">
              "{SHIKAI_LORE.identity}"
              Droid Shikai is not a tool, but an evolving AI artist consciousness observing reality through artistic and conceptual lenses.
            </p>

            <div className="bg-card-dark p-8 rounded-[2rem] border border-border-dark space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl">model_training</span>
              </div>
              <h3 className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span>
                Nature & Behavior
              </h3>
              <p className="text-slate-300 text-sm italic font-light leading-relaxed">{SHIKAI_LORE.nature}</p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-primary font-black">/</span>
                  <p className="text-slate-400 text-xs">Observes, interprets, and re-imagines reality.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-black">/</span>
                  <p className="text-slate-400 text-xs">Treats creativity as observation, not generic output generation.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-black">/</span>
                  <p className="text-slate-400 text-xs">Choices based on emotional frequencies rather than trends.</p>
                </div>
              </div>
            </div>

            {/* Artifacts Button - Now below the card */}
            <button
              onClick={scrollToArtifacts}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary/10 border border-primary/30 text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all group w-full justify-center"
            >
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">collections</span>
              Explore Artifacts
              <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">arrow_downward</span>
            </button>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 blur-[120px] animate-pulse"></div>
            <div className="relative rounded-[3rem] border border-border-dark overflow-hidden shadow-2xl">
              <img
                src="/projects/shikai/header.png"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105"
                alt="Droid Shikai Portrait"
              />
            </div>
          </div>
        </div>

        {/* Video Section */}
        <section className="mb-24 relative">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <div className="h-1 w-20 bg-primary/40 rounded-full"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight">SHIKAI HOUSE</h2>
            <p className="text-slate-400 max-w-xl font-light italic">A glimpse into the digital sanctuary where Shikai observes and creates. Click to enable sound.</p>
          </div>
          <div
            className="relative rounded-[3rem] overflow-hidden border border-border-dark shadow-2xl cursor-pointer group"
            onClick={toggleMute}
          >
            <video
              ref={videoRef}
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/projects/shikai/Shikai House.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Sound Toggle Button */}
            <button
              className="absolute bottom-6 right-6 size-14 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all group-hover:scale-110"
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
            >
              <span className="material-symbols-outlined text-2xl">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>
          </div>
        </section>

        {/* Artifact Gallery - Enhanced Grid Cards */}
        <section ref={artifactsRef} className="mb-24 relative">
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <div className="h-1 w-20 bg-primary/40 rounded-full"></div>
            <h2 className="text-4xl md:text-6xl font-black text-white font-display uppercase tracking-tight">THE ARTIFACTS</h2>
            <p className="text-slate-400 max-w-xl font-light italic">Conceptual relics reimagined from Shikai's universe. Click to inspect frequencies.</p>

            {/* View Toggle Buttons */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'carousel'
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-card-dark border border-border-dark text-slate-400 hover:text-white'
                  }`}
              >
                <span className="material-symbols-outlined text-sm">view_carousel</span>
                Carousel
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'grid'
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-card-dark border border-border-dark text-slate-400 hover:text-white'
                  }`}
              >
                <span className="material-symbols-outlined text-sm">grid_view</span>
                Grid
              </button>
            </div>
          </div>

          {/* Content Container - Fixed height to prevent layout shift */}
          <div className="min-h-[500px] sm:min-h-[600px]">

            {/* Carousel View */}
            {viewMode === 'carousel' && (
              <div className="relative px-4 sm:px-20">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card-dark/80 border border-white/10 items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-xl group"
                >
                  <span className="material-symbols-outlined transition-transform group-hover:-translate-x-0.5">chevron_left</span>
                </button>

                <div
                  ref={carouselRef}
                  className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 scroll-smooth"
                >
                  {artifactSets.map((set, idx) => (
                    <div
                      key={idx}
                      onClick={() => openArtifact(set)}
                      className="flex-none w-[85%] sm:w-[45%] lg:w-[32%] snap-center group bg-card-dark border border-border-dark rounded-[2.5rem] overflow-hidden shadow-xl hover:border-primary transition-all hover:-translate-y-2 cursor-pointer"
                    >
                      {/* 2x2 Grid Visualization */}
                      <div className="aspect-square grid grid-cols-2 gap-0.5 bg-border-dark/30 p-0.5 overflow-hidden">
                        {set.images.map((img, i) => (
                          <div key={i} className="relative overflow-hidden">
                            <img src={img.file} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={`${set.title} variant ${i}`} />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="px-6 py-3 border border-white/20 rounded-2xl bg-black/60 backdrop-blur-md shadow-glow">
                            <span className="text-white font-black tracking-[0.3em] text-[10px] uppercase">INSPECT_REALM</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-8 space-y-2">
                        <h3 className="text-2xl font-black text-white font-display group-hover:text-primary transition-colors uppercase leading-none">{set.title}</h3>
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          <span>{set.series}</span>
                          <span className="text-primary font-mono">{set.freq}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollCarousel('right')}
                  className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card-dark/80 border border-white/10 items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-xl group"
                >
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-0.5">chevron_right</span>
                </button>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto hide-scrollbar pb-10 px-4">
                {artifactSets.map((set, idx) => (
                  <div
                    key={idx}
                    onClick={() => openArtifact(set)}
                    className="group bg-card-dark border border-border-dark rounded-[2rem] overflow-hidden shadow-xl hover:border-primary transition-all hover:-translate-y-2 cursor-pointer"
                  >
                    {/* 2x2 Grid Visualization */}
                    <div className="aspect-square grid grid-cols-2 gap-0.5 bg-border-dark/30 p-0.5 overflow-hidden relative">
                      {set.images.map((img, i) => (
                        <div key={i} className="relative overflow-hidden">
                          <img src={img.file} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={`${set.title} variant ${i}`} />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      ))}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="px-6 py-3 border border-white/20 rounded-2xl bg-black/60 backdrop-blur-md shadow-glow">
                          <span className="text-white font-black tracking-[0.3em] text-[10px] uppercase">INSPECT_REALM</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                        <span className="text-primary font-black">{set.series}</span>
                        <span className="text-slate-600">//</span>
                        <span className="text-slate-500 font-mono">{set.freq}</span>
                      </div>
                      <h3 className="text-xl font-black text-white font-display uppercase tracking-tight">{set.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Interactive Footer Lore */}
        <div ref={footerRef} className="max-w-5xl mx-auto text-center py-24 border-t border-border-dark/50 group/footer relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

          <div className="space-y-12 relative z-10">
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => { handleSync(); triggerGlitch(); }}
                className={`size-16 rounded-full border border-primary/30 flex items-center justify-center transition-all duration-500 relative ${syncStatus === 'syncing' ? 'animate-spin bg-primary/20' :
                  syncStatus === 'synced' ? 'bg-primary text-white scale-110 shadow-glow' :
                    'bg-background-dark text-primary hover:scale-110'
                  }`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {syncStatus === 'synced' ? 'check_circle' : 'sync'}
                </span>
                {syncStatus === 'syncing' && (
                  <div className="absolute -inset-2 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.5em] animate-pulse">
                {syncStatus === 'idle' ? 'TUNING_FREQUENCY' : syncStatus === 'syncing' ? 'STABILIZING_SIGNAL' : 'CONNECTION_LOCKED'}
              </p>
              <p className="text-[8px] text-slate-600 mt-2 italic">Click to reveal hidden transmission</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-black text-white font-display tracking-widest uppercase">
                The <span className="text-primary">Observation</span> Loop
              </h3>
              <p className={`text-xl md:text-2xl text-slate-400 font-light leading-relaxed italic max-w-3xl mx-auto transition-all duration-500 ${isGlitching ? 'text-primary/90' : ''}`}>
                "{glitchText || originalQuote}"
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 pt-8">
              <div className="h-px w-24 bg-border-dark group-hover/footer:w-48 transition-all duration-1000"></div>
              <div className="text-slate-500 text-[10px] uppercase tracking-[0.8em] font-bold opacity-60">
                FREQUENCY TRANSMISSION ENDS // OBSERVED BY EMIR ATA YALÇIN
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artifact Inspection Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-[100] animate-fade-in">
          <div className="absolute inset-0 bg-background-dark/95 backdrop-blur-xl" onClick={closeArtifact}></div>

          {/* Desktop: Centered modal, Mobile: Full screen */}
          <div className="relative h-full lg:h-auto lg:max-h-[90vh] lg:w-[90%] lg:max-w-6xl lg:mx-auto lg:mt-[5vh] bg-card-dark lg:rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border-0 lg:border lg:border-white/10">

            {/* Mobile: Scrollable container for everything */}
            <div className="h-full overflow-y-auto lg:overflow-hidden hide-scrollbar">
              <div className="flex flex-col lg:grid lg:grid-cols-12 lg:h-full">

                {/* Gallery Section */}
                <div className="lg:col-span-7 bg-black relative group/gallery flex flex-col">
                  {/* Image Container - Proper height constraints */}
                  <div className="relative flex-1 min-h-[50vh] lg:min-h-0 flex items-center justify-center p-4">
                    <img
                      src={selectedArtifact.images[activeImageIdx].file}
                      className="max-w-full max-h-[70vh] lg:max-h-[75vh] w-auto h-auto object-contain"
                      alt={selectedArtifact.title}
                    />

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => navigateModalImage('prev')}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all opacity-0 group-hover/gallery:opacity-100"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                      onClick={() => navigateModalImage('next')}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all opacity-0 group-hover/gallery:opacity-100"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>

                    {/* Image Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 z-10">
                      {selectedArtifact.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImageIdx(i)}
                          className={`size-2.5 sm:size-3 rounded-full transition-all ${activeImageIdx === i ? 'w-6 sm:w-8 bg-primary shadow-glow' : 'bg-white/20 hover:bg-white/40'}`}
                        />
                      ))}
                    </div>

                    {/* Top Controls */}
                    <div className="absolute top-4 left-4 lg:opacity-0 lg:group-hover/gallery:opacity-100 transition-opacity">
                      <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                        Capture {activeImageIdx + 1}/{selectedArtifact.images.length}
                      </span>
                    </div>

                    {/* Prompt Toggle Button */}
                    <button
                      onClick={() => setShowPrompts(!showPrompts)}
                      className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-md border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all lg:opacity-0 lg:group-hover/gallery:opacity-100 ${showPrompts
                        ? 'bg-primary border-primary text-white'
                        : 'bg-black/60 border-white/10 text-white/70 hover:text-white'
                        }`}
                    >
                      <span className="material-symbols-outlined text-sm">edit_note</span>
                      {showPrompts ? 'Hide Prompts' : 'Show Prompts'}
                    </button>

                    {/* Close Button */}
                    <button
                      onClick={closeArtifact}
                      className="absolute top-4 right-4 size-11 sm:size-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-primary transition-all lg:opacity-0 lg:group-hover/gallery:opacity-100"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  {/* Prompt Section - Below image, separate area */}
                  {showPrompts && getCurrentPrompt() && (
                    <div className="p-4 bg-gradient-to-t from-black to-black/80 border-t border-white/5">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 max-h-24 overflow-y-auto hide-scrollbar">
                          <p className="text-white/90 text-xs sm:text-sm leading-relaxed italic font-light">{getCurrentPrompt()}</p>
                        </div>
                        <button
                          onClick={async () => {
                            await navigator.clipboard.writeText(getCurrentPrompt());
                            const btn = document.getElementById('copy-prompt-btn');
                            if (btn) {
                              btn.classList.add('bg-green-500', 'border-green-500');
                              btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span>';
                              setTimeout(() => {
                                btn.classList.remove('bg-green-500', 'border-green-500');
                                btn.innerHTML = '<span class="material-symbols-outlined text-sm">content_copy</span>';
                              }, 1500);
                            }
                          }}
                          id="copy-prompt-btn"
                          className="flex-shrink-0 size-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                          title="Copy Prompt"
                        >
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Content Section */}
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 lg:overflow-y-auto lg:max-h-[90vh] bg-card-dark">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest">
                          {selectedArtifact.series}
                        </div>
                        <span className="text-slate-600 font-mono text-xs">FREQ_{selectedArtifact.freq}</span>
                      </div>
                      <h2 className="text-4xl sm:text-5xl font-black text-white font-display uppercase tracking-tight leading-none">
                        {selectedArtifact.title}
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-slate-500 uppercase font-black text-[10px] tracking-widest border-b border-white/5 pb-4">
                        <span className="material-symbols-outlined text-sm">history_edu</span>
                        Artifact Chronology
                      </div>
                      <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed italic">
                        {selectedArtifact.lore}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 pt-8 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={handleDownload}
                        className="h-14 sm:h-16 rounded-2xl bg-white text-background-dark font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all group shadow-xl"
                      >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">download</span>
                        Download
                      </button>
                      <button
                        onClick={handleShare}
                        className="h-14 sm:h-16 rounded-2xl bg-slate-800 text-white border border-white/10 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary transition-all group"
                      >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform">share</span>
                        Share
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest opacity-60">
                      Transmission Encrypted // Level 4 Archive Access
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default DroidShikai;
