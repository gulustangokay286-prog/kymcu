import { NextResponse } from 'next/server';
import { cache } from '@/lib/cache';
import { fetchGoldPrices } from '@/lib/providers/gold-provider';
import { GoldApiResponse } from '@/types/gold';

const CACHE_KEY = 'gold_prices';
const CACHE_TTL = 30; // seconds

export async function GET() {
  // Check cache first
  const cached = cache.get<GoldApiResponse>(CACHE_KEY);
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
    const { data, source } = await fetchGoldPrices();
    const lastUpdate = new Date().toISOString();

    const response: GoldApiResponse = {
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
    console.error('[API /gold] Error:', error);

    // Try serving stale data
    const stale = cache.getStale<GoldApiResponse>(CACHE_KEY);
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
