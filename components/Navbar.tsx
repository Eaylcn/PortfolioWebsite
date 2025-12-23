
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', path: '/', icon: 'home' },
    { name: 'Character Sheet', path: '/skills', icon: 'person' },
    { name: 'Quest Log', path: '/portfolio', icon: 'map' },
    { name: 'Droid Shikai', path: '/droid-shikai', icon: 'cognition' },
    { name: 'Contact', path: '/contact', icon: 'mail' }
  ];

  // Sayfa değiştiğinde menüyü kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-3 text-white group">
              <div className="size-8 sm:size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-glow">
                <span className="material-symbols-outlined text-2xl font-bold">sword_rose</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold tracking-tight font-display">Emir Ata Yalçın</h2>
                <span className="text-[10px] text-primary uppercase font-bold tracking-[0.2em] -mt-1">QA Engineer & Game Architect</span>
              </div>
            </Link>
            
            <nav className="hidden xl:flex flex-1 justify-end items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === link.path ? 'text-primary' : 'text-slate-300 hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <Link to="/contact" className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-glow hover:shadow-glow-hover flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">bolt</span>
                <span>Hire Me</span>
              </Link>
            </nav>
            
            {/* Hamburger Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden text-slate-300 hover:text-primary transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card-dark border-l border-border-dark z-50 xl:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border-dark flex items-center justify-between">
            <span className="text-white font-display font-bold uppercase tracking-widest text-xs">Navigation</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'bg-primary text-white shadow-glow' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span className="font-bold text-sm uppercase tracking-widest">{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Footer CTA */}
          <div className="p-6 border-t border-border-dark">
            <Link 
              to="/contact" 
              className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-glow hover:shadow-glow-hover uppercase tracking-widest"
            >
              <span className="material-symbols-outlined">bolt</span>
              Hire Me
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
