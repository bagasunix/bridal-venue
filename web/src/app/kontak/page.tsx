import Link from "next/link";
import { CalendarRange, Mail, MessageCircleMore, PhoneCall } from "lucide-react";

import { SectionTitle } from "@/components/section-title";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionTitle
          eyebrow="Kontak dan langkah berikutnya"
          title="Kalau client sudah tertarik, arahkan percakapan ke sini supaya penutupnya tetap terasa rapi"
          description="Anda bisa memakai halaman ini sebagai jembatan dari presentasi ke diskusi lanjutan. Pilih alur yang paling nyaman: mulai dari konsultasi, jadwalkan sesi presentasi, atau lanjutkan pembahasan lewat WhatsApp."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              icon: MessageCircleMore,
              title: "WhatsApp konsultasi",
              copy: "Cocok kalau client ingin respons cepat setelah melihat katalog dan mulai bertanya lebih detail.",
              value: "+62 812 3456 7890",
            },
            {
              icon: Mail,
              title: "Email presentasi",
              copy: "Dipakai saat Anda ingin mengirim rangkuman penawaran atau materi lanjutan setelah meeting.",
              value: "hello@atelierresepsi.id",
            },
            {
              icon: CalendarRange,
              title: "Jadwalkan demo berikutnya",
              copy: "Pas untuk client yang ingin masuk ke pembahasan moodboard, pricing, atau penyesuaian paket.",
              value: "Senin - Jumat · 10.00 - 18.00",
            },
            {
              icon: PhoneCall,
              title: "Call singkat sebelum proposal",
              copy: "Membantu Anda menangkap kebutuhan utama client sebelum menyusun langkah berikutnya.",
              value: "+62 21 555 0199",
            },
          ].map((item) => (
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]" key={item.title}>
              <div className="inline-flex rounded-full bg-[var(--brand-soft)] p-3 text-[var(--brand)]">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-[var(--text)]">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-[var(--muted)]">{item.copy}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--text)]">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 overflow-hidden rounded-[2.25rem] border border-[var(--line)] bg-[linear-gradient(135deg,#0f172a,#0b1320_48%,#19263d)] p-8 text-white shadow-[var(--shadow)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--brand-strong)]">Saran alur presentasi</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight font-semibold sm:text-5xl">
              Mulai dari katalog dulu, lanjutkan diskusi saat client sudah merasa cocok.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              Cara ini biasanya terasa paling natural. Client punya waktu melihat pilihannya dulu, lalu Anda masuk ke percakapan yang lebih spesifik tanpa terasa terburu-buru.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-900" href="/katalog">
              Buka katalog
            </Link>
            <Link className="inline-flex rounded-full border border-white/18 px-6 py-3.5 text-sm font-semibold text-white hover:border-white hover:bg-white/8" href="/tentang">
              Lihat gambaran web
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
