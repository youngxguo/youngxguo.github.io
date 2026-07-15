import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle, Flex } from 'yxgui';

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
            <CardDescription>This route does not exist. Jump back to your profile.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => onNavigate('/')}>Go to home</Button>
          </CardFooter>
        </Card>
      </Flex>
    </section>
  );
}
