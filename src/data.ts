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
    title: 'Project Luminary’s Pilot Programme: Where Access to Higher Education Met Socially Engaged Learning',
    category: 'Education',
    date: 'July 16, 2026',
    description: 'The eight-week programme brought aspiring Burmese students into a shared learning community that combined practical university-application preparation with critical discussion of the social questions shaping their lives and communities.',
    content: `- **100+** applications received
- **40** participants accepted
- **8 weeks** of structured learning
- **24** live online sessions

Project Luminary began with a simple but demanding question: Could a youth-led initiative help underserved young people navigate the practical barriers to international higher education while also encouraging them to think critically about society and their responsibilities within it?

The Pilot Programme was Project Luminary’s first sustained attempt to answer that question in practice. Supported through the Community Solution Award of Parami University’s Community Strengthening Initiative, the programme was designed as a free, short-term online pre-college experience for aspiring students from underserved backgrounds.

Interest exceeded expectations. More than 100 young people applied, revealing both the scale of demand and the limitations of available opportunities. After a careful selection process, Project Luminary admitted 40 participants—referred to throughout the programme as “Luminaries”—while preserving a learning environment small enough for meaningful interaction and support.

## A Learning Community Across Borders

The Luminaries joined from communities across Myanmar, from Thailand, and from refugee camps in Bangladesh. Their geographic and educational diversity was not treated merely as a demographic feature; it became part of the learning model. Participants entered the programme with different experiences, levels of preparation, and perspectives, creating opportunities to learn not only from instructors but also from one another.

> **The Pilot Programme’s Central Idea**
> Higher-education access should involve more than helping students complete applications. It should also prepare young people to engage with ideas, articulate their perspectives, and consider how education can be used in service of society.

## Two Complementary Learning Tracks

**App-Lumination: Making Higher Education More Navigable**

The App-Lumination sessions focused on the knowledge and practical skills required to pursue international higher education. Participants explored how higher-education systems work, how to identify suitable institutions and scholarships, how financial-aid processes differ, and how to approach personal statements, interviews, and other key elements of competitive applications.

Two instructors with relevant experience in Thailand and the United States led this part of the programme. Sessions combined structured instruction with questions, discussion, and practical assignments so participants could apply what they were learning.

**Luminous Insights: Developing Voice, Confidence and Social Awareness**

The Luminous Insights sessions formed the programme’s second core track. Each week, participants completed carefully selected materials—including accessible videos and more demanding academic readings—before joining a facilitated discussion.

Themes included education and social mobility, identity, sex and gender, migration, climate action, technological change, and other questions relevant to contemporary society. Seven university professors and one academic adviser contributed as guest instructors, bringing varied disciplinary perspectives into a participant-centred learning environment.

The objective was not to reward participants for producing a single “correct” answer. It was to help them practise reading closely, asking questions, expressing uncertainty, listening across differences, and articulating their own views with greater confidence.

## Conversations That Made Possibility More Tangible

Special guest-speaker sessions complemented the two learning tracks. Participants engaged directly with the Founder and President of Parami University, the university’s Director of Admissions and Student Affairs, and a Burmese undergraduate in the United States who had received admission offers from several highly selective institutions.

These conversations connected abstract aspirations with lived experience. Participants could ask direct questions about university pathways, institutional expectations, student life, and the decisions involved in pursuing education across borders.

## What the Pilot Revealed

As Project Luminary’s first programme, the Pilot was also an organisational learning process. The team had to build public trust, conduct initial needs assessments, develop learning materials, recruit instructors across time zones, manage a large applicant pool, and sustain an intensive eight-week schedule.

It also exposed an important challenge: participants arrived with different levels of academic preparation, particularly when engaging with demanding readings and discussion-based classes. Rather than treating these differences as failure, the programme emphasised progress, active participation, and the gradual development of confidence.

The Pilot Programme did not include a formal long-term tracking system, and Project Luminary therefore does not claim that later educational outcomes can be attributed solely to the programme. However, subsequent contact with alumni has shown that many went on to enter international higher-education pathways, including enrolment at Parami University and other institutions. For the team, these alumni journeys are encouraging evidence of the ambition and potential already present within the participant community—and a reminder of the importance of building stronger evaluation systems in future programmes.

## A Foundation for What Followed

The Pilot Programme was not conceived as a complete solution to the structural barriers facing Burmese youth. Its importance lies in what it tested: an integrated model in which practical access, intellectual confidence, and social responsibility reinforce one another.

The programme’s strong public response, the commitment of its instructors and volunteers, and the continued progress of its alumni helped establish the foundation for Project Luminary’s later work. It also strengthened the organisation’s conviction that youth programmes should not be offered simply for visibility or activity. They should be designed around real needs, delivered with care, and continually evaluated so that each new phase becomes more relevant, equitable, and sustainable.

## Read the Full Programme Report

[Download the Pilot Programme Public Report (PDF)](https://drive.google.com/file/d/1x8-jsYL4F6pL9AmuglW3HL_jy9jBEzo4/view?usp=sharing)

The accompanying public report provides a fuller account of the Pilot Programme’s rationale, design, implementation, participation, learning approach, emerging outcomes, limitations, and lessons for future work.

## Acknowledgements

Project Luminary extends its gratitude to Parami University’s Community Strengthening Initiative, the instructors, guest speakers, advisers, volunteers, community contacts, and every Luminary who contributed time, trust, and intellectual energy to this first programme.`,
    image: '/images/activities/pilot-programme/pilot_1.png',
    readTime: '5 min read',
    status: 'Previous Activity',
    additionalImages: [
      '/images/activities/pilot-programme/pilot_2.png',
      '/images/activities/pilot-programme/pilot_3.png',
      '/images/activities/pilot-programme/pilot_4.png',
      '/images/activities/pilot-programme/pilot_5.png'
    ]
  },
  {
    id: 'lumina-academic-research-cnsortium',
    title: 'From Learning Research to Producing Community Knowledge: The LARC Journey',
    category: 'Education',
    date: 'July 17, 2025',
    description: 'Project Luminary’s second major programme moved beyond classroom instruction by enabling young people to design, fund and carry out research on issues affecting their own communities.',
    content: `- **20** participants
- **16** virtual training sessions
- **5** thematic research teams
- **4** final reports completed

> **The programme’s central question**
> Can young people with limited prior access to formal research training move from understanding research concepts to designing and conducting ethical, community-based inquiry?

For many young people, research can feel distant—something produced by universities, experts or institutions with access to resources. The Lumina Academic Research Consortium, or LARC, began from a different premise: young people should not only consume knowledge. With the right training, ethical guidance and practical support, they can also investigate the questions that matter in their own communities.

LARC was Project Luminary’s second major programme and its first initiative centred specifically on research empowerment. Implemented independently of Parami University and supported through private funding, the programme was offered entirely free of charge to selected participants.

## A Cohort Shaped by Geographic and Social Diversity

Twenty participants joined from across Myanmar, including Yangon, Mandalay, Loilen, Mong Tong, Mawlamyine, Taunggyi, Nyaung-U and Hinthada. One participant joined from a refugee camp in Cox’s Bazar, Bangladesh.

This diversity shaped the programme in important ways. Participants brought different educational backgrounds, community experiences and thematic interests into a shared learning environment. Research was therefore introduced not only as an academic skill, but also as a way of listening carefully, documenting lived realities and making community concerns more visible.

## Two Months of Research Training

From 4 January to 23 February 2025, LARC delivered 16 virtual training sessions. The curriculum covered the importance and practical uses of research, research ethics, literature review, research design, quantitative and qualitative methods, data collection, analysis, teamwork and research reporting.

The training combined instruction with exercises and discussion. Participants were encouraged to ask questions, test their understanding and begin connecting abstract concepts with the practical decisions involved in conducting a study.

Post-training feedback from 16 respondents showed strong perceived gains. More than four in five rated their improvement in understanding the importance and practical applicability of research at either 4 or 5 on a five-point scale. The strongest result concerned research ethics: 93.8% rated their improvement at 4 or 5.

The feedback also exposed areas for improvement. Participants generally reported greater confidence in qualitative research than in quantitative methods, and several requested more time for data analysis, Excel-based practice and advanced techniques. These observations became important lessons for future programme design.

## From Training to Participant-Led Research

After the training phase, participants formed five teams based on shared thematic interests: Digital Literacy, Education, Environment, Inequality, and Refugee and Health issues. Each team developed its own research question and implementation plan.

Project Luminary provided research funding and ongoing support so teams could collect data and translate their proposals into practical studies. This transition from training to implementation was essential: LARC was designed not simply to explain how research works, but to create a supported opportunity to experience the full process.

## Adapting When the Earthquakes Disrupted Implementation

The implementation phase coincided with a series of destructive earthquakes in the region. Some participants were directly affected, including a team member in Mandalay, one of the hardest-hit areas.

Project Luminary prioritised safety and psychological well-being over programme completion. Timelines were extended, and teams were explicitly told that they could discontinue their projects if continuing would create additional distress or risk.

Four of the five teams ultimately completed and submitted research reports. The fifth team, affected most directly by the disaster, did not continue. This was not treated as failure. It reflected an important organisational principle: participant welfare must take precedence over output targets.

## What Participants Reported After the Research Phase

The post-research survey showed that practical engagement deepened participants’ understanding beyond the classroom. Among 16 respondents, 81.3% rated improvement in understanding research’s practical applicability at 4 or 5. A similar 81.3% rated improvement in qualitative research at 4 or 5, while 87.6% rated the two-month training as helpful or very helpful to their project.

Participants described learning how to plan a study, formulate questions, conduct interviews, collect and analyse data, divide responsibilities and respond to unexpected problems as a team. Several explained that before LARC they had understood research mainly as searching for information online or conducting a simple survey. After the programme, they saw it as a structured, ethical and practical process capable of supporting decision-making, advocacy and problem-solving.

## Building Pathways Beyond the Programme

Project Luminary also explored short-term internship and exposure opportunities by engaging organisations including allyours, EHS Myanmar, Prevent Plastics, Thate Pan Hub and the Inya Institute.

These efforts were intended to help interested participants connect research skills with organisational practice. They should be understood as partnership-building and opportunity facilitation rather than guaranteed placements for every participant.

Several participants also began exploring possibilities for publishing or further developing their research. This was an organic development beyond the original programme scope and suggested that, for some participants, LARC had opened a longer-term interest in research and knowledge production.

## Why LARC Mattered

LARC marked an important evolution in Project Luminary’s work. The earlier Pilot Programme had focused on higher-education access, intellectual confidence and socially engaged learning. LARC extended that mission by helping young people become active producers of knowledge.

The programme did not attempt to create fully trained professional researchers in three months. Its contribution was more foundational: it gave participants a structured introduction, practical experience, modest resources, mentoring and the confidence to begin asking and investigating their own questions.

The most important lesson was that meaningful research capacity cannot be built through lectures alone. It requires practice, ethical responsibility, teamwork, feedback and the freedom to adapt when real life intervenes.


## Read the Full Programme Report

[Download the Pilot Programme Public Report (PDF)](https://drive.google.com/file/d/1Bt3jqF2BkOLGPFBLgxKK7eMl72tai_WN/view?usp=drive_link)


## Acknowledgements

Project Luminary thanks the private donor whose support made LARC possible, the instructors and advisers who shared their expertise, the organisations that explored opportunities for participants, and the twenty young researchers who brought curiosity, resilience and commitment to the programme.`,
    image: '/images/activities/larc/larc_1.png',
    readTime: '8 min read',
    status: 'Previous Activity',
    additionalImages: [
      '/images/activities/larc/larc_2.png',
      '/images/activities/larc/larc_3.png'
    ]
  },
  {
    id: 'pathways-and-perspectives-pogramme',
    title: 'Pathways & Perspectives: A pathway into higher education - and a wider view of what education is for',
    category: 'Education',
    date: 'July 18, 2026',
    description: 'Across eight weeks, Project Luminary’s flagship programme brought practical university preparation into conversation with critical inquiry, civic reflection and an online community of learning.',
    content: `- **34** enrolled
- **29** completed
- **22** survey respondents
- **8** weeks online

> **P&P participant, anonymous post-programme survey**
> During the sessions, I felt like I was learning at university. The group discussions gave us a chance to share our perspectives.

## A programme built around two questions

Higher education is often treated as a destination: an acceptance letter, a scholarship, a place at a university. Pathways & Perspectives began from a broader premise. Reaching university matters, but so does the kind of thinker, neighbour and citizen a young person is becoming along the way. What if university preparation could make room for both?

That question shaped Pathways & Perspectives, or P&P, a free, fully online learning programme created by Project Luminary for prospective university students and young people from across Myanmar. Over eight weeks, participants learned how to investigate universities, understand application processes and present their stories. In parallel, they examined social mobility, climate and power, international development, identity, invisible labour, ethical technology and ethics. The two strands were designed as one educational experience: direction without narrowness, and curiosity with practical consequence.

The programme ran from 5 December 2025 to 25 January 2026 after approximately two months of preparation. Thirty-four participants enrolled and 29 completed, an 85 per cent retention rate. Twenty-two completers later responded anonymously to the post-programme monitoring and evaluation survey. Their feedback offers strong evidence of perceived learning and programme quality. It does not, by itself, establish long-term causation. That distinction is important to Project Luminary—and central to how P&P understands responsible learning.

P&P also offered a different picture of who can build educational institutions. The programme was coordinated by a three-person student-led team working with a youth-led partner, volunteer instructors and invited academics. Its credibility did not come from claiming to have every answer. It came from careful design, reliable follow-through and the ability to bring different forms of expertise into a coherent experience for learners.

## Why P&P was created

For many young people, the university application process is not simply competitive; it is difficult to see. Information is scattered across institutional websites, informal networks, agencies and social media. A student may know that scholarships exist without knowing how to compare them, how to judge fit, or how to translate experience into a personal statement. Unequal access to guidance can become an additional layer of unequal access to education.

Yet a purely technical response would have been incomplete. University preparation can easily become a private race for credentials—an exercise in optimising one applicant’s prospects while leaving the wider purposes of education unexamined. Project Luminary wanted participants to ask not only, ‘Where can I study?’ but also, ‘What assumptions shape the world I am entering? Whose work remains unseen? How does power affect opportunity? What responsibilities travel with education?’

P&P therefore joins two needs often separated in youth programming. The first is navigational: practical knowledge, confidence and tools for pursuing higher education. The second is intellectual and civic: practice in questioning, listening, discussing, writing and connecting personal ambitions to social realities. The programme’s name holds this double commitment.

That commitment also changes the role of the instructor. In Pathways, lived experience of application systems becomes a resource learners can question and adapt, not a formula they must reproduce. In Perspectives, academic expertise opens a conversation rather than closing it. The facilitator’s task is to create enough structure for serious learning and enough openness for participants to bring their own histories, doubts and interpretations into the room.

The fully online format expanded geographic reach, but it did not erase inequality. Electricity cuts, unstable internet, competing work and study, limited private space and differences in English confidence all shaped participation. P&P’s design had to negotiate these realities through advance materials, reminders, direct support, flexible responses to absence and smaller discussion spaces. Access, in this sense, meant more than removing a fee. It meant continually examining what made participation possible—or difficult—after admission to the programme.

## Pathways: turning aspiration into informed choice

The Pathways strand made the application journey more legible. Two volunteer instructors from ချိတ် (Chate) – The Hook brought experience with Asian—including ASEAN and regional—and European university systems. Participants worked through self-assessment, university and programme research, scholarships and financial aid, personal statements, CVs, portfolios and interview preparation. The emphasis was not on producing a single ‘correct’ application. It was on helping learners make choices with better information and greater independence.

Participants repeatedly described the value of moving from vague ambition to a clearer process. In the anonymous survey, 95.5 per cent agreed or strongly agreed that P&P improved their understanding of how to research universities and academic programmes. A further 90.9 per cent agreed or strongly agreed that it helped them understand application components such as essays, documents and interviews. Interview confidence remained an area for further development: 72.8 per cent reported a positive response, while 27.3 per cent selected neutral.

The before-and-after confidence question adds nuance. Before P&P, 31.8 per cent described themselves as not confident at all about applying to university, 40.9 per cent as slightly confident and 27.3 per cent as moderately confident. After the programme, no respondent selected ‘not confident at all’; 13.6 per cent remained slightly confident, 68.2 per cent were moderately confident and 18.2 per cent were very confident. These are self-assessments rather than an external test of application readiness, but the direction of change is clear across this respondent group.

The variation inside those results matters. Some participants were already familiar with the application process and wanted individual guidance; others were encountering basic research strategies for the first time. Some were interested in countries not covered in depth. Their feedback points toward a more differentiated Pathways model: shared foundations for everyone, followed by practical clinics, peer review and optional country- or application-specific support. Information is most useful when learners can apply it to a live decision.

## Perspectives: learning to see beyond the application

If Pathways helped participants locate possible routes forward, Perspectives asked them to look outward and inward. Each week introduced a contemporary social theme through curated articles, videos or documentaries, followed by a session led by an invited professor or subject-matter expert. Discussion, questioning and reflection mattered as much as the transfer of information.

The themes were deliberately varied: social mobility; climate and power; international development; identities; invisible labour; ethical technology in practice; and ethics. Together, they offered different lenses on opportunity, responsibility and human agency. Participants connected abstract ideas to family, community and future study. One reflected on previously unrecognised care work at home. Another described how a discussion of identity resonated with Rohingya history and culture. Others wrote that the sessions influenced how they thought about potential university majors.

All 22 survey respondents agreed or strongly agreed that the programme helped them think more critically about social issues. On confidence in expressing opinions in discussions or academic settings, 95.5 per cent responded positively. These findings describe what participants believed changed for them; future cycles will need baseline measures, work samples and longer-term follow-up to understand how far those perceptions translate into sustained practice.

The strand also provided a rehearsal for university learning itself. Participants listened to academics, encountered difficult concepts, prepared before class and tested ideas with peers. One learner described the experience as feeling like university. That did not mean every session was equally accessible. Dense theory, differences in facilitation and the use of English sometimes created distance. The educational task, then, is not to simplify serious ideas beyond recognition, but to build better bridges into them.

## How the learning experience works

P&P was not designed as a sequence of stand-alone webinars. Each week linked preparation, live learning, dialogue and reflection. Before Perspectives sessions, participants received curated resources so that the conversation could begin with shared material rather than first impressions alone. Live sessions included explanation, questions, whole-group exchange and breakout-room discussion. Afterward, participants were encouraged to write a 300–350-word reflection essay.

The essays were assessed independently by three evaluators using a published ten-point rubric: understanding of the topic; depth of reflection and critical thinking; use of preparatory materials or session insights; and clarity, structure and writing quality. Weekly recognition and end-of-programme awards supported consistency. More importantly, the essays made learning visible. Participants had to move from ‘I attended’ to ‘This is what I understood, questioned and can now articulate.’

The system also created pressure. Some participants found the weekly workload difficult alongside employment, study, unstable internet and other responsibilities. Project Luminary responded by strongly encouraging rather than formally requiring every essay, while retaining scoring and positive incentives. The lesson is not that accountability should disappear. It is that rigorous learning design must account for the unequal time and connectivity available to learners.

Assessment was intentionally transparent. Participants knew what evaluators were looking for and how points were distributed. Three independent evaluators reduced dependence on a single judgement. Yet feedback also showed the next step: writers wanted access to their scores, examples of effective reflection and more formative guidance. A strong assessment system should motivate effort, explain quality and help the learner improve—not simply rank completed work.

## Seven themes, seven invitations to reconsider

The Perspectives curriculum was broad by design, but its themes were connected by recurring questions about power, recognition and responsibility. Social mobility opened with the relationship between background and opportunity. Climate and power moved beyond individual environmental choices to ask how institutions and economic actors shape ecological outcomes. International development invited participants to examine the history, assumptions and unintended consequences that can sit behind the language of aid and progress.

The sessions on identities and invisible labour brought those structural questions close to everyday life. Identity was approached not as a single label but as something shaped by culture, history, social recognition and political conditions. Invisible labour focused attention on unpaid and undervalued work, including emotional and care work that sustains households and communities. For some learners, this was where theory became personal. Survey responses describe new appreciation for mothers’ work and new awareness of beliefs that had previously made such labour seem natural rather than socially organised.

Ethical technology in practice addressed a domain already present in participants’ education: artificial intelligence. The aim was not simply to list acceptable and unacceptable uses. It was to consider judgement, dependence, authorship and responsibility. One participant later wrote that the programme helped reduce their dependence on AI. The reflection system reinforced that principle by asking learners to develop their own reasoning rather than outsource the work of interpretation.

The final theme, ethics, gave participants a vocabulary for questions running through the entire programme. What makes an action right? How should competing duties be weighed? What do individuals owe other people and institutions? Several respondents described ethics as more complex than they had previously assumed. The value of the session was not the delivery of a universal moral formula. It was the recognition that choices rest on reasons that can be examined, challenged and refined.

Participant preferences varied. Some were most engaged by themes closely connected to their lives; others valued topics that introduced a possible university major. A few wanted a broader disciplinary range beyond social studies. This is useful guidance for the curriculum’s future: coherence does not require sameness. Perspectives can retain its concern with society while including science, culture, economics, history, literature or public health—provided each theme invites evidence, interpretation and meaningful dialogue.

## Building a learning community online

In an online programme, care often appears through systems. The P&P team used a Telegram announcement channel, a community group and direct messages for different communication needs. Participants received schedules, Zoom links, calendar invitations, preparatory materials and reminders. A code of conduct set shared expectations for safety, participation and documentation. Attendance was tracked, absence procedures were explained and recordings were shared under defined conditions.

These mechanisms could have felt bureaucratic. Participants instead frequently described them as evidence that their learning was being taken seriously. In the survey, 95.5 per cent agreed or strongly agreed that the programme was well organised and systematically planned; 95.5 per cent said it ran smoothly; and 95.5 per cent said expectations were clear. The strongest result in this group concerned support: all respondents agreed or strongly agreed that they felt supported when they had questions or concerns.

Warmth mattered alongside order. Learners highlighted timely replies, patient clarification and the permission to contribute without ‘perfect English’. Breakout rooms gave some quieter participants a more accessible space to speak. At the same time, feedback showed that not every discussion was equally energetic, and some learners still experienced an English-language barrier. A learning community is not created once; it is renewed through facilitation choices in every session.

Attendance expectations, camera guidance and formal absence procedures were used to make participation accountable. These choices also reveal a tension familiar to online education: presence must be supported and verified without assuming that every learner has stable electricity, privacy or bandwidth. Future cycles can offer alternative ways to demonstrate engagement—short written check-ins, polls, reflection or direct communication—so that accountability does not depend on a single technological signal.

> **P&P participant, anonymous post-programme survey**
> Despite being youth-led, the management was far better than I expected—the organisation of resources, updates, and the balance between flexibility and firmness.

## Partnership as educational continuity

The partnership with ချိတ် (Chate) – The Hook strengthened P&P in two ways. First, it brought specialised college-access experience into the Pathways strand without duplicating an organisation already active in that field. Second, it created a route beyond the general programme. Participants interested in more personalised application support could transition to The Hook for customised advising.

This division of roles illustrates a wider principle in Project Luminary’s development: partnership is most valuable when it creates continuity for learners. P&P could offer a broad, integrated foundation; The Hook could take interested participants further into individual application needs. The partnership also improved resource efficiency, as volunteer instructional contributions replaced a planned honorarium and allowed funds to be redirected to participant recognition.

The collaboration was not frictionless. Delays in communication were noted internally, and future partnerships will benefit from clearer response protocols and shared planning milestones. Treating those operational details as part of educational quality is another lesson of the cycle.

Partnership also changed how resources were used. Because The Hook’s instructors volunteered their time, funds initially considered for instructor honoraria were redirected toward recognition for strong and consistent reflection. The change was practical, but it raises a continuing institutional question: which contributions can responsibly depend on volunteerism, and which forms of labour should be funded as the programme matures? Sustainable partnership requires generosity, clarity and an honest account of cost.

## What participants said—and what the evidence permits us to say

Participant voices are among the richest sources in the P&P record. They describe a programme that made university systems less opaque, introduced unfamiliar social ideas, and created a setting in which discussion felt possible. One participant wrote that the sessions offered ‘a chance to experience higher education’. Another said the programme helped them become less dependent on AI by requiring independent reflection. Several connected themes such as invisible labour, social mobility and ethics to their own families and communities.

The survey also records limits. Learners asked for more application workshops, peer review of essays and portfolios, more interview practice, clearer examples of high-quality reflections, broader Perspectives topics and stronger social connection among participants. Some sessions felt too lecture-heavy; in others, theory did not connect clearly enough to the stated topic. A small number wanted preparatory materials and live teaching to align more closely, although 81.8 per cent valued the broader, complementary approach.

Taken together, the evidence supports several claims: P&P delivered the planned eight-week online experience; most enrolled participants completed; respondents reported stronger knowledge, confidence and critical engagement; and respondents rated programme organisation highly. The evidence does not yet show university admissions, scholarship attainment, durable civic action or long-term changes in behaviour. Those remain outcomes to follow, not achievements to presume.

Even the strongest survey results need context. Twenty-two people responded—75.9 per cent of completers and 64.7 per cent of those who originally enrolled. Each respondent therefore represents about 4.5 percentage points. Anonymous feedback may encourage candour, but it cannot be linked to attendance, essay completion or prior experience. A future evidence system should retain anonymity where appropriate while adding baseline questions, work samples, exit feedback from non-completers and follow-up after university application cycles.

## A programme that also changed its organisation

P&P developed learners, but it also developed Project Luminary. A three-person student-led management team coordinated a network involving participants, partner representatives, volunteer instructors, professors and subject-matter experts. Planning, invitations, safeguarding expectations, scheduling, resource curation, attendance, assessment, participant support and follow-up were held within one operational system.

The programme therefore became an exercise in institution-building. Participant feedback repeatedly noticed the balance between flexibility and firmness, the reliability of communication and the transparent assessment process. These are not glamorous features, but they create trust. For a young organisation, trust is an educational asset and an institutional one.

Efficiency improved as well. According to internal reporting, this cycle used approximately half the financial resources of the earlier pilot while retaining the same core pedagogical and operational framework. That comparison is encouraging, but it should be interpreted carefully: it reflects one cycle, benefited from volunteer contributions and does not prove that every future cycle can be delivered at progressively lower cost. Sustainable quality requires both efficiency and realistic resourcing.

The cycle also exposed organisational concentration. The core team carried responsibilities that had originally been imagined for additional volunteers. That effort helped the programme remain consistent, but heroic workload is not a system. The next stage requires documented workflows, backup ownership, clearer facilitator agreements and leadership succession. Institution-building begins when quality can survive beyond the memory and availability of a few committed people.

## Read the Full Programme Report

[Download the Pilot Programme Public Report (PDF)](https://drive.google.com/file/d/1cp_tFsAHfgeBMohxMKEDCiG7ss_z9d8t/view?usp=drive_link)

## Looking ahead

The next stage of P&P is not simply to repeat the same programme for more people. Scale should deepen quality rather than dilute it. Future cycles can introduce baseline and endline measures, retain anonymised samples of participant work, follow alumni over time and distinguish application knowledge from application outcomes. The Pathways strand can become more workshop-based, with practice in essays, portfolios and interviews. Perspectives can offer clearer scaffolding for complex theory, more varied topics and multiple routes for participation.

Community design also deserves greater attention. Participants asked for activities that help them know one another, alumni discussions after the formal programme, and opportunities to learn from strong reflections. These suggestions point toward P&P as a continuing learning community rather than an eight-week transaction. Any alumni model should remain purposeful, safe and manageable for a small team.

The programme’s future will also depend on what it chooses not to do. A small, student-led organisation cannot meet every applicant’s advising needs, cover every country, or turn every compelling survey response into a new activity. Clear boundaries, selective partnerships and disciplined evidence will protect the programme from expanding faster than its systems. The aim is not maximum activity. It is a dependable learning experience whose depth can be sustained.

At its best, Pathways & Perspectives makes a simple but demanding proposition: education should help young people move forward without asking them to look away from the world around them. A pathway is more meaningful when it is chosen with understanding. A perspective is more useful when it changes how one learns, decides and participates. P&P brings those two movements together—and invites young people to treat higher education not only as a door to enter, but as a responsibility to grow into.

> **P&P participant, anonymous post-programme survey**
> The programme helped me change my perspective and broaden my understanding of the college-preparation process.

## About Project Luminary

Project Luminary is a student-led civic engagement initiative that expands access to purposeful learning for young people from Myanmar. Its programmes connect personal development with critical social engagement, bringing together practical skills, academic inquiry and a commitment to learning that serves communities as well as individuals.`,
    image: '/images/activities/p_and_p/pp_1.png',
    readTime: '8 min read',
    status: 'Previous Activity',
    additionalImages: [
      '/images/activities/p_and_p/pp_2.png',
      '/images/activities/p_and_p/pp_3.png',
      '/images/activities/p_and_p/pp_4.png',
      '/images/activities/p_and_p/pp_5.png',
      '/images/activities/p_and_p/pp_6.png',
      '/images/activities/p_and_p/pp_7.png'
    ]
  },
  {
    id: 'the-foundation-initiative',
    title: 'The Foundation Initiative: Building the foundations for Project Luminary’s next chapter',
    category: 'Organisational Development',
    date: 'July 23, 2026',
    description: 'Project Luminary has learned through delivering programmes that educational access, intellectual development and civic engagement are deeply connected. The Foundation Initiative is its ongoing effort to examine that experience, listen more carefully, study the wider ecosystem and build a more rigorous basis for the decisions that come next.',
    content: `> **Project Luminary**
> Meaningful growth does not always mean doing more. Sometimes, it means understanding more clearly what matters, what is missing, what is already working, and what should be built next.

## Growth can begin with a pause

Not every consequential period in an organisation’s development begins with a new programme. Sometimes the more responsible step is to pause: to examine what experience has revealed, test the assumptions that shaped earlier work and ask what must be understood before moving forward. For Project Luminary, that pause is not a retreat from action. It is the beginning of The Foundation Initiative, an ongoing phase of research, reflection and institutional development.

Project Luminary is a youth-led educational and civic engagement initiative connected with the Parami University community. Its work has sought to expand young people’s access to higher education while strengthening critical thinking, intellectual curiosity, research skills, civic responsibility and engagement with social issues. Several programmes have helped translate that purpose into practice. They have also generated questions that cannot be answered through delivery alone.

The Foundation Initiative is Project Luminary’s response to this point of transition. It creates space to listen, study, evaluate, map the wider ecosystem and look inward at the organisation itself. The work is currently underway, and its findings will emerge in stages. It is intended to inform future decisions—not to justify decisions already made—and it remains open to refinement as new evidence and perspectives emerge.

## Why foundations matter

Launching more activities can look like progress, particularly for a young organisation. Yet expansion without deeper inquiry carries real risks. Programmes may be built around assumptions rather than evidence, duplicate work already offered by others or respond to visible symptoms without addressing the conditions beneath them. Organisational systems can be stretched faster than they can mature.

Activity can be mistaken for lasting change, while short-term funding and unpaid effort obscure questions of sustainability.

The Foundation Initiative reflects a commitment to organisational honesty and disciplined growth. Project Luminary wants to understand not only whether an activity was well received, but why particular elements appeared valuable, for whom they worked, what evidence remains missing and whether the organisation can support them responsibly over time. In this sense, pausing is not inactivity. It is a form of development: the work of strengthening the judgement, systems and evidence on which future action will depend.

## From programme delivery to institutional learning

Project Luminary’s earlier programmes provide the starting point for this inquiry. The Pilot Programme was its first integrated educational model, combining higher-education access support, intellectual development, civic engagement, university-application guidance, guest speakers and discussion-based learning. It tested early assumptions about teaching, participant engagement, communication, programme design and organisational management.

The Lumina Academic Research Consortium (LARC) shifted the emphasis from teaching participants toward enabling youth-led research and knowledge production. Through virtual training, research teams, proposal development, mentorship and research-report production, young people were invited to investigate issues and contribute to public discussion. Pathways & Perspectives (P&P), developed with ချိတ် – The Hook, brought two strands together: practical preparation for educational opportunities and sustained engagement with questions of society, power, identity, ethics, climate, artificial intelligence, development and civic responsibility.

Participant feedback from P&P strongly praised organisation, punctuality, communication, discipline, professionalism, grading systems, participant support and attention to detail. That feedback matters, but it does not by itself demonstrate long-term social impact. The Foundation Initiative will distinguish carefully among what programmes delivered, what participants reported, what organisational changes were observed and what Project Luminary ultimately hopes to contribute over a longer period.

The review will therefore ask which elements appeared most valuable, which systems supported strong experiences and where difficulties repeatedly emerged. Lessons concerning retention, scheduling, English preparedness, attendance verification, participation, assessment, curriculum alignment, long-term support and organisational capacity will be examined rather than set aside. The aim is to decide what should continue, be adapted, integrated or discontinued—and to identify what stronger monitoring and evaluation would need to show.

## Listening before designing

At the centre of the initiative is a commitment to understand young people’s needs and aspirations without presuming them. The inquiry may explore barriers to higher education, scholarship and university information, academic and English-language preparation, application confidence, research and analytical skills, mentorship, professional readiness, financial constraints, networks and social capital. It will also consider intellectual curiosity, exposure to social and global issues, civic participation and the uncertainty many young people face when navigating future pathways.

These questions cannot be answered by treating young people as passive beneficiaries. Their experiences are a form of knowledge. Current and former participants, alumni and other young people can contribute to institutional learning, challenge assumptions and help shape future research and programme design. The initiative is designed to listen to the difference between immediate needs and longer-term aspirations, recognising that what feels urgent today may not fully describe what enables agency over time.

## Understanding the wider ecosystem

Young people do not encounter education, work or civic life through a single organisation. Universities, schools, educators, scholarship providers, community groups, youth-led and civil-society organisations, research institutes, employers, professional networks, mentors, alumni, funders, international organisations, educational-technology providers, training programmes, student associations, volunteer networks and social enterprises all form part of a wider landscape.

Ecosystem mapping is expected to examine what already exists, whom different services reach, where support remains fragmented and what prevents young people from accessing available opportunities. It will also look at overlap: when a partnership, referral pathway or shared resource would create more value than another standalone programme. Project Luminary does not want to duplicate existing efforts merely to increase its own visibility. The more important question is where its capabilities and perspective could add something genuinely useful and distinctive.

This work may involve engagement with educators, researchers, universities, youth organisations, civil-society groups, employers, mentors, advisers, practitioners and funders. Partnership is not being framed as institutional expansion by another name. It is a way to bring complementary expertise into the inquiry, improve access, reduce duplication and make future programme design more credible and responsible.

## Looking inward with equal seriousness

The Foundation Initiative is not only an external needs study. It is also an internal institutional review. Project Luminary intends to examine its mission, identity, programme model, strengths and limitations, together with leadership, governance, decision-making, team capacity, volunteer management, communication, programme operations, documentation and knowledge management.

The review is also expected to consider monitoring and evaluation, safeguarding, partnership practices, funding, financial sustainability, institutional risk and long-term legitimacy. This is not being presented as a crisis or an admission of failure. Young institutions reach points at which informal practices must be made clearer, experience must become organisational memory and commitment must be supported by dependable systems. Institutional maturity requires an organisation to examine itself with the same seriousness it brings to the problems around it.

## From activities to a clearer Theory of Change

One intended outcome of the initiative is a clearer Theory of Change, although that framework is not yet final. Project Luminary wants to move beyond the assumption that delivering an educational activity automatically produces lasting change. Future work may examine how access to information, higher-education opportunities, critical thinking, research skills, confidence, mentorship, intellectual development, civic engagement, networks and professional readiness relate to longer-term agency.

The questions are deliberately demanding: What changes are realistic, for whom and under what conditions? Through which mechanisms might they occur, and over what period? What evidence would demonstrate progress? Which outcomes are within Project Luminary’s influence, and which depend more heavily on wider economic, political, educational or social conditions? Asking these questions should make future claims more precise and future programmes more coherent.

Evidence gathered through The Foundation Initiative is also intended to inform a longer-term strategy, potentially looking toward 2035. That may involve choices about priority problems and groups, core and experimental programmes, delivery frequency, quality, partnerships, alumni engagement, evaluation and organisational structure. No final strategy has been adopted. The purpose of the current process is to create a sound basis for those choices—including the discipline to stop activities that no longer fit.

## Building sustainability without weakening the mission

Long-term educational work cannot depend indefinitely on a small number of grants, donations or unpaid contributors. The Foundation Initiative will explore how Project Luminary might build a more diversified and durable base through institutional partnerships, grants, sponsorships, donor support and, where appropriate, earned-income activity. Possibilities may include training, research or advisory services, educational resources and partnerships with universities or employers that could help subsidise free public programmes.

A social-enterprise model has not been selected. It is one possibility under examination, not a predetermined destination. Any sustainable model would need to support rather than dilute the social mission. That means confronting tensions rather than hiding them: access versus revenue, growth versus quality, mission versus market demand, volunteer energy versus professional staffing, and experimentation versus institutional discipline.

## Research as an ongoing organisational practice

The initiative is an opportunity to strengthen how evidence enters decision-making. Its methods may include needs assessments, surveys, interviews, focus groups, stakeholder consultations, programme reviews, participant feedback, ecosystem mapping, literature reviews, case studies, comparative analysis, outcome indicators and longer-term follow-up. Not all of these methods are necessarily in use at the same time. The research and consultation process is continuing, and the mix of approaches will develop with the questions being examined and the resources available.

The larger ambition is cultural rather than procedural: to make inquiry, documentation and reflection part of how Project Luminary works. Evidence should not be collected only at the end of a programme or used selectively to support a preferred narrative. It should shape decisions while they remain open, preserve lessons beyond individual team members and make the organisation more accountable to participants, partners and its own stated purpose.

## What comes next

The Foundation Initiative is a bridge between an earlier programme-delivery phase and Project Luminary’s longer-term development as a rigorous, sustainable and research-informed institution. Selected findings and updates will be shared over time as the work progresses. Intended future outputs may include a clearer Theory of Change, long-term strategic priorities, stronger organisational systems, a partnership framework and a better-defined approach to sustainability. Each will remain provisional until supported by the continuing inquiry.

The central purpose is not to replace Project Luminary’s mission, but to understand it more deeply: to test the assumptions behind it, learn honestly from previous programmes and build the foundations needed to pursue it responsibly over the long term. The initiative is meant to help Project Luminary develop clearer focus, stronger systems, better evidence, improved organisational memory, sustainable relationships and greater accountability—gradually, without claiming a status it has not yet earned.

## An invitation to contribute

Project Luminary welcomes perspectives from young people, alumni, educators, researchers, youth organisations, universities, civil-society organisations, mentors, employers, funders and institutions working in education or civic development. Opportunities to contribute may include sharing experience, participating in consultations, exploring research collaboration, supporting institutional learning or discussing future partnerships.

This is not an invitation to endorse a finished plan. It is an invitation to participate in an evolving process of inquiry. Following the initiative, raising difficult questions and identifying relevant evidence or complementary work can all help Project Luminary understand where it should contribute—and where collaboration or restraint may be the more responsible choice.

## Ongoing initiative

The Foundation Initiative is currently underway. Its research, consultations and strategic-development activities will continue to evolve. Findings will emerge in stages, and selected updates will be shared as the work progresses. The initiative remains open to refinement as new evidence and perspectives emerge.`,
    image: '/images/home/home_1.png',
    readTime: '7 min read',
    status: 'Ongoing Activity'
  },
  {
    id: 'project-luminary-at-icbms5',
    title: 'From Rote Instruction to Radical Learning: Project Luminary at ICBMS5',
    category: 'Education',
    date: 'July 24, 2026',
    description: 'At Project Luminary, we believe that meaningful education extends beyond classrooms, examinations, and memorization. We are pleased to share that Project Luminary contributed to the Fifth International Conference on Burma/Myanmar Studies (ICBMS5) at Chiang Mai University.',
    content: `At Project Luminary, we believe that meaningful education extends beyond classrooms, examinations, and memorization. It is a continuous process of questioning, dialogue, reflection, and civic engagement. Guided by this philosophy, we are pleased to share that Project Luminary is contributing to the Fifth International Conference on Burma/Myanmar Studies (ICBMS5), hosted by the Regional Center for Social Science and Sustainable Development (RCSD), Faculty of Social Sciences, Chiang Mai University.

Our participation forms part of the conference panel "From Rote Instruction to Radical Learning," which brings together scholars and practitioners to examine how education in Myanmar can move beyond traditional models of instruction toward more participatory, inquiry-based, and transformative approaches to learning.

## Contributing to an International Academic Conversation

For Project Luminary, participating in ICBMS5 represents more than presenting at an academic conference. It is an opportunity to contribute to an international dialogue on one of the most pressing questions facing Myanmar today:

> **Core Conference Question**
> How should education be reimagined in a society undergoing profound change?

While discussions surrounding Myanmar's education system often focus on access, disruption, and institutional challenges, our work explores another important dimension—the culture of learning itself. Through our conference paper, we argue that rebuilding education requires not only restoring access to learning but also reconsidering the educational experiences that shape how young people think, question, collaborate, and participate in society.

## An Emerging Research Initiative

The conference paper draws upon two complementary perspectives.

The first examines educational experiences among university students in Myanmar, exploring how examination-oriented learning, memorization, and classroom dynamics influence students' confidence, critical thinking, and approaches to learning. Conducted by a Parami University undergraduate researcher, this work provides valuable insights into the lived experiences of learners navigating Myanmar's educational landscape.

Building on these findings, the paper then explores Project Luminary as an emerging case study of alternative educational practice. Rather than presenting the initiative as a finished model, the paper reflects on how youth-led educational spaces can experiment with inquiry-based learning, interdisciplinary dialogue, student-led research, and civic engagement as possible responses to longstanding educational challenges.

Importantly, this research remains an ongoing effort. The ideas presented at ICBMS5 represent an early stage in a broader programme of reflection, experimentation, and evidence-building. As Project Luminary continues to grow, we hope to strengthen our understanding of how alternative learning environments can contribute to educational transformation and how their impact can be evaluated more systematically over time.

## Project Luminary as a Living Laboratory

Since its establishment, Project Luminary has sought to create educational experiences that encourage curiosity over certainty and participation over passive learning.

Across our programmes, participants are invited not simply to receive information but to explore complex questions, engage with diverse perspectives, conduct research, and reflect critically on issues affecting their communities. We see education not merely as preparation for examinations or employment, but as a lifelong process of intellectual growth, ethical reflection, and civic responsibility.

Presenting this work at ICBMS5 provides an opportunity to share these experiences with educators, researchers, and practitioners while also learning from others engaged in similar efforts across Myanmar and beyond.

Rather than positioning Project Luminary as a solution, we hope our contribution encourages wider conversations about what meaningful, student-centred, and civic-oriented education might look like in the years ahead.

## Looking Forward

The work presented at ICBMS5 marks the beginning—not the conclusion—of an evolving research journey.

Following the conference, Project Luminary intends to continue refining its educational model, strengthening its monitoring and evaluation practices, and expanding collaboration with educators, researchers, and institutions interested in educational innovation. Future publications and research outputs will further examine the relationship between educational culture, youth agency, and transformative learning in Myanmar.

We believe that educational change is most sustainable when it is built through continuous learning, thoughtful experimentation, and collaboration. As Project Luminary grows, we remain committed to documenting our experiences, sharing our findings openly, and contributing to broader conversations about the future of education in Myanmar.

## About the Authors

This conference paper is led by **Kaung Myat Phyo**, Founder and Project Lead of Project Luminary. The research also incorporates complementary educational research conducted by a Parami University undergraduate researcher, bringing together practitioner and student research perspectives to explore educational transformation in Myanmar.

Project Luminary's participation in ICBMS5 has been supported through the guidance and mentorship of **Dr. Dan Wassner**, Member of the Board of Advisors of Project Luminary, whose academic mentorship and encouragement continue to strengthen the initiative's commitment to rigorous scholarship and meaningful civic engagement.

Project Luminary believes that education should do more than help learners remember information. It should cultivate curiosity, empower critical inquiry, and inspire young people to become active contributors to their communities. Our participation at ICBMS5 is one step in that continuing journey.`,
    image: '/images/logo/PL-Logo.png',
    readTime: '5 min read',
    status: 'Ongoing Activity'
  }
];

export const OPPORTUNITIES_DATA: Opportunity[] = [
  {
    id: 'research-associate-7-26',
    title: 'Research Associate',
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
    isAvailable: false
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
    name: 'Dr. Kyaw Moe Tun',
    position: 'President of Parami University',
    comment: 'Congratulations!!! The Project Luminary, a project designed and implemented by a group of students from Parami University, has been awarded the first winner of the MacJannet Prize for Global Citizenship! I am so proud of your achievement. This award comes with $10,000 prize to support the project.Thank you, MacJannet Prize team, for recognizing the incredible work and impact of these students.',
    image: 'images/logo/PL-Logo-2.png',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Zali Win',
    position: 'Board of Trustees of Parami University',
    comment: 'So proud of these three Parami University students! They came in first in a competitive international contest in which more than 400 colleges and universities were invited to nominate two projects. Their project beat out US Ivies, Oxbridge, and HEC. Project Luminary was selected for its work supporting underserved Burmese youth affected by the 2021 military coup, which severely disrupted education pathways. The initiative delivers free, structured programs that combine access to higher education support, skills development, and civic engagement, enabling students to continue learning and build pathways for the future amid ongoing instability.',
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
