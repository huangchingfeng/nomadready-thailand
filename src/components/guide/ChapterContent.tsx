'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

interface ChapterContentProps {
  content: string;
}

export default function ChapterContent({ content }: ChapterContentProps) {
  const components: Components = {
    // 表格包裝 — 手機端可橫向捲動
    table: ({ children, ...props }) => (
      <div className="table-wrapper">
        <table {...props}>{children}</table>
      </div>
    ),
    // 標題加上 id 做錨點
    h2: ({ children, ...props }) => {
      const text = typeof children === 'string' ? children : getTextContent(children);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const text = typeof children === 'string' ? children : getTextContent(children);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      );
    },
    // 外部連結 target blank
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http');
      return (
        <a
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <div className="prose-nomad max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// 從 React children 提取純文字
function getTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join('');
  if (children && typeof children === 'object' && 'props' in (children as unknown as Record<string, unknown>)) {
    const el = children as unknown as { props: { children: React.ReactNode } };
    return getTextContent(el.props.children);
  }
  return '';
}
