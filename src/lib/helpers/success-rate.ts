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

interface UrlStats {
  url: string;
  successes: number;
  failures: number;
  successRate: number;
}

export async function getTotalSuccessRate(): Promise<{
  urlStats: UrlStats[];
  totalSuccesses: number;
  totalFailures: number;
  overallSuccessRate: number;
}> {
  const allSuccessKeys = await kv.keys('success-*');
  const allFailureKeys = await kv.keys('failure-*');

  const urlMap = new Map<string, UrlStats>();

  for (const successKey of allSuccessKeys) {
    const url = successKey.replace('success-', '');
    const successes = (await kv.get<number>(successKey)) || 0;
    urlMap.set(url, { url, successes, failures: 0, successRate: 0 });
  }

  for (const failureKey of allFailureKeys) {
    const url = failureKey.replace('failure-', '');
    const failures = (await kv.get<number>(failureKey)) || 0;
    const stats = urlMap.get(url) || {
      url,
      successes: 0,
      failures: 0,
      successRate: 0,
    };
    stats.failures = failures;
    urlMap.set(url, stats);
  }

  let totalSuccesses = 0;
  let totalFailures = 0;

  const urlStats: UrlStats[] = Array.from(urlMap.values()).map((stats) => {
    const total = stats.successes + stats.failures;
    stats.successRate = total === 0 ? 0 : (stats.successes / total) * 100;
    totalSuccesses += stats.successes;
    totalFailures += stats.failures;
    return stats;
  });

  urlStats.sort((a, b) => b.successRate - a.successRate);

  const totalAttempts = totalSuccesses + totalFailures;
  const overallSuccessRate =
    totalAttempts === 0 ? 0 : (totalSuccesses / totalAttempts) * 100;

  return {
    urlStats,
    totalSuccesses,
    totalFailures,
    overallSuccessRate,
  };
}
