'use client';

import { useGoldPrices } from '@/hooks/useGoldPrices';
import { useExchangeRates } from '@/hooks/useExchangeRates';

export function TopBar() {
  const { prices } = useGoldPrices();
  const { rates } = useExchangeRates();

  const items: { label: string; value: string; pct: number }[] = [];

  // Gold
  const gram = prices.find((p) => p.code === 'gram-altin');
  if (gram) items.push({ label: 'GRAM ALTIN', value: `₺${gram.buyPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, pct: gram.changePercent });

  const ons = prices.find((p) => p.code === 'ons-altin');
  if (ons) items.push({ label: 'ONS', value: `$${ons.buyPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, pct: ons.changePercent });

  // FX
  for (const r of rates) {
    if (['USD', 'EUR', 'GBP'].includes(r.code)) {
      items.push({ label: `${r.code}/TRY`, value: `₺${r.buyPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, pct: r.changePercent });
    }
  }

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div className="bg-ticker-bg text-[11px] h-7 flex items-center overflow-hidden no-scrollbar select-none">
      <div className="ticker-scroll flex items-center gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-4 text-neutral-400">
            <span className="text-neutral-500 font-medium">{item.label}</span>
            <span className="text-white tabular-nums font-medium">{item.value}</span>
            <span className={`tabular-nums ${item.pct >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {item.pct >= 0 ? '▲' : '▼'}{Math.abs(item.pct).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
