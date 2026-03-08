import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Flex } from 'yxgui';
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
}

export function ComponentDocTemplate({ doc, examples }: ComponentDocTemplateProps) {
  return (
    <Flex direction="column" gap="lg">
      <Card>
        <CardHeader>
          <CardTitle>{doc.name}</CardTitle>
          <CardDescription>{doc.summary}</CardDescription>
        </CardHeader>
      </Card>

      {examples.map((example) => (
        <Card key={example.id}>
          <CardHeader>
            <CardTitle>{example.title}</CardTitle>
            <CardDescription>{example.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Flex direction="column" gap="sm">
              <Flex direction="row" justify="center">
                <Flex direction="column" gap="sm">
                  {example.preview}
                </Flex>
              </Flex>
              <CodeBlock code={example.code} />
            </Flex>
          </CardContent>
        </Card>
      ))}
    </Flex>
  );
}
