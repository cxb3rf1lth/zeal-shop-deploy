export interface Product {
  id: string;
  name: string;
  description: string;
  frontImage: string;
  backImage: string;
  basePrice: number;
  variants: ProductVariant[];
  isActive: boolean;
  collection: 'signature';
  features: string[];
}

export interface ProductVariant {
  id: string;
  type: 'hoodie';
  color: 'black' | 'white' | 'charcoal';
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  price: number;
  stock: number;
  sku: string;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  paymentMethod: 'stripe' | 'paypal' | 'payfast';
  total: number;
  shipping: number;
  createdAt: string;
  notes?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface StoreSettings {
  name: string;
  description: string;
  email: string;
  phone: string;
  currency: string;
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
  };
  analytics: {
    googleAnalytics?: string;
    facebookPixel?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface SiteContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    mantra: string;
    ctaLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    quote: string;
  };
  footer: {
    tagline: string;
    newsletterTitle: string;
    newsletterText: string;
    bottomMantra: string;
  };
}

export interface PaymentConfig {
  stripe: {
    enabled: boolean;
    publicKey: string;
    secretKey: string;
    testMode: boolean;
  };
  paypal: {
    enabled: boolean;
    clientId: string;
    testMode: boolean;
  };
  payfast: {
    enabled: boolean;
    merchantId: string;
    merchantKey: string;
    passphrase: string;
    testMode: boolean;
  };
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  baseRate: number;
  freeThreshold: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  duration?: number;
}
