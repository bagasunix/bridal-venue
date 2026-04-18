import Link from "next/link";
import { ArrowRight, Eye, Layers3, Sparkles, Users } from "lucide-react";

import { SectionTitle } from "@/components/section-title";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--brand)]">Tentang pengalaman web ini</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight font-semibold text-[var(--text)] sm:text-6xl">
            Dibuat untuk membantu materi presentasi terasa lebih hidup, bukan sekadar rapi.
          </h1>
        </div>
        <p className="text-lg leading-8 text-[var(--muted)]">
          Fokusnya bukan hanya membuat tampilan terlihat cantik, tapi juga membuat alur penjelasan jadi lebih ringan. Client bisa cepat memahami pilihan vendor, menangkap nuansa tiap layanan, lalu merasa nyaman untuk lanjut berdiskusi atau booking.
        </p>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: Eye,
            title: "Lebih enak dipresentasikan",
            copy: "Susunan section dibuat jelas supaya Anda mudah membuka percakapan dari gambaran besar ke detail vendor.",
          },
          {
            icon: Layers3,
            title: "Informasi tidak terasa berat",
            copy: "Isi tiap halaman cukup lengkap untuk meyakinkan, tapi tetap ringan saat dibaca cepat di depan client.",
          },
          {
            icon: Sparkles,
            title: "Nuansa premium tetap hangat",
            copy: "Palet warna dan penulisan copy menjaga kesan elegan tanpa terasa terlalu kaku atau terlalu formal.",
          },
          {
            icon: Users,
            title: "Cocok untuk demo single-tenant",
            copy: "Sangat pas untuk satu brand atau satu client demo yang butuh hasil presentasi terlihat matang dan meyakinkan.",
          },
        ].map((item) => (
          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]" key={item.title}>
            <div className="inline-flex rounded-full bg-[var(--brand-soft)] p-3 text-[var(--brand)]">
              <item.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-[var(--text)]">{item.title}</h2>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">{item.copy}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <SectionTitle
          eyebrow="Apa yang dibuat"
          title="Halaman inti sudah lengkap untuk membantu client mengikuti alurnya tanpa kebingungan"
          description="Mulai dari beranda, katalog, detail vendor, booking, sampai halaman kontak, semuanya disusun dengan narasi yang saling nyambung. Jadi presentasi terasa lebih mulus dan tidak meloncat-loncat."
        />
        <div className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(200,157,86,0.16),transparent_72%)] p-7">
          <ul className="space-y-4 text-base leading-7 text-[var(--muted)]">
            <li>• Beranda yang langsung menjelaskan value dan arah visual brand.</li>
            <li>• Katalog vendor yang nyaman dipakai untuk membandingkan opsi.</li>
            <li>• Detail vendor dengan paket dan gambaran tanggal yang sudah terisi.</li>
            <li>• Booking flow yang siap dipakai untuk demo sampai tahap permintaan.</li>
            <li>• Halaman kontak untuk mengakhiri presentasi dengan ajakan yang jelas.</li>
          </ul>
          <Link className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-3 text-sm font-semibold text-white" href="/katalog">
            Lihat semua halaman inti
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
