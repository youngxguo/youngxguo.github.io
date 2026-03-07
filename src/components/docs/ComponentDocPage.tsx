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

  return <DialogDoc doc={doc} />;
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
      <DialogClose variant="ghost">Cancel</DialogClose>
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
              <DialogClose variant="ghost">Cancel</DialogClose>
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
