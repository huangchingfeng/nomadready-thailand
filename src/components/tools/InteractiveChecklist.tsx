'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// --- Types ---
interface ChecklistItem {
  id: string;
  title: string;
  detail?: string;
}

interface Phase {
  id: string;
  title: string;
  items: ChecklistItem[];
}

// --- Data ---
const PHASES: Phase[] = [
  {
    id: 'visa-docs',
    title: 'Before Departure: Visa & Documents (2 weeks before)',
    items: [
      { id: 'v1', title: 'Check passport validity (6+ months remaining)', detail: 'Many countries require at least 6 months validity from your entry date. Renew early if needed.' },
      { id: 'v2', title: 'Determine visa type (exempt, DTV, tourist, etc.)', detail: 'Use the Visa Finder tool to get a personalized recommendation based on your situation.' },
      { id: 'v3', title: 'Apply for visa if required', detail: 'Non-exempt nationalities must apply at a Thai embassy. Processing takes 3-5 business days.' },
      { id: 'v4', title: 'Make 2 copies of passport + visa pages', detail: 'Keep digital copies in cloud storage and physical copies separate from your passport.' },
      { id: 'v5', title: 'Prepare proof of onward travel', detail: 'Immigration may ask for proof you will leave. Book a cheap refundable flight or use bestOnwardTicket.com.' },
      { id: 'v6', title: 'Prepare proof of funds (20,000 THB or equivalent)', detail: 'Cash or recent bank statement. Immigration can request this at entry.' },
      { id: 'v7', title: 'Print hotel booking for first 1-3 nights', detail: 'You need an address for the arrival card. Any booking will do, even if you change later.' },
    ],
  },
  {
    id: 'money',
    title: 'Before Departure: Money',
    items: [
      { id: 'm1', title: 'Get a travel-friendly debit card (Wise, Revolut, etc.)', detail: 'These offer the best exchange rates and low/no ATM fees. Apply 2 weeks before for delivery.' },
      { id: 'm2', title: 'Notify your bank of travel to Thailand', detail: 'Prevent your cards from being blocked for suspicious foreign transactions.' },
      { id: 'm3', title: 'Bring $200-300 USD cash as emergency backup', detail: 'In case cards do not work. You can exchange USD to THB at superrich.co.th booths.' },
      { id: 'm4', title: 'Set up a budgeting app (Toshl, YNAB, Wallet)', detail: 'Track THB spending from day one to avoid budget surprises.' },
    ],
  },
  {
    id: 'health',
    title: 'Before Departure: Health',
    items: [
      { id: 'h1', title: 'Get travel/health insurance (SafetyWing, World Nomads)', detail: 'SafetyWing ($45/month) covers most nomad needs. Essential for hospital visits.' },
      { id: 'h2', title: 'Visit doctor — prescriptions, vaccinations', detail: 'Consider Hepatitis A/B, Typhoid. Bring enough prescription meds for your stay.' },
      { id: 'h3', title: 'Pack a basic first-aid kit', detail: 'Include electrolytes, anti-diarrheal, antihistamines, bandages, sunscreen SPF 50+.' },
      { id: 'h4', title: 'Download medical info to phone', detail: 'Blood type, allergies, emergency contacts, insurance policy number — all offline accessible.' },
    ],
  },
  {
    id: 'tech',
    title: 'Before Departure: Tech',
    items: [
      { id: 't1', title: 'Set up VPN (NordVPN, ExpressVPN, Surfshark)', detail: 'Some sites/services may be blocked or throttled. Test it before you leave.' },
      { id: 't2', title: 'Download offline maps (Google Maps / Maps.me)', detail: 'Download the Thailand map region. Works without data in taxis and remote areas.' },
      { id: 't3', title: 'Install translation app (Google Translate, download Thai offline pack)', detail: 'Camera translate is a lifesaver for Thai-only menus and signs.' },
      { id: 't4', title: 'Back up all devices to cloud', detail: 'iCloud, Google Drive, or local backup. Theft and damage happen.' },
      { id: 't5', title: 'Bring universal power adapter (Thailand uses Type A/B/C)', detail: 'Voltage is 220V. US devices may need a converter (check your charger label).' },
    ],
  },
  {
    id: 'research',
    title: 'Before Departure: Research',
    items: [
      { id: 'r1', title: 'Research neighborhoods in your target city', detail: 'Bangkok: Sukhumvit/Ari for nomads. Chiang Mai: Nimman. See Chapter 3.' },
      { id: 'r2', title: 'Shortlist 2-3 accommodations for first week', detail: 'Book on Agoda/Booking.com. Switch to Facebook groups or walk-ins for monthly deals.' },
      { id: 'r3', title: 'Identify top coworking spaces', detail: 'Check Google Maps reviews, test day passes before committing monthly.' },
      { id: 'r4', title: 'Join online nomad communities', detail: 'Facebook: "Digital Nomads Thailand", "Farang in Bangkok". Reddit: r/digitalnomad.' },
    ],
  },
  {
    id: 'landing',
    title: 'Day 1-3: Landing & Setup',
    items: [
      { id: 'l1', title: 'Get through immigration (have documents ready)', detail: 'Fill out arrival card on the plane. Have hotel address, return ticket, and proof of funds accessible.' },
      { id: 'l2', title: 'Get a Thai SIM card at the airport', detail: 'AIS or TrueMove at arrival hall. Tourist SIM: ~300 THB for 30 days, 30GB+ data.' },
      { id: 'l3', title: 'Get THB cash from airport ATM or exchange', detail: 'Airport rates are OK for small amounts. Better rates in city at SuperRich.' },
      { id: 'l4', title: 'Get to accommodation (Grab app = Thai Uber)', detail: 'Download Grab before landing. Way cheaper and more reliable than airport taxis.' },
      { id: 'l5', title: 'Buy essentials at 7-Eleven or Big C', detail: 'Water, snacks, toiletries. 7-Eleven is on every corner — literally every corner.' },
      { id: 'l6', title: 'Test your internet speed', detail: 'Run speedtest.net at accommodation and nearby cafes. You need 25+ Mbps for video calls.' },
      { id: 'l7', title: 'Set up food delivery apps', detail: 'Grab Food, LINE MAN, Food Panda. Life-changing for work-from-home days.' },
      { id: 'l8', title: 'Walk your neighborhood', detail: 'Find the nearest pharmacy, laundry, 7-Eleven, and food street. Mental map beats Google Maps.' },
      { id: 'l9', title: 'Do a Grab/transit test run to coworking spaces', detail: 'Check commute time and cost so you are not late on your first real work day.' },
    ],
  },
  {
    id: 'work',
    title: 'Day 4-7: Getting Settled — Work',
    items: [
      { id: 'w1', title: 'Visit 2-3 coworking spaces (day passes)', detail: 'Test internet speed, desk comfort, AC, noise level, and vibe before committing.' },
      { id: 'w2', title: 'Establish your daily work routine', detail: 'Thailand is UTC+7. Adjust calls/meetings to overlap with clients back home.' },
      { id: 'w3', title: 'Test video call quality from your workspace', detail: 'Join a test Zoom/Meet call. Check audio echo, background noise, and lighting.' },
      { id: 'w4', title: 'Find backup work spots (cafes with wifi)', detail: 'Always have a Plan B. Power outages and internet drops happen.' },
    ],
  },
  {
    id: 'living',
    title: 'Day 4-7: Getting Settled — Living',
    items: [
      { id: 'lv1', title: 'Find long-term accommodation if not settled', detail: 'Walk around and look for "for rent" signs. Facebook groups often have better deals than Airbnb.' },
      { id: 'lv2', title: 'Get a monthly transit pass or rent a scooter', detail: 'Bangkok: BTS Rabbit card. Chiang Mai: rent a scooter (2,500-3,500 THB/month).' },
      { id: 'lv3', title: 'Locate nearest hospital and pharmacy', detail: 'Save the address in Google Maps. Bangkok: Bumrungrad. Chiang Mai: Ram Hospital.' },
      { id: 'lv4', title: 'Set up laundry routine', detail: 'Most areas have coin laundry (20-40 THB/load) or drop-off services (50 THB/kg).' },
      { id: 'lv5', title: 'Explore local markets for groceries', detail: 'Way cheaper than supermarkets. Fresh fruit, vegetables, and street food paradise.' },
    ],
  },
  {
    id: 'finance',
    title: 'Day 4-7: Getting Settled — Finance',
    items: [
      { id: 'f1', title: 'Set up PromptPay / Thai QR payments if possible', detail: 'Some banks allow tourists to register. Makes paying at markets and street stalls easy.' },
      { id: 'f2', title: 'Find the best ATM for your card (lowest fees)', detail: 'Aeon ATMs have the lowest foreign card fees. Avoid the yellow Krungsri ATMs.' },
      { id: 'f3', title: 'Track first week spending — adjust budget', detail: 'Compare actual vs expected. Most people overspend week 1 and stabilize by week 3.' },
    ],
  },
  {
    id: 'community',
    title: 'Day 8-14: Building Community',
    items: [
      { id: 'c1', title: 'Attend a nomad meetup or coworking event', detail: 'Check Meetup.com, Eventbrite, or your coworking space calendar.' },
      { id: 'c2', title: 'Join a local sports/fitness activity', detail: 'Muay Thai, yoga, CrossFit, running clubs — all great for meeting people.' },
      { id: 'c3', title: 'Try a language exchange event', detail: 'Practice Thai, meet locals and other foreigners. Usually free at cafes/bars.' },
      { id: 'c4', title: 'Connect with 3+ fellow nomads', detail: 'Quality over quantity. Find people in your field or timezone for potential collaboration.' },
      { id: 'c5', title: 'Explore beyond your neighborhood', detail: 'Take a weekend trip or explore a new district. Do not get stuck in a bubble.' },
      { id: 'c6', title: 'Learn 10 basic Thai phrases', detail: 'Sawadee krap/ka, khop khun, mai phet, tao rai — locals love when you try.' },
      { id: 'c7', title: 'Find your favorite local food spots', detail: 'The best food is often at the least fancy stalls. Follow the locals.' },
      { id: 'c8', title: 'Set up a weekend routine (explore + rest)', detail: 'Avoid burnout. Thailand has endless weekend trip options within 1-2 hours.' },
    ],
  },
  {
    id: 'optimizing',
    title: 'Day 15-21: Optimizing Your Setup',
    items: [
      { id: 'o1', title: 'Negotiate monthly rate for accommodation', detail: 'If you found a place you like, ask for a monthly discount. Usually 20-40% off daily rates.' },
      { id: 'o2', title: 'Commit to a coworking monthly plan', detail: 'Monthly plans are 30-50% cheaper than day passes. Most offer 1-month minimum.' },
      { id: 'o3', title: 'Optimize your morning routine', detail: 'Find the best coffee spot, breakfast place, or morning exercise that energizes your work day.' },
      { id: 'o4', title: 'Review and adjust your budget', detail: 'By now you know your real spending. Cut what you do not need, invest in what matters.' },
      { id: 'o5', title: 'Set up regular grocery/meal prep routine', detail: 'Cooking a few meals saves money and keeps you healthier than eating out every meal.' },
      { id: 'o6', title: 'Address any visa extension needs', detail: 'If staying beyond initial period, visit immigration or check extension requirements.' },
      { id: 'o7', title: 'Back up photos and files', detail: 'Do a mid-trip backup. Lost phones and stolen laptops are real risks.' },
      { id: 'o8', title: 'Check in with your health', detail: 'Hydrating enough? Sleeping well? Any recurring stomach issues to address?' },
    ],
  },
  {
    id: 'evaluate',
    title: 'Day 22-30: Evaluate & Plan Ahead',
    items: [
      { id: 'e1', title: 'Review your monthly spend vs budget', detail: 'Did you hit your target? Identify biggest surprises and adjust for month 2.' },
      { id: 'e2', title: 'Decide: stay, move cities, or leave?', detail: 'No shame in moving. Chiang Mai too quiet? Try Bangkok. Phuket too touristy? Try Phangan.' },
      { id: 'e3', title: 'Plan next 30 days (visa, accommodation, travel)', detail: 'Book accommodation for month 2. Check visa status. Plan any trips.' },
      { id: 'e4', title: 'Share your experience (blog, social, community)', detail: 'Help the next nomad. Write a review, share tips, or just message someone who helped you.' },
    ],
  },
];

const TOTAL_ITEMS = PHASES.reduce((acc, p) => acc + p.items.length, 0);
const STORAGE_KEY = 'nomadready-checklist';

// --- Component ---
export default function InteractiveChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [expandedDetail, setExpandedDetail] = useState<Record<string, boolean>>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const prevCompletedRef = useRef(0);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setChecked(JSON.parse(saved));
      }
    } catch {
      // 忽略讀取錯誤
    }
    // 預設展開第一個 phase
    setExpanded({ [PHASES[0].id]: true });
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // 忽略寫入錯誤
    }
  }, [checked]);

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / TOTAL_ITEMS) * 100);

  // 慶祝動畫
  useEffect(() => {
    if (completedCount === TOTAL_ITEMS && prevCompletedRef.current < TOTAL_ITEMS && TOTAL_ITEMS > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
    prevCompletedRef.current = completedCount;
  }, [completedCount]);

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const togglePhase = useCallback((phaseId: string) => {
    setExpanded((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  }, []);

  const toggleDetail = useCallback((itemId: string) => {
    setExpandedDetail((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  const handleReset = () => {
    setChecked({});
    setShowResetConfirm(false);
  };

  const handleExport = async () => {
    const lines: string[] = ['NomadReady — 30-Day Thailand Checklist', ''];
    PHASES.forEach((phase) => {
      lines.push(`## ${phase.title}`);
      phase.items.forEach((item) => {
        const mark = checked[item.id] ? 'x' : ' ';
        lines.push(`- [${mark}] ${item.title}`);
      });
      lines.push('');
    });
    lines.push(`Progress: ${completedCount}/${TOTAL_ITEMS} (${progressPercent}%)`);

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      // 備用方案
      const ta = document.createElement('textarea');
      ta.value = lines.join('\n');
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const getPhaseCompleted = (phase: Phase) =>
    phase.items.filter((item) => checked[item.id]).length;

  // 找到目前進行中的 phase（第一個未全部完成的）
  const currentPhaseId = PHASES.find(
    (p) => getPhaseCompleted(p) < p.items.length
  )?.id;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                backgroundColor: ['#06b6d4', '#22d3ee', '#a5f3fc', '#fbbf24', '#f472b6', '#34d399'][
                  Math.floor(Math.random() * 6)
                ],
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          30-Day Thailand Checklist
        </h2>
        <p className="text-slate-400">
          Your step-by-step guide from departure prep to fully settled nomad life.
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm font-semibold text-slate-300">Overall Progress</span>
          <span className="text-sm text-cyan-400 font-mono">
            {completedCount}/{TOTAL_ITEMS} ({progressPercent}%)
          </span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {completedCount === TOTAL_ITEMS && (
          <p className="text-cyan-400 text-sm mt-2 font-semibold text-center">
            Congratulations! You have completed your entire Thailand setup checklist!
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleExport}
          className="flex-1 text-center border border-slate-600 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 font-semibold rounded-lg px-4 py-2.5 text-sm transition-all duration-200"
        >
          {copyFeedback ? 'Copied to clipboard!' : 'Export as Text'}
        </button>
        {showResetConfirm ? (
          <div className="flex-1 flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 bg-red-500/20 border border-red-500/50 text-red-400 font-semibold rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-red-500/30"
            >
              Confirm Reset
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="flex-1 border border-slate-600 text-slate-400 font-semibold rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex-1 text-center border border-slate-600 hover:border-red-500/50 text-slate-400 hover:text-red-400 font-semibold rounded-lg px-4 py-2.5 text-sm transition-all duration-200"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Phases */}
      <div className="space-y-3">
        {PHASES.map((phase) => {
          const phaseCompleted = getPhaseCompleted(phase);
          const phaseTotal = phase.items.length;
          const isAllDone = phaseCompleted === phaseTotal;
          const isCurrent = phase.id === currentPhaseId;
          const isOpen = expanded[phase.id] ?? false;

          return (
            <div
              key={phase.id}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                isCurrent
                  ? 'border-cyan-500/50 bg-slate-800/70'
                  : isAllDone
                  ? 'border-green-500/30 bg-slate-800/30'
                  : 'border-slate-700 bg-slate-800/50'
              }`}
            >
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left"
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    isAllDone
                      ? 'bg-green-500 text-slate-950'
                      : isCurrent
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {isAllDone ? '\u2713' : ''}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold text-sm sm:text-base truncate ${
                      isAllDone ? 'text-green-400' : isCurrent ? 'text-cyan-400' : 'text-slate-200'
                    }`}
                  >
                    {phase.title}
                  </p>
                </div>
                <span className="text-xs text-slate-500 font-mono flex-shrink-0">
                  {phaseCompleted}/{phaseTotal}
                </span>
                <svg
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Phase items */}
              {isOpen && (
                <div className="px-5 pb-4 space-y-1">
                  {phase.items.map((item) => {
                    const isDone = checked[item.id] ?? false;
                    const isDetailOpen = expandedDetail[item.id] ?? false;

                    return (
                      <div key={item.id}>
                        <div
                          className={`flex items-start gap-3 p-2.5 rounded-lg transition-all duration-200 ${
                            isDone ? 'opacity-60' : 'hover:bg-slate-700/30'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleItem(item.id)}
                            className="mt-0.5 w-4 h-4 accent-cyan-500 flex-shrink-0 cursor-pointer"
                          />
                          <div className="flex-1 min-w-0">
                            <button
                              onClick={() => item.detail && toggleDetail(item.id)}
                              className={`text-sm text-left w-full ${
                                isDone
                                  ? 'line-through text-slate-500'
                                  : 'text-slate-200'
                              } ${item.detail ? 'cursor-pointer hover:text-cyan-300' : 'cursor-default'}`}
                            >
                              {item.title}
                              {item.detail && (
                                <svg
                                  className={`inline-block w-3 h-3 ml-1 text-slate-500 transition-transform duration-200 ${
                                    isDetailOpen ? 'rotate-180' : ''
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              )}
                            </button>
                            {item.detail && isDetailOpen && (
                              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                {item.detail}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti-fall linear forwards;
        }
      `}</style>
    </div>
  );
}
