import type { Metadata } from 'next';
import { ContactSection } from '@/components/home/ContactSection';
import { MapSection } from '@/components/home/MapSection';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'İletişim',
  description: `${BUSINESS.name} iletişim bilgileri. Adres: ${BUSINESS.address.full}. Telefon: ${BUSINESS.phone}.`,
};

export default function IletisimPage() {
  return (
    <div className="bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4 pt-12 pb-8">
        <h1 className="text-[24px] md:text-[32px] font-bold text-white luxury-title">
          İletişim
        </h1>
      </div>
      
      <div className="bg-[#020617]/50 border-y border-white/10 backdrop-blur-sm">
        <ContactSection />
        <MapSection />
      </div>
    </div>
  );
}
