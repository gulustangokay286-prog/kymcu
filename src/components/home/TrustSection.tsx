import { Shield, TrendingUp, Clock, Headset } from 'lucide-react';

const TRUST_FEATURES = [
  {
    icon: Shield,
    title: 'Güvenilir İşlem',
    description: 'A Grubu Yetkili Müessese güvencesiyle tüm işlemleriniz devlet güvencesi altında gerçekleşir.'
  },
  {
    icon: TrendingUp,
    title: 'Rekabetçi Kurlar',
    description: 'Serbest piyasa koşullarına anlık entegre olarak her zaman en iyi alım-satım makas aralıklarını sunarız.'
  },
  {
    icon: Clock,
    title: 'Anlık Güncelleme',
    description: 'Tüm altın ve döviz fiyatlarımız piyasa ile eşzamanlı olarak saniyeler içinde güncellenir.'
  },
  {
    icon: Headset,
    title: 'Özel Müşteri Hizmetleri',
    description: 'Kurumsal ve toptan işlemlerinizde size özel atanan müşteri temsilcinizle hızlı işlem yapabilirsiniz.'
  }
];

export function TrustSection() {
  return (
    <section className="py-16 border-b border-white/5 bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {TRUST_FEATURES.map((feature, index) => (
            <div key={index} className="glass-panel p-6 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-[14px] font-bold text-white tracking-widest uppercase mb-2">
                {feature.title}
              </h3>
              <p className="text-[12px] text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
