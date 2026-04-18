import Link from "next/link";
import { ArrowRight, Clock3, MessageSquareHeart, ShieldCheck, Sparkles, Star } from "lucide-react";

import { LazyArtImage } from "@/components/lazy-art-image";
import { SectionTitle } from "@/components/section-title";
import { VendorCard } from "@/components/vendor-card";
import { vendors } from "@/lib/vendors";

const processSteps = [
  {
    title: "Mulai dari gambaran besarnya dulu",
    copy: "Client bisa melihat arah visual, kategori vendor, dan kualitas kurasi tanpa harus membuka banyak file presentasi terpisah.",
  },
  {
    title: "Bandingkan pilihan yang terasa paling pas",
    copy: "Setiap vendor disusun dengan bahasa yang lebih hangat, informatif, dan tetap enak dibaca saat presentasi berlangsung.",
  },
  {
    title: "Lanjut ke booking ketika momentumnya tepat",
    copy: "Begitu client tertarik, alur berikutnya sudah siap untuk mengecek tanggal dan mengirim permintaan secara rapi.",
  },
];

const testimonials = [
  {
    name: "Maya & Raka",
    role: "Private wedding showcase",
    quote: "Presentasinya terasa lebih meyakinkan karena semuanya kelihatan terkurasi, bukan sekadar daftar vendor biasa.",
  },
  {
    name: "Nadine",
    role: "Kolaborasi brand",
    quote: "Visualnya premium tapi tetap ramah. Client cepat paham nilai tiap vendor tanpa perlu penjelasan panjang.",
  },
  {
    name: "Arman",
    role: "Venue proposal preview",
    quote: "Flow dari katalog ke booking enak sekali dipakai untuk meeting. Rasanya siap dibawa presentasi kapan saja.",
  },
];

const faqs = [
  {
    question: "Web ini paling pas dipakai untuk kebutuhan seperti apa?",
    answer: "Paling pas untuk memperlihatkan pilihan vendor, membangun suasana sejak awal, dan membantu client merasa lebih yakin saat menentukan arah acara.",
  },
  {
    question: "Apakah alurnya bisa langsung sampai booking?",
    answer: "Bisa. Client bisa lihat katalog, membuka detail vendor, cek tanggal, lalu mengirim permintaan dari halaman booking yang sudah disiapkan.",
  },
  {
    question: "Kalau nanti ingin disesuaikan lagi, apakah bisa?",
    answer: "Bisa. Isi, tampilan, dan alurnya sudah disiapkan supaya mudah diteruskan sesuai kebutuhan brand dan gaya layanan yang ingin ditonjolkan.",
  },
];

export default function HomePage() {
  const featuredVendor = vendors[0];

  return (
    <main>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-20">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] shadow-[var(--shadow)] backdrop-blur">
            <Sparkles className="h-4 w-4 text-[var(--brand)]" />
            Pilihan web yang siap menemani percakapan dengan client
          </div>

          <div className="space-y-6">
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.04] font-semibold text-[var(--text)] sm:text-5xl lg:text-7xl">
              Katalog vendor pernikahan yang terasa premium, rapi, dan langsung enak dipresentasikan.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              Dibuat untuk membantu Anda menunjukkan kurasi layanan dengan cara yang lebih meyakinkan. Tampilannya elegan, informasinya jelas, dan alurnya tetap nyaman saat client ingin lanjut melihat detail atau cek tanggal.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto whitespace-nowrap"
              href="/katalog"
            >
              Lihat katalog vendor
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)] sm:w-auto whitespace-nowrap"
              href="/kontak"
            >
              Jadwalkan presentasi
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Kategori utama", value: "4 layanan" },
              { label: "Langkah utama", value: "Katalog ke tanggal" },
              { label: "Nuansa", value: "Terang & gelap" },
            ].map((item) => (
              <div className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur" key={item.label}>
                <p className="text-2xl font-semibold text-[var(--text)]">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--line)] bg-[var(--surface-dark)] p-6 shadow-[var(--shadow)]">
          <div className={`absolute inset-0 ${featuredVendor.coverClass}`} />
          <LazyArtImage alt={featuredVendor.name} priority sizes="(max-width: 1024px) 100vw, 44vw" src={featuredVendor.imageSrc} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,32,0.2),rgba(7,17,32,0.74))]" />
          <div className="relative flex h-full min-h-[520px] flex-col justify-between text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/85">
                Pilihan yang paling sering dipresentasikan
              </div>
              <div className="rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-slate-900">
                {featuredVendor.category}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.34em] text-white/72">Featured highlight</p>
                <h2 className="max-w-xl font-serif text-4xl leading-tight font-semibold">{featuredVendor.name}</h2>
                <p className="max-w-xl text-base leading-7 text-white/78">{featuredVendor.summary}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {featuredVendor.stats.map((item) => (
                  <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm" key={item.label}>
                    <p className="text-lg font-semibold">{item.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.26em] text-white/70">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] bg-white/92 p-5 text-slate-900 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">Kenapa bagian ini cepat terasa meyakinkan</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Client langsung bisa menangkap nuansanya, tahu kisaran paketnya, lalu bisa langsung lanjut memilih tanggal saat suasananya sudah terasa cocok.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-slate-950" href={`/booking/${featuredVendor.slug}`}>
                    Pilih tanggal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900" href={`/vendor/${featuredVendor.slug}`}>
                    Lihat detail vendor
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-6 pb-6 lg:grid-cols-3 lg:px-10">
        {[
          {
            icon: ShieldCheck,
            title: "Visual terasa matang",
            copy: "Palet navy, gold, dan stone membuat presentasi lebih dewasa dan tetap nyaman dipandang dalam sesi yang panjang.",
          },
          {
            icon: MessageSquareHeart,
            title: "Bahasa lebih manusiawi",
            copy: "Copy dibuat hangat dan informatif, jadi client merasa dibimbing, bukan sedang membaca katalog yang kaku.",
          },
          {
            icon: Clock3,
            title: "Cepat dipakai meeting",
            copy: "Strukturnya ringkas, alurnya jelas, dan setiap halaman terasa seperti materi presentasi yang sudah siap pakai.",
          },
        ].map((item) => (
          <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur" key={item.title}>
            <div className="inline-flex rounded-full bg-[var(--brand-soft)] p-3 text-[var(--brand)]">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[var(--text)]">{item.title}</h3>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">{item.copy}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-10">
        <SectionTitle
          description="Semua layanan ini disusun supaya mudah dibaca saat presentasi dan tetap terasa meyakinkan ketika client ingin membuka detail lebih jauh."
          eyebrow="Katalog pilihan"
          title="Empat kategori inti yang paling sering dicari untuk membangun cerita acara yang utuh"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {vendors.map((vendor, index) => (
            <VendorCard featured={index === 0} key={vendor.slug} vendor={vendor} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionTitle
            description="Dari sisi percakapan, urutannya dibuat sederhana supaya Anda tidak perlu terlalu banyak menjelaskan. Halaman sudah membantu membawa client dari melihat pilihan sampai siap menentukan tanggal."
            eyebrow="Cara kerjanya"
            title="Langkah yang rapi dari melihat pilihan sampai client siap melanjutkan"
          />
          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur" key={step.title}>
                <p className="text-sm font-semibold text-[var(--brand)]">0{index + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--text)]">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-10">
        <SectionTitle
          align="center"
          description="Tetap terasa premium, tapi tidak berjarak. Cocok untuk membantu client merasa lebih yakin sejak pertemuan pertama."
          eyebrow="Kesan client"
          title="Tanggapan yang biasanya muncul ketika tampilan dan alurnya sudah terasa pas"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur" key={item.name}>
              <div className="flex items-center gap-1 text-[var(--brand)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star className="h-4 w-4 fill-current" key={index} />
                ))}
              </div>
              <p className="mt-4 text-lg leading-8 text-[var(--text)]">“{item.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold text-[var(--text)]">{item.name}</p>
                <p className="text-sm text-[var(--muted)]">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-10">
        <SectionTitle
          description="Kalau sedang menunjukkan pilihan ke client, tiga pertanyaan ini biasanya paling sering muncul di awal percakapan."
          eyebrow="Pertanyaan yang sering muncul"
          title="Jawaban singkat supaya penjelasannya tetap hangat dan mudah diikuti"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {faqs.map((item) => (
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur" key={item.question}>
              <h3 className="text-xl font-semibold text-[var(--text)]">{item.question}</h3>
              <p className="mt-3 text-base leading-7 text-[var(--muted)]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 lg:px-10">
        <div className="rounded-[2.25rem] border border-[var(--line)] bg-[linear-gradient(180deg,var(--surface-strong),var(--surface))] p-8 shadow-[var(--shadow)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--brand)]">Langkah berikutnya</p>
              <h2 className="font-serif text-3xl leading-tight font-semibold text-[var(--text)] sm:text-4xl">
                Setelah melihat katalog, client bisa langsung memilih vendor yang dirasa paling pas lalu lanjut ke halaman tanggal.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                Bagian ini saya sederhanakan supaya lebih tenang dilihat, lebih elegan, dan tetap jelas mengarahkan dari katalog ke pemilihan tanggal tanpa terasa berlebihan.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Link className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5" href="/katalog">
                Buka katalog
              </Link>
              <Link className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-6 py-3.5 text-sm font-semibold text-[var(--text)] transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)]" href="/booking/rosewood-manor">
                Langsung pilih tanggal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
