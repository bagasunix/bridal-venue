"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type LazyArtImageProps = {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  src: string;
};

export function LazyArtImage({ alt, className, priority = false, sizes, src }: LazyArtImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.05),rgba(255,255,255,0.18),rgba(255,255,255,0.05))] bg-[length:220%_100%] animate-pulse transition-opacity duration-500",
          loaded && "opacity-0",
        )}
      />
      <Image
        alt={alt}
        fill
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        priority={priority}
        sizes={sizes}
        src={src}
        className={cn(
          "object-cover transition-all duration-700 ease-out will-change-transform",
          loaded ? "scale-100 blur-0 opacity-100" : "scale-[1.04] blur-md opacity-0",
        )}
      />
    </div>
  );
}
