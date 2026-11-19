import {
  Award, BookOpen, Compass, ExternalLink, Globe, HelpCircle,
  Leaf, Lightbulb, Quote, Shield, Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Keep data-driven icons explicit so Rollup can exclude the rest of Lucide.
export const ICONS: Readonly<Record<string, LucideIcon>> = {
  Award, BookOpen, Compass, ExternalLink, Globe, HelpCircle,
  Leaf, Lightbulb, Quote, Shield, Users,
};

export function getIcon(name: string): LucideIcon {
  return Object.prototype.hasOwnProperty.call(ICONS, name) ? ICONS[name] : HelpCircle;
}
