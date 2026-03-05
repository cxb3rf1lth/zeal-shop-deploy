import { useState } from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../store';

export function Footer() {
  const { settings, content } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative bg-black border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={scrollToTop} className="flex items-center gap-3 mb-6">
              <img
                src="/images/zeal-logo.jpg"
                alt="ZEAL"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#a08040]/50"
              />
              <div>
                <span className="text-3xl font-black tracking-[0.2em] font-cinzel text-white">
                  ZEAL
                </span>
                <p className="text-[#a08040] text-xs tracking-[0.3em] uppercase">{content.footer.bottomMantra}</p>
              </div>
            </button>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-md">
              {content.footer.tagline}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: settings.social.instagram || '#' },
                { icon: Facebook, href: settings.social.facebook || '#' },
                { icon: Twitter, href: settings.social.twitter || '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-[#a08040] hover:text-black transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-cinzel tracking-wider mb-6">Navigate</h4>
            <ul className="space-y-3">
              {['The Hoodie', 'About ZEAL', 'Shipping Info', 'Size Guide', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={link === 'The Hoodie' ? '#product' : link === 'About ZEAL' ? '#about' : '#'}
                    className="text-white/40 hover:text-[#a08040] text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-cinzel tracking-wider mb-6">{content.footer.newsletterTitle}</h4>
            <p className="text-white/40 text-sm mb-4">
              {content.footer.newsletterText}
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-[#a08040] outline-none pr-12"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#a08040] text-black rounded hover:bg-[#c0a060] transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-green-500 text-sm mt-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Welcome to the circle
              </p>
            )}

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-white/40 hover:text-[#a08040] text-sm transition-colors">
                <Mail className="w-4 h-4" />
                {settings.email}
              </a>
              <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-white/40 hover:text-[#a08040] text-sm transition-colors">
                <Phone className="w-4 h-4" />
                {settings.phone}
              </a>
              <p className="flex items-center gap-3 text-white/40 text-sm">
                <MapPin className="w-4 h-4" />
                Cape Town, South Africa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} {settings.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* As Above So Below */}
      <div className="py-8 text-center border-t border-white/5">
        <p className="text-[#a08040]/40 font-cinzel tracking-[0.5em] text-xs uppercase">
          {content.footer.bottomMantra}
        </p>
      </div>
    </footer>
  );
}
