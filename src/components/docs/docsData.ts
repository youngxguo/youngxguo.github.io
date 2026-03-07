export type ComponentDocId = 'button' | 'input' | 'dialog';

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
  whenToUse: string[];
  whenNotToUse: string[];
  accessibility: string[];
  props: ComponentPropRow[];
}

export const docsComponents: ComponentDoc[] = [
  {
    id: 'button',
    name: 'Button',
    status: 'Production ready',
    summary: 'Primary action control with clear variants for hierarchy and emphasis.',
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
  }
];

export function getDocById(id: string): ComponentDoc | undefined {
  return docsComponents.find((component) => component.id === id);
}
