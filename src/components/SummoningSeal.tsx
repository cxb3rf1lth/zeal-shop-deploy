import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface SummoningSealProps {
  onEnter: () => void;
}

type LoaderSpeed = 'fast' | 'default' | 'cinematic';

const outerRunes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ☉☽☿♀♂♃♄♅♆♇';
const innerGlyphs = '✶✷✴✹✺✵☉☽☿♀♂♃♄♅♆♇🜁🜂🜄🜃';

const speedConfig: Record<LoaderSpeed, { timeScale: number; outerRotate: number; innerRotate: number; sweep: number }> = {
  fast: { timeScale: 1.24, outerRotate: 92, innerRotate: 68, sweep: 1.6 },
  default: { timeScale: 1, outerRotate: 120, innerRotate: 86, sweep: 2.2 },
  cinematic: { timeScale: 0.76, outerRotate: 145, innerRotate: 108, sweep: 2.8 },
};

export function SummoningSeal({ onEnter }: SummoningSealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const sigilRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [animationPhase, setAnimationPhase] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [speed, setSpeed] = useState<LoaderSpeed>('cinematic');

  const embers = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        top: `${8 + Math.random() * 84}%`,
        left: `${6 + Math.random() * 88}%`,
        size: 1 + Math.random() * 3,
        opacity: 0.1 + Math.random() * 0.4,
        delay: Math.random() * 3,
        driftX: -25 + Math.random() * 50,
        driftY: -40 - Math.random() * 60,
        duration: 5 + Math.random() * 5,
      })),
    []
  );

  useEffect(() => {
    const storedSpeed = localStorage.getItem('zeal-loader-speed') as LoaderSpeed | null;
    if (storedSpeed && ['fast', 'default', 'cinematic'].includes(storedSpeed)) {
      setSpeed(storedSpeed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('zeal-loader-speed', speed);
  }, [speed]);

  useEffect(() => {
    const profile = speedConfig[speed];

    const ctx = gsap.context(() => {
      gsap.set([
        auraRef.current,
        outerRingRef.current,
        innerRingRef.current,
        sigilRef.current,
        vectorRef.current,
        titleRef.current,
        taglineRef.current,
        buttonRef.current,
      ], { opacity: 0 });

      gsap.set(sigilRef.current, { scale: 0.7, filter: 'blur(20px)' });
      gsap.set(vectorRef.current, { scale: 0.6 });

      const tl = gsap.timeline();
      tl.timeScale(profile.timeScale);

      // Phase 1: Aura
      tl.to(auraRef.current, {
        opacity: 0.15,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        onComplete: () => setAnimationPhase(1),
      })
        // Phase 2: Outer Ring
        .fromTo(
          outerRingRef.current,
          { opacity: 0, scale: 0.9, rotate: -12 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.4,
            ease: 'power3.out',
            onComplete: () => setAnimationPhase(2),
          },
          '-=0.6'
        )
        // Phase 3: Inner Ring
        .fromTo(
          innerRingRef.current,
          { opacity: 0, scale: 0.85, rotate: 15 },
          {
            opacity: 0.9,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1'
        )
        // Phase 4: Sigil Reveal
        .to(
          sigilRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.8,
            ease: 'power3.out',
            onComplete: () => setAnimationPhase(3),
          },
          '-=0.8'
        )
        // Phase 5: Vector Overlay
        .to(
          vectorRef.current,
          {
            opacity: 0.85,
            scale: 1,
            duration: 1.3,
            ease: 'power3.out',
          },
          '-=1.4'
        )
        // Phase 6: Title
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            onComplete: () => setAnimationPhase(4),
          },
          '-=0.7'
        )
        // Phase 7: Tagline
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        // Phase 8: Button
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            onComplete: () => {
              setAnimationPhase(5);
              setShowEnter(true);
            },
          },
          '-=0.3'
        );

      // Continuous animations
      gsap.to(outerRingRef.current, {
        rotate: 360,
        duration: profile.outerRotate,
        ease: 'none',
        repeat: -1,
      });

      gsap.to(innerRingRef.current, {
        rotate: -360,
        duration: profile.innerRotate,
        ease: 'none',
        repeat: -1,
      });

      gsap.to(sigilRef.current, {
        scale: 1.02,
        duration: 4 / profile.timeScale,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.5 / profile.timeScale,
      });

      gsap.to(auraRef.current, {
        opacity: 0.3,
        duration: 3.5 / profile.timeScale,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2 / profile.timeScale,
      });

      gsap.fromTo(
        sweepRef.current,
        { xPercent: -130, opacity: 0 },
        {
          xPercent: 130,
          opacity: 0.6,
          duration: profile.sweep,
          repeat: -1,
          repeatDelay: 1.3 / profile.timeScale,
          ease: 'power2.inOut',
        }
      );

      // Ember animations
      embers.forEach((ember, index) => {
        gsap.to(`.ember-${index}`, {
          x: ember.driftX,
          y: ember.driftY,
          opacity: 0,
          duration: ember.duration,
          repeat: -1,
          delay: ember.delay,
          ease: 'none',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [embers, speed]);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);

    const exit = gsap.timeline({ onComplete: onEnter });

    exit
      .to(buttonRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.25,
        ease: 'power2.in',
      })
      .to(
        [titleRef.current, taglineRef.current],
        {
          opacity: 0,
          y: 25,
          duration: 0.5,
          ease: 'power2.in',
        },
        '-=0.15'
      )
      .to(
        [sigilRef.current, vectorRef.current],
        {
          opacity: 0,
          scale: 1.3,
          filter: 'blur(25px)',
          duration: 0.9,
          ease: 'power3.in',
        },
        '-=0.1'
      )
      .to(
        [outerRingRef.current, innerRingRef.current],
        {
          opacity: 0,
          scale: 1.15,
          duration: 0.7,
          ease: 'power2.in',
        },
        '-=0.6'
      )
      .to(
        auraRef.current,
        {
          opacity: 0.95,
          scale: 2,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(auraRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      })
      .to(
        veilRef.current,
        {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.inOut',
        },
        '-=0.3'
      );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020202]"
    >
      <div
        ref={veilRef}
        className="absolute inset-0 z-[60] bg-black pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(160,128,64,0.15)_0%,_rgba(4,4,4,0.95)_62%,_rgba(0,0,0,1)_100%)]" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:2.5px_2.5px]" />

      {/* Settings Panel */}
      <div className="absolute top-5 right-5 z-30 w-[260px] rounded-xl border border-white/10 bg-black/60 backdrop-blur-md p-4">
        <p className="text-[10px] text-white/50 uppercase tracking-[0.25em] mb-3 font-cinzel">Loader Controls</p>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {(['fast', 'default', 'cinematic'] as LoaderSpeed[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setSpeed(mode)}
              className={`px-2 py-2 text-[9px] uppercase font-cinzel tracking-[0.12em] rounded transition-all ${
                speed === mode ? 'bg-[#a08040] text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Embers */}
      {embers.map((ember, index) => (
        <span
          key={ember.id}
          className={`absolute rounded-full bg-[#d4af37]/80 ember-${index}`}
          style={{
            top: ember.top,
            left: ember.left,
            width: ember.size,
            height: ember.size,
            opacity: ember.opacity,
            filter: 'blur(0.4px)',
            boxShadow: '0 0 6px rgba(212, 175, 55, 0.5)',
          }}
        />
      ))}

      {/* Aura */}
      <div
        ref={auraRef}
        className="absolute top-1/2 left-1/2 w-[720px] h-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a08040]/30 blur-[140px]"
      />

      {/* Main Container */}
      <div className="relative w-[min(92vw,560px)] h-[min(92vw,560px)] z-20">
        {/* Outer Ring */}
        <div ref={outerRingRef} className="absolute inset-0">
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <circle cx="250" cy="250" r="235" fill="none" stroke="#a08040" strokeWidth="0.8" opacity="0.4" />
            <circle cx="250" cy="250" r="215" fill="none" stroke="#a08040" strokeWidth="0.5" opacity="0.25" />
            <circle cx="250" cy="250" r="195" fill="none" stroke="#a08040" strokeWidth="0.4" opacity="0.15" />
          </svg>

          {outerRunes.split('').map((rune, i) => (
            <span
              key={`outer-rune-${i}`}
              className="absolute text-[#d4af37]/70 text-[11px] font-cinzel rune-pulse"
              style={{
                top: `${50 - 47 * Math.cos((i * (360 / outerRunes.length)) * Math.PI / 180)}%`,
                left: `${50 + 47 * Math.sin((i * (360 / outerRunes.length)) * Math.PI / 180)}%`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${(i % 8) * 0.25}s`,
              }}
            >
              {rune}
            </span>
          ))}
        </div>

        {/* Inner Ring */}
        <div ref={innerRingRef} className="absolute inset-[11%]">
          <div className="absolute inset-0 rounded-full border border-[#a08040]/30" />
          <div className="absolute inset-[8%] rounded-full border border-[#a08040]/18" />

          {innerGlyphs.split('').map((glyph, i) => (
            <span
              key={`inner-glyph-${i}`}
              className="absolute text-[#a08040]/50 text-[12px] font-cinzel"
              style={{
                top: `${50 - 41 * Math.cos((i * (360 / innerGlyphs.length)) * Math.PI / 180)}%`,
                left: `${50 + 41 * Math.sin((i * (360 / innerGlyphs.length)) * Math.PI / 180)}%`,
                transform: `translate(-50%, -50%) rotate(${i * (360 / innerGlyphs.length) + 90}deg)`,
              }}
            >
              {glyph}
            </span>
          ))}
        </div>

        {/* Sigil Image */}
        <div ref={sigilRef} className="absolute inset-[16%]">
          <div className="absolute inset-0 rounded-full bg-[#a08040]/20 blur-3xl" />
          <div className="relative h-full w-full overflow-hidden rounded-full border border-[#a08040]/35 bg-black/25">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(160,128,64,0.15)_0%,rgba(0,0,0,0)_68%)]" />
            <img
              src="/images/zeal-sigil-main.jpg"
              alt="ZEAL Sigil"
              className="h-full w-full object-cover scale-[1.16] rounded-full opacity-90 mix-blend-screen saturate-0 contrast-125 brightness-[0.9]"
              style={{
                clipPath: 'circle(49.5% at 50% 50%)',
                WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.92) 70%, rgba(0,0,0,0) 100%)',
                maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.92) 70%, rgba(0,0,0,0) 100%)',
              }}
            />

            <div
              ref={sweepRef}
              className="absolute inset-y-0 w-[28%] bg-gradient-to-r from-transparent via-[#f8e8c8]/80 to-transparent blur-[12px]"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.4)_70%,_rgba(0,0,0,0.98)_100%)]" />
          </div>
        </div>

        {/* Vector Overlay */}
        <div ref={vectorRef} className="absolute inset-[26%] pointer-events-none text-[#e8d5a3]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="100" cy="100" r="88" strokeWidth="1.3" opacity="0.6" />
              <circle cx="100" cy="100" r="68" strokeWidth="1" opacity="0.5" />
              <path d="M100 26 L160 130 L40 130 Z" strokeWidth="1.5" opacity="0.75" />
              <path d="M100 48 L140 118 L60 118 Z" strokeWidth="1.1" opacity="0.6" />
              <ellipse cx="100" cy="95" rx="32" ry="16" strokeWidth="1.3" opacity="0.8" />
              <circle cx="100" cy="95" r="7" strokeWidth="1.3" opacity="0.95" />
              <path d="M100 114 V156" strokeWidth="1.4" opacity="0.6" />
              <path d="M78 136 H122" strokeWidth="1.1" opacity="0.5" />
            </g>
          </svg>
        </div>
      </div>

      {/* Title */}
      <div ref={titleRef} className="absolute bottom-[14vh] left-1/2 -translate-x-1/2 text-center z-20">
        <h1 className="text-7xl md:text-8xl font-black font-cinzel tracking-[0.38em] text-[#d4af37] [text-shadow:0_0_40px_rgba(212,175,55,0.5),0_0_80px_rgba(160,128,64,0.3)] pl-[0.38em]">
          ZEAL
        </h1>
      </div>

      {/* Tagline */}
      <div ref={taglineRef} className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 text-[11px] md:text-xs tracking-[0.38em] uppercase text-[#666666] font-cinzel whitespace-nowrap">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#555555]" />
          <span>New World Disorder</span>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#555555]" />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-[6.5vh] left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {[0, 1, 2, 3, 4, 5].map((phase) => (
          <span
            key={phase}
            className={`h-[7px] rounded-full transition-all duration-500 ${
              animationPhase >= phase ? 'w-8 bg-[#d4af37]' : 'w-2.5 bg-[#a08040]/20'
            }`}
          />
        ))}
      </div>

      {/* Enter Button */}
      {showEnter && (
        <button
          ref={buttonRef}
          onClick={handleEnter}
          disabled={isExiting}
          className="absolute bottom-[2.5vh] left-1/2 -translate-x-1/2 px-12 py-3.5 border border-[#d4af37]/60 bg-black/30 text-[#d4af37] tracking-[0.4em] text-xs font-cinzel uppercase transition-all duration-300 hover:bg-[#a08040]/15 hover:border-[#e8d5a3] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed z-20"
        >
          ENTER
        </button>
      )}

      <style>{`
        .rune-pulse {
          animation: runePulse 3.5s ease-in-out infinite;
        }
        @keyframes runePulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
