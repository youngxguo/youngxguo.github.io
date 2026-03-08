import { House } from 'lucide-react';
import { baseIconProps, type IconProps } from './IconProps';

type HomeIconProps = IconProps;

export function HomeIcon(props: HomeIconProps) {
  return <House {...baseIconProps} {...props} />;
}
