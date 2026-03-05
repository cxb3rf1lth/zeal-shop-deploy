import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../store';

interface CartProps {
  onCheckout: () => void;
}

export function Cart({ onCheckout }: CartProps) {
  const { cart, product, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useStore();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  const shipping = subtotal >= 1500 ? 0 : 89;
  const total = subtotal + shipping;

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        sidebarRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleClose = () => {
    gsap.to(sidebarRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power3.in',
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setIsCartOpen(false),
    });
  };

  const getColorLabel = (color: string) => {
    const labels: Record<string, string> = {
      black: 'Midnight Black',
      charcoal: 'Shadow Grey',
      white: 'Bone White',
    };
    return labels[color] || color;
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[400px] lg:w-[450px] bg-[#0a0a0a] border-l border-white/10 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#a08040]" />
            <h2 className="text-xl font-cinzel text-white tracking-wider">Your Cart</h2>
            <span className="px-2 py-0.5 bg-[#a08040] text-black text-xs font-bold rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
              <p className="text-white/40 font-cinzel text-lg mb-2">Your cart is empty</p>
              <p className="text-white/30 text-sm">Add the ZEAL hoodie to begin your journey</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-lg"
              >
                {/* Image */}
                <div className="w-20 h-20 bg-[#111] rounded overflow-hidden flex-shrink-0">
                  <img
                    src={product.frontImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-cinzel text-sm truncate">
                    {product.name}
                  </h3>
                  <p className="text-white/40 text-xs">
                    {getColorLabel(item.variant.color)} • {item.variant.size}
                  </p>
                  <p className="text-[#a08040] font-bold mt-1">
                    R{item.variant.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white/5 rounded hover:bg-white/10 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-white/60" />
                    </button>
                    <span className="text-white w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white/5 rounded hover:bg-white/10 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-white/60" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.variant.id)}
                      className="ml-auto p-1.5 text-white/30 hover:text-[#8b1a1a] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/50">
            {/* Totals */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Subtotal</span>
                <span className="text-white">R{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Shipping</span>
                <span className={shipping === 0 ? 'text-green-500' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `R${shipping}`}
                </span>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-green-500/80">
                  You qualify for free shipping!
                </p>
              )}
              <div className="flex justify-between pt-3 border-t border-white/10">
                <span className="text-white font-cinzel">Total</span>
                <span className="text-2xl font-black text-[#a08040]">R{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                handleClose();
                onCheckout();
              }}
              className="w-full py-4 bg-[#a08040] text-black font-cinzel tracking-[0.2em] text-sm uppercase flex items-center justify-center gap-2 hover:bg-[#c0a060] transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-white/30 text-xs mt-4">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
