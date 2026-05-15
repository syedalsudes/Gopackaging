"use client";

import { Truck, CheckCircle2 } from "lucide-react";

type DeliveryProgressBarProps = {
  subtotal: number;
  amountForFreeDelivery: number;
  qualifiesForFreeDelivery: boolean;
};

export default function DeliveryProgressBar({
  subtotal,
  amountForFreeDelivery,
  qualifiesForFreeDelivery,
}: DeliveryProgressBarProps) {
  const threshold = 75;
  const progress = Math.min((subtotal / threshold) * 100, 100);

  return (
    <div 
      className={`relative overflow-hidden rounded-[2rem] border p-5 sm:p-6 transition-all duration-500 ${
        qualifiesForFreeDelivery 
          ? "border-green-200 bg-green-50/80 shadow-sm" 
          : "border-slate-100 bg-white shadow-sm"
      }`}
    >
      {/* Top Section: Icon, Text & Amount Badge */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3.5">
          {/* Dynamic Icon Container */}
          <div 
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500 ${
              qualifiesForFreeDelivery 
                ? "bg-green-600 text-white shadow-md shadow-green-600/20" 
                : "bg-slate-50 border border-slate-100 text-slate-400"
            }`}
          >
            {qualifiesForFreeDelivery ? (
              <CheckCircle2 size={22} strokeWidth={2.5} />
            ) : (
              <Truck size={22} strokeWidth={2.5} />
            )}
          </div>

          <div>
            <h2 className="text-base font-black tracking-tight text-slate-900">
              Delivery Progress
            </h2>
            <p 
              className={`mt-0.5 text-sm font-bold transition-colors duration-500 ${
                qualifiesForFreeDelivery ? "text-green-700" : "text-slate-500"
              }`}
            >
              {qualifiesForFreeDelivery
                ? "Awesome! You get FREE Delivery."
                : `Add £${amountForFreeDelivery.toFixed(2)} more for free delivery.`}
            </p>
          </div>
        </div>

        {/* Amount Badge */}
        <div className="flex items-center justify-center rounded-xl border border-slate-200/60 bg-white px-3.5 py-1.5 shadow-sm">
          <span className="text-sm font-black text-slate-700">
            £{subtotal.toFixed(2)} <span className="text-slate-400">/ £75</span>
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
        {/* Animated Fill Bar */}
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out ${
            qualifiesForFreeDelivery 
              ? "bg-gradient-to-r from-green-500 to-emerald-400" 
              : "bg-gradient-to-r from-slate-300 to-slate-400"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
    </div>
  );
}