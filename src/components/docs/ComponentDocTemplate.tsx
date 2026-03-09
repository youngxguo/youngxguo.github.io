import { ReactNode } from 'react';
import { Card, CardContent, Flex, Separator, Typography } from 'yxgui';
import { CodeBlock } from './CodeBlock';
import { ComponentDoc } from './docsData';

export interface ComponentStoryExample {
  id: string;
  title: string;
  description: string;
  code: string;
  preview: ReactNode;
}

interface ComponentDocTemplateProps {
  doc: ComponentDoc;
  examples: ComponentStoryExample[];
  onNavigate?: (path: string) => void;
}

export function ComponentDocTemplate({ doc, examples }: ComponentDocTemplateProps) {
  const useFramedPreview = doc.id !== 'breadcrumb';

  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="xs">
        <Typography as="h2">{doc.name}</Typography>
        <Typography as="p" variant="small">
          {doc.summary}
        </Typography>
      </Flex>
      <Separator decorative />

      {examples.map((example, index) => (
        <Flex key={example.id} direction="column" gap="sm">
          <Flex direction="column" gap="xs">
            <Typography as="h3">{example.title}</Typography>
            <Typography as="p" variant="small">
              {example.description}
            </Typography>
          </Flex>
          {useFramedPreview ? (
            <Card variant="outlined">
              <CardContent>
                <Flex direction="column" gap="sm">
                  {example.preview}
                </Flex>
              </CardContent>
            </Card>
          ) : (
            <Flex direction="row">{example.preview}</Flex>
          )}
          <CodeBlock code={example.code} />
          {index < examples.length - 1 ? <Separator decorative /> : null}
        </Flex>
      ))}
    </Flex>
  );
}
