import { Mail } from 'lucide-react';
import { baseIconProps, type IconProps } from './IconProps';

type EmailIconProps = IconProps;

export function EmailIcon(props: EmailIconProps) {
  return <Mail {...baseIconProps} {...props} />;
}
