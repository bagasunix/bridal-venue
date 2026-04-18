"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getPackageLabel, submitBooking } from "@/lib/api";
import { buildCalendarDays, monthTitle, weekdayNames } from "@/lib/date";
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

  const canGoPrevMonth =
    displayedMonth.getFullYear() > currentMonth.getFullYear() ||
    (displayedMonth.getFullYear() === currentMonth.getFullYear() && displayedMonth.getMonth() > currentMonth.getMonth());

  const isReady = name.trim().length >= 2 && phone.trim().length >= 7 && selectedPackage && selectedDate;
  const today = new Date().toISOString().slice(0, 10);

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
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">Ringkasan pemesanan</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold text-[var(--text)]">Pilih tanggal yang terasa paling pas untuk {vendor.name}</h1>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            Halaman ini dibuat singkat supaya client bisa langsung memahami langkah berikutnya. Pilih paket, tentukan tanggal, lalu kirim permintaan ketika sudah siap.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--muted)]">
              {vendor.category}
            </span>
            <span className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--muted)]">
              Mulai {vendor.startingPrice}
            </span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">Data client</p>
          <div className="mt-5 space-y-5">
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
        </div>

        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">Pilih paket</p>
          <div className="mt-5 space-y-3">
            {vendor.packages.map((item) => {
              const active = item.name === selectedPackage;
              return (
                <button
                  className={`w-full rounded-[1.5rem] border p-5 text-left transition-colors duration-200 ${
                    active
                      ? "border-[var(--brand)] bg-[var(--brand-soft)]"
                      : "border-[var(--line)] bg-[var(--surface-strong)] hover:border-[var(--brand)]"
                  }`}
                  key={item.name}
                  onClick={() => setSelectedPackage(item.name)}
                  type="button"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text)]">{item.label}</h2>
                      <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                    </div>
                    <p className="text-base font-semibold text-[var(--brand)]">{item.price}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
          <div className="flex items-center justify-between gap-3">
            <button
              className={`rounded-full border px-4 py-2 text-sm font-medium ${canGoPrevMonth ? "border-[var(--line)] text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)]" : "border-[var(--line)] text-[var(--muted)] opacity-40"}`}
              disabled={!canGoPrevMonth}
              onClick={() => setDisplayedMonth(new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1))}
              type="button"
            >
              Sebelumnya
            </button>
            <h2 className="font-serif text-2xl font-semibold text-[var(--text)]">{monthTitle(displayedMonth)}</h2>
            <button
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
              onClick={() => setDisplayedMonth(new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1))}
              type="button"
            >
              Berikutnya
            </button>
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

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />
              Tanggal dipilih
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              Sudah terisi
            </span>
          </div>
        </div>

        {selectedDate ? (
          <div className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(200,157,86,0.16),transparent_72%)] p-6">
            <p className="text-sm text-[var(--muted)]">Tanggal terpilih</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--text)]">{selectedDate}</p>
          </div>
        ) : null}

        {error ? <div className="rounded-[1.5rem] border border-rose-400/25 bg-rose-400/10 p-4 text-sm text-rose-500">{error}</div> : null}

        <div className="flex flex-wrap gap-4">
          <button
            className={`inline-flex rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-200 ${
              isReady ? "bg-[var(--text)] text-white hover:-translate-y-0.5" : "bg-slate-300 text-slate-500"
            }`}
            disabled={!isReady || submitting}
            onClick={handleSubmit}
            type="button"
          >
            {submitting ? "Mengirim permintaan..." : "Kirim permintaan"}
          </button>
          <Link className="inline-flex rounded-full border border-[var(--line)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)]" href="/kontak">
            Konsultasi dulu
          </Link>
        </div>
      </div>
    </div>
  );
}
