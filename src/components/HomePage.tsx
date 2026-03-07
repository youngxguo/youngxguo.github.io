import {
  Avatar,
  Badge,
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
        gap="lg"
        style={{ maxWidth: '56rem', margin: '0 auto', padding: '1.5rem 1rem 2rem' }}
      >
        <Card>
          <CardHeader>
            <Flex direction="row" align="center" gap="md" wrap="wrap">
              <Avatar src={siteConfig.picture} alt={siteConfig.name} size="lg" shape="circle" />
              <Flex direction="column" gap="xs" style={{ flex: '1 1 18rem' }}>
                <Flex direction="row" gap="xs" wrap="wrap">
                  <Badge variant="outline">Engineering</Badge>
                  <Badge variant="neutral">yxgui maintainer</Badge>
                </Flex>
                <CardTitle>{siteConfig.name}</CardTitle>
                <CardDescription>{siteConfig.bio}</CardDescription>
              </Flex>
            </Flex>
          </CardHeader>
          <CardFooter>
            <Flex direction="row" gap="sm" wrap="wrap">
              <Button variant="secondary" onClick={() => openExternal(siteConfig.links.github)}>
                GitHub
              </Button>
              <Button variant="secondary" onClick={() => openExternal(siteConfig.links.linkedin)}>
                LinkedIn
              </Button>
              <Button onClick={() => openMailto(siteConfig.links.email)}>Email</Button>
              <Button variant="ghost" onClick={() => onNavigate('/docs')}>
                yxgui docs
              </Button>
            </Flex>
          </CardFooter>
        </Card>
        <Separator decorative />
        <Typography as="p" variant="small">
          {siteConfig.name} © {new Date().getFullYear()}
        </Typography>
      </Flex>
    </section>
  );
}
