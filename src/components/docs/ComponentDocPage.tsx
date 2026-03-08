import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Flex,
  Input,
  Label,
  Select,
  Switch,
  Textarea,
  Typography
} from 'yxgui';
import { ComponentDocTemplate, type ComponentStoryExample } from './ComponentDocTemplate';
import { getDocById, type ComponentDocId } from './docsData';
import { ComponentPreview } from './DocsHomePage';

interface ComponentDocPageProps {
  componentId: ComponentDocId;
  onNavigate: (path: string) => void;
}

type ComponentDocRecord = NonNullable<ReturnType<typeof getDocById>>;

interface ReferenceRepresentativeExample {
  title: string;
  description: string;
  code: string;
}

const referenceRepresentativeExamples: Partial<
  Record<ComponentDocId, ReferenceRepresentativeExample>
> = {
  accordion: {
    title: 'Representative pattern',
    description: 'Use multiple accordion items to group related sections.',
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from 'yxgui';

<Accordion type="single" collapsible defaultValue="account">
  <AccordionItem value="account">
    <AccordionTrigger>Account settings</AccordionTrigger>
    <AccordionContent>Profile and account preferences.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="security">
    <AccordionTrigger>Security</AccordionTrigger>
    <AccordionContent>Password and sign-in controls.</AccordionContent>
  </AccordionItem>
</Accordion>`
  },
  card: {
    title: 'Representative pattern',
    description: 'Use cards to combine title, description, and status content.',
    code: `import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'yxgui';

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Release checklist</CardTitle>
    <CardDescription>Ship quality updates with clear status.</CardDescription>
  </CardHeader>
  <CardContent>
    <Badge variant="success">Ready to deploy</Badge>
  </CardContent>
</Card>`
  },
  menubar: {
    title: 'Representative pattern',
    description: 'Add multiple menus for desktop-style command surfaces.',
    code: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from 'yxgui';

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Save</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Undo</MenubarItem>
      <MenubarItem>Redo</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`
  },
  pagination: {
    title: 'Representative pattern',
    description: 'Show adjacent pages with a clear active page indicator.',
    code: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from 'yxgui';

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`
  },
  tabs: {
    title: 'Representative pattern',
    description: 'Use tabs to organize multiple related views in one area.',
    code: `import { Tabs, TabsList, TabsPanel, TabsTrigger } from 'yxgui';

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsPanel value="overview">High-level status and summary metrics.</TabsPanel>
  <TabsPanel value="activity">Recent events and team updates.</TabsPanel>
  <TabsPanel value="settings">Configuration and access controls.</TabsPanel>
</Tabs>`
  },
  table: {
    title: 'Representative pattern',
    description: 'Use table for record sets with multiple aligned columns.',
    code: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'yxgui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Owner</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>API docs</TableCell>
      <TableCell>Platform</TableCell>
      <TableCell>Ready</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Marketing site</TableCell>
      <TableCell>Growth</TableCell>
      <TableCell>In review</TableCell>
    </TableRow>
  </TableBody>
</Table>`
  },
  'dropdown-menu': {
    title: 'Representative pattern',
    description: 'Use dropdown menus to group common row or page actions.',
    code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from 'yxgui';

<DropdownMenu>
  <DropdownMenuTrigger variant="secondary">Team actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem>Archive</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`
  },
  badge: {
    title: 'Representative pattern',
    description: 'Use status badges to quickly communicate item state.',
    code: `import { Badge, Flex } from 'yxgui';

<Flex direction="row" gap="xs" wrap="wrap">
  <Badge variant="success">Ready</Badge>
  <Badge variant="neutral">Needs review</Badge>
  <Badge variant="outline">Blocked</Badge>
</Flex>`
  },
  progress: {
    title: 'Representative pattern',
    description: 'Pair progress bars with context text for long-running tasks.',
    code: `import { Flex, Progress, Typography } from 'yxgui';

<Flex direction="column" gap="xs">
  <Typography as="p" variant="small">
    Uploading assets
  </Typography>
  <Progress value={82} />
</Flex>`
  }
};

export function ComponentDocPage({ componentId, onNavigate }: ComponentDocPageProps) {
  const doc = getDocById(componentId);

  if (!doc) {
    return null;
  }

  if (componentId === 'button') {
    return <ButtonDoc doc={doc} onNavigate={onNavigate} />;
  }

  if (componentId === 'input') {
    return <InputDoc doc={doc} onNavigate={onNavigate} />;
  }

  if (componentId === 'dialog') {
    return <DialogDoc doc={doc} onNavigate={onNavigate} />;
  }

  if (componentId === 'select') {
    return <SelectDoc doc={doc} onNavigate={onNavigate} />;
  }

  if (componentId === 'switch') {
    return <SwitchDoc doc={doc} onNavigate={onNavigate} />;
  }

  if (componentId === 'textarea') {
    return <TextareaDoc doc={doc} onNavigate={onNavigate} />;
  }

  return <ReferenceDoc doc={doc} onNavigate={onNavigate} />;
}

function ReferenceDoc({
  doc,
  onNavigate
}: {
  doc: ComponentDocRecord;
  onNavigate: (path: string) => void;
}) {
  const propLines = doc.props
    .slice(0, 2)
    .map((prop) => `  ${prop.name}={/* ${prop.type} */}`)
    .join('\n');

  const examples: ComponentStoryExample[] = [
    {
      id: 'basic-usage',
      title: 'Basic usage',
      description: 'Start with the smallest working setup.',
      code: `import { ${doc.name} } from 'yxgui';\n\n<${doc.name} />`,
      preview: <ComponentPreview componentId={doc.id} />
    },
    {
      id: 'common-props',
      title: 'Common props',
      description: 'Add props for state, variants, or behavior as your usage grows.',
      code: `import { ${doc.name} } from 'yxgui';\n\n<${doc.name}\n${propLines}\n/>`,
      preview: <ComponentPreview componentId={doc.id} />
    }
  ];

  const representativeExample = referenceRepresentativeExamples[doc.id];

  if (representativeExample) {
    examples.push({
      id: 'representative-pattern',
      ...representativeExample,
      preview: <ComponentPreview componentId={doc.id} variant="representative" />
    });
  }

  return <ComponentDocTemplate doc={doc} examples={examples} onNavigate={onNavigate} />;
}

function ButtonDoc({
  doc,
  onNavigate
}: {
  doc: ComponentDocRecord;
  onNavigate: (path: string) => void;
}) {
  const examples: ComponentStoryExample[] = [
    {
      id: 'primary-action',
      title: 'Primary action',
      description: 'Use a single primary button for the main action in a section.',
      code: `import { Button } from 'yxgui';\n\n<Button>Save changes</Button>`,
      preview: <Button>Save changes</Button>
    },
    {
      id: 'action-group',
      title: 'Action group',
      description: 'Pair one primary action with one lower-emphasis secondary action.',
      code: `import { Button, Flex } from 'yxgui';\n\n<Flex direction="row" gap="sm">\n  <Button variant="secondary">Cancel</Button>\n  <Button>Ship release</Button>\n</Flex>`,
      preview: (
        <Flex direction="row" gap="sm">
          <Button variant="secondary">Cancel</Button>
          <Button>Ship release</Button>
        </Flex>
      )
    }
  ];

  return <ComponentDocTemplate doc={doc} examples={examples} onNavigate={onNavigate} />;
}

function InputDoc({
  doc,
  onNavigate
}: {
  doc: ComponentDocRecord;
  onNavigate: (path: string) => void;
}) {
  const examples: ComponentStoryExample[] = [
    {
      id: 'basic',
      title: 'Labeled field',
      description: 'Keep labels explicit and place helper text directly below the input.',
      code: `import { Input, Label, Typography } from 'yxgui';\n\n<Label htmlFor="email" required>\n  Work email\n</Label>\n<Input id="email" placeholder="name@company.com" />\n<Typography as="small" variant="small">\n  We use this address for invites.\n</Typography>`,
      preview: (
        <Flex direction="column" gap="sm">
          <Label htmlFor="email-story" required>
            Work email
          </Label>
          <Input id="email-story" placeholder="name@company.com" />
          <Typography as="small" variant="small">
            We use this address for invites.
          </Typography>
        </Flex>
      )
    },
    {
      id: 'invalid',
      title: 'Invalid state',
      description: 'Show invalid styling and an inline alert when validation fails.',
      code: `import { Alert, AlertDescription, AlertTitle, Input, Label } from 'yxgui';\n\n<Label htmlFor="email">Work email</Label>\n<Input id="email" invalid placeholder="name@company.com" />\n<Alert variant="error">\n  <AlertTitle>Invalid email</AlertTitle>\n  <AlertDescription>Use your company email address.</AlertDescription>\n</Alert>`,
      preview: (
        <Flex direction="column" gap="sm">
          <Label htmlFor="invalid-email-story">Work email</Label>
          <Input id="invalid-email-story" invalid placeholder="name@company.com" />
          <Alert variant="error">
            <AlertTitle>Invalid email</AlertTitle>
            <AlertDescription>Use your company email address.</AlertDescription>
          </Alert>
        </Flex>
      )
    }
  ];

  return <ComponentDocTemplate doc={doc} examples={examples} onNavigate={onNavigate} />;
}

function DialogDoc({
  doc,
  onNavigate
}: {
  doc: ComponentDocRecord;
  onNavigate: (path: string) => void;
}) {
  const examples: ComponentStoryExample[] = [
    {
      id: 'basic-dialog',
      title: 'Basic dialog',
      description: 'Use dialog for short, focused tasks that need confirmation.',
      code: `import {\n  Button,\n  Dialog,\n  DialogClose,\n  DialogContent,\n  DialogDescription,\n  DialogFooter,\n  DialogTitle,\n  DialogTrigger,\n  Input\n} from 'yxgui';\n\n<Dialog>\n  <DialogTrigger>Invite teammate</DialogTrigger>\n  <DialogContent>\n    <DialogTitle>Invite teammate</DialogTitle>\n    <DialogDescription>\n      Send an invite without leaving this page.\n    </DialogDescription>\n    <Input placeholder="name@company.com" />\n    <DialogFooter>\n      <DialogClose variant="secondary">Cancel</DialogClose>\n      <Button>Send invite</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
      preview: (
        <Dialog>
          <DialogTrigger>Invite teammate</DialogTrigger>
          <DialogContent>
            <DialogTitle>Invite teammate</DialogTitle>
            <DialogDescription>Send an invite without leaving this page.</DialogDescription>
            <Input placeholder="name@company.com" />
            <DialogFooter>
              <DialogClose variant="secondary">Cancel</DialogClose>
              <Button>Send invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }
  ];

  return <ComponentDocTemplate doc={doc} examples={examples} onNavigate={onNavigate} />;
}

function SelectDoc({
  doc,
  onNavigate
}: {
  doc: ComponentDocRecord;
  onNavigate: (path: string) => void;
}) {
  const examples: ComponentStoryExample[] = [
    {
      id: 'default-select',
      title: 'Team picker',
      description: 'Use a select when users choose from a fixed list of options.',
      code: `import { Label, Select } from 'yxgui';\n\n<Label htmlFor="team">Team</Label>\n<Select id="team" defaultValue="engineering">\n  <option value="">Select a team</option>\n  <option value="engineering">Engineering</option>\n  <option value="design">Design</option>\n  <option value="product">Product</option>\n</Select>`,
      preview: (
        <Flex direction="column" gap="sm">
          <Label htmlFor="team-story">Team</Label>
          <Select id="team-story" defaultValue="engineering">
            <option value="">Select a team</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="product">Product</option>
          </Select>
        </Flex>
      )
    },
    {
      id: 'invalid-select',
      title: 'Validation feedback',
      description: 'Keep validation feedback close to the field so users can recover quickly.',
      code: `import { Alert, AlertDescription, AlertTitle, Label, Select } from 'yxgui';\n\n<Label htmlFor="team">Team</Label>\n<Select id="team" invalid defaultValue="">\n  <option value="">Select a team</option>\n  <option value="engineering">Engineering</option>\n  <option value="design">Design</option>\n  <option value="product">Product</option>\n</Select>\n<Alert variant="error">\n  <AlertTitle>Required field</AlertTitle>\n  <AlertDescription>Please choose a team.</AlertDescription>\n</Alert>`,
      preview: (
        <Flex direction="column" gap="sm">
          <Label htmlFor="invalid-team-story">Team</Label>
          <Select id="invalid-team-story" invalid defaultValue="">
            <option value="">Select a team</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="product">Product</option>
          </Select>
          <Alert variant="error">
            <AlertTitle>Required field</AlertTitle>
            <AlertDescription>Please choose a team.</AlertDescription>
          </Alert>
        </Flex>
      )
    }
  ];

  return <ComponentDocTemplate doc={doc} examples={examples} onNavigate={onNavigate} />;
}

function SwitchDoc({
  doc,
  onNavigate
}: {
  doc: ComponentDocRecord;
  onNavigate: (path: string) => void;
}) {
  const examples: ComponentStoryExample[] = [
    {
      id: 'default-switch',
      title: 'Labeled switch',
      description: 'Pair switches with labels so state and intent are always clear.',
      code: `import { Flex, Label, Switch } from 'yxgui';\n\n<Flex direction="row" align="center" gap="sm">\n  <Switch id="notifications" defaultChecked />\n  <Label htmlFor="notifications">Release notifications</Label>\n</Flex>`,
      preview: (
        <Flex direction="row" align="center" gap="sm">
          <Switch id="notifications-story" defaultChecked />
          <Label htmlFor="notifications-story">Release notifications</Label>
        </Flex>
      )
    },
    {
      id: 'disabled-switch',
      title: 'Disabled switch',
      description: 'Use disabled state when a setting cannot be changed in the current context.',
      code: `import { Flex, Label, Switch } from 'yxgui';\n\n<Flex direction="row" align="center" gap="sm">\n  <Switch id="audit-mode" checked disabled />\n  <Label htmlFor="audit-mode">Audit mode</Label>\n</Flex>`,
      preview: (
        <Flex direction="row" align="center" gap="sm">
          <Switch id="audit-mode-story" checked disabled />
          <Label htmlFor="audit-mode-story">Audit mode</Label>
        </Flex>
      )
    }
  ];

  return <ComponentDocTemplate doc={doc} examples={examples} onNavigate={onNavigate} />;
}

function TextareaDoc({
  doc,
  onNavigate
}: {
  doc: ComponentDocRecord;
  onNavigate: (path: string) => void;
}) {
  const examples: ComponentStoryExample[] = [
    {
      id: 'notes',
      title: 'Notes field',
      description: 'Use textarea for multi-line updates, descriptions, and comments.',
      code: `import { Label, Textarea } from 'yxgui';\n\n<Label htmlFor="notes">Release notes</Label>\n<Textarea\n  id="notes"\n  rows={4}\n  defaultValue="Investigated profile route regressions and prepared a fix."\n/>`,
      preview: (
        <Flex direction="column" gap="sm">
          <Label htmlFor="notes-story">Release notes</Label>
          <Textarea
            id="notes-story"
            rows={4}
            defaultValue="Investigated profile route regressions and prepared a fix."
          />
        </Flex>
      )
    },
    {
      id: 'invalid-notes',
      title: 'Required validation',
      description: 'When notes are required, pair invalid style with direct error messaging.',
      code: `import { Alert, AlertDescription, AlertTitle, Label, Textarea } from 'yxgui';\n\n<Label htmlFor="notes">Release notes</Label>\n<Textarea id="notes" rows={4} invalid />\n<Alert variant="error">\n  <AlertTitle>Notes are required</AlertTitle>\n  <AlertDescription>Add enough context for reviewers.</AlertDescription>\n</Alert>`,
      preview: (
        <Flex direction="column" gap="sm">
          <Label htmlFor="invalid-notes-story">Release notes</Label>
          <Textarea id="invalid-notes-story" rows={4} invalid />
          <Alert variant="error">
            <AlertTitle>Notes are required</AlertTitle>
            <AlertDescription>Add enough context for reviewers.</AlertDescription>
          </Alert>
        </Flex>
      )
    }
  ];

  return <ComponentDocTemplate doc={doc} examples={examples} onNavigate={onNavigate} />;
}
