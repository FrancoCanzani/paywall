"use server";

import { kv } from "@vercel/kv";

const RATE_LIMIT = 2; // Maximum number of articles per day
const RATE_LIMIT_PERIOD = 24 * 60 * 60; // 24 hours in seconds

export async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `ratelimit:${ip}`;
  const currentCount = (await kv.get<number>(key)) || 0;

  if (currentCount >= RATE_LIMIT) {
    return false;
  }

  if (currentCount === 0) {
    await kv.set(key, 1, { ex: RATE_LIMIT_PERIOD });
  } else {
    await kv.incr(key);
  }

  return true;
}
