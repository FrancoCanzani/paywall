import { headers } from "next/headers";

export function getClientIP(): string {
  const forwardedFor = headers().get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headers().get("x-real-ip") || "unknown";
}
