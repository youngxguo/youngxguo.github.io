import { Button, Card, Flex, Typography } from 'yxgui';
import { siteConfig } from '../siteConfig';
import { EmailIcon, GitHubIcon, LinkedInIcon } from './icons';

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function openMailto(url: string) {
  window.location.href = url;
}

export function HomePage() {
  return (
    <section aria-label="home page">
      <Flex direction="column" align="center" padding="lg">
        <Card>
          <Flex direction="column" gap="lg">
            <header>
              <Flex align="center" gap="sm" wrap>
                <img
                  src={siteConfig.picture}
                  alt={siteConfig.name}
                  width={64}
                  height={64}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <Flex direction="column" gap="sm">
                  <Typography variant="h1">{siteConfig.name}</Typography>
                  <Typography color="muted">{siteConfig.bio}</Typography>
                </Flex>
              </Flex>
            </header>
            <footer>
              <Flex gap="sm" wrap>
                <Button type="button" onClick={() => openExternal(siteConfig.links.github)}>
                  <GitHubIcon />
                  GitHub
                </Button>
                <Button type="button" onClick={() => openExternal(siteConfig.links.linkedin)}>
                  <LinkedInIcon />
                  LinkedIn
                </Button>
                <Button type="button" onClick={() => openMailto(siteConfig.links.email)}>
                  <EmailIcon />
                  Email
                </Button>
              </Flex>
            </footer>
          </Flex>
        </Card>
      </Flex>
    </section>
  );
}
