import { imageAssets } from "@/mock/imageAssets";
import type { Vendor } from "@/types";

export const vendors: Vendor[] = [
  {
    slug: "rosewood-manor",
    name: "Rosewood Manor",
    category: "Venue",
    location: "Garden District",
    startingPrice: "$2,400",
    image: imageAssets.rosewoodManor,
    description:
      "A sunlit estate with floral aisles, candlelit dinners, and room for your full guest list.",
    highlights: ["Outdoor vows", "Reception lounge", "Golden hour portraits"],
    packages: [
      {
        name: "signature",
        label: "Signature Day",
        price: "$2,400",
        description: "Ceremony lawn, reception hall, and evening styling.",
      },
      {
        name: "weekend",
        label: "Weekend Estate",
        price: "$3,700",
        description: "Two-day access with rehearsal dinner setup included.",
      },
    ],
  },
  {
    slug: "velvet-bloom",
    name: "Velvet Bloom Atelier",
    category: "Decor",
    location: "City Atelier",
    startingPrice: "$1,600",
    image: imageAssets.velvetBloom,
    description:
      "Custom floral styling with sculptural centerpieces and romantic aisle framing.",
    highlights: ["Premium florals", "Sweetheart table", "Soft candle styling"],
    packages: [
      {
        name: "petal-edit",
        label: "Petal Edit",
        price: "$1,600",
        description: "Ceremony arch, bouquets, and table accents.",
      },
      {
        name: "grand-bloom",
        label: "Grand Bloom",
        price: "$2,300",
        description: "Full venue floral styling with statement installations.",
      },
    ],
  },
  {
    slug: "golden-frame-studio",
    name: "Golden Frame Studio",
    category: "Photography",
    location: "Editorial Team",
    startingPrice: "$1,950",
    image: imageAssets.goldenFrame,
    description:
      "Editorial wedding photography with guided portraits, candid storytelling, and same-week previews.",
    highlights: ["Film-inspired edits", "Timeline planning", "72-hour previews"],
    packages: [
      {
        name: "story-collection",
        label: "Story Collection",
        price: "$1,950",
        description: "Six hours of coverage with curated online gallery.",
      },
      {
        name: "heirloom-collection",
        label: "Heirloom Collection",
        price: "$2,850",
        description: "Full-day coverage, second shooter, and printed keepsake book.",
      },
    ],
  },
  {
    slug: "ivory-feast-catering",
    name: "Ivory Feast Catering",
    category: "Catering",
    location: "Chef-led Studio",
    startingPrice: "$1,800",
    image: imageAssets.ivoryFeast,
    description:
      "Elegant plated dining with modern classics, signature cocktails, and refined dessert styling.",
    highlights: ["Plated dinner", "Cocktail hour", "Dessert styling"],
    packages: [
      {
        name: "classic-reception",
        label: "Classic Reception",
        price: "$1,800",
        description: "Three-course menu, servers, and tasting consult.",
      },
      {
        name: "chef-experience",
        label: "Chef Experience",
        price: "$2,650",
        description: "Expanded menu, late-night bites, and signature mocktail bar.",
      },
    ],
  },
];

export const getVendorBySlug = (vendorSlug: string) =>
  vendors.find((vendor) => vendor.slug === vendorSlug);