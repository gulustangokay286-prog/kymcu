import type { Metadata } from 'next';
import { GoldPriceTable } from '@/components/gold/GoldPriceTable';

export const metadata: Metadata = {
  title: 'Canlı Altın Fiyatları - Gram, Çeyrek, Yarım, Tam Altın',
  description:
    'Güncel altın fiyatları: Gram altın, çeyrek altın, yarım altın, tam altın, cumhuriyet altını, ata altın, has altın ve ons altın alış-satış fiyatları. Kapalıçarşı referanslı anlık fiyatlar.',
};

export default function AltinFiyatlariPage() {
  return (
    <div className="bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-[24px] md:text-[32px] font-bold text-white mb-2 luxury-title">
          Canlı Altın Fiyatları
        </h1>
        <p className="text-[14px] md:text-[16px] text-white/60 mb-6">
          Kapalıçarşı referanslı güncel altın alış ve satış fiyatları. Veriler otomatik güncellenmektedir.
        </p>
      </div>

      <div className="border-t border-b border-white/10 py-8 bg-[#020617]/50">
        <div className="max-w-[1200px] mx-auto px-4">
          <GoldPriceTable />
        </div>
      </div>

      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="max-w-3xl text-[14px] md:text-[15px] text-white/70 space-y-4">
          <h2 className="text-[18px] font-semibold text-white mb-4">
            Altın Türleri ve Standartları
          </h2>
          <p>
            Türkiye piyasasında işlem gören fiziki altın türleri, İstanbul Kapalıçarşı referans fiyatlarına göre işlem görmektedir.
          </p>
          <ul className="space-y-3 list-disc pl-5 mt-6">
            <li><strong className="text-rose-400">Gram Altın:</strong> 1 gram ağırlığında, 24 ayar (995/1000 saflık) standart fiziki külçe veya paket altın.</li>
            <li><strong className="text-rose-400">Çeyrek Altın:</strong> 1.75 gram ağırlığında, 22 ayar standart T.C. Darphane üretimi altın.</li>
            <li><strong className="text-rose-400">Yarım Altın:</strong> 3.50 gram ağırlığında, 22 ayar altın.</li>
            <li><strong className="text-rose-400">Tam Altın:</strong> 7.00 gram ağırlığında, 22 ayar altın.</li>
            <li><strong className="text-rose-400">Cumhuriyet (Ata) Altını:</strong> 7.22 gram ağırlığında, 22 ayar altın. Standart tam altından farklı olarak Atatürk silüeti barındırır.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
