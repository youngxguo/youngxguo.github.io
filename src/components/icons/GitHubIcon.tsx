import { Github } from 'lucide-react';
import { baseIconProps, type IconProps } from './IconProps';

type GitHubIconProps = IconProps;

export function GitHubIcon(props: GitHubIconProps) {
  return <Github {...baseIconProps} {...props} />;
}
