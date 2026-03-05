import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem, Order, StoreSettings, PaymentConfig, ShippingZone, SiteContent, Notification } from '../types';

// The ONE and ONLY ZEAL product - The Signature Hoodie
const zealHoodie: Product = {
  id: 'zeal-signature-hoodie',
  name: 'The ZEAL Hoodie',
  description: 'The first and only. The ZEAL Signature Hoodie represents the beginning of the journey. Bold occult symbolism meets premium streetwear.',
  frontImage: '/images/zeal-sigil-main.jpg',
  backImage: '/images/zeal-sigil-main.jpg',
  basePrice: 1299,
  isActive: true,
  collection: 'signature',
  features: [
    'Large ZEAL sigil print on front',
    'Large ZEAL sigil print on back',
    '"As above" text on right sleeve',
    '"So below" text on left sleeve',
    'Hidden Eye of Zeal on hood interior',
    'Premium heavyweight cotton (400gsm)',
    'Oversized fit',
    'Double-lined hood',
    'Kangaroo pocket',
    'Ribbed cuffs and hem'
  ],
  variants: [
    // Black Hoodie
    ...(['S', 'M', 'L', 'XL', 'XXL'] as const).map((size, i) => ({
      id: `zeal-hoodie-black-${size}`,
      type: 'hoodie' as const,
      color: 'black' as const,
      size,
      price: 1299,
      stock: 50 - i * 5,
      sku: `ZEL-SIG-HD-BLK-${size}`,
    })),
    // Charcoal Hoodie
    ...(['S', 'M', 'L', 'XL', 'XXL'] as const).map((size, i) => ({
      id: `zeal-hoodie-charcoal-${size}`,
      type: 'hoodie' as const,
      color: 'charcoal' as const,
      size,
      price: 1299,
      stock: 40 - i * 5,
      sku: `ZEL-SIG-HD-CHR-${size}`,
    })),
    // White Hoodie
    ...(['S', 'M', 'L', 'XL', 'XXL'] as const).map((size, i) => ({
      id: `zeal-hoodie-white-${size}`,
      type: 'hoodie' as const,
      color: 'white' as const,
      size,
      price: 1299,
      stock: 30 - i * 5,
      sku: `ZEL-SIG-HD-WHT-${size}`,
    })),
  ],
};

interface StoreState {
  // Product
  product: Product;
  updateProduct: (product: Product) => void;
  updateStock: (variantId: string, newStock: number) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  
  // UI State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Settings
  settings: StoreSettings;
  updateSettings: (settings: Partial<StoreSettings>) => void;

  // Content
  content: SiteContent;
  updateContent: (content: Partial<SiteContent>) => void;
  
  // Payment
  paymentConfig: PaymentConfig;
  updatePaymentConfig: (config: Partial<PaymentConfig>) => void;
  
  // Shipping
  shippingZones: ShippingZone[];
  updateShippingZones: (zones: ShippingZone[]) => void;
  calculateShipping: (country: string, subtotal: number) => number;
  
  // Analytics
  trackEvent: (event: string, data?: Record<string, any>) => void;
}

const defaultSettings: StoreSettings = {
  name: 'ZEAL',
  description: 'New World Disorder',
  email: 'contact@zeal.store',
  phone: '+27 11 123 4567',
  currency: 'ZAR',
  social: {
    instagram: '@zeal.arcana',
    facebook: 'zeal.arcana',
    twitter: '@zeal_arcana',
    tiktok: '@zeal.arcana',
  },
  analytics: {
    googleAnalytics: '',
    facebookPixel: '',
  },
  seo: {
    title: 'ZEAL | New World Disorder',
    description: 'The first and only. Premium occult streetwear featuring the ZEAL sigil.',
    keywords: 'zeal, hoodie, occult, streetwear, new world disorder, signature',
  },
};

const defaultPaymentConfig: PaymentConfig = {
  stripe: {
    enabled: false,
    publicKey: '',
    secretKey: '',
    testMode: true,
  },
  paypal: {
    enabled: false,
    clientId: '',
    testMode: true,
  },
  payfast: {
    enabled: false,
    merchantId: '',
    merchantKey: '',
    passphrase: '',
    testMode: true,
  },
};

const defaultContent: SiteContent = {
  hero: {
    badge: 'The First And Only',
    title: 'ZEAL',
    subtitle: 'The First And Only',
    mantra: 'As Above • So Below',
    ctaLabel: 'View The Hoodie',
  },
  about: {
    eyebrow: 'The Philosophy',
    title: 'More Than Apparel',
    paragraph1:
      'ZEAL begins with a single garment—a hoodie that embodies everything we stand for. It is not merely clothing; it is a statement of intent, a wearable philosophy.',
    paragraph2:
      'Every element has meaning. The sigil that commands the front and back represents the eternal flame of consciousness. The words on each sleeve remind us of the Hermetic principle that governs all things: As above, so below.',
    paragraph3:
      'And then there is the secret—the Eye of Zeal that only reveals itself when you pull up the hood. A symbol of awareness, watching from within. Known only to those who dare to look closer.',
    quote: 'We do not create clothing. We create artifacts for the modern mystic.',
  },
  footer: {
    tagline: 'New World Disorder. The ZEAL Signature Hoodie - premium streetwear for those who see beyond the veil.',
    newsletterTitle: 'Join The Circle',
    newsletterText: 'Be the first to know about new releases and exclusive drops.',
    bottomMantra: 'As Above • So Below',
  },
};

const defaultShippingZones: ShippingZone[] = [
  {
    id: 'south-africa',
    name: 'South Africa',
    countries: ['ZA'],
    baseRate: 89,
    freeThreshold: 1500,
  },
  {
    id: 'international',
    name: 'International',
    countries: ['*'],
    baseRate: 450,
    freeThreshold: 3000,
  },
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      product: zealHoodie,
      updateProduct: (product) => set({ product }),
      
      updateStock: (variantId, newStock) => set((state) => ({
        product: {
          ...state.product,
          variants: state.product.variants.map((v) =>
            v.id === variantId ? { ...v, stock: Math.max(0, newStock) } : v
          ),
        },
      })),
      
      cart: [],
      addToCart: (item) => set((state) => {
        const existing = state.cart.find((i) => i.variant.id === item.variant.id);
        if (existing) {
          return {
            cart: state.cart.map((i) =>
              i.variant.id === item.variant.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }
        return { cart: [...state.cart, item] };
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((i) => i.variant.id !== id),
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: quantity <= 0
          ? state.cart.filter((i) => i.variant.id !== id)
          : state.cart.map((i) =>
              i.variant.id === id ? { ...i, quantity } : i
            ),
      })),
      clearCart: () => set({ cart: [] }),
      cartTotal: () => {
        const state = get();
        return state.cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
      },
      cartCount: () => {
        const state = get();
        return state.cart.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      orders: [],
      addOrder: (order) => set((state) => ({
        orders: [order, ...state.orders],
      })),
      updateOrder: (order) => set((state) => ({
        orders: state.orders.map((o) => o.id === order.id ? order : o),
      })),
      getOrderById: (id) => {
        const state = get();
        return state.orders.find((o) => o.id === id);
      },
      
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
          },
          ...state.notifications,
        ].slice(0, 50), // Keep only last 50
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),
      clearNotifications: () => set({ notifications: [] }),
      
      settings: defaultSettings,
      updateSettings: (settings) => set((state) => ({
        settings: { ...state.settings, ...settings },
      })),

      content: defaultContent,
      updateContent: (content) => set((state) => ({
        content: {
          ...state.content,
          ...content,
          hero: { ...state.content.hero, ...(content.hero || {}) },
          about: { ...state.content.about, ...(content.about || {}) },
          footer: { ...state.content.footer, ...(content.footer || {}) },
        },
      })),
      
      paymentConfig: defaultPaymentConfig,
      updatePaymentConfig: (config) => set((state) => ({
        paymentConfig: { ...state.paymentConfig, ...config },
      })),
      
      shippingZones: defaultShippingZones,
      updateShippingZones: (zones) => set({ shippingZones: zones }),
      calculateShipping: (country, subtotal) => {
        const state = get();
        const zone = state.shippingZones.find((z) => 
          z.countries.includes(country) || z.countries.includes('*')
        );
        if (!zone) return 0;
        if (subtotal >= zone.freeThreshold) return 0;
        return zone.baseRate;
      },
      
      trackEvent: (event, data) => {
        // Analytics tracking
        console.log('[Analytics]', event, data);
        // Could integrate with Google Analytics, Mixpanel, etc.
      },
    }),
    {
      name: 'zeal-store-v2',
      partialize: (state) => ({
        cart: state.cart,
        orders: state.orders,
        settings: state.settings,
        content: state.content,
        paymentConfig: state.paymentConfig,
        shippingZones: state.shippingZones,
      }),
    }
  )
);
