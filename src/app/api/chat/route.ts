import { NextRequest, NextResponse } from 'next/server';
import { GUIDE_KNOWLEDGE } from '@/lib/chat';

// 章節對照表
const CHAPTER_MAP: Record<string, { title: string; slug: string }> = {
  '1':  { title: 'Visa Complete Guide', slug: 'visa-guide' },
  '2':  { title: 'Cost of Living Breakdown', slug: 'cost-of-living' },
  '3':  { title: 'Best Neighborhoods', slug: 'best-neighborhoods' },
  '4':  { title: 'Top Coworking Spaces', slug: 'coworking-spaces' },
  '5':  { title: 'Internet & SIM Cards', slug: 'internet-sim-cards' },
  '6':  { title: 'Banking & Money', slug: 'banking-money' },
  '7':  { title: 'Healthcare', slug: 'healthcare' },
  '8':  { title: 'Tax Implications', slug: 'tax-implications' },
  '9':  { title: 'Safety & Practical Tips', slug: 'safety-practical-tips' },
  '10': { title: 'Community & Social Scene', slug: 'community-social-scene' },
  '11': { title: '30-Day Action Checklist', slug: '30-day-checklist' },
};

// 關鍵字比對，用於 mock 模式
interface MockRule {
  keywords: string[];
  reply: string;
  chapterRef: string;
}

const MOCK_RULES: MockRule[] = [
  {
    keywords: ['visa', 'dtv', 'ltr', 'elite', 'tourist visa', 'visa exempt', 'education visa', 'work permit', 'overstay', 'tm30', 'tdac', '90-day', '90 day'],
    reply: `**Visa Overview for Thailand (2026)**

The most popular options for digital nomads:

- **DTV (Recommended):** 5-year multiple-entry visa, 180+180 days per entry. Costs $275-1,150. Requires 500K THB bank proof. Designed for remote workers.
- **Visa Exemption:** Free, 60 days by air + 30-day extension. Max 2 entries/year (Nov 2025 crackdown).
- **LTR:** 10-year visa for $80K+ earners. Includes work permit and tax exemption.
- **Thailand Elite:** 5-20 years from $18,500. No income requirement, no work permit.
- **Education Visa:** Cheapest long-term (~$60 + school fees).

Don't forget the TDAC (Digital Arrival Card) — required within 72 hours before travel since May 2025.

For the full breakdown with requirements and application steps, check **Chapter 1: Visa Complete Guide**.`,
    chapterRef: '1',
  },
  {
    keywords: ['cost', 'budget', 'price', 'expensive', 'cheap', 'afford', 'how much', 'monthly', 'rent', 'money per month'],
    reply: `**Cost of Living in Thailand (2026)**

Monthly budgets (solo, USD):

| City | Budget | Comfortable | Premium |
|------|--------|-------------|---------|
| Chiang Mai | $514-857 | $1,000-1,714 | $2,000+ |
| Bangkok | $714-1,143 | $1,429-2,429 | $3,000+ |
| Phuket | $800-1,200 | $1,429-2,429 | $3,000+ |
| Pattaya | $514-914 | $1,143-2,000 | $2,429+ |

Street food: $1-2/meal. Nice restaurant: $3-6. Western food: $10-17.

Your first month costs 1.5-2x normal due to deposits and setup.

For detailed city breakdowns, see **Chapter 2: Cost of Living Breakdown**.`,
    chapterRef: '2',
  },
  {
    keywords: ['neighborhood', 'where to live', 'area', 'district', 'nimman', 'thonglor', 'on nut', 'ekkamai', 'ari', 'rawai', 'jomtien', 'old city', 'santitham'],
    reply: `**Best Neighborhoods for Nomads**

**Bangkok:** On Nut (best value, BTS access), Ari (creative/cafes), Ekkamai (sweet spot), Thonglor (premium), Sathorn (business district).

**Chiang Mai:** Nimman (THE nomad epicenter), Old City (cheapest, culture), Santitham (local gem, affordable).

**Phuket:** Rawai (nomad favorite, 20-40% cheaper). Avoid Patong.

**Pattaya:** Jomtien (best value beach), Pratumnak Hill (balanced).

**Islands:** Bophut/Samui (family-friendly), Sri Thanu/Phangan (yoga/wellness).

Full details in **Chapter 3: Best Neighborhoods**.`,
    chapterRef: '3',
  },
  {
    keywords: ['coworking', 'cowork', 'co-working', 'workspace', 'work space', 'office'],
    reply: `**Top Coworking Spaces**

**Bangkok:** AIS Design Centre (FREE!), True Digital Park (4,500 THB/mo, 200-500 Mbps), The Hive Thonglor (6,500 THB/mo, rooftop), WeWork (5,600 THB/mo, 24/7).

**Chiang Mai:** CAMP/Maya (3,000 THB/mo, until midnight), Punspace (3,500 THB/mo, gold standard), Yellow (fastest WiFi 150-300 Mbps), Starwork (2,990 THB/mo, cheapest 24/7).

**Islands:** Beachub Koh Phangan (work with feet in sand!), KoHub Koh Lanta (Nov-Apr only).

Day passes: FREE to 750 THB. Monthly: 2,990-9,000 THB.

See **Chapter 4: Top Coworking Spaces** for the full guide.`,
    chapterRef: '4',
  },
  {
    keywords: ['wifi', 'internet', 'sim', 'sim card', 'esim', 'data', '5g', 'connectivity', 'mobile'],
    reply: `**Internet & SIM Cards**

Thailand has excellent, cheap internet. 1 Gbps fiber for $23/month.

**SIM Cards (buy at airport):**
- AIS (recommended): 30-day 50GB = 799 THB ($23)
- TrueMove: 30-day unlimited = 1,199 THB ($35)

**eSIM:** Airalo 10GB/$17, Nomad 50GB/~$9, Holafly unlimited 30-day/$47.

**5G:** 100-350 Mbps in Bangkok (99% coverage), Chiang Mai, Phuket.

**Work cafes with insane WiFi:** OTTO Bangkok (910 Mbps!), Paper Plane Project (40th floor, free entry).

Details in **Chapter 5: Internet & SIM Cards**.`,
    chapterRef: '5',
  },
  {
    keywords: ['bank', 'banking', 'atm', 'money', 'wise', 'schwab', 'transfer', 'exchange', 'promptpay', 'currency', 'cash'],
    reply: `**Banking & Money in Thailand**

**Must-have cards:** Wise (best exchange rate) + Charles Schwab debit (ATM fees reimbursed).

**ATM fee:** 220 THB ($6) on ALL foreign cards. AEON ATMs charge only 150 THB. Always decline DCC.

**Thai bank account:** Harder since 2024. Best banks: Kasikorn (K-Bank), Bangkok Bank. Need passport + proper visa + proof of address.

**Currency exchange:** SuperRich = best rates. Download SuperRichTH app.

**Always carry:** 1,000-2,000 THB cash for street food, markets, tuk-tuks.

Full guide in **Chapter 6: Banking & Money**.`,
    chapterRef: '6',
  },
  {
    keywords: ['doctor', 'hospital', 'health', 'medical', 'insurance', 'dentist', 'dental', 'pharmacy', 'medicine', 'sick', 'vaccine', 'dengue'],
    reply: `**Healthcare in Thailand**

Thailand is a medical tourism hub — world-class care at 80-95% less than US prices.

- GP visit: $15-45 | Dental cleaning: $30-60 | ER: $60-230 | MRI: $150-430

**Top hospitals:** Bumrungrad International (Bangkok, JCI), Chiang Mai Ram, Samitivej.

**Insurance:** SafetyWing Essential (~$56/4 weeks) for emergencies. Self-insure routine care — it's that cheap.

**Pharmacy:** Many Rx drugs available OTC. Antibiotics: $3-5.

**Warnings:** Dengue (use DEET), burning season in Chiang Mai (Feb-Apr), drink bottled water only.

See **Chapter 7: Healthcare** for details.`,
    chapterRef: '7',
  },
  {
    keywords: ['tax', 'taxes', 'taxable', '180 day', 'tax resident', 'dta', 'double tax'],
    reply: `**Tax Implications**

**The 180-day rule:** Under 180 days/calendar year = NOT a Thai tax resident = no Thai tax. Over 180 days = foreign income remitted to Thailand IS taxable (changed Jan 2024).

**Thai tax rates:** Progressive 0-35%. First 150K THB exempt.

**DTV:** No tax exemption. **LTR:** Tax exempt on foreign income (only visa with this).

**Thailand has DTAs with 61 countries** including US, UK, Canada, Australia, Germany, France, Japan.

**Strategies:** Stay under 180 days, time remittances, claim DTA credits, get LTR if earning $80K+.

Important: this is general guidance, not tax advice. See **Chapter 8: Tax Implications**.`,
    chapterRef: '8',
  },
  {
    keywords: ['safe', 'safety', 'scam', 'danger', 'crime', 'police', 'emergency', 'law', 'legal', 'drug', 'cannabis', 'weed', 'vape', 'vaping', 'lese', 'majeste', 'monarchy'],
    reply: `**Safety in Thailand**

Thailand is one of the safest countries in SE Asia for nomads. Violent crime against foreigners is rare.

**Real risks:** Scams (tuk-tuk gem shop, jet ski damage, ATM skimming), motorbike accidents (#1 risk), legal traps.

**Critical laws:**
- Lese-majeste: 3-15 years prison for criticizing monarchy. NEVER comment.
- Drugs: Severe penalties up to death. Cannabis re-criminalized June 2025.
- Vaping: ILLEGAL. Up to 10 years prison.

**Emergency:** Tourist Police **1155** (English, 24/7) — save this number!

**Motorbike safety:** Get IDP before leaving home. Always wear helmet.

Full guide in **Chapter 9: Safety & Practical Tips**.`,
    chapterRef: '9',
  },
  {
    keywords: ['community', 'meetup', 'friend', 'social', 'meet people', 'nomad summit', 'facebook group', 'dating', 'volunteer', 'event'],
    reply: `**Community & Social Scene**

Thailand has the largest, most established nomad community in SE Asia.

**How to meet people:**
1. Coworking spaces (show up consistently — know 10+ people by Friday)
2. Facebook groups: "Chiang Mai Digital Nomads" (80K+), "Digital Nomads Bangkok" (40K+)
3. Nomad Coffee Club (Chiang Mai, weekly)
4. Muay Thai gyms (training bonds people fast)
5. Language exchange meetups

**Key event:** Nomad Summit (Chiang Mai, January) — THE marquee nomad event in Asia.

**Essential:** Download LINE app. Everyone in Thailand uses it.

Full guide in **Chapter 10: Community & Social Scene**.`,
    chapterRef: '10',
  },
  {
    keywords: ['checklist', 'prepare', 'before', 'pack', 'first day', 'arrival', 'landing', 'week 1', 'getting started', 'action plan', 'what to do'],
    reply: `**30-Day Action Checklist Highlights**

**Before departure:** Get visa, TDAC, insurance (SafetyWing), IDP for motorbike, download LINE/Grab/Google Maps, get Wise card, book first 3-7 nights only.

**Week 1:** Buy AIS SIM at airport, explore neighborhood, try coworking day pass, attend first meetup.

**Week 2:** Find monthly accommodation (Facebook groups + walk-in visits), establish work routine, locate hospital.

**Week 3:** Deepen social network, take cooking class, do a day trip.

**Week 4:** Evaluate everything — stay or move? If staying, negotiate longer lease and get monthly memberships.

Get the complete step-by-step in **Chapter 11: 30-Day Action Checklist**.`,
    chapterRef: '11',
  },
  {
    keywords: ['chiang mai', 'chiangmai', 'cm'],
    reply: `**Chiang Mai — Digital Nomad Capital**

The cheapest serious nomad hub in the world.

- **Budget:** $514-857/mo | **Comfortable:** $1,000-1,714/mo
- **Best area:** Nimman (coworking, cafes, community)
- **Budget area:** Old City (studios from $143/mo)
- **Coworking:** CAMP (until midnight), Punspace (gold standard), Yellow (fastest WiFi)
- **Warning:** Burning season Feb-Apr (AQI 200+). Many nomads leave during this period.
- **Best months:** Nov-Jan (cool, clear, festivals)

Chiang Mai is covered across multiple chapters. Start with **Chapter 3: Best Neighborhoods** and **Chapter 2: Cost of Living**.`,
    chapterRef: '3',
  },
  {
    keywords: ['bangkok', 'bkk'],
    reply: `**Bangkok — World-Class Nomad Hub**

Best infrastructure, endless food, surprisingly affordable.

- **Budget:** $714-1,143/mo | **Comfortable:** $1,429-2,429/mo
- **Best value area:** On Nut (BTS access, 30-50% cheaper than central)
- **Trendy:** Thonglor, Ekkamai, Ari
- **Coworking:** AIS Design Centre (FREE), True Digital Park (200-500 Mbps), The Hive
- **Transport:** BTS/MRT 17-65 THB, Grab 80-400 THB, Airport Rail Link 45 THB
- **Best months:** Nov-Feb

See **Chapter 3: Best Neighborhoods** and **Chapter 2: Cost of Living** for details.`,
    chapterRef: '3',
  },
  {
    keywords: ['weather', 'climate', 'season', 'when to visit', 'burning season', 'hot', 'rain', 'monsoon'],
    reply: `**Thailand Weather & Best Times**

Three seasons:
- **Cool (Nov-Feb):** Best season. 23-32C, clear skies. Peak tourist = higher prices.
- **Hot (Mar-May):** 35-40C. Brutal. Songkran water festival in April.
- **Rainy (Jun-Oct):** Short afternoon showers, not constant rain. Prices drop 20-40%.

**CRITICAL: Chiang Mai Burning Season (Feb-Apr)**
AQI regularly 200-300+. Has ranked #1 most polluted city in the world. Bring N95 masks or leave.

Best months by city: Bangkok Nov-Feb, Chiang Mai Nov-Jan, Phuket Nov-Mar.

See **Chapter 9: Safety & Practical Tips** for detailed weather guidance.`,
    chapterRef: '9',
  },
  {
    keywords: ['transport', 'bts', 'mrt', 'grab', 'taxi', 'motorbike', 'train', 'bus', 'flight', 'airport', 'ferry'],
    reply: `**Transportation in Thailand**

**Bangkok:** BTS/MRT (17-65 THB), Grab car (80-400 THB), GrabBike (faster, cheaper), Airport Rail Link (45 THB from BKK to city). Get Mangmoom Card for BTS+MRT.

**Chiang Mai:** No metro. Most nomads rent motorbike (2,500-3,500 THB/mo). Songthaew red trucks 30-50 THB.

**Domestic flights:** AirAsia/Nok Air from 800-2,000 THB. BKK-CNX ~1 hour, ~1,000 THB.

**Trains:** Bangkok-Chiang Mai overnight sleeper — classic experience. 800-2,000 THB.

Always use Grab/Bolt over tuk-tuks (fixed pricing, no scams).

See **Chapter 9** for full transportation details.`,
    chapterRef: '9',
  },
  {
    keywords: ['food', 'eat', 'restaurant', 'street food', 'delivery', 'cooking', 'pad thai', 'som tam', 'khao soi'],
    reply: `**Food in Thailand**

Thailand has arguably the best street food on Earth, and it's incredibly cheap.

- **Street food:** 40-70 THB ($1-2) — pad kra pao, khao man gai, som tam, khao soi (Chiang Mai)
- **Local restaurant:** 60-200 THB ($2-6)
- **Western restaurant:** 200-600 THB ($6-17)
- **Delivery apps:** GrabFood (largest), LINE MAN (best local), Robinhood (cheapest)

Monthly food budget: $129-200 (budget Chiang Mai) to $429-714 (comfortable Bangkok).

**Tip:** Choose busy stalls (high turnover = fresh food). Bottled water only — never tap.

See **Chapter 2: Cost of Living** for detailed food budgets by city.`,
    chapterRef: '2',
  },
  {
    keywords: ['muay thai', 'gym', 'fitness', 'yoga', 'exercise', 'sport', 'run', 'climb', 'dive', 'surf'],
    reply: `**Fitness & Activities in Thailand**

**Muay Thai:** Drop-in 300-600 THB, monthly unlimited 6,500-25,000 THB. Top gyms: Tiger Muay Thai (Phuket), Samart Payakaroon (Bangkok), Dang Muay Thai (Chiang Mai).

**Gyms:** Jetts 900-1,500 THB/mo, Fitness First 1,500-3,000 THB/mo, local gyms 500-1,200 THB/mo.

**Yoga:** Drop-in 300-500 THB, monthly 2,500-5,000 THB.

**Diving:** PADI Open Water at Koh Tao: 9,000-12,000 THB.

**Running:** parkrun Bangkok (free, Saturdays), Hash House Harriers (legendary expat tradition).

**Climbing:** Railay Beach, Krabi — world-class rock climbing.

See **Chapter 9** and **Chapter 10** for fitness and activities.`,
    chapterRef: '9',
  },
];

function getMockResponse(message: string): { reply: string; chapterRef?: string } {
  const lowerMessage = message.toLowerCase();

  for (const rule of MOCK_RULES) {
    if (rule.keywords.some((kw) => lowerMessage.includes(kw))) {
      const chapter = CHAPTER_MAP[rule.chapterRef];
      return {
        reply: rule.reply,
        chapterRef: chapter ? `Chapter ${rule.chapterRef}: ${chapter.title}` : undefined,
      };
    }
  }

  return {
    reply: `Great question! I'd love to help you with that. Our Thailand guide covers everything from visas and costs to neighborhoods, coworking, healthcare, and community life.

Here are some things I can help with:
- **Visas** — Which type is best for you (DTV, LTR, Elite, Tourist)
- **Cost of living** — Detailed budgets for Bangkok, Chiang Mai, Phuket, Pattaya
- **Neighborhoods** — Where to live based on your lifestyle and budget
- **Coworking** — Best spaces with prices and WiFi speeds
- **Healthcare** — Hospitals, insurance, pharmacy info
- **Safety** — Scams to avoid, critical laws, emergency contacts
- **Community** — How to meet people and build your network

Try asking me something specific like "What visa should I get?" or "How much does Chiang Mai cost per month?"`,
  };
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body as {
      message: string;
      history?: ChatMessage[];
    };

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // 沒有 API key 就用 mock 模式
    if (!apiKey) {
      const mockResult = getMockResponse(message);
      return NextResponse.json({
        reply: mockResult.reply,
        chapterRef: mockResult.chapterRef,
      });
    }

    // 有 API key — 呼叫 Claude API
    const systemPrompt = `You are NomadReady AI, an expert assistant for digital nomads moving to Thailand. You are friendly, direct, and practical.

You have deep knowledge about living in Thailand as a digital nomad, based on the NomadReady Thailand Guide (2026 edition). Here is your knowledge base:

${GUIDE_KNOWLEDGE}

INSTRUCTIONS:
1. Answer questions about visas, cost of living, neighborhoods, healthcare, coworking, banking, taxes, safety, community, and practical tips for Thailand.
2. Be specific with numbers, prices, and recommendations whenever possible.
3. Always cite the relevant chapter when answering (e.g., "See Chapter 2: Cost of Living for more details").
4. If asked about something not in your knowledge base, say "I don't have specific information about that in our guide, but I recommend checking [most relevant chapter]."
5. Keep answers concise but informative. Use markdown formatting (bold, lists, tables) for readability.
6. Use USD for prices with THB in parentheses where helpful. Exchange rate: 35 THB = $1.
7. If asked about topics unrelated to Thailand or digital nomad life, politely redirect to what you can help with.
8. Never make up specific prices, laws, or facts that aren't in your knowledge base.`;

    const messages: Array<{ role: string; content: string }> = [];

    // 加入對話歷史（最近 10 條）
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    // 加入目前訊息
    messages.push({ role: 'user', content: message });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);

      // API 錯誤時 fallback 到 mock 模式
      const mockResult = getMockResponse(message);
      return NextResponse.json({
        reply: mockResult.reply,
        chapterRef: mockResult.chapterRef,
      });
    }

    const data = await response.json();
    const assistantReply =
      data.content?.[0]?.text ||
      "I'm sorry, I couldn't generate a response. Please try again.";

    // 從回覆中嘗試辨識提到的章節
    let chapterRef: string | undefined;
    const chapterMatch = assistantReply.match(
      /Chapter (\d+)(?::\s*([^."\n*]+))?/
    );
    if (chapterMatch) {
      const chNum = chapterMatch[1];
      const chapter = CHAPTER_MAP[chNum];
      if (chapter) {
        chapterRef = `Chapter ${chNum}: ${chapter.title}`;
      }
    }

    return NextResponse.json({
      reply: assistantReply,
      chapterRef,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        reply: "Sorry, I'm having trouble connecting. Please try again in a moment.",
        error: true,
      },
      { status: 500 }
    );
  }
}
