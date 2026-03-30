import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusColorMap: Record<string, string> = {
  'Released': 'bg-green-500/20 text-green-400',
  'Live': 'bg-green-500/20 text-green-400',
  'In Development': 'bg-yellow-500/20 text-yellow-400',
  'MVP Development': 'bg-yellow-500/20 text-yellow-400',
  'Prototype': 'bg-primary/20 text-primary-glow',
  'Experimental': 'bg-purple-500/20 text-purple-400',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const colors = statusColorMap[status] || 'bg-primary/20 text-primary-glow';

  return (
    <span
      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md ${colors} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
