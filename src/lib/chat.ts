// NomadReady Chat Utilities
// Rate limiting, usage tracking, and guide knowledge base

import { isProUser } from '@/lib/auth';

const DAILY_FREE_LIMIT = 5;
const STORAGE_KEY = 'nomadready-chat-usage';

interface ChatUsage {
  date: string; // YYYY-MM-DD
  count: number;
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function getUsage(): ChatUsage {
  if (typeof window === 'undefined') return { date: getTodayDate(), count: 0 };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { date: getTodayDate(), count: 0 };
    const usage: ChatUsage = JSON.parse(stored);
    // 日期不同代表隔天，重置計數
    if (usage.date !== getTodayDate()) {
      return { date: getTodayDate(), count: 0 };
    }
    return usage;
  } catch {
    return { date: getTodayDate(), count: 0 };
  }
}

export function getRemainingQuestions(): number {
  if (isProUser()) return Infinity;
  const usage = getUsage();
  return Math.max(0, DAILY_FREE_LIMIT - usage.count);
}

export function incrementUsage(): void {
  if (typeof window === 'undefined') return;
  const usage = getUsage();
  usage.count += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
}

// Re-export isProUser from auth for backward compatibility
export { isProUser } from '@/lib/auth';

export const DAILY_LIMIT = DAILY_FREE_LIMIT;

// ---------------------------------------------------------------------------
// GUIDE_KNOWLEDGE: Condensed facts from all 11 chapters (March 2026 edition)
// ---------------------------------------------------------------------------

export const GUIDE_KNOWLEDGE = `
# NomadReady Thailand Guide — Key Facts (March 2026)

## Chapter 1: Visa Guide
VISA TYPES:
- DTV (Destination Thailand Visa) — RECOMMENDED for most nomads. 5-year multiple-entry, 180 days/entry extendable to 360 days. Cost $275-1,150. Requires 500K THB (~$14,000) bank proof. Remote work is intended use but no formal work permit.
- Tourist Visa (TR) — Single-entry 60 days ($30), Multiple-entry 6 months ($150). Extension +30 days for 1,900 THB.
- Visa Exemption — Free, 60 days by air + 30-day extension, 30 days by land (no extension). Max 2 entries/year before flagged. NOT sustainable long-term after Nov 2025 crackdown.
- LTR (Long-Term Resident) — 10-year visa for high earners ($80K+/year). Includes digital work permit. Tax exemption on foreign income. Cost ~$1,400 + 50K THB.
- Thailand Elite — 5-20 year residency. No income requirement but no work permit. Starts at 650K THB (~$18,500).
- Education Visa — Cheapest long-term option. ~$60 visa + school fees (27,500-60,000 THB/year). Must attend 80%+ classes.

IMPORTANT RULES:
- 90-day reporting (TM47) required for stays over 90 days. Late penalty 2,000-5,000 THB.
- TM30: Landlord must report your address within 24 hours.
- Overstay: 500 THB/day (max 20K). 90+ days = 1-year ban.
- TDAC (Thailand Digital Arrival Card) required since May 2025 — complete within 72 hours before travel.
- Visa runs are effectively dead after Nov 2025. Max 2 visa-exempt land entries per year.

## Chapter 2: Cost of Living
EXCHANGE RATE: 35 THB = $1 USD.

MONTHLY BUDGETS (solo):
- Chiang Mai: Budget $514-857 | Comfortable $1,000-1,714 | Premium $2,000+
- Bangkok: Budget $714-1,143 | Comfortable $1,429-2,429 | Premium $3,000+
- Phuket: Budget $800-1,200 | Comfortable $1,429-2,429 | Premium $3,000+
- Pattaya: Budget $514-914 | Comfortable $1,143-2,000 | Premium $2,429+
- Islands (Samui/Phangan): Budget $571-1,000 | Comfortable $1,286-2,143 | Premium $2,571+

COUPLES: Total cost is roughly 1.5-1.6x solo (share housing/transport).

FIRST MONTH adds 1.5-2x normal (deposit, hotel while searching, setup supplies).

HOUSING:
- Bangkok studio: 8,000-18,000 THB. 1-bed nice area: 18,000-40,000 THB.
- Chiang Mai studio: 5,000-16,000 THB. 1-bed Nimman: 15,000-25,000 THB.
- Standard deposit: 2 months rent.

FOOD:
- Street food: 40-70 THB ($1.14-2). Local restaurant: 60-200 THB. Western: 200-600 THB.
- Delivery apps: GrabFood, LINE MAN, Robinhood. FoodPanda ceased Thailand operations May 2025.

## Chapter 3: Best Neighborhoods
BANGKOK:
- On Nut/Phra Khanong — Best value. 12,000-18,000 THB 1-bed. On BTS line.
- Ari — Creative village, cafe scene. 18,000-40,000 THB.
- Ekkamai — Sweet spot between trendy and affordable. 15,000-30,000 THB.
- Thonglor — Premium hub, rooftop bars. 25,000-45,000 THB.
- Sathorn/Silom — Business district. 20,000-40,000 THB.

CHIANG MAI:
- Nimman — THE nomad epicenter. Coworking, cafes, community. 15,000-25,000 THB.
- Old City — Cheapest. Temples, markets. Studios 5,000-8,000 THB.
- Santitham — Local gem between Nimman and Old City. 7,000-12,000 THB.

PHUKET: Rawai (nomad favorite, 20-40% cheaper), Chalong (central). AVOID Patong.
ISLANDS: Bophut (Samui), Sri Thanu (Phangan — yoga/wellness).
PATTAYA: Jomtien (best value beach), Pratumnak Hill (balanced).

## Chapter 4: Coworking Spaces
BANGKOK: AIS Design Centre (FREE), True Digital Park (4,500 THB/mo, 200-500 Mbps), The Hive Thonglor (6,500 THB/mo), WeWork (5,600 THB/mo 24/7).
CHIANG MAI: CAMP/Maya (3,000 THB/mo, open until midnight), Punspace (3,500 THB/mo, gold standard), Yellow (4,000 THB/mo, fastest WiFi 150-300 Mbps), Starwork (2,990 THB/mo, 24/7).
ISLANDS: Beachub Koh Phangan (6,300 THB/mo — beachfront!), KoHub Koh Lanta (5,500 THB/mo, Nov-Apr only).
Day passes range from FREE (AIS) to 750 THB (The Great Room premium).

## Chapter 5: Internet & SIM Cards
CARRIERS: AIS (#1 pick, best nationwide), TrueMove H (good urban/data), DTAC (budget).
TOURIST SIM (airport): AIS 30-day 50GB = 799 THB ($23). TrueMove 30-day unlimited = 1,199 THB ($35).
LONG-TERM: AIS Marathon 100GB = 599 THB/mo. TrueMove unlimited = 799 THB/mo.
eSIM: Airalo 10GB/$17, Nomad 50GB/~$9, Holafly unlimited 30-day/$47.
HOME INTERNET: 1 Gbps fiber = 799 THB/mo ($23). Providers: AIS-3BB, True Online.
5G: 100-350 Mbps in urban areas. Bangkok 99%+ coverage.
TOP WORK CAFES: OTTO Bangkok (910 Mbps!), Paper Plane Project (40th floor, free), Story 106 Chiang Mai (250+ Mbps).

## Chapter 6: Banking & Money
MUST-HAVE CARDS: Charles Schwab debit (ATM fees reimbursed), Wise card (best exchange rate).
ATM FEE: 220 THB flat on ALL foreign cards. AEON ATMs: 150 THB (lowest).
ALWAYS decline DCC ("charge in home currency") — costs 3-5% extra.
THAI BANK ACCOUNT: Harder since 2024. Best banks: Bangkok Bank, Kasikorn (K-Bank). Need passport, visa, proof of address, Thai phone number.
DIGITAL PAYMENTS: PromptPay (QR code, needs Thai bank). Wise integrating PromptPay May 2026.
CURRENCY EXCHANGE: SuperRich = best rates. Download SuperRichTH app.
CARRY 1,000-2,000 THB cash for street food, markets, tuk-tuks.
TRANSFERS: Wise (0.43-0.6% fee, 1-2 days). Can transfer up to $200K/year abroad.
NON-US: Revolut (EU/UK best alternative), Nubank (Brazil). Wise is universal fallback.

## Chapter 7: Healthcare
COSTS vs US: GP visit $15-45 (85-95% cheaper), ER $60-230, dental cleaning $30-60, MRI $150-430.
TOP HOSPITALS: Bumrungrad International (Bangkok, JCI-accredited), Bangkok Hospital, Samitivej, Chiang Mai Ram.
INSURANCE: SafetyWing Essential ~$56/4 weeks (budget). Pacific Cross $80+/mo (comprehensive). Most nomads self-insure routine care + SafetyWing for emergencies.
PHARMACY: Many Rx drugs available OTC (antibiotics, antihistamines, contraceptives). 85-90% cheaper than US.
HEALTH WARNINGS: Dengue fever (DEET repellent, peak Jun-Nov). Chiang Mai burning season (Feb-Apr, AQI 200+). Drink bottled water only.
VACCINATIONS: Hep A, Hep B (strongly recommended), Typhoid, Japanese Encephalitis, Rabies (consider).

## Chapter 8: Tax Implications
180-DAY RULE: Under 180 days/calendar year = NOT a Thai tax resident = no Thai tax on foreign income. 180+ days = tax resident, foreign income remitted to Thailand IS taxable (changed Jan 2024).
TAX RATES: Progressive 0-35%. First 150K THB exempt. Example: 2M THB remitted = ~250K THB tax (~12.5% effective).
DTV: NO tax exemption. LTR: Tax exempt on foreign income (only visa with this benefit).
DTAs: Thailand has 61 double-tax agreements (US, UK, Canada, Australia, Germany, France, Japan, etc.).
STRATEGIES: Stay under 180 days, time remittances, use pre-2024 savings, claim DTA credits, get LTR visa.
US CITIZENS: Must file worldwide. FEIE excludes up to $130K. Report foreign accounts (FBAR) if >$10K.
EU CITIZENS: De-register tax residency before moving. Some countries (France, Germany) have aggressive rules.

## Chapter 9: Safety & Practical Tips
OVERALL: Thailand is one of the safest countries in SE Asia. Violent crime against foreigners is rare.
REAL THREATS: Scams, traffic accidents, legal traps.
TOP SCAMS: Tuk-tuk gem shop (Bangkok), jet ski damage (beaches), taxi meter refusal, bar bill padding, rental deposit, ATM skimming, romance scams, DTV visa scams, border job scams (human trafficking — CRITICAL).
CRITICAL LAWS:
- Lese-majeste (Section 112): 3-15 years prison for criticizing monarchy. NEVER comment. Stand for Royal Anthem.
- Drugs: Severe penalties up to death. Cannabis re-criminalized June 2025 (need Thai medical Rx). Random drug tests at airports.
- Vaping: ILLEGAL. Up to 10 years prison or 500K THB fine.
- Gambling: ILLEGAL (except govt lottery).
MOTORBIKE SAFETY: #1 risk for nomads. Get IDP before leaving home. Always wear helmet. Insurance often excludes motorbike accidents without valid license.
EMERGENCY: Police 191, Tourist Police 1155 (English 24/7), Ambulance 1669.
AVOID: Narathiwat/Pattani/Yala provinces (insurgency), Thailand-Myanmar border areas.
CULTURAL RULES: Never touch heads, don't point feet at people/Buddha, shoes off in temples/homes, cover shoulders+knees at temples, women never touch monks, wai greeting (palms together + bow).

## Chapter 10: Community & Social Scene
FACEBOOK GROUPS: Chiang Mai Digital Nomads (80K+), Digital Nomads Bangkok (40K+), Farang in Thailand (100K+).
MEETUPS: Nomad Summit (Chiang Mai, January — THE marquee event), Nomad Coffee Club (weekly CM), Bangkok Nomad Meetup (biweekly).
COWORKING AS COMMUNITY: Punspace and Hubba are best for meeting people quickly.
HOW TO MEET PEOPLE: Show up at coworking consistently, attend Facebook group meetups, join sports/Muay Thai, language exchanges.
ESSENTIAL APP: LINE (everyone in Thailand uses it — not WhatsApp).
OTHER APPS: Grab (transport/food), Google Maps, Google Translate, GrabFood, LINE MAN, XE Currency, IQAir, Agoda, 12Go.
FESTIVALS: Songkran (Apr 13-15, water fight), Loi Krathong (Nov, floating lanterns), Yi Peng (Nov, sky lanterns Chiang Mai), Full Moon Party (monthly, Koh Phangan).

## Chapter 11: 30-Day Action Checklist
BEFORE DEPARTURE: Get visa, passport 6+ months valid, complete TDAC, buy insurance (SafetyWing), get IDP for motorbike, download LINE/Grab/Bolt/Google Maps/Google Translate/XE/Agoda/IQAir/12Go, get Wise card, book first 3-7 nights only.
WEEK 1: Buy SIM at airport (AIS recommended), explore neighborhood, try coworking day pass, attend first meetup.
WEEK 2: Find monthly accommodation (Facebook groups, walk-in visits), establish work routine, locate nearest hospital, try Muay Thai.
WEEK 3: Deepen social network (2+ events), take cooking class, day trip (Ayutthaya/Doi Inthanon), check 90-day reporting if applicable.
WEEK 4: Evaluate setup (accommodation, coworking, budget, social life), decide to stay or move, plan next steps.

## Quick Reference
EMERGENCY: Tourist Police 1155 (English 24/7) — save this number NOW.
WEATHER: Cool season Nov-Feb (best), Hot Mar-May, Rainy Jun-Oct.
CHIANG MAI BURNING SEASON: Feb-Apr (AQI 200-300+, serious health hazard). Leave or bring N95 masks.
TRANSPORT: BTS/MRT 17-65 THB/ride, Airport Rail Link 45 THB, Grab 80-400 THB.
TIPPING: Not mandatory. Round up at restaurants, 50-100 THB for massage.
BARGAINING: OK at markets/tuk-tuks. NOT at malls/restaurants/7-Eleven.
`.trim();
