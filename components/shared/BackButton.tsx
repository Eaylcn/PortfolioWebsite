import React from 'react';
import { Link } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to = '/portfolio', label = 'Back to Archive' }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs mb-8 group"
    >
      <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">chevron_left</span>
      {label}
    </Link>
  );
};

export default BackButton;
