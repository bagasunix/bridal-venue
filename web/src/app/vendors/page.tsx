import { SiteHeader } from "@/components/site/header";
import { VendorCard } from "@/components/site/vendor-card";
import { vendors } from "@/lib/vendors";

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1240px] px-6 py-16 md:px-8">
        <div className="space-y-3 pb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Koleksi vendor</p>
          <h1 className="font-serif text-5xl tracking-tight text-[var(--primary)]">Semua pilihan yang sudah dikurasi untuk web.</h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">Gunakan halaman ini saat Anda ingin menelusuri semua vendor secara lebih fokus sebelum membuka detail atau booking.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {vendors.map((vendor, index) => (
            <VendorCard key={vendor.slug} priority={index === 0} vendor={vendor} />
          ))}
        </div>
      </main>
    </div>
  );
}