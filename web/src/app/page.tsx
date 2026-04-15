import Link from "next/link";

import { CompareSection } from "@/components/site/compare-section";
import { SiteHeader } from "@/components/site/header";
import { VendorCard } from "@/components/site/vendor-card";
import { vendors } from "@/lib/vendors";

export default function Home() {
  const featured = vendors[0];
  const compareVendors = vendors.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <main>
        <section className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]" data-testid="hero-label">
                Studio wedding premium
              </p>
              <h1 className="max-w-3xl font-serif text-5xl leading-none tracking-tight text-[var(--primary)] sm:text-6xl lg:text-[5.3rem]" data-testid="hero-title">
                Landing page yang terasa tenang, editorial, dan tetap mudah dipakai.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted-foreground)]" data-testid="hero-copy">
                Jelajahi vendor, bandingkan pilihan penting dalam satu tampilan, lalu lanjutkan ke langkah booking tanpa kehilangan rasa hangat dari brand yang sedang Anda bangun.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link className="bg-[var(--primary)] px-7 py-4 text-sm text-[var(--primary-foreground)] transition hover:opacity-90" data-testid="cta-lihat-vendor" href="/vendors">
                Lihat Vendor
              </Link>
              <Link className="border border-[var(--primary)] px-7 py-4 text-sm text-[var(--primary)] transition hover:bg-[var(--muted)]" data-testid="cta-konsultasi" href={`/booking/${featured.slug}`}>
                Konsultasi
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3" data-testid="hero-stats">
              {[
                ["4 vendor", "Siap dibandingkan dengan cepat"],
                ["1 alur", "Dari landing page sampai booking"],
                ["Web + mobile", "Brand tetap selaras tanpa saling mengganggu"],
              ].map(([title, copy]) => (
                <div className="border border-[var(--border)] bg-white p-5" key={title}>
                  <p className="font-serif text-3xl text-[var(--primary)]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[150px_1fr] gap-4 lg:grid-cols-[170px_1fr]">
            <div className="flex flex-col gap-4 pt-10 lg:pt-16">
              {vendors.slice(1, 3).map((vendor, index) => (
                <div className={`overflow-hidden rounded-[999px] ${index === 1 ? "ml-5" : ""}`} key={vendor.slug}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={vendor.name} className="h-[220px] w-full object-cover lg:h-[250px]" src={vendor.image} />
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-[999px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={featured.name} className="h-[520px] w-full object-cover lg:h-[620px]" data-testid="hero-image" src={featured.image} />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(44,36,27,0.52),rgba(44,36,27,0.08))]" />
              <div className="absolute bottom-6 left-6 right-6 bg-[color:color-mix(in_oklab,var(--background)_88%,white_12%)] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Pilihan utama minggu ini</p>
                <h2 className="mt-2 font-serif text-3xl text-[var(--primary)]">{featured.name}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{featured.description}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr]" id="manifesto">
          <div className="flex gap-4 lg:items-end">
            {vendors.slice(0, 2).map((vendor, index) => (
              <div className={`overflow-hidden rounded-[999px] ${index === 1 ? "mt-16" : ""}`} key={vendor.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={vendor.name} className="h-[240px] w-[150px] object-cover lg:h-[340px] lg:w-[220px]" src={vendor.image} />
              </div>
            ))}
          </div>

          <div className="space-y-5" data-testid="manifesto-section">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Filosofi studio</p>
            <h2 className="font-serif text-4xl tracking-tight text-[var(--primary)] md:text-5xl">Kami membuat web terasa seperti ruang konsultasi pertama yang tenang dan meyakinkan.</h2>
            <p className="max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
              Arah visual kami tidak meniru referensi secara mentah. Yang kami ambil adalah rasa premium, ritme editorial, dan keberanian memberi ruang kosong — lalu kami padukan dengan palet hangat serta narasi yang lebih dekat dengan calon pengantin Indonesia.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Narasi yang hangat dan tidak terasa kaku",
                "Vendor discovery yang tetap enak dibaca di desktop",
                "Compare mode yang membantu keputusan terasa lebih ringan",
              ].map((item) => (
                <div className="border border-[var(--border)] bg-white p-4 text-sm leading-6 text-[var(--secondary-foreground)]" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1240px] space-y-8 px-6 py-16 md:px-8" id="vendor-section">
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Kurasi vendor</p>
            <h2 className="font-serif text-4xl tracking-tight text-[var(--primary)] md:text-5xl">Dibangun seperti studio premium, tapi tetap jelas saat waktunya memilih.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <VendorCard priority vendor={featured} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {vendors.slice(1, 3).map((vendor) => (
                <VendorCard key={vendor.slug} vendor={vendor} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1240px] px-6 py-16 md:px-8">
          <CompareSection vendors={compareVendors} />
        </section>

        <section className="mx-auto grid w-full max-w-[1240px] gap-8 px-6 py-16 md:px-8 lg:grid-cols-[1fr_0.88fr]">
          <div className="space-y-5 border border-[var(--border)] bg-white p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">FAQ singkat</p>
            <div className="space-y-4" data-testid="faq-list">
              {[
                ["Apakah saya bisa langsung booking dari web?", "Bisa. Landing page web ini sudah kami arahkan sampai detail vendor dan form booking."],
                ["Apakah compare mode hanya visual?", "Tidak. Compare mode menampilkan paket utama, harga awal, lokasi, dan highlight layanan agar keputusan terasa lebih jelas."],
                ["Apakah mobile tetap terpisah?", "Ya. Landing page web dibangun dengan Next.js + Tailwind, sementara mobile tetap React Native/Expo."],
              ].map(([question, answer]) => (
                <div className="border-t border-[var(--border)] pt-4 first:border-t-0 first:pt-0" key={question}>
                  <h3 className="text-lg font-semibold text-[var(--primary)]">{question}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">{answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[var(--border)] bg-[var(--primary)] p-7 text-[var(--primary-foreground)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">Langkah berikutnya</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight">Kalau ingin mulai dari yang paling mudah, buka vendor lalu lanjutkan konsultasi.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[color:color-mix(in_oklab,var(--primary-foreground)_74%,transparent)]">
              Struktur ini sengaja dibuat supaya pengunjung bisa merasa yakin lebih cepat: lihat vendor, bandingkan detail yang penting, lalu lanjutkan ke booking tanpa kehilangan rasa premium dari brand Anda.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="bg-[var(--primary-foreground)] px-6 py-4 text-sm text-[var(--primary)]" data-testid="bottom-lihat-vendor" href="/vendors">
                Lihat semua vendor
              </Link>
              <Link className="border border-[var(--primary-foreground)] px-6 py-4 text-sm text-[var(--primary-foreground)]" data-testid="bottom-konsultasi" href={`/booking/${featured.slug}`}>
                Mulai konsultasi
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
