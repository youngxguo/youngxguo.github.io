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
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live playground</CardTitle>
          <CardDescription>Tweak the controls and verify behavior in context.</CardDescription>
        </CardHeader>
        <CardContent>
          <Flex direction="row" align="start" wrap="wrap" gap="md">
            <Card>
              <CardHeader>
                <CardTitle>Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <Flex direction="column" gap="md">
                  {controls}
                </Flex>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>{preview}</CardContent>
            </Card>
          </Flex>
        </CardContent>
      </Card>

      <Flex direction="column" gap="md">
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
