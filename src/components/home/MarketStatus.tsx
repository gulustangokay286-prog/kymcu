'use client';

import { BUSINESS } from '@/lib/constants';
import { Clock, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export function MarketStatus() {
  const [time, setTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
      
      const day = now.getDay(); // 0 = Sunday, 1 = Monday...
      const hour = now.getHours();
      
      // Basic market hours logic (Mon-Sat 09:00 - 18:30)
      if (day !== 0 && hour >= 9 && hour < 19) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-lg overflow-hidden mt-6">
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-black/20">
        <h3 className="text-[13px] font-bold tracking-[0.2em] uppercase text-white">Piyasa Durumu</h3>
        <Clock className="w-4 h-4 text-[var(--color-primary)]" />
      </div>
      
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em]">Durum</span>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 live-pulse' : 'bg-red-500'}`} />
            <span className={`text-[12px] font-bold ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
              {isOpen ? 'PİYASALAR AÇIK' : 'PİYASALAR KAPALI'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em]">Yerel Saat</span>
          <span className="text-[14px] font-medium tabular-nums text-white">{time}</span>
        </div>

        <div className="bg-white/5 p-4 rounded-md border border-white/10 flex gap-3 mt-4">
          <Info className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
          <p className="text-[11px] text-white/70 leading-relaxed">
            Fiyatlarımız {BUSINESS.address.city} fiziki serbest piyasa koşullarına göre anlık olarak güncellenmektedir. Toptan işlemler için kur farklılıkları olabilir.
          </p>
        </div>
      </div>
    </div>
  );
}
