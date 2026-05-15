"use client";

import Link from "next/link";
import { Package, Search, ShoppingCart, Menu, X, User, Truck, BadgePoundSterling, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useTradeStore } from "@/store/tradeStore";
import { categories } from "@/data/products";
import Image from "next/image";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useCartStore((state) => state.items);
  const { isTradeMode, toggleTradeMode } = useTradeStore();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* 1. Premium Offer Bar (Non-Sticky - Scrolls away) */}
      <div className="bg-white px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-slate-900 shadow-sm">
        £15 Off Any Order Over £150 — Use Code <span className="font-bold text-green-400">15% OFF</span> At Checkout
      </div>

      {/* STICKY HEADER WRAPPER STARTS HERE */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm relative">

        {/* 2. Main Header */}
        <div className="border-b border-slate-100 px-4 py-2">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">

            {/* Search */}
            <div className="hidden w-[260px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 transition-all focus-within:border-green-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/10 lg:flex">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <Search size={16} className="text-slate-400" />
            </div>

            <Link href="/" className="select-none">
              <Image
                src="/logo.png"
                alt="GoPackaging"
                width={200}
                height={40}
                priority={true} /* Ye LCP aur "loading=eager" wali warning door karega */
                style={{ width: "auto", height: "auto" }} /* Ye aspect ratio wali warning door karega */
              />
            </Link>

            {/* Right Actions */}
            <div className="hidden items-center gap-4 md:flex">

              <button className="group flex items-center gap-2 text-left transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 group-hover:bg-green-50 group-hover:text-green-600">
                  <User size={18} />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-green-600 leading-none">Sign In</p>
                </div>
              </button>

              <Link href="/cart" className="group flex items-center gap-2 text-left transition-colors">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 group-hover:bg-green-50 group-hover:text-green-600">
                  <ShoppingCart size={18} />
                  {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-green-600 px-1 text-[9px] font-bold text-white shadow-sm">
                      {itemCount}
                    </span>
                  )}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-green-600 leading-none">Basket</p>
                </div>
              </Link>

              {/* Trade Toggle */}
              <div className="ml-2 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 pr-3 shadow-sm">
                <button
                  onClick={toggleTradeMode}
                  className={`relative h-5 w-9 rounded-full shadow-inner transition-colors duration-300 ${isTradeMode ? "bg-green-600" : "bg-slate-300"
                    }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${isTradeMode ? "left-4.5" : "left-0.5"
                      }`}
                  />
                </button>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isTradeMode ? "text-green-600" : "text-slate-500"
                  }`}>
                  Trade
                </span>
              </div>
            </div>

            {/* Mobile Right */}
            <div className="flex items-center gap-4 md:hidden">
              <Link href="/cart" className="relative text-slate-700 hover:text-green-600">
                <ShoppingCart size={24} strokeWidth={2.5} />
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-green-600 px-1 text-[9px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-slate-700 hover:text-green-600"
              >
                {mobileOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Category Nav */}
        <nav className="hidden border-b border-slate-100 bg-white px-4 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 overflow-x-auto py-2 text-[12px] font-bold text-slate-600">
            {categories.slice(0, 8).map((category) => (
              <Link key={category} href="/shop" className="whitespace-nowrap hover:text-green-600">
                {category}
              </Link>
            ))}
            <div className="h-3 w-px bg-slate-300"></div>
            <Link href="/shop" className="whitespace-nowrap text-green-700 hover:text-green-600">
              Box Calculator
            </Link>
          </div>
        </nav>

        {/* ========================================= */}
        {/* MOBILE MENU CONTENT - WAPAS AA GAYA HAI */}
        {/* ========================================= */}
        {mobileOpen && (
          <div className="absolute left-0 top-full w-full border-b border-slate-200 bg-white px-5 py-6 shadow-xl md:hidden">

            {/* Mobile Search */}
            <div className="mb-6 flex items-center rounded-full border border-slate-300 bg-slate-50 px-4 py-2 focus-within:border-green-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/10">
              <input
                type="text"
                placeholder="Search products"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
              <Search size={18} className="text-slate-400" />
            </div>

            {/* Mobile Trade Toggle */}
            <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-100 shadow-sm">
              <span className={`text-sm font-bold ${!isTradeMode ? 'text-slate-900' : 'text-slate-500'}`}>Standard Pricing</span>
              <button
                onClick={toggleTradeMode}
                className={`relative h-6 w-11 rounded-full shadow-inner transition-colors duration-300 ${isTradeMode ? "bg-green-600" : "bg-slate-300"
                  }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${isTradeMode ? "left-6" : "left-1"
                    }`}
                />
              </button>
              <span className={`text-sm font-bold ${isTradeMode ? 'text-green-600' : 'text-slate-500'}`}>Trade</span>
            </div>

            {/* Mobile Links */}
            <div className="grid gap-4 text-sm font-bold text-slate-700">
              <Link onClick={() => setMobileOpen(false)} href="/" className="hover:text-green-600">Home</Link>
              <Link onClick={() => setMobileOpen(false)} href="/shop" className="hover:text-green-600">Shop All</Link>
              <div className="my-1 h-px w-full bg-slate-100"></div> {/* Separator */}
              {categories.slice(0, 6).map((category) => (
                <Link key={category} onClick={() => setMobileOpen(false)} href="/shop" className="hover:text-green-600">
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      {/* STICKY HEADER ENDS HERE */}

      {/* 4. Trust Strip (Non-Sticky - Scrolls away, reduced padding) */}
      <div className="hidden border-b border-slate-200 bg-slate-50 px-4 md:block">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 py-1.5 text-[11px] font-semibold text-slate-600">
          <div className="flex items-center justify-center gap-2">
            <Truck size={14} className="text-green-600" /> Free Delivery over £75
          </div>
          <div className="flex items-center justify-center gap-2 border-l border-r border-slate-200">
            <BadgePoundSterling size={14} className="text-green-600" /> Volume discounts
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-green-600" /> Trade pricing available
          </div>
        </div>
      </div>
    </>
  );
}