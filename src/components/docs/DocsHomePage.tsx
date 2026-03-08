import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Typography
} from 'yxgui';
import { docsCatalogGroups, docsComponents, docsContext, docsConventions } from './docsData';

interface DocsHomePageProps {
  onNavigate: (path: string) => void;
}

export function DocsHomePage({ onNavigate }: DocsHomePageProps) {
  const coveragePercent = Math.round(
    (docsComponents.length / docsContext.exportedFamiliesCount) * 100
  );

  return (
    <Flex direction="column" gap="lg">
      <Card variant="elevated">
        <CardHeader>
          <Badge variant="outline">Public docs • yxgui {docsContext.packageVersion}</Badge>
          <CardTitle>yxgui docs on the main site</CardTitle>
          <CardDescription>
            This doubles as product documentation and a real integration target for the component
            library.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Typography as="p" variant="small">
            Last synchronized: {docsContext.docsLastUpdated}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Coverage snapshot</CardTitle>
          <CardDescription>
            Deep docs exist for core primitives. The remaining exported families are grouped below
            for incremental rollout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="row" gap="md" wrap="wrap" align="stretch">
            <Flex flex="1 1 12rem">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>{docsComponents.length}</CardTitle>
                  <CardDescription>Component pages with docs coverage</CardDescription>
                </CardHeader>
              </Card>
            </Flex>
            <Flex flex="1 1 12rem">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>{docsContext.exportedFamiliesCount}</CardTitle>
                  <CardDescription>Exported component families in yxgui</CardDescription>
                </CardHeader>
              </Card>
            </Flex>
            <Flex flex="1 1 12rem">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>{coveragePercent}%</CardTitle>
                  <CardDescription>Current deep-doc coverage by family</CardDescription>
                </CardHeader>
              </Card>
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Documentation principles</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="production" aria-label="Documentation principles">
            <TabsList>
              <TabsTrigger value="production">Production usage</TabsTrigger>
              <TabsTrigger value="coverage">Coverage plan</TabsTrigger>
              <TabsTrigger value="standards">Quality bar</TabsTrigger>
            </TabsList>
            <TabsPanel value="production">
              <Typography as="p">
                Every showcased component should back a real user flow. Avoid fake examples that
                never appear in production pages.
              </Typography>
            </TabsPanel>
            <TabsPanel value="coverage">
              <Typography as="p">
                Add pages in this order: primitives first, composed flows second, and edge-case
                states third.
              </Typography>
            </TabsPanel>
            <TabsPanel value="standards">
              <Typography as="p">
                Keep API docs tight, include accessibility notes, and keep playground controls close
                to real usage.
              </Typography>
            </TabsPanel>
          </Tabs>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>API conventions in yxgui</CardTitle>
          <CardDescription>
            These patterns are stable across the library and guide how docs examples should be
            authored.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="row" gap="md" wrap="wrap" align="stretch">
            {docsConventions.map((convention) => (
              <Flex key={convention.id} flex="1 1 16rem">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>{convention.title}</CardTitle>
                    <CardDescription>{convention.detail}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Typography as="p" variant="small">
                      {convention.example}
                    </Typography>
                  </CardContent>
                </Card>
              </Flex>
            ))}
          </Flex>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Catalog map</CardTitle>
          <CardDescription>
            High-level grouping of exported families in yxgui {docsContext.packageVersion}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="row" gap="md" wrap="wrap" align="stretch">
            {docsCatalogGroups.map((group) => (
              <Flex key={group.title} flex="1 1 16rem">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>{group.title}</CardTitle>
                    <CardDescription>{group.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Flex direction="row" gap="xs" wrap="wrap">
                      {group.components.map((componentName) => (
                        <Badge key={`${group.title}-${componentName}`} variant="neutral">
                          {componentName}
                        </Badge>
                      ))}
                    </Flex>
                  </CardContent>
                </Card>
              </Flex>
            ))}
          </Flex>
        </CardContent>
      </Card>

      <Flex direction="row" gap="md" wrap="wrap" align="stretch">
        {docsComponents.map((component) => (
          <Flex key={component.id} flex="1 1 16rem">
            <Card variant="elevated">
              <CardHeader>
                <Badge variant="neutral">{component.status}</Badge>
                <CardTitle>{component.name}</CardTitle>
                <CardDescription>{component.summary}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => onNavigate(`/docs/components/${component.id}`)}>
                  Open component docs
                </Button>
              </CardFooter>
            </Card>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
