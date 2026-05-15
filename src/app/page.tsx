import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import { categories, products } from "@/data/products";
import { Truck, BadgePoundSterling, ShieldCheck, ArrowRight, Palette } from "lucide-react";
import Hero from "@/components/home/Hero";



export default function HomePage() {
  const featuredProducts = products.slice(0, 5);

  return (
    <main className="bg-[#f3f5f4]">
      {/* Hero Grid */}
      <Hero />

      {/* Category Buttons */}
      <section className="px-4 pt-10 pb-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category}
              href="/shop"
              className="flex h-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 text-center text-[13px] font-bold tracking-wide text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-green-600 hover:shadow-md"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 md:py-12">
      {/* Premium Rounded Gradient Container */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 px-6 py-16 shadow-2xl shadow-green-900/20 md:px-16 md:py-20">
        
        {/* Decorative Background Elements (Glassmorphism blobs) */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-transform hover:scale-110"></div>
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-between gap-10 md:flex-row">
          
          <div className="max-w-2xl text-center md:text-left">
            {/* Small Top Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <Palette size={16} />
              Custom Branding
            </div>

            {/* Enlarged Heading */}
            <h2 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Need printed packaging?
            </h2>

            {/* Subtext */}
            <p className="mt-4 text-base font-medium text-green-50 md:text-lg">
              Stand out from the crowd with custom boxes, branded bags, and premium ecommerce packaging options tailored for your brand.
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="shrink-0">
            <Link
              href="/shop"
              className="group flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-green-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-xl"
            >
              View Printed Packaging
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
        </div>
      </div>
    </section>

{/* Featured Products */}
      <section className="bg-slate-50/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          
          {/* Modern Section Header */}
          <div className="mb-10 text-center md:mb-14">
            
            {/* Animated Pulsing Badge */}
            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-green-100/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-green-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600"></span>
              </span>
              Top Picks For You
            </div>

            {/* Main Title & Subtitle */}
            <h2 className="text-3xl font-black tracking-tight text-green-700 md:text-4xl">
              Featured Products
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-slate-500 md:text-base">
              Discover our most popular and highly recommended packaging solutions, trusted by thousands of UK businesses.
            </p>
          </div>

          {/* Grid Layout - Slightly increased gap for the new card shadows */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Optional "View All" Button at the bottom */}
          <div className="mt-12 flex justify-center md:mt-16">
            <Link 
              href="/shop" 
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-600 hover:text-green-600 hover:shadow-md"
            >
              View All Products
              {/* Optional Arrow icon if you import ArrowRight from lucide-react */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 pb-16 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          
          {/* Feature Card 1 */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/5">
            {/* Hover Bottom Glow Line */}
            <div className="absolute inset-x-0 bottom-0 h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
              <Truck size={28} strokeWidth={2} />
            </div>
            
            <h3 className="mb-3 text-xl font-black tracking-tight text-slate-900">
              Fast UK Delivery
            </h3>
            <p className="text-sm font-medium leading-relaxed text-slate-500">
              Free delivery available on orders over £75. Fast, tracked, and reliable shipping straight to your door.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/5">
            {/* Hover Bottom Glow Line */}
            <div className="absolute inset-x-0 bottom-0 h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
              <BadgePoundSterling size={28} strokeWidth={2} />
            </div>
            
            <h3 className="mb-3 text-xl font-black tracking-tight text-slate-900">
              Volume Discounts
            </h3>
            <p className="text-sm font-medium leading-relaxed text-slate-500">
              Tier pricing helps customers save when buying in bulk. The more you buy, the more you save automatically.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/5">
            {/* Hover Bottom Glow Line */}
            <div className="absolute inset-x-0 bottom-0 h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
              <ShieldCheck size={28} strokeWidth={2} />
            </div>
            
            <h3 className="mb-3 text-xl font-black tracking-tight text-slate-900">
              Trade Pricing
            </h3>
            <p className="text-sm font-medium leading-relaxed text-slate-500">
              Trade mode shows lower pricing with minimum basket rules. Perfect for regular business orders.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}