import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button, Flex, Theme } from 'yxgui';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';

type Route = { kind: 'home' } | { kind: 'not-found' };
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
    <Theme mode={theme}>
      <Flex direction="column" minHeight="viewport">
        <header>
          <Flex justify="end" padding="sm">
            <Button
              type="button"
              aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
            >
              {isDarkTheme ? (
                <Sun aria-hidden="true" size={16} />
              ) : (
                <Moon aria-hidden="true" size={16} />
              )}
            </Button>
          </Flex>
        </header>
        <main>
          {route.kind === 'home' ? <HomePage /> : null}
          {route.kind === 'not-found' ? <NotFoundPage onNavigate={navigate} /> : null}
        </main>
      </Flex>
    </Theme>
  );
}
