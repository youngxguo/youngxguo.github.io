import { useCallback, useEffect, useState } from 'react';
import { DocsPage } from './docs/DocsPage';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';

type Route = { kind: 'home' } | { kind: 'docs'; componentId?: string } | { kind: 'not-found' };

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
