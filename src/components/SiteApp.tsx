import { useCallback, useEffect, useState } from 'react';
import { DocsPage } from './docs/DocsPage';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';

type Route = { kind: 'home' } | { kind: 'docs'; componentId?: string } | { kind: 'not-found' };

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
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

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    if (window.location.pathname === path) {
      return;
    }

    window.history.pushState({}, '', path);
    setRoute(parseRoute(path));
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {route.kind === 'home' ? <HomePage onNavigate={navigate} /> : null}
      {route.kind === 'docs' ? (
        <DocsPage componentId={route.componentId} onNavigate={navigate} />
      ) : null}
      {route.kind === 'not-found' ? <NotFoundPage onNavigate={navigate} /> : null}
    </main>
  );
}
