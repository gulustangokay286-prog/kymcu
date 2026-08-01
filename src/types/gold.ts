export interface GoldPrice {
  name: string;
  code: string;
  buyPrice: number;
  sellPrice: number;
  change: number;
  changePercent: number;
  lastUpdate: string;
  unit: string;
}

export interface GoldApiResponse {
  success: boolean;
  data: GoldPrice[];
  lastUpdate: string;
  source: string;
}

export type GoldType =
  | 'gram-altin'
  | 'ceyrek-altin'
  | 'yarim-altin'
  | 'tam-altin'
  | 'cumhuriyet-altini'
  | 'ata-altin'
  | 'has-altin'
  | 'ons-altin'
  | '14-ayar-altin'
  | '22-ayar-bilezik';

export const GOLD_TYPE_LABELS: Record<string, string> = {
  'gram-altin': 'Gram Altın',
  'ceyrek-altin': 'Çeyrek Altın',
  'yarim-altin': 'Yarım Altın',
  'tam-altin': 'Tam Altın',
  'cumhuriyet-altini': 'Cumhuriyet Altını',
  'ata-altin': 'Ata Altın',
  'has-altin': 'Has Altın',
  'ons-altin': 'ONS Altın',
  '14-ayar-altin': '14 Ayar Altın',
  '22-ayar-bilezik': '22 Ayar Bilezik',
};

export const GOLD_TYPE_ICONS: Record<string, string> = {
  'gram-altin': '🪙',
  'ceyrek-altin': '🥇',
  'yarim-altin': '🏅',
  'tam-altin': '💰',
  'cumhuriyet-altini': '🏛️',
  'ata-altin': '⭐',
  'has-altin': '✨',
  'ons-altin': '🌍',
  '14-ayar-altin': '💍',
  '22-ayar-bilezik': '📿',
};
