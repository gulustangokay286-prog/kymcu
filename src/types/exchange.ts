export interface ExchangeRate {
  code: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  change: number;
  changePercent: number;
  lastUpdate: string;
  flag: string;
}

export interface ExchangeApiResponse {
  success: boolean;
  data: ExchangeRate[];
  lastUpdate: string;
  source: string;
}

export const CURRENCY_PAIRS = [
  { code: 'USD', name: 'Amerikan Doları', pair: 'USD/TRY', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', pair: 'EUR/TRY', flag: '🇪🇺' },
  { code: 'GBP', name: 'İngiliz Sterlini', pair: 'GBP/TRY', flag: '🇬🇧' },
  { code: 'CHF', name: 'İsviçre Frangı', pair: 'CHF/TRY', flag: '🇨🇭' },
  { code: 'SAR', name: 'Suudi Riyali', pair: 'SAR/TRY', flag: '🇸🇦' },
  { code: 'AED', name: 'BAE Dirhemi', pair: 'AED/TRY', flag: '🇦🇪' },
] as const;
