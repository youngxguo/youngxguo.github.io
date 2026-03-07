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
        <Card style={{ flex: '1 1 16rem', minWidth: '15rem' }}>
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

        <Card style={{ flex: '1 1 16rem', minWidth: '15rem' }}>
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

        <Card style={{ flex: '1 1 16rem', minWidth: '15rem' }}>
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
          <pre
            style={{
              margin: 0,
              padding: '0.875rem 1rem',
              borderRadius: '0.75rem',
              overflowX: 'auto',
              border: '1px solid rgba(15, 23, 42, 0.12)',
              background: 'rgba(15, 23, 42, 0.04)',
              color: '#0f172a',
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
              fontSize: '0.875rem',
              lineHeight: 1.55,
              whiteSpace: 'pre'
            }}
          >
            <code>{codeSample}</code>
          </pre>
        </CardContent>
      </Card>
    </Flex>
  );
}
