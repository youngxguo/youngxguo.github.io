import { ReactNode } from 'react';
import {
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
import { type ComponentDocId, docsComponents } from './docsData';

interface DocsShellProps {
  activeComponentId?: ComponentDocId;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

export function DocsShell({ activeComponentId, onNavigate, children }: DocsShellProps) {
  return (
    <section aria-label="yxgui docs">
      <Flex direction="column" gap="lg">
        <Card>
          <CardHeader>
            <Flex direction="row" align="center" justify="between" wrap="wrap" gap="sm">
              <Flex direction="column" gap="xs">
                <Badge variant="success">yxgui</Badge>
                <CardTitle>Component docs</CardTitle>
                <CardDescription>Public docs + live playgrounds for the library.</CardDescription>
              </Flex>
              <Flex direction="row" wrap="wrap" gap="xs">
                <Button variant="ghost" onClick={() => onNavigate('/')}>
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
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>Jump between component docs.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Flex direction="column" gap="xs" align="stretch">
                <Button
                  variant={!activeComponentId ? 'primary' : 'secondary'}
                  onClick={() => onNavigate('/docs')}
                >
                  Overview
                </Button>
                {docsComponents.map((component) => (
                  <Button
                    key={component.id}
                    variant={activeComponentId === component.id ? 'primary' : 'ghost'}
                    onClick={() => onNavigate(`/docs/components/${component.id}`)}
                  >
                    {component.name}
                  </Button>
                ))}
              </Flex>
            </CardFooter>
          </Card>

          <Flex direction="column" gap="lg">
            {children}
          </Flex>
        </Flex>

        <Typography as="p" variant="small">
          This docs shell is now part of the production site.
        </Typography>
      </Flex>
    </section>
  );
}
