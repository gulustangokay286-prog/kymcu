import { NextResponse } from 'next/server';
import { cache } from '@/lib/cache';
import { fetchExchangeRates } from '@/lib/providers/exchange-provider';
import { ExchangeApiResponse } from '@/types/exchange';

const CACHE_KEY = 'exchange_rates';
const CACHE_TTL = 30; // seconds

export async function GET() {
  // Check cache first
  const cached = cache.get<ExchangeApiResponse>(CACHE_KEY);
  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
        'X-Cache': 'HIT',
        'X-Cache-Age': String(cache.getAge(CACHE_KEY) || 0),
      },
    });
  }

  try {
    const { data, source } = await fetchExchangeRates();
    const lastUpdate = new Date().toISOString();

    const response: ExchangeApiResponse = {
      success: true,
      data,
      lastUpdate,
      source,
    };

    // Store in cache
    cache.set(CACHE_KEY, response, CACHE_TTL);

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('[API /exchange] Error:', error);

    // Try serving stale data
    const stale = cache.getStale<ExchangeApiResponse>(CACHE_KEY);
    if (stale) {
      return NextResponse.json(
        { ...stale, stale: true },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=5',
            'X-Cache': 'STALE',
          },
        }
      );
    }

    return NextResponse.json(
      { success: false, data: [], lastUpdate: '', source: 'none', error: 'Service unavailable' },
      { status: 503 }
    );
  }
}
