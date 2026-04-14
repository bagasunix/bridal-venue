import { goldenFrameImage } from "@/mock/images/goldenFrame";
import { ivoryFeastImage } from "@/mock/images/ivoryFeast";
import { rosewoodManorImage } from "@/mock/images/rosewoodManor";
import { velvetBloomImage } from "@/mock/images/velvetBloom";

const sanitizeImageDataUri = (
  value: string,
  options?: { append?: string; trimEnd?: number },
) => {
  const [prefix, payload = ""] = value.split(",", 2);
  const normalizedPayload = payload.replace(/\s+/g, "");
  const trimmedPayload = options?.trimEnd
    ? normalizedPayload.slice(0, -options.trimEnd)
    : normalizedPayload;

  return `${prefix},${trimmedPayload}${options?.append ?? ""}`;
};

export const imageAssets = {
  rosewoodManor: sanitizeImageDataUri(rosewoodManorImage),
  ivoryFeast: sanitizeImageDataUri(ivoryFeastImage),
  goldenFrame: sanitizeImageDataUri(goldenFrameImage, { trimEnd: 2 }),
  velvetBloom: sanitizeImageDataUri(velvetBloomImage, { append: "=" }),
} as const;