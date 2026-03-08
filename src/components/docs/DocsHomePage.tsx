import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  Grid,
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldLabel,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Select,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  Typography,
  toast
} from 'yxgui';
import { siteConfig } from '../../siteConfig';
import { type ComponentDocId, docsComponents } from './docsData';

interface DocsHomePageProps {
  onNavigate: (path: string) => void;
}

export type ComponentPreviewVariant = 'default' | 'representative';

const comboboxOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'product', label: 'Product' }
] as const;

export function ComponentPreview({
  componentId,
  variant = 'default'
}: {
  componentId: ComponentDocId;
  variant?: ComponentPreviewVariant;
}) {
  switch (componentId) {
    case 'button':
      return <Button size="sm">Ship release</Button>;
    case 'input':
      return <Input size="sm" placeholder="name@company.com" />;
    case 'dialog':
      return (
        <Dialog>
          <DialogTrigger size="sm">Open dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Invite teammate</DialogTitle>
            <DialogDescription>Send a quick invite.</DialogDescription>
            <DialogFooter>
              <DialogClose variant="secondary">Cancel</DialogClose>
              <Button>Send</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    case 'select':
      return (
        <Select size="sm" defaultValue="engineering">
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
          <option value="product">Product</option>
        </Select>
      );
    case 'switch':
      return (
        <Flex direction="row" align="center" gap="xs">
          <Switch id="switch-preview" defaultChecked />
          <Label htmlFor="switch-preview">Enable alerts</Label>
        </Flex>
      );
    case 'textarea':
      return <Textarea rows={3} placeholder="Write your update..." />;
    case 'accordion':
      if (variant === 'representative') {
        return (
          <Accordion type="single" collapsible defaultValue="account">
            <AccordionItem value="account">
              <AccordionTrigger size="sm" variant="ghost">
                Account settings
              </AccordionTrigger>
              <AccordionContent>Profile, email, and account preferences.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger size="sm" variant="ghost">
                Security
              </AccordionTrigger>
              <AccordionContent>Password and sign-in controls.</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }

      return (
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger size="sm" variant="ghost">
              Account settings
            </AccordionTrigger>
            <AccordionContent>Configure your account defaults.</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case 'breadcrumb':
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    case 'card':
      if (variant === 'representative') {
        return (
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Release checklist</CardTitle>
              <CardDescription>Ship quality updates with clear status.</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="success">Ready to deploy</Badge>
            </CardContent>
          </Card>
        );
      }

      return (
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Reusable surface with structure.</CardDescription>
          </CardHeader>
        </Card>
      );
    case 'collapsible':
      return (
        <Collapsible>
          <CollapsibleTrigger size="sm" variant="secondary">
            Show details
          </CollapsibleTrigger>
          <CollapsibleContent>Additional implementation notes.</CollapsibleContent>
        </Collapsible>
      );
    case 'menubar':
      if (variant === 'representative') {
        return (
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
          </Menubar>
        );
      }

      return (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      );
    case 'pagination':
      if (variant === 'representative') {
        return (
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
          </Pagination>
        );
      }

      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    case 'separator':
      return (
        <Flex direction="column" gap="xs">
          <Typography as="p" variant="small">
            Top section
          </Typography>
          <Separator decorative />
          <Typography as="p" variant="small">
            Bottom section
          </Typography>
        </Flex>
      );
    case 'tabs':
      if (variant === 'representative') {
        return (
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsPanel value="overview">High-level status and summary metrics.</TabsPanel>
            <TabsPanel value="activity">Recent events and team updates.</TabsPanel>
            <TabsPanel value="settings">Configuration and access controls.</TabsPanel>
          </Tabs>
        );
      }

      return (
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsPanel value="account">Profile settings and preferences.</TabsPanel>
          <TabsPanel value="security">Password and sign-in options.</TabsPanel>
        </Tabs>
      );
    case 'table':
      if (variant === 'representative') {
        return (
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
          </Table>
        );
      }

      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>API docs</TableCell>
              <TableCell>Ready</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    case 'checkbox':
      return (
        <Flex direction="row" align="center" gap="xs">
          <Checkbox id="checkbox-preview" defaultChecked />
          <Label htmlFor="checkbox-preview">Receive updates</Label>
        </Flex>
      );
    case 'combobox':
      return (
        <Combobox options={comboboxOptions} defaultValue="engineering" placeholder="Pick a team" />
      );
    case 'form-field':
      return (
        <FormField id="email-preview" required>
          <FormFieldLabel>Work email</FormFieldLabel>
          <FormFieldControl>
            <Input placeholder="name@company.com" />
          </FormFieldControl>
          <FormFieldDescription>Used for teammate invites.</FormFieldDescription>
        </FormField>
      );
    case 'input-otp':
      return (
        <InputOTP length={4} defaultValue="12">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      );
    case 'label':
      return (
        <Flex direction="column" gap="xs">
          <Label htmlFor="label-preview">Project name</Label>
          <Input id="label-preview" value="yxgui docs" readOnly />
        </Flex>
      );
    case 'radio-group':
      return (
        <RadioGroup defaultValue="weekly">
          <Radio value="daily" label="Daily" />
          <Radio value="weekly" label="Weekly" />
        </RadioGroup>
      );
    case 'slider':
      return <Slider defaultValue={70} min={0} max={100} step={5} />;
    case 'toggle':
      return <Toggle defaultPressed>Bold</Toggle>;
    case 'toggle-group':
      return (
        <ToggleGroup type="multiple" defaultValue={['left']}>
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      );
    case 'alert-dialog':
      return (
        <AlertDialog>
          <AlertDialogTrigger size="sm" variant="secondary">
            Delete project
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete project?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction destructive>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    case 'context-menu':
      return (
        <ContextMenu>
          <ContextMenuTrigger>
            <Button variant="secondary" size="sm">
              Right click
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
    case 'drawer':
      return (
        <Drawer>
          <DrawerTrigger size="sm" variant="secondary">
            Open drawer
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer title</DrawerTitle>
              <DrawerDescription>Slide-over workflow.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose variant="secondary">Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    case 'dropdown-menu':
      if (variant === 'representative') {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger size="sm" variant="secondary">
              Team actions
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger size="sm" variant="secondary">
            Actions
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    case 'hover-card':
      return (
        <HoverCard>
          <HoverCardTrigger size="sm" variant="secondary">
            Hover card
          </HoverCardTrigger>
          <HoverCardContent>
            <Typography as="p" variant="small">
              Lightweight details on hover.
            </Typography>
          </HoverCardContent>
        </HoverCard>
      );
    case 'popover':
      return (
        <Popover>
          <PopoverTrigger size="sm" variant="secondary">
            Open popover
          </PopoverTrigger>
          <PopoverContent>
            <Typography as="p" variant="small">
              Quick contextual actions.
            </Typography>
          </PopoverContent>
        </Popover>
      );
    case 'sheet':
      return (
        <Sheet>
          <SheetTrigger size="sm" variant="secondary">
            Open sheet
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Sheet title</SheetTitle>
              <SheetDescription>Side panel for focused tasks.</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose variant="secondary">Close</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
    case 'tooltip':
      return (
        <Tooltip content="Helpful context">
          <Button size="sm" variant="secondary">
            Hover me
          </Button>
        </Tooltip>
      );
    case 'alert':
      return (
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Action completed successfully.</AlertDescription>
        </Alert>
      );
    case 'badge':
      if (variant === 'representative') {
        return (
          <Flex direction="row" gap="xs" wrap="wrap">
            <Badge variant="success">Ready</Badge>
            <Badge variant="neutral">Needs review</Badge>
            <Badge variant="outline">Blocked</Badge>
          </Flex>
        );
      }

      return (
        <Flex direction="row" gap="xs" wrap="wrap">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="outline">Outline</Badge>
        </Flex>
      );
    case 'progress':
      if (variant === 'representative') {
        return (
          <Flex direction="column" gap="xs">
            <Typography as="p" variant="small">
              Uploading assets
            </Typography>
            <Progress value={82} />
          </Flex>
        );
      }

      return <Progress value={64} />;
    case 'skeleton':
      return (
        <Flex direction="column" gap="xs">
          <Skeleton />
          <Skeleton />
        </Flex>
      );
    case 'toast':
      return (
        <Button size="sm" variant="secondary" onClick={() => toast.success('Saved')}>
          Show toast
        </Button>
      );
    case 'aspect-ratio':
      return (
        <AspectRatio ratio={16 / 9}>
          <Card variant="outlined">
            <CardContent>
              <Typography as="p" variant="small">
                16:9 media container
              </Typography>
            </CardContent>
          </Card>
        </AspectRatio>
      );
    case 'avatar':
      return <Avatar src={siteConfig.picture} alt={siteConfig.name} size="md" shape="circle" />;
    case 'carousel':
      return (
        <Carousel>
          <CarouselViewport>
            <CarouselContent>
              <CarouselItem>
                <Badge>Slide 1</Badge>
              </CarouselItem>
              <CarouselItem>
                <Badge>Slide 2</Badge>
              </CarouselItem>
            </CarouselContent>
          </CarouselViewport>
          <Flex direction="row" gap="xs">
            <CarouselPrevious size="sm" variant="secondary" />
            <CarouselNext size="sm" variant="secondary" />
          </Flex>
        </Carousel>
      );
    case 'flex':
      return (
        <Flex direction="row" gap="xs" wrap="wrap">
          <Badge>Row</Badge>
          <Badge>Gap</Badge>
          <Badge>Wrap</Badge>
        </Flex>
      );
    case 'scroll-area':
      return (
        <ScrollArea>
          <ScrollAreaViewport>
            <Flex direction="column" gap="xs">
              <Typography as="p" variant="small">
                Long content line 1
              </Typography>
              <Typography as="p" variant="small">
                Long content line 2
              </Typography>
              <Typography as="p" variant="small">
                Long content line 3
              </Typography>
            </Flex>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      );
    case 'typography':
      return (
        <Flex direction="column" gap="xs">
          <Typography as="h3">Typography</Typography>
          <Typography as="p" variant="small">
            Consistent text hierarchy and rhythm.
          </Typography>
        </Flex>
      );
    default:
      return (
        <Button size="sm" variant="secondary">
          Example
        </Button>
      );
  }
}

export function DocsHomePage({ onNavigate }: DocsHomePageProps) {
  const openComponentDocs = (componentId: ComponentDocId) => {
    onNavigate(`/docs/components/${componentId}`);
  };

  return (
    <Flex direction="column" gap="lg">
      <Toaster />

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Components</CardTitle>
          <CardDescription>
            Browse the component directory and jump into docs for each primitive.
          </CardDescription>
        </CardHeader>
      </Card>

      <Grid columns="repeat(3, minmax(0, 1fr))" gap="md">
        {docsComponents.map((component) => (
          <Card key={component.id} variant="outlined">
            <CardHeader>
              <Flex direction="row" align="center" justify="between" gap="sm" wrap="wrap">
                <CardTitle>{component.name}</CardTitle>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openComponentDocs(component.id)}
                >
                  Docs
                </Button>
              </Flex>
              <CardDescription>{component.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <ComponentPreview componentId={component.id} />
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Flex>
  );
}
