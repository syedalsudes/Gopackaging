"use client";

import Link from "next/link";
import { Package, Mail, Phone, ArrowRight } from "lucide-react";


export const InstagramIcon = ({ size = 24, className = "" }: { size?: number | string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

export const TwitterIcon = ({ size = 24, className = "" }: { size?: number | string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export const FacebookIcon = ({ size = 24, className = "" }: { size?: number | string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export const LinkedinIcon = ({ size = 24, className = "" }: { size?: number | string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-green-900 pb-10 pt-16 text-slate-400 md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 1. Top Newsletter Section - Modern Pre-footer */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 rounded-3xl border border-slate-800 bg-green-800 p-8 md:flex-row md:items-center lg:p-12 shadow-2xl shadow-black/50">
          <div className="max-w-md">
            <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
              Join our newsletter
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Get exclusive trade discounts, new product alerts, and smart packaging tips delivered right to your inbox.
            </p>
          </div>

          {/* Realistic Input Field */}
          <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-slate-800 bg-green-950 p-1.5 transition-all focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/10">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full bg-transparent px-4 py-2 text-sm font-medium text-white outline-none placeholder:text-slate-600"
            />
            <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition-all hover:bg-green-500 hover:shadow-lg hover:shadow-green-600/20">
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* 2. Main Links Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 xl:gap-16">

          {/* Brand & Contact (Takes 2 cols on large screens) */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                <Package size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                GoPackaging
              </span>
            </Link>

            <p className="mb-8 max-w-sm text-sm leading-relaxed">
              UK&apos;s premium packaging supplier for e-commerce, retail, and trade. We deliver quality materials that protect your products and elevate your brand.
            </p>

            {/* Real-world Contact Details */}
            <div className="space-y-4 text-sm font-medium">
              <a href="mailto:support@gopackaging.co.uk" className="group flex w-fit items-center gap-3 transition-colors hover:text-green-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-800 text-slate-500 transition-colors group-hover:bg-green-500/10 group-hover:text-green-400">
                  <Mail size={14} />
                </div>
                support@gopackaging.co.uk
              </a>
              <a href="tel:+441234567890" className="group flex w-fit items-center gap-3 transition-colors hover:text-green-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-800 text-slate-500 transition-colors group-hover:bg-green-500/10 group-hover:text-green-400">
                  <Phone size={14} />
                </div>
                +44 (0) 1234 567 890
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="mb-6 text-xs font-black uppercase tracking-widest text-white">Products</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/shop" className="transition-colors hover:text-green-400">Cardboard Boxes</Link></li>
              <li><Link href="/shop" className="transition-colors hover:text-green-400">Bubble Wrap</Link></li>
              <li><Link href="/shop" className="transition-colors hover:text-green-400">Mailing Bags</Link></li>
              <li><Link href="/shop" className="transition-colors hover:text-green-400">Pallet Wrap</Link></li>
              <li><Link href="/shop" className="transition-colors hover:text-green-400">Custom Printed</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="mb-6 text-xs font-black uppercase tracking-widest text-white">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/track" className="transition-colors hover:text-green-400">Track Order</Link></li>
              <li><Link href="/returns" className="transition-colors hover:text-green-400">Returns & Refunds</Link></li>
              <li><Link href="/shipping" className="transition-colors hover:text-green-400">Shipping Info</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-green-400">Help / FAQ</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-green-400">Contact Us</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="mb-6 text-xs font-black uppercase tracking-widest text-white">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="transition-colors hover:text-green-400">About Us</Link></li>
              <li><Link href="/trade" className="transition-colors hover:text-green-400">Trade Accounts</Link></li>
              <li><Link href="/sustainability" className="transition-colors hover:text-green-400">Sustainability</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-green-400">Terms of Service</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:text-green-400">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* 3. Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-xs font-medium text-slate-500">
            © {new Date().getFullYear()} GoPackaging Ltd. All rights reserved.
          </p>

          <div className="flex gap-7 bg-white rounded-2xl px-7">
            <div className="flex items-center gap-1">
              <span className="font-black italic text-[14px] md:text-lg tracking-tighter text-[#1A1F71]">VISA</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#EB001B]" />
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#F79E1B] opacity-80" />
              </div>
              <span className="font-black italic text-[10px] md:text-xs tracking-tighter">MASTERCARD</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#016FD0] rounded-sm flex items-center justify-center">
                <span className="text-[6px] text-white font-bold">AX</span>
              </div>
              <span className="font-black text-[10px] md:text-xs tracking-tight">AMEX</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-black text-[12px] md:text-sm tracking-tighter text-stone-800">DISCOVER</span>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF6000]" />
            </div>

          </div>

          <div className="flex gap-4 text-slate-500">
            <a href="#" className="transition-colors hover:text-green-400">
              <InstagramIcon size={18} />
            </a>
            <a href="#" className="transition-colors hover:text-green-400">
              <TwitterIcon size={18} />
            </a>
            <a href="#" className="transition-colors hover:text-green-400">
              <FacebookIcon size={18} />
            </a>
            <a href="#" className="transition-colors hover:text-green-400">
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}