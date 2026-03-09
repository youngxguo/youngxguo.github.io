import { ReactNode, useMemo, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Flex,
  Input,
  Separator,
  Typography
} from 'yxgui';
import { GitHubIcon, HomeIcon } from '../icons';
import {
  type ComponentDocId,
  docsCatalogGroups,
  docsComponents,
  getCatalogGroupAnchorId
} from './docsData';

interface DocsShellProps {
  activeComponentId?: ComponentDocId;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

const YXGUI_GITHUB_URL = 'https://github.com/youngxguo/yxgui';

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function DocsShell({ activeComponentId, onNavigate, children }: DocsShellProps) {
  const docsByName = useMemo(
    () => new Map(docsComponents.map((component) => [component.name, component])),
    []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredCatalogGroups = useMemo(() => {
    return docsCatalogGroups
      .map((group) => {
        const components = group.components
          .map((name) => docsByName.get(name))
          .filter((component): component is (typeof docsComponents)[number] => Boolean(component))
          .filter((component) => component.name.toLowerCase().includes(normalizedSearchQuery));

        return {
          title: group.title,
          components
        };
      })
      .filter((group) => group.components.length > 0);
  }, [docsByName, normalizedSearchQuery]);

  const activeComponentName = useMemo(
    () => docsComponents.find((component) => component.id === activeComponentId)?.name,
    [activeComponentId]
  );

  const activeGroupTitle = useMemo(() => {
    if (!activeComponentName) {
      return undefined;
    }

    return docsCatalogGroups.find((group) => group.components.includes(activeComponentName))?.title;
  }, [activeComponentName]);
  const activeGroupAnchorId = activeGroupTitle
    ? getCatalogGroupAnchorId(activeGroupTitle)
    : undefined;

  const visibleCatalogGroups = useMemo(() => {
    if (normalizedSearchQuery.length > 0) {
      return filteredCatalogGroups;
    }

    if (!activeGroupTitle) {
      return filteredCatalogGroups;
    }

    return [
      ...filteredCatalogGroups.filter((group) => group.title === activeGroupTitle),
      ...filteredCatalogGroups.filter((group) => group.title !== activeGroupTitle)
    ];
  }, [activeGroupTitle, filteredCatalogGroups, normalizedSearchQuery]);

  return (
    <section aria-label="yxgui docs">
      <Flex direction="column" gap="lg" padding="sm">
        <Flex as="aside" direction="column" gap="md">
          <Flex direction="column" gap="xs">
            <Typography as="h2">Navigation</Typography>
            <Typography as="p" variant="small">
              Jump between component docs by section.
            </Typography>
          </Flex>
          <Input
            size="sm"
            placeholder="Search components"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search components"
          />
          <Separator decorative />
          <Flex direction="column" gap="sm">
            <Button
              variant={!activeComponentId ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onNavigate('/docs')}
            >
              Overview
            </Button>

            {visibleCatalogGroups.length > 0 ? (
              <Flex direction="column" gap="md">
                {visibleCatalogGroups.map((group) => (
                  <Flex key={group.title} direction="column" gap="xs">
                    <Typography as="p" variant="small">
                      {group.title}
                    </Typography>
                    <Flex direction="column" gap="xs">
                      {group.components.map((component) => (
                        <Button
                          key={component.id}
                          variant={activeComponentId === component.id ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => onNavigate(`/docs/components/${component.id}`)}
                        >
                          {component.name}
                        </Button>
                      ))}
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            ) : (
              <Typography as="p" variant="small">
                No components match: <code>{searchQuery.trim()}</code>.
              </Typography>
            )}
          </Flex>
        </Flex>
        <Separator decorative />
        <Flex as="section" direction="column" gap="md">
          <Flex direction="row" align="start" justify="between" wrap="wrap" gap="sm">
            <Flex direction="column" gap="xs">
              <Typography as="h1">Component docs</Typography>
              <Typography as="p" variant="small">
                Concise docs with live examples and copyable snippets.
              </Typography>
              {activeComponentName ? (
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/docs"
                        onClick={(event) => {
                          event.preventDefault();
                          onNavigate('/docs');
                        }}
                      >
                        Overview
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {activeGroupTitle && activeGroupAnchorId ? (
                      <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink
                            href={`/docs#${activeGroupAnchorId}`}
                            onClick={(event) => {
                              event.preventDefault();
                              onNavigate(`/docs#${activeGroupAnchorId}`);
                            }}
                          >
                            {activeGroupTitle}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </>
                    ) : null}
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activeComponentName}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              ) : null}
            </Flex>
            <Flex direction="row" wrap="wrap" gap="xs">
              <Button variant="secondary" onClick={() => openExternal(YXGUI_GITHUB_URL)}>
                <GitHubIcon />
                GitHub
              </Button>
              <Button variant="secondary" onClick={() => onNavigate('/')}>
                <HomeIcon />
                Home
              </Button>
            </Flex>
          </Flex>
          <Separator decorative />
          <Flex direction="column" gap="lg">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
}
