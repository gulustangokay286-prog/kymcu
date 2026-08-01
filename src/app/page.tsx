import { GoldPriceTable } from '@/components/gold/GoldPriceTable';
import { ExchangeRateTable } from '@/components/exchange/ExchangeRateTable';
import { CurrencyConverter } from '@/components/home/CurrencyConverter';
import { BorsaWidget } from '@/components/home/BorsaWidget';
import { MarketStatus } from '@/components/home/MarketStatus';
import { TrustSection } from '@/components/home/TrustSection';
import { ContactSection } from '@/components/home/ContactSection';
import { MapSection } from '@/components/home/MapSection';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 
        MIDNIGHT BLUE & ROSE GOLD FINANCIAL PORTAL
        Left Column: Main Data Tables
        Right Column: Borsa & Tools
      */}
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Data Column */}
          <div className="lg:col-span-8 space-y-8">
            <GoldPriceTable />
            <ExchangeRateTable />
          </div>

          {/* Tools & Widgets Column */}
          <div className="lg:col-span-4 space-y-6 lg:mt-[104px]">
            <CurrencyConverter />
            <BorsaWidget />
            <MarketStatus />
          </div>
        </div>
      </div>

      {/* Corporate Info - Dark Theme Compatible */}
      <div className="bg-[#020617]/95 border-t border-white/10 mt-8 backdrop-blur-xl">
        <TrustSection />
        <ContactSection />
        <MapSection />
        <FAQSection />
      </div>
    </div>
  );
}
