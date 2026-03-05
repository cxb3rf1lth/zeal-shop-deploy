import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShoppingBag, X, Plus, Minus, Trash2, 
  CreditCard, Lock, BarChart3, Package,
  Heart, RotateCw, ZoomIn, ZoomOut
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

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

// --- ENHANCED SUMMONING SEAL WITH PARTICLES ---
const SummoningSeal = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [text, setText] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const targetText = 'ZEAL';
  const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';

  // Generate particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setParticles(newParticles);
  }, []);

  // Animate particles
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

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

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
        setTimeout(() => setPhase(4), 600);
        setTimeout(() => setPhase(5), 1800);
        setTimeout(() => onComplete(), 2800);
      }
    }, 150);
    return () => clearInterval(decodeInterval);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#010101] overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#C9A962]"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              boxShadow: '0 0 10px rgba(201,169,98,0.5)',
              transition: 'opacity 0.3s',
            }}
          />
        ))}
      </div>

      {/* Parallax Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        {/* Outer Glow */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full transition-opacity duration-1000"
          style={{ 
            background: 'radial-gradient(circle, rgba(201,169,98,0.1) 0%, transparent 70%)',
            opacity: phase >= 1 ? 1 : 0,
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />

        {/* Main SVG Seal */}
        <svg className="w-[500px] h-[500px] md:w-[650px] md:h-[650px]" viewBox="0 0 700 700">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A962">
                <animate attributeName="stop-color" values="#C9A962;#E8D5A3;#C9A962" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#E8D5A3" />
              <stop offset="100%" stopColor="#8B7355" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer Rotating Ring with Runes */}
          <g style={{ 
            animation: 'spin 30s linear infinite', 
            transformOrigin: '350px 350px',
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 1s ease'
          }}>
            <circle cx="350" cy="350" r="320" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" filter="url(#glow)" />
            <circle cx="350" cy="350" r="300" fill="none" stroke="#2a2a2a" strokeWidth="0.5" strokeDasharray="10 20" opacity="0.6" />
            
            {/* Rune symbols on outer ring */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x = 350 + 310 * Math.cos(angle);
              const y = 350 + 310 * Math.sin(angle);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  fill="#C9A962"
                  fontSize="14"
                  fontFamily="Cinzel"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  opacity={phase >= 1 ? 0.6 : 0}
                  style={{ transition: 'opacity 1s ease', transitionDelay: `${i * 0.1}s` }}
                >
                  {runes[i]}
                </text>
              );
            })}
          </g>

          {/* Middle Counter-Rotating Ring */}
          <g style={{ 
            animation: 'spin-reverse 20s linear infinite', 
            transformOrigin: '350px 350px',
            opacity: phase >= 2 ? 0.8 : 0,
            transition: 'opacity 1s ease'
          }}>
            <circle cx="350" cy="350" r="250" fill="none" stroke="#3a3a3a" strokeWidth="1" />
            <polygon 
              points="350,120 570,280 500,550 200,550 130,280" 
              fill="none" 
              stroke="url(#goldGrad)" 
              strokeWidth="1"
              opacity="0.5"
            />
          </g>

          {/* Inner Rotating Ring */}
          <g style={{ 
            animation: 'spin 15s linear infinite', 
            transformOrigin: '350px 350px',
            opacity: phase >= 2 ? 1 : 0,
            transition: 'opacity 1s ease'
          }}>
            <circle cx="350" cy="350" r="180" fill="none" stroke="url(#goldGrad)" strokeWidth="2" filter="url(#glow)" />
            <circle cx="350" cy="350" r="150" fill="none" stroke="#C9A962" strokeWidth="0.5" strokeDasharray="5 15" />
          </g>

          {/* Pentagram with animation */}
          <g opacity={phase >= 2 ? 0.6 : 0} style={{ transition: 'opacity 1s ease' }}>
            <polygon 
              points="350,80 580,250 500,580 200,580 120,250" 
              fill="none" 
              stroke="url(#goldGrad)" 
              strokeWidth="2.5"
              filter="url(#strongGlow)"
              style={{ 
                strokeDasharray: 2000,
                strokeDashoffset: phase >= 2 ? 0 : 2000,
                transition: 'stroke-dashoffset 2s ease'
              }}
            />
          </g>

          {/* Center circles */}
          <circle cx="350" cy="350" r="120" fill="none" stroke="url(#goldGrad)" strokeWidth="3" filter="url(#strongGlow)" opacity={phase >= 3 ? 1 : 0} style={{ transition: 'opacity 1s ease' }} />
          <circle cx="350" cy="350" r="90" fill="none" stroke="#C9A962" strokeWidth="1" strokeDasharray="10 10" opacity={phase >= 3 ? 0.5 : 0} style={{ transition: 'opacity 1s ease' }} />
          
          {/* Animated pulse rings */}
          {phase >= 3 && (
            <>
              <circle cx="350" cy="350" r="100" fill="none" stroke="#C9A962" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="100;140;100" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="350" cy="350" r="80" fill="none" stroke="#C9A962" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="80;110;80" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </svg>
      </div>

      {/* Center Content with Glow */}
      <div className="relative z-10 text-center pointer-events-none">
        {/* Eye Symbol with glow */}
        <div 
          className="mb-8 relative"
          style={{ 
            opacity: phase >= 3 ? 1 : 0, 
            transform: phase >= 3 ? 'scale(1)' : 'scale(0.5)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="absolute inset-0 bg-[#C9A962]/20 blur-3xl rounded-full" />
          <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto relative">
            <ellipse cx="50" cy="50" rx="45" ry="32" fill="none" stroke="#C9A962" strokeWidth="2.5" filter="url(#glow)" />
            <circle cx="50" cy="50" r="22" fill="#C9A962" opacity="0.9">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="10" fill="#010101" />
            <circle cx="54" cy="46" r="3" fill="#E8D5A3" opacity="0.8" />
          </svg>
        </div>
        
        {/* Decoding Text with shimmer */}
        <h1 
          className="text-7xl md:text-9xl font-cinzel tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-b from-[#E8D5A3] via-[#C9A962] to-[#8B7355] relative"
          style={{ 
            opacity: phase >= 3 ? 1 : 0,
            textShadow: phase >= 4 ? '0 0 60px rgba(201,169,98,0.6), 0 0 120px rgba(201,169,98,0.3)' : 'none',
            transition: 'all 1s ease'
          }}
        >
          {text || '\u00A0\u00A0\u00A0\u00A0'}
          {phase >= 4 && (
            <span 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ 
                animation: 'shimmer 2s infinite',
                WebkitBackgroundClip: 'text'
              }}
            />
          )}
        </h1>
        
        {/* Animated Phase Indicators */}
        <div className="flex gap-4 justify-center mt-16">
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="relative"
            >
              <div 
                className="w-3 h-3 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: phase >= i ? '#C9A962' : '#333',
                  transform: phase === i ? 'scale(1.5)' : 'scale(1)',
                  boxShadow: phase >= i ? '0 0 15px rgba(201,169,98,0.8)' : 'none',
                }}
              />
              {phase === i && (
                <div 
                  className="absolute inset-0 rounded-full bg-[#C9A962]"
                  style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Loading text */}
        <p 
          className="mt-8 text-zinc-600 text-xs uppercase tracking-[0.4em] font-montserrat"
          style={{ 
            opacity: phase < 5 ? 1 : 0,
            transition: 'opacity 0.5s'
          }}
        >
          Summoning...
        </p>
      </div>

      {/* Skip Button with hover effect */}
      <button 
        onClick={onComplete}
        className="fixed bottom-8 right-8 text-zinc-600 text-[10px] font-montserrat uppercase tracking-widest hover:text-[#C9A962] transition-all duration-300 z-[101] group"
      >
        <span className="relative">
          Skip Intro
          <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A962] group-hover:w-full transition-all duration-300" />
        </span>
      </button>

      {/* Corner Decorations */}
      <div className="fixed top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#C9A962]/30 opacity-50" />
      <div className="fixed top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#C9A962]/30 opacity-50" />
      <div className="fixed bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#C9A962]/30 opacity-50" />
      <div className="fixed bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#C9A962]/30 opacity-50" />
    </div>
  );
};

// --- ENHANCED HERO WITH ANIMATIONS ---
const Hero = ({ onEnter }: { onEnter: () => void }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#010101]">
      {/* Animated Background Layers */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
      >
        <svg className="w-[100vh] h-[100vh]" viewBox="0 0 100 100" style={{ animation: 'spin 120s linear infinite' }}>
          <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeWidth="0.2" />
          <polygon points="50,10 90,90 10,90" fill="none" stroke="white" strokeWidth="0.2" />
          <polygon points="50,90 10,10 90,10" fill="none" stroke="white" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Second rotating layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none"
        style={{ transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)` }}
      >
        <svg className="w-[80vh] h-[80vh]" viewBox="0 0 100 100" style={{ animation: 'spin-reverse 80s linear infinite' }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="5 10" />
          <polygon points="50,20 80,80 20,80" fill="none" stroke="white" strokeWidth="0.15" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#C9A962] rounded-full"
            style={{
              left: `${10 + (i * 4) % 80}%`,
              top: `${10 + (i * 7) % 80}%`,
              opacity: 0.3 + (i % 3) * 0.2,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Main Content with Parallax */}
      <div 
        className="z-10 text-center flex flex-col items-center"
        style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
      >
        {/* Glow behind title */}
        <div className="absolute w-[500px] h-[200px] bg-[#C9A962]/10 blur-[100px] rounded-full" />
        
        <h1 
          className="text-7xl md:text-9xl font-cinzel font-normal tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-[#E8D5A3] via-[#C9A962] to-[#8B7355] mb-6 relative"
          style={{ 
            textShadow: '0 0 80px rgba(201,169,98,0.3)',
            animation: 'titleGlow 4s ease-in-out infinite'
          }}
        >
          ZEAL
        </h1>
        
        {/* Animated Banner */}
        <div className="relative mb-12 overflow-hidden">
          <div 
            className="px-10 py-4 border border-[#C9A962]/40 bg-black/40 backdrop-blur-sm"
            style={{ animation: 'borderPulse 3s ease-in-out infinite' }}
          >
            <p className="text-[#C9A962] font-cinzel tracking-[0.5em] text-xs uppercase flex items-center gap-4">
              <span style={{ animation: 'twinkle 2s ease-in-out infinite' }}>✦</span>
              <span>As Above</span>
              <span style={{ animation: 'twinkle 2s ease-in-out infinite 0.5s' }}>✦</span>
              <span>So Below</span>
              <span style={{ animation: 'twinkle 2s ease-in-out infinite 1s' }}>✦</span>
            </p>
          </div>
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#C9A962]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-[#C9A962]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-[#C9A962]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#C9A962]" />
        </div>
        
        <p className="text-zinc-600 font-montserrat tracking-[0.4em] text-xs uppercase mb-12">
          Western Occult Apparel
        </p>
        
        <button 
          onClick={onEnter}
          className="group relative px-14 py-5 border border-[#C9A962]/60 text-[#C9A962] font-cinzel text-sm tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 hover:border-[#C9A962] hover:shadow-[0_0_40px_rgba(201,169,98,0.4)]"
          style={{ 
            background: 'linear-gradient(135deg, transparent 0%, rgba(201,169,98,0.05) 50%, transparent 100%)',
            backgroundSize: '200% 200%',
          }}
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">Enter The Covenant</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9A962]/0 via-[#C9A962]/20 to-[#C9A962]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="absolute inset-0 bg-[#C9A962] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ opacity: 0.1 }} />
        </button>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-3">
        <span className="text-zinc-700 text-[9px] uppercase tracking-[0.4em] font-montserrat">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C9A962] to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#C9A962] animate-scrollLine" />
        </div>
      </div>
    </section>
  );
};

// --- ENHANCED PRODUCT CARD WITH HOVER EFFECTS ---
const ProductCard = ({ product, onAddToCart, onOpenDressingRoom }: { product: Product; onAddToCart: (item: CartItem) => void; onOpenDressingRoom: (product: Product) => void; }) => {
  const [selectedType, setSelectedType] = useState<'tshirt' | 'hoodie'>('tshirt');
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAdd = () => {
    if (product.price === 0) return;
    onAddToCart({ ...product, quantity: 1, size: selectedSize, color: selectedColor, type: selectedType });
  };

  return (
    <div 
      className="group relative bg-[#0a0a0a] border border-zinc-800 transition-all duration-500 hover:border-[#C9A962]/50 hover:shadow-[0_0_30px_rgba(201,169,98,0.15)] hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with effects */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Loading skeleton */}
        {!imageLoaded && <div className="absolute inset-0 bg-zinc-900 animate-pulse" />}
        
        <img 
          src={product.images.back}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'} ${imageLoaded ? 'opacity-50' : 'opacity-0'}`}
        />
        
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-80' : 'opacity-40'}`} />
        
        {/* Hover overlay with buttons */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col gap-3 transform transition-transform duration-500" style={{ transform: isHovered ? 'translateY(0)' : 'translateY(20px)' }}>
            <button 
              onClick={() => onOpenDressingRoom(product)}
              className="px-6 py-3 bg-[#C9A962] text-black text-xs uppercase tracking-wider font-montserrat hover:bg-[#E8D5A3] transition-all duration-300 hover:scale-105 shadow-lg"
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
        <div className={`absolute top-3 left-3 w-6 h-6 border-l border-t border-[#C9A962]/0 transition-all duration-500 ${isHovered ? 'border-[#C9A962]/60' : ''}`} />
        <div className={`absolute top-3 right-3 w-6 h-6 border-r border-t border-[#C9A962]/0 transition-all duration-500 ${isHovered ? 'border-[#C9A962]/60' : ''}`} />
        <div className={`absolute bottom-3 left-3 w-6 h-6 border-l border-b border-[#C9A962]/0 transition-all duration-500 ${isHovered ? 'border-[#C9A962]/60' : ''}`} />
        <div className={`absolute bottom-3 right-3 w-6 h-6 border-r border-b border-[#C9A962]/0 transition-all duration-500 ${isHovered ? 'border-[#C9A962]/60' : ''}`} />
      </div>

      {/* Info Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-zinc-400 font-cinzel text-sm group-hover:text-[#C9A962] transition-colors">{product.name}</h3>
          </div>
          <p className="text-[#C9A962] font-cinzel text-lg">{product.price === 0 ? 'TBA' : `R${product.price}`}</p>
        </div>

        {/* Type selector with animation */}
        <div className="flex gap-2 mb-3">
          {(['tshirt', 'hoodie'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-[9px] uppercase tracking-wider transition-all duration-300 ${
                selectedType === type 
                  ? 'bg-[#C9A962] text-black shadow-lg' 
                  : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Color selector with hover effects */}
        <div className="flex gap-2 mb-4">
          {['black', 'white', 'charcoal'].map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-7 h-7 rounded-sm transition-all duration-300 ${
                selectedColor === color 
                  ? 'ring-2 ring-[#C9A962] ring-offset-2 ring-offset-[#0a0a0a] scale-110' 
                  : 'hover:scale-110'
              }`}
              style={{ 
                backgroundColor: color === 'charcoal' ? '#333' : color,
                border: color === 'white' ? '1px solid #444' : 'none'
              }}
            />
          ))}
        </div>

        {/* Size selector */}
        <div className="flex gap-2 mb-5">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-9 h-9 text-xs transition-all duration-300 ${
                selectedSize === size
                  ? 'bg-[#C9A962] text-black shadow-md'
                  : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          disabled={product.price === 0}
          className="w-full py-3.5 bg-zinc-900 text-zinc-400 text-xs uppercase tracking-wider hover:bg-[#C9A962] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn"
        >
          <span className="relative z-10">{product.price === 0 ? 'Coming Soon' : 'Add to Cart'}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
        </button>
      </div>
    </div>
  );
};

// --- ENHANCED VIRTUAL DRESSING ROOM ---
const VirtualDressingRoom = ({ isOpen, onClose, initialProduct, onAddToCart, cartItems }: { isOpen: boolean; onClose: () => void; initialProduct?: Product; onAddToCart: (item: CartItem) => void; cartItems: CartItem[]; }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialProduct || null);
  const [selectedType, setSelectedType] = useState<'tshirt' | 'hoodie'>('tshirt');
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [view, setView] = useState<'front' | 'back'>('back');
  const [zoom, setZoom] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => { if (initialProduct) setSelectedProduct(initialProduct); }, [initialProduct]);
  if (!isOpen || !selectedProduct) return null;

  const inCart = cartItems.some(item => item.id === selectedProduct.id);

  const handleProductChange = (product: Product) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProduct(product);
      setIsTransitioning(false);
    }, 300);
  };

  const handleAdd = () => {
    if (selectedProduct.price === 0) return;
    onAddToCart({ ...selectedProduct, quantity: 1, size: selectedSize, color: selectedColor, type: selectedType });
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/95 flex animate-fadeIn">
      <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-300 z-50 transition-colors hover:rotate-90 duration-300">
        <X className="w-8 h-8" />
      </button>

      {/* Left Panel - 3D Display */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute w-[600px] h-[600px] bg-[#C9A962]/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Product Display */}
        <div 
          className={`relative transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          style={{ transform: `scale(${zoom})` }}
        >
          <img 
            src={view === 'back' ? selectedProduct.images.back : selectedProduct.images.front}
            alt={selectedProduct.name}
            className="max-h-[70vh] max-w-full object-contain drop-shadow-2xl opacity-50"
          />
          
          {/* Floating particles around product */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#C9A962] rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 3) * 30}%`,
                  opacity: 0.3,
                  animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-zinc-900/90 backdrop-blur-md px-8 py-4 rounded-full border border-zinc-800">
          <button 
            onClick={() => setView(v => v === 'front' ? 'back' : 'front')} 
            className="text-zinc-400 hover:text-[#C9A962] transition-all hover:scale-110"
            title="Flip"
          >
            <RotateCw className="w-6 h-6" />
          </button>
          <div className="w-px h-8 bg-zinc-700" />
          <button onClick={() => setZoom(z => Math.max(0.7, z - 0.1))} className="text-zinc-400 hover:text-[#C9A962] transition-all hover:scale-110">
            <ZoomOut className="w-6 h-6" />
          </button>
          <span className="text-zinc-500 text-sm font-montserrat w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(1.3, z + 0.1))} className="text-zinc-400 hover:text-[#C9A962] transition-all hover:scale-110">
            <ZoomIn className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Right Panel - Controls */}
      <div className="w-[420px] bg-[#0a0a0a] border-l border-zinc-800 p-8 overflow-y-auto">
        <h2 className="text-3xl font-cinzel text-zinc-300 mb-1">{selectedProduct.name}</h2>
        <p className="text-zinc-600 font-montserrat text-sm mb-8">{selectedProduct.description}</p>

        {/* Type selector */}
        <div className="mb-6">
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-3 block">Type</label>
          <div className="flex gap-3">
            {(['tshirt', 'hoodie'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex-1 py-3 text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedType === type 
                    ? 'bg-[#C9A962] text-black shadow-lg shadow-[#C9A962]/20' 
                    : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Color selector */}
        <div className="mb-6">
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-3 block">Color</label>
          <div className="flex gap-3">
            {['black', 'white', 'charcoal'].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-14 h-14 rounded transition-all duration-300 ${
                  selectedColor === color ? 'ring-2 ring-[#C9A962] ring-offset-4 ring-offset-[#0a0a0a] scale-110' : 'hover:scale-105'
                }`}
                style={{ 
                  backgroundColor: color === 'charcoal' ? '#333' : color,
                  border: color === 'white' ? '1px solid #444' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div className="mb-8">
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-3 block">Size</label>
          <div className="flex gap-3">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 text-sm transition-all duration-300 ${
                  selectedSize === size
                    ? 'bg-[#C9A962] text-black shadow-md'
                    : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAdd}
          disabled={selectedProduct.price === 0}
          className="w-full py-4 bg-[#C9A962] text-black font-cinzel uppercase tracking-wider hover:bg-[#E8D5A3] transition-all duration-300 mb-6 disabled:opacity-50 relative overflow-hidden group"
        >
          <span className="relative z-10">{selectedProduct.price === 0 ? 'Coming Soon' : (inCart ? 'Add Another' : 'Add to Cart')}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>

        {/* Product browser */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <label className="text-zinc-500 text-xs uppercase tracking-wider mb-4 block">Browse Collection</label>
          <div className="grid grid-cols-4 gap-3 max-h-56 overflow-y-auto">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleProductChange(p)}
                className={`relative aspect-square overflow-hidden transition-all duration-300 ${
                  selectedProduct.id === p.id ? 'ring-2 ring-[#C9A962]' : 'opacity-60 hover:opacity-100'
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
const VirtualCloset = ({ isOpen, onClose, onOpenDressingRoom, cartItems }: { isOpen: boolean; onClose: () => void; onOpenDressingRoom: (product: Product) => void; cartItems: CartItem[]; }) => {
  const [favorites, setFavorites] = useState<string[]>(() => { const saved = localStorage.getItem('zeal-favorites'); return saved ? JSON.parse(saved) : []; });
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  useEffect(() => { localStorage.setItem('zeal-favorites', JSON.stringify(favorites)); }, [favorites]);
  const toggleFavorite = (id: string) => { setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]); };
  const filteredProducts = PRODUCTS.filter(p => filter === 'favorites' ? favorites.includes(p.id) : true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-black/95 flex flex-col animate-fadeIn">
      <div className="flex items-center justify-between p-8 border-b border-zinc-800">
        <h2 className="text-3xl font-cinzel text-zinc-300">Virtual Closet</h2>
        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            {(['all', 'favorites'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-[11px] uppercase tracking-wider transition-all duration-300 ${
                  filter === f ? 'bg-[#C9A962] text-black shadow-lg' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {f} ({f === 'favorites' ? favorites.length : PRODUCTS.length})
              </button>
            ))}
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors hover:rotate-90 duration-300">
            <X className="w-7 h-7" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-[#C9A962]/50 transition-all duration-500 cursor-pointer overflow-hidden"
              onClick={() => onOpenDressingRoom(product)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={product.images.back} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute top-3 right-3 z-10">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                  className={`p-2 rounded-full bg-black/50 transition-all duration-300 hover:scale-110 ${
                    favorites.includes(product.id) ? 'text-[#C9A962]' : 'text-zinc-600 hover:text-[#C9A962]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-zinc-300 text-sm font-cinzel">{product.name}</p>
                {cartItems.some(i => i.id === product.id) && (
                  <p className="text-[#C9A962] text-[10px] uppercase mt-1">In Cart</p>
                )}
              </div>
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
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-zinc-800 p-8 overflow-y-auto animate-slideInRight">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-cinzel text-zinc-300 tracking-wider">Your Cart</h2>
          <button onClick={onClose} className="text-zinc-600 hover:text-zinc-300 transition-colors hover:rotate-90 duration-300">
            <X className="w-7 h-7" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 opacity-20" />
            <p className="font-montserrat text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-5 mb-10">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}-${item.type}`} className="flex gap-5 p-5 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="w-24 h-24 bg-zinc-800 rounded flex items-center justify-center overflow-hidden">
                    <img src={item.images.back} alt="" className="w-20 h-20 object-cover opacity-40" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-cinzel text-zinc-300 text-base mb-1">{item.name}</h4>
                    <p className="text-zinc-600 text-xs font-montserrat mb-2">{item.color} / {item.size} / {item.type}</p>
                    <p className="text-[#C9A962] font-cinzel text-lg">R{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => onRemove(`${item.id}-${item.size}-${item.color}-${item.type}`)} className="text-zinc-600 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-3 py-1.5">
                      <button 
                        onClick={() => onUpdateQuantity(`${item.id}-${item.size}-${item.color}-${item.type}`, Math.max(0, item.quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-zinc-300 text-sm font-montserrat w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(`${item.id}-${item.size}-${item.color}-${item.type}`, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-8">
              <div className="flex justify-between mb-6">
                <span className="text-zinc-500 font-montserrat text-sm">Subtotal</span>
                <span className="text-zinc-300 font-cinzel text-2xl">R{total}</span>
              </div>
              <button className="w-full py-5 bg-[#C9A962] text-black font-cinzel text-sm tracking-[0.2em] uppercase hover:bg-[#E8D5A3] transition-all duration-300 relative overflow-hidden group">
                <span className="relative z-10">Checkout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- ADMIN PANEL ---
const AdminPanel = ({ onClose }: { onClose: () => void }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === '66696') { setIsAuthenticated(true); setError(''); }
    else { setError('Invalid password'); }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 animate-fadeIn">
        <div className="bg-[#0a0a0a] border border-zinc-800 p-10 rounded-lg max-w-md w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#C9A962]/5 to-transparent pointer-events-none" />
          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#C9A962]/30 flex items-center justify-center">
              <Lock className="w-10 h-10 text-[#C9A962]" />
            </div>
            <h2 className="text-3xl font-cinzel text-zinc-300 mb-2">Sanctum Access</h2>
            <p className="text-zinc-600 text-sm">Enter the sacred password</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Password"
            className="w-full bg-zinc-900 border border-zinc-800 p-5 text-zinc-300 font-montserrat mb-4 focus:border-[#C9A962] outline-none transition-colors"
          />
          {error && <p className="text-red-500 text-sm mb-4 animate-shake">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-[#C9A962] text-black font-cinzel uppercase tracking-wider hover:bg-[#E8D5A3] transition-all duration-300"
          >
            Enter Sanctum
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 mt-3 text-zinc-600 font-montserrat text-sm hover:text-zinc-400 transition-colors"
          >
            Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#010101]/98 overflow-y-auto animate-fadeIn">
      <div className="max-w-6xl mx-auto p-8 md:p-12">
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
          <div>
            <h2 className="text-3xl font-cinzel text-zinc-300 tracking-wider">The Inner Sanctum</h2>
            <p className="text-zinc-600 text-sm mt-2">Covenant Operations</p>
          </div>
          <button onClick={onClose} className="text-zinc-600 hover:text-zinc-400 transition-colors hover:rotate-90 duration-300">
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue', value: 'R0', icon: CreditCard },
            { label: 'Orders', value: '0', icon: Package },
            { label: 'Products', value: PRODUCTS.length.toString(), icon: BarChart3 },
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900/50 p-8 border border-zinc-800 hover:border-[#C9A962]/30 transition-all duration-300 group">
              <stat.icon className="w-6 h-6 text-[#C9A962] mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-cinzel text-zinc-300">{stat.value}</p>
              <p className="text-zinc-600 text-sm font-montserrat mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SHOP SECTION ---
const ShopSection = ({ onAddToCart, onOpenDressingRoom }: { onAddToCart: (item: CartItem) => void; onOpenDressingRoom: (product: Product) => void; }) => (
  <section id="shop" className="py-32 px-6 lg:px-24 bg-[#010101]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <p className="text-[#C9A962] font-cinzel tracking-[0.5em] text-xs mb-4 animate-pulse">THE COLLECTION</p>
        <h2 className="text-4xl md:text-6xl font-cinzel text-zinc-300 mb-6">Coming Soon</h2>
        <p className="text-zinc-600 max-w-xl mx-auto font-montserrat">New designs launching soon. Join the covenant to be first to know.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((product, index) => (
          <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fadeInUp">
            <ProductCard product={product} onAddToCart={onAddToCart} onOpenDressingRoom={onOpenDressingRoom} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- MAIN APP ---
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
    const handleScroll = () => { setScrollProgress((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100); };
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

  if (appState === 'loading') return <SummoningSeal onComplete={() => setAppState('intro')} />;
  if (appState === 'intro') return <Hero onEnter={() => setAppState('ready')} />;

  return (
    <div className="bg-[#010101] min-h-screen text-gray-300 font-montserrat">
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
        <section id="about" className="py-32 px-6 lg:px-24 bg-[#050505]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#C9A962] font-cinzel tracking-[0.5em] text-xs mb-6">THE PHILOSOPHY</p>
            <h2 className="text-3xl md:text-5xl font-cinzel text-zinc-300 mb-8">More Than Apparel</h2>
            <p className="text-zinc-500 font-montserrat leading-relaxed">ZEAL represents the intersection of occult symbolism and premium streetwear. Each piece is a statement of intent, a wearable philosophy.</p>
          </div>
        </section>
        <footer className="py-20 px-6 border-t border-zinc-900 bg-[#010101]">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <h3 className="text-3xl font-cinzel text-zinc-500 tracking-[0.5em] mb-4">ZEAL</h3>
            <p className="text-zinc-800 text-[10px] tracking-[0.3em]">© 2026 ZEAL • AS ABOVE SO BELOW</p>
          </div>
        </footer>
      </main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemove} />
      <VirtualDressingRoom isOpen={isDressingRoomOpen} onClose={() => setIsDressingRoomOpen(false)} initialProduct={selectedProduct} onAddToCart={handleAddToCart} cartItems={cart} />
      <VirtualCloset isOpen={isClosetOpen} onClose={() => setIsClosetOpen(false)} onOpenDressingRoom={handleOpenDressingRoom} cartItems={cart} />
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
}

export default App;
