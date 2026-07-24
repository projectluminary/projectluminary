export interface Activity {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  content: string;
  image: string;
  readTime: string;
  additionalImages?: string[];
  status?: 'Ongoing Activity' | 'Previous Activity' | string;
}

export type OpportunityType = 'Volunteer' | 'Internship' | 'Job' | 'Event' | 'Training' | 'Partnership' | string;

export interface Opportunity {
  id: string;
  title: string;
  category: string;
  location: string;
  type: OpportunityType;
  deadline: string;
  description: string;
  requirements: string[];
  jdUrl?: string;
  isAvailable?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
    email?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  comment: string;
  image: string;
  rating: number;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

export interface CoreValue {
  iconName: string;
  title: string;
  desc: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

