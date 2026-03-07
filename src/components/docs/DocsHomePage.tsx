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
import { docsComponents } from './docsData';

interface DocsHomePageProps {
  onNavigate: (path: string) => void;
}

export function DocsHomePage({ onNavigate }: DocsHomePageProps) {
  return (
    <Flex direction="column" gap="lg">
      <Card>
        <CardHeader>
          <Badge variant="outline">Public docs</Badge>
          <CardTitle>yxgui docs on the main site</CardTitle>
          <CardDescription>
            This doubles as product documentation and a real integration target for the component
            library.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
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

      <Flex direction="column" gap="md">
        {docsComponents.map((component) => (
          <Card key={component.id}>
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
        ))}
      </Flex>
    </Flex>
  );
}
