import type { Opportunity } from '../types';

export function isOpportunityOpen(opportunity: Pick<Opportunity, 'isAvailable'>): boolean {
  return opportunity.isAvailable !== false;
}

// A consistent estimate for narrative text, excluding Markdown syntax/URLs.
export function getReadingTime(content: string): string {
  const text = content
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^(?:#{1,6}|>|[-•])\s+/gm, '')
    .replace(/\*\*/g, '')
    .trim();
  const words = text ? text.split(/\s+/).length : 0;
  return `${Math.max(1, Math.ceil(words / 225))} min read`;
}

export function getProfileInitials(name: string, image = ''): string {
  if (image.startsWith('initials:')) return image.slice('initials:'.length);
  const parts = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, '')
    .replace(/\s*\([^)]*\)/g, '').trim().split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0]?.slice(0, 2) || '').toUpperCase();
}
