import { BookOpen } from 'lucide-react';
import { baseIconProps, type IconProps } from './IconProps';

type DocsIconProps = IconProps;

export function DocsIcon(props: DocsIconProps) {
  return <BookOpen {...baseIconProps} {...props} />;
}
