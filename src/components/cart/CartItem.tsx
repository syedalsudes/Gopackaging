"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { calculateItemTotal, getApplicableTier } from "@/lib/pricing";
import { useCartStore } from "@/store/cartStore";
import { useTradeStore } from "@/store/tradeStore";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const isTradeMode = useTradeStore((state) => state.isTradeMode);

  const tier = getApplicableTier(item.product.pricingTiers, item.quantity);
  const unitPrice = isTradeMode ? tier.tradePricePerPack : tier.pricePerPack;
  const lineTotal = calculateItemTotal(tier, item.quantity, isTradeMode);

  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-green-100 hover:shadow-md sm:flex-row sm:items-center">
      
      {/* 1. Image/Emoji Container - Reduced size (h-20) to save height */}
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-4xl shadow-inner transition-colors group-hover:bg-green-50">
        {item.product.emoji}
      </div>

      {/* 2. Main Content Area */}
      <div className="flex flex-1 flex-col justify-between gap-3">
        
        {/* Top Row: Info & Remove Button */}
        <div className="flex items-start justify-between gap-3">
          <div>
            {/* Category & Title */}
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-green-600">
              {item.product.category}
            </p>
            <h3 className="text-base font-bold leading-tight text-slate-900 line-clamp-1">
              {item.product.name}
            </h3>
            
            {/* Badges Row - Compact display */}
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-medium text-slate-500">
                Variant: <span className="font-bold text-slate-700">{item.selectedVariant.name}</span>
              </p>
              
              <span className="rounded-md bg-green-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-green-700">
                Vol. Discount: {tier.minQty}{tier.maxQty ? `-${tier.maxQty}` : "+"}
              </span>
            </div>
          </div>

          {/* Remove Button - Subtle design until hovered */}
          <button
            onClick={() => removeItem(item.product.id, item.selectedVariant.value)}
            className="shrink-0 rounded-full p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Bottom Row: Quantity & Price */}
        <div className="flex items-end justify-between">
          
          {/* Sleek Quantity Selector */}
          <div className="flex h-9 w-fit items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 shadow-inner">
            <button
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.selectedVariant.value,
                  item.quantity - 1
                )
              }
              className="flex h-full w-9 items-center justify-center text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
            >
              <Minus size={14} strokeWidth={2.5} />
            </button>

            <input
              type="string"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(
                  item.product.id,
                  item.selectedVariant.value,
                  Math.max(1, Number(e.target.value))
                )
              }
              className="h-full w-12 bg-white text-center text-xs font-black text-slate-900 outline-none"
            />

            <button
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.selectedVariant.value,
                  item.quantity + 1
                )
              }
              className="flex h-full w-9 items-center justify-center text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Pricing Info */}
          <div className="text-right">
            <p className="text-[11px] font-medium text-slate-500">
              £{unitPrice.toFixed(2)} {tier.unitLabel}
            </p>

            {/* Total Line Price */}
            <div className="flex items-center justify-end gap-2">
              {isTradeMode && (
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-700">
                  Trade
                </span>
              )}
              <p className="text-lg font-black text-slate-900">
                £{lineTotal.toFixed(2)}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}