import { imageAssets } from "@/mock/imageAssets";
import type { Vendor } from "@/types";

export const vendors: Vendor[] = [
  {
    slug: "rosewood-manor",
    name: "Rosewood Manor",
    category: "Lokasi",
    location: "Taman Utama",
    startingPrice: "$2,400",
    image: imageAssets.rosewoodManor,
    description:
      "Rumah perjamuan bernuansa taman dengan lorong bunga, jamuan malam yang hangat, dan ruang luas untuk tamu terdekat Anda.",
    highlights: ["Akad taman terbuka", "Ruang resepsi intim", "Sesi foto senja"],
    packages: [
      {
        name: "signature",
        label: "Hari Istimewa",
        price: "$2,400",
        description: "Area akad, ruang resepsi, dan sentuhan dekor malam yang rapi.",
      },
      {
        name: "weekend",
        label: "Akhir Pekan Penuh",
        price: "$3,700",
        description: "Akses dua hari lengkap dengan makan malam keluarga inti sebelum acara.",
      },
    ],
  },
  {
    slug: "velvet-bloom",
    name: "Velvet Bloom Atelier",
    category: "Dekorasi",
    location: "Atelier Kota",
    startingPrice: "$1,600",
    image: imageAssets.velvetBloom,
    description:
      "Rangkaian bunga yang dirancang khusus dengan komposisi meja utama yang lembut dan lorong yang terasa manis sejak pandangan pertama.",
    highlights: ["Bunga premium", "Meja pengantin elegan", "Cahaya lilin hangat"],
    packages: [
      {
        name: "petal-edit",
        label: "Rangkaian Inti",
        price: "$1,600",
        description: "Gerbang akad, buket, dan detail meja yang halus.",
      },
      {
        name: "grand-bloom",
        label: "Rangkaian Utama",
        price: "$2,300",
        description: "Penataan bunga menyeluruh dengan instalasi utama yang mencuri perhatian.",
      },
    ],
  },
  {
    slug: "golden-frame-studio",
    name: "Golden Frame Studio",
    category: "Fotografi",
    location: "Tim Editorial",
    startingPrice: "$1,950",
    image: imageAssets.goldenFrame,
    description:
      "Fotografi pernikahan bergaya editorial dengan arahan pose yang tenang, momen candid yang jujur, dan preview cepat di pekan yang sama.",
    highlights: ["Warna ala film", "Arahan timeline", "Preview 72 jam"],
    packages: [
      {
        name: "story-collection",
        label: "Koleksi Cerita",
        price: "$1,950",
        description: "Enam jam pendampingan dengan galeri online yang sudah dipilih rapi.",
      },
      {
        name: "heirloom-collection",
        label: "Koleksi Kenangan",
        price: "$2,850",
        description: "Pendampingan seharian penuh, fotografer kedua, dan album cetak kenangan.",
      },
    ],
  },
  {
    slug: "ivory-feast-catering",
    name: "Ivory Feast Catering",
    category: "Katering",
    location: "Studio Chef",
    startingPrice: "$1,800",
    image: imageAssets.ivoryFeast,
    description:
      "Sajian plated dining dengan rasa yang akrab, sentuhan modern, dan penutup manis yang tampil cantik di meja resepsi.",
    highlights: ["Jamuan plated", "Minuman spesial", "Meja dessert anggun"],
    packages: [
      {
        name: "classic-reception",
        label: "Resepsi Klasik",
        price: "$1,800",
        description: "Menu tiga tahap, tim service, dan sesi cicip sebelum hari acara.",
      },
      {
        name: "chef-experience",
        label: "Pilihan Chef",
        price: "$2,650",
        description: "Pilihan menu lebih lengkap, sajian larut malam, dan bar mocktail spesial.",
      },
    ],
  },
];

export const getVendorBySlug = (vendorSlug: string) =>
  vendors.find((vendor) => vendor.slug === vendorSlug);