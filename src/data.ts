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
  email: 'info@projectluminary.org',
  applyEmail: 'talent@projectluminary.org',
  phone: '+95 512345678',
  address: 'Youth-led initiative serving Myanmar communities and beyond',
  
  // Hero section contents
  heroBadge: 'FIRST-PLACE WINNER | 2026 MACJANNET PRIZE FOR GLOBAL CITIZENSHIP',
  heroTitlePrimary: 'Helping Young People Learn,',
  heroTitleGradient: 'Grow, and Contribute Beyond Themselves.',
  heroDescription: "Founded by youths who experienced Myanmar’s educational disruption firsthand, Project Luminary creates high-quality learning opportunities that help young people access education, develop practical capabilities, think critically about the world around them, and contribute meaningfully to their communities.",
  heroImage: 'images/home/home_2.png',
  
  // About preview section on Home
  aboutSummaryTitle: 'Built by Young People, for Young People',
  aboutSummaryPara1: 'Project Luminary began in 2023 when students at Parami University turned challenges they had personally experienced into opportunities for others. What started as an effort to help fellow young people navigate higher education has grown into a broader platform for learning, skills development, critical engagement, and youth-led action.',
  aboutSummaryPara2: 'Our programmes bring together practical learning and a wider sense of social responsibility. Whether participants are preparing for university, developing research and professional skills, or exploring pressing social issues, we want them to leave Project Luminary better equipped to advance their own futures—and more prepared to contribute to the future of their communities.',
  aboutSummaryImage: 'images/home/home_1.png',

  // About Page details
  aboutPageBadge: 'About Project Luminary',
  aboutPageTitle: 'We Built What We Once Needed Ourselves.',
  aboutPageDescription: 'Project Luminary was founded in December 2023 by Parami University students who had personally experienced the challenges of navigating education and opportunity amid Myanmar’s prolonged disruption. What began as one student’s determination to help others discover pathways he had struggled to find has grown into an award-winning youth-led initiative.',
  
  // Mission & Vision
  missionTitle: 'Mission',
  missionDescription: 'To create high-quality learning opportunities that help young people from Myanmar access education, develop practical capabilities, think critically about the world around them, and contribute meaningfully to their communities.',
  visionTitle: 'Vision',
  visionDescription: 'A future in which young people from Myanmar are equipped not only to pursue opportunities for themselves, but also to think independently, engage responsibly with society, and contribute innovative solutions to the challenges facing their communities and country.',

  // Core Values Section
  coreValuesSectionTitle: 'Our Core Values',
  coreValuesSectionDescription: 'Five underlying principles that govern our educational design, public outreach, and community empowerment programs.',

  // Timeline Section
  journeyTimelineSectionTitle: 'Our Journey Timeline',
  journeyTimelineSectionDescription: 'From a peer-to-peer mentoring initiative to a community-driven movement supporting young people across Myanmar.',

  // Stats / Impact section
  statsSectionTitle: 'Our Project Metrics that Matter',
  statsSectionDescription: 'Text Here',

  // Social media URLs
  socials: {
    linkedin: 'https://www.linkedin.com/company/project-luminary/',
    facebook: 'https://www.facebook.com/share/1Af2XCNHfa/'
  }
};

export const CORE_VALUES_DATA: CoreValue[] = [
  { iconName: 'BookOpen', title: 'Learning with Purpose', desc: 'We believe education should advance both individual potential and the wider good.' },
  { iconName: 'Users', title: 'Youth Agency', desc: 'Young people should be active participants in shaping their learning, futures, and communities.' },
  { iconName: 'Compass', title: 'Critical Inquiry', desc: 'We encourage questions, diverse perspectives, and thoughtful engagement with complex issues.' },
  { iconName: 'Shield', title: 'Equity in Opportunity', desc: 'A young person’s circumstances should not determine the quality of opportunities available to them.' },
  { iconName: 'Lightbulb', title: 'Innovation for Impact', desc: 'We continuously learn, adapt, and explore better and more sustainable ways to create meaningful change.' }
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: 'December 2023',
    title: 'The Idea Takes Shape',
    desc: 'Project Luminary was founded by Parami University students who transformed challenges they had personally experienced into an initiative for other young people.'
  },
  {
    year: '2024',
    title: 'Our First Programme',
    desc: 'The Pilot Programme brought together young people from Myanmar and neighbouring contexts for higher education preparation and critical social learning and we won the Community Solution Award from Parami University.'
  },
  {
    year: '2025',
    title: 'From Learning to Research',
    desc: 'The Lumina Academic Research Consortium expanded Project Luminary into practical skills development, training young researchers and supporting five community-focused research projects.'
  },
  {
    year: '2025/2026',
    title: 'Pathways & Perspectives',
    desc: 'Building on lessons from the Pilot Programme, Pathways & Perspectives strengthened our model of combining higher education access with critical engagement and peer learning and we won the Civic Engagement Award from Parami University.'
  },
  {
    year: '2026',
    title: 'International Recognition',
    desc: 'Project Luminary was named the First-Place Winner of the internationally competitive 2026 MacJannet Prize for Global Citizenship, awarded by Talliores Network of Engaged Universities.'
  },
  {
    year: '2026',
    title: 'Building the Next Chapter',
    desc: 'Project Luminary began a comprehensive research and strategy process to better understand youth needs, map Myanmar’s social impact landscape, strengthen its Theory of Change, and explore pathways towards a sustainable social enterprise model.'
  }
];


export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'pilot-programme',
    title: 'Pilot Programme (2024)',
    category: 'Education',
    date: 'July 16, 2026',
    description: 'Project Luminary successfully launched its inaugural Pilot Programme, a free, two-month online initiative designed to expand access to higher education opportunities for underserved youth from Myanmar and displaced communities.',
    content: `The programme combined practical university application guidance with intellectually engaging discussions led by educators, professionals, and guest speakers. Participants developed essential skills for pursuing international higher education while exploring broader topics related to leadership, social issues, and critical thinking. The programme fostered an interactive learning environment that encouraged curiosity, collaboration, and lifelong learning.

The pilot attracted over 100 applications, demonstrating strong demand for accessible higher education support. Following a competitive selection process, 40 participants from diverse backgrounds across Myanmar, as well as refugee communities in Bangladesh and Thailand, joined the programme.

Throughout the programme, participants attended a series of structured learning sessions, completed weekly assignments and readings, and engaged directly with experienced instructors and guest speakers. The success of the pilot established a strong foundation for Project Luminary's long-term mission of creating equitable pathways to higher education and empowering the next generation of changemakers.

Key Highlights:
• 40 participants selected from over 100 applications
• Free two-month online higher education preparation programme
• Combined university application guidance with interdisciplinary learning
• Participants represented diverse regions of Myanmar and refugee communities in Bangladesh and Thailand
• Featured experienced instructors and guest speakers from academia and professional sectors
• Built participants' confidence, critical thinking, and readiness for international higher education opportunities`,
    image: '/images/activities/pilot-programme/willbuckingham_1.png',
    readTime: '5 min read',
    additionalImages: [
      '/images/activities/pilot-programme/david_golding.png',
      '/images/activities/pilot-programme/breakout_rooms.png',
      '/images/activities/pilot-programme/migration_presentation.png'
    ]
  },
  {
    id: 'lumina-academic-research-cnsortium',
    title: 'Title',
    category: 'Education',
    date: 'July 17, 2026',
    description: 'Description',
    content: 'Content.',
    image: 'images/logo/PL-Logo-2.png',
    readTime: '7 min read'
  },
  {
    id: 'pathways-and-perspectives-pogramme',
    title: 'Pathways & Perspectives Programme (2025–2026)',
    category: 'Education',
    date: 'July 18, 2026',
    description: 'The Pathways & Perspectives Programme is Project Luminary\'s flagship educational initiative designed to empower underserved youth in Myanmar by combining higher education preparation with civic learning and critical thinking.',
    content: `
    Delivered over two months in a fully online format, the programme equips participants with practical knowledge and skills for pursuing international higher education while encouraging them to engage thoughtfully with contemporary social issues. Through interactive workshops, discussions with educators and professionals, and reflective learning, participants strengthen both their academic readiness and their understanding of their roles as active members of society.

The programme is built on two complementary learning tracks:

Pathways focuses on university applications, scholarship opportunities, personal statement writing, CV development, interview preparation, and navigating higher education systems.
Perspectives encourages participants to explore topics such as social mobility, identity, climate, ethics, technology, and global development through guided discussions and expert-led sessions.

The programme successfully brought together young people from diverse communities across Myanmar in an inclusive online learning environment that fostered curiosity, collaboration, and meaningful dialogue. Participants reported increased confidence in pursuing higher education, greater critical thinking skills, and a stronger sense of civic responsibility following the programme.

Programme Highlights
•  Two-month online higher education and civic engagement programme
•  Connected aspiring university students from diverse communities across Myanmar
•  Practical guidance on university applications, scholarships, CVs, personal statements, and interviews
•  Expert-led discussions on contemporary social issues and global challenges
•  Interactive, participant-centred learning that promotes dialogue, reflection, and collaboration
    `,
    image: '/images/activities/p_and_p/p_and_p_1.png',
    readTime: '5 min read',
    additionalImages: [
      '/images/activities/p_and_p/p_and_p_2.png',
      '/images/activities/p_and_p/p_and_p_3.png'
    ]
  }
];

export const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: 'research-specialist-7-26',
    title: 'Research Specialist',
    category: 'Research',
    location: 'Remote / Virtual',
    type: 'Project-Based',
    deadline: 'August 1, 2026',
    description: 'Project Luminary, a youth-led social impact initiative, is hiring two remote Research Associates for a 4-month, part-time (20 hours/week) role. The associates will support a comprehensive research and strategic development process to analyze the needs of Burmese youth and evaluation models, directly shaping the organization\'s future programming, strategy, and sustainability.',
    requirements: [
      'Time Commitment: Ability to commit approximately 20 hours per week for a 4-month term.',
      'Research & Analytical Skills: Capacity to read, analyze, and synthesize qualitative and quantitative data from various sources.',
      'Language Proficiency: Sufficient English proficiency to engage with academic, professional, and research materials.',
      'Collaboration & Communication: Ability to communicate clearly, respectfully, contribute ideas, and work both independently and collaboratively in a team.',
      'Core Interests: A genuine interest or curiosity in research, education, youth development, social impact, or the challenges facing Burmese youth.'
    ],
    jdUrl: 'https://drive.google.com/file/d/12kdjLI1Iiulq0j2RX3fzKpYuXW8_npQr/view?usp=sharing',
    isAvailable: true
  },
  {
    id: 'opp-2',
    title: 'Operation Assistant',
    category: 'Operation',
    location: 'Yangon (onsite)',
    type: 'Internship',
    deadline: 'July 25, 2026',
    description: 'Text Here',
    requirements: [
      'Line1',
      'Line2',
      'Line3',
      'Line4'
    ],
    jdUrl: 'https://projectluminary.org',
    isAvailable: true
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Kaung Myat Phyo (Kelvin)',
    position: 'Project Lead, Advancement Lead',
    bio: 'Directs overall strategic vision and partnerships to expand educational access for youth across Myanmar.',
    image: 'initials:KM',
    socials: {
      email: 'kelvin@projectluminary.com'
    }
  },
  {
    id: 'team-2',
    name: 'Ei Phyu Sin Win (Cathryn)',
    position: 'Operations Lead',
    bio: 'Coordinates program logistics, community relations, and day-to-day operations for Luminary initiatives.',
    image: 'images/meet-the-team/epsw_profile.jpg',
    socials: {
      email: 'cathryn@projectluminary.com'
    }
  },
  {
    id: 'team-3',
    name: 'Moe Honey',
    position: 'Administration Lead',
    bio: 'Manages organizational records, financial planning, and internal communications across our volunteer network.',
    image: 'initials:MH',
    socials: {
      email: 'moehoney@projectluminary.com'
    }
  },
  {
    id: 'team-4',
    name: 'Htet Khant Linn (Charles)',
    position: 'Tech Lead',
    bio: 'Architects and maintains digital infrastructure, community tools, and learning resource databases.',
    image: 'images/meet-the-team/hkl_professional_corporate_portrait_compact.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/htet-khant-linn/',
      email: 'charles@projectluminary.com'
    }
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Kaung Myat Phyo (Kelvin)',
    position: 'Project Lead & Advancement Lead',
    comment: 'We see this award not only as a recognition of Project Luminary, but also as a tribute to the wider community of grassroots initiatives and Burmese youth who continue to learn, lead, and imagine better futures despite extraordinary challenges.',
    image: 'images/logo/PL-Logo-2.png',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Name',
    position: 'Position',
    comment: 'Content',
    image: 'images/logo/PL-Logo-2.png',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Name',
    position: 'Position',
    comment: 'Content',
    image: 'images/logo/PL-Logo-2.png',
    rating: 5
  }
];

export const STATS_DATA: StatItem[] = [
  {
    id: 'stat-1',
    label: 'Programme Applications Received',
    value: 200,
    suffix: '+',
    iconName: 'Users'
  },
  {
    id: 'stat-2',
    label: 'Young People Selected for Intensive Programmes',
    value: 65,
    suffix: '+',
    iconName: 'Users'
  },
  {
    id: 'stat-3',
    label: 'Youth-Led Research Projects Supported',
    value: 5,
    suffix: '',
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
