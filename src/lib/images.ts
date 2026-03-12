// Unsplash 圖片庫 — 精選泰國數位遊牧主題照片
// 使用 Unsplash 直接 URL，免費且穩定，不需 API key
// 格式：https://images.unsplash.com/photo-{ID}?w={width}&h={height}&fit=crop&q=80

export interface UnsplashImage {
  url: string;
  alt: string;
  credit: string; // 攝影師名稱
}

// 精選泰國主題照片 ID
const PHOTO_IDS = {
  // Hero / 通用
  heroThailand: 'photo-1528181304800-259b08848526', // 泰國寺廟與城市天際線
  heroCoworking: 'photo-1522071820081-009f0129c71c', // 共同工作空間
  heroBangkok: 'photo-1508009603885-50cf7c579365', // 曼谷天際線
  heroBeach: 'photo-1504214208698-ea1916a2195a', // 泰國海灘

  // 城市
  bangkok: 'photo-1563492065599-3520f775eeed', // 曼谷夜景
  chiangMai: 'photo-1598935898639-81586f7d2129', // 清邁寺廟
  phuket: 'photo-1589394815804-964ed0be2eb5', // 普吉島
  pattaya: 'photo-1540611025311-01df3cde54b5', // 芭達雅海灘

  // 主題
  laptop: 'photo-1488590528505-98d2b5aba04b', // 筆電工作
  cafe: 'photo-1521017432531-fbd602c5f42d', // 咖啡廳工作
  food: 'photo-1504674900247-0877df9cc836', // 泰國美食
  temple: 'photo-1506665531195-3566af2b4dfa', // 泰國寺廟
  market: 'photo-1555529669-e69e7aa0ba9a', // 泰國市場
  transport: 'photo-1569154941061-e231b4725ef1', // 嘟嘟車
  community: 'photo-1529156069898-49953e39b3ac', // 社群聚會
  safety: 'photo-1551524559-8af4e6624178', // 安全/城市街道
  healthcare: 'photo-1519494026892-80bbd2d6fd0d', // 醫療
  banking: 'photo-1554224155-6726b3ff858f', // 金融
} as const;

// 產生 Unsplash 圖片 URL
function unsplashUrl(photoId: string, width = 1200, height = 630): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop&q=80&auto=format`;
}

// Hero 區塊圖片
export const heroImages: UnsplashImage[] = [
  {
    url: unsplashUrl(PHOTO_IDS.heroBangkok, 1920, 1080),
    alt: 'Bangkok skyline at sunset — digital nomad destination',
    credit: 'Unsplash',
  },
  {
    url: unsplashUrl(PHOTO_IDS.heroCoworking, 1920, 1080),
    alt: 'Digital nomads working in a modern coworking space',
    credit: 'Unsplash',
  },
];

// 章節對應圖片
export const chapterImages: Record<number, UnsplashImage> = {
  0: { url: unsplashUrl(PHOTO_IDS.heroThailand, 800, 450), alt: 'Thailand overview — temples and city', credit: 'Unsplash' },
  1: { url: unsplashUrl(PHOTO_IDS.temple, 800, 450), alt: 'Thai temple — visa guide', credit: 'Unsplash' },
  2: { url: unsplashUrl(PHOTO_IDS.market, 800, 450), alt: 'Thai street market — cost of living', credit: 'Unsplash' },
  3: { url: unsplashUrl(PHOTO_IDS.bangkok, 800, 450), alt: 'Bangkok neighborhoods at night', credit: 'Unsplash' },
  4: { url: unsplashUrl(PHOTO_IDS.cafe, 800, 450), alt: 'Working from a cafe in Thailand', credit: 'Unsplash' },
  5: { url: unsplashUrl(PHOTO_IDS.laptop, 800, 450), alt: 'Laptop and internet setup', credit: 'Unsplash' },
  6: { url: unsplashUrl(PHOTO_IDS.banking, 800, 450), alt: 'Banking and money management', credit: 'Unsplash' },
  7: { url: unsplashUrl(PHOTO_IDS.healthcare, 800, 450), alt: 'Healthcare in Thailand', credit: 'Unsplash' },
  8: { url: unsplashUrl(PHOTO_IDS.laptop, 800, 450), alt: 'Tax planning for digital nomads', credit: 'Unsplash' },
  9: { url: unsplashUrl(PHOTO_IDS.safety, 800, 450), alt: 'Safe streets in Thailand', credit: 'Unsplash' },
  10: { url: unsplashUrl(PHOTO_IDS.community, 800, 450), alt: 'Digital nomad community meetup', credit: 'Unsplash' },
  11: { url: unsplashUrl(PHOTO_IDS.transport, 800, 450), alt: 'Tuk-tuk in Thailand — getting started', credit: 'Unsplash' },
};

// 城市圖片
export const cityImages: Record<string, UnsplashImage> = {
  Bangkok: { url: unsplashUrl(PHOTO_IDS.bangkok, 600, 400), alt: 'Bangkok cityscape', credit: 'Unsplash' },
  'Chiang Mai': { url: unsplashUrl(PHOTO_IDS.chiangMai, 600, 400), alt: 'Chiang Mai temple', credit: 'Unsplash' },
  Phuket: { url: unsplashUrl(PHOTO_IDS.phuket, 600, 400), alt: 'Phuket beach view', credit: 'Unsplash' },
  Pattaya: { url: unsplashUrl(PHOTO_IDS.pattaya, 600, 400), alt: 'Pattaya coastline', credit: 'Unsplash' },
};

// 取得特定圖片 URL（方便直接使用）
export function getImageUrl(key: keyof typeof PHOTO_IDS, width = 1200, height = 630): string {
  return unsplashUrl(PHOTO_IDS[key], width, height);
}
