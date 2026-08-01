'use client';

import { useExchangeRates } from '@/hooks/useExchangeRates';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

function fmt(v: number): string {
  if (!v) return '–';
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function time(iso: string): string {
  if (!iso) return '';
  try { return new Date(iso).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
  catch { return ''; }
}

const ORDER = ['USD', 'EUR', 'GBP', 'CHF', 'SAR', 'AED', 'RUB'];

export function ExchangeRateTable() {
  const { rates, lastUpdate, isLoading, changedRates } = useExchangeRates();

  const sorted = ORDER.map((c) => rates.find((r) => r.code === c)).filter(Boolean);
  const extra = rates.filter((r) => !ORDER.includes(r.code));
  const all = [...sorted, ...extra];

  return (
    <div className="mb-20">
      {/* Luxury Centered Header */}
      <div className="text-center mb-8">
        <h2 className="text-[28px] md:text-[36px] font-bold text-white tracking-[0.2em] uppercase mb-4">
          DÖVİZ KURLARI
        </h2>
        <div className="flex justify-center">
          <Star className="w-5 h-5 text-[#cfa95f] fill-current" />
        </div>
        <div className="text-right text-[10px] text-[#888888] tracking-widest uppercase mt-4">
          SON GÜNCELLEME ZAMANI : {time(lastUpdate)}
        </div>
      </div>

      {/* Dark Luxury Table */}
      <div className="glass-panel p-6 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr>
                <th className="fin-table-th text-left w-1/3">Kod</th>
                <th className="fin-table-th text-center w-1/3">Alış</th>
                <th className="fin-table-th text-right w-1/3">Satış</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && all.length === 0 && (
                <>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-[#1a1a1a]">
                      <td className="py-5"><div className="h-4 bg-white/10 rounded w-16" /></td>
                      <td className="py-5"><div className="h-4 bg-white/10 rounded w-20 mx-auto" /></td>
                      <td className="py-5"><div className="h-4 bg-white/10 rounded w-20 ml-auto" /></td>
                    </tr>
                  ))}
                </>
              )}
              {all.map((r) => {
                if (!r) return null;
                const flashed = changedRates.has(r.code);

                return (
                  <tr key={r.code} className={cn('fin-row', flashed && 'cell-flash')}>
                    <td className="py-4 text-[13px] tracking-wider font-semibold text-white/90">
                      {r.code}
                    </td>
                    <td className="py-4 text-[14px] text-center tabular-nums text-white font-medium">
                      {fmt(r.buyPrice)}
                    </td>
                    <td className="py-4 text-[14px] text-right tabular-nums text-white font-medium">
                      {fmt(r.sellPrice)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
