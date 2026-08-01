import type { Metadata } from 'next';
import { ExchangeRateTable } from '@/components/exchange/ExchangeRateTable';

export const metadata: Metadata = {
  title: 'Canlı Döviz Kurları - Dolar, Euro, Sterlin',
  description:
    'Güncel döviz kurları: USD/TRY, EUR/TRY, GBP/TRY, CHF/TRY alış-satış fiyatları. Anlık döviz kuru takibi ve güncel piyasa verileri.',
};

export default function DovizKurlariPage() {
  return (
    <div className="bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-[24px] md:text-[32px] font-bold text-white mb-2 luxury-title">
          Canlı Döviz Kurları
        </h1>
        <p className="text-[14px] md:text-[16px] text-white/60 mb-6">
          Güncel döviz alış ve satış kurları. Veriler piyasa saatleri içerisinde otomatik güncellenmektedir.
        </p>
      </div>

      <div className="border-t border-b border-white/10 py-8 bg-[#020617]/50">
        <div className="max-w-[1200px] mx-auto px-4">
          <ExchangeRateTable />
        </div>
      </div>

      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="max-w-3xl text-[14px] md:text-[15px] text-white/70 space-y-4">
          <h2 className="text-[18px] font-semibold text-white mb-4">
            Döviz Piyasası Bilgilendirmesi
          </h2>
          <p>
            Serbest piyasa döviz kurları, uluslararası piyasalardaki arz-talep dengesine göre anlık olarak belirlenmektedir. T.C. Merkez Bankası tarafından açıklanan gösterge kurlar ile serbest piyasa kurları arasında farklılıklar görülebilir.
          </p>
          <p>
            Tabloda yer alan <strong className="text-blue-400">Alış</strong> fiyatı, kurumumuzun müşteriden döviz alırken uyguladığı bedeli; <strong className="text-blue-400">Satış</strong> fiyatı ise müşteriye döviz satarken uyguladığı bedeli ifade eder. İki fiyat arasındaki fark (spread), piyasa volatilitesine göre değişiklik gösterebilir.
          </p>
        </div>
      </section>
    </div>
  );
}
