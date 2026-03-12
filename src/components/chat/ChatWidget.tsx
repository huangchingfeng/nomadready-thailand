'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  getRemainingQuestions,
  incrementUsage,
  isProUser,
  DAILY_LIMIT,
} from '@/lib/chat';

// 訊息型別
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  chapterRef?: string;
}

// SessionStorage key
const SESSION_KEY = 'nomadready-chat-messages';

// 預設問題
const SUGGESTED_QUESTIONS = [
  'What visa should I get?',
  'How much does Chiang Mai cost per month?',
  'Is Thailand safe for solo travelers?',
  "What's the best neighborhood in Bangkok?",
];

// 簡易 Markdown 轉 HTML（支援 bold、links、lists、tables）
function renderMarkdown(text: string): string {
  let html = text
    // 先處理表格（需要在行處理前）
    .replace(/\n/g, '\\n')
    // 暫時不處理表格，先回復換行
    .replace(/\\n/g, '\n');

  // 處理表格
  const lines = html.split('\n');
  const processed: string[] = [];
  let inTable = false;
  let tableRows: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isTableRow = /^\|(.+)\|$/.test(line.trim());
    const isSeparator = /^\|[\s-:|]+\|$/.test(line.trim());

    if (isTableRow || isSeparator) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      if (!isSeparator) {
        tableRows.push(line.trim());
      }
    } else {
      if (inTable) {
        // 結束表格
        let tableHtml =
          '<table class="text-xs border-collapse my-2 w-full"><thead><tr>';
        const headerCells = tableRows[0]
          .split('|')
          .filter((c) => c.trim() !== '');
        headerCells.forEach((cell) => {
          tableHtml += `<th class="border border-slate-600 px-2 py-1 text-left text-slate-300">${cell.trim()}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';
        for (let j = 1; j < tableRows.length; j++) {
          tableHtml += '<tr>';
          const cells = tableRows[j]
            .split('|')
            .filter((c) => c.trim() !== '');
          cells.forEach((cell) => {
            tableHtml += `<td class="border border-slate-700 px-2 py-1 text-slate-300">${cell.trim()}</td>`;
          });
          tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table>';
        processed.push(tableHtml);
        inTable = false;
        tableRows = [];
      }
      processed.push(line);
    }
  }
  // 如果結尾還在表格中
  if (inTable && tableRows.length > 0) {
    let tableHtml =
      '<table class="text-xs border-collapse my-2 w-full"><thead><tr>';
    const headerCells = tableRows[0]
      .split('|')
      .filter((c) => c.trim() !== '');
    headerCells.forEach((cell) => {
      tableHtml += `<th class="border border-slate-600 px-2 py-1 text-left text-slate-300">${cell.trim()}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';
    for (let j = 1; j < tableRows.length; j++) {
      tableHtml += '<tr>';
      const cells = tableRows[j]
        .split('|')
        .filter((c) => c.trim() !== '');
      cells.forEach((cell) => {
        tableHtml += `<td class="border border-slate-700 px-2 py-1 text-slate-300">${cell.trim()}</td>`;
      });
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table>';
    processed.push(tableHtml);
  }

  html = processed.join('\n');

  // 行內 markdown 格式
  html = html
    // Headers
    .replace(/^### (.+)$/gm, '<h4 class="font-semibold text-cyan-400 mt-3 mb-1">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="font-semibold text-cyan-400 mt-3 mb-1">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-100 font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code class="bg-slate-700 px-1 rounded text-cyan-300 text-xs">$1</code>')
    // Links
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300">$1</a>'
    )
    // Unordered list items
    .replace(
      /^- (.+)$/gm,
      '<li class="ml-4 list-disc list-outside text-slate-300">$1</li>'
    )
    // Numbered list items
    .replace(
      /^\d+\. (.+)$/gm,
      '<li class="ml-4 list-decimal list-outside text-slate-300">$1</li>'
    )
    // Wrap consecutive list items
    .replace(
      /(<li[^>]*>.*<\/li>\n?)+/g,
      (match) => `<ul class="my-1 space-y-0.5">${match}</ul>`
    )
    // Paragraphs (lines that are not already HTML)
    .replace(
      /^(?!<[a-z])((?!^\s*$).+)$/gm,
      '<p class="my-1">$1</p>'
    )
    // Clean up empty lines
    .replace(/\n{2,}/g, '\n');

  return html;
}

// 打字指示器
function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-3">
      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-xs text-cyan-400 font-bold">N</span>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState(DAILY_LIMIT);
  const [isPro, setIsPro] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // 初始化：讀取 sessionStorage 和使用量
  useEffect(() => {
    setIsPro(isProUser());
    setRemaining(getRemainingQuestions());

    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed: Message[] = JSON.parse(stored);
        setMessages(
          parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }))
        );
      }
    } catch {
      // 忽略 sessionStorage 錯誤
    }
  }, []);

  // 訊息變化時儲存到 sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
      } catch {
        // 忽略 sessionStorage 錯誤
      }
    }
  }, [messages]);

  // 自動滾動到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // 開啟後 focus 到輸入框
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // 更新剩餘次數
  const refreshRemaining = useCallback(() => {
    const r = getRemainingQuestions();
    setRemaining(r);
    setIsPro(isProUser());
    if (!isProUser() && r <= 0) {
      setLimitReached(true);
    }
  }, []);

  // 發送訊息
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      // 檢查免費額度
      if (!isProUser() && getRemainingQuestions() <= 0) {
        setLimitReached(true);
        return;
      }

      const userMessage: Message = {
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      // 計數
      incrementUsage();
      refreshRemaining();

      try {
        // 準備歷史紀錄（最近 10 條）
        const history = messages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history }),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();

        const botMessage: Message = {
          role: 'assistant',
          content: data.reply || "Sorry, I couldn't generate a response.",
          timestamp: new Date(),
          chapterRef: data.chapterRef,
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch {
        const errorMessage: Message = {
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting. Please try again in a moment.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, refreshRemaining]
  );

  // 鍵盤事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // 點擊預設問題
  const handleSuggestion = (question: string) => {
    sendMessage(question);
  };

  // 格式化時間
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 剩餘次數顯示文字
  const remainingText = isPro
    ? 'Pro — Unlimited'
    : `${remaining}/${DAILY_LIMIT} questions remaining`;

  const badgeText = isPro ? 'Pro' : `${remaining} left`;

  return (
    <>
      {/* 聊天按鈕（關閉狀態） */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            refreshRemaining();
          }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25 flex items-center justify-center transition-all duration-200 hover:scale-105 group"
          aria-label="Open chat"
        >
          {/* 脈衝動畫 */}
          <span className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20" />

          {/* 聊天圖示 SVG */}
          <svg
            className="w-6 h-6 relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>

          {/* 剩餘次數 badge */}
          <span className="absolute -top-1 -right-1 bg-slate-900 text-cyan-400 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-cyan-500/30 whitespace-nowrap">
            {badgeText}
          </span>
        </button>
      )}

      {/* 聊天視窗（開啟狀態） */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full h-full md:w-96 md:h-[500px] md:rounded-2xl bg-slate-800 shadow-2xl shadow-black/40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 border border-slate-700/50"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <span className="text-sm text-cyan-400 font-bold">N</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  NomadReady AI
                </h3>
                <p className="text-[10px] text-slate-400">{remainingText}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
              aria-label="Close chat"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 bg-slate-900 space-y-3">
            {/* 空白狀態：歡迎訊息 + 預設問題 */}
            {messages.length === 0 && !isLoading && (
              <div className="space-y-4">
                {/* 歡迎訊息 */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-cyan-400 font-bold">N</span>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 max-w-[85%]">
                    <p className="text-sm text-slate-100">
                      Hi! I&apos;m your NomadReady AI assistant. Ask me
                      anything about living in Thailand as a digital nomad
                      — visas, costs, neighborhoods, and more.
                    </p>
                  </div>
                </div>

                {/* 預設問題 */}
                <div className="space-y-2 pl-8">
                  <p className="text-xs text-slate-500">Try asking:</p>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      className="block w-full text-left text-sm text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 rounded-lg px-3 py-2 hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 訊息列表 */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-2'}`}
              >
                {/* Bot 頭像 */}
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-cyan-400 font-bold">N</span>
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2.5 ${
                    msg.role === 'user'
                      ? 'bg-cyan-500/10 border border-cyan-500/20'
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="text-sm text-slate-100 whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  ) : (
                    <div
                      className="text-sm text-slate-300 chat-markdown"
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdown(msg.content),
                      }}
                    />
                  )}

                  {/* 章節參考 */}
                  {msg.chapterRef && (
                    <p className="text-[10px] text-cyan-500/70 mt-1.5 pt-1.5 border-t border-slate-700/50">
                      Source: {msg.chapterRef}
                    </p>
                  )}

                  {/* 時間戳 */}
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.role === 'user'
                        ? 'text-cyan-500/40 text-right'
                        : 'text-slate-500'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* 打字指示器 */}
            {isLoading && <TypingIndicator />}

            {/* 滾動錨點 */}
            <div ref={messagesEndRef} />
          </div>

          {/* 免費額度用完的覆蓋層 */}
          {limitReached && (
            <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center z-10 p-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-100">
                  Daily limit reached
                </h3>
                <p className="text-sm text-slate-400">
                  You&apos;ve used your {DAILY_LIMIT} free questions today.
                  Unlock unlimited AI answers and all 11 chapters.
                </p>
                <a
                  href="/pricing"
                  className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Unlock Unlimited AI Answers — from $5.75/mo
                </a>
                <button
                  className="block mx-auto text-sm text-slate-500 hover:text-slate-300 transition-colors"
                  onClick={() => {
                    setLimitReached(false);
                    setIsOpen(false);
                  }}
                >
                  Maybe later
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="px-3 py-3 bg-slate-800 border-t border-slate-700">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Thailand..."
                rows={1}
                className="flex-1 bg-slate-800 border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 resize-none outline-none transition-colors max-h-24 scrollbar-thin"
                style={{
                  height: 'auto',
                  minHeight: '40px',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 96)}px`;
                }}
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg w-10 h-10 flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Send message"
              >
                {isLoading ? (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-[10px] text-slate-600 mt-1.5 text-center">
              AI-powered guide assistant. May not always be accurate.
            </p>
          </div>
        </div>
      )}

      {/* 全域 CSS for chat markdown */}
      <style jsx global>{`
        .chat-markdown p {
          margin: 0.25rem 0;
        }
        .chat-markdown ul {
          margin: 0.25rem 0;
          padding-left: 0;
        }
        .chat-markdown li {
          margin: 0.125rem 0;
        }
        .chat-markdown table {
          font-size: 0.75rem;
        }
        .chat-markdown strong {
          color: #f1f5f9;
        }
        .chat-markdown h3,
        .chat-markdown h4 {
          font-size: 0.8125rem;
        }

        @keyframes slide-in-from-bottom-4 {
          from {
            transform: translateY(1rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation: slide-in-from-bottom-4 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
