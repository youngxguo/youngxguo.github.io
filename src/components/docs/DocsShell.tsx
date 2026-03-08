import { ReactNode, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Typography
} from 'yxgui';
import { type ComponentDocId, docsCatalogGroups, docsComponents, docsContext } from './docsData';

interface DocsShellProps {
  activeComponentId?: ComponentDocId;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

const YXGUI_GITHUB_URL = 'https://github.com/youngxguo/yxgui';
function getInitialExpandedSections(): string[] {
  return docsCatalogGroups.length > 0 ? [docsCatalogGroups[0].title] : [];
}

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      style={{ display: 'block' }}
    >
      <path
        fill="currentColor"
        d="M12 0.5C5.649 0.5 0.5 5.649 0.5 12c0 5.083 3.292 9.397 7.86 10.919 0.575 0.106 0.785-0.25 0.785-0.555 0-0.274-0.01-1-0.016-1.962-3.197 0.695-3.872-1.54-3.872-1.54-0.523-1.328-1.277-1.681-1.277-1.681-1.044-0.714 0.08-0.699 0.08-0.699 1.155 0.081 1.763 1.186 1.763 1.186 1.026 1.758 2.692 1.25 3.348 0.956 0.104-0.743 0.402-1.25 0.731-1.538-2.552-0.29-5.236-1.276-5.236-5.68 0-1.255 0.45-2.282 1.186-3.087-0.12-0.29-0.514-1.458 0.112-3.04 0 0 0.967-0.31 3.17 1.178 0.92-0.256 1.906-0.383 2.886-0.388 0.979 0.005 1.966 0.132 2.887 0.388 2.2-1.488 3.164-1.178 3.164-1.178 0.63 1.582 0.236 2.75 0.117 3.04 0.739 0.805 1.184 1.832 1.184 3.087 0 4.415-2.688 5.386-5.249 5.671 0.413 0.356 0.781 1.059 0.781 2.135 0 1.541-0.014 2.783-0.014 3.162 0 0.309 0.207 0.668 0.79 0.554C20.211 21.392 23.5 17.08 23.5 12c0-6.351-5.149-11.5-11.5-11.5z"
      />
    </svg>
  );
}

export function DocsShell({ activeComponentId, onNavigate, children }: DocsShellProps) {
  const docsByName = useMemo(
    () => new Map(docsComponents.map((component) => [component.name, component])),
    []
  );
  const [expandedSections, setExpandedSections] = useState<string[]>(getInitialExpandedSections);
  const activeGroupTitle = useMemo(() => {
    const activeComponentName = docsComponents.find(
      (component) => component.id === activeComponentId
    )?.name;

    if (!activeComponentName) {
      return undefined;
    }

    return docsCatalogGroups.find((group) => group.components.includes(activeComponentName))?.title;
  }, [activeComponentId]);
  const accordionValue = useMemo(() => {
    if (!activeGroupTitle) {
      return expandedSections;
    }

    return Array.from(new Set([...expandedSections, activeGroupTitle]));
  }, [activeGroupTitle, expandedSections]);

  return (
    <section aria-label="yxgui docs">
      <Flex
        direction="column"
        gap="lg"
        style={{ maxWidth: '72rem', margin: '0 auto', padding: '1.5rem 1rem 2rem' }}
      >
        <Card>
          <CardHeader>
            <Flex direction="row" align="center" justify="between" wrap="wrap" gap="sm">
              <Flex direction="column" gap="xs" style={{ flex: '1 1 22rem' }}>
                <Badge variant="success">yxgui</Badge>
                <CardTitle>Component docs</CardTitle>
                <CardDescription>Public docs + live playgrounds for the library.</CardDescription>
              </Flex>
              <Flex direction="row" wrap="wrap" gap="xs">
                <Button
                  variant="secondary"
                  aria-label="yxgui GitHub"
                  title="yxgui GitHub"
                  onClick={() => openExternal(YXGUI_GITHUB_URL)}
                >
                  <GitHubIcon />
                </Button>
                <Button variant="secondary" onClick={() => onNavigate('/')}>
                  Personal site
                </Button>
                <Button variant="secondary" onClick={() => onNavigate('/docs')}>
                  Docs home
                </Button>
              </Flex>
            </Flex>
          </CardHeader>
        </Card>

        <Flex direction="row" gap="lg" align="start" wrap="wrap">
          <Flex
            style={{
              flex: '0 0 clamp(18rem, 28vw, 20rem)',
              minWidth: '18rem',
              maxHeight: 'calc(100dvh - 2rem)',
              position: 'sticky',
              top: '1rem'
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>Jump between component docs by section.</CardDescription>
              </CardHeader>
              <CardFooter>
                <div
                  style={{
                    boxSizing: 'border-box',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    width: '100%'
                  }}
                >
                  <Flex direction="column" gap="md" style={{ width: '100%', minWidth: 0 }}>
                    <Button
                      variant={!activeComponentId ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => onNavigate('/docs')}
                    >
                      Overview
                    </Button>

                    <Accordion
                      type="multiple"
                      value={accordionValue}
                      onValueChange={setExpandedSections}
                    >
                      {docsCatalogGroups.map((group) => {
                        const groupComponents = group.components
                          .map((name) => docsByName.get(name))
                          .filter((component): component is (typeof docsComponents)[number] =>
                            Boolean(component)
                          );

                        if (groupComponents.length === 0) {
                          return null;
                        }

                        return (
                          <AccordionItem key={group.title} value={group.title}>
                            <AccordionTrigger variant="ghost" size="sm">
                              {group.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <Flex direction="column" gap="xs">
                                {groupComponents.map((component) => (
                                  <Button
                                    key={component.id}
                                    variant={
                                      activeComponentId === component.id ? 'primary' : 'ghost'
                                    }
                                    size="sm"
                                    onClick={() => onNavigate(`/docs/components/${component.id}`)}
                                  >
                                    {component.name}
                                  </Button>
                                ))}
                              </Flex>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </Flex>
                </div>
              </CardFooter>
            </Card>
          </Flex>

          <Flex direction="column" gap="lg" style={{ flex: '1 1 34rem', minWidth: '18rem' }}>
            {children}
          </Flex>
        </Flex>

        <Typography as="p" variant="small">
          This docs shell is part of the production site and is synchronized with yxgui{' '}
          {docsContext.packageVersion}.
        </Typography>
      </Flex>
    </section>
  );
}
