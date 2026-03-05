import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Shirt, Sparkles } from 'lucide-react';
import { useStore } from '../store';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { content } = useStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.about-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      gsap.fromTo(
        '.feature-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Shirt,
      title: 'Front & Back Sigil',
      description: 'Large ZEAL occult symbol prominently displayed on both front and back, commanding attention and respect.',
    },
    {
      icon: Sparkles,
      title: 'Sleeve Philosophy',
      description: '"As above" on the right arm, "So below" on the left—the Hermetic principle embodied in thread.',
    },
    {
      icon: Eye,
      title: 'The Hidden Eye',
      description: 'The Eye of Zeal revealed only when the hood is worn—a secret known only to the wearer.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-[#050505] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #a08040 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="about-title text-[#a08040] font-cinzel tracking-[0.5em] text-sm mb-4">
            {content.about.eyebrow.toUpperCase()}
          </p>
          <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-black text-white font-cinzel tracking-wider mb-8">
            {content.about.title}
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left - Story */}
          <div className="space-y-6">
            <p className="about-text text-xl text-[#888888] leading-relaxed font-light">
              {content.about.paragraph1}
            </p>
            <p className="about-text text-lg text-white/60 leading-relaxed">
              {content.about.paragraph2}
            </p>
            <p className="about-text text-lg text-white/60 leading-relaxed">
              {content.about.paragraph3}
            </p>

            {/* Quote */}
            <blockquote className="about-text border-l-2 border-[#a08040] pl-6 py-2 mt-8">
              <p className="text-[#a08040] font-cinzel text-xl italic">
                &ldquo;{content.about.quote}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-2xl border border-[#a08040]/20 p-8 flex items-center justify-center">
              <img
                src="/images/zeal-logo.jpg"
                alt="ZEAL"
                className="w-3/4 h-3/4 object-contain rounded-full opacity-80"
              />
              {/* Orbiting elements */}
              <div className="absolute inset-0">
                {['As above', 'So below', '•', '•'].map((text, i) => (
                  <span
                    key={i}
                    className="absolute text-[#a08040]/40 text-xs font-cinzel tracking-widest"
                    style={{
                      top: `${50 - 45 * Math.cos((i * 90 * Math.PI) / 180)}%`,
                      left: `${50 + 45 * Math.sin((i * 90 * Math.PI) / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card p-8 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#a08040]/30 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#a08040]/10 flex items-center justify-center mb-6 group-hover:bg-[#a08040]/20 transition-colors">
                <feature.icon className="w-8 h-8 text-[#a08040]" />
              </div>
              <h3 className="text-xl font-cinzel text-white mb-3 group-hover:text-[#a08040] transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Specs */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '400gsm', label: 'Heavyweight Cotton' },
            { value: '3', label: 'Colors Available' },
            { value: '5', label: 'Sizes (S-XXL)' },
            { value: '∞', label: 'Meaning' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#a08040] font-cinzel mb-2">
                {stat.value}
              </div>
              <div className="text-white/40 text-sm tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
