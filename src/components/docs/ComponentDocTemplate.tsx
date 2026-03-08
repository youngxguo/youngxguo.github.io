import { ReactNode } from 'react';
import { Flex, Separator, Typography } from 'yxgui';
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
    <Flex direction="column" gap="lg" style={{ paddingBlockEnd: '1rem' }}>
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
            <Flex direction="row">
              <Flex
                direction="column"
                gap="sm"
                style={{
                  padding: '0.875rem',
                  borderRadius: '12px',
                  border: '1px solid color-mix(in srgb, currentColor 16%, transparent)'
                }}
              >
                {example.preview}
              </Flex>
            </Flex>
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
