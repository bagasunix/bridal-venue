"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { SectionTitle } from "@/components/section-title";
import { VendorCard } from "@/components/vendor-card";
import { vendorCategories, vendors } from "@/lib/vendors";

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredVendors = useMemo(() => {
    if (activeCategory === "Semua") {
      return vendors;
    }
    return vendors.filter((vendor) => vendor.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
      <SectionTitle
        eyebrow="Katalog lengkap"
        title="Semua vendor disusun supaya enak dibandingkan dan cepat terasa cocok"
        description="Halaman ini cocok dipakai sebagai bagian inti presentasi. Anda bisa mulai dari kategori besar, lalu masuk ke detail vendor yang paling relevan dengan kebutuhan client."
        action={
          <Link className="rounded-full bg-[var(--text)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5" href="/kontak">
            Lanjut konsultasi
          </Link>
        }
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {vendorCategories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "border-[var(--brand)] bg-[var(--brand-soft)] text-[var(--brand)]"
                  : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
              }`}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.slug} vendor={vendor} />
        ))}
      </div>
    </main>
  );
}
