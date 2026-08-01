import Link from 'next/link';
import { BUSINESS, NAV_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-black pt-16 pb-8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block text-[15px] font-semibold tracking-tight text-foreground mb-4">
              {BUSINESS.name}
            </Link>
            <p className="text-[12px] text-muted-foreground leading-relaxed max-w-sm">
              {BUSINESS.description}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-foreground uppercase tracking-wider mb-4">
              Kurumsal
            </h4>
            <ul className="space-y-2 text-[13px]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-foreground uppercase tracking-wider mb-4">
              İletişim
            </h4>
            <ul className="space-y-2 text-[13px] text-muted-foreground">
              <li>
                <a href={`tel:${BUSINESS.phoneClean}`} className="hover:text-foreground">
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-foreground">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Sistem Aktif
            </span>
            <a href="/hakkimizda" className="hover:text-foreground">
              Gizlilik Politikası
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
