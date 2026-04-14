import { useEffect, useState } from "react";
import { Platform } from "react-native";

function dataUriToObjectUrl(dataUri: string) {
  const [header, base64Data] = dataUri.split(",");
  const mimeType = header.match(/data:(.*);base64/)?.[1] ?? "image/jpeg";
  const sanitizedBase64 = base64Data
    .replace(/\s+/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const paddedBase64 =
    sanitizedBase64.length % 4 === 0
      ? sanitizedBase64
      : sanitizedBase64 + "=".repeat(4 - (sanitizedBase64.length % 4));
  const binary = globalThis.atob(paddedBase64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return URL.createObjectURL(new Blob([bytes], { type: mimeType }));
}

export function useResolvedImageSource(dataUri: string) {
  const [resolvedSource, setResolvedSource] = useState(
    Platform.OS === "web" ? "" : dataUri,
  );

  useEffect(() => {
    if (Platform.OS !== "web" || !dataUri.startsWith("data:image")) {
      setResolvedSource(dataUri);
      return undefined;
    }

    try {
      const objectUrl = dataUriToObjectUrl(dataUri);
      setResolvedSource(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } catch {
      setResolvedSource(dataUri);
      return undefined;
    }
  }, [dataUri]);

  return resolvedSource;
}