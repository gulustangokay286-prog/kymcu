'use client';

import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const MOCK_INDICES = [
  { name: 'BIST 100', value: '10.842,50', change: '+1.24%', isUp: true },
  { name: 'S&P 500', value: '5.234,10', change: '+0.85%', isUp: true },
  { name: 'NASDAQ', value: '16.512,30', change: '-0.42%', isUp: false },
  { name: 'BRENT', value: '$84.50', change: '+1.10%', isUp: true },
  { name: 'GÜMÜŞ', value: '$29.40', change: '-0.15%', isUp: false },
];

export function BorsaWidget() {
  return (
    <div className="glass-panel rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-black/20">
        <h3 className="text-[13px] font-bold tracking-[0.2em] uppercase text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-[var(--color-primary)]" />
          Küresel Piyasalar
        </h3>
      </div>
      
      <div className="p-2">
        {MOCK_INDICES.map((index, i) => (
          <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
            <span className="text-[13px] font-semibold text-white/90">{index.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-[13px] tabular-nums font-medium text-white">{index.value}</span>
              <span className={`text-[12px] tabular-nums font-bold flex items-center gap-1 w-16 justify-end ${index.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {index.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {index.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
