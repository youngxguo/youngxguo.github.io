import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button, Flex, ThemeRoot } from 'yxgui';
import { DocsPage } from './docs/DocsPage';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';

type Route = { kind: 'home' } | { kind: 'docs'; componentId?: string } | { kind: 'not-found' };
type SiteTheme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'site-theme';

function getStoredTheme(): SiteTheme | undefined {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : undefined;
  } catch {
    return undefined;
  }
}

function getSystemTheme(): SiteTheme {
  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

function getInitialTheme(): SiteTheme {
  return getStoredTheme() ?? getSystemTheme();
}

function normalizePath(pathname: string): string {
  const [pathWithoutHash] = pathname.split('#');
  const [path] = pathWithoutHash.split('?');

  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

export function parseRoute(pathname: string): Route {
  const path = normalizePath(pathname);

  if (path === '/') {
    return { kind: 'home' };
  }

  if (path === '/docs' || path === '/docs/components') {
    return { kind: 'docs' };
  }

  if (path.startsWith('/docs/components/')) {
    const componentId = decodeURIComponent(path.replace('/docs/components/', ''));

    if (componentId.length === 0) {
      return { kind: 'docs' };
    }

    return { kind: 'docs', componentId };
  }

  return { kind: 'not-found' };
}

export function SiteApp() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname));
  const [theme, setTheme] = useState<SiteTheme>(getInitialTheme);

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write failures in private browsing modes.
    }
  }, [theme]);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));

      if (window.location.hash) {
        window.requestAnimationFrame(() => {
          const targetElement = document.getElementById(window.location.hash.replace('#', ''));

          if (targetElement) {
            targetElement.scrollIntoView({ block: 'start' });
          }
        });
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    const nextUrl = new URL(path, window.location.origin);
    const nextLocation = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
    const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (currentLocation === nextLocation) {
      return;
    }

    window.history.pushState({}, '', nextLocation);
    setRoute(parseRoute(nextUrl.pathname));

    if (nextUrl.hash) {
      window.requestAnimationFrame(() => {
        const targetElement = document.getElementById(nextUrl.hash.replace('#', ''));

        if (targetElement) {
          targetElement.scrollIntoView({ block: 'start' });
          return;
        }

        window.scrollTo(0, 0);
      });
      return;
    }

    window.scrollTo(0, 0);
  }, []);

  const isDarkTheme = theme === 'dark';

  return (
    <ThemeRoot theme={theme} style={{ minHeight: '100dvh' }}>
      <Flex direction="row" justify="end" padding="sm">
        <Button
          size="sm"
          variant="ghost"
          aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
        >
          {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
      </Flex>
      <main>
        {route.kind === 'home' ? <HomePage onNavigate={navigate} /> : null}
        {route.kind === 'docs' ? (
          <DocsPage componentId={route.componentId} onNavigate={navigate} />
        ) : null}
        {route.kind === 'not-found' ? <NotFoundPage onNavigate={navigate} /> : null}
      </main>
    </ThemeRoot>
  );
}
