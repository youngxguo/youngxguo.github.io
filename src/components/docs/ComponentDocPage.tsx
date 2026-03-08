import { useMemo, useState } from 'react';
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
import { ComponentDocTemplate } from './ComponentDocTemplate';
import { getDocById, type ComponentDocId } from './docsData';

interface ComponentDocPageProps {
  componentId: ComponentDocId;
}

const buttonVariants = ['primary', 'secondary', 'ghost'] as const;
const buttonSizes = ['sm', 'md', 'lg'] as const;
const fieldSizes = ['sm', 'md', 'lg'] as const;
const switchSizes = ['sm', 'md'] as const;
const textareaRows = [3, 4, 6] as const;

export function ComponentDocPage({ componentId }: ComponentDocPageProps) {
  const doc = getDocById(componentId);

  if (!doc) {
    return null;
  }

  if (componentId === 'button') {
    return <ButtonDoc doc={doc} />;
  }

  if (componentId === 'input') {
    return <InputDoc doc={doc} />;
  }

  if (componentId === 'dialog') {
    return <DialogDoc doc={doc} />;
  }

  if (componentId === 'select') {
    return <SelectDoc doc={doc} />;
  }

  if (componentId === 'switch') {
    return <SwitchDoc doc={doc} />;
  }

  if (componentId === 'textarea') {
    return <TextareaDoc doc={doc} />;
  }

  return <ReferenceDoc doc={doc} />;
}

function ReferenceDoc({ doc }: { doc: NonNullable<ReturnType<typeof getDocById>> }) {
  const codeSample = useMemo(() => {
    const propLines = doc.props
      .slice(0, 3)
      .map((prop) => `  ${prop.name}={/* ${prop.type} */}`)
      .join('\n');

    return `import { ${doc.name} } from 'yxgui';

<${doc.name}
${propLines}
>
  {/* Compose ${doc.name} in your product surface */}
</${doc.name}>`;
  }, [doc]);

  return (
    <ComponentDocTemplate
      doc={doc}
      controls={
        <Flex direction="column" gap="xs">
          <Typography as="p" variant="small">
            Reference page
          </Typography>
          <Typography as="p">
            Deep playground controls for this component are still being expanded.
          </Typography>
        </Flex>
      }
      preview={
        <Flex direction="column" gap="sm">
          <Typography as="p">
            Use the API snapshot below as the source of truth for initial integration.
          </Typography>
          <Typography as="p" variant="small">
            Tip: start with production usage notes and wire the minimal props first.
          </Typography>
        </Flex>
      }
      codeSample={codeSample}
    />
  );
}

function ButtonDoc({ doc }: { doc: NonNullable<ReturnType<typeof getDocById>> }) {
  const [variant, setVariant] = useState<(typeof buttonVariants)[number]>('primary');
  const [size, setSize] = useState<(typeof buttonSizes)[number]>('md');
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState('Ship release');

  const codeSample = useMemo(
    () =>
      `<Button variant="${variant}" size="${size}"${disabled ? ' disabled' : ''}>\n  ${label || 'Ship release'}\n</Button>`,
    [variant, size, disabled, label]
  );

  return (
    <ComponentDocTemplate
      doc={doc}
      controls={
        <Flex direction="column" gap="md">
          <Flex direction="column" gap="xs">
            <Label htmlFor="button-variant">Variant</Label>
            <Select
              id="button-variant"
              value={variant}
              onChange={(event) =>
                setVariant(event.currentTarget.value as (typeof buttonVariants)[number])
              }
            >
              {buttonVariants.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="button-size">Size</Label>
            <Select
              id="button-size"
              value={size}
              onChange={(event) =>
                setSize(event.currentTarget.value as (typeof buttonSizes)[number])
              }
            >
              {buttonSizes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="button-label">Label</Label>
            <Input
              id="button-label"
              value={label}
              onChange={(event) => setLabel(event.currentTarget.value)}
            />
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="button-disabled">Disabled</Label>
            <Switch id="button-disabled" checked={disabled} onCheckedChange={setDisabled} />
          </Flex>
        </Flex>
      }
      preview={
        <Button variant={variant} size={size} disabled={disabled}>
          {label || 'Ship release'}
        </Button>
      }
      codeSample={codeSample}
    />
  );
}

function InputDoc({ doc }: { doc: NonNullable<ReturnType<typeof getDocById>> }) {
  const [size, setSize] = useState<(typeof fieldSizes)[number]>('md');
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState('');

  const codeSample = useMemo(() => {
    const invalidLine = invalid ? ' invalid' : '';
    const disabledLine = disabled ? ' disabled' : '';

    return `<Label htmlFor="email" required>
  Work email
</Label>
<Input id="email" size="${size}" placeholder="name@company.com"${invalidLine}${disabledLine} />`;
  }, [size, invalid, disabled]);

  return (
    <ComponentDocTemplate
      doc={doc}
      controls={
        <Flex direction="column" gap="md">
          <Flex direction="column" gap="xs">
            <Label htmlFor="input-size">Size</Label>
            <Select
              id="input-size"
              value={size}
              onChange={(event) =>
                setSize(event.currentTarget.value as (typeof fieldSizes)[number])
              }
            >
              {fieldSizes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="input-invalid">Invalid</Label>
            <Switch id="input-invalid" checked={invalid} onCheckedChange={setInvalid} />
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="input-disabled">Disabled</Label>
            <Switch id="input-disabled" checked={disabled} onCheckedChange={setDisabled} />
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="input-value">Value</Label>
            <Input
              id="input-value"
              size="sm"
              value={value}
              placeholder="Type preview value"
              onChange={(event) => setValue(event.currentTarget.value)}
            />
          </Flex>
        </Flex>
      }
      preview={
        <Flex direction="column" gap="sm">
          <Label htmlFor="doc-input" required>
            Work email
          </Label>
          <Input
            id="doc-input"
            size={size}
            value={value}
            placeholder="name@company.com"
            invalid={invalid ? true : undefined}
            disabled={disabled}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <Typography as="small" variant="small">
            Use your company domain for invitations.
          </Typography>
          {invalid ? (
            <Alert variant="error">
              <AlertTitle>Invalid email</AlertTitle>
              <AlertDescription>Enter a valid company email.</AlertDescription>
            </Alert>
          ) : null}
        </Flex>
      }
      codeSample={codeSample}
    />
  );
}

function DialogDoc({ doc }: { doc: NonNullable<ReturnType<typeof getDocById>> }) {
  const [open, setOpen] = useState(false);
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');

  const codeSample = useMemo(
    () => `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>Invite teammate</DialogTrigger>
  <DialogContent closeOnOverlayClick={${closeOnOverlayClick}}>
    <DialogTitle>Invite teammate</DialogTitle>
    <DialogDescription>
      Send a lightweight invite without leaving the current page.
    </DialogDescription>
    <Input placeholder="name@company.com" />
    <DialogFooter>
      <DialogClose variant="secondary">Cancel</DialogClose>
      <Button>Send invite</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    [closeOnOverlayClick]
  );

  return (
    <ComponentDocTemplate
      doc={doc}
      controls={
        <Flex direction="column" gap="md">
          <Flex direction="column" gap="xs">
            <Label htmlFor="dialog-overlay-close">Overlay click closes</Label>
            <Switch
              id="dialog-overlay-close"
              checked={closeOnOverlayClick}
              onCheckedChange={setCloseOnOverlayClick}
            />
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="invite-email">Invite email</Label>
            <Input
              id="invite-email"
              value={inviteEmail}
              placeholder="name@company.com"
              onChange={(event) => setInviteEmail(event.currentTarget.value)}
            />
          </Flex>
        </Flex>
      }
      preview={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>Invite teammate</DialogTrigger>
          <DialogContent closeOnOverlayClick={closeOnOverlayClick}>
            <DialogTitle>Invite teammate</DialogTitle>
            <DialogDescription>
              Send an invite without disrupting your current workflow.
            </DialogDescription>
            <Input
              value={inviteEmail}
              placeholder="name@company.com"
              onChange={(event) => setInviteEmail(event.currentTarget.value)}
            />
            <DialogFooter>
              <DialogClose variant="secondary">Cancel</DialogClose>
              <Button disabled={!inviteEmail.trim()} onClick={() => setOpen(false)}>
                Send invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
      codeSample={codeSample}
    />
  );
}

function SelectDoc({ doc }: { doc: NonNullable<ReturnType<typeof getDocById>> }) {
  const [size, setSize] = useState<(typeof fieldSizes)[number]>('md');
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState('engineering');

  const codeSample = useMemo(() => {
    const invalidLine = invalid ? ' invalid' : '';
    const disabledLine = disabled ? ' disabled' : '';

    return `<Label htmlFor="team">Team</Label>
<Select id="team" size="${size}"${invalidLine}${disabledLine}>
  <option value="">Select a team</option>
  <option value="engineering">Engineering</option>
  <option value="design">Design</option>
  <option value="product">Product</option>
</Select>`;
  }, [disabled, invalid, size]);

  return (
    <ComponentDocTemplate
      doc={doc}
      controls={
        <Flex direction="column" gap="md">
          <Flex direction="column" gap="xs">
            <Label htmlFor="select-size">Size</Label>
            <Select
              id="select-size"
              value={size}
              onChange={(event) =>
                setSize(event.currentTarget.value as (typeof fieldSizes)[number])
              }
            >
              {fieldSizes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="select-invalid">Invalid</Label>
            <Switch id="select-invalid" checked={invalid} onCheckedChange={setInvalid} />
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="select-disabled">Disabled</Label>
            <Switch id="select-disabled" checked={disabled} onCheckedChange={setDisabled} />
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="select-value">Selected value</Label>
            <Select
              id="select-value"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
            >
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="product">Product</option>
            </Select>
          </Flex>
        </Flex>
      }
      preview={
        <Flex direction="column" gap="sm">
          <Label htmlFor="doc-select">Team</Label>
          <Select
            id="doc-select"
            size={size}
            invalid={invalid ? true : undefined}
            disabled={disabled}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          >
            <option value="">Select a team</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="product">Product</option>
          </Select>
          <Typography as="small" variant="small">
            Selected value: {value || 'none'}
          </Typography>
          {invalid ? (
            <Alert variant="error">
              <AlertTitle>Choose a valid option</AlertTitle>
              <AlertDescription>Select a team before continuing.</AlertDescription>
            </Alert>
          ) : null}
        </Flex>
      }
      codeSample={codeSample}
    />
  );
}

function SwitchDoc({ doc }: { doc: NonNullable<ReturnType<typeof getDocById>> }) {
  const [size, setSize] = useState<(typeof switchSizes)[number]>('md');
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const codeSample = useMemo(
    () =>
      `<Switch size="${size}"${disabled ? ' disabled' : ''} checked={${checked}} onCheckedChange={setEnabled} />`,
    [checked, disabled, size]
  );

  return (
    <ComponentDocTemplate
      doc={doc}
      controls={
        <Flex direction="column" gap="md">
          <Flex direction="column" gap="xs">
            <Label htmlFor="switch-size">Size</Label>
            <Select
              id="switch-size"
              value={size}
              onChange={(event) =>
                setSize(event.currentTarget.value as (typeof switchSizes)[number])
              }
            >
              {switchSizes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="switch-checked">Checked</Label>
            <Switch id="switch-checked" checked={checked} onCheckedChange={setChecked} />
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="switch-disabled">Disabled</Label>
            <Switch id="switch-disabled" checked={disabled} onCheckedChange={setDisabled} />
          </Flex>
        </Flex>
      }
      preview={
        <Flex direction="column" gap="sm">
          <Flex direction="row" align="center" gap="sm">
            <Switch
              id="doc-switch"
              size={size}
              checked={checked}
              disabled={disabled}
              onCheckedChange={setChecked}
            />
            <Label htmlFor="doc-switch">Release notifications</Label>
          </Flex>
          <Typography as="small" variant="small">
            Notifications are {checked ? 'enabled' : 'disabled'}.
          </Typography>
        </Flex>
      }
      codeSample={codeSample}
    />
  );
}

function TextareaDoc({ doc }: { doc: NonNullable<ReturnType<typeof getDocById>> }) {
  const [size, setSize] = useState<(typeof fieldSizes)[number]>('md');
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rows, setRows] = useState<(typeof textareaRows)[number]>(4);
  const [value, setValue] = useState('Investigated profile route regressions and prepared a fix.');

  const codeSample = useMemo(() => {
    const invalidLine = invalid ? ' invalid' : '';
    const disabledLine = disabled ? ' disabled' : '';

    return `<Label htmlFor="notes">Release notes</Label>
<Textarea id="notes" size="${size}" rows={${rows}}${invalidLine}${disabledLine} />`;
  }, [disabled, invalid, rows, size]);

  return (
    <ComponentDocTemplate
      doc={doc}
      controls={
        <Flex direction="column" gap="md">
          <Flex direction="column" gap="xs">
            <Label htmlFor="textarea-size">Size</Label>
            <Select
              id="textarea-size"
              value={size}
              onChange={(event) =>
                setSize(event.currentTarget.value as (typeof fieldSizes)[number])
              }
            >
              {fieldSizes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="textarea-rows">Rows</Label>
            <Select
              id="textarea-rows"
              value={String(rows)}
              onChange={(event) =>
                setRows(Number(event.currentTarget.value) as (typeof textareaRows)[number])
              }
            >
              {textareaRows.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="textarea-invalid">Invalid</Label>
            <Switch id="textarea-invalid" checked={invalid} onCheckedChange={setInvalid} />
          </Flex>

          <Flex direction="column" gap="xs">
            <Label htmlFor="textarea-disabled">Disabled</Label>
            <Switch id="textarea-disabled" checked={disabled} onCheckedChange={setDisabled} />
          </Flex>
        </Flex>
      }
      preview={
        <Flex direction="column" gap="sm">
          <Label htmlFor="doc-textarea">Release notes</Label>
          <Textarea
            id="doc-textarea"
            size={size}
            rows={rows}
            value={value}
            invalid={invalid ? true : undefined}
            disabled={disabled}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <Typography as="small" variant="small">
            Character count: {value.length}
          </Typography>
          {invalid ? (
            <Alert variant="error">
              <AlertTitle>Notes are required</AlertTitle>
              <AlertDescription>Add context so reviewers can validate the change.</AlertDescription>
            </Alert>
          ) : null}
        </Flex>
      }
      codeSample={codeSample}
    />
  );
}
