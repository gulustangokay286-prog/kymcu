import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export function ContactSection() {
  return (
    <section id="iletisim" className="py-16 border-b border-white/5 bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="mb-12 text-center">
          <h2 className="text-[18px] font-bold text-white tracking-widest uppercase">İletişim Bilgileri</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-xl text-center space-y-4">
            <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center">
              <Phone className="w-4 h-4 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest text-white/50 uppercase mb-2">Telefon</div>
              <a href={`tel:${BUSINESS.phone.replace(/\s+/g, '')}`} className="text-[14px] font-medium text-white hover:text-[var(--color-primary)] transition-colors">
                {BUSINESS.phone}
              </a>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl text-center space-y-4">
            <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center">
              <Phone className="w-4 h-4 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest text-white/50 uppercase mb-2">WhatsApp</div>
              <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/\s+/g, '').replace('0', '90')}`} className="text-[14px] font-medium text-white hover:text-[var(--color-primary)] transition-colors">
                {BUSINESS.whatsapp}
              </a>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl text-center space-y-4">
            <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest text-white/50 uppercase mb-2">E-Posta</div>
              <a href={`mailto:${BUSINESS.email}`} className="text-[14px] font-medium text-white hover:text-[var(--color-primary)] transition-colors">
                {BUSINESS.email}
              </a>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl text-center space-y-4">
            <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center">
              <Clock className="w-4 h-4 text-[var(--color-primary)]" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest text-white/50 uppercase mb-2">Çalışma Saatleri</div>
              <div className="text-[13px] text-white/90 leading-relaxed">
                Hafta İçi: {BUSINESS.workingHours?.weekdays || '09:00 - 18:00'}<br/>
                Cumartesi: {BUSINESS.workingHours?.saturday || '09:00 - 15:00'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
