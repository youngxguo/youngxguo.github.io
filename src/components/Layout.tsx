import {
  Avatar,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography
} from 'yxgui';
import { siteConfig } from '../siteConfig';

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function openMailto(url: string) {
  window.location.href = url;
}

export function Layout() {
  return (
    <main>
      <Card>
        <CardHeader>
          <Avatar src={siteConfig.picture} alt={siteConfig.name} size="lg" shape="circle" />
          <CardTitle>{siteConfig.name}</CardTitle>
          <CardDescription>{siteConfig.bio}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="secondary" onClick={() => openExternal(siteConfig.links.github)}>
            GitHub
          </Button>
          <Button variant="secondary" onClick={() => openExternal(siteConfig.links.linkedin)}>
            LinkedIn
          </Button>
          <Button onClick={() => openMailto(siteConfig.links.email)}>Email</Button>
        </CardFooter>
      </Card>
      <Typography as="p" variant="small">
        {siteConfig.name} © {new Date().getFullYear()}
      </Typography>
    </main>
  );
}
