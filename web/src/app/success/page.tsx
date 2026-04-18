import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { formatPrettyDate } from "@/lib/date";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const bookingId = typeof params.bookingId === "string" ? params.bookingId : "demo-001";
  const vendorName = typeof params.vendorName === "string" ? params.vendorName : "Vendor pilihan";
  const packageName = typeof params.packageName === "string" ? params.packageName : "Paket terpilih";
  const date = typeof params.date === "string" ? params.date : new Date().toISOString().slice(0, 10);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl items-center px-6 py-14 lg:px-10 lg:py-18">
      <section className="w-full rounded-[2.25rem] border border-[var(--line)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow)] lg:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--brand)]">Permintaan berhasil masuk</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-[var(--text)] sm:text-5xl">
          Detail booking sudah kami terima dengan rapi.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          Halaman ini bisa dipakai sebagai penutup presentasi yang terasa meyakinkan. Client mendapatkan ringkasan yang jelas, lalu Anda bisa lanjutkan percakapan ke tahap berikutnya.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-2">
          {[
            { label: "Vendor", value: vendorName },
            { label: "Paket", value: packageName },
            { label: "Tanggal", value: formatPrettyDate(date) },
            { label: "Kode referensi", value: bookingId },
          ].map((item) => (
            <div className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-5" key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">{item.label}</p>
              <p className="mt-3 text-lg font-semibold text-[var(--text)]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link className="inline-flex rounded-full bg-[var(--text)] px-6 py-3.5 text-sm font-semibold text-white" href="/katalog">
            Kembali ke katalog
          </Link>
          <Link className="inline-flex rounded-full border border-[var(--line)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)]" href="/kontak">
            Lanjut konsultasi
          </Link>
        </div>
      </section>
    </main>
  );
}
