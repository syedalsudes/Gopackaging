"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-green-700 via-green-600 to-emerald-500 py-16 md:py-20 lg:py-24">
      
      {/* Decorative Glows (Background me halki si roshni) */}
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[100px]"></div>
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]"></div>

      {/* 2. Compact Container (Width control ki hai taake text edges tak na jaye) */}
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* LEFT COLUMN: Tameez dar (Compact) Typography */}
          <div className="max-w-xl">
            {/* Welcome Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-green-300 shadow-sm backdrop-blur-md">
              <span>Welcome to GoPackaging</span>
            </div>

            {/* Main Headline - Font chota aur neat kiya hai */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Packaging that works <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">as hard as you do.</span>
            </h1>

            {/* Description - Max-width aur size kam kiya hai */}
            <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              Browse cardboard boxes, bubble wrap, mailing bags, pallet wrap,
              printed packaging and warehouse supplies with smart volume pricing
              and trade discounts.
            </p>

            {/* Action Buttons - Compact padding and sizing */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-green-400 hover:shadow-green-500/25 active:scale-95"
              >
                Shop All Products
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 active:scale-95"
              >
                View Trade Pricing
              </Link>
            </div>

            {/* Clean & Compact Stats Row */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <div className="text-2xl font-black tracking-tight text-white">2,500<span className="text-green-400">+</span></div>
                <div className="mt-1 text-xs font-medium text-slate-400">Packaging products</div>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight text-white">99.2<span className="text-green-400">%</span></div>
                <div className="mt-1 text-xs font-medium text-slate-400">On-time dispatch</div>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight text-white"><span className="text-green-400">£</span>500</div>
                <div className="mt-1 text-xs font-medium text-slate-400">Unlocks trade mode</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Neat Video Box */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* The Video Container - Aspect ratio set for perfect balance */}
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl shadow-black/50 lg:aspect-square">
              <video
                src="/Videos/herosection.mp4"
                autoPlay
                muted
                loop
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}