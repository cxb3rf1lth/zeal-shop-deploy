import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useStore } from '../store';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { content } = useStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Logo entrance with rotation
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.6, rotation: -15 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.3, ease: 'power3.out' }
      );

      // Title entrance with blur
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, scale: 0.9, filter: 'blur(12px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' },
        '-=0.8'
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
        '-=1'
      );

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );

      // Continuous floating animation for logo
      gsap.to(logoRef.current, {
        y: -18,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Subtle rotation for outer ring
      gsap.to('.hero-ring', {
        rotation: 360,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });

      // Parallax on scroll
      gsap.to(titleRef.current, {
        yPercent: 50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(logoRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToProduct = () => {
    const element = document.getElementById('product');
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'power3.inOut',
      });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303]"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(160,128,64,0.18)_0%,transparent_50%)]" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

        {/* Animated particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37]/50 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)',
            }}
          />
        ))}

        {/* Large ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#a08040]/8 rounded-full blur-[150px]" />
      </div>

      {/* Corner Ritual Marks */}
      <div className="absolute top-24 left-8 w-40 h-40 border-l-2 border-t-2 border-[#a08040]/25" />
      <div className="absolute top-24 right-8 w-40 h-40 border-r-2 border-t-2 border-[#a08040]/25" />
      <div className="absolute bottom-24 left-8 w-40 h-40 border-l-2 border-b-2 border-[#a08040]/25" />
      <div className="absolute bottom-24 right-8 w-40 h-40 border-r-2 border-b-2 border-[#a08040]/25" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Floating Logo with Ring */}
        <div
          ref={logoRef}
          className="relative w-44 h-44 mx-auto mb-10"
        >
          {/* Outer rotating ring */}
          <div className="hero-ring absolute inset-[-15px] border border-[#a08040]/20 rounded-full" />
          <div className="hero-ring absolute inset-[-25px] border border-[#a08040]/10 rounded-full" style={{ animationDirection: 'reverse' }} />
          
          {/* Glow */}
          <div className="absolute inset-0 bg-[#a08040]/25 rounded-full blur-3xl" />
          
          {/* Logo Image */}
          <img
            src="/images/zeal-sigil-main.jpg"
            alt="ZEAL"
            className="relative w-full h-full object-contain rounded-full border-4 border-[#a08040]/40 shadow-[0_0_60px_rgba(160,128,64,0.4)]"
          />
        </div>

        {/* Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-[#a08040]" />
          <p className="text-[#a08040] font-cinzel tracking-[0.4em] text-[10px] uppercase">
            {content.hero.badge}
          </p>
          <Sparkles className="w-4 h-4 text-[#a08040]" />
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-[20vw] md:text-[15vw] lg:text-[11vw] font-black tracking-[0.06em] font-cinzel text-white leading-none mb-6"
          style={{
            textShadow: '0 0 80px rgba(160, 128, 64, 0.5), 0 0 160px rgba(160, 128, 64, 0.25), 0 0 240px rgba(160, 128, 64, 0.1)',
          }}
        >
          {content.hero.title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl font-cinzel tracking-[0.35em] text-[#888888] uppercase mb-3"
        >
          {content.hero.subtitle}
        </p>

        {/* Tagline */}
        <div ref={taglineRef} className="flex items-center justify-center gap-4 mb-12">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#a08040]/50" />
          <p className="text-[#d4af37] text-base font-cinzel tracking-[0.25em]">
            {content.hero.mantra}
          </p>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#a08040]/50" />
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToProduct}
            className="group relative px-14 py-4 bg-[#a08040] text-black font-cinzel tracking-[0.2em] text-sm uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(160,128,64,0.6)]"
          >
            <span className="relative z-10">{content.hero.ctaLabel}</span>
            <div className="absolute inset-0 bg-[#d4af37] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>
          <button
            onClick={scrollToAbout}
            className="px-12 py-4 border border-white/20 text-white font-cinzel tracking-[0.2em] text-sm uppercase transition-all duration-300 hover:border-[#a08040]/70 hover:text-[#d4af37] hover:bg-white/[0.03] hover:shadow-[0_0_30px_rgba(160,128,64,0.2)]"
          >
            Read Philosophy
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProduct}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-[#a08040] transition-colors group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-cinzel">Discover</span>
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </button>
    </section>
  );
}
