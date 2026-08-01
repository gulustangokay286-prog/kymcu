import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kurumsal',
  description: `${BUSINESS.name} hakkında kurumsal bilgiler, tarihçe, vizyon ve misyonumuz.`,
};

export default function HakkimizdaPage() {
  return (
    <div className="bg-transparent">
      <div className="max-w-[800px] mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-[24px] md:text-[32px] font-bold text-white mb-4 luxury-title">
            Kurumsal
          </h1>
          <p className="text-[15px] text-white/70 leading-relaxed">
            {BUSINESS.name}, {BUSINESS.foundedYear} yılından itibaren {BUSINESS.address.city} bölgesinde finansal piyasalar ve kıymetli madenler sektöründe lisanslı faaliyet gösteren yetkili bir kurumdur.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <section>
            <h2 className="text-[13px] font-semibold text-rose-400 uppercase tracking-wider mb-4">
              Tarihçe & Deneyim
            </h2>
            <div className="text-[15px] text-white/80 leading-relaxed space-y-4">
              <p>
                Kuruluşumuzdan bu yana temel amacımız, bireysel ve kurumsal müşterilerimize güvenilir, şeffaf ve hızlı finansal hizmetler sunmaktır. {BUSINESS.experience} yılı aşkın sektör deneyimimiz ile piyasa dinamiklerini yakından takip ediyor, müşterilerimize en rekabetçi fiyatlamayı sağlıyoruz.
              </p>
              <p>
                İstanbul Kapalıçarşı altın piyasası ve uluslararası döviz piyasaları ile entegre altyapımız sayesinde, tüm işlemlerimiz anlık verilere dayanmaktadır.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[13px] font-semibold text-rose-400 uppercase tracking-wider mb-4">
              Lisans & Yetki Belgeleri
            </h2>
            <ul className="text-[15px] text-white/80 leading-relaxed space-y-3 list-disc pl-5 marker:text-rose-400">
              <li>T.C. Başbakanlık Hazine Müsteşarlığı Yetkili Müessese Lisansı</li>
              <li>T.C. Darphane ve Damga Matbaası Genel Müdürlüğü Yetkili Bayilik</li>
              <li>Türkiye Kuyumcular Odası Resmi Üyeliği</li>
              <li>TSE Hizmet Yeterlilik Belgesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[13px] font-semibold text-rose-400 uppercase tracking-wider mb-4">
              Kurumsal İlkelerimiz
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#020617]/50 border border-white/5 p-6 rounded-lg">
                <h3 className="text-[15px] font-semibold text-white mb-2">Şeffaflık</h3>
                <p className="text-[14px] text-white/60">Tüm alım-satım işlemleri uluslararası piyasa fiyatları üzerinden, net spread oranlarıyla gerçekleştirilir.</p>
              </div>
              <div className="bg-[#020617]/50 border border-white/5 p-6 rounded-lg">
                <h3 className="text-[15px] font-semibold text-white mb-2">Gizlilik</h3>
                <p className="text-[14px] text-white/60">Bireysel ve kurumsal müşteri bilgileri, finansal regülasyonlar çerçevesinde kesinlikle gizli tutulur.</p>
              </div>
              <div className="bg-[#020617]/50 border border-white/5 p-6 rounded-lg">
                <h3 className="text-[15px] font-semibold text-white mb-2">Güvenlik</h3>
                <p className="text-[14px] text-white/60">İşlemlerimiz, fiziki ve dijital üst düzey güvenlik sistemleriyle korunan şubelerimizde gerçekleştirilir.</p>
              </div>
              <div className="bg-[#020617]/50 border border-white/5 p-6 rounded-lg">
                <h3 className="text-[15px] font-semibold text-white mb-2">Hız</h3>
                <p className="text-[14px] text-white/60">Nakit ve banka transferi işlemlerinde, müşterilerimizin zamanını koruyan hızlı tahsilat altyapısı sunulur.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
