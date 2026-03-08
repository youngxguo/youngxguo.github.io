import {
  Avatar,
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  Typography
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

const YXGUI_GITHUB_URL = 'https://github.com/youngxguo/yxgui';

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <section aria-label="home page">
      <Flex direction="column" gap="lg">
        <Card>
          <CardHeader>
            <Flex direction="row" align="center" gap="md" wrap="wrap">
              <Avatar src={siteConfig.picture} alt={siteConfig.name} size="lg" shape="circle" />
              <Flex direction="column" gap="xs">
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
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <GitHubIcon />
                  GitHub
                </span>
              </Button>
              <Button variant="secondary" onClick={() => openExternal(siteConfig.links.linkedin)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <LinkedInIcon />
                  LinkedIn
                </span>
              </Button>
              <Button onClick={() => openMailto(siteConfig.links.email)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <EmailIcon />
                  Email
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger variant="ghost">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <DocsIcon />
                    yxgui
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => onNavigate('/docs')}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <DocsIcon />
                      Docs
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => openExternal(YXGUI_GITHUB_URL)}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <GitHubIcon />
                      yxgui GitHub
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
