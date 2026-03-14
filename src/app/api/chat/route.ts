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

**Must-have cards:** [Wise](https://wise.com/invite/dic/chingfengh7) (best exchange rate) + Charles Schwab debit (ATM fees reimbursed).

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

**Insurance:** [SafetyWing Essential](https://safetywing.com/?referenceID=26492570&utm_source=26492570&utm_medium=Ambassador) (~$56/4 weeks) for emergencies. Self-insure routine care — it's that cheap.

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

**Before departure:** Get visa, TDAC, insurance ([SafetyWing](https://safetywing.com/?referenceID=26492570&utm_source=26492570&utm_medium=Ambassador)), IDP for motorbike, download LINE/Grab/Google Maps, get [Wise](https://wise.com/invite/dic/chingfengh7) card, book first 3-7 nights only.

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

  // --- Nationality-specific visa questions ---
  {
    keywords: ['german', 'germany', 'deutsch', 'deutsche'],
    reply: `**Thailand Visa Info for German Nationals**

Great news — Germany has a visa exemption agreement with Thailand, so you get **60 days free** on arrival by air (extendable by 30 days for 1,900 THB at immigration).

For longer stays, your best options:

- **DTV (Destination Thailand Visa):** Apply at the Thai Embassy in Berlin or Consulate in Frankfurt/Munich. 5-year multi-entry, 180+180 days per entry. Costs ~EUR 250. You'll need proof of 500K THB (~EUR 13,000) in your bank.
- **LTR Visa:** If you earn EUR 74,000+/year, this 10-year visa gives you a work permit AND tax exemption on foreign income.
- **Tax note:** Germany has a DTA with Thailand. If you're a German tax resident for part of the year, coordinate carefully — Germany is known for aggressive worldwide taxation rules.

One important thing: make sure to **de-register** (Abmeldung) at your local Einwohnermeldeamt before leaving if you plan to stay long-term. Otherwise, Germany may still consider you a tax resident.

Check **Chapter 1: Visa Complete Guide** for full application steps, and **Chapter 8: Tax Implications** for the DTA details.

Want me to break down the DTV application process step by step?`,
    chapterRef: '1',
  },
  {
    keywords: ['brazilian', 'brazil', 'brasil', 'brasileiro'],
    reply: `**Thailand Visa Info for Brazilian Nationals**

Brazil has a visa exemption agreement with Thailand — you get **30 days free** on arrival (shorter than the 60 days that EU/US nationals get).

Your best long-stay options:

- **Tourist Visa (TR):** Apply at the Thai Embassy in Brasilia or Consulate in Sao Paulo. 60 days, extendable by 30 days. Costs around BRL 350.
- **DTV (Destination Thailand Visa):** The best option for remote workers. 5-year multi-entry, 180+180 days. Apply at the Embassy in Brasilia.
- **Education Visa:** Popular among Brazilians — Thai language or Muay Thai schools qualify. Cheapest long-term option.

**Banking tip:** Wise works great from Brazil and supports BRL transfers. Nubank's international card is also a solid backup. ATM fees are 220 THB per withdrawal on foreign cards — withdraw the maximum (20,000 THB) each time to minimize fees.

**Community:** There's a growing Brazilian nomad community in Chiang Mai and Bangkok. Look for "Brasileiros na Tailandia" groups on Facebook.

See **Chapter 1: Visa Complete Guide** for details on all visa types.

Would you like to know about cost of living compared to Brazil, or tips for the DTV application?`,
    chapterRef: '1',
  },
  {
    keywords: ['japanese', 'japan', 'nihon', 'nihonjin'],
    reply: `**Thailand Visa Info for Japanese Nationals**

Japan has one of the most generous visa exemption deals with Thailand — you get **30 days free** on arrival (no visa needed).

For longer stays:

- **DTV (Destination Thailand Visa):** Apply at the Royal Thai Embassy in Tokyo or Consulates in Osaka/Fukuoka. 5-year multi-entry, 180+180 days per entry.
- **LTR Visa:** If you earn over JPY 12,000,000/year (~$80K), this is the premium option with a work permit and tax exemption.
- **Thailand Elite:** Popular with Japanese nationals — no income proof needed, just the membership fee starting at 650K THB (~JPY 2,700,000).

**Tax note:** Japan and Thailand have a DTA. Japan taxes worldwide income regardless of residency, so consult a Japanese tax advisor before relocating. You may need to file a "moving-out" tax return (junin-zei).

**Community:** There's a large Japanese community in Bangkok, especially in the Sukhumvit area (Phrom Phong to Thonglor). Many Japanese restaurants, supermarkets, and even a Japanese hospital (Samitivej Japanese Language Center).

Full visa breakdown in **Chapter 1: Visa Complete Guide**.

Interested in the best neighborhoods for Japanese nationals, or tax strategies for Japan-Thailand?`,
    chapterRef: '1',
  },
  {
    keywords: ['american', 'usa', 'us citizen', 'united states', 'us passport'],
    reply: `**Thailand Visa Info for US Citizens**

US passport holders get **60 days visa-exempt** on arrival by air (extended from 30 in 2024). You can extend for 30 more days (1,900 THB) at immigration.

Best options for longer stays:

- **DTV:** Apply at Thai Embassy in DC or Consulates in LA/Chicago/NYC. 5-year multi-entry, 180+180 days. Best for most nomads.
- **LTR:** If earning $80K+/year — 10-year visa with work permit and Thai tax exemption on foreign income.
- **Thailand Elite:** No income requirement, starts at $18,500.

**Tax essentials for Americans:**
- You MUST file US taxes regardless of where you live (worldwide taxation).
- **FEIE** (Foreign Earned Income Exclusion) lets you exclude up to $130,000 of foreign earned income.
- **FBAR** (FinCEN 114): Required if your foreign accounts exceed $10,000 at any point during the year.
- The US-Thailand DTA prevents double taxation, but you still need to file.
- Self-employment tax still applies unless you set up a foreign corp.

**Banking:** Charles Schwab debit card is the #1 pick (reimburses all ATM fees worldwide). Pair with Wise for transfers.

See **Chapter 1: Visa Complete Guide** and **Chapter 8: Tax Implications** for the full breakdown.

Want to know about the best US-friendly banking setup for Thailand?`,
    chapterRef: '1',
  },
  {
    keywords: ['british', 'uk', 'england', 'united kingdom', 'uk passport'],
    reply: `**Thailand Visa Info for UK Citizens**

UK passport holders get **60 days visa-exempt** on arrival by air, extendable by 30 days (1,900 THB).

Long-stay options:

- **DTV:** Apply at Thai Embassy in London or consulate in Birmingham/Hull. 5-year multi-entry, 180+180 days. The go-to for UK nomads.
- **LTR:** For those earning GBP 63,000+/year. 10-year visa with work permit.
- **Thailand Elite:** No income requirement. Starts at 650K THB (~GBP 15,000).

**Tax note:** If you leave the UK, you need to complete the **HMRC P85** form and may need to pass the **Statutory Residence Test (SRT)** to prove non-residency. The UK-Thailand DTA covers most scenarios. Unlike the US, the UK does NOT tax worldwide income of non-residents.

**Banking:** Wise and Revolut both work brilliantly from the UK. Starling Bank also has no foreign transaction fees. Skip the high-street banks for travel.

Full details in **Chapter 1: Visa Complete Guide** and **Chapter 8: Tax Implications**.

Would you like cost of living comparisons, or help choosing between the DTV and Elite visa?`,
    chapterRef: '1',
  },

  // --- Budget-specific questions ---
  {
    keywords: ['$500', '500 dollar', '500 usd', '500 per month', '500/month', '500 a month'],
    reply: `**Can You Live in Thailand on $500/Month?**

Honestly? It's tight but technically possible in Chiang Mai — but I wouldn't recommend it as a target budget. Here's what $500/month looks like:

- **Rent:** $143-200 (basic studio in Old City or Santitham, fan-only, no pool)
- **Food:** $115-143 (street food and market cooking only, 2-3 meals/day)
- **Transport:** $29-43 (occasional songthaew, mostly walking/cycling)
- **SIM:** $17 (AIS basic plan)
- **Coworking:** $0 (work from cafes or free spots like CAMP)
- **Remaining:** $100-196 for everything else

**Where it works:** Chiang Mai Old City, Santitham, or small towns like Pai.
**Where it won't work:** Bangkok, Phuket, or any island.

**My honest take:** Budget $800-1,000/month for a comfortable experience. At $500 you'll survive but won't enjoy the nomad lifestyle. Your first month will cost 1.5-2x due to deposits and setup.

See **Chapter 2: Cost of Living Breakdown** for detailed city-by-city budgets.

Want me to suggest the most affordable setup in Chiang Mai?`,
    chapterRef: '2',
  },
  {
    keywords: ['$1000', '1000 dollar', '1000 usd', '1000 per month', '1000/month', '1000 a month', '$1,000', '1k per month', '1k/month'],
    reply: `**Living in Thailand on $1,000/Month**

$1,000/month is the sweet spot for comfortable living in Chiang Mai and a decent budget in Bangkok. Here's what it buys:

**Chiang Mai ($1,000/mo):**
- Rent: $286-400 (nice studio in Nimman with pool/gym, or 1-bed in Santitham)
- Food: $171-229 (mix of street food + restaurants + occasional Western meals)
- Coworking: $86-100 (monthly pass at Punspace or CAMP)
- Transport: $43-57 (motorbike rental or Grab)
- SIM + internet: $23-35
- Fun/social: $100-143 (coffee, bars, day trips, Muay Thai)
- Buffer: $50-100

**Bangkok ($1,000/mo):**
- Tight but doable in On Nut or outer BTS areas
- Studio: $343-457 (decent but not luxury)
- Less room for entertainment

**Pro tip:** If you find a monthly condo deal through Facebook groups instead of Airbnb, you'll save 30-50% on housing.

See **Chapter 2: Cost of Living Breakdown** for the full budget tables.

Want a breakdown for a specific city, or tips on finding cheap housing?`,
    chapterRef: '2',
  },
  {
    keywords: ['$2000', '2000 dollar', '2000 usd', '2000 per month', '2000/month', '2000 a month', '$2,000', '2k per month', '2k/month'],
    reply: `**Living in Thailand on $2,000/Month**

At $2,000/month, you're living very comfortably anywhere in Thailand. This is the "comfortable to premium" tier.

**What $2,000/mo gets you:**
- **Housing:** Modern 1-bed condo with pool, gym, co-working area in a prime area ($571-857)
- **Food:** Mix of street food, restaurants, and Western dining without counting pennies ($286-429)
- **Coworking:** Premium space with fast WiFi ($100-186)
- **Transport:** Grab whenever you want + occasional trips ($86-143)
- **Health:** Gym membership + occasional massage ($57-114)
- **Social:** Regular dinners out, bars, weekend trips ($200-286)
- **Buffer:** $200-400 for savings or travel

**City comparison at this budget:**
- **Chiang Mai:** You're living like royalty. Premium condo, daily restaurant meals, weekend trips.
- **Bangkok:** Very comfortable. Nice condo in Ari/Ekkamai, eating well, active social life.
- **Phuket:** Comfortable. Nice place in Rawai, motorbike, beach lifestyle.
- **Islands:** Comfortable. Beachfront bungalow or nice villa, diving, yoga.

Most nomads earning $3K+ find that $2K covers everything and they bank the rest.

Full city breakdowns in **Chapter 2: Cost of Living Breakdown**.

Would you like neighborhood recommendations for your budget, or tips on maximizing value?`,
    chapterRef: '2',
  },
  {
    keywords: ['$3000', '3000 dollar', '3000 usd', '3000 per month', '3000/month', '3000 a month', '$3,000', '3k per month', '3k/month', '$5000', '5000', '$5,000', '5k'],
    reply: `**Living in Thailand on $3,000-5,000/Month**

At this budget, Thailand becomes genuinely luxurious. You're in the premium tier everywhere.

**$3,000/mo lifestyle:**
- 2-bed condo or serviced apartment in Bangkok Thonglor/Ari ($857-1,143)
- Eat at nice restaurants daily without thinking about it ($429-571)
- Premium coworking or private office ($143-286)
- Grab everywhere, occasional domestic flights ($143-200)
- Full gym + weekly massage + Muay Thai ($114-171)
- Weekend trips to islands, shopping, entertainment ($286-429)

**$5,000/mo lifestyle:**
- Luxury penthouse or pool villa ($1,429-2,000)
- Fine dining, international cuisine ($571-857)
- Personal trainer, premium spa treatments
- Domestic travel every weekend if you want
- Honestly, you'd struggle to spend $5K/month in Thailand unless you're deliberately living large

**Perspective:** $3,000/month in Thailand buys a lifestyle equivalent to $8,000-12,000 in a US/European city. $5,000/month is equivalent to $15,000-20,000 back home.

**At this level, consider the LTR visa** — if you earn $80K+/year, it gives you a 10-year visa with Thai tax exemption on foreign income.

See **Chapter 2: Cost of Living** and **Chapter 1: Visa Complete Guide** for details.

Want to know about the best premium neighborhoods, or the LTR visa application?`,
    chapterRef: '2',
  },

  // --- Solo female traveler safety ---
  {
    keywords: ['solo female', 'woman travel', 'women travel', 'female nomad', 'girl travel', 'safe for women', 'woman alone', 'solo woman'],
    reply: `**Solo Female Traveler Safety in Thailand**

Thailand is one of the most popular destinations for solo female travelers in the world, and for good reason — it's generally very safe. That said, here's what you need to know:

**The good news:**
- Violent crime against foreign women is very rare
- Thai culture is generally respectful toward women
- Huge solo female traveler community (you'll meet many others)
- Well-developed tourist infrastructure
- Affordable private transport (Grab) so you rarely need to walk alone at night

**Smart precautions:**
- Use **Grab** (not tuk-tuks/taxis) at night — GPS-tracked, driver info visible
- Avoid Full Moon Party solo or stick with a group you trust — drink spiking happens
- Be cautious in bar areas (Khao San Road, Walking Street Pattaya, Bangla Road Phuket)
- Always have your own transport plan home
- Share your location with someone back home (Google Maps location sharing)
- Trust your instincts — Thai people are overwhelmingly kind and helpful

**Best areas for solo female nomads:**
- Chiang Mai Nimman (safest overall, huge female nomad community)
- Bangkok Ari or Ekkamai (calm, safe, walkable)
- Koh Phangan Sri Thanu (yoga/wellness crowd, very supportive)

**Emergency:** Tourist Police **1155** (English, 24/7). Save this number.

Full safety guide in **Chapter 9: Safety & Practical Tips**.

Would you like neighborhood recommendations or tips on connecting with other female nomads?`,
    chapterRef: '9',
  },

  // --- Banking for non-US nomads ---
  {
    keywords: ['revolut', 'nubank', 'n26', 'non-us bank', 'european bank', 'eu bank', 'international bank'],
    reply: `**Banking in Thailand for Non-US Nomads**

Different home country = different optimal setup. Here's what works best:

**EU/UK Nomads:**
- **Wise** (must-have): Best exchange rates worldwide. GBP/EUR to THB at mid-market rate. Fees: 0.43-0.6%.
- **Revolut** (excellent backup): Free ATM withdrawals up to EUR 200/month (Metal: EUR 800). Good FX rates.
- **N26** (decent): No foreign transaction fees on Metal plan. Limited free ATM withdrawals abroad.
- Pair Revolut + Wise for best coverage.

**Brazilian Nomads:**
- **Wise** (primary): Supports BRL transfers with good rates.
- **Nubank** (backup): International card works at Thai ATMs. No annual fee.
- **C6 Global** (USD card): Pre-load USD to avoid BRL-THB double conversion.

**Australian Nomads:**
- **Wise** (primary): AUD transfers with best rates.
- **ING Orange** (backup): Reimburses international ATM fees (check current terms).
- **Up Bank** (alternative): No international fees on purchases.

**Universal tips:**
- ALL foreign ATM cards pay 220 THB ($6) per withdrawal in Thailand — no exceptions
- AEON ATMs charge only 150 THB (lowest available)
- **Always decline DCC** ("charge in your home currency") — it costs you 3-5% extra
- Withdraw the maximum (20,000 THB) each time to minimize per-transaction fees
- Carry 2+ cards from different banks in case one gets blocked

See **Chapter 6: Banking & Money** for the complete guide.

Need advice on opening a Thai bank account, or tips for a specific country's banking setup?`,
    chapterRef: '6',
  },

  // --- Time zone questions ---
  {
    keywords: ['time zone', 'timezone', 'time difference', 'gmt', 'utc', 'overlap', 'working hours', 'client time', 'remote meeting'],
    reply: `**Thailand Time Zone for Remote Workers**

Thailand is **UTC+7 (ICT — Indochina Time)** year-round. No daylight saving time, so it never changes.

**Time differences from Thailand:**

| Your Location | Difference | Overlap Window |
|---------------|-----------|----------------|
| US West Coast (PST) | +15 hours | 6-8 AM your time = 9-11 PM Thailand |
| US East Coast (EST) | +12 hours | 8-10 AM your time = 8-10 PM Thailand |
| UK (GMT/BST) | +7/+6 hours | 2-6 PM your time = 9 PM-1 AM Thailand |
| Central Europe (CET) | +6/+5 hours | 2-6 PM your time = 8 PM-12 AM Thailand |
| Australia East (AEST) | -3/-4 hours | Easy overlap, nearly same workday |
| Japan/Korea (JST/KST) | -2 hours | Almost identical workday |
| India (IST) | +1.5 hours | Nearly identical workday |

**Strategies for US clients:**
- Work late Thailand evenings (7-11 PM) for morning US overlap
- "Split shift": Work 9 AM-1 PM Thailand (your deep work), then 8-11 PM for US meetings
- Many nomads love this — mornings free for gym/explore, work in the afternoon and evening

**Strategies for EU clients:**
- Overlap is 2-6 PM your client's time = 8 PM-12 AM Thailand
- Very manageable — work a slightly later day

**Pro tip:** If you work with Asia-Pacific clients (Japan, Korea, Australia, India), Thailand is in the perfect time zone with almost no adjustment needed.

See **Chapter 9: Safety & Practical Tips** for more remote work tips.

Want to know about coworking spaces with late-night access for US-overlap hours?`,
    chapterRef: '9',
  },

  // --- Coworking by city ---
  {
    keywords: ['coworking bangkok', 'workspace bangkok', 'work bangkok', 'bangkok cowork'],
    reply: `**Best Coworking Spaces in Bangkok**

Bangkok has the widest selection of coworking in Thailand. Here are the top picks:

**Free / Ultra-Budget:**
- **AIS Design Centre** (Emquartier, BTS Phrom Phong) — Completely FREE. 200+ Mbps WiFi. Open 10 AM-9 PM. The catch: no reservations, gets busy after 2 PM.

**Mid-Range (3,000-5,000 THB/mo):**
- **True Digital Park** (Punnawithi) — 4,500 THB/mo. 200-500 Mbps. Tech startup vibe. Meeting rooms, events, massive food court downstairs.
- **WeWork** (multiple locations) — 5,600 THB/mo hot desk. 24/7 access. Free coffee/beer. Global community.

**Premium (5,000+ THB/mo):**
- **The Hive Thonglor** — 6,500 THB/mo. Rooftop terrace, great community events, strong WiFi.
- **The Great Room** (Gaysorn) — Day pass 750 THB. Luxury design, business crowd.

**Best cafe-offices (free with purchase):**
- **OTTO Bangkok** — 910 Mbps WiFi (not a typo). Best internet in any cafe in Thailand.
- **Paper Plane Project** — 40th floor views. Free entry, buy a drink.

**Day passes:** 200-750 THB. Try 2-3 before committing monthly.

Full list with WiFi speeds, prices, and locations in **Chapter 4: Top Coworking Spaces**.

Want recommendations based on your area or working style?`,
    chapterRef: '4',
  },
  {
    keywords: ['coworking chiang mai', 'workspace chiang mai', 'work chiang mai', 'chiang mai cowork'],
    reply: `**Best Coworking Spaces in Chiang Mai**

Chiang Mai is coworking paradise — more nomad-focused spaces per capita than anywhere else.

**Best Overall:**
- **Punspace** (Nimman + Tha Phae) — 3,500 THB/mo. The gold standard. Great community, reliable WiFi (80-150 Mbps), meeting rooms, kitchen. Most nomads end up here.

**Best Value:**
- **Starwork** — 2,990 THB/mo. Cheapest 24/7 space in the city. Basic but functional. Good for night owls.
- **CAMP by Maya** — 3,000 THB/mo. Inside Maya Mall on Nimman. Open until midnight. Great if you like mall food court access.

**Fastest Internet:**
- **Yellow** — 4,000 THB/mo. 150-300 Mbps consistently. Modern design, quiet zones. Best for video calls.

**Best Community:**
- **Punspace Nimman** — Weekly events, Friday drinks, diverse international crowd.
- **Hub53** — Smaller, tight-knit community. Good for making close friends.

**Best Cafe-Offices:**
- **Story 106** — 250+ Mbps. Beautiful space. Free with coffee purchase.
- **Ristr8to** — Award-winning coffee + decent WiFi. Popular nomad hangout.

**Warning:** During burning season (Feb-Apr), look for spaces with good air filtration or stay in your condo.

Full guide in **Chapter 4: Top Coworking Spaces**.

Want to know about coworking on the islands, or tips for networking at these spaces?`,
    chapterRef: '4',
  },
  {
    keywords: ['coworking phuket', 'workspace phuket', 'work phuket', 'phuket cowork', 'coworking island', 'workspace island', 'koh phangan cowork', 'koh lanta cowork'],
    reply: `**Coworking on Phuket & the Islands**

Beach + productivity is absolutely possible — here are the best spots:

**Phuket:**
- **Garage Society** (Rawai) — 5,000 THB/mo. Best in Phuket. Fast WiFi, AC, good community. Day pass 350 THB.
- **SEA HQ** (Chalong) — 3,500 THB/mo. 24/7 access, standing desks, quiet.
- Most Phuket nomads work from their condo or cafes — coworking scene is smaller than BKK/CM.

**Koh Phangan:**
- **Beachub** — 6,300 THB/mo. THE legendary beach coworking — literally work with your feet in the sand. Reliable WiFi, power, and they even have standing desks on the beach. Day pass 400 THB.
- **DOI Koh Phangan** — 4,500 THB/mo. Air-conditioned, fast internet, more traditional setup.
- Best during Nov-Apr (dry season). Rainy season can be rough on the islands.

**Koh Lanta:**
- **KoHub** — 5,500 THB/mo. Beautiful setting, strong community, organic cafe. Only open Nov-Apr (closes for monsoon season).

**Koh Samui:**
- Options are limited. Most nomads work from villa/condo or hotel lobbies.
- **HUBBA Samui** — Coworking + coliving near Bophut.

**Reality check:** Island coworking is charming but WiFi is less reliable than mainland. Always have a mobile hotspot backup (AIS 5G is solid on Phuket and Samui).

Full details in **Chapter 4: Top Coworking Spaces**.

Curious about the best neighborhoods on these islands, or internet reliability?`,
    chapterRef: '4',
  },

  // --- Phuket specific ---
  {
    keywords: ['phuket', 'patong', 'rawai', 'kata', 'karon'],
    reply: `**Phuket — Beach Nomad Base**

Thailand's largest island with improving nomad infrastructure.

- **Budget:** $800-1,200/mo | **Comfortable:** $1,429-2,429/mo | **Premium:** $3,000+
- **Best area for nomads:** Rawai (south) — 20-40% cheaper than tourist zones, real community, good cafes
- **Beach area:** Kata/Karon (quieter, more affordable than Patong)
- **AVOID:** Patong (tourist trap, loud, overpriced, seedy at night)
- **Transport:** Motorbike essential (no public transport). Rental: 3,000-4,000 THB/mo.
- **Coworking:** Garage Society (Rawai), SEA HQ (Chalong)
- **Internet:** 5G coverage is good. Home fiber available.
- **Best months:** Nov-Apr (dry season). May-Oct has heavy rain.

**Phuket pros:** Beach lifestyle, international airport (direct flights from many countries), growing nomad scene, great seafood.

**Phuket cons:** More expensive than Chiang Mai, motorbike-dependent, fewer coworking options, can feel isolated without a scooter.

See **Chapter 3: Best Neighborhoods** and **Chapter 2: Cost of Living** for details.

Want to compare Phuket vs Chiang Mai, or know about island-hopping from Phuket?`,
    chapterRef: '3',
  },

  // --- Pattaya specific ---
  {
    keywords: ['pattaya', 'jomtien', 'pratumnak'],
    reply: `**Pattaya — Underrated Nomad Spot**

Pattaya has shed much of its old reputation and become a surprisingly practical nomad base.

- **Budget:** $514-914/mo | **Comfortable:** $1,143-2,000/mo | **Premium:** $2,429+
- **Best area:** Jomtien (south) — best value beachfront in Thailand, quiet, good cafes
- **Balanced:** Pratumnak Hill — between Pattaya and Jomtien, upscale but not overpriced
- **AVOID:** Walking Street area (nightlife zone, not for living)
- **Advantages:** Only 90 min from Bangkok, good infrastructure, cheap condos, beach access
- **Coworking:** Still developing. Most nomads work from condos or cafes.
- **Internet:** Excellent. 5G coverage, fiber available in most condos.
- **Best months:** Nov-Feb (cool, dry). Mar-May is very hot.

**Why consider Pattaya?**
- Bangkok-level infrastructure at Chiang Mai prices
- Easy access to Bangkok (bus/van every 30 min, 120-150 THB)
- U-Tapao airport expanding with more direct flights
- Good hospitals (Bangkok Hospital Pattaya)

See **Chapter 3: Best Neighborhoods** and **Chapter 2: Cost of Living**.

Want to compare Pattaya with other Thai cities, or know about the best condos in Jomtien?`,
    chapterRef: '3',
  },

  // --- Island-specific ---
  {
    keywords: ['koh samui', 'samui', 'koh phangan', 'phangan', 'koh lanta', 'koh tao', 'island life', 'island living'],
    reply: `**Island Life in Thailand**

The islands offer a unique nomad experience — slower pace, beach lifestyle, strong wellness communities.

**Koh Samui:**
- Most developed island. Airport with direct flights.
- Budget: $571-1,000/mo | Comfortable: $1,286-2,143/mo
- Best area: Bophut (Fisherman's Village) — cafes, restaurants, calm beach
- Good hospitals (Bangkok Hospital Samui, Thai International)
- Family-friendly, more "settled" vibe

**Koh Phangan:**
- Famous for Full Moon Party BUT most of the island is peaceful yoga/wellness
- Best area: Sri Thanu — yoga studios, plant-based cafes, nomad community
- Coworking: Beachub (legendary beach workspace)
- Budget: $571-857/mo (cheaper than Samui)
- Ferry from Samui: 30 min

**Koh Lanta:**
- Most laid-back island. No party scene.
- KoHub coworking (Nov-Apr only)
- Very seasonal — many places close May-Oct
- Budget: $514-857/mo

**Koh Tao:**
- Tiny but famous for diving (cheapest PADI certification in the world)
- Limited nomad infrastructure, more of a 1-2 week stop
- PADI Open Water: 9,000-12,000 THB

**Island reality check:** WiFi is less reliable (always have AIS 5G backup), fewer coworking options, limited healthcare, everything costs 10-20% more due to transport. Best for nomads with flexible schedules.

See **Chapter 3: Best Neighborhoods** for island guides.

Want details on a specific island, or how to plan an island-hopping route?`,
    chapterRef: '3',
  },

  // --- Accommodation-specific ---
  {
    keywords: ['apartment', 'condo', 'accommodation', 'housing', 'airbnb', 'stay', 'lease', 'deposit', 'find a place', 'where to stay'],
    reply: `**Finding Accommodation in Thailand**

The #1 rule: **Never book long-term before arriving.** Book 3-7 nights on Agoda/Booking, then search in person.

**How to find a monthly rental:**
1. **Facebook groups** (best deals): "Chiang Mai Rentals", "Bangkok Condos for Rent", etc.
2. **Walk-in visits:** Explore your target neighborhood and look for "For Rent" signs on condo buildings
3. **Agoda Monthly** (formerly Agoda Homes): Online monthly rates, sometimes competitive
4. **Agents:** DDProperty, Hipflat, PropertyGuru — more options but usually higher prices

**Price ranges (monthly):**
| Type | Chiang Mai | Bangkok | Phuket |
|------|-----------|---------|--------|
| Basic studio | 5,000-8,000 THB | 8,000-15,000 THB | 8,000-12,000 THB |
| Nice 1-bed (pool/gym) | 15,000-25,000 THB | 18,000-35,000 THB | 15,000-30,000 THB |
| Premium 1-bed | 25,000-40,000 THB | 35,000-60,000 THB | 30,000-50,000 THB |

**Key tips:**
- Standard deposit: 2 months rent (negotiate down to 1 for longer stays)
- Always take photos of everything on move-in day (for deposit return)
- Electricity is usually metered separately (6-8 THB/unit — AC is the biggest cost)
- Airbnb is 30-50% more expensive than direct monthly rentals
- Negotiate! Prices are often flexible, especially for 3+ month stays

See **Chapter 3: Best Neighborhoods** for area-specific recommendations.

Want help finding accommodation in a specific city or neighborhood?`,
    chapterRef: '3',
  },

  // --- App/tool recommendations ---
  {
    keywords: ['app', 'apps', 'download', 'essential app', 'must have app', 'phone setup', 'grab app', 'line app'],
    reply: `**Essential Apps for Thailand**

Download these before you land:

**Must-Have (install now):**
- **LINE** — Thailand's #1 messaging app. Everyone uses it, not WhatsApp. Landlords, shops, even government offices use LINE.
- **Grab** — Uber equivalent. Rides, food delivery, payments. Works across SE Asia.
- **Google Maps** — Best navigation. Download offline maps for your area.
- **Google Translate** — Camera translate for Thai menus/signs. Download Thai for offline use.

**Transport & Travel:**
- **Bolt** — Cheaper alternative to Grab for rides in Bangkok.
- **12Go** — Book trains, buses, ferries between cities.
- **Agoda** — Best hotel/condo deals in Asia. Often cheaper than Booking.com.

**Food & Delivery:**
- **GrabFood** — Largest delivery network.
- **LINE MAN** — Best for local restaurants that aren't on GrabFood.
- **Robinhood** — No delivery fees (Thai platform).

**Money:**
- **Wise** — Check exchange rates, manage transfers.
- **XE Currency** — Quick THB conversion.
- **SuperRichTH** — Best exchange rates when you need cash.

**Health & Safety:**
- **IQAir** — Air quality monitoring (critical for Chiang Mai burning season).
- **MySOS** — Emergency contacts and medical info.

**Bonus:** Set your phone to eSIM before arriving — one less thing at the airport.

See **Chapter 5: Internet & SIM Cards** and **Chapter 9: Safety & Practical Tips** for more.

Need help setting up any specific app, or tips for your first day in Thailand?`,
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
    reply: `Hey! I'm your NomadReady AI assistant, and I know Thailand inside out. I can help with pretty much anything a digital nomad needs to know — from visa strategies to the best $3 pad kra pao in Chiang Mai.

Here's what I'm great at:

- **Visas** — DTV, LTR, Elite, Tourist, Education — which one fits your situation
- **Budget planning** — Realistic monthly costs for Bangkok, Chiang Mai, Phuket, Pattaya, and the islands
- **Where to live** — Neighborhoods ranked by vibe, price, and nomad-friendliness
- **Coworking** — Spaces with actual WiFi speeds, prices, and honest reviews
- **Banking** — How to set up Wise, avoid ATM fee traps, and handle money transfers
- **Healthcare** — World-class hospitals at 90% less than US prices
- **Safety** — Critical laws that could land you in prison (vaping, lese-majeste), scams to dodge
- **Community** — How to go from knowing nobody to having a solid friend group in 2 weeks

**Try asking me something specific**, like:
- "What visa should a German freelancer get?"
- "Can I live in Chiang Mai on $1,000/month?"
- "Is Thailand safe for solo female travelers?"
- "What's the time zone overlap with US clients?"`,
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
