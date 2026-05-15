"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShoppingCart, Truck, ChevronRight, PackageCheck, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { calculateItemTotal, getApplicableTier } from "@/lib/pricing";
import { useCartStore } from "@/store/cartStore";
import { useTradeStore } from "@/store/tradeStore";
import ProductImage from "@/components/shop/ProductImage";
import PricingTierTable from "@/components/product/PricingTierTable";
import VariantSelector from "@/components/product/VariantSelector";
import QuantitySelector from "@/components/product/QuantitySelector";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();

  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  const isTradeMode = useTradeStore((state) => state.isTradeMode);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const activeTier = useMemo(() => {
    return getApplicableTier(product.pricingTiers, quantity);
  }, [product.pricingTiers, quantity]);

  const total = useMemo(() => {
    return calculateItemTotal(activeTier, quantity, isTradeMode);
  }, [activeTier, quantity, isTradeMode]);

  const nextTier = product.pricingTiers.find((tier) => tier.minQty > quantity);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Modern Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500">
          <Link href="/" className="transition-colors hover:text-green-600">Home</Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link href="/shop" className="transition-colors hover:text-green-600">Shop</Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="font-bold text-slate-900">{product.name}</span>
        </nav>

        <Link
          href="/shop"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-green-600"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to shop
        </Link>

        {/* Main Product Layout (Sticky Left, Scrolling Right) */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          
          {/* LEFT COLUMN: Sticky Image & Trust Badges */}
          <div className="sticky top-28 space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-sm">
              <ProductImage
                src={product.image}
                alt={product.name}
                emoji={product.emoji}
                className="h-[400px] w-full rounded-3xl bg-slate-50 object-cover md:h-[500px]"
              />
            </div>

            {/* Premium Minimal Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <Truck className="mb-2 text-green-600" size={20} />
                <p className="text-xs font-black text-slate-900">Next-Day</p>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500">UK Delivery</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <ShieldCheck className="mb-2 text-green-600" size={20} />
                <p className="text-xs font-black text-slate-900">Quality</p>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500">Guaranteed</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <PackageCheck className="mb-2 text-green-600" size={20} />
                <p className="text-xs font-black text-slate-900">In Stock</p>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500">Ready to Ship</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details & Cart Controls */}
          <div className="flex flex-col">
            
            {/* Badges & Title */}
            <div className="mb-6">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-slate-900 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                  {product.category}
                </span>

                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md border border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-green-700"
                  >
                    {badge}
                  </span>
                ))}

                {isTradeMode && (
                  <span className="rounded-md border border-emerald-200 bg-emerald-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-800">
                    Trade Mode Active
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-3 text-sm">
                <span className="font-semibold text-slate-500">SKU:</span>
                <span className="rounded bg-slate-200 px-2 py-0.5 font-bold text-slate-700">{product.sku}</span>
              </div>
            </div>

            <p className="mb-8 text-base leading-relaxed text-slate-600">
              {product.description}
            </p>

            {/* Modern Pricing Card */}
            <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Current Price
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-5xl font-black tracking-tight text-slate-900">
                  £{(isTradeMode ? activeTier.tradePricePerPack : activeTier.pricePerPack).toFixed(2)}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  / {activeTier.unitLabel}
                </span>

                {isTradeMode && (
                  <span className="ml-3 text-sm font-bold text-slate-400 line-through">
                    £{activeTier.pricePerPack.toFixed(2)}
                  </span>
                )}
              </div>

              {nextTier && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-600" />
                  <p className="text-sm font-semibold text-slate-700">
                    Add <span className="font-black text-slate-900">{nextTier.minQty - quantity}</span> more to unlock the bulk price of <span className="font-black text-green-700">£{(isTradeMode ? nextTier.tradePricePerPack : nextTier.pricePerPack).toFixed(2)}</span> per {activeTier.unitLabel}.
                  </p>
                </div>
              )}
            </div>

            {/* Product Options (Variants & Tiers) */}
            <div className="mb-8 space-y-8">
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onChange={setSelectedVariant}
              />

              <PricingTierTable
                tiers={product.pricingTiers}
                quantity={quantity}
              />

              {/* Quantity & Total Box */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                  total={total}
                  unitLabel={activeTier.unitLabel}
                />
              </div>
            </div>

            {/* Massive CTA Button */}
            <button
              onClick={handleAddToCart}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-5 text-lg font-black text-white shadow-xl shadow-green-600/20 transition-all hover:-translate-y-1 hover:bg-green-700 hover:shadow-2xl hover:shadow-green-700/30 active:translate-y-0"
            >
              <ShoppingCart size={22} className="transition-transform group-hover:scale-110" />
              Add to Cart — £{total.toFixed(2)}
            </button>
          </div>
        </div>

        {/* Clean Line Separator */}
        <hr className="my-16 border-slate-200 md:my-24" />

        {/* Technical Specifications - Modern Table/List Layout */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-4xl">
              Product Specifications
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Technical details and measurements for {product.name}
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div 
                key={key} 
                className={`flex flex-col sm:flex-row sm:items-center p-5 transition-colors hover:bg-slate-50 ${
                  index !== 0 ? "border-t border-slate-100" : ""
                }`}
              >
                <div className="w-full sm:w-1/3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {key}
                  </p>
                </div>
                <div className="w-full sm:w-2/3 mt-1 sm:mt-0">
                  <p className="text-sm font-black text-slate-900">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}