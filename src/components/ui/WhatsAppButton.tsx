'use client';

import { BUSINESS } from '@/lib/constants';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsappClean}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-white border border-border text-green-600 rounded-full flex items-center justify-center shadow-sm hover:border-green-600 transition-colors"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );
}
