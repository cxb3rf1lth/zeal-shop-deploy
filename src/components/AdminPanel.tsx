import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  X, Lock, Eye, EyeOff, Save, Upload, AlertCircle,
  ShoppingBag, DollarSign, CheckCircle, Package, FileText, Plus, Trash2
} from 'lucide-react';
import { useStore } from '../store';
import type { PaymentConfig, StoreSettings, SiteContent } from '../types';

interface AdminPanelProps {
  onClose: () => void;
}

const ADMIN_PASSWORD = '66696';

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3 }
      );
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleClose = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      onComplete: onClose,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          onClick={handleClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#a08040]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#a08040]" />
            </div>
            <h2 className="text-2xl font-cinzel text-white mb-2">Admin Access</h2>
            <p className="text-white/40 text-sm">Enter password to continue</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-[#a08040] outline-none"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-[#8b1a1a] text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-[#a08040] text-black font-cinzel tracking-wider rounded-lg hover:bg-[#c0a060] transition-colors"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
      />
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
      >
        <AdminDashboard onClose={handleClose} />
      </div>
    </div>
  );
}

function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'product' | 'orders' | 'settings' | 'payments' | 'content'>('dashboard');
  const {
    product,
    orders,
    settings,
    content,
    paymentConfig,
    updateProduct,
    updateOrder,
    updateSettings,
    updateContent,
    updatePaymentConfig,
  } = useStore();

  // Stats
  const totalRevenue = orders.reduce((sum, o) => o.paymentStatus === 'paid' ? sum + o.total : sum, 0);
  const totalOrders = orders.length;
  const totalSold = orders.reduce((sum, o) => sum + o.items.reduce((iSum, i) => iSum + i.quantity, 0), 0);
  const lowStockVariants = product.variants.filter((v) => v.stock < 10);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <img src="/images/zeal-logo.jpg" alt="ZEAL" className="w-10 h-10 rounded-full object-cover" />
          <h2 className="text-xl font-cinzel text-white">Admin Dashboard</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 p-4 border-b border-white/10 bg-white/[0.02] overflow-x-auto">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: ShoppingBag },
          { id: 'content', label: 'Content', icon: FileText },
          { id: 'product', label: 'Product', icon: Package },
          { id: 'orders', label: 'Orders', icon: CheckCircle },
          { id: 'payments', label: 'Payments', icon: DollarSign },
          { id: 'settings', label: 'Settings', icon: Lock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-cinzel text-sm whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#a08040] text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value={`R${totalRevenue.toLocaleString()}`} icon={DollarSign} />
            <StatCard title="Total Orders" value={totalOrders.toString()} icon={ShoppingBag} />
            <StatCard title="Hoodies Sold" value={totalSold.toString()} icon={Package} />
            <StatCard 
              title="Low Stock" 
              value={lowStockVariants.length.toString()} 
              icon={AlertCircle} 
              color={lowStockVariants.length > 0 ? '#8b1a1a' : '#a08040'}
            />
            
            <div className="md:col-span-4 p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <h3 className="text-lg font-cinzel text-white mb-4">Product Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-white/40 text-sm mb-1">Product Name</p>
                  <p className="text-white font-cinzel">{product.name}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-white/40 text-sm mb-1">Base Price</p>
                  <p className="text-[#a08040] font-bold">R{product.basePrice}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-white/40 text-sm mb-1">Status</p>
                  <p className={product.isActive ? 'text-green-500' : 'text-[#8b1a1a]'}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
              
              {/* Stock by Color */}
              <div className="mt-6">
                <h4 className="text-white/60 text-sm mb-3">Stock by Color</h4>
                <div className="grid grid-cols-3 gap-4">
                  {['black', 'charcoal', 'white'].map((color) => {
                    const variants = product.variants.filter((v) => v.color === color);
                    const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
                    return (
                      <div key={color} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: color === 'charcoal' ? '#2a2a2a' : color }}
                          />
                          <span className="text-white/60 text-sm capitalize">{color}</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{totalStock}</p>
                        <p className="text-white/40 text-xs">units available</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && <ContentTab content={content} onUpdate={updateContent} />}
        {activeTab === 'product' && <ProductTab product={product} onUpdate={updateProduct} />}
        {activeTab === 'orders' && <OrdersTab orders={orders} onUpdateOrder={updateOrder} />}
        {activeTab === 'payments' && <PaymentsTab config={paymentConfig} onUpdate={updatePaymentConfig} />}
        {activeTab === 'settings' && <SettingsTab settings={settings} onUpdate={updateSettings} />}
      </div>
    </>
  );
}

function StatCard({ title, value, icon: Icon, color = '#a08040' }: { title: string; value: string; icon: any; color?: string }) {
  return (
    <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <p className="text-white/40 text-sm">{title}</p>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <p className="text-3xl font-black text-white font-cinzel">{value}</p>
    </div>
  );
}

function ContentTab({ content, onUpdate }: { content: SiteContent; onUpdate: (content: Partial<SiteContent>) => void }) {
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-cinzel text-white">Content Manager</h3>
        <button
          onClick={() => onUpdate(localContent)}
          className="px-4 py-2 bg-[#a08040] text-black rounded hover:bg-[#c0a060] flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Content
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl space-y-4">
          <h4 className="text-white font-cinzel">Hero Section</h4>
          <InputField label="Badge" value={localContent.hero.badge} onChange={(v) => setLocalContent((prev) => ({ ...prev, hero: { ...prev.hero, badge: v } }))} />
          <InputField label="Title" value={localContent.hero.title} onChange={(v) => setLocalContent((prev) => ({ ...prev, hero: { ...prev.hero, title: v } }))} />
          <InputField label="Subtitle" value={localContent.hero.subtitle} onChange={(v) => setLocalContent((prev) => ({ ...prev, hero: { ...prev.hero, subtitle: v } }))} />
          <InputField label="Mantra" value={localContent.hero.mantra} onChange={(v) => setLocalContent((prev) => ({ ...prev, hero: { ...prev.hero, mantra: v } }))} />
          <InputField label="CTA Label" value={localContent.hero.ctaLabel} onChange={(v) => setLocalContent((prev) => ({ ...prev, hero: { ...prev.hero, ctaLabel: v } }))} />
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl space-y-4">
          <h4 className="text-white font-cinzel">About Section</h4>
          <InputField label="Eyebrow" value={localContent.about.eyebrow} onChange={(v) => setLocalContent((prev) => ({ ...prev, about: { ...prev.about, eyebrow: v } }))} />
          <InputField label="Title" value={localContent.about.title} onChange={(v) => setLocalContent((prev) => ({ ...prev, about: { ...prev.about, title: v } }))} />
          <TextField label="Paragraph 1" value={localContent.about.paragraph1} onChange={(v) => setLocalContent((prev) => ({ ...prev, about: { ...prev.about, paragraph1: v } }))} />
          <TextField label="Paragraph 2" value={localContent.about.paragraph2} onChange={(v) => setLocalContent((prev) => ({ ...prev, about: { ...prev.about, paragraph2: v } }))} />
          <TextField label="Paragraph 3" value={localContent.about.paragraph3} onChange={(v) => setLocalContent((prev) => ({ ...prev, about: { ...prev.about, paragraph3: v } }))} />
          <InputField label="Quote" value={localContent.about.quote} onChange={(v) => setLocalContent((prev) => ({ ...prev, about: { ...prev.about, quote: v } }))} />
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl space-y-4">
          <h4 className="text-white font-cinzel">Footer Section</h4>
          <TextField label="Tagline" value={localContent.footer.tagline} onChange={(v) => setLocalContent((prev) => ({ ...prev, footer: { ...prev.footer, tagline: v } }))} />
          <InputField label="Newsletter Title" value={localContent.footer.newsletterTitle} onChange={(v) => setLocalContent((prev) => ({ ...prev, footer: { ...prev.footer, newsletterTitle: v } }))} />
          <TextField label="Newsletter Text" value={localContent.footer.newsletterText} onChange={(v) => setLocalContent((prev) => ({ ...prev, footer: { ...prev.footer, newsletterText: v } }))} />
          <InputField label="Bottom Mantra" value={localContent.footer.bottomMantra} onChange={(v) => setLocalContent((prev) => ({ ...prev, footer: { ...prev.footer, bottomMantra: v } }))} />
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-white/40 text-xs block mb-2">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#a08040] outline-none"
      />
    </label>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-white/40 text-xs block mb-2">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#a08040] outline-none"
      />
    </label>
  );
}

function ProductTab({ product, onUpdate }: { product: any; onUpdate: (p: any) => void }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  useEffect(() => {
    setEditedProduct({ ...product });
  }, [product]);

  const handleImageUpload = (side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setEditedProduct((prev: any) => ({
          ...prev,
          [side === 'front' ? 'frontImage' : 'backImage']: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStockChange = (variantId: string, newStock: number) => {
    setEditedProduct((prev: any) => ({
      ...prev,
      variants: prev.variants.map((v: any) =>
        v.id === variantId ? { ...v, stock: Math.max(0, newStock) } : v
      ),
    }));
  };

  const handleVariantField = (variantId: string, field: 'sku' | 'price', value: string | number) => {
    setEditedProduct((prev: any) => ({
      ...prev,
      variants: prev.variants.map((v: any) =>
        v.id === variantId
          ? {
              ...v,
              [field]: field === 'price' ? Number(value) || 0 : String(value),
            }
          : v
      ),
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setEditedProduct((prev: any) => ({
      ...prev,
      features: prev.features.map((feature: string, i: number) => (i === index ? value : feature)),
    }));
  };

  const addFeature = () => {
    setEditedProduct((prev: any) => ({
      ...prev,
      features: [...prev.features, 'New feature'],
    }));
  };

  const removeFeature = (index: number) => {
    setEditedProduct((prev: any) => ({
      ...prev,
      features: prev.features.filter((_: string, i: number) => i !== index),
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-cinzel text-white">Edit Product</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setEditedProduct({ ...product })}
            className="px-4 py-2 bg-white/5 text-white/60 rounded hover:bg-white/10"
          >
            Reset
          </button>
          <button 
            onClick={() => onUpdate(editedProduct)}
            className="px-4 py-2 bg-[#a08040] text-black rounded hover:bg-[#c0a060] flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-6">
          <div>
            <label className="text-white/40 text-sm mb-2 block">Front Image</label>
            <div className="relative aspect-square bg-[#111] rounded-lg overflow-hidden">
              <img src={editedProduct.frontImage} alt="Front" className="w-full h-full object-cover" />
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="w-8 h-8 text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('front', e)} />
              </label>
            </div>
          </div>
          <div>
            <label className="text-white/40 text-sm mb-2 block">Back Image</label>
            <div className="relative aspect-square bg-[#111] rounded-lg overflow-hidden">
              <img src={editedProduct.backImage} alt="Back" className="w-full h-full object-cover" />
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="w-8 h-8 text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('back', e)} />
              </label>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <label className="text-white/40 text-sm mb-2 block">Product Name</label>
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-[#a08040] outline-none"
            />
          </div>
          <div>
            <label className="text-white/40 text-sm mb-2 block">Price (ZAR)</label>
            <input
              type="number"
              value={editedProduct.basePrice}
              onChange={(e) => setEditedProduct({ ...editedProduct, basePrice: Number(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-[#a08040] outline-none"
            />
          </div>
          <div>
            <label className="text-white/40 text-sm mb-2 block">Description</label>
            <textarea
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-[#a08040] outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editedProduct.isActive}
              onChange={(e) => setEditedProduct({ ...editedProduct, isActive: e.target.checked })}
              className="w-4 h-4 accent-[#a08040]"
            />
            <label className="text-white/60 text-sm">Product Active</label>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-cinzel">Feature Bullets</h4>
              <button
                onClick={addFeature}
                className="px-3 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {editedProduct.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#a08040] outline-none"
                  />
                  <button
                    onClick={() => removeFeature(index)}
                    className="p-2 text-white/40 hover:text-[#8b1a1a] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Management */}
          <div className="pt-6 border-t border-white/10">
            <h4 className="text-white font-cinzel mb-4">Variant Management</h4>
            <div className="space-y-3">
              {editedProduct.variants.map((variant: any) => (
                <div key={variant.id} className="p-3 bg-white/5 rounded space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm capitalize">{variant.color} • {variant.size}</p>
                      <p className="text-white/40 text-xs">{variant.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleStockChange(variant.id, variant.stock - 1)}
                        className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white/60 hover:bg-white/20"
                      >
                        -
                      </button>
                      <span className="text-white w-10 text-center">{variant.stock}</span>
                      <button
                        onClick={() => handleStockChange(variant.id, variant.stock + 1)}
                        className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white/60 hover:bg-white/20"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="text-xs text-white/50">
                      SKU
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => handleVariantField(variant.id, 'sku', e.target.value)}
                        className="w-full mt-1 bg-black/30 border border-white/10 rounded px-2 py-2 text-white text-sm focus:border-[#a08040] outline-none"
                      />
                    </label>
                    <label className="text-xs text-white/50">
                      Price
                      <input
                        type="number"
                        value={variant.price}
                        onChange={(e) => handleVariantField(variant.id, 'price', e.target.value)}
                        className="w-full mt-1 bg-black/30 border border-white/10 rounded px-2 py-2 text-white text-sm focus:border-[#a08040] outline-none"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersTab({ orders, onUpdateOrder }: { orders: any[]; onUpdateOrder: (order: any) => void }) {
  const updateOrderField = (order: any, field: 'status' | 'paymentStatus' | 'notes', value: string) => {
    onUpdateOrder({
      ...order,
      [field]: value,
    });
  };

  return (
    <div>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-cinzel text-lg">No orders yet</p>
          <p className="text-white/30 text-sm mt-2">Orders will appear here when customers purchase</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white/40 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Notes</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5">
                  <td className="py-4 text-[#a08040]">#{order.id.slice(-8)}</td>
                  <td className="py-4 text-white">{order.customer.name}</td>
                  <td className="py-4 text-white/60">{order.items.reduce((sum: number, i: any) => sum + i.quantity, 0)} hoodie(s)</td>
                  <td className="py-4 text-white font-bold">R{order.total}</td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderField(order, 'status', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs outline-none focus:border-[#a08040]"
                    >
                      <option value="pending">pending</option>
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="py-4">
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => updateOrderField(order, 'paymentStatus', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs outline-none focus:border-[#a08040]"
                    >
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="refunded">refunded</option>
                      <option value="failed">failed</option>
                    </select>
                  </td>
                  <td className="py-4">
                    <input
                      value={order.notes || ''}
                      onChange={(e) => updateOrderField(order, 'notes', e.target.value)}
                      placeholder="Add note"
                      className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs outline-none focus:border-[#a08040]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PaymentsTab({ config, onUpdate }: { config: PaymentConfig; onUpdate: (c: Partial<PaymentConfig>) => void }) {
  const [localConfig, setLocalConfig] = useState(config);
  const [showSecrets, setShowSecrets] = useState({ stripe: false, paypal: false, payfast: false });

  return (
    <div className="space-y-6">
      {/* Stripe */}
      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-cinzel text-white">Stripe</h3>
          <div className="flex items-center gap-2">
            <label className="text-white/60 text-sm">Enabled</label>
            <input
              type="checkbox"
              checked={localConfig.stripe.enabled}
              onChange={(e) => setLocalConfig({ ...localConfig, stripe: { ...localConfig.stripe, enabled: e.target.checked } })}
              className="accent-[#a08040]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white/40 text-sm block mb-2">Public Key</label>
            <input
              type="text"
              value={localConfig.stripe.publicKey}
              onChange={(e) => setLocalConfig({ ...localConfig, stripe: { ...localConfig.stripe, publicKey: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#a08040] outline-none"
            />
          </div>
          <div>
            <label className="text-white/40 text-sm block mb-2">Secret Key</label>
            <div className="relative">
              <input
                type={showSecrets.stripe ? 'text' : 'password'}
                value={localConfig.stripe.secretKey}
                onChange={(e) => setLocalConfig({ ...localConfig, stripe: { ...localConfig.stripe, secretKey: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#a08040] outline-none"
              />
              <button
                onClick={() => setShowSecrets({ ...showSecrets, stripe: !showSecrets.stripe })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
              >
                {showSecrets.stripe ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PayPal */}
      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-cinzel text-white">PayPal</h3>
          <div className="flex items-center gap-2">
            <label className="text-white/60 text-sm">Enabled</label>
            <input
              type="checkbox"
              checked={localConfig.paypal.enabled}
              onChange={(e) => setLocalConfig({ ...localConfig, paypal: { ...localConfig.paypal, enabled: e.target.checked } })}
              className="accent-[#a08040]"
            />
          </div>
        </div>
        <div>
          <label className="text-white/40 text-sm block mb-2">Client ID</label>
          <div className="relative">
            <input
              type={showSecrets.paypal ? 'text' : 'password'}
              value={localConfig.paypal.clientId}
              onChange={(e) => setLocalConfig({ ...localConfig, paypal: { ...localConfig.paypal, clientId: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#a08040] outline-none"
            />
            <button
              onClick={() => setShowSecrets({ ...showSecrets, paypal: !showSecrets.paypal })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
            >
              {showSecrets.paypal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* PayFast */}
      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-cinzel text-white">PayFast</h3>
          <div className="flex items-center gap-2">
            <label className="text-white/60 text-sm">Enabled</label>
            <input
              type="checkbox"
              checked={localConfig.payfast.enabled}
              onChange={(e) => setLocalConfig({ ...localConfig, payfast: { ...localConfig.payfast, enabled: e.target.checked } })}
              className="accent-[#a08040]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-white/40 text-sm block mb-2">Merchant ID</label>
            <input
              type="text"
              value={localConfig.payfast.merchantId}
              onChange={(e) => setLocalConfig({ ...localConfig, payfast: { ...localConfig.payfast, merchantId: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#a08040] outline-none"
            />
          </div>
          <div>
            <label className="text-white/40 text-sm block mb-2">Merchant Key</label>
            <div className="relative">
              <input
                type={showSecrets.payfast ? 'text' : 'password'}
                value={localConfig.payfast.merchantKey}
                onChange={(e) => setLocalConfig({ ...localConfig, payfast: { ...localConfig.payfast, merchantKey: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#a08040] outline-none"
              />
              <button
                onClick={() => setShowSecrets({ ...showSecrets, payfast: !showSecrets.payfast })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
              >
                {showSecrets.payfast ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-white/40 text-sm block mb-2">Passphrase</label>
            <input
              type="password"
              value={localConfig.payfast.passphrase}
              onChange={(e) => setLocalConfig({ ...localConfig, payfast: { ...localConfig.payfast, passphrase: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-[#a08040] outline-none"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => onUpdate(localConfig)}
        className="px-6 py-3 bg-[#a08040] text-black font-cinzel tracking-wider rounded hover:bg-[#c0a060] transition-colors"
      >
        Save Payment Settings
      </button>
    </div>
  );
}

function SettingsTab({ settings, onUpdate }: { settings: StoreSettings; onUpdate: (s: Partial<StoreSettings>) => void }) {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-white/40 text-sm block mb-2">Store Name</label>
          <input
            type="text"
            value={localSettings.name}
            onChange={(e) => setLocalSettings({ ...localSettings, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-[#a08040] outline-none"
          />
        </div>
        <div>
          <label className="text-white/40 text-sm block mb-2">Email</label>
          <input
            type="email"
            value={localSettings.email}
            onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-[#a08040] outline-none"
          />
        </div>
        <div>
          <label className="text-white/40 text-sm block mb-2">Phone</label>
          <input
            type="tel"
            value={localSettings.phone}
            onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-[#a08040] outline-none"
          />
        </div>
        <div>
          <label className="text-white/40 text-sm block mb-2">Currency</label>
          <select
            value={localSettings.currency}
            onChange={(e) => setLocalSettings({ ...localSettings, currency: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-[#a08040] outline-none"
          >
            <option value="ZAR">ZAR - South African Rand</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-white/40 text-sm block mb-2">Description</label>
        <textarea
          value={localSettings.description}
          onChange={(e) => setLocalSettings({ ...localSettings, description: e.target.value })}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:border-[#a08040] outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
        <InputField
          label="Instagram"
          value={localSettings.social.instagram || ''}
          onChange={(value) =>
            setLocalSettings((prev) => ({ ...prev, social: { ...prev.social, instagram: value } }))
          }
        />
        <InputField
          label="Facebook"
          value={localSettings.social.facebook || ''}
          onChange={(value) =>
            setLocalSettings((prev) => ({ ...prev, social: { ...prev.social, facebook: value } }))
          }
        />
        <InputField
          label="Twitter/X"
          value={localSettings.social.twitter || ''}
          onChange={(value) =>
            setLocalSettings((prev) => ({ ...prev, social: { ...prev.social, twitter: value } }))
          }
        />
        <InputField
          label="TikTok"
          value={localSettings.social.tiktok || ''}
          onChange={(value) =>
            setLocalSettings((prev) => ({ ...prev, social: { ...prev.social, tiktok: value } }))
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/10">
        <InputField
          label="SEO Title"
          value={localSettings.seo.title}
          onChange={(value) =>
            setLocalSettings((prev) => ({ ...prev, seo: { ...prev.seo, title: value } }))
          }
        />
        <TextField
          label="SEO Description"
          value={localSettings.seo.description}
          onChange={(value) =>
            setLocalSettings((prev) => ({ ...prev, seo: { ...prev.seo, description: value } }))
          }
        />
        <InputField
          label="SEO Keywords"
          value={localSettings.seo.keywords}
          onChange={(value) =>
            setLocalSettings((prev) => ({ ...prev, seo: { ...prev.seo, keywords: value } }))
          }
        />
      </div>

      <button
        onClick={() => onUpdate(localSettings)}
        className="px-6 py-3 bg-[#a08040] text-black font-cinzel tracking-wider rounded hover:bg-[#c0a060] transition-colors"
      >
        Save Settings
      </button>
    </div>
  );
}
