import { Course, CompletedTraining } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'public-admin-strategies',
    title: 'Advanced Public Administration Strategies',
    category: 'Governance',
    subcategory: 'Governance & Leadership',
    badges: ['AI-Enhanced Policy', 'Leadership'],
    description: 'This comprehensive course equips officers with foundational and advanced methods for modern public administration, including technology integration and policy enforcement tactics.',
    longDescription: [
      'The "Advanced Public Administration Strategies" course at the Administrative Training Institute (ATI) Sikkim is designed for seasoned administrators aiming to synchronize traditional bureaucracy with cutting-edge governance frameworks.',
      'Through clinical analysis of case studies across developed states, participants will master the skills needed to design, validate, and roll out complex government programs under modern constraints. Accent is put on dynamic public finance oversight and decentralized authority protocols.'
    ],
    prerequisites: 'Minimum 3 years of Gazetted Service; recommended for under-secretaries and above.',
    duration: '2 Weeks (Full-time)',
    faculty: 'Shri Gariman Bhutia, IAS',
    facultyTitle: 'Senior Advisor, Department of Personnel',
    facultyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    deadline: 'October 24, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP_zwG7SbkPJvEhMXfugLq5r1cJuk0-Dd0kbanw4lp-FQLtNo9Dxug9pn8mJkxcBuVY3uuSloUqgWqPTBC27cl0ed0kGY7TUy9Q1JvYFW_cFl2A06bASlvAIXaKReqCleymk3ouu6Kqlyg7DDao6GlMqYNKU9noAAfCjPR_KMdKyVKsBkiKEe4IBzk0jNpZx7weD5uRVw6sPhjZoFR34bV4ctrBJqS4u7vVz2y7rZlvIsuVmD_yW_K',
    location: 'ATI Seminar Room 1, Gangtok',
    objectives: [
      'Examine policy architecture and decentralized structural governance model implementation.',
      'Incorporate state-of-the-art technological auditing for resource disbursement tracking.',
      'Review executive crisis control guidelines under extreme constraints.',
      'Enhance leadership frameworks for mid-career transition administration.'
    ]
  },
  {
    id: 'ethics-digital-governance',
    title: 'Ethics in Digital Governance & Citizen Service',
    category: 'Public Policy',
    subcategory: 'Public Policy',
    badges: ['Digital Ethics', 'E-Governance'],
    description: 'Examines moral obligations, transparency, and accountability measures for civil servants administering digital services to rural and urban populations.',
    longDescription: [
      'As service delivery transitions to computerized networks, administrators possess unprecedented leverage over resource gateways. This course probes the legal, moral, and procedural challenges associated with modern digital state services.',
      'Participants will detail accountability standards, evaluate digital data bias, and establish metrics to assure inclusive access for remote rural populations in Sikkim, aligned with national standards.'
    ],
    prerequisites: 'Basic computer literacy and understanding of citizen charters.',
    duration: '3 Weeks (Hybrid)',
    faculty: 'Dr. Lobsang Choden',
    facultyTitle: 'Professor of Public Ethics',
    facultyAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120',
    deadline: 'November 05, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp51B8_FE2NbzWavjwE53ZJDyNHFQqC0QlCJrmIDjfTjWciN17gADqRVQU6Pf-AFrAr5ZpwlqDo70UoHgXHt8FDX97QxTZgACbR3Ak_R2lDFEQNdslIz2uMcTLzKYO7g43axlmXZj-LVMsNrlZYqWpKae6ag9o2RKVhCKTm3mgKwTLM9sTc9aI_NE7frtS-d_ev4QjYi19rZ3DXhoJBgiG5QKvkTKQiJYNqL9Unp--rLx_59DQjdJ_',
    location: 'ATI IT Auditorium, Gangtok',
    objectives: [
      'Define accountability matrices for multi-tier e-services.',
      'Minimize algorithmic bias in database systems for citizen benefits distribution.',
      'Audit state digital security procedures in high-exposure field environments.',
      'Implement feedback loops designed to preserve human rights in digitizing ecosystems.'
    ]
  },
  {
    id: 'civil-services-rules',
    title: 'Sikkim Civil Services (Conduct) Rules 2024',
    category: 'Public Policy',
    subcategory: 'Institutional Law',
    badges: ['Legal Framework', 'State Policy'],
    description: 'A deep dive into updated conduct protocols, discipline guidelines, asset disclosure requirements, and code of ethics enforced across state administrative bodies.',
    longDescription: [
      'Compliance with standard conduct rules represents the foundation of official state service. This intensive seminar analyzes the freshly codified Sikkim Civil Services (Conduct) Rules.',
      'Topics include asset registry reporting obligations, social media communication guidelines, conflict-of-interest indicators, and administrative penalty procedures. Essential for every officer desirous of maintaining impeccable disciplinary records.'
    ],
    prerequisites: 'All permanent Sikkim state service employees; mandatory for probationers.',
    duration: '1 Week (Intensive)',
    faculty: 'Justice (Retd) S. P. Wangdi',
    facultyTitle: 'Former Judge & Administrative Law Authority',
    facultyAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    deadline: 'November 12, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVci5xOoiffw3wgGr7bS2PAIPN2oDV2tddVafigTT7C-m4ISsS3rqoF2q2WxHmUXPZ4mOKUgaOncLyW6qVCJbaDVmSTaMFi5XJxKCyuqG3i9ZXKYGwRVQABRrtirU2ssCsWurEUpC4QIHDofHMiCugwdhR_dHJAqFicEjfpgDOFB-CcbSUMyHy_WWlEVqaVUDUhv-SH6UmE5hvpr0x9aa0oZL8qGTmI2U97M018a7qI8A6qn8LgoP5',
    location: 'ATI Lecture Hall 2, Gangtok',
    objectives: [
      'Acknowledge boundaries regarding social media communication and government directives.',
      'Deconstruct the complex requirements for periodic filing of immovable/movable assets.',
      'Recognize explicit and hidden conflict-of-interest scenarios in vendor evaluations.',
      'Explain the standard disciplinary workflow from official charge sheet to final inquiry report.'
    ]
  },
  {
    id: 'performance-management',
    title: 'Performance Management for Senior Staff',
    category: 'Governance',
    subcategory: 'Management',
    badges: ['HRM', 'Operations'],
    description: 'Designed for senior officers to design performance benchmarks, conduct objective appraisals, and manage departmental productivity.',
    longDescription: [
      'This advanced management program targets senior leaders looking to rebuild departmental execution metrics from the ground up.',
      'Participants will learn methods to formulate realistic key result areas (KRAs), manage underachieving divisions, and integrate human-centric motivation parameters. Focuses on transforming standard appraisal routines into genuine engines of public sector efficiency.'
    ],
    prerequisites: 'Level 10 Gazetted rank or above.',
    duration: '2 Weeks (Full-time)',
    faculty: 'Smt. Pranaya Rai',
    facultyTitle: 'Director, Department of Personnel, Government of Sikkim',
    facultyAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    deadline: 'December 01, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc-mMeU77Lrd2k5FpiSkdzR4nW574UCQK2AtLBtRe2LUVmjQ8ZIiQH9RO1Yr9bKP-rTeM9YQSIiSCVdrpix1kAnRL9kJcRy2dw-8AIfMWqeZJ_5GulANA-c3m3jSx-7vLpf5X3IlrMnIz_vLeuraBkBSg3NdFHA8zzPQGhedAA-NuJk37gfqvmg_f6se18e2m-fxYb4ucHN38vciwI5sgWRWKNWT55oXp3Xye-iKYq6aScGOq-Tryu',
    location: 'ATI Conference Room B, Gangtok',
    objectives: [
      'Deconstruct classical performance models and translate them to civil service operations.',
      'Formulate objective KPI frameworks tailored to non-transactional state divisions.',
      'Conduct highly constructive, conflict-free annual appraisal reviews.',
      'Develop talent management pipelines inside long-established administrative units.'
    ]
  },
  {
    id: 'cybersecurity-state-data',
    title: 'Cyber-Security Protocol for State Data',
    category: 'IT & Digital',
    subcategory: 'Security',
    badges: ['Data Privacy', 'IT Security'],
    description: 'Essential technical protocols, cyber threat vectors, and data security policies prescribed to safeguard sensitive state governmental assets and information.',
    longDescription: [
      'Government databases remain high-priority targets for cyber-espionage and data theft. This course details the comprehensive protocols designed by technical experts to build robust perimeters around state secrets.',
      'Through simulation labs, officers learn how to intercept spear-phishing routines, safely manage encrypted documents, and respond with speed and precision during critical breach events.'
    ],
    prerequisites: 'Basic digital infrastructure awareness.',
    duration: '1 Week (Intensive)',
    faculty: 'Shri Karma Tenzing',
    facultyTitle: 'Senior Chief Architect, State IT Cell',
    facultyAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120',
    deadline: 'October 28, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeFh8uHdL5dtEBSVHC5OiMAzkPAT8LsUlDcu_fd7JwHmWHl0AgOEVvub2XB-RrD41Q3EwUKlBwP0Ui9o8nshv0UaQNgtVGeRTGTxi1ftO1TSR2e-49Pg1jgi-ViTOZCBpp_o1Moq7rW4FCCZKmgKXrhE8B5RkXP2Y26hFYYdrbsAmPXbzTQJ2iTEZZa3A9dHxFcTl0hTX2IfafkAGsyHARHUfOeAn6vhNKeFqVrgtFwNNk5RiwqaEE',
    location: 'ATI Cybersecurity Joint Lab, Gangtok',
    objectives: [
      'Audit existing department servers for systemic security vulnerabilities.',
      'Recognize and intercept advanced phishing and credential harvesting architectures.',
      'Execute correct chain-of-custody rules for digital files during a live security breach.',
      'Apply secure file storage protocols and mandatory user-access privilege hierarchies.'
    ]
  },
  {
    id: 'public-admin-digital-age',
    title: 'Public Administration & Strategic Governance in the Digital Age',
    category: 'Public Policy',
    subcategory: 'Public Policy',
    badges: ['Advanced Module', 'Strategic IT'],
    description: 'This comprehensive 4-week program is designed for senior administrative officers to navigate the complexities of digital transformation within the Sikkim state machinery.',
    longDescription: [
      'This comprehensive 4-week program is designed for senior administrative officers to navigate the complexities of digital transformation within the Sikkim state machinery.',
      'The "Public Administration & Strategic Governance in the Digital Age" course at the Administrative Training Institute (ATI) Sikkim represents our flagship program for the current fiscal year. As the Government of Sikkim accelerates its digital-first initiatives, civil servants must possess the frameworks and technical literacy required to lead these transitions effectively.',
      'This curriculum bridges traditional public policy theory with modern data-driven decision-making processes. Participants will explore case studies of successful governance models from across India and Southeast Asia, adapting those lessons to the unique geographical and demographic context of Sikkim.'
    ],
    prerequisites: "Minimum 5 years of Gazetted Service; Grade 'A' performance appraisal.",
    duration: '4 Weeks (Full-time)',
    faculty: 'Dr. Rajesh Tshering',
    facultyTitle: 'Director, Administrative Training Institute, Sikkim',
    facultyAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120',
    deadline: 'October 15, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2y3l_vItPdkg-FScL9nWYrQRWHwKk_Z7-FDSQu5Boq3tWH1Uh1M5qjrW7DKrllWRiMZO30O2P2cKD1c_euL7dgJLmhk3VxjEx419DHYcQ5iX7H4pRWZ2G0A-pkpcjup7H3HNzatCihbEMQvV4yguNPGd0ZgBDu99Bcp9I55rtQOny5lj57xihkJ63DdBg3ls06oUpVmo-eqWWBQHeqrehms23osDt8gIV80vw63odE7_kv_QdAnGF',
    location: 'Main Lecture Hall, ATI Complex, Gangtok',
    objectives: [
      'Implementation of the National e-Governance Plan (NeGP) at the block and district levels.',
      'Advanced crisis management protocols using real-time surveillance and GIS mapping.',
      'Ethical frameworks for AI application in citizen service delivery.',
      'Financial management and transparency through integrated state accounting systems.'
    ]
  },
  {
    id: 'municipal-finance-budgeting',
    title: 'Municipal Finance & Capital Budgeting Methods',
    category: 'Finance',
    subcategory: 'Municipal Finance',
    badges: ['Finance', 'Capital Assets'],
    description: 'Practical training on municipal accounting standards, revenue generation mechanisms, and asset management models for urban local body administrators.',
    longDescription: [
      'Managing municipal finance requires a delicate balance of public interest and fiscal discipline. This course details treasury management techniques specifically created for Urban Local Bodies (ULBs).',
      'Topics include public-private partnership structural designs, capital asset accounting models, service tariff structures, and municipal bond rating guidelines.'
    ],
    prerequisites: 'Recommended for officers connected to municipal corporations and finance tasks.',
    duration: '2 Weeks',
    faculty: 'Shri Pintso Lepcha',
    facultyTitle: 'Commissioner, Treasury Audit',
    facultyAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120',
    deadline: 'November 22, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp51B8_FE2NbzWavjwE53ZJDyNHFQqC0QlCJrmIDjfTjWciN17gADqRVQU6Pf-AFrAr5ZpwlqDo70UoHgXHt8FDX97QxTZgACbR3Ak_R2lDFEQNdslIz2uMcTLzKYO7g43axlmXZj-LVMsNrlZYqWpKae6ag9o2RKVhCKTm3mgKwTLM9sTc9aI_NE7frtS-d_ev4QjYi19rZ3DXhoJBgiG5QKvkTKQiJYNqL9Unp--rLx_59DQjdJ_',
    location: 'ATI Room 4, Gangtok',
    objectives: [
      'Master the double-entry accounting updates for municipal treasury reports.',
      'Formulate sustainable user-fee systems for city waste management and local water grids.',
      'Structure robust procurement tenders following strict Central Vigilance Commission guidelines.',
      'Monitor and evaluate public capital assets leveraging GIS-linked data matrices.'
    ]
  },
  {
    id: 'disaster-resilience-hills',
    title: 'Disaster Resilience & Landslide Risk Management in Hill Areas',
    category: 'Disaster Management',
    subcategory: 'Disaster Studies',
    badges: ['Disaster Mgmt', 'Climate Resilience'],
    description: 'Critical protocols for hazard mapping, landslide warning networks, emergency shelters, and relief logistics customized for the mountainous terrains of Sikkim.',
    longDescription: [
      'Sikkim’s fragile Himalayan environment places it at severe risk of seismic activity and violent cloudburst-induced landslides. This course reviews specialized hill disaster risk management methodologies.',
      'Participants will use real-world GIS simulation toolkits, detail safe drainage systems for hillside developments, and run rapid inter-departmental relief deployment exercises.'
    ],
    prerequisites: 'Open to all departments; highly recommended for district administrators and rural engineering staff.',
    duration: '2 Weeks (Intensive + Fieldwork)',
    faculty: 'Smt. Tshering Yangkey',
    facultyTitle: 'Chief Coordinator, State Disaster Response Authority',
    facultyAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120',
    deadline: 'December 10, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeFh8uHdL5dtEBSVHC5OiMAzkPAT8LsUlDcu_fd7JwHmWHl0AgOEVvub2XB-RrD41Q3EwUKlBwP0Ui9o8nshv0UaQNgtVGeRTGTxi1ftO1TSR2e-49Pg1jgi-ViTOZCBpp_o1Moq7rW4FCCZKmgKXrhE8B5RkXP2Y26hFYYdrbsAmPXbzTQJ2iTEZZa3A9dHxFcTl0hTX2IfafkAGsyHARHUfOeAn6vhNKeFqVrgtFwNNk5RiwqaEE',
    location: 'ATI Seminar Hall 3 & Field Sites',
    objectives: [
      'Deconstruct terrain stability maps to coordinate land-use permit allocations.',
      'Integrate early warning sensor alerts into local community panic notification protocols.',
      'Deploy localized supply distribution hubs capable of remaining self-reliant during road blockages.',
      'Conduct rapid high-altitude search-and-rescue simulations representing diverse mudslide environments.'
    ]
  },
  {
    id: 'sustainable-tourism-policy',
    title: 'Sustainable Tourism Planning & Himalayan Eco-Policy',
    category: 'Public Policy',
    subcategory: 'Eco-Policy',
    badges: ['Eco-Policy', 'Tourism'],
    description: 'Strategic frameworks for state regulators to align massive tourism inflow with conservation standards, water preservation and waste-free high-altitude ecology.',
    longDescription: [
      'Tourism drives primary state revenues but exerts substantial stress on local garbage treatment and fresh water pipelines. This policy course addresses sustainable planning parameters.',
      'Developed with forestry authorities, it covers carrying-capacity evaluations, home-stay incentive plans, and local community cooperative management models.'
    ],
    prerequisites: 'Open to administrative and administrative-allied departments.',
    duration: '1 Week',
    faculty: 'Shri Sonam Gyatso Bhutia',
    facultyTitle: 'Senior Tourism Policy Expert',
    facultyAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120&h=120',
    deadline: 'December 18, 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVci5xOoiffw3wgGr7bS2PAIPN2oDV2tddVafigTT7C-m4ISsS3rqoF2q2WxHmUXPZ4mOKUgaOncLyW6qVCJbaDVmSTaMFi5XJxKCyuqG3i9ZXKYGwRVQABRrtirU2ssCsWurEUpC4QIHDofHMiCugwdhR_dHJAqFicEjfpgDOFB-CcbSUMyHy_WWlEVqaVUDUhv-SH6UmE5hvpr0x9aa0oZL8qGTmI2U97M018a7qI8A6qn8LgoP5',
    location: 'ATI Room 2, Gangtok',
    objectives: [
      'Integrate ecological conservation laws directly into tourist zoning permits.',
      'Design sustainable circular economic grants that support local homestays.',
      'Formulate comprehensive high-altitude mountain garbage management blueprints.',
      'Calculate carrying capacity limits of ecological hot-spots leveraging modern data metrics.'
    ]
  }
];

export const DEPARTMENTS = [
  'Finance Department',
  'IT & Digital Technology',
  'Home Department',
  'Tourism & Civil Aviation',
  'Education Department',
  'Rural Development',
  'Health & Family Welfare',
  'Forest, Environment & Wildlife Management',
  'Urban Development & Housing'
];

export const INITIAL_COMPLETED_TRAININGS: CompletedTraining[] = [
  {
    id: 'comp-1',
    title: 'Digital Land Records Integration Initiative',
    completionDate: 'March 2026',
    details: 'State-wide training for 38 sub-registrars and circle officers on state-of-the-art visual GIS databases, micro-demographic land registries, and secure cryptographic signatures for high-altitude Himalayan sectors.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=400',
    participantsCount: 38,
    duration: '10 Days',
    department: 'IT & Digital Technology',
    tags: ['E-Governance', 'GIS', 'Security', 'Digital']
  },
  {
    id: 'comp-2',
    title: 'Public Sector Audit & Treasury Management Course',
    completionDate: 'February 2026',
    details: 'Specialized syllabus on updating state compliance audits and double-entry book balancing registers. 52 administrative accounts experts successfully certified under senior CA supervisors.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=400',
    participantsCount: 52,
    duration: '2 Weeks (Full-time)',
    department: 'Finance Department',
    tags: ['Finance', 'Audit', 'Accounts', 'Compliance']
  },
  {
    id: 'comp-3',
    title: 'Himalayan Forest Conservancy & Ecological Policy Program',
    completionDate: 'January 2026',
    details: 'Focused on aligning tourist waste guidelines with state micro-drainage systems. Trained 30 high-altitude forest rangers on flora defense and GIS animal migration tracking maps.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600&h=400',
    participantsCount: 30,
    duration: '1 Week (Intensive)',
    department: 'Forest, Environment & Wildlife Management',
    tags: ['Eco-Tourism', 'Policy', 'Conserve', 'Climate']
  },
  {
    id: 'comp-4',
    title: 'Emergency Response & Mountain Landslide Rescue Simulation',
    completionDate: 'November 2025',
    details: 'Active fieldwork drills completed by 44 subdivisional disaster leads. Designed state-of-the-art blueprints for block-level communication links and remote landslide alert sirens.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600&h=400',
    participantsCount: 44,
    duration: '2 Weeks (Tactical Fieldbound)',
    department: 'Home Department',
    tags: ['Disaster Mgmt', 'Resilience', 'Crisis', 'Fieldwork']
  }
];

