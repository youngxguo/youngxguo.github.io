import { Button, Flex, Separator, Typography } from 'yxgui';
import { type ComponentDocId, getDocById } from './docsData';
import { ComponentDocPage } from './ComponentDocPage';
import { DocsHomePage } from './DocsHomePage';
import { DocsShell } from './DocsShell';

interface DocsPageProps {
  componentId?: string;
  onNavigate: (path: string) => void;
}

export function DocsPage({ componentId, onNavigate }: DocsPageProps) {
  if (!componentId) {
    return (
      <DocsShell onNavigate={onNavigate}>
        <DocsHomePage onNavigate={onNavigate} />
      </DocsShell>
    );
  }

  const doc = getDocById(componentId);

  if (!doc) {
    return (
      <DocsShell onNavigate={onNavigate}>
        <Flex direction="column" gap="md">
          <Typography as="h2">Unknown component</Typography>
          <Typography as="p" variant="small">
            Component <code>{componentId}</code> does not have docs yet.
          </Typography>
          <Separator decorative />
          <Flex direction="row" gap="sm">
            <Button onClick={() => onNavigate('/docs')}>Back to docs home</Button>
          </Flex>
        </Flex>
      </DocsShell>
    );
  }

  return (
    <DocsShell activeComponentId={doc.id} onNavigate={onNavigate}>
      <ComponentDocPage componentId={doc.id as ComponentDocId} onNavigate={onNavigate} />
    </DocsShell>
  );
}
