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
import { GitHubIcon } from '../icons';
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
      <Flex direction="column" gap="lg">
        <Card>
          <CardHeader>
            <Flex direction="row" align="center" justify="between" wrap="wrap" gap="sm">
              <Flex direction="column" gap="xs" flex="1 1 22rem">
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
          <Flex flex="0 0 20rem">
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>Jump between component docs by section.</CardDescription>
              </CardHeader>
              <CardFooter>
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
              </CardFooter>
            </Card>
          </Flex>

          <Flex direction="column" gap="lg" flex="1 1 34rem">
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
