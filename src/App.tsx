/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import QRCodeStyling from 'qr-code-styling';
import {
  UserCircle2,
  LayoutGrid,
  Square,
  CircleDashed,
  Check,
  Palette,
  Download,
  Zap,
  LineChart,
  Shield,
  Share2,
  Globe
} from 'lucide-react';

export default function App() {
  const [textInput, setTextInput] = useState('');
  const [nodeStyle, setNodeStyle] = useState('square');
  const [accentColor, setAccentColor] = useState('blue');
  const [embedLogo, setEmbedLogo] = useState(true);
  const [highPrecision, setHighPrecision] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCode] = useState(() => new QRCodeStyling({
    width: 320,
    height: 320,
    type: "svg",
    data: "https://qrm.com",
    dotsOptions: {
      color: "#000000",
      type: "square"
    },
    backgroundOptions: {
      color: "transparent",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 10
    }
  }));

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
    }
  }, [qrCode, qrRef]);

  useEffect(() => {
    const accentColorMap = {
      blue: '#22d3ee', // cyan-400
      purple: '#c084fc', // purple-400
      green: '#4ade80' // green-400
    };

    const getDotsType = () => {
      switch(nodeStyle) {
        case 'rounded': return 'rounded';
        case 'smooth': return 'classy-rounded';
        default: return 'square';
      }
    };

    const getCornersType = () => {
      switch(nodeStyle) {
        case 'rounded': return 'extra-rounded';
        case 'smooth': return 'dot';
        default: return 'square';
      }
    };

    const currentStroke = accentColorMap[accentColor as keyof typeof accentColorMap] || '#000';
    const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${currentStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="background:#fff; border-radius:4px;"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`;
    const b64Logo = `data:image/svg+xml;base64,${btoa(logoSvg)}`;

    qrCode.update({
      data: textInput || "https://qrm.com",
      dotsOptions: {
        color: "#000000",
        type: getDotsType() as any
      },
      cornersSquareOptions: {
        color: currentStroke,
        type: getCornersType() as any
      },
      cornersDotOptions: {
        color: currentStroke,
        type: getCornersType() === 'square' ? 'square' : 'dot'
      },
      image: embedLogo ? b64Logo : undefined,
      qrOptions: {
        errorCorrectionLevel: highPrecision ? 'H' : 'Q'
      }
    });

  }, [textInput, nodeStyle, accentColor, embedLogo, highPrecision, qrCode]);

  const handleDownload = () => {
    qrCode.download({ name: 'qrm-signature', extension: 'png' });
  };

  const nodeStyles = [
    { id: 'square', label: 'Square', icon: LayoutGrid },
    { id: 'rounded', label: 'Rounded', icon: Square },
    { id: 'smooth', label: 'Smooth', icon: CircleDashed },
  ];

  const accentColors = [
    { id: 'blue', colorClass: 'bg-cyan-400' },
    { id: 'purple', colorClass: 'bg-purple-400' },
    { id: 'green', colorClass: 'bg-green-400' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-white">
      {/* TopAppBar */}
      <header className="bg-white/5 backdrop-blur-xl sticky top-0 z-50 border-b border-white/15">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 h-10 w-10">
               <QrIcon className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold text-3xl tracking-tighter text-white leading-none">
              QRM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/70 hover:text-white transition-all duration-300 flex items-center">
              <UserCircle2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 overflow-x-hidden">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-white/15 bg-white/10 text-xs tracking-widest uppercase">
            Signature Edition
          </div>
          <h1 className="font-light text-5xl md:text-7xl text-white mb-4 tracking-tight">
            Generate Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold">
              Signature QR
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Precision tools for high-performance direct text QR generation. Fast, secure, and elegantly designed for modern digital ecosystems.
          </p>
        </motion.section>

        {/* Main Generator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Input & Customization Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 glass-card p-8 flex flex-col space-y-6"
          >
            {/* Text Input */}
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-widest text-white/50 uppercase">
                Direct Text Input
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter your direct text message here..."
                  className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-4 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent outline-none transition-all placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Node Styles */}
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-widest text-white/50 uppercase">
                Node Style
              </label>
              <div className="flex flex-wrap gap-3">
                {nodeStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setNodeStyle(style.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-[100px] border transition-colors font-medium text-[13px] uppercase tracking-wide ${
                      nodeStyle === style.id
                        ? 'bg-white/20 text-white border-white/30'
                        : 'border-white/15 text-white/70 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <style.icon className="w-4 h-4" />
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-widest text-white/50 uppercase">
                Accent Color
              </label>
              <div className="flex gap-4 items-center">
                {accentColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setAccentColor(color.id)}
                    className={`w-12 h-12 rounded-full ${color.colorClass} flex items-center justify-center transition-transform hover:scale-110 ${
                      accentColor === color.id ? 'text-white ring-2 ring-white/20' : ''
                    }`}
                  >
                    {accentColor === color.id && <Check className="w-5 h-5" />}
                  </button>
                ))}
                <button className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                  <Palette className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Customization Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <ToggleSwitch
                label="Embed Logo"
                checked={embedLogo}
                onChange={() => setEmbedLogo(!embedLogo)}
              />
              <ToggleSwitch
                label="High Precision"
                checked={highPrecision}
                onChange={() => setHighPrecision(!highPrecision)}
              />
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="glass-card p-8 flex flex-col items-center justify-center aspect-square relative lg:sticky lg:top-24">
              <div className="w-full h-full bg-white/90 rounded-2xl p-6 relative group overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/20 flex items-center justify-center">
                
                {/* Real Functional QR Code rendering */}
                <div ref={qrRef} className="flex justify-center items-center w-full aspect-square transition-all duration-500 scale-100"></div>

                {/* Overlay Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
              </div>
            </div>

            <button onClick={handleDownload} className="w-full bg-white text-black py-4 rounded-full font-medium text-[15px] hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Download className="w-5 h-5" />
              Download QR Code
            </button>
          </motion.div>
        </div>

        {/* Quick Tips Bento */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <FeatureCard 
            icon={Zap}
            title="Instant Sync"
            description="Generated direct text codes are synced across your connected devices instantly."
            borderColor="border-cyan-400"
            iconColor="text-cyan-400"
          />
          <FeatureCard 
            icon={LineChart}
            title="Live Tracking"
            description="Monitor scan metrics and geographic data in real-time with our dynamic codes."
            borderColor="border-purple-400"
            iconColor="text-purple-400"
          />
          <FeatureCard 
            icon={Shield}
            title="Secure Link"
            description="Enterprise-grade encryption ensures your destination texts remain safe and verified."
            borderColor="border-green-400"
            iconColor="text-green-400"
          />
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-10 py-12 w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-semibold text-2xl text-white">QRM</span>
            <p className="text-sm text-white/50">
              © 2024 QRM Generator. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors hover:underline">Terms</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors hover:underline">Privacy</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors hover:underline">API Documentation</a>
          </div>

          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors">
              <Globe className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ToggleSwitch({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <button 
      onClick={onChange}
      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
    >
      <span className="text-[14px] text-white/90 font-medium">{label}</span>
      <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${checked ? 'bg-cyan-400' : 'bg-white/10 border border-white/15'}`}>
        <motion.div 
          layout
          animate={{
            x: checked ? 20 : 2,
            backgroundColor: checked ? '#ffffff' : '#a0a0a0'
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full"
        />
      </div>
    </button>
  );
}

function FeatureCard({ icon: Icon, title, description, borderColor, iconColor }: { icon: any, title: string, description: string, borderColor: string, iconColor: string }) {
  return (
    <div className={`p-6 glass-card border-l-4 ${borderColor} hover:bg-white/5 transition-colors`}>
      <Icon className={`w-8 h-8 ${iconColor} mb-4`} />
      <h3 className="font-semibold text-2xl mb-2 text-white">{title}</h3>
      <p className="text-white/70 leading-relaxed text-[15px]">
        {description}
      </p>
    </div>
  );
}

// A simple QR-like icon component since lucide 'QrCode' might be too standard, 
// giving it that premium logo feel.
function QrIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}
