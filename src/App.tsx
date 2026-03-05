import { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, Trash2, 
  CreditCard, Lock, BarChart3, Package,
  Heart, RotateCw, ZoomIn, ZoomOut
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { SmokeEffect } from './components/SmokeEffect';
import './App.css';

// --- TYPES ---
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: {
    front: string;
    back: string;
  };
}

interface CartItem extends Product {
  quantity: number;
  size: string;
  color: string;
  type: 'tshirt' | 'hoodie';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

// --- BLANK PRODUCT TEMPLATES ---
const PRODUCTS: Product[] = [
  { id: 'product-1', name: 'Coming Soon', description: 'New design launching soon.', price: 0, stock: 0, images: { front: '/images/zeal-logo-new.png', back: '/images/zeal-logo-new.png' }},
  { id: 'product-2', name: 'Coming Soon', description: 'New design launching soon.', price: 0, stock: 0, images: { front: '/images/zeal-logo-new.png', back: '/images/zeal-logo-new.png' }},
  { id: 'product-3', name: 'Coming Soon', description: 'New design launching soon.', price: 0, stock: 0, images: { front: '/images/zeal-logo-new.png', back: '/images/zeal-logo-new.png' }},
  { id: 'product-4', name: 'Coming Soon', description: 'New design launching soon.', price: 0, stock: 0, images: { front: '/images/zeal-logo-new.png', back: '/images/zeal-logo-new.png' }},
];

// --- ENHANCED LUXURY SUMMONING SEAL ---
const SummoningSeal = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [text, setText] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const targetText = 'ZEAL';
  const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';

  // Generate ambient particles - SLOWER
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    setParticles(newParticles);
  }, []);

  // Animate particles - SLOWER
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + window.innerWidth) % window.innerWidth,
        y: (p.y + p.speedY + window.innerHeight) % window.innerHeight,
      })));
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Mouse tracking for parallax - SUBTLE
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // PHASE TIMING - SLOWER (total ~8 seconds)
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),    // Rings appear
      setTimeout(() => setPhase(2), 2000),   // Pentagram draws
      setTimeout(() => setPhase(3), 4000),   // Text starts decoding
      setTimeout(() => setPhase(4), 6500),   // Text complete, strong glow
      setTimeout(() => setPhase(5), 8000),   // Final phase
      setTimeout(() => {
        setOpacity(0);
        setTimeout(onComplete, 1200);
      }, 9500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Text decode effect - SLOWER
  useEffect(() => {
    if (phase < 3) return;
    let currentIndex = 0;
    const decodeInterval = setInterval(() => {
      if (currentIndex < targetText.length) {
        setText(() => {
          const decoded = targetText.slice(0, currentIndex + 1);
          const remaining = Array(targetText.length - currentIndex - 1)
            .fill(0)
            .map(() => runes[Math.floor(Math.random() * runes.length)])
            .join('');
          return decoded + remaining;
        });
        currentIndex++;
      } else {
        clearInterval(decodeInterval);
      }
    }, 300); // Slower decode
    return () => clearInterval(decodeInterval);
  }, [phase]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-1000"
      style={{ 
        opacity,
        background: 'radial-gradient(ellipse at center, #0a0908 0%, #010101 50%, #000000 100%)'
      }}
    >
      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 70%, black 100%)'
      }} />

      {/* Animated Particles - Dust motes */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: 'radial-gradient(circle, rgba(201,169,98,0.4) 0%, transparent 70%)',
              opacity: p.opacity,
              boxShadow: '0 0 8px rgba(201,169,98,0.3)',
            }}
          />
        ))}
      </div>

      {/* Parallax Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-transform duration-700"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        {/* Deep Outer Glow - Atmospheric */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full transition-all duration-2000"
          style={{ 
            background: 'radial-gradient(circle, rgba(201,169,98,0.08) 0%, rgba(139,115,85,0.03) 40%, transparent 70%)',
            opacity: phase >= 1 ? 1 : 0,
            animation: phase >= 1 ? 'breathe 6s ease-in-out infinite' : 'none'
          }}
        />

        {/* Main SVG Seal - DARKER, MORE PREMIUM */}
        <svg className="w-[500px] h-[500px] md:w-[600px] md:h-[600px]" viewBox="0 0 700 700" style={{ filter: 'drop-shadow(0 0 60px rgba(201,169,98,0.15))' }}>
          <defs>
            {/* Rich gold gradient */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B7355">
                <animate attributeName="stop-color" values="#8B7355;#C9A962;#8B7355" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="30%" stopColor="#C9A962" />
              <stop offset="50%" stopColor="#E8D5A3" />
              <stop offset="70%" stopColor="#C9A962" />
              <stop offset="100%" stopColor="#8B7355" />
            </linearGradient>
            
            {/* Subtle glow filter */}
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Strong glow for final phase */}
            <filter id="luxuryGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer Rotating Ring - SLOWER */}
          <g style={{ 
            animation: 'spin 40s linear infinite', 
            transformOrigin: '350px 350px',
            opacity: phase >= 1 ? 0.6 : 0,
            transition: 'opacity 2s ease'
          }}>
            <circle cx="350" cy="350" r="320" fill="none" stroke="url(#goldGrad)" strokeWidth="0.8" filter="url(#softGlow)" />
            <circle cx="350" cy="350" r="300" fill="none" stroke="#1a1815" strokeWidth="0.5" strokeDasharray="8 16" />
            
            {/* Rune symbols */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x = 350 + 310 * Math.cos(angle);
              const y = 350 + 310 * Math.sin(angle);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  fill="#3a3530"
                  fontSize="12"
                  fontFamily="Cinzel"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={phase >= 1 ? 0.4 : 0}
                  style={{ transition: 'opacity 2s ease', transitionDelay: `${i * 0.15}s` }}
                >
                  {runes[i]}
                </text>
              );
            })}
          </g>

          {/* Middle Counter-Rotating Ring - SLOWER */}
          <g style={{ 
            animation: 'spin-reverse 30s linear infinite', 
            transformOrigin: '350px 350px',
            opacity: phase >= 2 ? 0.5 : 0,
            transition: 'opacity 2s ease'
          }}>
            <circle cx="350" cy="350" r="250" fill="none" stroke="#1f1c18" strokeWidth="0.8" />
            <polygon 
              points="350,120 570,280 500,550 200,550 130,280" 
              fill="none" 
              stroke="#2a2520" 
              strokeWidth="0.6"
            />
          </g>

          {/* Inner Rotating Ring - SLOWER */}
          <g style={{ 
            animation: 'spin 25s linear infinite', 
            transformOrigin: '350px 350px',
            opacity: phase >= 2 ? 0.7 : 0,
            transition: 'opacity 2s ease'
          }}>
            <circle cx="350" cy="350" r="180" fill="none" stroke="url(#goldGrad)" strokeWidth="1.2" filter="url(#softGlow)" />
            <circle cx="350" cy="350" r="150" fill="none" stroke="#2a2520" strokeWidth="0.5" strokeDasharray="4 12" />
          </g>

          {/* Pentagram - Draws on slowly */}
          <g opacity={phase >= 2 ? 0.5 : 0} style={{ transition: 'opacity 2s ease' }}>
            <polygon 
              points="350,80 580,250 500,580 200,580 120,250" 
              fill="none" 
              stroke="url(#goldGrad)" 
              strokeWidth="1.5"
              filter="url(#softGlow)"
              style={{ 
                strokeDasharray: 2000,
                strokeDashoffset: phase >= 2 ? 0 : 2000,
                transition: 'stroke-dashoffset 3s ease-out'
              }}
            />
          </g>

          {/* Center circles */}
          <circle cx="350" cy="350" r="120" fill="none" stroke="url(#goldGrad)" strokeWidth="2" filter="url(#luxuryGlow)" opacity={phase >= 3 ? 1 : 0} style={{ transition: 'opacity 2s ease' }} />
          <circle cx="350" cy="350" r="90" fill="none" stroke="#2a2520" strokeWidth="0.5" strokeDasharray="6 12" opacity={phase >= 3 ? 0.4 : 0} style={{ transition: 'opacity 2s ease' }} />
          
          {/* Breathing pulse rings - SLOW */}
          {phase >= 3 && (
            <>
              <circle cx="350" cy="350" r="100" fill="none" stroke="#C9A962" strokeWidth="0.5" opacity="0.2">
                <animate attributeName="r" values="100;150;100" dur="5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="5s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </svg>
      </div>

      {/* Center Content - LUXURY STYLING */}
      <div className="relative z-10 text-center pointer-events-none">
        {/* Luxury Eye Symbol */}
        <div 
          className="mb-12 relative"
          style={{ 
            opacity: phase >= 3 ? 1 : 0, 
            transform: phase >= 3 ? 'scale(1)' : 'scale(0.7)',
            transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div 
            className="absolute inset-0 rounded-full transition-opacity duration-1000"
            style={{
              background: 'radial-gradient(circle, rgba(201,169,98,0.15) 0%, transparent 70%)',
              width: '150px',
              height: '150px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: phase >= 4 ? 1 : 0.5,
              animation: phase >= 4 ? 'breathe 4s ease-in-out infinite' : 'none'
            }}
          />
          <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto relative">
            <ellipse cx="50" cy="50" rx="42" ry="28" fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="42" ry="28" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" filter="url(#softGlow)" />
            <circle cx="50" cy="50" r="18" fill="#1a1815" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="url(#goldGrad)" strokeWidth="2" />
            <circle cx="50" cy="50" r="8" fill="#0a0908" />
            <circle cx="52" cy="48" r="2" fill="#E8D5A3" opacity="0.6" />
          </svg>
        </div>
        
        {/* Decoding Text - LUXURY TYPOGRAPHY */}
        <div className="relative">
          <h1 
            className="text-6xl md:text-8xl font-cinzel tracking-[0.6em] text-transparent bg-clip-text relative"
            style={{ 
              opacity: phase >= 3 ? 1 : 0,
              backgroundImage: 'linear-gradient(180deg, #E8D5A3 0%, #C9A962 30%, #8B7355 60%, #5a4a3a 100%)',
              textShadow: phase >= 4 ? '0 0 80px rgba(201,169,98,0.4), 0 0 160px rgba(201,169,98,0.2)' : '0 0 40px rgba(201,169,98,0.2)',
              transition: 'all 2s ease',
              letterSpacing: phase >= 4 ? '0.8em' : '0.6em',
            }}
          >
            {text || '\u00A0\u00A0\u00A0\u00A0'}
          </h1>
          
          {/* Subtitle appears after text */}
          <p 
            className="mt-8 text-xs uppercase tracking-[0.5em] font-montserrat"
            style={{
              opacity: phase >= 4 ? 0.5 : 0,
              color: '#8B7355',
              transition: 'opacity 2s ease 0.5s',
            }}
          >
            Western Occult Apparel
          </p>
        </div>
        
        {/* Minimal Phase Indicator */}
        <div 
          className="flex gap-6 justify-center mt-16"
          style={{ opacity: phase < 5 ? 0.3 : 0, transition: 'opacity 1s' }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-700"
              style={{
                backgroundColor: phase >= i ? '#C9A962' : '#2a2520',
                transform: phase === i ? 'scale(1.8)' : 'scale(1)',
                opacity: phase >= i ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Skip Button - Premium styling */}
      <button 
        onClick={onComplete}
        className="fixed bottom-10 right-10 text-zinc-700 text-[10px] font-montserrat uppercase tracking-[0.3em] hover:text-[#C9A962] transition-all duration-500 z-[101] group"
      >
        <span className="relative">
          Skip
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] group-hover:w-full transition-all duration-500" />
        </span>
      </button>

      {/* Corner Accents - Luxury minimal */}
      <div className="fixed top-10 left-10 w-8 h-px bg-gradient-to-r from-[#C9A962]/40 to-transparent" />
      <div className="fixed top-10 left-10 w-px h-8 bg-gradient-to-b from-[#C9A962]/40 to-transparent" />
      <div className="fixed top-10 right-10 w-8 h-px bg-gradient-to-l from-[#C9A962]/40 to-transparent" />
      <div className="fixed top-10 right-10 w-px h-8 bg-gradient-to-b from-[#C9A962]/40 to-transparent" />
      <div className="fixed bottom-10 left-10 w-8 h-px bg-gradient-to-r from-[#C9A962]/40 to-transparent" />
      <div className="fixed bottom-10 left-10 w-px h-8 bg-gradient-to-t from-[#C9A962]/40 to-transparent" />
      <div className="fixed bottom-10 right-10 w-8 h-px bg-gradient-to-l from-[#C9A962]/40 to-transparent" />
      <div className="fixed bottom-10 right-10 w-px h-8 bg-gradient-to-t from-[#C9A962]/40 to-transparent" />
    </div>
  );
};

// --- HERO SECTION - FIXED ---
const Hero = ({ onEnter }: { onEnter: () => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0f0e0d 0%, #050505 40%, #010101 100%)' }}
    >
      {/* Deep vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 60%, black 100%)'
        }}
      />

      {/* Animated Background Layers */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
      >
        <svg className="w-[120vh] h-[120vh]" viewBox="0 0 100 100" style={{ animation: 'spin 180s linear infinite' }}>
          <circle cx="50" cy="50" r="48" fill="none" stroke="#8B7355" strokeWidth="0.3" strokeDasharray="2 8" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#5a4a3a" strokeWidth="0.2" />
        </svg>
      </div>

      <div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none"
        style={{ transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)` }}
      >
        <svg className="w-[80vh] h-[80vh]" viewBox="0 0 100 100" style={{ animation: 'spin-reverse 120s linear infinite' }}>
          <polygon points="50,10 90,90 10,90" fill="none" stroke="#8B7355" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Floating dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C9A962]"
            style={{
              left: `${10 + (i * 5) % 80}%`,
              top: `${10 + (i * 7) % 80}%`,
              opacity: 0.15,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div 
        className="z-10 text-center flex flex-col items-center"
        style={{ 
          transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 2s ease'
        }}
      >
        {/* Subtle glow */}
        <div 
          className="absolute w-[400px] h-[150px] rounded-full pointer-events-none transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(ellipse, rgba(201,169,98,0.08) 0%, transparent 70%)',
            opacity: isLoaded ? 1 : 0,
          }}
        />
        
        <h1 
          className="text-6xl md:text-8xl font-cinzel font-normal tracking-[0.4em] text-transparent bg-clip-text mb-8"
          style={{
            backgroundImage: 'linear-gradient(180deg, #E8D5A3 0%, #C9A962 40%, #8B7355 100%)',
            textShadow: '0 0 60px rgba(201,169,98,0.2)',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1.5s ease 0.3s',
          }}
        >
          ZEAL
        </h1>
        
        {/* Banner */}
        <div 
          className="relative mb-12 px-10 py-4 border border-[#C9A962]/20 bg-black/20"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1.5s ease 0.6s',
          }}
        >
          <p className="text-[#8B7355] font-cinzel tracking-[0.4em] text-[10px] uppercase">
            As Above • So Below
          </p>
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-2 h-px bg-[#C9A962]/40" />
          <div className="absolute top-0 left-0 w-px h-2 bg-[#C9A962]/40" />
          <div className="absolute top-0 right-0 w-2 h-px bg-[#C9A962]/40" />
          <div className="absolute top-0 right-0 w-px h-2 bg-[#C9A962]/40" />
          <div className="absolute bottom-0 left-0 w-2 h-px bg-[#C9A962]/40" />
          <div className="absolute bottom-0 left-0 w-px h-2 bg-[#C9A962]/40" />
          <div className="absolute bottom-0 right-0 w-2 h-px bg-[#C9A962]/40" />
          <div className="absolute bottom-0 right-0 w-px h-2 bg-[#C9A962]/40" />
        </div>
        
        <p 
          className="text-zinc-700 font-montserrat tracking-[0.3em] text-[10px] uppercase mb-16"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 1.5s ease 0.9s',
          }}
        >
          Western Occult Apparel
        </p>
        
        <button 
          onClick={onEnter}
          className="group relative px-12 py-4 border border-[#C9A962]/30 text-[#C9A962]/80 font-cinzel text-xs tracking-[0.3em] uppercase overflow-hidden transition-all duration-700 hover:border-[#C9A962]/60 hover:text-[#C9A962]"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.5s ease 1.2s, transform 1.5s ease 1.2s, border-color 0.5s, color 0.5s',
          }}
        >
          <span className="relative z-10">Enter The Covenant</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A962]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-12 flex flex-col items-center gap-3"
        style={{
          opacity: isLoaded ? 0.3 : 0,
          transition: 'opacity 1.5s ease 1.5s',
        }}
      >
        <span className="text-zinc-700 text-[9px] uppercase tracking-[0.3em] font-montserrat">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-[#C9A962]/50 to-transparent" />
      </div>
    </section>
  );
};

// --- PRODUCT CARD ---
const ProductCard = ({ product, onAddToCart, onOpenDressingRoom }: { product: Product; onAddToCart: (item: CartItem) => void; onOpenDressingRoom: (product: Product) => void; }) => {
  const [selectedType, setSelectedType] = useState<'tshirt' | 'hoodie'>('tshirt');
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    if (product.price === 0) return;
    onAddToCart({ ...product, quantity: 1, size: selectedSize, color: selectedColor, type: selectedType });
  };

  return (
    <div 
      className="group relative bg-[#0a0a0a] border border-zinc-800/50 transition-all duration-700 hover:border-[#C9A962]/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900/30">
        <img 
          src={product.images.back}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-105 opacity-60' : 'scale-100 opacity-40'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-90' : 'opacity-60'}`} />
        
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => onOpenDressingRoom(product)}
              className="px-6 py-3 bg-[#C9A962] text-black text-xs uppercase tracking-wider font-montserrat hover:bg-[#E8D5A3] transition-all duration-300"
            >
              Try On
            </button>
            {product.price > 0 && (
              <button 
                onClick={handleAdd}
                className="px-6 py-3 bg-transparent border border-[#C9A962] text-[#C9A962] text-xs uppercase tracking-wider font-montserrat hover:bg-[#C9A962] hover:text-black transition-all duration-300"
              >
                Quick Add
              </button>
            )}
          </div>
        </div>

        {/* Corner decorations */}
        <div className={`absolute top-4 left-4 w-6 h-6 border-l border-t border-[#C9A962]/0 transition-all duration-500 ${isHovered ? 'border-[#C9A962]/40' : ''}`} />
        <div className={`absolute top-4 right-4 w-6 h-6 border-r border-t border-[#C9A962]/0 transition-all duration-500 ${isHovered ? 'border-[#C9A962]/40' : ''}`} />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-zinc-500 font-cinzel text-sm group-hover:text-[#C9A962] transition-colors duration-300">{product.name}</h3>
          <p className="text-[#8B7355] font-cinzel text-lg">{product.price === 0 ? 'TBA' : `R${product.price}`}</p>
        </div>

        <div className="flex gap-2 mb-3">
          {(['tshirt', 'hoodie'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-[9px] uppercase tracking-wider transition-all duration-300 ${
                selectedType === type 
                  ? 'bg-[#C9A962]/20 text-[#C9A962] border border-[#C9A962]/40' 
                  : 'bg-zinc-900/50 text-zinc-600 hover:text-zinc-400 border border-transparent'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          {['black', 'white', 'charcoal'].map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-sm transition-all duration-300 ${
                selectedColor === color ? 'ring-1 ring-[#C9A962] ring-offset-2 ring-offset-[#0a0a0a]' : ''
              }`}
              style={{ 
                backgroundColor: color === 'charcoal' ? '#2a2a2a' : color,
                border: color === 'white' ? '1px solid #333' : 'none'
              }}
            />
          ))}
        </div>

        <div className="flex gap-2 mb-5">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-8 h-8 text-[11px] transition-all duration-300 ${
                selectedSize === size
                  ? 'bg-[#C9A962]/20 text-[#C9A962] border border-[#C9A962]/40'
                  : 'bg-zinc-900/50 text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          disabled={product.price === 0}
          className="w-full py-3.5 bg-zinc-900/50 text-zinc-600 text-xs uppercase tracking-wider hover:bg-[#C9A962]/10 hover:text-[#C9A962] hover:border-[#C9A962]/30 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border border-transparent"
        >
          {product.price === 0 ? 'Coming Soon' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// --- VIRTUAL DRESSING ROOM ---
const VirtualDressingRoom = ({ isOpen, onClose, initialProduct, onAddToCart }: { isOpen: boolean; onClose: () => void; initialProduct?: Product; onAddToCart: (item: CartItem) => void; }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialProduct || null);
  const [selectedType, setSelectedType] = useState<'tshirt' | 'hoodie'>('tshirt');
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [view, setView] = useState<'front' | 'back'>('back');
  const [zoom, setZoom] = useState(1);

  useEffect(() => { if (initialProduct) setSelectedProduct(initialProduct); }, [initialProduct]);
  if (!isOpen || !selectedProduct) return null;

  const handleAdd = () => {
    if (selectedProduct.price === 0) return;
    onAddToCart({ ...selectedProduct, quantity: 1, size: selectedSize, color: selectedColor, type: selectedType });
  };

  return (
    <div className="fixed inset-0 z-[90] flex animate-fadeIn" style={{ background: 'rgba(1,1,1,0.97)' }}>
      <button onClick={onClose} className="absolute top-6 right-6 text-zinc-600 hover:text-zinc-400 z-50 transition-colors hover:rotate-90 duration-300">
        <X className="w-7 h-7" />
      </button>

      {/* Left Panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#C9A962]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}>
          <img 
            src={view === 'back' ? selectedProduct.images.back : selectedProduct.images.front}
            alt={selectedProduct.name}
            className="max-h-[65vh] max-w-full object-contain opacity-50"
          />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-zinc-900/50 backdrop-blur-md px-6 py-3 border border-zinc-800/50">
          <button onClick={() => setView(v => v === 'front' ? 'back' : 'front')} className="text-zinc-500 hover:text-[#C9A962] transition-colors">
            <RotateCw className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-zinc-800" />
          <button onClick={() => setZoom(z => Math.max(0.7, z - 0.1))} className="text-zinc-500 hover:text-[#C9A962] transition-colors">
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-zinc-600 text-sm font-montserrat w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(1.3, z + 0.1))} className="text-zinc-500 hover:text-[#C9A962] transition-colors">
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[400px] bg-[#0a0a0a] border-l border-zinc-800/50 p-8 overflow-y-auto">
        <h2 className="text-2xl font-cinzel text-zinc-400 mb-1">{selectedProduct.name}</h2>
        <p className="text-zinc-700 font-montserrat text-sm mb-10">{selectedProduct.description}</p>

        <div className="mb-6">
          <label className="text-zinc-700 text-xs uppercase tracking-wider mb-3 block">Type</label>
          <div className="flex gap-3">
            {(['tshirt', 'hoodie'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex-1 py-3 text-xs uppercase tracking-wider transition-all duration-300 border ${
                  selectedType === type 
                    ? 'bg-[#C9A962]/10 text-[#C9A962] border-[#C9A962]/40' 
                    : 'bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-zinc-700 text-xs uppercase tracking-wider mb-3 block">Color</label>
          <div className="flex gap-3">
            {['black', 'white', 'charcoal'].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-sm transition-all duration-300 ${
                  selectedColor === color ? 'ring-1 ring-[#C9A962] ring-offset-4 ring-offset-[#0a0a0a]' : ''
                }`}
                style={{ 
                  backgroundColor: color === 'charcoal' ? '#2a2a2a' : color,
                  border: color === 'white' ? '1px solid #333' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="text-zinc-700 text-xs uppercase tracking-wider mb-3 block">Size</label>
          <div className="flex gap-3">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-11 h-11 text-sm transition-all duration-300 border ${
                  selectedSize === size
                    ? 'bg-[#C9A962]/10 text-[#C9A962] border-[#C9A962]/40'
                    : 'bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={selectedProduct.price === 0}
          className="w-full py-4 bg-[#C9A962]/10 text-[#C9A962] border border-[#C9A962]/40 font-cinzel uppercase tracking-wider hover:bg-[#C9A962]/20 transition-all duration-300 mb-6 disabled:opacity-30"
        >
          {selectedProduct.price === 0 ? 'Coming Soon' : 'Add to Cart'}
        </button>

        <div className="mt-8 pt-8 border-t border-zinc-800/50">
          <label className="text-zinc-700 text-xs uppercase tracking-wider mb-4 block">Browse</label>
          <div className="grid grid-cols-4 gap-3">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`relative aspect-square overflow-hidden transition-all duration-300 border ${
                  selectedProduct.id === p.id ? 'border-[#C9A962]/60' : 'border-zinc-800 opacity-50 hover:opacity-80'
                }`}
              >
                <img src={p.images.back} alt={p.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VIRTUAL CLOSET ---
const VirtualCloset = ({ isOpen, onClose, onOpenDressingRoom }: { isOpen: boolean; onClose: () => void; onOpenDressingRoom: (product: Product) => void; }) => {
  const [favorites, setFavorites] = useState<string[]>(() => { const saved = localStorage.getItem('zeal-favorites'); return saved ? JSON.parse(saved) : []; });

  useEffect(() => { localStorage.setItem('zeal-favorites', JSON.stringify(favorites)); }, [favorites]);
  const toggleFavorite = (id: string) => { setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col animate-fadeIn" style={{ background: 'rgba(1,1,1,0.97)' }}>
      <div className="flex items-center justify-between p-8 border-b border-zinc-800/50">
        <h2 className="text-2xl font-cinzel text-zinc-400">Virtual Closet</h2>
        <button onClick={onClose} className="text-zinc-600 hover:text-zinc-400 transition-colors hover:rotate-90 duration-300">
          <X className="w-7 h-7" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-zinc-900/30 border border-zinc-800/50 hover:border-[#C9A962]/30 transition-all duration-500 cursor-pointer"
              onClick={() => onOpenDressingRoom(product)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={product.images.back} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" 
                />
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                className={`absolute top-3 right-3 p-2 transition-all duration-300 ${
                  favorites.includes(product.id) ? 'text-[#C9A962]' : 'text-zinc-700 hover:text-[#C9A962]'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- CART ---
const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: { isOpen: boolean; onClose: () => void; items: CartItem[]; onUpdateQuantity: (id: string, qty: number) => void; onRemove: (id: string) => void; }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-zinc-800/50 p-8 overflow-y-auto animate-slideInRight">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-cinzel text-zinc-400 tracking-wider">Your Cart</h2>
          <button onClick={onClose} className="text-zinc-600 hover:text-zinc-400 transition-colors hover:rotate-90 duration-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 text-zinc-700">
            <ShoppingBag className="w-14 h-14 mx-auto mb-6 opacity-20" />
            <p className="font-montserrat text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-10">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}-${item.type}`} className="flex gap-4 p-4 bg-zinc-900/30 border border-zinc-800/50">
                  <div className="w-20 h-20 bg-zinc-900 flex items-center justify-center">
                    <img src={item.images.back} alt="" className="w-16 h-16 object-cover opacity-40" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-cinzel text-zinc-500 text-sm">{item.name}</h4>
                    <p className="text-zinc-700 text-xs font-montserrat mb-1">{item.color} / {item.size}</p>
                    <p className="text-[#8B7355] font-cinzel">R{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => onRemove(`${item.id}-${item.size}-${item.color}-${item.type}`)} className="text-zinc-700 hover:text-red-900 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQuantity(`${item.id}-${item.size}-${item.color}-${item.type}`, Math.max(0, item.quantity - 1))}>
                        <Minus className="w-4 h-4 text-zinc-600" />
                      </button>
                      <span className="text-zinc-500 text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(`${item.id}-${item.size}-${item.color}-${item.type}`, item.quantity + 1)}>
                        <Plus className="w-4 h-4 text-zinc-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800/50 pt-8">
              <div className="flex justify-between mb-6">
                <span className="text-zinc-700 font-montserrat text-sm">Subtotal</span>
                <span className="text-zinc-400 font-cinzel text-xl">R{total}</span>
              </div>
              <button className="w-full py-4 bg-[#C9A962]/10 text-[#C9A962] border border-[#C9A962]/40 font-cinzel text-sm tracking-wider uppercase hover:bg-[#C9A962]/20 transition-all duration-300">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- ADMIN PANEL ---
const AdminPanel = ({ onClose }: { onClose: () => void; cartItems?: CartItem[] }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === '66696') { setIsAuthenticated(true); setError(''); }
    else { setError('Invalid password'); }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn" style={{ background: 'rgba(1,1,1,0.98)' }}>
        <div className="bg-[#0a0a0a] border border-zinc-800/50 p-10 max-w-md w-full">
          <div className="text-center mb-10">
            <Lock className="w-10 h-10 text-[#8B7355] mx-auto mb-6" />
            <h2 className="text-2xl font-cinzel text-zinc-400 mb-2">Sanctum Access</h2>
            <p className="text-zinc-700 text-sm">Enter the sacred password</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Password"
            className="w-full bg-zinc-900/50 border border-zinc-800 p-4 text-zinc-400 font-montserrat mb-4 focus:border-[#C9A962]/40 outline-none transition-colors"
          />
          {error && <p className="text-red-900 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-[#C9A962]/10 text-[#C9A962] border border-[#C9A962]/40 font-cinzel uppercase tracking-wider hover:bg-[#C9A962]/20 transition-all duration-300"
          >
            Enter
          </button>
          <button onClick={onClose} className="w-full py-4 mt-3 text-zinc-700 font-montserrat text-sm hover:text-zinc-500 transition-colors">
            Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto animate-fadeIn" style={{ background: 'rgba(1,1,1,0.98)' }}>
      <div className="max-w-6xl mx-auto p-8 md:p-12">
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800/50 pb-6">
          <h2 className="text-2xl font-cinzel text-zinc-400 tracking-wider">The Inner Sanctum</h2>
          <button onClick={onClose} className="text-zinc-700 hover:text-zinc-500 transition-colors hover:rotate-90 duration-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue', value: 'R0', icon: CreditCard },
            { label: 'Orders', value: '0', icon: Package },
            { label: 'Products', value: PRODUCTS.length.toString(), icon: BarChart3 },
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900/30 p-8 border border-zinc-800/50">
              <stat.icon className="w-5 h-5 text-[#8B7355] mb-6" />
              <p className="text-2xl font-cinzel text-zinc-400">{stat.value}</p>
              <p className="text-zinc-700 text-sm font-montserrat mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SHOP SECTION ---
const ShopSection = ({ onAddToCart, onOpenDressingRoom }: { onAddToCart: (item: CartItem) => void; onOpenDressingRoom: (product: Product) => void; }) => (
  <section id="shop" className="py-32 px-6 lg:px-24" style={{ background: '#010101' }}>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <p className="text-[#8B7355] font-cinzel tracking-[0.4em] text-[10px] mb-4">THE COLLECTION</p>
        <h2 className="text-3xl md:text-5xl font-cinzel text-zinc-400 mb-6">Coming Soon</h2>
        <p className="text-zinc-700 max-w-xl mx-auto font-montserrat text-sm">New designs launching soon. Join the covenant to be first to know.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onOpenDressingRoom={onOpenDressingRoom} />
        ))}
      </div>
    </div>
  </section>
);

// --- MAIN APP - FIXED STATE HANDLING ---
function App() {
  const [appState, setAppState] = useState<'loading' | 'intro' | 'ready'>('loading');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDressingRoomOpen, setIsDressingRoomOpen] = useState(false);
  const [isClosetOpen, setIsClosetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => { 
      setScrollProgress((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = useCallback((item: CartItem) => {
    const itemKey = `${item.id}-${item.size}-${item.color}-${item.type}`;
    setCart((prev: CartItem[]) => {
      const existing = prev.find((i: CartItem) => `${i.id}-${i.size}-${i.color}-${i.type}` === itemKey);
      if (existing) return prev.map((i: CartItem) => `${i.id}-${i.size}-${i.color}-${i.type}` === itemKey ? { ...i, quantity: i.quantity + item.quantity } : i);
      return [...prev, item];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((itemKey: string, quantity: number) => {
    if (quantity === 0) setCart((prev: CartItem[]) => prev.filter((i: CartItem) => `${i.id}-${i.size}-${i.color}-${i.type}` !== itemKey));
    else setCart((prev: CartItem[]) => prev.map((i: CartItem) => `${i.id}-${i.size}-${i.color}-${i.type}` === itemKey ? { ...i, quantity } : i));
  }, []);

  const handleRemove = useCallback((itemKey: string) => setCart((prev: CartItem[]) => prev.filter((i: CartItem) => `${i.id}-${i.size}-${i.color}-${i.type}` !== itemKey)), []);
  const handleOpenDressingRoom = useCallback((product: Product) => { setSelectedProduct(product); setIsDressingRoomOpen(true); }, []);

  // RENDER STATES
  if (appState === 'loading') {
    return (
      <>
        <SummoningSeal onComplete={() => setAppState('intro')} />
        <SmokeEffect />
      </>
    );
  }

  if (appState === 'intro') {
    return (
      <>
        <Hero onEnter={() => setAppState('ready')} />
        <SmokeEffect />
      </>
    );
  }

  // READY STATE - Main Shop
  return (
    <div className="min-h-screen text-gray-300 font-montserrat" style={{ background: '#010101' }}>
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenDressingRoom={() => setIsDressingRoomOpen(true)} 
        onOpenCloset={() => setIsClosetOpen(true)} 
        scrollProgress={scrollProgress} 
      />
      <main>
        <ShopSection onAddToCart={handleAddToCart} onOpenDressingRoom={handleOpenDressingRoom} />
        <section id="about" className="py-32 px-6 lg:px-24" style={{ background: '#050505' }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#8B7355] font-cinzel tracking-[0.4em] text-[10px] mb-6">THE PHILOSOPHY</p>
            <h2 className="text-2xl md:text-4xl font-cinzel text-zinc-400 mb-8">More Than Apparel</h2>
            <p className="text-zinc-700 font-montserrat leading-relaxed text-sm">ZEAL represents the intersection of occult symbolism and premium streetwear. Each piece is a statement of intent, a wearable philosophy.</p>
          </div>
        </section>
        <footer className="py-20 px-6 border-t border-zinc-900/50" style={{ background: '#010101' }}>
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <h3 className="text-2xl font-cinzel text-zinc-700 tracking-[0.4em] mb-4">ZEAL</h3>
            <p className="text-zinc-900 text-[10px] tracking-[0.3em]">© 2026 ZEAL • AS ABOVE SO BELOW</p>
          </div>
        </footer>
      </main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemove} />
      <VirtualDressingRoom isOpen={isDressingRoomOpen} onClose={() => setIsDressingRoomOpen(false)} initialProduct={selectedProduct} onAddToCart={handleAddToCart} />
      <VirtualCloset isOpen={isClosetOpen} onClose={() => setIsClosetOpen(false)} onOpenDressingRoom={handleOpenDressingRoom} />
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
      <SmokeEffect />
    </div>
  );
}

export default App;
