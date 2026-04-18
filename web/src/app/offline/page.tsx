import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-[75vh] w-full max-w-5xl items-center px-5 py-14 lg:px-10">
      <section className="w-full rounded-[2.25rem] border border-[var(--line)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow)] lg:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
          <WifiOff className="h-8 w-8" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">Sedang offline</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-[var(--text)] sm:text-5xl">
          Koneksi sedang tidak tersedia, tapi halaman penting tetap kami siapkan.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          Anda masih bisa kembali ke halaman utama atau membuka katalog yang sudah tersimpan sebelumnya. Saat koneksi kembali normal, seluruh isi akan otomatis terbarui.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-slate-950" href="/">
            Kembali ke beranda
          </Link>
          <Link className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-6 py-3.5 text-sm font-semibold text-[var(--text)]" href="/katalog">
            Buka katalog
          </Link>
        </div>
      </section>
    </main>
  );
}
