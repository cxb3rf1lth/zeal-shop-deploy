import { useState, useEffect } from 'react';
import { ShoppingBag, Eye, LayoutGrid, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenAdmin: () => void;
  onOpenCart: () => void;
  onOpenDressingRoom: () => void;
  onOpenCloset: () => void;
  scrollProgress: number;
}

export const Navbar = ({ 
  cartCount, 
  onOpenAdmin, 
  onOpenCart, 
  onOpenDressingRoom, 
  onOpenCloset, 
  scrollProgress 
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-[#C9A962] z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[99] transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-zinc-800/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#" 
              className="font-cinzel text-2xl tracking-[0.3em] text-[#C9A962] hover:text-[#E8D5A3] transition-colors duration-300"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              ZEAL
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="#shop" 
                className="text-zinc-400 text-xs uppercase tracking-[0.2em] hover:text-[#C9A962] transition-colors duration-300 relative group"
              >
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] group-hover:w-full transition-all duration-300" />
              </a>
              <a 
                href="#about" 
                className="text-zinc-400 text-xs uppercase tracking-[0.2em] hover:text-[#C9A962] transition-colors duration-300 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={onOpenDressingRoom}
                className="p-3 text-zinc-400 hover:text-[#C9A962] transition-all duration-300 hover:scale-110 relative group"
                title="Virtual Dressing Room"
              >
                <Eye className="w-5 h-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Try On
                </span>
              </button>
              
              <button 
                onClick={onOpenCloset}
                className="p-3 text-zinc-400 hover:text-[#C9A962] transition-all duration-300 hover:scale-110 relative group"
                title="Virtual Closet"
              >
                <LayoutGrid className="w-5 h-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Closet
                </span>
              </button>
              
              <button 
                onClick={onOpenCart}
                className="p-3 text-zinc-400 hover:text-[#C9A962] transition-all duration-300 hover:scale-110 relative group"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A962] text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Admin access - hidden */}
              <button 
                onClick={onOpenAdmin}
                className="w-2 h-2 rounded-full bg-zinc-800 hover:bg-[#C9A962] transition-colors"
                title=""
              />
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 text-zinc-400 hover:text-[#C9A962] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-zinc-800 transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-6 py-8 space-y-6">
            <a 
              href="#shop" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-zinc-300 text-lg uppercase tracking-[0.2em] hover:text-[#C9A962] transition-colors"
            >
              Shop
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-zinc-300 text-lg uppercase tracking-[0.2em] hover:text-[#C9A962] transition-colors"
            >
              About
            </a>
            <div className="flex gap-6 pt-6 border-t border-zinc-800">
              <button 
                onClick={() => { onOpenDressingRoom(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-3 text-zinc-400 hover:text-[#C9A962] transition-colors"
              >
                <Eye className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider">Try On</span>
              </button>
              <button 
                onClick={() => { onOpenCloset(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-3 text-zinc-400 hover:text-[#C9A962] transition-colors"
              >
                <LayoutGrid className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider">Closet</span>
              </button>
              <button 
                onClick={() => { onOpenCart(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-3 text-zinc-400 hover:text-[#C9A962] transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider">Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
