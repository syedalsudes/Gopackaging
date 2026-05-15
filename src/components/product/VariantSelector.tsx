"use client";

import { ProductVariant } from "@/types";

type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onChange: (variant: ProductVariant) => void;
};

export default function VariantSelector({
  variants,
  selectedVariant,
  onChange,
}: VariantSelectorProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header Section */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-black tracking-tight text-slate-900">
          Choose Size
        </h2>
        <p className="text-sm font-medium text-slate-500">
          Selected:{" "}
          <span className="font-bold text-green-600">
            {selectedVariant.name}
          </span>
        </p>
      </div>

      {/* Variants Grid */}
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isActive = selectedVariant.value === variant.value;

          return (
            <button
              key={variant.value}
              onClick={() => onChange(variant)}
              className={`relative overflow-hidden rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 active:scale-95 ${
                isActive
                  ? "border-transparent bg-green-50 text-green-700 ring-2 ring-green-600 shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:bg-green-50/50 hover:text-green-700"
              }`}
            >
              {variant.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}