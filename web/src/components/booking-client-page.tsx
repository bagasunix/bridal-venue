"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

import { getPackageLabel, submitBooking } from "@/lib/api";
import { buildCalendarDays, formatPrettyDate, monthTitle, weekdayNames } from "@/lib/date";
import type { Vendor } from "@/lib/vendors";

export function BookingClientPage({ bookedDates, vendor }: { bookedDates: string[]; vendor: Vendor }) {
  const router = useRouter();
  const [displayedMonth, setDisplayedMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(vendor.packages[0]?.name ?? "");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentMonth = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }, []);

  const days = useMemo(() => buildCalendarDays(displayedMonth), [displayedMonth]);
  const selectedPackageDetails = useMemo(
    () => vendor.packages.find((item) => item.name === selectedPackage) ?? vendor.packages[0],
    [selectedPackage, vendor.packages],
  );

  const canGoPrevMonth =
    displayedMonth.getFullYear() > currentMonth.getFullYear() ||
    (displayedMonth.getFullYear() === currentMonth.getFullYear() && displayedMonth.getMonth() > currentMonth.getMonth());

  const isReady = name.trim().length >= 2 && phone.trim().length >= 7 && selectedPackage && selectedDate;
  const today = new Date().toISOString().slice(0, 10);
  const viewedMonthKey = `${displayedMonth.getFullYear()}-${String(displayedMonth.getMonth() + 1).padStart(2, "0")}`;
  const bookedInViewedMonth = bookedDates.filter((date) => date.startsWith(viewedMonthKey)).length;
  const selectedDateLabel = selectedDate ? formatPrettyDate(selectedDate) : "Belum dipilih";
  const readinessHint = !name.trim()
    ? "Isi nama client dulu"
    : !phone.trim()
      ? "Tambahkan nomor WhatsApp"
      : !selectedDate
        ? "Pilih tanggal yang tersedia"
        : "Siap dikirim";

  const handleSubmit = async () => {
    if (!isReady || !selectedDate) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const result = await submitBooking({
        name: name.trim(),
        phone: phone.trim(),
        vendor: vendor.slug,
        date: selectedDate,
        package: selectedPackage,
      });

      const packageLabel = getPackageLabel(vendor.packages, selectedPackage);
      const params = new URLSearchParams({
        bookingId: result.booking_id,
        vendorName: vendor.name,
        packageName: packageLabel,
        date: selectedDate,
      });
      router.push(`/success?${params.toString()}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Permintaan belum berhasil dikirim.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className={`relative overflow-hidden rounded-[2.25rem] border border-[var(--line)] px-7 py-8 text-white shadow-[var(--shadow)] lg:px-9 lg:py-9 ${vendor.coverClass}`}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,17,32,0.65),rgba(7,17,32,0.78))]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/82 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[var(--brand-strong)]" />
              Booking flow yang dibuat lebih meyakinkan untuk closing presentasi
            </div>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/70">Booking untuk {vendor.category.toLowerCase()}</p>
              <h1 className="max-w-3xl font-serif text-4xl leading-tight font-semibold sm:text-5xl">
                Saat client sudah merasa cocok, Anda tinggal arahkan ke halaman ini.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                Semua detail penting ditata supaya keputusan terasa lebih ringan: paket mudah dibandingkan, tanggal gampang dipilih, dan langkah berikutnya terlihat jelas sejak awal.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/84">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{vendor.name}</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">Mulai {vendor.startingPrice}</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{bookedInViewedMonth} tanggal sudah terisi bulan ini</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Rapi",
                copy: "Semua data penting langsung terlihat tanpa banyak penjelasan tambahan.",
              },
              {
                icon: Clock3,
                title: "Cepat",
                copy: "Flow singkat supaya momentum presentasi tidak terputus di tengah jalan.",
              },
              {
                icon: MessageCircleMore,
                title: "Meyakinkan",
                copy: "Nada bahasanya hangat jadi client tetap nyaman saat memilih.",
              },
            ].map((item) => (
              <div className="rounded-[1.6rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm" key={item.title}>
                <item.icon className="h-5 w-5 text-[var(--brand-strong)]" />
                <p className="mt-4 text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/72">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-start">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">01 · Data client</p>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">Mulai dari detail yang paling dasar dulu</h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
                  Begitu nama dan nomor WhatsApp terisi, client akan merasa alurnya sudah nyata dan siap dilanjutkan.
                </p>
              </div>
              <div className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--muted)]">
                Respons presentasi lebih terasa personal
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[var(--text)]">Nama lengkap</span>
                <input
                  className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3.5 text-[var(--text)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Masukkan nama client"
                  value={name}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[var(--text)]">Nomor WhatsApp</span>
                <input
                  className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3.5 text-[var(--text)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--brand)]"
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="08xxxxxxxxxx"
                  value={phone}
                />
              </label>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(200,157,86,0.14),transparent_72%)] p-5">
              <p className="text-sm leading-7 text-[var(--muted)]">
                Nomor ini dipakai sebagai jalur lanjutan setelah presentasi selesai, jadi client merasa ada langkah nyata setelah memilih paket dan tanggal.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">02 · Pilih paket</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">Tampilkan pilihan yang terasa paling relevan</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
              Paket aktif ditonjolkan lebih jelas supaya client cepat tahu mana opsi yang paling cocok untuk kebutuhan dan ritme acara mereka.
            </p>

            <div className="mt-6 space-y-4">
              {vendor.packages.map((item, index) => {
                const active = item.name === selectedPackage;
                return (
                  <button
                    className={`w-full rounded-[1.6rem] border p-5 text-left transition-all duration-200 ${
                      active
                        ? "border-[var(--brand)] bg-[linear-gradient(135deg,rgba(200,157,86,0.16),transparent_78%)] shadow-[0_18px_50px_rgba(200,157,86,0.12)]"
                        : "border-[var(--line)] bg-[var(--surface-strong)] hover:border-[var(--brand)]"
                    }`}
                    key={item.name}
                    onClick={() => setSelectedPackage(item.name)}
                    type="button"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-[var(--text)]">{item.label}</h3>
                          {index === 0 ? (
                            <span className="rounded-full border border-[var(--brand)] bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
                              Paling sering dipilih
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-base font-semibold text-[var(--brand)]">{item.price}</p>
                        <p className="mt-2 text-sm text-[var(--muted)]">{active ? "Sedang dipilih sekarang" : "Klik untuk memilih"}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">03 · Setelah dikirim</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                "Client punya ringkasan yang jelas untuk dibawa lanjut diskusi.",
                "Tim Anda bisa langsung follow up tanpa perlu merangkum ulang secara manual.",
                "Penutup presentasi terasa lebih matang karena next step sudah terlihat.",
              ].map((item) => (
                <div className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4" key={item}>
                  <div className="inline-flex rounded-full bg-[var(--brand-soft)] p-2 text-[var(--brand)]">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">04 · Pilih tanggal</p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-[var(--text)]">{monthTitle(displayedMonth)}</h2>
              </div>
              <div className="flex gap-3">
                <button
                  className={`rounded-full border px-4 py-2 text-sm font-medium ${
                    canGoPrevMonth
                      ? "border-[var(--line)] text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                      : "border-[var(--line)] text-[var(--muted)] opacity-40"
                  }`}
                  disabled={!canGoPrevMonth}
                  onClick={() => setDisplayedMonth(new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1))}
                  type="button"
                >
                  Sebelumnya
                </button>
                <button
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                  onClick={() => setDisplayedMonth(new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1))}
                  type="button"
                >
                  Berikutnya
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2">
                <CalendarDays className="h-4 w-4 text-[var(--brand)]" />
                {bookedInViewedMonth} tanggal sudah terisi
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />
                Klik tanggal yang masih tersedia
              </span>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {weekdayNames.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-7 gap-2">
              {days.map((day) => {
                if (!day.isoDate) {
                  return <div className="h-12 rounded-2xl" key={day.key} />;
                }
                const isBooked = bookedDates.includes(day.isoDate);
                const isPast = day.isoDate < today;
                const isSelected = selectedDate === day.isoDate;
                const disabled = isBooked || isPast;

                return (
                  <button
                    className={`h-12 rounded-2xl border text-sm font-medium transition-colors duration-200 ${
                      isSelected
                        ? "border-[var(--brand)] bg-[var(--brand)] text-slate-950"
                        : isBooked
                          ? "border-rose-300/20 bg-rose-400/12 text-rose-400"
                          : isPast
                            ? "border-[var(--line)] bg-[var(--surface-strong)] text-[var(--muted)] opacity-40"
                            : "border-[var(--line)] bg-[var(--surface-strong)] text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                    }`}
                    disabled={disabled}
                    key={day.key}
                    onClick={() => setSelectedDate(day.isoDate)}
                    type="button"
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">Ringkasan pilihan</p>
            <div className="mt-5 space-y-4 text-sm">
              {[
                { label: "Vendor", value: vendor.name },
                { label: "Paket", value: selectedPackageDetails?.label ?? "Belum dipilih" },
                { label: "Harga mulai", value: selectedPackageDetails?.price ?? vendor.startingPrice },
                { label: "Tanggal", value: selectedDateLabel },
              ].map((item) => (
                <div className="flex items-start justify-between gap-6 border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0" key={item.label}>
                  <p className="text-[var(--muted)]">{item.label}</p>
                  <p className="max-w-[14rem] text-right font-semibold text-[var(--text)]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {error ? <div className="rounded-[1.5rem] border border-rose-400/25 bg-rose-400/10 p-4 text-sm text-rose-500">{error}</div> : null}

          <div className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(200,157,86,0.18),transparent_72%)] p-7 shadow-[var(--shadow)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">Final step</p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">Tutup presentasi dengan ajakan yang jelas.</h2>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">
              Saat semua pilihan sudah terasa pas, tinggal kirim permintaan ini. Client akan melihat bahwa proses berikutnya sudah siap dan tidak menggantung.
            </p>

            <button
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold transition-transform duration-200 ${
                isReady ? "bg-[var(--text)] text-white hover:-translate-y-0.5" : "bg-slate-300 text-slate-500"
              }`}
              disabled={!isReady || submitting}
              onClick={handleSubmit}
              type="button"
            >
              {submitting ? "Mengirim permintaan..." : "Kirim permintaan booking"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-4">
              <div>
                <p className="text-sm font-medium text-[var(--text)]">Status kesiapan</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{readinessHint}</p>
              </div>
              <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
                {isReady ? "Ready" : "Draft"}
              </span>
            </div>

            <Link
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--brand)]"
              href="/kontak"
            >
              Atau mulai dari konsultasi dulu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
