'use server';

import { kv } from '@vercel/kv';

export async function incrementSuccessCount(url: string): Promise<void> {
  const successKey = `success-${new URL(url).hostname}`;
  const successCount = (await kv.get<number>(successKey)) || 0;
  await kv.set(successKey, successCount + 1);
}

export async function incrementFailureCount(url: string): Promise<void> {
  const failureKey = `failure-${new URL(url).hostname}`;
  const failureCount = (await kv.get<number>(failureKey)) || 0;
  await kv.set(failureKey, failureCount + 1);
}

export async function getSuccessCount(url: string): Promise<number> {
  const successKey = `success-${new URL(url).hostname}`;
  return (await kv.get<number>(successKey)) || 0;
}

export async function getFailureCount(url: string): Promise<number> {
  const failureKey = `failure-${new URL(url).hostname}`;
  return (await kv.get<number>(failureKey)) || 0;
}

export async function getTotalSuccessRate(): Promise<{
  totalSuccesses: number;
  totalFailures: number;
  successRate: number;
}> {
  const allSuccessKeys = await kv.keys('success-*');
  const allFailureKeys = await kv.keys('failure-*');

  let totalSuccesses = 0;
  let totalFailures = 0;

  for (const successKey of allSuccessKeys) {
    totalSuccesses += (await kv.get<number>(successKey)) || 0;
  }

  for (const failureKey of allFailureKeys) {
    totalFailures += (await kv.get<number>(failureKey)) || 0;
  }

  const totalAttempts = totalSuccesses + totalFailures;
  const successRate =
    totalAttempts === 0 ? 0 : (totalSuccesses / totalAttempts) * 100;

  return { totalSuccesses, totalFailures, successRate };
}
