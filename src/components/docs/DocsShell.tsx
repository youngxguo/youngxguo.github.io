import { ReactNode, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Flex
} from 'yxgui';
import { DocsIcon, GitHubIcon, HomeIcon } from '../icons';
import { type ComponentDocId, docsCatalogGroups, docsComponents } from './docsData';

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
    <section aria-label="yxgui docs" style={{ height: '100dvh' }}>
      <Flex direction="column" gap="lg" style={{ height: '100%', minHeight: 0 }}>
        <Card>
          <CardHeader>
            <Flex direction="row" align="center" justify="between" wrap="wrap" gap="sm">
              <Flex direction="column" gap="xs" grow={1}>
                <CardTitle>Component docs</CardTitle>
                <CardDescription>Public docs + live playgrounds for the library.</CardDescription>
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
                <Button variant="secondary" onClick={() => onNavigate('/docs')}>
                  <DocsIcon />
                  Docs
                </Button>
              </Flex>
            </Flex>
          </CardHeader>
        </Card>

        <Flex
          direction="row"
          gap="lg"
          align="start"
          wrap="nowrap"
          grow={1}
          style={{ minHeight: 0 }}
        >
          <Flex as="aside" flex={1} style={{ minHeight: 0 }}>
            <Card style={{ height: '100%', overflow: 'hidden' }}>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>Jump between component docs by section.</CardDescription>
              </CardHeader>
              <CardContent style={{ overflowY: 'auto' }}>
                <Flex direction="column" gap="md">
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
                                  variant={activeComponentId === component.id ? 'primary' : 'ghost'}
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
              </CardContent>
            </Card>
          </Flex>

          <Flex
            as="section"
            direction="column"
            gap="lg"
            flex={3}
            style={{ minHeight: 0, overflowY: 'auto' }}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
}
