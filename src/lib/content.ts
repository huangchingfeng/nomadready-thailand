import fs from 'fs';
import path from 'path';

export interface Chapter {
  slug: string;
  title: string;
  chapterNumber: number;
  content: string;
  isFree: boolean;
  description: string;
}

export type Country = 'thailand' | 'bali';

export const SUPPORTED_COUNTRIES: Country[] = ['thailand', 'bali'];

const CONTENT_BASE_DIR = path.join(process.cwd(), 'src', 'content');

const CHAPTER_DESCRIPTIONS: Record<Country, Record<number, string>> = {
  thailand: {
    0: "Overview of the complete guide and what you'll learn inside.",
    1: 'DTV, LTR, Elite, Tourist — which visa fits your situation? Side-by-side comparison with costs, requirements, and step-by-step application guides.',
    2: 'Exact monthly budgets for Bangkok, Chiang Mai, Phuket, Pattaya, and Koh Samui. From budget ($800/mo) to premium ($3,000/mo).',
    3: 'Neighborhood breakdown for 5 cities. Where to live based on your vibe, budget, and work style.',
    4: 'Best coworking spaces ranked by WiFi speed, price, and community. Plus free alternatives.',
    5: 'SIM cards, fiber internet, mobile plans, and backup options. Stay connected everywhere.',
    6: 'Thai bank accounts, international transfers, crypto, and the best cards for nomads.',
    7: 'Hospital ratings, insurance options, costs, and emergency procedures. Stay safe and healthy.',
    8: 'Tax residency rules, double taxation treaties, and structures to stay compliant.',
    9: 'Scams to avoid, transportation, etiquette, emergency numbers, and daily life hacks.',
    10: 'Nomad communities, meetups, dating, making friends, and finding your tribe.',
    11: 'Day-by-day action plan from pre-departure to fully settled. Print it. Check it off.',
  },
  bali: {
    0: "Overview of the complete Bali guide and what you'll learn inside.",
    1: 'B211A, KITAS, E33G Visitor Visa — which visa fits your situation? Costs, requirements, and step-by-step application guides.',
    2: 'Exact monthly budgets for Canggu, Ubud, Seminyak, and Uluwatu. From budget ($900/mo) to premium ($3,500/mo).',
    3: 'Neighborhood breakdown: Canggu vs Ubud vs Seminyak vs Uluwatu. Where to base yourself.',
    4: 'Best coworking spaces in Bali ranked by WiFi speed, price, community, and vibe.',
    5: 'SIM cards, eSIMs, mobile plans, and internet options. Stay connected across the island.',
    6: 'Indonesian banking, international transfers, crypto, and the best cards for nomads in Bali.',
    7: 'Clinics, hospitals, insurance options, and medical costs. Stay healthy in Bali.',
    8: 'Tax residency, Indonesian tax rules, and how to stay compliant as a foreign nomad.',
    9: 'Scams, traffic, expat etiquette, emergency numbers, and daily survival tips.',
    10: 'Bali nomad communities, meetups, co-living, and building your social circle.',
    11: 'Day-by-day action plan from pre-departure to fully settled in Bali. Print it. Check it off.',
  },
};

function extractTitleFromContent(content: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].replace(/\*\*/g, '').trim();
  }
  return 'Untitled';
}

export function getAllChapters(country: Country): Chapter[] {
  const contentDir = path.join(CONTENT_BASE_DIR, country);

  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  const processedNumbers = new Set<string>();
  const chapters: Chapter[] = [];
  const sortedFiles = files.sort();

  for (const file of sortedFiles) {
    const numMatch = file.match(/^(\d+)/);
    if (!numMatch) continue;

    const num = numMatch[1];
    if (processedNumbers.has(num)) continue;
    processedNumbers.add(num);

    const chapterNumber = parseInt(num, 10);
    const slug = file.replace('.md', '');
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const title = extractTitleFromContent(content);

    // Chapters 00-03 are free, 04-11 require Pro
    const isFree = chapterNumber <= 3;
    const descriptions = CHAPTER_DESCRIPTIONS[country];

    chapters.push({
      slug,
      title,
      chapterNumber,
      content,
      isFree,
      description: descriptions[chapterNumber] || '',
    });
  }

  return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function getChapterBySlug(country: Country, slug: string): Chapter | null {
  const chapters = getAllChapters(country);
  return chapters.find(c => c.slug === slug) || null;
}

export function getAdjacentChapters(country: Country, slug: string): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getAllChapters(country);
  const index = chapters.findIndex(c => c.slug === slug);

  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\*\*/g, '').replace(/`/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      headings.push({ id, text, level });
    }
  }

  return headings;
}
