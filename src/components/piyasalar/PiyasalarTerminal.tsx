'use client';

import { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, Clock } from 'lucide-react';

type AssetCategory = 'BIST' | 'Endeksler' | 'Emtia' | 'Kripto';

interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  category: AssetCategory;
  volume: string;
}

// Mock Data for the Terminal
const MOCK_ASSETS: Asset[] = [
  // BIST 100
  { id: '1', symbol: 'THYAO', name: 'Türk Hava Yolları', price: 295.50, change: 4.5, changePercent: 1.55, category: 'BIST', volume: '12.5B' },
  { id: '2', symbol: 'ISCTR', name: 'İş Bankası (C)', price: 13.85, change: -0.15, changePercent: -1.07, category: 'BIST', volume: '8.2B' },
  { id: '3', symbol: 'KCHOL', name: 'Koç Holding', price: 215.10, change: 2.1, changePercent: 0.99, category: 'BIST', volume: '5.1B' },
  { id: '4', symbol: 'TUPRS', name: 'Tüpraş', price: 165.40, change: -1.2, changePercent: -0.72, category: 'BIST', volume: '7.8B' },
  { id: '5', symbol: 'ASELS', name: 'Aselsan', price: 58.60, change: 1.15, changePercent: 2.00, category: 'BIST', volume: '6.4B' },
  
  // Global Indices
  { id: '6', symbol: 'SPX', name: 'S&P 500', price: 5432.10, change: 25.4, changePercent: 0.47, category: 'Endeksler', volume: '2.1T' },
  { id: '7', symbol: 'NDX', name: 'Nasdaq 100', price: 19850.40, change: -120.5, changePercent: -0.60, category: 'Endeksler', volume: '4.5T' },
  { id: '8', symbol: 'DXY', name: 'Dolar Endeksi', price: 105.20, change: 0.15, changePercent: 0.14, category: 'Endeksler', volume: '-' },
  
  // Commodities
  { id: '9', symbol: 'XAU/USD', name: 'Ons Altın', price: 2415.60, change: 12.3, changePercent: 0.51, category: 'Emtia', volume: '-' },
  { id: '10', symbol: 'XAG/USD', name: 'Ons Gümüş', price: 31.20, change: 0.45, changePercent: 1.46, category: 'Emtia', volume: '-' },
  { id: '11', symbol: 'BRENT', name: 'Brent Petrol', price: 82.40, change: -0.8, changePercent: -0.96, category: 'Emtia', volume: '-' },
  
  // Crypto
  { id: '12', symbol: 'BTC/USD', name: 'Bitcoin', price: 64250.00, change: 1250.0, changePercent: 1.98, category: 'Kripto', volume: '45B' },
  { id: '13', symbol: 'ETH/USD', name: 'Ethereum', price: 3450.20, change: 45.6, changePercent: 1.34, category: 'Kripto', volume: '18B' },
  { id: '14', symbol: 'SOL/USD', name: 'Solana', price: 145.80, change: -5.2, changePercent: -3.44, category: 'Kripto', volume: '3.2B' },
];

const CATEGORIES: AssetCategory[] = ['BIST', 'Endeksler', 'Emtia', 'Kripto'];

export function PiyasalarTerminal() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<AssetCategory | 'TÜMÜ'>('TÜMÜ');

  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter((asset) => {
      const matchesSearch = 
        asset.symbol.toLowerCase().includes(search.toLowerCase()) || 
        asset.name.toLowerCase().includes(search.toLowerCase());
      
      const matchesTab = activeTab === 'TÜMÜ' || asset.category === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  return (
    <div className="bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Terminal Toolbar */}
      <div className="p-4 border-b border-white/10 flex flex-col md:flex-row justify-between gap-4">
        
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <button
            onClick={() => setActiveTab('TÜMÜ')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'TÜMÜ' 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            TÜMÜ
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === cat 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Sembol veya isim ara..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
          />
        </div>
      </div>

      {/* Terminal Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[11px] md:text-xs font-semibold text-white/40 uppercase tracking-wider bg-black/20">
        <div className="col-span-5 md:col-span-4">Sembol / İsim</div>
        <div className="col-span-3 text-right">Son Fiyat</div>
        <div className="col-span-4 md:col-span-3 text-right">Fark (%)</div>
        <div className="hidden md:block md:col-span-2 text-right">Hacim</div>
      </div>

      {/* Terminal List */}
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        {filteredAssets.length === 0 ? (
          <div className="p-12 text-center text-white/40">
            Aramanıza uygun sonuç bulunamadı.
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredAssets.map((asset) => {
              const isPositive = asset.change >= 0;
              return (
                <div 
                  key={asset.id} 
                  className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center group cursor-pointer"
                >
                  <div className="col-span-5 md:col-span-4 flex flex-col">
                    <span className="font-bold text-white text-sm md:text-base group-hover:text-rose-400 transition-colors">
                      {asset.symbol}
                    </span>
                    <span className="text-xs text-white/50 truncate">
                      {asset.name}
                    </span>
                  </div>
                  
                  <div className="col-span-3 text-right font-mono text-sm md:text-base text-white">
                    {asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  
                  <div className="col-span-4 md:col-span-3 text-right flex items-center justify-end gap-2">
                    <div className={`flex flex-col items-end ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      <span className="font-mono text-sm md:text-base font-semibold">
                        {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                      </span>
                      <span className="text-[10px] md:text-xs font-mono opacity-80">
                        {isPositive ? '+' : ''}{asset.change.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-400 hidden lg:block" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400 hidden lg:block" />
                    )}
                  </div>
                  
                  <div className="hidden md:flex md:col-span-2 text-right justify-end font-mono text-sm text-white/60">
                    {asset.volume}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="p-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Canlı Veri Bağlantısı Aktif
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3" />
          {new Date().toLocaleTimeString('tr-TR')}
        </div>
      </div>
    </div>
  );
}
