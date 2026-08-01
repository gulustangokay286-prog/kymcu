'use client';

import useSWR from 'swr';
import { ExchangeApiResponse, ExchangeRate } from '@/types/exchange';
import { API_CONFIG } from '@/lib/constants';
import { useRef, useMemo } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useExchangeRates() {
  const previousDataRef = useRef<ExchangeRate[]>([]);

  const { data, error, isLoading, isValidating, mutate } = useSWR<ExchangeApiResponse>(
    '/api/exchange',
    fetcher,
    {
      refreshInterval: API_CONFIG.exchange.pollInterval,
      revalidateOnFocus: true,
      dedupingInterval: 10000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  // Track which rates changed for animation
  const changedRates = useMemo(() => {
    const changed = new Set<string>();
    if (data?.data && previousDataRef.current.length > 0) {
      for (const rate of data.data) {
        const prev = previousDataRef.current.find((r) => r.code === rate.code);
        if (prev && (prev.buyPrice !== rate.buyPrice || prev.sellPrice !== rate.sellPrice)) {
          changed.add(rate.code);
        }
      }
    }
    if (data?.data) {
      previousDataRef.current = data.data;
    }
    return changed;
  }, [data]);

  return {
    rates: data?.data || [],
    lastUpdate: data?.lastUpdate || '',
    source: data?.source || '',
    isLoading,
    isValidating,
    isError: !!error,
    changedRates,
    refresh: mutate,
  };
}
