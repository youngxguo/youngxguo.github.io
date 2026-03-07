import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from 'yxgui';
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
        <Card>
          <CardHeader>
            <CardTitle>Unknown component</CardTitle>
            <CardDescription>
              Component <code>{componentId}</code> does not have docs yet.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => onNavigate('/docs')}>Back to docs home</Button>
          </CardFooter>
        </Card>
      </DocsShell>
    );
  }

  return (
    <DocsShell activeComponentId={doc.id} onNavigate={onNavigate}>
      <ComponentDocPage componentId={doc.id as ComponentDocId} />
    </DocsShell>
  );
}
