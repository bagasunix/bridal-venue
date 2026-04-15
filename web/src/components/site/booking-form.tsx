"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { createBooking, fetchAvailability } from "@/lib/api";
import type { Vendor } from "@/lib/types";

type BookingFormProps = {
  vendor: Vendor;
};

export function BookingForm({ vendor }: BookingFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [packageName, setPackageName] = useState(vendor.packages[0]?.name ?? "");
  const [selectedDate, setSelectedDate] = useState("");
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetchAvailability(vendor.slug)
      .then((result) => {
        if (active) {
          setBookedDates(result.booked_dates);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Jadwal belum berhasil dimuat.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [vendor.slug]);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!selectedDate) {
      setError("Silakan pilih tanggal terlebih dahulu.");
      return;
    }
    if (bookedDates.includes(selectedDate)) {
      setError("Tanggal yang Anda pilih sudah terisi. Silakan pilih tanggal lain.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createBooking({
        date: selectedDate,
        name,
        package: packageName,
        phone,
        vendor: vendor.slug,
      });

      const params = new URLSearchParams({
        bookingId: result.booking_id,
        date: result.date,
        packageName: vendor.packages.find((item) => item.name === packageName)?.label ?? packageName,
        vendorName: vendor.name,
      });
      router.push(`/success?${params.toString()}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Permintaan belum berhasil dikirim.";
      setError(message === "Date not available" ? "Tanggal yang Anda pilih sudah terisi. Silakan pilih tanggal lain." : message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]" onSubmit={handleSubmit}>
      <section className="space-y-6 border border-[var(--border)] bg-white p-6" data-testid="booking-form-left">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Pilih detail Anda</p>
          <h2 className="font-serif text-4xl text-[var(--primary)]">Atur langkah berikutnya dengan tenang.</h2>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--primary)]">Nama lengkap</span>
          <input className="border-b border-[var(--border)] bg-transparent px-0 py-3 outline-none" data-testid="booking-name-input" onChange={(event) => setName(event.target.value)} placeholder="Nama Anda" required value={name} />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--primary)]">Nomor WhatsApp</span>
          <input className="border-b border-[var(--border)] bg-transparent px-0 py-3 outline-none" data-testid="booking-phone-input" onChange={(event) => setPhone(event.target.value)} placeholder="08xxxxxxxxxx" required value={phone} />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--primary)]">Pilih paket</span>
          <select className="border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none" data-testid="booking-package-select" onChange={(event) => setPackageName(event.target.value)} value={packageName}>
            {vendor.packages.map((item) => (
              <option key={item.name} value={item.name}>{item.label} — {item.price}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--primary)]">Pilih tanggal</span>
          <input className="border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none" data-testid="booking-date-input" min={today} onChange={(event) => setSelectedDate(event.target.value)} required type="date" value={selectedDate} />
        </label>

        {error ? <p className="text-sm font-semibold text-[#a35d55]" data-testid="booking-error-message">{error}</p> : null}

        <button className="inline-flex w-full items-center justify-center bg-[var(--primary)] px-5 py-4 text-sm text-[var(--primary-foreground)] transition hover:opacity-90 disabled:opacity-60" data-testid="booking-submit-button" disabled={submitting} type="submit">
          {submitting ? "Sedang mengirim..." : "Kirim permintaan"}
        </button>
      </section>

      <section className="space-y-5 border border-[var(--border)] bg-[var(--muted)] p-6" data-testid="booking-form-right">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Ringkasan vendor</p>
          <h3 className="font-serif text-3xl text-[var(--primary)]" data-testid="booking-vendor-name">{vendor.name}</h3>
          <p className="text-sm leading-6 text-[var(--muted-foreground)]">{vendor.description}</p>
        </div>

        <div className="grid gap-3 text-sm text-[var(--secondary-foreground)] sm:grid-cols-2">
          <div data-testid="booking-vendor-location">
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Lokasi</span>
            <span>{vendor.location}</span>
          </div>
          <div data-testid="booking-vendor-price">
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Harga awal</span>
            <span>Mulai {vendor.startingPrice}</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Tanggal yang sudah terisi</p>
          {loading ? (
            <p className="text-sm text-[var(--muted-foreground)]" data-testid="booking-loading-availability">Sedang memuat jadwal...</p>
          ) : (
            <div className="flex flex-wrap gap-2" data-testid="booking-booked-dates">
              {bookedDates.length > 0 ? bookedDates.map((item) => (
                <span className="bg-white px-3 py-2 text-xs font-semibold text-[var(--secondary-foreground)]" key={item}>{item}</span>
              )) : <span className="text-sm text-[var(--muted-foreground)]">Belum ada tanggal yang terisi.</span>}
            </div>
          )}
        </div>
      </section>
    </form>
  );
}