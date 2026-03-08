export type ComponentDocId =
  | 'accordion'
  | 'alert'
  | 'alert-dialog'
  | 'aspect-ratio'
  | 'avatar'
  | 'badge'
  | 'breadcrumb'
  | 'button'
  | 'card'
  | 'carousel'
  | 'checkbox'
  | 'collapsible'
  | 'combobox'
  | 'context-menu'
  | 'dialog'
  | 'drawer'
  | 'dropdown-menu'
  | 'flex'
  | 'form-field'
  | 'hover-card'
  | 'input'
  | 'input-otp'
  | 'label'
  | 'menubar'
  | 'pagination'
  | 'popover'
  | 'progress'
  | 'radio-group'
  | 'scroll-area'
  | 'select'
  | 'separator'
  | 'sheet'
  | 'skeleton'
  | 'slider'
  | 'switch'
  | 'table'
  | 'tabs'
  | 'textarea'
  | 'toast'
  | 'toggle'
  | 'toggle-group'
  | 'tooltip'
  | 'typography';

export interface ComponentPropRow {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface ComponentDoc {
  id: ComponentDocId;
  name: string;
  status: 'Production ready';
  summary: string;
  stateModel: string;
  whenToUse: string[];
  whenNotToUse: string[];
  accessibility: string[];
  compositionPatterns: string[];
  implementationChecklist: string[];
  commonPitfalls: string[];
  relatedComponents: string[];
  props: ComponentPropRow[];
}

export interface DocsConvention {
  id: string;
  title: string;
  detail: string;
  example: string;
}

export interface DocsCatalogGroup {
  title: string;
  summary: string;
  components: string[];
}

export const docsContext = {
  packageVersion: '0.0.4',
  exportedFamiliesCount: 43,
  docsLastUpdated: 'March 8, 2026'
} as const;

export const docsConventions: DocsConvention[] = [
  {
    id: 'native-props',
    title: 'Native prop passthrough',
    detail:
      'Most components forward native DOM props and events so product code can keep using standard browser semantics.',
    example: 'Input receives id, aria-*, data-*, onChange, onFocus, and standard form props.'
  },
  {
    id: 'ref-pattern',
    title: 'React 19 ref pattern',
    detail:
      'Component APIs follow the React 19 ref prop model, which keeps integration simple and predictable.',
    example: 'Consumers pass ref directly without wrapping usage in forwardRef helpers.'
  },
  {
    id: 'state-conventions',
    title: 'Controlled and uncontrolled pairs',
    detail:
      'Interactive primitives follow consistent naming for controlled and uncontrolled usage so behavior is easy to reason about.',
    example:
      'value/defaultValue/onValueChange, open/defaultOpen/onOpenChange, checked/defaultChecked/onCheckedChange.'
  },
  {
    id: 'style-layering',
    title: 'Style layering',
    detail:
      'className and style merge with component defaults so teams can tune layout without forking primitives.',
    example:
      'Apply className or style for local spacing while preserving token-based visual system.'
  }
];

export const docsCatalogGroups: DocsCatalogGroup[] = [
  {
    title: 'Layout + Navigation',
    summary: 'Structural and flow components for page scaffolding.',
    components: [
      'Accordion',
      'Breadcrumb',
      'Card',
      'Collapsible',
      'Menubar',
      'Pagination',
      'Separator',
      'Tabs',
      'Table'
    ]
  },
  {
    title: 'Forms + Input',
    summary: 'Authoring and validation surfaces for user data entry.',
    components: [
      'Button',
      'Checkbox',
      'Combobox',
      'FormField',
      'Input',
      'InputOTP',
      'Label',
      'RadioGroup',
      'Select',
      'Slider',
      'Switch',
      'Textarea',
      'Toggle',
      'ToggleGroup'
    ]
  },
  {
    title: 'Overlays + Menus',
    summary: 'Focused interactions that layer above the current context.',
    components: [
      'AlertDialog',
      'ContextMenu',
      'Dialog',
      'Drawer',
      'DropdownMenu',
      'HoverCard',
      'Popover',
      'Sheet',
      'Tooltip'
    ]
  },
  {
    title: 'Feedback + Status',
    summary: 'System and task feedback for transient and persistent state.',
    components: ['Alert', 'Badge', 'Progress', 'Skeleton', 'Toast']
  },
  {
    title: 'Media + Utility',
    summary: 'Visual primitives and utility wrappers used across features.',
    components: ['AspectRatio', 'Avatar', 'Carousel', 'Flex', 'ScrollArea', 'Typography']
  }
];

const coreDocs: ComponentDoc[] = [
  {
    id: 'button',
    name: 'Button',
    status: 'Production ready',
    summary: 'Primary action control with clear variants for hierarchy and emphasis.',
    stateModel:
      'Stateless trigger component. Product state should determine disabled, loading, and optimistic interaction behavior.',
    whenToUse: [
      'User needs to trigger an immediate action.',
      'You need clear hierarchy between primary and secondary actions.',
      'A section needs compact or large call-to-action sizing.'
    ],
    whenNotToUse: [
      'Navigation should be a link instead of an action.',
      'Action is destructive and needs confirmation first.',
      'You need a toggle state; prefer Toggle/Switch.'
    ],
    accessibility: [
      'Use concise action labels instead of nouns.',
      'Keep disabled usage rare and explain why when disabled.',
      'For icon-only actions, provide aria-label text.'
    ],
    compositionPatterns: [
      'Pair one primary action with one secondary action in footers or forms.',
      'Use ghost variant for low-emphasis row actions to preserve hierarchy.',
      'Keep labels verb-first so intent is unambiguous.'
    ],
    implementationChecklist: [
      'Set explicit type for form contexts (submit, reset, or button).',
      'Ensure async handlers are idempotent to avoid duplicate submissions.',
      'Expose deterministic loading/disabled affordances during network calls.'
    ],
    commonPitfalls: [
      'Using buttons for route navigation where links are semantically correct.',
      'Rendering multiple primary actions inside the same decision block.',
      'Hiding actionable text behind icon-only controls without accessible labels.'
    ],
    relatedComponents: ['Toggle', 'AlertDialog', 'DropdownMenu', 'Tooltip'],
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'ghost'",
        defaultValue: "'primary'",
        description: 'Visual emphasis of the action.'
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: 'Control height and horizontal padding.'
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Blocks interaction when true.'
      }
    ]
  },
  {
    id: 'input',
    name: 'Input',
    status: 'Production ready',
    summary: 'Single-line text field for short freeform values and query entry.',
    stateModel:
      'Can be controlled or uncontrolled. Use controlled mode when validation, dirty tracking, or cross-field logic is required.',
    whenToUse: [
      'You need an editable single-line value.',
      'The field has clear label and validation requirements.',
      'The input belongs to a form with consistent spacing.'
    ],
    whenNotToUse: [
      'The content spans multiple lines; use Textarea.',
      'The user should choose from fixed options; use Select or RadioGroup.',
      'The field is read-only metadata and not editable.'
    ],
    accessibility: [
      'Always pair with a visible label.',
      'Surface invalid state with aria-invalid and a useful error message.',
      'Use autocomplete attributes for common field types.'
    ],
    compositionPatterns: [
      'Compose label, hint text, and error state as one form field block.',
      'Use size variants consistently at the form level to avoid visual jitter.',
      'Pair with Select/Combobox only when a freeform fallback is truly needed.'
    ],
    implementationChecklist: [
      'Provide stable id/name pairs so forms serialize predictably.',
      'Wire autocomplete and inputMode for common field types.',
      'Reflect validation state in both visuals and assistive copy.'
    ],
    commonPitfalls: [
      'Using placeholder text as the only field label.',
      'Treating invalid visual state as validation without inline error copy.',
      'Mixing controlled and uncontrolled props in the same field instance.'
    ],
    relatedComponents: ['FormField', 'Textarea', 'Select', 'Combobox'],
    props: [
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: 'Adjusts touch target and visual density.'
      },
      {
        name: 'invalid',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies invalid styling and error semantics.'
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Disables focus and user input.'
      }
    ]
  },
  {
    id: 'dialog',
    name: 'Dialog',
    status: 'Production ready',
    summary: 'Modal layer for focused tasks that should temporarily block context.',
    stateModel:
      'Supports both controlled and uncontrolled open state. Favor controlled mode when close behavior depends on async side effects.',
    whenToUse: [
      'A user needs to complete a short, focused task.',
      'You need explicit confirmation before committing.',
      'The workflow should not navigate away from current page.'
    ],
    whenNotToUse: [
      'The content is long and browseable; use a dedicated page.',
      'The action is low risk and can happen inline.',
      'You only need hint text; use Tooltip or Popover.'
    ],
    accessibility: [
      'Keep a single clear title and description.',
      'Ensure there is always a visible close path.',
      'Avoid stacking multiple dialogs on top of each other.'
    ],
    compositionPatterns: [
      'Keep dialog tasks short with a single responsibility per modal.',
      'Use footer actions for cancel and commit to align with user expectations.',
      'Preserve parent-page context by returning focus to the trigger on close.'
    ],
    implementationChecklist: [
      'Guard destructive paths with explicit confirmation affordances.',
      'Prevent accidental closes when user input would be lost.',
      'Handle submit success/failure before toggling open state.'
    ],
    commonPitfalls: [
      'Embedding long-form content that should live on a dedicated page.',
      'Opening nested dialogs that compete for focus trapping.',
      'Closing immediately after submit without presenting failure state.'
    ],
    relatedComponents: ['AlertDialog', 'Drawer', 'Sheet', 'Popover'],
    props: [
      {
        name: 'open',
        type: 'boolean',
        defaultValue: 'uncontrolled',
        description: 'Controlled open state.'
      },
      {
        name: 'defaultOpen',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Initial open state for uncontrolled usage.'
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        defaultValue: 'undefined',
        description: 'Receives open state updates.'
      }
    ]
  },
  {
    id: 'select',
    name: 'Select',
    status: 'Production ready',
    summary: 'Single-choice dropdown for compact option sets with predictable defaults.',
    stateModel:
      'Supports controlled or uncontrolled value management using native select semantics and form behavior.',
    whenToUse: [
      'Users need to choose one option from a short, known list.',
      'Form state should serialize cleanly with native browser behavior.',
      'You need a compact control that supports keyboard navigation.'
    ],
    whenNotToUse: [
      'Option sets are long or need async search; prefer Combobox.',
      'Users can pick multiple values; use Checkbox or a multi-select pattern.',
      'The choice requires rich media previews in each row.'
    ],
    accessibility: [
      'Always pair with a visible label and associate via htmlFor/id.',
      'Use invalid state with clear error copy when validation fails.',
      'Keep option labels concise and avoid duplicate wording.'
    ],
    compositionPatterns: [
      'Use a placeholder-like first option when no default is selected.',
      'Keep option ordering stable so repeated flows build muscle memory.',
      'Group related form controls with consistent field spacing.'
    ],
    implementationChecklist: [
      'Provide stable value strings that map directly to backend enums.',
      'Set a defaultValue intentionally to avoid ambiguous empty submissions.',
      'Reflect disabled and invalid states in both UI and assistive text.'
    ],
    commonPitfalls: [
      'Encoding business logic in display labels instead of stable values.',
      'Using Select for very large datasets where scrolling becomes tedious.',
      'Leaving no explicit option for an unselected state when one is needed.'
    ],
    relatedComponents: ['Input', 'RadioGroup', 'Combobox', 'FormField'],
    props: [
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: 'Adjusts control height and spacing density.'
      },
      {
        name: 'invalid',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies invalid styling and aria-invalid semantics.'
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Prevents user interaction and focus.'
      }
    ]
  },
  {
    id: 'switch',
    name: 'Switch',
    status: 'Production ready',
    summary: 'Binary toggle for immediate on/off state changes.',
    stateModel:
      'Supports controlled or uncontrolled checked state. Use controlled mode when toggles sync with remote settings.',
    whenToUse: [
      'A setting should change immediately without secondary confirmation.',
      'Users need a compact on/off control in settings surfaces.',
      'The state can be expressed as a boolean.'
    ],
    whenNotToUse: [
      'Users must explicitly submit a form before changes apply.',
      'There are more than two mutually exclusive options.',
      'The action is destructive and requires confirmation.'
    ],
    accessibility: [
      'Pair with visible text that describes the current setting clearly.',
      'Do not rely on color alone to convey checked state.',
      'Ensure disabled toggles have contextual explanation when possible.'
    ],
    compositionPatterns: [
      'Render label and helper text beside the switch in settings rows.',
      'Use one toggle per setting to avoid ambiguous grouped actions.',
      'Keep size consistent within a section for scannability.'
    ],
    implementationChecklist: [
      'Choose controlled mode when state may be reverted on API failure.',
      'Debounce or guard rapid toggles when requests are expensive.',
      'Expose meaningful labels for analytics and accessibility.'
    ],
    commonPitfalls: [
      'Using switches for actions that should be buttons.',
      'Hiding what “on” means when context is not obvious.',
      'Persisting optimistic state without handling request failure.'
    ],
    relatedComponents: ['Checkbox', 'Button', 'Label', 'Alert'],
    props: [
      {
        name: 'checked',
        type: 'boolean',
        defaultValue: 'uncontrolled',
        description: 'Controlled checked state.'
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Initial checked state for uncontrolled usage.'
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        defaultValue: 'undefined',
        description: 'Callback fired when checked state changes.'
      },
      {
        name: 'size',
        type: "'sm' | 'md'",
        defaultValue: "'md'",
        description: 'Adjusts switch track and thumb dimensions.'
      }
    ]
  },
  {
    id: 'textarea',
    name: 'Textarea',
    status: 'Production ready',
    summary: 'Multi-line text input for notes, feedback, and longer freeform responses.',
    stateModel:
      'Supports controlled and uncontrolled value usage; controlled mode is preferred when showing live counters or validation feedback.',
    whenToUse: [
      'Users need to enter multi-line content.',
      'Input length and structure are flexible rather than fixed format.',
      'Forms require contextual notes or descriptions.'
    ],
    whenNotToUse: [
      'Expected input is a short single-line value; use Input.',
      'Users should pick from predefined options; use Select or RadioGroup.',
      'Rich text formatting is required; use a dedicated editor.'
    ],
    accessibility: [
      'Provide a persistent label and optional helper text.',
      'Expose validation errors with clear actionable guidance.',
      'Set meaningful rows defaults for expected content size.'
    ],
    compositionPatterns: [
      'Pair with helper copy that describes expected detail level.',
      'Show counters or limits only when they affect submission rules.',
      'Place errors directly below the field to reduce scanning.'
    ],
    implementationChecklist: [
      'Set rows intentionally based on expected content depth.',
      'Preserve line breaks when persisting values to backend services.',
      'Validate both minimum and maximum length where needed.'
    ],
    commonPitfalls: [
      'Using Textarea for structured data that should be split fields.',
      'Applying aggressive autosave without draft conflict handling.',
      'Failing to preserve whitespace or newlines in submissions.'
    ],
    relatedComponents: ['Input', 'FormField', 'Alert', 'Button'],
    props: [
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: 'Adjusts typography, padding, and vertical density.'
      },
      {
        name: 'invalid',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Applies invalid styling and aria-invalid semantics.'
      },
      {
        name: 'rows',
        type: 'number',
        defaultValue: '4',
        description: 'Sets the visible text area height in row units.'
      }
    ]
  }
];

type ReferenceDocCategory = 'layout' | 'forms' | 'overlay' | 'feedback' | 'media';

interface ReferenceDocSeed {
  id: ComponentDocId;
  name: string;
  summary: string;
  category: ReferenceDocCategory;
  relatedComponents: string[];
}

const referenceCategoryContent: Record<
  ReferenceDocCategory,
  Omit<ComponentDoc, 'id' | 'name' | 'status' | 'summary' | 'relatedComponents' | 'props'>
> = {
  layout: {
    stateModel:
      'Mostly composition-first primitives with optional controlled state for expanded or active child sections.',
    whenToUse: [
      'You need predictable page structure and navigation flow.',
      'A surface should scale from mobile to desktop layouts.',
      'Multiple related items must be grouped consistently.'
    ],
    whenNotToUse: [
      'A simple one-off wrapper would add less complexity.',
      'Interaction state belongs in a dedicated form or overlay primitive.',
      'You need high-density data editing instead of structure.'
    ],
    accessibility: [
      'Preserve heading hierarchy and landmark structure.',
      'Keep keyboard order aligned with visual order.',
      'Announce active or expanded state where relevant.'
    ],
    compositionPatterns: [
      'Compose layout primitives first, then fill with feature content.',
      'Prefer consistent spacing tokens across siblings.',
      'Keep interactive controls inside clearly bounded regions.'
    ],
    implementationChecklist: [
      'Verify responsive behavior at narrow and wide breakpoints.',
      'Ensure child content can wrap without clipping.',
      'Keep semantic HTML structure intact when styling.'
    ],
    commonPitfalls: [
      'Over-nesting wrappers without improving semantics.',
      'Mixing competing spacing strategies in the same section.',
      'Using structural components as generic style hacks.'
    ]
  },
  forms: {
    stateModel:
      'Supports controlled and uncontrolled usage patterns with predictable value and validation semantics.',
    whenToUse: [
      'Users need to input or adjust structured values.',
      'You need form semantics that serialize cleanly.',
      'Validation and error states are part of the flow.'
    ],
    whenNotToUse: [
      'Read-only status needs display-only components.',
      'A single destructive action should use a confirmation pattern.',
      'The interaction does not involve user-entered data.'
    ],
    accessibility: [
      'Pair controls with visible labels and clear helper text.',
      'Expose invalid states with actionable messaging.',
      'Keep keyboard and focus behavior predictable.'
    ],
    compositionPatterns: [
      'Group related fields into consistent field blocks.',
      'Use helper copy and errors directly adjacent to controls.',
      'Choose one primary input pattern per question.'
    ],
    implementationChecklist: [
      'Define controlled vs uncontrolled ownership per field.',
      'Map field values to stable backend schema values.',
      'Handle disabled and invalid states explicitly.'
    ],
    commonPitfalls: [
      'Using placeholders as the only field label.',
      'Combining too many interaction patterns in one control.',
      'Submitting ambiguous empty values without defaults.'
    ]
  },
  overlay: {
    stateModel:
      'Open-state driven primitives that can be controlled for deterministic workflow behavior.',
    whenToUse: [
      'Content must layer above current context temporarily.',
      'You need focused interactions without navigation.',
      'A trigger should reveal secondary actions or details.'
    ],
    whenNotToUse: [
      'Information should be always visible inline.',
      'Workflows are long enough to deserve dedicated routes.',
      'Multiple simultaneous overlays are required.'
    ],
    accessibility: [
      'Maintain focus management for open and close transitions.',
      'Provide clear dismissal paths and escape handling.',
      'Use meaningful labels for trigger and content regions.'
    ],
    compositionPatterns: [
      'Keep overlay copy concise and action-oriented.',
      'Use one primary intent per overlay container.',
      'Return focus to the initiating control after close.'
    ],
    implementationChecklist: [
      'Choose controlled mode when async side effects are involved.',
      'Prevent accidental dismissal when data loss is possible.',
      'Test keyboard interaction and screen-reader announcements.'
    ],
    commonPitfalls: [
      'Stacking overlays with competing focus traps.',
      'Opening transient surfaces for critical destructive work.',
      'Hiding critical actions behind hover-only affordances.'
    ]
  },
  feedback: {
    stateModel: 'Visual status primitives that reflect asynchronous progress, state, and outcomes.',
    whenToUse: [
      'Users need immediate status or system feedback.',
      'You want to acknowledge success, warning, or failure states.',
      'A task needs visible loading or completion progress.'
    ],
    whenNotToUse: [
      'The message duplicates obvious UI state.',
      'Persistent information should be in static content instead.',
      'You need actionable form inputs rather than status output.'
    ],
    accessibility: [
      'Ensure message semantics are announced appropriately.',
      'Do not rely on color alone for status meaning.',
      'Keep status copy short and specific.'
    ],
    compositionPatterns: [
      'Pair transient status with a durable source of truth.',
      'Use severity levels consistently across the product.',
      'Keep feedback near the action that triggered it.'
    ],
    implementationChecklist: [
      'Define when feedback auto-dismisses vs persists.',
      'Map backend state transitions to visible statuses.',
      'Add test coverage for loading and error paths.'
    ],
    commonPitfalls: [
      'Flooding users with repetitive transient notifications.',
      'Using ambiguous labels for critical failures.',
      'Displaying stale status after retry or recovery.'
    ]
  },
  media: {
    stateModel:
      'Display and utility primitives focused on composition, alignment, and visual consistency.',
    whenToUse: [
      'You need reusable visual wrappers across pages.',
      'Media or text content requires consistent presentation.',
      'Layout utilities should reduce repetitive CSS.'
    ],
    whenNotToUse: [
      'A one-off presentation can stay local to a page.',
      'Interaction semantics are more important than styling.',
      'A specialized chart/editor library is required.'
    ],
    accessibility: [
      'Provide alt text and labels for meaningful media.',
      'Keep typography hierarchy readable and consistent.',
      'Ensure utility wrappers do not hide semantic elements.'
    ],
    compositionPatterns: [
      'Combine utilities to express layout intent directly in JSX.',
      'Keep media dimensions predictable across responsive breakpoints.',
      'Use typography variants to encode content hierarchy.'
    ],
    implementationChecklist: [
      'Verify behavior with long and short content values.',
      'Respect aspect ratio and overflow constraints.',
      'Confirm utility wrappers do not block native semantics.'
    ],
    commonPitfalls: [
      'Treating utility components as global style overrides.',
      'Shipping media without meaningful text alternatives.',
      'Inconsistent typography scale between related sections.'
    ]
  }
};

const referenceCategoryProps: Record<ReferenceDocCategory, ComponentPropRow[]> = {
  layout: [
    {
      name: 'children',
      type: 'ReactNode',
      defaultValue: 'undefined',
      description: 'Rendered content inside the structural container.'
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Applies additional layout-specific styling hooks.'
    },
    {
      name: 'style',
      type: 'CSSProperties',
      defaultValue: 'undefined',
      description: 'Inline style overrides for local layout adjustments.'
    }
  ],
  forms: [
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Prevents interaction when the control should be inactive.'
    },
    {
      name: 'defaultValue',
      type: 'string | number | boolean',
      defaultValue: 'varies',
      description: 'Initial value for uncontrolled form usage.'
    },
    {
      name: 'onChange',
      type: '(event) => void',
      defaultValue: 'undefined',
      description: 'Receives value updates during user interaction.'
    }
  ],
  overlay: [
    {
      name: 'open',
      type: 'boolean',
      defaultValue: 'uncontrolled',
      description: 'Controlled visibility state.'
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Initial visibility in uncontrolled usage.'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      defaultValue: 'undefined',
      description: 'Fires when overlay visibility changes.'
    }
  ],
  feedback: [
    {
      name: 'variant',
      type: 'string',
      defaultValue: 'default',
      description: 'Selects status style and emphasis.'
    },
    {
      name: 'children',
      type: 'ReactNode',
      defaultValue: 'undefined',
      description: 'Message or indicator content.'
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Optional style customization hook.'
    }
  ],
  media: [
    {
      name: 'children',
      type: 'ReactNode',
      defaultValue: 'undefined',
      description: 'Primary visual or textual content.'
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Adds local presentation overrides.'
    },
    {
      name: 'style',
      type: 'CSSProperties',
      defaultValue: 'undefined',
      description: 'Inline visual tuning for one-off use cases.'
    }
  ]
};

function buildReferenceDoc(seed: ReferenceDocSeed): ComponentDoc {
  const content = referenceCategoryContent[seed.category];

  return {
    id: seed.id,
    name: seed.name,
    status: 'Production ready',
    summary: seed.summary,
    stateModel: content.stateModel,
    whenToUse: content.whenToUse,
    whenNotToUse: content.whenNotToUse,
    accessibility: content.accessibility,
    compositionPatterns: content.compositionPatterns,
    implementationChecklist: content.implementationChecklist,
    commonPitfalls: content.commonPitfalls,
    relatedComponents: seed.relatedComponents,
    props: referenceCategoryProps[seed.category]
  };
}

const referenceDocSeeds: ReferenceDocSeed[] = [
  {
    id: 'accordion',
    name: 'Accordion',
    summary: 'Progressively reveals sections while keeping page density manageable.',
    category: 'layout',
    relatedComponents: ['Collapsible', 'Tabs', 'Card']
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    summary: 'Shows hierarchical location and supports efficient backtracking.',
    category: 'layout',
    relatedComponents: ['Pagination', 'Tabs', 'Typography']
  },
  {
    id: 'card',
    name: 'Card',
    summary: 'Groups related content and actions into clear, bounded surfaces.',
    category: 'layout',
    relatedComponents: ['Typography', 'Button', 'Badge']
  },
  {
    id: 'collapsible',
    name: 'Collapsible',
    summary: 'Toggles supplemental content inline without full page transitions.',
    category: 'layout',
    relatedComponents: ['Accordion', 'Button', 'Separator']
  },
  {
    id: 'menubar',
    name: 'Menubar',
    summary: 'Desktop-style command access for dense productivity interfaces.',
    category: 'layout',
    relatedComponents: ['DropdownMenu', 'ContextMenu', 'Tooltip']
  },
  {
    id: 'pagination',
    name: 'Pagination',
    summary: 'Navigates large datasets through explicit page segments.',
    category: 'layout',
    relatedComponents: ['Table', 'Button', 'Input']
  },
  {
    id: 'separator',
    name: 'Separator',
    summary: 'Visually divides related content blocks for better scanning.',
    category: 'layout',
    relatedComponents: ['Card', 'Typography', 'Flex']
  },
  {
    id: 'tabs',
    name: 'Tabs',
    summary: 'Switches between closely related views within one context.',
    category: 'layout',
    relatedComponents: ['Accordion', 'Card', 'Typography']
  },
  {
    id: 'table',
    name: 'Table',
    summary: 'Displays structured records with predictable column alignment.',
    category: 'layout',
    relatedComponents: ['Pagination', 'Badge', 'Button']
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    summary: 'Captures independent on/off choices, including multi-select groups.',
    category: 'forms',
    relatedComponents: ['Label', 'Switch', 'FormField']
  },
  {
    id: 'combobox',
    name: 'Combobox',
    summary: 'Blends freeform search with constrained option selection.',
    category: 'forms',
    relatedComponents: ['Input', 'Select', 'Popover']
  },
  {
    id: 'form-field',
    name: 'FormField',
    summary: 'Packages labels, hints, and validation states into one field row.',
    category: 'forms',
    relatedComponents: ['Input', 'Select', 'Textarea']
  },
  {
    id: 'input-otp',
    name: 'InputOTP',
    summary: 'Collects short one-time verification codes with guided focus behavior.',
    category: 'forms',
    relatedComponents: ['Input', 'Button', 'Alert']
  },
  {
    id: 'label',
    name: 'Label',
    summary: 'Provides persistent field context for accessible form controls.',
    category: 'forms',
    relatedComponents: ['Input', 'Textarea', 'Select']
  },
  {
    id: 'radio-group',
    name: 'RadioGroup',
    summary: 'Represents mutually exclusive options in a visible set.',
    category: 'forms',
    relatedComponents: ['Select', 'Label', 'FormField']
  },
  {
    id: 'slider',
    name: 'Slider',
    summary: 'Adjusts numeric ranges through direct manipulation.',
    category: 'forms',
    relatedComponents: ['Input', 'Label', 'Progress']
  },
  {
    id: 'toggle',
    name: 'Toggle',
    summary: 'Switches visual mode or formatting state for a single action.',
    category: 'forms',
    relatedComponents: ['ToggleGroup', 'Button', 'Tooltip']
  },
  {
    id: 'toggle-group',
    name: 'ToggleGroup',
    summary: 'Coordinates related toggles as single or multiple selection sets.',
    category: 'forms',
    relatedComponents: ['Toggle', 'RadioGroup', 'Button']
  },
  {
    id: 'alert-dialog',
    name: 'AlertDialog',
    summary: 'Confirms high-impact actions before irreversible outcomes.',
    category: 'overlay',
    relatedComponents: ['Dialog', 'Button', 'Alert']
  },
  {
    id: 'context-menu',
    name: 'ContextMenu',
    summary: 'Presents object-specific actions near the current pointer target.',
    category: 'overlay',
    relatedComponents: ['DropdownMenu', 'Menubar', 'Tooltip']
  },
  {
    id: 'drawer',
    name: 'Drawer',
    summary: 'Slides in side-panel workflows while preserving page context.',
    category: 'overlay',
    relatedComponents: ['Dialog', 'Sheet', 'Button']
  },
  {
    id: 'dropdown-menu',
    name: 'DropdownMenu',
    summary: 'Exposes compact action lists from a trigger button.',
    category: 'overlay',
    relatedComponents: ['ContextMenu', 'Menubar', 'Button']
  },
  {
    id: 'hover-card',
    name: 'HoverCard',
    summary: 'Shows lightweight preview details on pointer hover.',
    category: 'overlay',
    relatedComponents: ['Tooltip', 'Popover', 'Card']
  },
  {
    id: 'popover',
    name: 'Popover',
    summary: 'Anchors contextual content to a trigger without full modal behavior.',
    category: 'overlay',
    relatedComponents: ['Tooltip', 'Dialog', 'DropdownMenu']
  },
  {
    id: 'sheet',
    name: 'Sheet',
    summary: 'Hosts secondary tasks in an edge-aligned overlay panel.',
    category: 'overlay',
    relatedComponents: ['Drawer', 'Dialog', 'FormField']
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    summary: 'Provides terse hints for controls and icon-only actions.',
    category: 'overlay',
    relatedComponents: ['HoverCard', 'Button', 'Label']
  },
  {
    id: 'alert',
    name: 'Alert',
    summary: 'Communicates inline informational, warning, and error states.',
    category: 'feedback',
    relatedComponents: ['Toast', 'Badge', 'Button']
  },
  {
    id: 'badge',
    name: 'Badge',
    summary: 'Displays compact metadata such as status, counts, or tags.',
    category: 'feedback',
    relatedComponents: ['Card', 'Alert', 'Typography']
  },
  {
    id: 'progress',
    name: 'Progress',
    summary: 'Visualizes task completion over time for long-running operations.',
    category: 'feedback',
    relatedComponents: ['Skeleton', 'Alert', 'Typography']
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    summary: 'Indicates pending content shape while real data loads.',
    category: 'feedback',
    relatedComponents: ['Progress', 'Card', 'Avatar']
  },
  {
    id: 'toast',
    name: 'Toast',
    summary: 'Delivers transient notifications without blocking the current task.',
    category: 'feedback',
    relatedComponents: ['Alert', 'Badge', 'Button']
  },
  {
    id: 'aspect-ratio',
    name: 'AspectRatio',
    summary: 'Maintains stable media dimensions across responsive layouts.',
    category: 'media',
    relatedComponents: ['Avatar', 'Carousel', 'Card']
  },
  {
    id: 'avatar',
    name: 'Avatar',
    summary: 'Represents people or entities with image and fallback content.',
    category: 'media',
    relatedComponents: ['Badge', 'Card', 'Tooltip']
  },
  {
    id: 'carousel',
    name: 'Carousel',
    summary: 'Presents sequential media or content slides with clear navigation.',
    category: 'media',
    relatedComponents: ['AspectRatio', 'Card', 'Button']
  },
  {
    id: 'flex',
    name: 'Flex',
    summary: 'Low-friction layout utility for common alignment and spacing patterns.',
    category: 'media',
    relatedComponents: ['Card', 'Separator', 'Typography']
  },
  {
    id: 'scroll-area',
    name: 'ScrollArea',
    summary: 'Contains overflow content with stable scroll affordances.',
    category: 'media',
    relatedComponents: ['Table', 'Card', 'Typography']
  },
  {
    id: 'typography',
    name: 'Typography',
    summary: 'Applies consistent text rhythm and semantic hierarchy across pages.',
    category: 'media',
    relatedComponents: ['Card', 'Label', 'Badge']
  }
];

const referenceDocs = referenceDocSeeds.map(buildReferenceDoc);

export const docsComponents: ComponentDoc[] = [...coreDocs, ...referenceDocs];

export function getDocById(id: string): ComponentDoc | undefined {
  return docsComponents.find((component) => component.id === id);
}
