"use client";

import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal, PackageOpen, X, CheckCircle2 } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { categories, products } from "@/data/products";

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(100);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    result = result.filter(
      (product) => product.pricingTiers[0].pricePerPack <= maxPrice
    );

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => a.pricingTiers[0].pricePerPack - b.pricingTiers[0].pricePerPack
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => b.pricingTiers[0].pricePerPack - a.pricingTiers[0].pricePerPack
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "featured") {
      result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    return result;
  }, [selectedCategories, sortBy, maxPrice]);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        
        {/* 1. Premium Dark Header Banner */}
        <div className="relative mb-10 overflow-hidden rounded-[2.5rem] bg-slate-950 px-8 py-12 shadow-2xl shadow-slate-900/20 md:px-12 md:py-16">
          {/* Subtle Background Glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/20 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-green-400 backdrop-blur-md">
                <PackageOpen size={16} />
                Packaging Supplies
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                Shop our products
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Browse cardboard boxes, bubble wrap, mailing bags, pallet wrap,
                printed packaging, eco packaging and warehouse supplies.
              </p>
            </div>

            {/* Total Products Badge */}
            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 text-xl font-black text-green-400">
                {filteredProducts.length}
              </div>
              <p className="text-sm font-semibold text-slate-300">
                Products <br /> <span className="text-slate-500">Available</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Quick Filter Pills (Horizontal Scroll) */}
        <div className="no-scrollbar mb-8 flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategories([])}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              selectedCategories.length === 0
                ? "bg-slate-900 text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-600 hover:border-green-600 hover:text-green-600"
            }`}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                selectedCategories.includes(category)
                  ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-green-600 hover:text-green-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 3. Main Shop Layout (Grid) */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          
          {/* Sidebar Filters (Sticky) */}
          <aside className="relative">
            <div className="sticky top-28 space-y-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
              
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <Filter size={16} strokeWidth={2.5} />
                </div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">Filters</h2>
              </div>

              {/* Categories Checklist */}
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="group flex cursor-pointer items-center justify-between rounded-xl p-2 transition-colors hover:bg-slate-50"
                    >
                      <span className={`text-sm font-semibold transition-colors ${selectedCategories.includes(category) ? "text-green-600" : "text-slate-600 group-hover:text-slate-900"}`}>
                        {category}
                      </span>
                      <div className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${selectedCategories.includes(category) ? "border-green-600 bg-green-600" : "border-slate-300 bg-white"}`}>
                        {selectedCategories.includes(category) && <CheckCircle2 size={12} className="text-white" strokeWidth={3} />}
                      </div>
                      
                      {/* FIX: Re-added the actual input so logic works flawlessly */}
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="hidden" // Hides default checkbox, keeps logic intact
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div className="border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Max Price
                  </h3>
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700">
                    £{maxPrice}
                  </span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="h-1.5 w-full appearance-none rounded-full bg-slate-200 accent-green-600 outline-none"
                />
                <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
                  <span>£5</span>
                  <span>£100+</span>
                </div>
              </div>
              
            </div>
          </aside>

          {/* Product Grid Area */}
          <main>
            {/* Sort & Info Bar */}
            <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center md:p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <SlidersHorizontal size={18} className="text-green-600" />
                Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of {products.length} products
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm font-bold text-slate-700 outline-none transition-colors focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 sm:w-auto"
                >
                  <option value="featured">Featured first</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A - Z</option>
                </select>
                <div className="pointer-events-none absolute bottom-0 right-4 top-0 flex items-center text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Products or Empty State */}
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-200 bg-white py-20 text-center shadow-sm">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                  <X size={40} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900">
                  No products found
                </h3>
                <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-500">
                  We couldn't find any products matching your current filters. Try removing some categories or increasing the price range.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setMaxPrice(100);
                  }}
                  className="mt-8 rounded-full bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-green-600/20"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
          
        </div>
      </div>
    </section>
  );
}