import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atelier Resepsi",
    short_name: "Atelier",
    description: "Katalog vendor pernikahan yang elegan, hangat, dan mudah membantu client memilih.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe9",
    theme_color: "#c89d56",
    orientation: "portrait",
    lang: "id-ID",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
