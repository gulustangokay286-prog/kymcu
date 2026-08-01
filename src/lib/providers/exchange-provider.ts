import { ExchangeRate } from '@/types/exchange';
import { API_CONFIG } from '@/lib/constants';
import { parseStringPromise } from 'xml2js';

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/html, */*',
  'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8',
  'Referer': 'https://www.google.com/',
};

// ============================================================
// GENELPARA PROVIDER (Primary)
// ============================================================

interface GenelParaDoviz {
  satis: string;
  alis: string;
  degisim: string;
}

const FX_MAP: Record<string, { code: string; name: string; flag: string }> = {
  'USD': { code: 'USD', name: 'Amerikan Doları', flag: '🇺🇸' },
  'EUR': { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  'XAU': { code: 'XAU', name: 'Altın (Gram)', flag: '🪙' },
  'EURUSD': { code: 'EURUSD', name: 'Euro/Dolar Paritesi', flag: '💶' },
  'XAUUSD': { code: 'XAUUSD', name: 'Altın (ONS)', flag: '⚖️' },
  'SEPET': { code: 'SEPET', name: 'Sepet Kur', flag: '🧺' },
  'CHF': { code: 'CHF', name: 'İsviçre Frangı', flag: '🇨🇭' },
  'DKK': { code: 'DKK', name: 'Danimarka Kronu', flag: '🇩🇰' },
  'GBP': { code: 'GBP', name: 'İngiliz Sterlini', flag: '🇬🇧' },
  'AUD': { code: 'AUD', name: 'Avustralya Doları', flag: '🇦🇺' },
  'SEK': { code: 'SEK', name: 'İsveç Kronu', flag: '🇸🇪' },
  'SAR': { code: 'SAR', name: 'Suudi Riyali', flag: '🇸🇦' },
  'CAD': { code: 'CAD', name: 'Kanada Doları', flag: '🇨🇦' },
  'NOK': { code: 'NOK', name: 'Norveç Kronu', flag: '🇳🇴' },
  'JPY': { code: 'JPY', name: 'Japon Yeni', flag: '🇯🇵' },
  'AED': { code: 'AED', name: 'BAE Dirhemi', flag: '🇦🇪' },
  'XAG': { code: 'XAG', name: 'Gümüş', flag: '🥈' },
  'RUB': { code: 'RUB', name: 'Rus Rublesi', flag: '🇷🇺' },
  'XPD': { code: 'XPD', name: 'Paladyum', flag: '⛓️' },
  'XPT': { code: 'XPT', name: 'Platin', flag: '💿' },
};

export async function fetchExchangeFromGenelPara(): Promise<ExchangeRate[]> {
  const response = await fetch(API_CONFIG.exchange.genelPara, {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(8000),
    headers: FETCH_HEADERS,
  });

  if (!response.ok) throw new Error(`GenelPara FX: ${response.status}`);

  const rawData: Record<string, GenelParaDoviz> = await response.json();
  const results: ExchangeRate[] = [];

  for (const [key, value] of Object.entries(rawData)) {
    const mapping = FX_MAP[key];
    if (!mapping) continue;

    const buyPrice = parseFloat(value.alis?.replace(',', '.') || '0');
    const sellPrice = parseFloat(value.satis?.replace(',', '.') || '0');
    const changeStr = value.degisim?.replace(',', '.').replace('%', '') || '0';
    const changePercent = parseFloat(changeStr);

    results.push({
      code: mapping.code,
      name: mapping.name,
      buyPrice,
      sellPrice,
      change: buyPrice * (changePercent / 100),
      changePercent,
      lastUpdate: new Date().toISOString(),
      flag: mapping.flag,
    });
  }

  return results;
}

// ============================================================
// BIGPARA PROVIDER (Fallback 1)
// ============================================================

export async function fetchExchangeFromBigpara(): Promise<ExchangeRate[]> {
  const response = await fetch('https://bigpara.hurriyet.com.tr/api/v1/doviz/headerlist/anasayfa', {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(8000),
    headers: { ...FETCH_HEADERS, 'Referer': 'https://bigpara.hurriyet.com.tr/' },
  });

  if (!response.ok) throw new Error(`Bigpara FX: ${response.status}`);

  const json = await response.json();
  const items = json?.data || json || [];
  if (!Array.isArray(items)) throw new Error('Bigpara FX: invalid data');

  const results: ExchangeRate[] = [];
  const codes = ['USD', 'EUR', 'GBP', 'CHF', 'SAR', 'AED'];

  for (const item of items) {
    const code = (item.SEMPIYON_PIYON || item.sempiyon_piyon || item.code || '').toUpperCase();
    if (!codes.includes(code)) continue;
    const mapping = FX_MAP[code];
    if (!mapping) continue;

    const buy = parseFloat(item.alis || item.ALIS || '0');
    const sell = parseFloat(item.satis || item.SATIS || '0');
    const pct = parseFloat((item.ypiyon || item.YUZDE || '0').toString().replace(',', '.').replace('%', ''));

    if (buy === 0 && sell === 0) continue;

    results.push({
      code: mapping.code,
      name: mapping.name,
      buyPrice: buy,
      sellPrice: sell,
      change: buy * (pct / 100),
      changePercent: pct,
      lastUpdate: new Date().toISOString(),
      flag: mapping.flag,
    });
  }

  return results;
}

// ============================================================
// TCMB PROVIDER (Fallback 2)
// ============================================================

interface TCMBCurrency {
  $: { Kod: string; CurrencyCode: string };
  Isim: string[];
  ForexBuying: string[];
  ForexSelling: string[];
  BanknoteBuying: string[];
  BanknoteSelling: string[];
}

const TCMB_CODES = ['USD', 'EUR', 'GBP', 'CHF', 'SAR', 'AED'];

export async function fetchExchangeFromTCMB(): Promise<ExchangeRate[]> {
  const response = await fetch(API_CONFIG.exchange.tcmb, {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) throw new Error(`TCMB: ${response.status}`);

  const xmlText = await response.text();
  const parsed = await parseStringPromise(xmlText);
  const currencies: TCMBCurrency[] = parsed?.Tarih_Date?.Currency || [];
  const results: ExchangeRate[] = [];

  for (const curr of currencies) {
    const code = curr.$.CurrencyCode;
    if (!TCMB_CODES.includes(code)) continue;
    const mapping = FX_MAP[code];
    if (!mapping) continue;

    const bankBuy = parseFloat(curr.BanknoteBuying?.[0] || '0');
    const bankSell = parseFloat(curr.BanknoteSelling?.[0] || '0');
    const forexBuy = parseFloat(curr.ForexBuying?.[0] || '0');
    const forexSell = parseFloat(curr.ForexSelling?.[0] || '0');

    const buyPrice = bankBuy || forexBuy;
    const sellPrice = bankSell || forexSell;
    if (buyPrice === 0 && sellPrice === 0) continue;

    results.push({
      code: mapping.code,
      name: mapping.name,
      buyPrice,
      sellPrice,
      change: 0,
      changePercent: 0,
      lastUpdate: new Date().toISOString(),
      flag: mapping.flag,
    });
  }

  return results;
}

// ============================================================
// TRUNCGIL PROVIDER (Primary fallback)
// ============================================================

interface TruncgilItem {
  Alış: string;
  Satış: string;
  Değişim: string;
}

export async function fetchExchangeFromTruncgil(): Promise<ExchangeRate[]> {
  const response = await fetch('https://finans.truncgil.com/today.json', {
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(8000),
    headers: FETCH_HEADERS,
  });

  if (!response.ok) throw new Error(`Truncgil FX: ${response.status}`);

  const rawData: Record<string, TruncgilItem> = await response.json();
  const results: ExchangeRate[] = [];

  const TRUNCGIL_FX_MAP: Record<string, { code: string; name: string; flag: string }> = {
    'USD': { code: 'USD', name: 'Amerikan Doları', flag: '🇺🇸' },
    'EUR': { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    'GBP': { code: 'GBP', name: 'İngiliz Sterlini', flag: '🇬🇧' },
    'CHF': { code: 'CHF', name: 'İsviçre Frangı', flag: '🇨🇭' },
    'CAD': { code: 'CAD', name: 'Kanada Doları', flag: '🇨🇦' },
    'RUB': { code: 'RUB', name: 'Rus Rublesi', flag: '🇷🇺' },
    'AED': { code: 'AED', name: 'BAE Dirhemi', flag: '🇦🇪' },
    'AUD': { code: 'AUD', name: 'Avustralya Doları', flag: '🇦🇺' },
    'DKK': { code: 'DKK', name: 'Danimarka Kronu', flag: '🇩🇰' },
    'SEK': { code: 'SEK', name: 'İsveç Kronu', flag: '🇸🇪' },
    'NOK': { code: 'NOK', name: 'Norveç Kronu', flag: '🇳🇴' },
    'JPY': { code: 'JPY', name: 'Japon Yeni', flag: '🇯🇵' },
    'SAR': { code: 'SAR', name: 'Suudi Riyali', flag: '🇸🇦' },
    'gram-platin': { code: 'XPT', name: 'Platin', flag: '💿' },
    'gram-paladyum': { code: 'XPD', name: 'Paladyum', flag: '⛓️' },
    'gumus': { code: 'XAG', name: 'Gümüş', flag: '🥈' },
    'ons': { code: 'XAUUSD', name: 'Altın (ONS)', flag: '⚖️' },
    'gram-altin': { code: 'XAU', name: 'Altın (Gram)', flag: '🪙' },
  };

  for (const [key, value] of Object.entries(rawData)) {
    const mapping = TRUNCGIL_FX_MAP[key];
    if (!mapping) continue;

    const buyPrice = parseFloat(value.Alış?.replace('.', '').replace(',', '.') || '0');
    const sellPrice = parseFloat(value.Satış?.replace('.', '').replace(',', '.') || '0');
    const changeStr = value.Değişim?.replace('%', '').replace(',', '.') || '0';
    const changePercent = parseFloat(changeStr);

    results.push({
      code: mapping.code,
      name: mapping.name,
      buyPrice,
      sellPrice,
      change: buyPrice * (changePercent / 100),
      changePercent,
      lastUpdate: new Date().toISOString(),
      flag: mapping.flag,
    });
  }

  return results;
}

// ============================================================
// WEB SCRAPING PROVIDER (CanliAltinFiyatlari - Primary)
// ============================================================

import * as cheerio from 'cheerio';

const SCRAPE_FX_MAP: Record<string, { code: string; name: string; flag: string }> = {
  'USDTRY': { code: 'USD', name: 'Amerikan Doları', flag: '🇺🇸' },
  'EURTRY': { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  'GBPTRY': { code: 'GBP', name: 'İngiliz Sterlini', flag: '🇬🇧' },
  'CHFTRY': { code: 'CHF', name: 'İsviçre Frangı', flag: '🇨🇭' },
  'SARTRY': { code: 'SAR', name: 'Suudi Riyali', flag: '🇸🇦' },
  'AEDTRY': { code: 'AED', name: 'BAE Dirhemi', flag: '🇦🇪' },
  'DKKTRY': { code: 'DKK', name: 'Danimarka Kronu', flag: '🇩🇰' },
  'SEKTRY': { code: 'SEK', name: 'İsveç Kronu', flag: '🇸🇪' },
  'NOKTRY': { code: 'NOK', name: 'Norveç Kronu', flag: '🇳🇴' },
  'JPYTRY': { code: 'JPY', name: 'Japon Yeni', flag: '🇯🇵' },
  'CADTRY': { code: 'CAD', name: 'Kanada Doları', flag: '🇨🇦' },
  'AUDTRY': { code: 'AUD', name: 'Avustralya Doları', flag: '🇦🇺' },
  'RUBTRY': { code: 'RUB', name: 'Rus Rublesi', flag: '🇷🇺' },
  'XAGTRY': { code: 'XAG', name: 'Gümüş', flag: '🥈' },
};

export async function fetchExchangeFromScraping(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch('https://canlialtinfiyatlari.com', {
      next: { revalidate: 0 },
      headers: FETCH_HEADERS,
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) throw new Error(`Scrape failed: ${response.status}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const results: ExchangeRate[] = [];

    for (const [domId, mapping] of Object.entries(SCRAPE_FX_MAP)) {
      const elements = $(`#${domId}`);
      const percentStr = $(`#${domId}_PERCENT`).first().text().trim();
      
      if (elements.length === 0) {
        // Fallback to table scraping
        const row = $('tr').filter((_, el) => {
          const text = $(el).find('td').first().text().toLowerCase();
          return text.includes(mapping.name.toLowerCase()) || text.includes(mapping.code.toLowerCase());
        }).first();
        
        if (row.length > 0) {
          const buyStr = row.find('td').eq(1).text().trim();
          const sellStr = row.find('td').eq(2).text().trim();
          const changeStr = row.find('td').eq(3).text().trim();
          
          const buyPrice = parseFloat(buyStr.replace(/\./g, '').replace(',', '.') || '0');
          const sellPrice = parseFloat(sellStr.replace(/\./g, '').replace(',', '.') || '0');
          const changePercent = parseFloat(changeStr.replace('%', '').replace(',', '.') || '0');
          
          if (buyPrice > 0) {
            results.push({
              code: mapping.code,
              name: mapping.name,
              buyPrice,
              sellPrice,
              change: buyPrice * (changePercent / 100),
              changePercent,
              lastUpdate: new Date().toISOString(),
              flag: mapping.flag,
            });
          }
        }
        continue;
      }
      
      const buyStr = elements.eq(0).text().trim();
      const sellStr = elements.length > 1 ? elements.eq(1).text().trim() : buyStr;
      
      const parseValue = (s: string) => {
        if (!s) return 0;
        if (s.includes(',') && s.lastIndexOf(',') > s.lastIndexOf('.')) {
          return parseFloat(s.replace(/\./g, '').replace(',', '.'));
        }
        if (s.includes(',') && !s.includes('.')) {
          return parseFloat(s.replace(',', '.'));
        }
        return parseFloat(s.replace(/,/g, ''));
      };

      let buyPrice = parseValue(buyStr);
      let sellPrice = parseValue(sellStr);
      
      if (buyPrice === sellPrice && sellPrice > 0) {
        buyPrice = sellPrice * 0.998; 
      }
      
      const changePercent = parseValue(percentStr.replace('%', ''));
      
      if (sellPrice > 0) {
        results.push({
          code: mapping.code,
          name: mapping.name,
          buyPrice,
          sellPrice,
          change: sellPrice * (changePercent / 100),
          changePercent,
          lastUpdate: new Date().toISOString(),
          flag: mapping.flag,
        });
      }
    }

    if (results.length === 0) throw new Error('Scraping returned 0 items');
    return results;
  } catch (error) {
    console.warn('Scraping failed:', error);
    throw error;
  }
}

// ============================================================
// COMBINED PROVIDER
// ============================================================

export async function fetchExchangeRates(): Promise<{
  data: ExchangeRate[];
  source: string;
}> {
  const providers: Array<{ name: string; fn: () => Promise<ExchangeRate[]> }> = [
    { name: 'truncgil', fn: fetchExchangeFromTruncgil },
    { name: 'web-scraper', fn: fetchExchangeFromScraping },
    { name: 'genelpara', fn: fetchExchangeFromGenelPara },
    { name: 'bigpara', fn: fetchExchangeFromBigpara },
    { name: 'tcmb', fn: fetchExchangeFromTCMB },
  ];

  for (const provider of providers) {
    try {
      const data = await provider.fn();
      if (data.length > 0) {
        console.log(`[FX Provider] ✓ ${provider.name} returned ${data.length} items`);
        return { data, source: provider.name };
      }
    } catch (error) {
      console.warn(`[FX Provider] ✗ ${provider.name} failed:`, error instanceof Error ? error.message : error);
    }
  }

  console.warn('[FX Provider] All providers failed. Returning mock data for demonstration.');
  
  const MOCK_FX: ExchangeRate[] = [
    { code: 'USD', name: 'Amerikan Doları', buyPrice: 33.1500, sellPrice: 33.2500, change: 0.12, changePercent: 0.36, flag: '🇺🇸', lastUpdate: new Date().toISOString() },
    { code: 'EUR', name: 'Euro', buyPrice: 36.4500, sellPrice: 36.6000, change: -0.05, changePercent: -0.14, flag: '🇪🇺', lastUpdate: new Date().toISOString() },
    { code: 'GBP', name: 'İngiliz Sterlini', buyPrice: 42.8000, sellPrice: 43.1000, change: 0.25, changePercent: 0.58, flag: '🇬🇧', lastUpdate: new Date().toISOString() },
    { code: 'CHF', name: 'İsviçre Frangı', buyPrice: 37.9000, sellPrice: 38.1500, change: -0.10, changePercent: -0.26, flag: '🇨🇭', lastUpdate: new Date().toISOString() },
    { code: 'SAR', name: 'Suudi Riyali', buyPrice: 8.8000, sellPrice: 8.9000, change: 0.02, changePercent: 0.23, flag: '🇸🇦', lastUpdate: new Date().toISOString() },
    { code: 'AED', name: 'BAE Dirhemi', buyPrice: 9.0200, sellPrice: 9.1000, change: 0.01, changePercent: 0.11, flag: '🇦🇪', lastUpdate: new Date().toISOString() },
  ];

  return { data: MOCK_FX, source: 'mock-fallback' };
}
