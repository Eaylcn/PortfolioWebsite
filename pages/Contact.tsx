
import React, { useState, useRef } from 'react';
import { USER_KNOWLEDGE } from '../constants';

// EmailJS Yapılandırması - .env.local dosyasından okunur
// .env.local dosyasına şunları ekleyin:
// VITE_EMAILJS_SERVICE_ID=service_xxx
// VITE_EMAILJS_TEMPLATE_ID=template_xxx
// VITE_EMAILJS_PUBLIC_KEY=xxx
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
};

// Declare emailjs as a global variable from the CDN
declare const emailjs: {
  send: (serviceId: string, templateId: string, templateParams: Record<string, string>, publicKey: string) => Promise<{ status: number; text: string }>;
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setErrorMessage('');

    // EmailJS bilgileri girilmemiş ise uyarı ver
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
      setFormState('error');
      setErrorMessage('EmailJS yapılandırması henüz tamamlanmamış. Lütfen .env.local dosyasına VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID ve VITE_EMAILJS_PUBLIC_KEY değerlerini ekleyin.');
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Emir Ata Yalçın'
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setFormState('error');
      setErrorMessage('Transmission failed. Please try again or contact directly via email.');
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Abstract Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Info Side */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border-dark/30 border border-border-dark w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-400 tracking-wide uppercase">System Online</span>
            </div>
            <h1 className="text-white text-5xl md:text-8xl font-black leading-tight tracking-tight drop-shadow-2xl font-display">
              Establish <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Connection</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl font-light leading-relaxed max-w-lg font-body italic">
              Whether you are looking for a lead architect for your next digital world, a relentless bug slayer, or just want to discuss the philosophy of game mechanics, my terminal is open for secure transmissions.
            </p>
          </div>

          {/* Location UI */}
          <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden border border-border-dark/50 group bg-slate-900 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-10"></div>
            <img
              alt="Cyber visualization"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA0koAAjmnyPPUYImxgQVluvPDjeQoBviQBGoqwFBFC21RhxcOVcfiBf9zDraD-rZ38qISzphSbqn_natsxIRanpaZcjkQ0b5ap4JhZqJr-NhYhmW2UujHzWg66UVxSLi1hmcf954GnpAkhsbGBBmaHTzeY4I1yDEYibgW0J8V8SWH3csZNMXR7bfg4bmAur5Jj_qi633Ff4oSejmeZNRilrsi8cI3IDqQYxrExqcuDwE_Tfxk824hMx14TYwbSdTLAKAJdy6M-X8"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-xs text-primary font-mono mb-1 font-bold tracking-widest uppercase">LOCATION_DATA</p>
              <p className="text-white font-bold text-xl flex items-center gap-2 font-display">
                <span className="material-symbols-outlined text-primary">public</span>
                {USER_KNOWLEDGE.location}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-white text-sm font-bold uppercase tracking-widest border-b border-border-dark pb-2 mb-4 w-fit font-display">Secure Uplinks</p>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${USER_KNOWLEDGE.email}`} className="flex items-center gap-3 p-4 rounded-xl bg-card-dark border border-border-dark hover:border-primary transition-all group min-w-[200px]">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-text-muted">Direct Signal</span>
                  <span className="text-white font-medium">{USER_KNOWLEDGE.email}</span>
                </div>
              </a>
              <a href={USER_KNOWLEDGE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-card-dark border border-border-dark hover:border-primary transition-all group min-w-[200px]">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">link</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-text-muted">Network</span>
                  <span className="text-white font-medium">LinkedIn Profile</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-card-dark/90 backdrop-blur-xl border border-border-dark rounded-2xl p-6 md:p-8 shadow-2xl min-h-[500px] flex flex-col justify-center">

            {formState === 'success' ? (
              <div className="text-center space-y-6 animate-fade-in-up">
                <div className="size-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30 shadow-glow">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">Transmission Received</h3>
                <p className="text-slate-400 italic">The Master Architect has been notified. The Data Drake will guard your message until his review.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : formState === 'error' ? (
              <div className="text-center space-y-6 animate-fade-in-up">
                <div className="size-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
                  <span className="material-symbols-outlined text-4xl">error</span>
                </div>
                <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">Transmission Failed</h3>
                <p className="text-slate-400 italic max-w-sm mx-auto">{errorMessage}</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="px-8 py-3 bg-primary/20 border border-primary/30 rounded-xl text-primary text-xs font-black uppercase tracking-widest hover:bg-primary/30 transition-all"
                >
                  Retry Transmission
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-white text-xl font-bold flex items-center gap-2 font-display">
                    <span className="material-symbols-outlined text-primary">edit_note</span>
                    Transmission Log
                  </h3>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                </div>

                <form ref={formRef} className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-text-muted text-xs font-bold uppercase tracking-wider ml-1">Sender ID (Name)</label>
                      <div className="relative group/input">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-text-muted group-focus-within/input:text-primary">person</span>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl text-white border border-border-dark bg-input-bg focus:border-primary focus:ring-1 focus:ring-primary h-14 pl-12 pr-4 transition-all outline-none"
                          placeholder="Enter identity"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-text-muted text-xs font-bold uppercase tracking-wider ml-1">Return Frequency (Email)</label>
                      <div className="relative group/input">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-text-muted group-focus-within/input:text-primary">alternate_email</span>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl text-white border border-border-dark bg-input-bg focus:border-primary focus:ring-1 focus:ring-primary h-14 pl-12 pr-4 transition-all outline-none"
                          placeholder="user@domain.net"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-text-muted text-xs font-bold uppercase tracking-wider ml-1">Mission Protocol (Subject)</label>
                    <div className="relative group/input">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-text-muted group-focus-within/input:text-primary">radar</span>
                      <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl text-white border border-border-dark bg-input-bg focus:border-primary focus:ring-1 focus:ring-primary h-14 pl-12 pr-4 transition-all outline-none"
                        placeholder="Brief description of the objective"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-text-muted text-xs font-bold uppercase tracking-wider ml-1">Transmission Content</label>
                    <div className="relative group/input">
                      <span className="absolute left-4 top-5 material-symbols-outlined text-[20px] text-text-muted group-focus-within/input:text-primary">chat</span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl text-white border border-border-dark bg-input-bg focus:border-primary focus:ring-1 focus:ring-primary min-h-[160px] pl-12 pr-4 py-4 transition-all outline-none resize-none"
                        placeholder="Input detailed message parameters here..."
                      ></textarea>
                    </div>
                  </div>

                  <button
                    disabled={formState === 'sending'}
                    className="group relative flex items-center justify-center gap-3 w-full h-14 bg-primary hover:bg-blue-600 text-white font-bold text-lg rounded-xl transition-all shadow-glow hover:shadow-glow-hover overflow-hidden disabled:opacity-50"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className={`material-symbols-outlined ${formState === 'sending' ? 'animate-spin' : ''}`}>{formState === 'sending' ? 'sync' : 'send'}</span>
                    <span>{formState === 'sending' ? 'Transmitting...' : 'Initialize Transmission'}</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
