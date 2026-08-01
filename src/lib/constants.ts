// ============================================================
// BUSINESS INFORMATION
// Replace these with real business details before deployment
// ============================================================

export const BUSINESS = {
  name: 'Altın Pınar Kuyumculuk',
  shortName: 'Altın Pınar',
  tagline: 'Güvenilir Kuyumcunuz',
  description: 'Çorum\'un güvenilir kuyumcusu. Canlı altın fiyatları, döviz kurları ve profesyonel kuyumculuk hizmetleri.',
  foundedYear: 1994,
  experience: '30+ Yıl',
  phone: '+90 364 225 00 00',
  phoneClean: '903642250000',
  whatsapp: '+90 532 000 00 00',
  whatsappClean: '905320000000',
  whatsappMessage: 'Merhaba, altın fiyatları hakkında bilgi almak istiyorum.',
  email: 'info@altinpinar.com.tr',
  address: {
    full: 'Gazi Caddesi No: 42, Merkez, Çorum',
    street: 'Gazi Caddesi No: 42',
    district: 'Merkez',
    city: 'Çorum',
    country: 'Türkiye',
    postalCode: '19100',
  },
  coordinates: {
    lat: 40.5506,
    lng: 34.9556,
  },
  googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2!2d34.9556!3d40.5506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMzJzAyLjIiTiAzNMKwNTcnMjAuMiJF!5e0!3m2!1str!2str!4v1234567890',
  workingHours: {
    weekdays: '09:00 - 19:00',
    saturday: '09:00 - 18:00',
    sunday: 'Kapalı',
  },
  social: {
    instagram: 'https://instagram.com/altinpinar',
    facebook: 'https://facebook.com/altinpinar',
    twitter: 'https://twitter.com/altinpinar',
  },
  certifications: [
    'Kuyumcular Odası Üyesi',
    'TSE Belgeli',
    'Darphane Yetkili Bayii',
    'LBMA Sertifikalı',
  ],
} as const;

// ============================================================
// API CONFIGURATION
// ============================================================

export const API_CONFIG = {
  gold: {
    gramveyRest: 'https://goldapi.gramvey.com/golds',
    gramveySocket: 'wss://goldpricesocket.gramvey.com',
    genelPara: 'https://api.genelpara.com/json/?list=altin&sembol=all',
    cacheTTL: 30, // seconds
    pollInterval: 30000, // ms
  },
  exchange: {
    genelPara: 'https://api.genelpara.com/json/?list=doviz&sembol=all',
    tcmb: 'https://www.tcmb.gov.tr/kurlar/today.xml',
    cacheTTL: 60, // seconds
    pollInterval: 30000, // ms
  },
} as const;

// ============================================================
// SEO
// ============================================================

export const SEO = {
  siteName: 'Altın Pınar Kuyumculuk',
  siteUrl: 'https://altinpinar.com.tr',
  defaultTitle: 'Altın Pınar Kuyumculuk | Canlı Altın Fiyatları & Döviz Kurları - Çorum',
  defaultDescription: 'Çorum Altın Pınar Kuyumculuk - Canlı gram altın, çeyrek altın, döviz fiyatları. 30 yılı aşkın tecrübe ile güvenilir kuyumculuk hizmetleri. Kapalıçarşı referanslı güncel fiyatlar.',
  keywords: [
    'altın fiyatları',
    'gram altın',
    'çeyrek altın fiyatı',
    'canlı altın fiyatları',
    'döviz kurları',
    'dolar kuru',
    'euro kuru',
    'çorum kuyumcu',
    'çorum altın fiyatları',
    'kuyumcu',
    'altın alış satış',
    'güncel altın fiyatları',
  ],
  ogImage: '/og-image.png',
} as const;

// ============================================================
// NAVIGATION
// ============================================================

export const NAV_LINKS = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Piyasalar', href: '/piyasalar' },
  { label: 'Altın Fiyatları', href: '/altin-fiyatlari' },
  { label: 'Döviz Kurları', href: '/doviz-kurlari' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
] as const;

// ============================================================
// FAQ DATA
// ============================================================

export const FAQ_DATA = [
  {
    question: 'Gram altın nedir?',
    answer: 'Gram altın, 1 gram ağırlığında 24 ayar saf altından oluşan yatırım aracıdır. Kapalıçarşı\'da belirlenen fiyatlarla alınıp satılır ve Türkiye\'de en çok takip edilen altın türlerinden biridir.',
  },
  {
    question: 'Çeyrek altın kaç gramdır?',
    answer: 'Çeyrek altın 1.75 gram ağırlığındadır ve 22 ayar altından üretilir. İçindeki saf altın miktarı yaklaşık 1.60 gramdır. Düğün ve özel günlerde en çok tercih edilen altın türüdür.',
  },
  {
    question: 'Altın fiyatları ne sıklıkla güncellenir?',
    answer: 'Sitemizde altın fiyatları Kapalıçarşı verileri referans alınarak anlık olarak güncellenmektedir. Fiyatlar gün içinde piyasa koşullarına göre sürekli değişiklik gösterir.',
  },
  {
    question: 'Altın alırken nelere dikkat edilmelidir?',
    answer: 'Altın alırken lisanslı ve güvenilir kuyumculardan alışveriş yapmanız, fatura ve garanti belgesi almanız önemlidir. Ayrıca altının ayar bilgisi ve damga kontrolü mutlaka yapılmalıdır.',
  },
  {
    question: 'Hangi altın türleri yatırım için uygundur?',
    answer: 'Yatırım amaçlı en çok tercih edilen altın türleri gram altın, çeyrek altın ve Cumhuriyet altınıdır. Gram altın küçük miktarlarla yatırım yapmak isteyenler için ideal bir seçenektir.',
  },
  {
    question: 'Döviz kurları nasıl belirlenir?',
    answer: 'Döviz kurları serbest piyasa koşullarında arz ve talebe göre belirlenir. Merkez Bankası gösterge niteliğinde kurlar açıklar. Sitemizde piyasa kurları anlık olarak takip edilebilir.',
  },
  {
    question: 'Mağazanızın çalışma saatleri nelerdir?',
    answer: 'Mağazamız hafta içi 09:00 - 19:00, Cumartesi 09:00 - 18:00 saatleri arasında hizmet vermektedir. Pazar günleri kapalıyız.',
  },
  {
    question: 'Altın iade ve değişim yapıyor musunuz?',
    answer: 'Evet, mağazamızdan satın alınan altın ürünlerde fatura ibrazı ile iade ve değişim işlemi yapılmaktadır. Detaylı bilgi için mağazamızı ziyaret edebilir veya bizi arayabilirsiniz.',
  },
] as const;
