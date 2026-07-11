import { Activity, Opportunity, TeamMember, Testimonial, StatItem } from './types';

// ==========================================
// 🛠️ SITE CONFIGURATION CONTROL PANEL
// ==========================================
// Edit any text, email, phone number, or URL here,
// and it will instantly update across your entire website!
export const SITE_CONFIG = {
  // Brand details
  brandName: 'Project Luminary',
  tagline: 'Illuminating Sustainable Solutions. Igniting Change.',
  email: 'hello@projectluminary.org',
  phone: '+1 (206) 555-0143',
  address: '1200 Greenway Boulevard, Suite 400, Seattle, WA 98101',
  
  // Hero section contents
  heroBadge: 'Illuminating Grassroots Green Action',
  heroTitlePrimary: 'Empowering Communities to ',
  heroTitleGradient: 'Heal Our Biosphere',
  heroDescription: 'Project Luminary is a decentralized, science-driven coalition dedicated to restoration ecology, urban afforestation, renewable community energy grids, and next-generation climate literacy. Together, we turn advocacy into action.',
  heroImage: 'file/PL Logo 2.png',
  
  // About preview section on Home
  aboutSummaryTitle: 'A Science-Driven Approach to Restoration Ecology',
  aboutSummaryPara1: 'Founded by researchers, environmental lawyers, and community builders, Project Luminary acts as an active catalyst for sustainability. We bridge the gap between academic research and on-the-ground ecological revitalization.',
  aboutSummaryPara2: 'Through localized urban forestry campaigns, micro-grid clean energy deployment, circular recycling streams, and robust classroom STEM curriculum integrations, we deliver direct environmental audits that count.',
  aboutSummaryImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80',

  // Stats / Impact section
  statsSectionTitle: 'Decarbonization Metrics that Matter',
  statsSectionDescription: 'We hold ourselves to rigorous open-science audits. Every sapling planted, laptop recycled, and solar kilowatt deployed is tracked and calculated.',

  // Social media URLs
  socials: {
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com'
  }
};

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'act-1',
    title: 'Urban Forestry and Greening',
    category: 'Conservation',
    date: 'July 15, 2026',
    description: 'Restoring native canopy cover in urban areas to combat micro-climate heat islands and improve local biodiversity.',
    content: 'Our urban afforestation initiative works with local municipalities, community groups, and schools to plant thousands of native saplings. By creating micro-forests, we create critical habitats for pollinators, reduce ambient summer temperatures by up to 4°C, and provide accessible green spaces for underrepresented neighborhoods.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read'
  },
  {
    id: 'act-2',
    title: 'Coastal Cleanup & Marine Sanctuary Support',
    category: 'Marine Ecology',
    date: 'June 28, 2026',
    description: 'Removing microplastics and marine debris while cataloging shoreline health indicator species.',
    content: 'In collaboration with oceanographers, our teams lead weekend marine debris collection runs. We don\'t just pick up trash—we weigh, categorize, and report all materials to a global ocean pollutant database. This data is actively used to advocate for municipal single-use packaging bans and protect vulnerable nesting marine life.',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73023702?auto=format&fit=crop&w=800&q=80',
    readTime: '7 min read'
  },
  {
    id: 'act-3',
    title: 'Community Solar and Grid-Sharing Workshops',
    category: 'Clean Energy',
    date: 'May 12, 2026',
    description: 'Empowering neighborhoods to adopt decentralized solar solutions and cooperative energy grids.',
    content: 'We believe clean energy should be accessible to all. Our community solar program educates neighborhood leaders on municipal grid regulations, solar financing models, and installation basics. We have facilitated solar conversions on 12 community hubs, lowering energy costs by 35% and saving tons of carbon output.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    readTime: '6 min read'
  },
  {
    id: 'act-4',
    title: 'Regenerative Urban Farming',
    category: 'Sustainable Living',
    date: 'April 05, 2026',
    description: 'Teaching vertical farming, organic composting, and pesticide-free permaculture principles.',
    content: 'Project Luminary manages three local regenerative food spaces. These living laboratories serve as hands-on centers where citizens learn to cultivate organic vegetables, harvest rainwater, and manage sustainable local circular economies, bringing fresh produce to food deserts in metropolitan areas.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read'
  },
  {
    id: 'act-5',
    title: 'E-Waste Recovery Campaign',
    category: 'Circular Economy',
    date: 'March 19, 2026',
    description: 'Safe collection, sorting, and extraction of valuable mineral components from old electronic devices.',
    content: 'Consumer electronics represent the fastest-growing waste stream. Our quarterly collection events divert hazardous mercury, lead, and flame-retardants from landfills. Working with certified, zero-landfill e-waste recyclers, we refurbish functional laptops for low-income school children and recover critical elements.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read'
  },
  {
    id: 'act-6',
    title: 'Climate Youth Advocacy Summit',
    category: 'Education',
    date: 'February 10, 2026',
    description: 'Bringing together young climate leaders to pitch eco-initiatives to environmental policymakers.',
    content: 'The summit is our premier annual education event, hosting workshops on environmental law, policy writing, community organizing, and public speaking. Selected cohorts receive small seed grants and professional mentorship from our legal and scientific team to execute their local projects.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    readTime: '8 min read'
  }
];

export const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Lead Habitat Restoration Specialist',
    category: 'Conservation',
    location: 'Seattle, WA (On-site / Field)',
    type: 'Volunteer',
    deadline: 'August 1, 2026',
    description: 'Lead weekend teams in planting native flora, managing invasive vegetation, and compiling soil erosion reports.',
    requirements: [
      'Basic knowledge of Northwest native and invasive plant species.',
      'Ability to hike and work outdoors in varying weather conditions.',
      'Strong leadership skills and enthusiasm for community engagement.',
      'First aid certification (provided free of charge if needed).'
    ]
  },
  {
    id: 'opp-2',
    title: 'Environmental Policy Research Assistant',
    category: 'Policy & Advocacy',
    location: 'Remote / Virtual',
    type: 'Internship',
    deadline: 'July 25, 2026',
    description: 'Analyze state-level clean energy bills and synthesize reports on carbon offset accountability standards.',
    requirements: [
      'Currently enrolled in or recently graduated with an environmental studies, public policy, or law degree.',
      'Excellent analytical writing and reading comprehension skills.',
      'Commitment of 15-20 hours per week for 12 weeks.',
      'Proficiency with collaborative document suites and database queries.'
    ]
  },
  {
    id: 'opp-3',
    title: 'Sustainability Curriculum Developer',
    category: 'Education',
    location: 'Chicago, IL (Hybrid)',
    type: 'Job',
    deadline: 'August 15, 2026',
    description: 'Full-time role designing interactive STEM and permaculture workshops for public primary and secondary schools.',
    requirements: [
      '3+ years experience in curriculum development, environmental science, or formal primary education.',
      'A deep understanding of experiential, student-centric teaching models.',
      'Proven track record designing modules that align with regional STEM standards.',
      'Fluency in Spanish or Mandarin is highly desirable.'
    ]
  },
  {
    id: 'opp-4',
    title: 'Urban Beekeeping & Pollinator Training',
    category: 'Sustainable Living',
    location: 'Denver, CO (On-site)',
    type: 'Training',
    deadline: 'July 18, 2026',
    description: 'A 4-week certification training on apiary management, hive winterization, and local pollinator habitat development.',
    requirements: [
      'Must be 18 years or older with no known acute bee venom allergies.',
      'Willingness to assist in maintaining community apiaries post-training.',
      'Comfortable handling beekeeping equipment and live insects.',
      'Prior attendance at a Project Luminary intro workshop is preferred.'
    ]
  },
  {
    id: 'opp-5',
    title: 'Corporate Eco-Alliance Initiative',
    category: 'Partnership',
    location: 'Global / Virtual',
    type: 'Partnership',
    deadline: 'Ongoing',
    description: 'A dedicated alignment program for enterprise partners to sponsor localized decarbonization and clean-water efforts.',
    requirements: [
      'Organization must have committed CSR guidelines or active ESG targets.',
      'Minimum alignment of resources for local staff volunteering programs.',
      'Zero corporate investments in fossil fuel expansion or direct rainforest logging.',
      'Willingness to undergo an annual green-supply audit.'
    ]
  },
  {
    id: 'opp-6',
    title: 'Project Luminary annual Gala & Clean Energy Showcase',
    category: 'Community Events',
    location: 'San Francisco, CA (On-site)',
    type: 'Event',
    deadline: 'September 5, 2026',
    description: 'Participate as an exhibitor, presenter, or volunteer at our premier annual fundraising gala and low-carbon tech expo.',
    requirements: [
      'Open to local sustainability startups, academic researchers, and artists.',
      'Project submissions must highlight circular design or zero-waste solutions.',
      'Must RSVP or apply for booth space before the designated deadline.',
      'Volunteer hosts must attend a 1-hour orientation on September 3.'
    ]
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Dr. Sarah Jenkins',
    position: 'Executive Director & Co-Founder',
    bio: 'Sarah holds a PhD in Ecology and has spent 15 years leading cross-border climate adaptation initiatives before establishing Project Luminary.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Liam Sterling',
    position: 'Urban Forestry Volunteer',
    comment: 'Volunteering with Project Luminary changed my entire relationship with my city. Planting mini-forests in neighborhoods that lacked greenery was incredibly rewarding and directly measurable.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Sophia Chen',
    position: 'Sustainability Policy Intern',
    comment: 'My internship wasn\'t just about reading bills; they trusted me to co-author a localized solar adaptation memo that was actually cited during city council votes. True hands-on impact!',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'David Miller',
    position: 'Founder, Miller Tech Group',
    comment: 'We partnered with Project Luminary for our corporate volunteer month, and the feedback from our team was outstanding. Their clean energy workshops are professionally designed and intensely practical.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    rating: 5
  }
];

export const STATS_DATA: StatItem[] = [
  {
    id: 'stat-1',
    label: 'Trees Planted',
    value: 12500,
    suffix: '+',
    iconName: 'TreePine'
  },
  {
    id: 'stat-2',
    label: 'Tons of E-Waste Diverted',
    value: 48,
    suffix: ' Tons',
    iconName: 'Cpu'
  },
  {
    id: 'stat-3',
    label: 'Active Volunteers',
    value: 3200,
    suffix: '+',
    iconName: 'Users'
  },
  {
    id: 'stat-4',
    label: 'Carbon Offset',
    value: 950,
    suffix: ' CO₂e/yr',
    iconName: 'Globe'
  }
];
