import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShoppingBag, Check, ChevronLeft, ChevronRight, 
  Eye, Sparkles, ArrowRight 
} from 'lucide-react';
import { useStore } from '../store';

gsap.registerPlugin(ScrollTrigger);

export function ProductShowcase() {
  const { product, addToCart, setIsCartOpen } = useStore();
  const [selectedColor, setSelectedColor] = useState<'black' | 'charcoal' | 'white'>('black');
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [activeView, setActiveView] = useState<'front' | 'back' | 'detail'>('front');
  const [isAnimating, setIsAnimating] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Get available variants for selected color
  const availableVariants = product.variants.filter(
    (v) => v.color === selectedColor
  );

  const selectedVariant = availableVariants.find((v) => v.size === selectedSize) || availableVariants[0];
  const isLowStock = selectedVariant && selectedVariant.stock <= 5;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showcase-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );
      
      gsap.fromTo(
        '.showcase-content',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const stage = imageRef.current?.querySelector('.view-stage');
    if (!stage) return;

    gsap.fromTo(
      stage,
      { opacity: 0, y: 14, scale: 0.97, filter: 'blur(4px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' }
    );
  }, [activeView]);

  const handleColorChange = (color: 'black' | 'charcoal' | 'white') => {
    if (isAnimating || color === selectedColor) return;
    setIsAnimating(true);
    
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      onComplete: () => {
        setSelectedColor(color);
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          onComplete: () => setIsAnimating(false),
        });
      },
    });
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addToCart({
      id: `${product.id}-${Date.now()}`,
      product,
      variant: selectedVariant,
      quantity: 1,
    });
    
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const colorMap = {
    black: { bg: '#0a0a0a', label: 'Midnight Black' },
    charcoal: { bg: '#2a2a2a', label: 'Shadow Grey' },
    white: { bg: '#f5f5f5', label: 'Bone White' },
  };

  const nextView = () => {
    const views: Array<'front' | 'back' | 'detail'> = ['front', 'back', 'detail'];
    const currentIndex = views.indexOf(activeView);
    const nextIndex = (currentIndex + 1) % views.length;
    setActiveView(views[nextIndex]);
  };

  const prevView = () => {
    const views: Array<'front' | 'back' | 'detail'> = ['front', 'back', 'detail'];
    const currentIndex = views.indexOf(activeView);
    const prevIndex = (currentIndex - 1 + views.length) % views.length;
    setActiveView(views[prevIndex]);
  };

  return (
    <section
      id="product"
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] py-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#a08040]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#a08040]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="showcase-title text-[#a08040] font-cinzel tracking-[0.5em] text-sm mb-4">
            THE FIRST AND ONLY
          </p>
          <h2 className="showcase-title text-4xl md:text-6xl lg:text-7xl font-black text-white font-cinzel tracking-wider mb-4">
            The ZEAL Hoodie
          </h2>
          <p className="showcase-title text-[#888888] max-w-2xl mx-auto text-lg">
            Where occult symbolism meets premium streetwear. Every detail crafted with intention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Product Image */}
          <div className="relative">
            {/* Main Image Container */}
              <div 
                ref={imageRef}
                className="relative aspect-[3/4] bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5"
                onClick={() => {
                  if (activeView === 'front') setActiveView('back');
                  if (activeView === 'back') setActiveView('front');
                }}
                role={activeView !== 'detail' ? 'button' : undefined}
                tabIndex={activeView !== 'detail' ? 0 : -1}
                onKeyDown={(e) => {
                  if (activeView === 'detail') return;
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveView(activeView === 'front' ? 'back' : 'front');
                  }
                }}
              >
              {/* View Label */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-cinzel text-[#a08040] uppercase tracking-wider">
                  {activeView === 'detail' ? 'Hood Detail' : `${activeView} View`}
                </span>
              </div>

              {/* Product Image */}
            <div className="view-stage absolute inset-0 flex items-center justify-center p-8">
                {activeView === 'front' && (
                  <svg viewBox="0 0 400 520" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <linearGradient id={`hoodieGrad-${selectedColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colorMap[selectedColor].bg} />
                        <stop offset="100%" stopColor={selectedColor === 'white' ? '#ddd' : '#050505'} />
                      </linearGradient>
                    </defs>
                    
                    {/* Hoodie Body */}
                    <path
                      d="M110 60 L70 100 L95 160 L120 150 L120 480 Q200 500 280 480 L280 150 L305 160 L330 100 L290 60 Q200 100 110 60"
                      fill={`url(#hoodieGrad-${selectedColor})`}
                      stroke={selectedColor === 'white' ? '#ddd' : '#222'}
                      strokeWidth="1"
                    />
                    
                    {/* Hood */}
                    <ellipse cx="200" cy="80" rx="90" ry="70" fill={`url(#hoodieGrad-${selectedColor})`} />
                    
                    {/* Sleeves */}
                    <path d="M70 100 L20 160 L60 220 L95 160 Z" fill={`url(#hoodieGrad-${selectedColor})`} />
                    <path d="M330 100 L380 160 L340 220 L305 160 Z" fill={`url(#hoodieGrad-${selectedColor})`} />
                    
                    {/* Kangaroo Pocket */}
                    <path d="M140 320 L140 420 Q200 440 260 420 L260 320 Q200 340 140 320" 
                      fill={selectedColor === 'white' ? '#eee' : '#111'} opacity="0.8" />
                    
                    {/* Drawstrings */}
                    <path d="M170 110 Q170 150 175 180" fill="none" stroke={selectedColor === 'white' ? '#bbb' : '#555'} strokeWidth="3"/>
                    <path d="M230 110 Q230 150 225 180" fill="none" stroke={selectedColor === 'white' ? '#bbb' : '#555'} strokeWidth="3"/>
                    
                    {/* Subtle chest sigil (front) */}
                    <g transform="translate(200, 205)">
                      <circle r="22" fill="none" stroke="#a08040" strokeWidth="1.5" opacity="0.85"/>
                      <path d="M0,-13 L12,7 L-12,7 Z" fill="none" stroke="#a08040" strokeWidth="1.5" opacity="0.85"/>
                      <circle r="5" fill="#a08040" opacity="0.9"/>
                      <text y="2.5" textAnchor="middle" fill="#050505" fontSize="6.5" fontWeight="bold">Z</text>
                    </g>

                    {/* Signature ZEAL mark along ribcage */}
                    <text
                      x="250"
                      y="255"
                      fill="#a08040"
                      fontSize="9"
                      fontFamily="Cinzel"
                      letterSpacing="2"
                      transform="rotate(90 250 255)"
                      opacity="0.9"
                    >
                      ZEAL
                    </text>
                  </svg>
                )}

                {activeView === 'back' && (
                  <svg viewBox="0 0 400 520" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <linearGradient id={`hoodieBack-${selectedColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colorMap[selectedColor].bg} />
                        <stop offset="100%" stopColor={selectedColor === 'white' ? '#ddd' : '#050505'} />
                      </linearGradient>
                    </defs>
                    
                    {/* Back Body */}
                    <path
                      d="M110 60 L70 100 L95 160 L120 150 L120 480 Q200 500 280 480 L280 150 L305 160 L330 100 L290 60 Q200 100 110 60"
                      fill={`url(#hoodieBack-${selectedColor})`}
                    />
                    
                    {/* Hood (back view) */}
                    <path d="M120 60 Q200 20 280 60 L280 120 Q200 100 120 120 Z" 
                      fill={`url(#hoodieBack-${selectedColor})`} />
                    
                    {/* Sleeves */}
                    <path d="M70 100 L20 160 L60 220 L95 160 Z" fill={`url(#hoodieBack-${selectedColor})`} />
                    <path d="M330 100 L380 160 L340 220 L305 160 Z" fill={`url(#hoodieBack-${selectedColor})`} />
                    
                    {/* LARGE BACK SIGIL */}
                    <g transform="translate(200, 250)">
                      <circle r="85" fill="none" stroke="#a08040" strokeWidth="3" opacity="0.9"/>
                      <circle r="70" fill="none" stroke="#a08040" strokeWidth="1.5" opacity="0.7"/>
                      <circle r="55" fill="none" stroke="#a08040" strokeWidth="1" opacity="0.5"/>
                      {/* Large triangle */}
                      <path d="M0,-65 L56,32 L-56,32 Z" fill="none" stroke="#a08040" strokeWidth="3"/>
                      {/* Inner triangle */}
                      <path d="M0,-40 L35,20 L-35,20 Z" fill="none" stroke="#a08040" strokeWidth="1.5"/>
                      {/* Eye in center */}
                      <ellipse rx="25" ry="15" fill="none" stroke="#a08040" strokeWidth="2"/>
                      <circle r="8" fill="#a08040"/>
                      <circle r="3" fill="#050505"/>
                      {/* ZEAL text */}
                      <text y="55" textAnchor="middle" fill="#a08040" fontSize="16" 
                        fontFamily="Cinzel" letterSpacing="4">ZEAL</text>
                    </g>
                    
                    {/* Right Sleeve Text */}
                    <text x="55" y="140" fill="#a08040" fontSize="8" fontFamily="Cinzel" 
                      transform="rotate(-20 55 140)" opacity="0.9">As above</text>
                    
                    {/* Left Sleeve Text */}
                    <text x="345" y="140" fill="#a08040" fontSize="8" fontFamily="Cinzel" 
                      transform="rotate(20 345 140)" opacity="0.9">So below</text>
                  </svg>
                )}

                {activeView === 'detail' && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      {/* Hood Interior Detail */}
                      <ellipse cx="200" cy="200" rx="150" ry="140" fill={colorMap[selectedColor].bg} 
                        stroke={selectedColor === 'white' ? '#ddd' : '#333'} strokeWidth="2"/>
                      
                      {/* Eye of Zeal - Large and prominent */}
                      <g transform="translate(200, 180)">
                        {/* Outer rays */}
                        {[...Array(12)].map((_, i) => (
                          <line
                            key={i}
                            x1="0"
                            y1="-90"
                            x2="0"
                            y2="-70"
                            stroke="#a08040"
                            strokeWidth="3"
                            transform={`rotate(${i * 30})`}
                          />
                        ))}
                        {/* Eye shape */}
                        <ellipse rx="60" ry="35" fill="none" stroke="#a08040" strokeWidth="4"/>
                        <ellipse rx="60" ry="35" fill="#050505" opacity="0.3"/>
                        {/* Iris */}
                        <circle r="25" fill="#a08040" opacity="0.8"/>
                        {/* Pupil */}
                        <circle r="12" fill="#000"/>
                        {/* Highlight */}
                        <circle cx="5" cy="-5" r="4" fill="#fff" opacity="0.6"/>
                        {/* Eyelid lines */}
                        <path d="M-60,0 Q0,-50 60,0" fill="none" stroke="#a08040" strokeWidth="2" opacity="0.5"/>
                        <path d="M-60,0 Q0,50 60,0" fill="none" stroke="#a08040" strokeWidth="2" opacity="0.5"/>
                      </g>
                      
                      {/* Label */}
                      <text x="200" y="340" textAnchor="middle" fill="#a08040" 
                        fontSize="14" fontFamily="Cinzel" letterSpacing="3">
                        EYE OF ZEAL
                      </text>
                      <text x="200" y="360" textAnchor="middle" fill="#666" fontSize="10">
                        Revealed when hood is worn
                      </text>
                    </svg>
                  </div>
                )}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevView}
                aria-label="Previous view"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white/60 hover:text-[#a08040] transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextView}
                aria-label="Next view"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white/60 hover:text-[#a08040] transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* View Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {(['front', 'back', 'detail'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setActiveView(view)}
                    aria-label={`Switch to ${view} view`}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeView === view ? 'w-8 bg-[#a08040]' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-white/40 mt-3">
              Tap garment area to flip between front and back views
            </p>

            {/* Quick View Thumbnails */}
            <div className="flex justify-center gap-4 mt-6">
              {(['front', 'back', 'detail'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-cinzel uppercase tracking-wider transition-all ${
                    activeView === view
                      ? 'bg-[#a08040] text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {view === 'detail' ? 'Hood Detail' : view}
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="showcase-content space-y-8">
            {/* Title & Price */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-[#a08040]/10 border border-[#a08040]/30 rounded-full text-xs font-cinzel text-[#a08040]">
                  SIGNATURE COLLECTION
                </span>
                {isLowStock && (
                  <span className="px-3 py-1 bg-[#8b1a1a]/20 border border-[#8b1a1a]/30 rounded-full text-xs font-cinzel text-[#8b1a1a]">
                    LOW STOCK
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white font-cinzel mb-2">
                {product.name}
              </h1>
              <p className="text-[#888888] text-lg mb-4">{product.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#a08040]">
                  R{selectedVariant?.price || product.basePrice}
                </span>
                <span className="text-white/40">ZAR</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-white font-cinzel tracking-wider text-sm">FEATURES</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <Sparkles className="w-4 h-4 text-[#a08040] mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-white font-cinzel tracking-wider text-sm mb-3">
                COLOR: <span className="text-[#a08040]">{colorMap[selectedColor].label}</span>
              </h3>
              <div className="flex gap-3">
                {(Object.keys(colorMap) as Array<keyof typeof colorMap>).map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`group relative w-16 h-16 rounded-xl transition-all ${
                      selectedColor === color
                        ? 'ring-2 ring-[#a08040] ring-offset-2 ring-offset-[#050505]'
                        : 'hover:ring-1 hover:ring-white/30'
                    }`}
                    style={{ backgroundColor: colorMap[color].bg }}
                  >
                    {selectedColor === color && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-6 h-6 text-[#a08040]" style={{ 
                          color: color === 'white' ? '#a08040' : '#a08040' 
                        }} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-white font-cinzel tracking-wider text-sm mb-3">
                SIZE: <span className="text-[#a08040]">{selectedSize}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((size) => {
                  const variant = availableVariants.find((v) => v.size === size);
                  const isAvailable = variant && variant.stock > 0;
                  return (
                    <button
                      key={size}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      className={`w-14 h-14 rounded-lg font-cinzel text-lg transition-all ${
                        selectedSize === size
                          ? 'bg-[#a08040] text-black'
                          : isAvailable
                          ? 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                          : 'bg-transparent text-white/20 line-through cursor-not-allowed border border-white/5'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <p className="text-white/40 text-xs mt-2">Oversized fit - size down for regular fit</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className={`flex-1 py-4 px-8 rounded-lg font-cinzel tracking-[0.15em] text-sm uppercase flex items-center justify-center gap-3 transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-[#a08040] text-black hover:bg-[#c0a060]'
                } ${(!selectedVariant || selectedVariant.stock === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="py-4 px-8 rounded-lg border border-white/20 text-white font-cinzel tracking-[0.15em] text-sm uppercase hover:bg-white/5 transition-all"
              >
                View Cart
              </button>
            </div>

            {/* Stock Info */}
            {selectedVariant && (
              <p className="text-white/40 text-sm text-center">
                {selectedVariant.stock} available in this size • 
                <span className="text-[#a08040]"> Free shipping over R1500</span>
              </p>
            )}
          </div>
        </div>

        {/* Detail Callout */}
        <div className="mt-20 p-8 bg-gradient-to-r from-[#a08040]/10 to-transparent border border-[#a08040]/20 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-[#a08040]/20 flex items-center justify-center flex-shrink-0">
              <Eye className="w-12 h-12 text-[#a08040]" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-cinzel text-white mb-2">The Hidden Detail</h3>
              <p className="text-[#888888] max-w-2xl">
                When you pull up the hood, the interior reveals the all-seeing Eye of Zeal - 
                a secret symbol known only to those who wear it. The eye watches from within, 
                a reminder that awareness begins from within.
              </p>
            </div>
            <button
              onClick={() => setActiveView('detail')}
              className="px-6 py-3 bg-[#a08040]/20 border border-[#a08040]/50 rounded-lg text-[#a08040] font-cinzel text-sm uppercase tracking-wider hover:bg-[#a08040]/30 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              View Detail <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
