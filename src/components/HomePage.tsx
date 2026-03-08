import {
  Avatar,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Typography
} from 'yxgui';
import { siteConfig } from '../siteConfig';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function openMailto(url: string) {
  window.location.href = url;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <section aria-label="home page">
      <Flex
        direction="column"
        gap="md"
        style={{ maxWidth: '50rem', margin: '0 auto', padding: '1rem 0.75rem 1.5rem' }}
      >
        <Card>
          <CardHeader>
            <Flex direction="row" align="center" gap="sm" wrap="wrap">
              <Avatar src={siteConfig.picture} alt={siteConfig.name} size="md" shape="circle" />
              <Flex direction="column" gap="xs" style={{ flex: '1 1 16rem' }}>
                <CardTitle>{siteConfig.name}</CardTitle>
                <CardDescription>{siteConfig.bio}</CardDescription>
              </Flex>
            </Flex>
          </CardHeader>
          <CardFooter>
            <Flex direction="row" gap="xs" wrap="wrap">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openExternal(siteConfig.links.github)}
              >
                GitHub
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openExternal(siteConfig.links.linkedin)}
              >
                LinkedIn
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openMailto(siteConfig.links.email)}
              >
                Email
              </Button>
              <Button size="sm" variant="secondary" onClick={() => onNavigate('/docs')}>
                yxgui
              </Button>
            </Flex>
          </CardFooter>
        </Card>
        <Typography as="p" variant="small">
          {siteConfig.name} © {new Date().getFullYear()}
        </Typography>
      </Flex>
    </section>
  );
}
