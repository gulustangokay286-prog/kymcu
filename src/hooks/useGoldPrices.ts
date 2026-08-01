'use client';

import useSWR from 'swr';
import { GoldApiResponse, GoldPrice } from '@/types/gold';
import { API_CONFIG } from '@/lib/constants';
import { useRef, useMemo } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGoldPrices() {
  const previousDataRef = useRef<GoldPrice[]>([]);

  const { data, error, isLoading, isValidating, mutate } = useSWR<GoldApiResponse>(
    '/api/gold',
    fetcher,
    {
      refreshInterval: API_CONFIG.gold.pollInterval,
      revalidateOnFocus: true,
      dedupingInterval: 10000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  // Track which prices changed for animation
  const changedPrices = useMemo(() => {
    const changed = new Set<string>();
    if (data?.data && previousDataRef.current.length > 0) {
      for (const price of data.data) {
        const prev = previousDataRef.current.find((p) => p.code === price.code);
        if (prev && (prev.buyPrice !== price.buyPrice || prev.sellPrice !== price.sellPrice)) {
          changed.add(price.code);
        }
      }
    }
    if (data?.data) {
      previousDataRef.current = data.data;
    }
    return changed;
  }, [data]);

  return {
    prices: data?.data || [],
    lastUpdate: data?.lastUpdate || '',
    source: data?.source || '',
    isLoading,
    isValidating,
    isError: !!error,
    changedPrices,
    refresh: mutate,
  };
}
