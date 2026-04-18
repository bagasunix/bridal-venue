export type VendorPackage = {
  name: string;
  label: string;
  price: string;
  description: string;
};

export type Vendor = {
  slug: string;
  name: string;
  category: string;
  location: string;
  startingPrice: string;
  summary: string;
  description: string;
  highlights: string[];
  packages: VendorPackage[];
  coverClass: string;
  stats: {
    label: string;
    value: string;
  }[];
};

export const vendors: Vendor[] = [
  {
    slug: "rosewood-manor",
    name: "Rosewood Manor",
    category: "Venue",
    location: "Jakarta Selatan",
    startingPrice: "Rp48 juta",
    summary: "Ballroom hangat dengan sentuhan taman privat untuk akad, makan malam keluarga, dan resepsi intimate yang terasa rapi.",
    description:
      "Pilihan ini cocok untuk client yang ingin suasana anggun tanpa terasa terlalu besar. Sirkulasi tamu nyaman, area foto sudah enak dilihat, dan transisi dari akad ke resepsi terasa mulus.",
    highlights: ["Private garden access", "Ruang resepsi fleksibel", "Lighting malam yang lembut"],
    packages: [
      {
        name: "signature-evening",
        label: "Signature Evening",
        price: "Rp48 juta",
        description: "Venue utama, garden ceremony, pencahayaan malam, dan pengaturan alur tamu yang rapi.",
      },
      {
        name: "weekend-atelier",
        label: "Weekend Atelier",
        price: "Rp67 juta",
        description: "Durasi lebih panjang dengan sesi family dinner dan waktu setup yang lebih leluasa.",
      },
    ],
    coverClass: "bg-[radial-gradient(circle_at_top_left,_rgba(244,216,171,0.55),_transparent_42%),linear-gradient(135deg,_#1e293b,_#0f172a_45%,_#334155)]",
    stats: [
      { label: "Kapasitas nyaman", value: "220 tamu" },
      { label: "Setup favorit", value: "Indoor + garden" },
      { label: "Lead time", value: "3 minggu" },
    ],
  },
  {
    slug: "velvet-bloom",
    name: "Velvet Bloom Atelier",
    category: "Dekorasi",
    location: "Jakarta Pusat",
    startingPrice: "Rp22 juta",
    summary: "Rangkaian bunga bernapas modern dengan layering warna lembut, styling meja pengantin, dan detail aisle yang tampil meyakinkan.",
    description:
      "Tim ini kuat untuk presentasi client yang ingin tampilan romantis, dewasa, dan tidak terlalu ramai. Moodboard mudah diarahkan dan hasil akhirnya tetap terasa personal.",
    highlights: ["Floral styling premium", "Backdrop clean sculptural", "Meja utama yang fotogenik"],
    packages: [
      {
        name: "petal-story",
        label: "Petal Story",
        price: "Rp22 juta",
        description: "Dekor area akad, meja signing, buket, dan aisle detail yang serasi.",
      },
      {
        name: "grand-bloom",
        label: "Grand Bloom",
        price: "Rp34 juta",
        description: "Instalasi utama skala besar dengan layering bunga, lilin, dan styling meja resepsi.",
      },
    ],
    coverClass: "bg-[radial-gradient(circle_at_top_left,_rgba(245,181,213,0.5),_transparent_42%),linear-gradient(135deg,_#3f1d3f,_#6d325d_52%,_#d4a373)]",
    stats: [
      { label: "Gaya favorit", value: "Modern romantic" },
      { label: "Waktu setup", value: "8 jam" },
      { label: "Revisi moodboard", value: "2 putaran" },
    ],
  },
  {
    slug: "golden-frame-studio",
    name: "Golden Frame Studio",
    category: "Fotografi",
    location: "Jakarta Barat",
    startingPrice: "Rp28 juta",
    summary: "Pendekatan editorial yang tenang untuk pasangan yang ingin hasil foto terlihat mahal, natural, dan tetap hangat saat dilihat ulang.",
    description:
      "Cocok untuk client yang peduli pada arah visual. Timnya enak diajak menyusun timeline, menangkap momen candid, dan memberi preview cepat untuk kebutuhan keluarga atau sosial media.",
    highlights: ["Tone warna clean", "Arahan pose santai", "Preview cepat 72 jam"],
    packages: [
      {
        name: "story-collection",
        label: "Story Collection",
        price: "Rp28 juta",
        description: "Satu hari dokumentasi, teaser preview, dan gallery digital yang sudah dirapikan.",
      },
      {
        name: "heirloom-collection",
        label: "Heirloom Collection",
        price: "Rp39 juta",
        description: "Tim tambahan, durasi lebih panjang, dan album cetak untuk keluarga inti.",
      },
    ],
    coverClass: "bg-[radial-gradient(circle_at_top_left,_rgba(227,202,151,0.42),_transparent_40%),linear-gradient(135deg,_#0f172a,_#475569_48%,_#b08968)]",
    stats: [
      { label: "Gaya edit", value: "Editorial warm" },
      { label: "Preview awal", value: "72 jam" },
      { label: "Tim inti", value: "2 fotografer" },
    ],
  },
  {
    slug: "ivory-feast-catering",
    name: "Ivory Feast Catering",
    category: "Katering",
    location: "Jakarta Utara",
    startingPrice: "Rp31 juta",
    summary: "Menu plated dan buffet yang terasa akrab, plating rapi, dan service flow yang memudahkan host tetap fokus menikmati acara.",
    description:
      "Pilihan ini ideal untuk client yang ingin rasa aman: makanan enak, tampilan proper, dan ritme service yang tidak bikin acara tersendat.",
    highlights: ["Menu tasting terarah", "Display dessert elegan", "Flow service rapi"],
    packages: [
      {
        name: "classic-reception",
        label: "Classic Reception",
        price: "Rp31 juta",
        description: "Buffet utama, dessert table, dan tasting session sebelum acara.",
      },
      {
        name: "chef-signature",
        label: "Chef Signature",
        price: "Rp44 juta",
        description: "Pilihan menu lebih luas, live station, dan minuman spesial untuk keluarga dekat.",
      },
    ],
    coverClass: "bg-[radial-gradient(circle_at_top_left,_rgba(251,214,165,0.45),_transparent_40%),linear-gradient(135deg,_#1f2937,_#3f3f46_48%,_#92400e)]",
    stats: [
      { label: "Format layanan", value: "Buffet + plated" },
      { label: "Menu populer", value: "Nusantara modern" },
      { label: "Kapasitas", value: "250 pax" },
    ],
  },
];

export const vendorCategories = ["Semua", ...new Set(vendors.map((vendor) => vendor.category))];

export function getVendorBySlug(slug: string) {
  return vendors.find((vendor) => vendor.slug === slug);
}
