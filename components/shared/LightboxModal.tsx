import React from 'react';

interface LightboxModalProps {
  image: string | null;
  onClose: () => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
        onClick={onClose}
      >
        <span className="material-symbols-outlined text-4xl">close</span>
      </button>
      <img
        src={image}
        className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-fade-in-up"
        alt="Fullscreen view"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default LightboxModal;
