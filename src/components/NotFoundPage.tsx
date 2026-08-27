import { Button, Card, Flex, Typography } from 'yxgui';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <section aria-label="not found page">
      <Flex direction="column" padding="lg">
        <Card>
          <Flex direction="column" gap="lg">
            <header>
              <Flex direction="column" gap="sm">
                <Typography variant="h1">Page not found</Typography>
                <Typography color="muted">
                  This route does not exist. Jump back to your profile.
                </Typography>
              </Flex>
            </header>
            <footer>
              <Button type="button" onClick={() => onNavigate('/')}>
                Go to home
              </Button>
            </footer>
          </Flex>
        </Card>
      </Flex>
    </section>
  );
}
