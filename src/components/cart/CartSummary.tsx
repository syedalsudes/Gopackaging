"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, RotateCcw, Truck, Lock, Building2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useTradeStore } from "@/store/tradeStore";
import { calculateCartTotals } from "@/lib/pricing";

export default function CartSummary() {
  const [couponInput, setCouponInput] = useState("");

  const { items, couponCode, discount, applyCoupon } = useCartStore();
  const isTradeMode = useTradeStore((state) => state.isTradeMode);

  const totalsBeforeCoupon = calculateCartTotals(items, isTradeMode, 0);
  const totals = calculateCartTotals(items, isTradeMode, discount);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    applyCoupon(couponInput, totalsBeforeCoupon.subtotal);
    setCouponInput("");
  };

  return (
    <div className="sticky top-28 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-8">
      <h2 className="mb-6 text-2xl font-black tracking-tight text-slate-900">
        Order Summary
      </h2>

      {/* Trade Mode Alert - Modernized */}
      {isTradeMode && (
        <div className="mb-6 flex gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
          <Building2 className="mt-0.5 shrink-0 text-green-600" size={18} />
          <p className="text-sm font-semibold leading-relaxed text-green-800">
            Trade pricing is active. Minimum checkout basket is £500 ex VAT.
          </p>
        </div>
      )}

      {/* Pricing Lines */}
      <div className="space-y-4 text-sm font-medium">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal (ex VAT)</span>
          <span className="font-bold text-slate-900">
            £{totals.subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between rounded-lg bg-green-50 px-2 py-1 text-green-700">
            <span>Discount {couponCode && <span className="font-bold uppercase">({couponCode})</span>}</span>
            <span className="font-black">-£{discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-500">
          <span>VAT (20%)</span>
          <span className="font-bold text-slate-900">
            £{totals.vat.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-slate-500">
          <span>Delivery</span>
          <span className={`font-bold ${totals.delivery === 0 ? "text-green-600 uppercase" : "text-slate-900"}`}>
            {totals.delivery === 0 ? "Free" : `£${totals.delivery.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Dashed Divider for Receipt Feel */}
      <div className="my-6 border-t border-dashed border-slate-200"></div>

      {/* Total Amount */}
      <div className="flex items-end justify-between">
        <div>
          <span className="block text-sm font-bold text-slate-500">Total</span>
          <span className="text-xs font-semibold text-slate-400">including VAT</span>
        </div>
        <span className="text-3xl font-black tracking-tight text-green-600">
          £{totals.total.toFixed(2)}
        </span>
      </div>

      {/* Modern Coupon Input (Integrated Button) */}
      <div className="mt-8">
        <label className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Promo Code
        </label>
        <div className="relative flex items-center">
          <input
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="e.g. PACK10"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-24 text-sm font-bold text-slate-900 outline-none transition-all placeholder:font-medium placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={!couponInput.trim()}
            className="absolute right-1.5 top-1.5 bottom-1.5 rounded-lg bg-slate-900 px-4 text-xs font-bold text-white transition-colors hover:bg-green-600 disabled:opacity-50 disabled:hover:bg-slate-900"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-base font-bold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl hover:shadow-green-900/20"
      >
        <Lock size={18} className="text-green-200 transition-colors group-hover:text-white" />
        Proceed to Checkout
      </Link>

      {/* Trust Badges - Cleaned up spacing */}
      <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <ShieldCheck size={14} />
          </div>
          Secure SSL encrypted checkout
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <RotateCcw size={14} />
          </div>
          Hassle-free 30 day returns
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Truck size={14} />
          </div>
          Next-day delivery available
        </div>
      </div>
    </div>
  );
}