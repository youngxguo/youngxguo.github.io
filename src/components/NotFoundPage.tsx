import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Separator,
  Typography
} from 'yxgui';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <section aria-label="not found page">
      <Flex direction="column" gap="lg">
        <Card>
          <CardHeader>
            <CardTitle>Page not found</CardTitle>
            <CardDescription>
              This route does not exist yet. Jump back to your profile or the yxgui docs.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Flex direction="row" gap="sm" wrap="wrap">
              <Button onClick={() => onNavigate('/')}>Go to home</Button>
              <Button variant="secondary" onClick={() => onNavigate('/docs')}>
                Open docs
              </Button>
            </Flex>
          </CardFooter>
        </Card>
        <Separator decorative />
        <Typography as="p" variant="small">
          Tip: component docs live under /docs/components/:id
        </Typography>
      </Flex>
    </section>
  );
}
