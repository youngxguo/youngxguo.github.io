import { useEffect, useState } from 'react';
import type { HighlighterCore } from 'shiki/core';
import './CodeBlock.css';

type CodeLanguage = 'tsx';
type CodeTheme = 'solarized-dark';

interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
  theme?: CodeTheme;
}

const DEFAULT_LANGUAGE: CodeLanguage = 'tsx';
const DEFAULT_THEME: CodeTheme = 'solarized-dark';

const shouldHighlight = import.meta.env.MODE !== 'test';
let highlighterPromise: Promise<HighlighterCore> | undefined;

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [
        { createHighlighterCore },
        { createJavaScriptRegexEngine },
        { default: tsxLanguage },
        { default: solarizedDarkTheme }
      ] = await Promise.all([
        import('shiki/core'),
        import('shiki/engine/javascript'),
        import('shiki/langs/tsx.mjs'),
        import('shiki/themes/solarized-dark.mjs')
      ]);

      return createHighlighterCore({
        langs: [tsxLanguage],
        themes: [solarizedDarkTheme],
        engine: createJavaScriptRegexEngine()
      });
    })();
  }

  return highlighterPromise;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createFallbackHtml(code: string): string {
  const lines = code
    .split('\n')
    .map((line) => `<span class="line">${line.length > 0 ? escapeHtml(line) : ' '}</span>`)
    .join('');

  return `<pre><code>${lines}</code></pre>`;
}

export function CodeBlock({
  code,
  language = DEFAULT_LANGUAGE,
  theme = DEFAULT_THEME
}: CodeBlockProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string>(() => createFallbackHtml(code));

  useEffect(() => {
    if (!shouldHighlight) {
      return;
    }

    let cancelled = false;

    const highlight = async () => {
      try {
        const highlighter = await getHighlighter();
        const html = highlighter.codeToHtml(code, {
          lang: language,
          theme
        });

        if (!cancelled) {
          setHighlightedHtml(html);
        }
      } catch {
        if (!cancelled) {
          setHighlightedHtml(createFallbackHtml(code));
        }
      }
    };

    void highlight();

    return () => {
      cancelled = true;
    };
  }, [code, language, theme]);

  return <div className="code-block" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />;
}
