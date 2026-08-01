import { GoldPrice } from '@/types/gold';
import { API_CONFIG } from '@/lib/constants';

// Common headers to avoid API blocks
const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/html, */*',
  'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8',
  'Referer': 'https://www.google.com/',
};

// ============================================================
// GRAMVEY PROVIDER (Primary)
// ============================================================

interface GramveyGold {
  id: number;
  name: string;
  buyingPrice: string;
  sellingPrice: string;
  changeRate: string;
  changePercentage?: string;
  updatedAt?: string;
}

function normalizeGramveyCode(name: string): string {
  const map: Record<string, string> = {
    'Gram Altın': 'gram-altin',
    'Gram': 'gram-altin',
    'Çeyrek Altın': 'ceyrek-altin',
    'Çeyrek': 'ceyrek-altin',
    'Yarım Altın': 'yarim-altin',
    'Yarım': 'yarim-altin',
    'Tam Altın': 'tam-altin',
    'Tam': 'tam-altin',
    'Cumhuriyet Altını': 'cumhuriyet-altini',
    'Cumhuriyet': 'cumhuriyet-altini',
    'Ata Altın': 'ata-altin',
    'Ata': 'ata-altin',
    'Ons Altın': 'ons-altin',
    'Ons': 'ons-altin',
    'Has Altın': 'has-altin',
    'Has': 'has-altin',
    '14 Ayar Altın': '14-ayar-altin',
    '14 Ayar': '14-ayar-altin',
    '22 Ayar Bilezik': '22-ayar-bilezik',
    '22 Ayar': '22-ayar-bilezik',
    'Bilezik': '22-ayar-bilezik',
  };

  if (map[name]) return map[name];
  for (const [key, value] of Object.entries(map)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return value;
  }

  return name
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function fetchGoldFromGramvey(): Promise<GoldPrice[]> {
  const response = await fetch(API_CONFIG.gold.gramveyRest, {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(8000),
    headers: FETCH_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`Gramvey API error: ${response.status}`);
  }

  const rawData: GramveyGold[] = await response.json();

  return rawData.map((item) => ({
    name: item.name,
    code: normalizeGramveyCode(item.name),
    buyPrice: parseFloat(item.buyingPrice) || 0,
    sellPrice: parseFloat(item.sellingPrice) || 0,
    change: parseFloat(item.changeRate) || 0,
    changePercent: parseFloat(item.changePercentage || '0') || 0,
    lastUpdate: item.updatedAt || new Date().toISOString(),
    unit: item.name.includes('Ons') ? 'USD' : 'TL',
  }));
}

// ============================================================
// GENELPARA PROVIDER (Fallback 1)
// ============================================================

interface GenelParaGold {
  satis: string;
  alis: string;
  degisim: string;
}

const GENELPARA_GOLD_MAP: Record<string, { code: string; name: string }> = {
  'GA': { code: 'gram-altin', name: 'Gram Altın' },
  'C': { code: 'ceyrek-altin', name: 'Çeyrek Altın' },
  'Y': { code: 'yarim-altin', name: 'Yarım Altın' },
  'T': { code: 'tam-altin', name: 'Tam Altın' },
  'CU': { code: 'cumhuriyet-altini', name: 'Cumhuriyet Altını' },
  'AA': { code: 'ata-altin', name: 'Ata Altın' },
  'HA': { code: 'has-altin', name: 'Has Altın' },
  'ONS': { code: 'ons-altin', name: 'ONS Altın' },
  '14A': { code: '14-ayar-altin', name: '14 Ayar Altın' },
  '22A': { code: '22-ayar-bilezik', name: '22 Ayar Bilezik' },
};

export async function fetchGoldFromGenelPara(): Promise<GoldPrice[]> {
  const response = await fetch(API_CONFIG.gold.genelPara, {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(8000),
    headers: FETCH_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`GenelPara gold API error: ${response.status}`);
  }

  const rawData: Record<string, GenelParaGold> = await response.json();
  const results: GoldPrice[] = [];

  for (const [key, value] of Object.entries(rawData)) {
    const mapping = GENELPARA_GOLD_MAP[key];
    if (!mapping) continue;

    const buyPrice = parseFloat(value.alis?.replace(',', '.') || '0');
    const sellPrice = parseFloat(value.satis?.replace(',', '.') || '0');
    const changeStr = value.degisim?.replace(',', '.').replace('%', '') || '0';
    const changePercent = parseFloat(changeStr);

    results.push({
      name: mapping.name,
      code: mapping.code,
      buyPrice,
      sellPrice,
      change: buyPrice * (changePercent / 100),
      changePercent,
      lastUpdate: new Date().toISOString(),
      unit: mapping.code === 'ons-altin' ? 'USD' : 'TL',
    });
  }

  return results;
}

// ============================================================
// BIGPARA PROVIDER (Fallback 2)
// ============================================================

interface BigparaGoldItem {
  _id?: { key: string };
  code?: string;
  text?: string;
  buyingstr?: string;
  sellingstr?: string;
  buying?: number;
  selling?: number;
  rate?: number;
  ratetype?: string;
  changeamount?: string;
  changerate?: string;
  daymin?: string;
  daymax?: string;
  datediff?: string;
}

const BIGPARA_GOLD_MAP: Record<string, { code: string; name: string }> = {
  'gram-altin': { code: 'gram-altin', name: 'Gram Altın' },
  'gram-has-altin': { code: 'has-altin', name: 'Has Altın' },
  'ceyrek-altin': { code: 'ceyrek-altin', name: 'Çeyrek Altın' },
  'yeni-ceyrek-altin': { code: 'ceyrek-altin', name: 'Çeyrek Altın' },
  'yarim-altin': { code: 'yarim-altin', name: 'Yarım Altın' },
  'yeni-yarim-altin': { code: 'yarim-altin', name: 'Yarım Altın' },
  'tam-altin': { code: 'tam-altin', name: 'Tam Altın' },
  'yeni-tam-altin': { code: 'tam-altin', name: 'Tam Altın' },
  'cumhuriyet-altini': { code: 'cumhuriyet-altini', name: 'Cumhuriyet Altını' },
  'ata-altin': { code: 'ata-altin', name: 'Ata Altın' },
  'ata-eski-altin': { code: 'ata-altin', name: 'Ata Altın' },
  'ons-altin': { code: 'ons-altin', name: 'ONS Altın' },
  '14-ayar-altin': { code: '14-ayar-altin', name: '14 Ayar Altın' },
  '22-ayar-bilezik': { code: '22-ayar-bilezik', name: '22 Ayar Bilezik' },
};

export async function fetchGoldFromBigpara(): Promise<GoldPrice[]> {
  const response = await fetch('https://bigpara.hurriyet.com.tr/api/v1/gold/page/ons', {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(8000),
    headers: {
      ...FETCH_HEADERS,
      'Referer': 'https://bigpara.hurriyet.com.tr/',
    },
  });

  if (!response.ok) {
    throw new Error(`Bigpara API error: ${response.status}`);
  }

  const json = await response.json();
  const items: BigparaGoldItem[] = json?.data || json?.items || json || [];

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Bigpara returned empty data');
  }

  const results: GoldPrice[] = [];
  const seenCodes = new Set<string>();

  for (const item of items) {
    const key = item.code || item._id?.key || '';
    const mapping = BIGPARA_GOLD_MAP[key.toLowerCase()];
    if (!mapping || seenCodes.has(mapping.code)) continue;
    seenCodes.add(mapping.code);

    const buyPrice = item.buying || parseFloat(item.buyingstr?.replace(',', '.') || '0');
    const sellPrice = item.selling || parseFloat(item.sellingstr?.replace(',', '.') || '0');
    const changePercent = parseFloat(item.changerate?.replace(',', '.').replace('%', '') || '0');

    if (buyPrice === 0 && sellPrice === 0) continue;

    results.push({
      name: mapping.name,
      code: mapping.code,
      buyPrice,
      sellPrice,
      change: parseFloat(item.changeamount?.replace(',', '.') || '0'),
      changePercent,
      lastUpdate: new Date().toISOString(),
      unit: mapping.code === 'ons-altin' ? 'USD' : 'TL',
    });
  }

  return results;
}

// ============================================================
// HAREM ALTIN SCRAPE PROVIDER (Fallback 3)
// ============================================================

// ============================================================
// HAREM ALTIN SCRAPE PROVIDER (Fallback 3)
// ============================================================
// Kept for backward compatibility but moving to Cheerio web scraping

// ============================================================
// WEB SCRAPING PROVIDER (CanliAltinFiyatlari - Primary)
// ============================================================

import * as cheerio from 'cheerio';

const SCRAPE_MAP: Record<string, { code: string; name: string }> = {
  'GRAMTRY': { code: 'gram-altin', name: 'Gram Altın' },
  'CEYREK_YENI': { code: 'ceyrek-altin', name: 'Çeyrek Altın' },
  'YARIM_YENI': { code: 'yarim-altin', name: 'Yarım Altın' },
  'TAM_YENI': { code: 'tam-altin', name: 'Tam Altın' },
  'CUMHURIYET_YENI': { code: 'cumhuriyet-altini', name: 'Cumhuriyet Altını' },
  'ATA_YENI': { code: 'ata-altin', name: 'Ata Altın' },
  'XAUUSD': { code: 'ons-altin', name: 'ONS Altın' },
  'AYAR14': { code: '14-ayar-altin', name: '14 Ayar Altın' },
  'BILEZIK22': { code: '22-ayar-bilezik', name: '22 Ayar Bilezik' },
  'HASALTIN': { code: 'has-altin', name: 'Has Altın' },
};

export async function fetchGoldFromScraping(): Promise<GoldPrice[]> {
  try {
    const response = await fetch('https://canlialtinfiyatlari.com', {
      next: { revalidate: 0 },
      headers: FETCH_HEADERS,
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) throw new Error(`Scrape failed: ${response.status}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const results: GoldPrice[] = [];

    // The site uses ul > li structure for prices or tables. We can search for the specific IDs.
    // Example: <span id="GRAMTRY">2850.50</span> and <span id="GRAMTRY_PERCENT">0.50</span>
    
    // We can also extract from HaremAltin's HTML if CanliAltin doesn't have all.
    // Let's use a robust approach by looking for any element with these IDs.
    
    for (const [domId, mapping] of Object.entries(SCRAPE_MAP)) {
      const priceStr = $(`#${domId}`).text().trim();
      const percentStr = $(`#${domId}_PERCENT`).text().trim();
      
      // If we can't find it by ID, let's try to find it by text in the tables
      if (!priceStr) {
        // Fallback to table scraping
        const row = $('tr').filter((_, el) => {
          const text = $(el).find('td').first().text().toLowerCase();
          return text.includes(mapping.name.toLowerCase()) || text.includes(mapping.name.split(' ')[0].toLowerCase());
        }).first();
        
        if (row.length > 0) {
          const buyStr = row.find('td').eq(1).text().trim();
          const sellStr = row.find('td').eq(2).text().trim();
          const changeStr = row.find('td').eq(3).text().trim();
          
          const buyPrice = parseFloat(buyStr.replace('.', '').replace(',', '.') || '0');
          const sellPrice = parseFloat(sellStr.replace('.', '').replace(',', '.') || '0');
          const changePercent = parseFloat(changeStr.replace('%', '').replace(',', '.') || '0');
          
          if (buyPrice > 0) {
            results.push({
              name: mapping.name,
              code: mapping.code,
              buyPrice,
              sellPrice,
              change: buyPrice * (changePercent / 100),
              changePercent,
              lastUpdate: new Date().toISOString(),
              unit: mapping.code === 'ons-altin' ? 'USD' : 'TL',
            });
          }
        }
        continue;
      }
      
      const sellPrice = parseFloat(priceStr.replace('.', '').replace(',', '.') || '0');
      // If it only has one price, we simulate a small spread for buy price
      const buyPrice = sellPrice * 0.995; 
      const changePercent = parseFloat(percentStr.replace('%', '').replace(',', '.') || '0');
      
      if (sellPrice > 0) {
        results.push({
          name: mapping.name,
          code: mapping.code,
          buyPrice,
          sellPrice,
          change: sellPrice * (changePercent / 100),
          changePercent,
          lastUpdate: new Date().toISOString(),
          unit: mapping.code === 'ons-altin' ? 'USD' : 'TL',
        });
      }
    }

    // Always ensure we have some data
    if (results.length === 0) throw new Error('Scraping returned 0 items');
    return results;
  } catch (error) {
    console.warn('Scraping failed:', error);
    throw error;
  }
}

// ============================================================
// TRUNCGIL PROVIDER (Primary fallback)
// ============================================================

interface TruncgilItem {
  Alış: string;
  Satış: string;
  Değişim: string;
}

const TRUNCGIL_MAP: Record<string, { code: string; name: string }> = {
  'Gram Altın': { code: 'gram-altin', name: 'Gram Altın' },
  'Çeyrek Altın': { code: 'ceyrek-altin', name: 'Çeyrek Altın' },
  'Yarım Altın': { code: 'yarim-altin', name: 'Yarım Altın' },
  'Tam Altın': { code: 'tam-altin', name: 'Tam Altın' },
  'Cumhuriyet Altını': { code: 'cumhuriyet-altini', name: 'Cumhuriyet Altını' },
  'Ata Altın': { code: 'ata-altin', name: 'Ata Altın' },
  'Ons Altın': { code: 'ons-altin', name: 'ONS Altın' },
  '14 Ayar Altın': { code: '14-ayar-altin', name: '14 Ayar Altın' },
  '22 Ayar Bilezik': { code: '22-ayar-bilezik', name: '22 Ayar Bilezik' },
  'Has Altın': { code: 'has-altin', name: 'Has Altın' },
};

export async function fetchGoldFromTruncgil(): Promise<GoldPrice[]> {
  const response = await fetch('https://finans.truncgil.com/today.json', {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(8000),
    headers: FETCH_HEADERS,
  });

  if (!response.ok) throw new Error(`Truncgil API error: ${response.status}`);

  const rawData: Record<string, TruncgilItem> = await response.json();
  const results: GoldPrice[] = [];

  for (const [key, value] of Object.entries(rawData)) {
    if (key === 'Update_Date') continue;
    const mapping = TRUNCGIL_MAP[key];
    if (!mapping) continue;

    const buyPrice = parseFloat(value.Alış?.replace('.', '').replace(',', '.') || '0');
    const sellPrice = parseFloat(value.Satış?.replace('.', '').replace(',', '.') || '0');
    const changeStr = value.Değişim?.replace('%', '').replace(',', '.') || '0';
    const changePercent = parseFloat(changeStr);

    results.push({
      name: mapping.name,
      code: mapping.code,
      buyPrice,
      sellPrice,
      change: buyPrice * (changePercent / 100),
      changePercent,
      lastUpdate: new Date().toISOString(),
      unit: mapping.code === 'ons-altin' ? 'USD' : 'TL',
    });
  }

  return results;
}

// ============================================================
// COMBINED PROVIDER WITH MULTI-LEVEL FALLBACK
// ============================================================

export async function fetchGoldPrices(): Promise<{
  data: GoldPrice[];
  source: string;
}> {
  const providers: Array<{ name: string; fn: () => Promise<GoldPrice[]> }> = [
    { name: 'web-scraper', fn: fetchGoldFromScraping },
    { name: 'truncgil', fn: fetchGoldFromTruncgil },
    { name: 'gramvey', fn: fetchGoldFromGramvey },
    { name: 'genelpara', fn: fetchGoldFromGenelPara },
    { name: 'bigpara', fn: fetchGoldFromBigpara },
  ];

  for (const provider of providers) {
    try {
      const data = await provider.fn();
      if (data.length > 0) {
        console.log(`[Gold Provider] ✓ ${provider.name} returned ${data.length} items`);
        return { data, source: provider.name };
      }
    } catch (error) {
      console.warn(`[Gold Provider] ✗ ${provider.name} failed:`, error instanceof Error ? error.message : error);
    }
  }

  console.warn('[Gold Provider] All providers failed. Returning mock data for demonstration.');
  
  const MOCK_GOLD: GoldPrice[] = [
    { name: 'Has Altın', code: 'has-altin', buyPrice: 2854.10, sellPrice: 2855.50, change: 12.4, changePercent: 0.43, unit: 'TL', lastUpdate: new Date().toISOString() },
    { name: 'Gram Altın', code: 'gram-altin', buyPrice: 2854.10, sellPrice: 2855.50, change: 12.4, changePercent: 0.43, unit: 'TL', lastUpdate: new Date().toISOString() },
    { name: 'Çeyrek Altın', code: 'ceyrek-altin', buyPrice: 4669.00, sellPrice: 4725.00, change: 15.0, changePercent: 0.31, unit: 'TL', lastUpdate: new Date().toISOString() },
    { name: 'Yarım Altın', code: 'yarim-altin', buyPrice: 9338.00, sellPrice: 9450.00, change: 30.0, changePercent: 0.31, unit: 'TL', lastUpdate: new Date().toISOString() },
    { name: 'Tam Altın', code: 'tam-altin', buyPrice: 18676.00, sellPrice: 18900.00, change: 60.0, changePercent: 0.31, unit: 'TL', lastUpdate: new Date().toISOString() },
    { name: 'Cumhuriyet Altını', code: 'cumhuriyet-altini', buyPrice: 19050.00, sellPrice: 19200.00, change: 50.0, changePercent: 0.26, unit: 'TL', lastUpdate: new Date().toISOString() },
    { name: 'Ata Altın', code: 'ata-altin', buyPrice: 19185.00, sellPrice: 19350.00, change: 55.0, changePercent: 0.28, unit: 'TL', lastUpdate: new Date().toISOString() },
    { name: 'ONS Altın', code: 'ons-altin', buyPrice: 2420.50, sellPrice: 2421.10, change: 5.2, changePercent: 0.21, unit: 'USD', lastUpdate: new Date().toISOString() },
  ];

  return { data: MOCK_GOLD, source: 'mock-fallback' };
}
