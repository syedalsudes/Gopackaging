"use client";

import Link from "next/link";
import { ShoppingCart, Leaf } from "lucide-react";
import { Product } from "@/types";
import { useTradeStore } from "@/store/tradeStore";
import { useCartStore } from "@/store/cartStore";
import { getSavingsPercentage } from "@/lib/pricing";
import ProductImage from "./ProductImage";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isTradeMode = useTradeStore((state) => state.isTradeMode);
  const addItem = useCartStore((state) => state.addItem);

  const firstTier = product.pricingTiers[0];
  const defaultVariant = product.variants[0];

  const activePrice = isTradeMode
    ? firstTier.tradePricePerPack
    : firstTier.pricePerPack;

  const saving = getSavingsPercentage(
    firstTier.pricePerPack,
    firstTier.tradePricePerPack
  );

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, defaultVariant, 1);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-xl"
    >
      {/* 1. Image Section - Badges overlayed for a cleaner look */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <ProductImage
          src={product.image}
          alt={product.name}
          emoji={product.emoji}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Product Badge (Top Left) */}
        {product.badges?.[0] && (
          <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {product.badges[0]}
          </span>
        )}

        {/* Eco Badge (Top Right) */}
        {product.isEco && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-100/90 px-2.5 py-1 text-[10px] font-bold text-green-700 shadow-sm backdrop-blur-sm">
            <Leaf size={12} strokeWidth={2.5} />
            ECO
          </span>
        )}
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-1 flex-col p-5">
        
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="mb-4 text-base font-bold leading-tight text-slate-900 line-clamp-2">
          {product.name}
        </h3>

        {/* 3. Pricing & Button Section */}
        <div className="mt-auto flex flex-col gap-4">
          
          <div className="flex items-end justify-between">
            <div>
              <p className="mb-0.5 text-xs font-medium text-slate-500">From</p>
              <div className="flex items-baseline gap-2">
                {/* Changed to green-600 */}
                <span className="text-xl font-black text-green-600">
                  £{activePrice.toFixed(2)}
                </span>
                {isTradeMode && (
                  <span className="text-sm font-medium text-slate-400 line-through">
                    £{firstTier.pricePerPack.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-[11px] text-slate-400">{firstTier.unitLabel}</p>
            </div>

            {/* Trade saving */}
            {isTradeMode && (
              <div className="rounded-lg bg-emerald-50 px-2 py-1 text-right">
                <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                  Save
                </p>
                <p className="text-xs font-black text-emerald-700">{saving}%</p>
              </div>
            )}
          </div>

          {/* Elegant Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition-all duration-200 hover:bg-green-600 hover:text-white hover:shadow-md"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
}