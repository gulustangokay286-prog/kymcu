import { BUSINESS } from '@/lib/constants';

export function MapSection() {
  return (
    <section className="py-16 border-b border-white/5 bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[18px] font-bold text-white tracking-widest uppercase">Lokasyon</h2>
            <p className="text-[13px] text-white/50 mt-2 tracking-wider">
              {BUSINESS.address.full}
            </p>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.coordinates.lat},${BUSINESS.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center text-[12px] font-bold tracking-widest uppercase text-[var(--color-primary)] hover:text-white transition-colors"
          >
            Yol Tarifi Al →
          </a>
        </div>

        <div className="glass-panel p-1 rounded-xl grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.0!2d${BUSINESS.coordinates.lng}!3d${BUSINESS.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${BUSINESS.coordinates.lat}N+${BUSINESS.coordinates.lng}E!5e0!3m2!1str!2str`}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${BUSINESS.name} - Konum`}
            className="w-full rounded-lg bg-black/50"
          />
        </div>
      </div>
    </section>
  );
}
