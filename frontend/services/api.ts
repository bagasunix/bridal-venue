import Constants from "expo-constants";

const extra = (Constants.expoConfig?.extra ?? {}) as { backendUrl?: string };

const backendRoot =
  extra.backendUrl ?? process.env.EXPO_PUBLIC_BACKEND_URL ?? process.env.EXPO_BACKEND_URL ?? "";

export const apiRoot = backendRoot
  ? `${backendRoot.replace(/\/+$/, "")}/api`
  : "/api";

export async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiRoot}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMessage =
      typeof errorBody?.detail === "string"
        ? errorBody.detail
        : "Something went wrong";
    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
}