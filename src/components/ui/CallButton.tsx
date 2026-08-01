'use client';

import { BUSINESS } from '@/lib/constants';
import { Phone } from 'lucide-react';

export function CallButton() {
  return (
    <a
      href={`tel:${BUSINESS.phoneClean}`}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-navy hover:bg-navy-light text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 lg:hidden"
      aria-label="Hemen arayın"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}
