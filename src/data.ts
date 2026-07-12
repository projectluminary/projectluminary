import { Activity, Opportunity, TeamMember, Testimonial, StatItem, CoreValue, TimelineEvent } from './types';

// ==========================================
// 🛠️ SITE CONFIGURATION CONTROL PANEL
// ==========================================
// Edit any text, email, phone number, or URL here,
// and it will instantly update across your entire website!
export const SITE_CONFIG = {
  // Brand details
  brandName: 'Project Luminary',
  tagline: 'Lighting Pathways. Empowering Futures.',
  email: 'info@projectluminary.com',
  phone: '+95 512345678',
  address: 'Yangon, Myanmar',
  
  // Hero section contents
  heroBadge: 'Project Luminary in Action',
  heroTitlePrimary: 'Lighting Pathways. ',
  heroTitleGradient: 'Empowering Futures.',
  heroDescription: "Project Luminary is a youth-led initiative founded by students who experienced Myanmar's disrupted education system firsthand. Through free higher education guidance, skills development, and civic learning, we empower underserved Burmese youth to pursue opportunities, develop leadership, and build brighter futures.",
  heroImage: 'file/PL-Logo-2.png',
  
  // About preview section on Home
  aboutSummaryTitle: 'Student-led Civic Education Initiative',
  aboutSummaryPara1: 'Project Luminary is a student-led civic education initiative founded in December 2023 by Parami University students who transformed their own educational challenges into opportunities for others. What began as a simple effort to help peers discover higher education pathways has grown into a community-driven movement that supports young people across Myanmar and beyond.',
  aboutSummaryPara2: 'We provide free programs that combine university application support, practical skill development, and meaningful civic engagement. By creating inclusive spaces where youth learn from experts and one another, we help participants develop the confidence, knowledge, and critical thinking needed to shape their own futures and contribute positively to their communities.',
  aboutSummaryImage: 'file/PL-Logo-2.png',

  // About Page details
  aboutPageBadge: 'About Project Luminary',
  aboutPageTitle: 'Lighting Pathways. Empowering Futures.',
  aboutPageDescription: 'Project Luminary was founded in December 2023 by a cooperative of passionate students to deliver free higher education guidance, skills training, and civic engagement pathways.',
  
  // Mission & Vision
  missionTitle: 'Our Mission',
  missionDescription: 'Temp: To provide free, inclusive, and high-quality higher education guidance, skill development, and civic learning that empowers underserved Burmese youth to overcome educational disruptions, pursue global opportunities, and drive positive changes.',
  visionTitle: 'Our Vision',
  visionDescription: 'Temp: We envision an inclusive and empowered society where every young person in Myanmar, regardless of background, has the support, skills, and critical thinking capacity to shape their own future and build a vibrant community.',

  // Core Values Section
  coreValuesSectionTitle: 'Our Core Values',
  coreValuesSectionDescription: 'Temp: Five underlying principles that govern our educational design, public outreach, and community empowerment programs.',

  // Timeline Section
  journeyTimelineSectionTitle: 'Our Journey Timeline',
  journeyTimelineSectionDescription: 'Temp: From a peer-to-peer mentoring initiative to a community-driven movement supporting young people across Myanmar.',

  // Stats / Impact section
  statsSectionTitle: 'Our Project Metrics that Matter',
  statsSectionDescription: 'Text Here',

  // Social media URLs
  socials: {
    linkedin: 'https://www.linkedin.com/company/project-luminary/',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com'
  }
};

export const CORE_VALUES_DATA: CoreValue[] = [
  { iconName: 'Shield', title: 'Integrity', desc: 'Text Here' },
  { iconName: 'Lightbulb', title: 'Innovation', desc: 'Text Here' },
  { iconName: 'Users', title: 'Community', desc: 'Text Here' },
  { iconName: 'Leaf', title: 'Sustainability', desc: 'Text Here' },
  { iconName: 'Handshake', title: 'Collaboration', desc: 'Text Here' }
];

export const TIMELINE_DATA: TimelineEvent[] = [
  { year: 'December 2023', title: 'Project Luminary Foundation', desc: 'Project Luminary was founded by students at Parami University who had personally experienced the challenges of Myanmar\'s disrupted education system. What started as one student\'s effort to help peers discover higher education opportunities soon grew into a shared vision.' },
  { year: 'Early 2024', title: 'First Pilot Programme', desc: 'With support from Parami University\'s Civic Engagement Grant, a team of passionate students transformed the idea into a structured, youth-led initiative. The first Pilot Programme was launched to provide free university guidance and mentorship for underserved Burmese youth.' },
  { year: '2024', title: 'Pathways & Perspectives', desc: 'Following the success of the Pilot Programme, Project Luminary expanded its mission by launching Pathways & Perspectives, integrating university application support with discussions on civic responsibility, critical thinking, and social issues.' },
  { year: '2025', title: 'LARC (Learning, Action, Research & Community)', desc: 'Project Luminary introduced LARC (Learning, Action, Research & Community), broadening its curriculum to include research, digital literacy, AI knowledge, financial literacy, and other practical skills shaped by community needs. The initiative also reached participants from Myanmar, Thailand, Malaysia, and the Cox\'s Bazar refugee community in Bangladesh.' },
  { year: '2026', title: 'International Recognition', desc: 'Project Luminary was awarded First Place in the 2026 MacJannet Prize for Global Citizenship by the Talloires Network of Engaged Universities. The award recognizes outstanding university initiatives that advance civic engagement and social impact, celebrating Project Luminary\'s commitment to empowering underserved Burmese youth through education and community leadership.' },
  { year: 'Looking Ahead', title: 'The Journey Continues', desc: 'Project Luminary continues to create pathways for young people to access higher education, develop practical skills, and become active citizens. Our vision is to expand opportunities, strengthen communities, and empower the next generation of leaders across Myanmar and beyond.' }
];


export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'act-1',
    title: 'Title',
    category: 'STEM',
    date: 'July 15, 2026',
    description: 'Description',
    content: 'Content.',
    image: 'file/PL-Logo-2.png',
    readTime: '5 min read'
  },
  {
    id: 'act-2',
    title: 'Title',
    category: 'STEM',
    date: 'July 15, 2026',
    description: 'Description',
    content: 'Content.',
    image: 'file/PL-Logo-2.png',
    readTime: '7 min read'
  },
  {
    id: 'act-3',
    title: 'Title',
    category: 'STEM',
    date: 'July 15, 2026',
    description: 'Description',
    content: 'Content.',
    image: 'file/PL-Logo-2.png',
    readTime: '6 min read'
  },
  {
    id: 'act-4',
    title: 'Title',
    category: 'STEM',
    date: 'July 15, 2026',
    description: 'Description',
    content: 'Content.',
    image: 'file/PL-Logo-2.png',
    readTime: '4 min read'
  },
  {
    id: 'act-5',
    title: 'Title',
    category: 'STEM',
    date: 'July 15, 2026',
    description: 'Description',
    content: 'Content.',
    image: 'file/PL-Logo-2.png',
    readTime: '5 min read'
  },
  {
    id: 'act-6',
    title: 'Title',
    category: 'STEM',
    date: 'July 15, 2026',
    description: 'Description',
    content: 'Content.',
    image: 'file/PL-Logo-2.png',
    readTime: '8 min read'
  }
];

export const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Research Specialist',
    category: 'Research',
    location: 'Yangon (onsite)',
    type: 'Project-Based',
    deadline: 'August 1, 2026',
    description: 'Text Here',
    requirements: [
      'Line1',
      'Line2',
      'Line3',
      'Line4'
    ]
  },
  {
    id: 'opp-2',
    title: 'Operation Assistant',
    category: 'Operation',
    location: 'Remote / Virtual',
    type: 'Internship',
    deadline: 'July 25, 2026',
    description: 'Text Here',
    requirements: [
      'Line1',
      'Line2',
      'Line3',
      'Line4'
    ]
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Dr. Sarah Jenkins',
    position: 'Executive Director & Co-Founder',
    bio: 'Sarah holds a PhD in Ecology and has spent 15 years leading cross-border climate adaptation initiatives before establishing Project Luminary.',
    image: 'file/PL-Logo-2.png',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 'team-2',
    name: 'Dr. Aris Thorne',
    position: 'Chief Scientific Officer',
    bio: 'Aris leads our research team, specializing in urban microclimates, biodiversity metrics, and hydrological environmental impact modeling.',
    image: 'file/PL-Logo-2.png',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 'team-3',
    name: 'Marcus Vance',
    position: 'Director of Community Programs',
    bio: 'A passionate community organizer, Marcus coordinates our volunteer groups, local farm cooperatives, and city-level public townhalls.',
    image: 'file/PL-Logo-2.png',
    socials: {
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'team-4',
    name: 'Elena Rostova',
    position: 'Lead Curriculum Architect',
    bio: 'Elena designs the educational programs integrated into regional schools, ensuring next-generation climate literacy aligns with STEM fields.',
    image: 'file/PL-Logo-2.png',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Kaung Myat Phyo (Kelvin)',
    position: 'Project Lead & Advancement Lead',
    comment: 'We see this award not only as a recognition of Project Luminary, but also as a tribute to the wider community of grassroots initiatives and Burmese youth who continue to learn, lead, and imagine better futures despite extraordinary challenges.',
    image: 'file/PL-Logo-2.png',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Name',
    position: 'Position',
    comment: 'Content',
    image: 'file/PL-Logo-2.png',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Name',
    position: 'Position',
    comment: 'Content',
    image: 'file/PL-Logo-2.png',
    rating: 5
  }
];

export const STATS_DATA: StatItem[] = [
  {
    id: 'stat-1',
    label: 'Youth Participants',
    value: 96,
    suffix: '+',
    iconName: 'Users'
  },
  {
    id: 'stat-2',
    label: 'Community Members Engaged',
    value: 121,
    suffix: '+',
    iconName: 'Users'
  },
  {
    id: 'stat-3',
    label: 'Educators, Mentors & Guest Speakers',
    value: 43,
    suffix: '+',
    iconName: 'Users'
  },
  {
    id: 'stat-4',
    label: 'Countries & Contexts Reached',
    value: 4,
    suffix: ' countries',
    iconName: 'Globe'
  }
];
