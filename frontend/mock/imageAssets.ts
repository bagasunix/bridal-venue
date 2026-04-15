import { goldenFrameImage } from "@/mock/images/goldenFrame";
import { ivoryFeastImage } from "@/mock/images/ivoryFeast";
import { rosewoodManorImage } from "@/mock/images/rosewoodManor";
import { velvetBloomImage } from "@/mock/images/velvetBloom";

const normalizeImageDataUri = (value: string) => {
  const [prefix, payload = ""] = value.split(",", 2);
  return `${prefix},${payload.replace(/\s+/g, "")}`;
};

export const imageAssets = {
  rosewoodManor: normalizeImageDataUri(rosewoodManorImage),
  ivoryFeast: normalizeImageDataUri(ivoryFeastImage),
  goldenFrame: normalizeImageDataUri(goldenFrameImage),
  velvetBloom: normalizeImageDataUri(velvetBloomImage),
} as const;