import { Linkedin } from 'lucide-react';
import { baseIconProps, type IconProps } from './IconProps';

type LinkedInIconProps = IconProps;

export function LinkedInIcon(props: LinkedInIconProps) {
  return <Linkedin {...baseIconProps} {...props} />;
}
