import {
  Avatar,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex
} from 'yxgui';
import { DocsIcon, EmailIcon, GitHubIcon, LinkedInIcon } from './icons';
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
      <Flex direction="column" gap="md" align="center">
        <Flex>
          <Card variant="elevated">
            <CardHeader>
              <Flex direction="row" align="center" gap="sm" wrap="wrap">
                <Avatar src={siteConfig.picture} alt={siteConfig.name} size="md" shape="circle" />
                <Flex direction="column" gap="xs">
                  <CardTitle>{siteConfig.name}</CardTitle>
                  <CardDescription>{siteConfig.bio}</CardDescription>
                </Flex>
              </Flex>
            </CardHeader>
            <CardFooter>
              <Flex direction="row" gap="xs" wrap="nowrap">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openExternal(siteConfig.links.github)}
                >
                  <GitHubIcon />
                  GitHub
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openExternal(siteConfig.links.linkedin)}
                >
                  <LinkedInIcon />
                  LinkedIn
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openMailto(siteConfig.links.email)}
                >
                  <EmailIcon />
                  Email
                </Button>
                <Button size="sm" variant="secondary" onClick={() => onNavigate('/docs')}>
                  <DocsIcon />
                  Docs
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        </Flex>
      </Flex>
    </section>
  );
}
