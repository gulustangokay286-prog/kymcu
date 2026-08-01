'use client';

import { useGoldPrices } from '@/hooks/useGoldPrices';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

function fmt(v: number, unit: string = 'TL'): string {
  if (!v) return '–';
  if (unit === 'USD') return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function time(iso: string): string {
  if (!iso) return '';
  try { return new Date(iso).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
  catch { return ''; }
}

const ORDER = ['has-altin', 'gram-altin', 'ceyrek-altin', 'yarim-altin', 'tam-altin', 'cumhuriyet-altini', 'ata-altin', 'ons-altin'];
const AHLATCI_LABELS: Record<string, string> = {
  'has-altin': 'HAS',
  'gram-altin': 'GRAM',
  'ceyrek-altin': 'ÇEYREK',
  'yarim-altin': 'YARIM',
  'tam-altin': 'TAM',
  'cumhuriyet-altini': 'CUMHURİYET',
  'ata-altin': 'ATA',
  'ons-altin': 'XAU'
};

export function GoldPriceTable() {
  const { prices, lastUpdate, isLoading, changedPrices } = useGoldPrices();

  const sorted = ORDER.map((c) => prices.find((p) => p.code === c)).filter(Boolean);
  const extra = prices.filter((p) => !ORDER.includes(p.code));
  const all = [...sorted, ...extra];

  return (
    <div className="mb-20">
      {/* Luxury Centered Header */}
      <div className="text-center mb-8">
        <h2 className="text-[28px] md:text-[36px] font-bold text-white tracking-[0.2em] uppercase mb-4">
          ALTIN FİYATLARI
        </h2>
        <div className="flex justify-center">
          <Star className="w-5 h-5 text-[#cfa95f] fill-current" />
        </div>
        <div className="text-center text-[10px] text-[#888888] tracking-widest uppercase mt-4">
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
              {all.map((p) => {
                if (!p) return null;
                const label = AHLATCI_LABELS[p.code] || p.name.toUpperCase();
                const flashed = changedPrices.has(p.code);

                return (
                  <tr key={p.code} className={cn('fin-row', flashed && 'cell-flash')}>
                    <td className="py-4 text-[13px] tracking-wider font-semibold text-white/90">{label}</td>
                    <td className="py-4 text-[14px] text-center tabular-nums text-white font-medium">
                      {fmt(p.buyPrice, p.unit)}
                    </td>
                    <td className="py-4 text-[14px] text-right tabular-nums text-white font-medium">
                      {fmt(p.sellPrice, p.unit)}
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
