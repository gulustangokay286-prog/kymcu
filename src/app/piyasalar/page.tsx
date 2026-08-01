import { SEO } from '@/lib/constants';
import { PiyasalarTerminal } from '@/components/piyasalar/PiyasalarTerminal';

export const metadata = {
  title: `Canlı Borsa ve Piyasalar Terminali | ${SEO.siteName}`,
  description: 'Canlı Borsa İstanbul (BIST), Döviz Kurları, Altın Fiyatları, Kripto Paralar ve Global Endeksleri detaylı inceleyin.',
};

export default function PiyasalarPage() {
  return (
    <div className="bg-transparent min-h-screen">
      <main className="relative pt-12 pb-24">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 luxury-title">Piyasalar Terminali</h1>
            <p className="text-white/60 text-sm md:text-base">
              Borsa İstanbul, Emtialar, Kripto ve Küresel Endekslerdeki anlık değişimleri takip edin.
            </p>
          </div>

          {/* Yeni Detaylı Terminal Bileşeni */}
          <PiyasalarTerminal />
        </div>
      </main>
    </div>
  );
}
