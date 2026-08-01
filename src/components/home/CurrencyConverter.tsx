'use client';

import { useState, useEffect } from 'react';
import { useGoldPrices } from '@/hooks/useGoldPrices';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { ArrowDownUp } from 'lucide-react';

export function CurrencyConverter() {
  const { prices: goldPrices } = useGoldPrices();
  const { rates: fxRates } = useExchangeRates();

  const [amount, setAmount] = useState<string>('1000');
  const [fromAsset, setFromAsset] = useState<string>('TRY');
  const [toAsset, setToAsset] = useState<string>('USD');
  const [result, setResult] = useState<number | null>(null);

  // Combine assets for the dropdowns
  const assets = [
    { code: 'TRY', name: 'Türk Lirası', type: 'fiat', sellPrice: 1, buyPrice: 1 },
    ...fxRates.filter(r => ['USD', 'EUR', 'GBP'].includes(r.code)).map(r => ({
      code: r.code, name: r.name, type: 'fiat', sellPrice: r.sellPrice, buyPrice: r.buyPrice
    })),
    ...goldPrices.filter(p => ['gram-altin', 'ceyrek-altin', 'ons-altin'].includes(p.code)).map(p => ({
      code: p.code, name: p.name, type: 'gold', sellPrice: p.sellPrice, buyPrice: p.buyPrice
    }))
  ];

  useEffect(() => {
    calculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromAsset, toAsset, goldPrices, fxRates]);

  const calculate = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setResult(null);
      return;
    }

    const from = assets.find(a => a.code === fromAsset);
    const to = assets.find(a => a.code === toAsset);

    if (!from || !to) return;

    let amountInTry = numAmount;
    if (from.code !== 'TRY') {
      amountInTry = numAmount * from.buyPrice;
    }

    let finalAmount = amountInTry;
    if (to.code !== 'TRY') {
      finalAmount = amountInTry / to.sellPrice;
    }

    setResult(finalAmount);
  };

  const swapAssets = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
  };

  return (
    <div className="glass-panel rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/20">
        <h3 className="text-[13px] font-bold tracking-[0.2em] uppercase text-white">Çevirici</h3>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-[10px] font-semibold text-[#888] uppercase tracking-[0.2em] mb-2">
            Miktar
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-md text-[16px] text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors tabular-nums"
            placeholder="Miktar girin"
            min="0"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-[#888] uppercase tracking-[0.2em] mb-2">
              Alınan
            </label>
            <select
              value={fromAsset}
              onChange={(e) => setFromAsset(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-[13px] text-white focus:outline-none focus:border-[#cfa95f] transition-colors appearance-none"
            >
              {assets.map(a => (
                <option key={`from-${a.code}`} value={a.code}>{a.code === 'TRY' ? 'TL' : a.name}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={swapAssets}
            className="mt-6 p-3 rounded-full border border-white/10 bg-black hover:bg-white/5 hover:border-[#cfa95f] text-white/50 hover:text-[#cfa95f] transition-all"
            title="Değiştir"
          >
            <ArrowDownUp className="w-4 h-4" />
          </button>

          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-[#888] uppercase tracking-[0.2em] mb-2">
              İstenen
            </label>
            <select
              value={toAsset}
              onChange={(e) => setToAsset(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-[13px] text-white focus:outline-none focus:border-[#cfa95f] transition-colors appearance-none"
            >
              {assets.map(a => (
                <option key={`to-${a.code}`} value={a.code}>{a.code === 'TRY' ? 'TL' : a.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-6 mt-4 border-t border-white/5 text-center">
          <div className="text-[10px] font-semibold text-[#888] uppercase tracking-[0.2em] mb-3">Hesaplanan Tutar</div>
          <div className="text-[28px] font-bold text-[#cfa95f] tabular-nums tracking-wider">
            {result !== null ? (
              <>
                {result.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                <span className="text-[14px] text-[#888] ml-2 font-medium">
                  {toAsset === 'TRY' ? '₺' : assets.find(a => a.code === toAsset)?.code === 'ons-altin' || assets.find(a => a.code === toAsset)?.code === 'gram-altin' || assets.find(a => a.code === toAsset)?.code === 'ceyrek-altin' ? '' : toAsset}
                </span>
              </>
            ) : (
              '0,00'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
