import { ReactNode } from 'react';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Flex,
  Typography
} from 'yxgui';
import { CodeBlock } from './CodeBlock';
import { ComponentDoc } from './docsData';

interface ComponentDocTemplateProps {
  doc: ComponentDoc;
  controls: ReactNode;
  preview: ReactNode;
  codeSample: string;
}

export function ComponentDocTemplate({
  doc,
  controls,
  preview,
  codeSample
}: ComponentDocTemplateProps) {
  return (
    <Flex direction="column" gap="lg">
      <Card>
        <CardHeader>
          <Badge variant="success">{doc.status}</Badge>
          <CardTitle>{doc.name}</CardTitle>
          <CardDescription>{doc.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="column" gap="sm">
            <Typography as="p" variant="small">
              State model
            </Typography>
            <Typography as="p">{doc.stateModel}</Typography>
            <Flex direction="row" gap="xs" wrap="wrap">
              {doc.relatedComponents.map((componentName) => (
                <Badge key={componentName} variant="outline">
                  {componentName}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live playground</CardTitle>
          <CardDescription>Tweak the controls and verify behavior in context.</CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="row" align="start" wrap="wrap" gap="lg">
            <Flex direction="column" gap="md" style={{ flex: '0 0 16rem', minWidth: '15rem' }}>
              {controls}
            </Flex>
            <Flex direction="column" gap="sm" style={{ flex: '1 1 22rem', minWidth: '18rem' }}>
              {preview}
            </Flex>
          </Flex>
        </CardContent>
      </Card>

      <Flex direction="row" gap="md" wrap="wrap" align="stretch">
        <Flex style={{ flex: '1 1 16rem', minWidth: '15rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>When to use</CardTitle>
            </CardHeader>
            <CardContent>
              <Flex direction="column" gap="xs">
                {doc.whenToUse.map((item) => (
                  <Typography key={item} as="p">
                    • {item}
                  </Typography>
                ))}
              </Flex>
            </CardContent>
          </Card>
        </Flex>

        <Flex style={{ flex: '1 1 16rem', minWidth: '15rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>When not to use</CardTitle>
            </CardHeader>
            <CardContent>
              <Flex direction="column" gap="xs">
                {doc.whenNotToUse.map((item) => (
                  <Typography key={item} as="p">
                    • {item}
                  </Typography>
                ))}
              </Flex>
            </CardContent>
          </Card>
        </Flex>

        <Flex style={{ flex: '1 1 16rem', minWidth: '15rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>Accessibility notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Flex direction="column" gap="xs">
                {doc.accessibility.map((item) => (
                  <Typography key={item} as="p">
                    • {item}
                  </Typography>
                ))}
              </Flex>
            </CardContent>
          </Card>
        </Flex>
      </Flex>

      <Flex direction="row" gap="md" wrap="wrap" align="stretch">
        <Flex style={{ flex: '1 1 16rem', minWidth: '15rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>Composition patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <Flex direction="column" gap="xs">
                {doc.compositionPatterns.map((item) => (
                  <Typography key={item} as="p">
                    • {item}
                  </Typography>
                ))}
              </Flex>
            </CardContent>
          </Card>
        </Flex>

        <Flex style={{ flex: '1 1 16rem', minWidth: '15rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>Implementation checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <Flex direction="column" gap="xs">
                {doc.implementationChecklist.map((item) => (
                  <Typography key={item} as="p">
                    • {item}
                  </Typography>
                ))}
              </Flex>
            </CardContent>
          </Card>
        </Flex>

        <Flex style={{ flex: '1 1 16rem', minWidth: '15rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>Common pitfalls</CardTitle>
            </CardHeader>
            <CardContent>
              <Flex direction="column" gap="xs">
                {doc.commonPitfalls.map((item) => (
                  <Typography key={item} as="p">
                    • {item}
                  </Typography>
                ))}
              </Flex>
            </CardContent>
          </Card>
        </Flex>
      </Flex>

      <Card>
        <CardHeader>
          <CardTitle>API snapshot</CardTitle>
          <CardDescription>Core props used most often in product code.</CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="column" gap="md">
            {doc.props.map((prop) => (
              <Card key={prop.name}>
                <CardContent>
                  <Flex direction="column" gap="xs">
                    <Typography as="p" variant="small">
                      <code>{prop.name}</code>
                    </Typography>
                    <Typography as="p" variant="small">
                      Type: <code>{prop.type}</code>
                    </Typography>
                    <Typography as="p" variant="small">
                      Default: <code>{prop.defaultValue}</code>
                    </Typography>
                    <Typography as="p">{prop.description}</Typography>
                  </Flex>
                </CardContent>
              </Card>
            ))}
          </Flex>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={codeSample} />
        </CardContent>
      </Card>
    </Flex>
  );
}
