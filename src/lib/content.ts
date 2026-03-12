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

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

// 優先使用較長版本的檔案（有些章節有兩個版本）
const PREFERRED_FILES: Record<string, string> = {
  '09': '09-safety-practical.md',
  '10': '10-community.md',
  '11': '11-30-day-checklist.md',
};

// 章節描述（用於 chapter overview cards）
const CHAPTER_DESCRIPTIONS: Record<number, string> = {
  0: 'Overview of the complete guide and what you\'ll learn inside.',
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
};

function extractTitleFromContent(content: string): string {
  // 抓第一個 H1 標題
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    // 清除 markdown 格式
    return h1Match[1].replace(/\*\*/g, '').trim();
  }
  return 'Untitled';
}

function getChapterTitle(content: string): string {
  return extractTitleFromContent(content);
}

export function getAllChapters(): Chapter[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

  // 追蹤已處理的章節號碼，避免重複
  const processedNumbers = new Set<string>();
  const chapters: Chapter[] = [];

  // 先排序，讓 preferred files 可以覆蓋
  const sortedFiles = files.sort();

  for (const file of sortedFiles) {
    const numMatch = file.match(/^(\d+)/);
    if (!numMatch) continue;

    const num = numMatch[1];

    // 如果有指定的優先檔案，只用那個
    if (PREFERRED_FILES[num] && file !== PREFERRED_FILES[num]) {
      continue;
    }

    // 跳過已處理的章節號碼
    if (processedNumbers.has(num)) continue;
    processedNumbers.add(num);

    const chapterNumber = parseInt(num, 10);
    const slug = file.replace('.md', '');
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const title = getChapterTitle(content);

    // 章節 00-03 免費，04-11 付費
    const isFree = chapterNumber <= 3;

    chapters.push({
      slug,
      title,
      chapterNumber,
      content,
      isFree,
      description: CHAPTER_DESCRIPTIONS[chapterNumber] || '',
    });
  }

  return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function getChapterBySlug(slug: string): Chapter | null {
  const chapters = getAllChapters();
  return chapters.find(c => c.slug === slug) || null;
}

export function getAdjacentChapters(slug: string): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getAllChapters();
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
