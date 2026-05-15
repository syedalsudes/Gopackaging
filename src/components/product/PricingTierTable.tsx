"use client";

import { PricingTier } from "@/types";
import { getApplicableTier } from "@/lib/pricing";
import { useTradeStore } from "@/store/tradeStore";
import { CheckCircle2, TrendingDown, Star } from "lucide-react";

type PricingTierTableProps = {
  tiers: PricingTier[];
  quantity: number;
};

export default function PricingTierTable({
  tiers,
  quantity,
}: PricingTierTableProps) {
  const isTradeMode = useTradeStore((state) => state.isTradeMode);
  const activeTier = getApplicableTier(tiers, quantity);
  const firstTier = tiers[0];

  const getQtyLabel = (tier: PricingTier) => {
    if (tier.maxQty === null) return `${tier.minQty}+`;
    return `${tier.minQty} - ${tier.maxQty}`;
  };

  const getPrice = (tier: PricingTier) => {
    return isTradeMode ? tier.tradePricePerPack : tier.pricePerPack;
  };

  const getSavingVsFirstTier = (tier: PricingTier) => {
    const basePrice = getPrice(firstTier);
    const currentPrice = getPrice(tier);

    if (basePrice <= currentPrice) return 0;

    return Math.round(((basePrice - currentPrice) / basePrice) * 100);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      
      {/* Header Section */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-900">
            Volume Pricing Tiers
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Buy more, save more. Prices update automatically.
          </p>
        </div>

        {isTradeMode && (
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 shadow-sm">
            <CheckCircle2 size={14} />
            Trade Active
          </span>
        )}
      </div>

      {/* Pricing Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4">Quantity</th>
              <th className="px-5 py-4">Price / Pack</th>
              <th className="hidden px-5 py-4 sm:table-cell">Per Unit</th>
              <th className="px-5 py-4">You Save</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tiers.map((tier) => {
              const isActive =
                tier.minQty === activeTier.minQty &&
                tier.maxQty === activeTier.maxQty;

              const price = getPrice(tier);
              const saving = getSavingVsFirstTier(tier);

              return (
                <tr
                  key={`${tier.minQty}-${tier.maxQty}`}
                  className={`transition-all duration-200 ${
                    isActive 
                      ? "bg-green-50/50 shadow-[inset_3px_0_0_0_#16a34a]" // Left green border effect for active tier
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  {/* Quantity Column */}
                  <td className="px-5 py-4 sm:py-5">
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-base font-black ${
                            isActive ? "text-green-700" : "text-slate-900"
                          }`}
                        >
                          {getQtyLabel(tier)}
                        </span>
                        
                        {isActive && (
                          <span className="flex items-center rounded-full bg-green-100 p-0.5 text-green-600">
                            <CheckCircle2 size={14} />
                          </span>
                        )}
                      </div>

                      {tier.isPopular && (
                        <span className="flex items-center gap-1 rounded-md bg-slate-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                          <Star size={10} className="fill-white" />
                          Best Value
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Price Column */}
                  <td className="px-5 py-4 sm:py-5">
                    <div className="flex flex-col">
                      <span className="text-lg font-black tracking-tight text-slate-900">
                        £{price.toFixed(2)}
                      </span>

                      {isTradeMode && (
                        <span className="mt-0.5 text-[11px] font-bold text-slate-400 line-through">
                          £{tier.pricePerPack.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Unit Label Column */}
                  <td className="hidden px-5 py-4 text-xs font-semibold text-slate-500 sm:py-5 sm:table-cell">
                    {tier.unitLabel}
                  </td>

                  {/* Saving Column */}
                  <td className="px-5 py-4 sm:py-5">
                    {saving > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700">
                        <TrendingDown size={14} />
                        {saving}% OFF
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        Base Price
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Helper Note */}
      <p className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        The highlighted row updates automatically based on your current quantity.
      </p>
    </div>
  );
}