
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import DroidShikai from './pages/DroidShikai';
import BugOracle from './components/BugOracle';
import GameDetailPage from './pages/GameDetailPage';
import MobileDetailPage from './pages/MobileDetailPage';
import WebDetailPage from './pages/WebDetailPage';

const Footer: React.FC = () => (
  <footer className="bg-background-dark/50 py-12 border-t border-border-dark/30 backdrop-blur-sm mt-auto w-full">
    <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8 text-center">
      <div className="flex items-center justify-center gap-10">
        <a
          className="text-slate-500 hover:text-primary transition-all duration-300 transform hover:scale-125"
          href="https://github.com/Eaylcn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg className="size-6 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
        </a>
        <a
          className="text-slate-500 hover:text-primary transition-all duration-300 transform hover:scale-125"
          href="https://linkedin.com/in/emir-ata-yalcin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg className="size-6 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5V13.2a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3V10.2H10.1v8.3h2.8v-4.79c0-.46.08-.91.22-1.13.42-.82 1.13-.82 1.53-.82a1.27 1.27 0 0 1 1.26 1.26v5.48h2.59M6.75 8.25c.96 0 1.75-.79 1.75-1.75S7.71 4.75 6.75 4.75 5 5.54 5 6.5s.79 1.75 1.75 1.75m1.4 10.25V10.2H5.35v8.3h2.8z" /></svg>
        </a>
      </div>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em]">
        © {new Date().getFullYear()} EMIR ATA YALÇIN • ARCHITECTED FOR QUALITY
      </p>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background-dark flex flex-col font-body">
        <Navbar />
        <BugOracle />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/games/:slug" element={<GameDetailPage />} />
            <Route path="/mobile/:slug" element={<MobileDetailPage />} />
            <Route path="/web/:slug" element={<WebDetailPage />} />
            <Route path="/droid-shikai" element={<DroidShikai />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
