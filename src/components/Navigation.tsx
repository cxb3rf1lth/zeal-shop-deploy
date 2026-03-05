import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Lock, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { gsap } from 'gsap';

interface NavigationProps {
  onOpenAdmin: () => void;
}

type SectionId = 'hero' | 'product' | 'about';

const navItems: Array<{ id: SectionId; label: string; icon?: typeof Sparkles }> = [
  { id: 'hero', label: 'Home' },
  { id: 'product', label: 'The Hoodie', icon: Sparkles },
  { id: 'about', label: 'Philosophy' },
];

export function Navigation({ onOpenAdmin }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { cart, setIsCartOpen } = useStore();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? (scrollY / documentHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Determine active section
      const sections: SectionId[] = ['hero', 'product', 'about'];
      for (const id of sections.reverse()) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'power3.inOut',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-[#a08040] via-[#d4af37] to-[#a08040] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="flex items-center gap-3 group transition-all duration-300"
            >
              <div className="relative">
                <img
                  src="/images/zeal-sigil-main.jpg"
                  alt="ZEAL"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#a08040]/60 group-hover:border-[#d4af37] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(160,128,64,0.4)]"
                />
                {isHovering && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/50 animate-ping" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-[0.2em] font-cinzel text-white group-hover:text-[#d4af37] transition-colors">
                  ZEAL
                </span>
                <span className="text-[8px] tracking-[0.3em] text-[#a08040]/70 uppercase -mt-1">
                  New World Disorder
                </span>
              </div>
            </button>

            {/* Desktop Navigation - Pill Style */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm px-2 py-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-5 py-2.5 text-xs font-cinzel tracking-[0.15em] uppercase rounded-full transition-all duration-300 flex items-center gap-2 ${
                      activeSection === item.id
                        ? 'text-black bg-[#a08040] shadow-[0_0_25px_rgba(160,128,64,0.4)]'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.icon && <item.icon className="w-3.5 h-3.5" />}
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute inset-0 rounded-full bg-[#a08040] -z-10 animate-pulse opacity-30" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-[#d4af37] hover:border-[#a08040]/50 hover:bg-[#a08040]/10 transition-all duration-300 group"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-[#a08040] text-black text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Admin */}
              <button
                onClick={onOpenAdmin}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-[#d4af37] hover:border-[#a08040]/50 hover:bg-[#a08040]/10 transition-all duration-300"
                aria-label="Open admin"
              >
                <Lock className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white transition-all"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[360px] bg-[#0a0a0a] border-l border-[#a08040]/20 p-8 pt-28 transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left rounded-xl px-5 py-4 font-cinzel tracking-[0.15em] uppercase text-sm transition-all flex items-center gap-3 ${
                  activeSection === item.id
                    ? 'bg-[#a08040] text-black shadow-[0_0_20px_rgba(160,128,64,0.3)]'
                    : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-cinzel mb-4">Contact</p>
            <a href="mailto:contact@zeal.store" className="text-sm text-white/60 hover:text-[#a08040] transition-colors">
              contact@zeal.store
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
