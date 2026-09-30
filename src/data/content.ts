import { OrganizerMember, PartnerTier, FAQItem, GalleryItem, UpdateItem } from './event';

export const ORGANIZERS_DATA = {
  leadership: [
    { id: "org-1", name: "Ms. C. Shruti Reddy", role: "Teacher Organiser", category: "Leadership" as const },
    { id: "org-2", name: "Yelamanchili Ananya", role: "Co-Organiser", category: "Leadership" as const },
    { id: "org-3", name: "Abhirami Vutla", role: "Co-Organiser", category: "Leadership" as const },
  ],
  executiveBoard: [
    {
      department: "Photography & Videography Head",
      heads: ["Sista Vanshika", "Srinidhi Nerella"],
      badge: "Media"
    },
    {
      department: "Technical Coordination Head",
      heads: ["Vignesh Nethi", "Yedla Samuel Peter", "Keshav Agarwal"],
      badge: "Tech"
    },
    {
      department: "Logistics & Hospitality Head",
      heads: ["S. Jyotsna", "A. Sri Parnitha"],
      badge: "Logistics"
    },
    {
      department: "Volunteer Coordination Head",
      heads: ["Nischaya", "Saharsh Rao Juvvadi"],
      badge: "Operations"
    },
    {
      department: "Head of Food & Beverage (F&B)",
      heads: ["Vishesh Jain", "Ishan Samatrya"],
      badge: "Hospitality"
    },
    {
      department: "Design & Documentation Head",
      heads: ["Akkenapally Ruthwik Reddy", "G. Sanvi Sree"],
      badge: "Creative & Web"
    },
    {
      department: "Internal Speaker Training Head",
      heads: ["Sindusha", "Nidhi More"],
      badge: "Curation"
    },
    {
      department: "Finance & Sponsorship Head",
      heads: ["Anagha Swara", "Kaustaub Sreekar", "Raga Pranavi Emmadi"],
      badge: "Finance"
    },
    {
      department: "Production Head",
      heads: ["Yukthi Reddy", "Yash S Parekh"],
      badge: "Stage & AV"
    },
    {
      department: "Marketing & PR Head",
      heads: ["Sanvriti M", "G Srinidhi"],
      badge: "Communications"
    }
  ]
};


export const PARTNERS_DATA: PartnerTier[] = [
  {
    tierName: "Official Sponsorship Package",
    description: "Structured at ₹50,000+ to empower production excellence, audio-visual recording, and attendee experiences.",
    partners: [
      { id: "p-sp-1", name: "Social Media Promotion", category: "Digital Touchpoint", tagline: "Prominent featured announcements across official channels", logoPlaceholder: "DIGITAL" },
      { id: "p-sp-2", name: "Event-Space Branding", category: "Physical Touchpoint", tagline: "Architectural placement within conference hall and stage views", logoPlaceholder: "BRANDING" },
      { id: "p-sp-3", name: "Dedicated Stall Opportunity", category: "Engagement Hub", tagline: "Interactive physical presence and delegate experience booth", logoPlaceholder: "STALL" },
      { id: "p-sp-4", name: "Video & Livestream Recognition", category: "Broadcast", tagline: "Pre-roll acknowledgements in official TEDx archival recordings", logoPlaceholder: "BROADCAST" },
      { id: "p-sp-5", name: "On-Event Verbal Recognition", category: "Main Stage", tagline: "Formal curator address recognition during opening and closing ceremonies", logoPlaceholder: "KEYNOTE" },
      { id: "p-sp-6", name: "Sponsor Thank-You & Commendation", category: "Honors", tagline: "Official memento, certificate of appreciation, and post-event recap", logoPlaceholder: "COMMENDATION" }
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is TEDxPORPS Youth 2026?",
    answer: "TEDxPORPS Youth is an independently organized, student-led TEDx event operated under official license from TED Conferences LLC (approved on 21 August 2026). Held at P. Obul Reddy Public School, Jubilee Hills, Hyderabad, our platform brings together inspiring voices to challenge conventional wisdom.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "When and where is the event happening?",
    answer: "The event is scheduled for 21 November 2026 at the Main Auditorium of P. Obul Reddy Public School, Road No. 25, Jubilee Hills, Hyderabad. Delegate registration opens at 08:30 AM IST.",
    category: "Event Day"
  },
  {
    id: "faq-3",
    question: "What is this year's official theme?",
    answer: "The official theme for 2026 is 'THE WEIGHT OF EXPECTATIONS'. We dissect the invisible pressures framing modern youth development across five core dimensions: Family, School, Society, Culture, and Ourselves.",
    category: "Speakers & Theme"
  },
  {
    id: "faq-4",
    question: "Who are the speakers on stage?",
    answer: "Our tentative lineup includes Prof. J. Anuradha Jonnalagadda (Academic & Research), Ms. B. V. Nandini Reddy (Film & Narrative), Ms. Amala Akkineni (Conservation & Arts), and Mr. Pawan Kumar Chandana (Co-Founder & CEO, Skyroot Aerospace). Lineup is tentative and subject to final confirmation.",
    category: "Speakers & Theme"
  },
  {
    id: "faq-5",
    question: "How can students purchase tickets?",
    answer: "Official Student Passes are available at ₹1200 exclusively through our online booking portal. The pass includes full event access, welcome delegate kit, priority seating, and an official Certificate of Participation. Payment is completed securely via UPI.",
    category: "Access"
  },
  {
    id: "faq-6",
    question: "How can organizations partner or sponsor?",
    answer: "We welcome forward-thinking organizations to support youth innovation. Our sponsorship opportunity starts at ₹50,000 with comprehensive digital, stage, stall, and video benefits. You can view and download the full Sponsorship Proposal (PDF/PPT) on our site or contact our organizing team directly.",
    category: "General"
  },
  {
    id: "faq-7",
    question: "Who can I contact for direct queries?",
    answer: "You can reach Co-Organiser Yelamanchili Ananya (yananyaanu@gmail.com, 8977540506), Co-Organiser Abhirami Vutla (Abhiramivutla@gmail.com, +91 99593 02051), or Teacher Organiser Ms. C. Shruti Reddy (+91 91 77071 678).",
    category: "General"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  { id: "gal-1", title: "Main Stage Light & Ambience", category: "Stage", aspect: "landscape", caption: "", placeholderColor: "from-neutral-900 to-neutral-800" },
  { id: "gal-2", title: "Speaker in Deep Reflection", category: "Conversations", aspect: "portrait", caption: "", placeholderColor: "from-neutral-900 via-red-950/40 to-neutral-900" },
  { id: "gal-3", title: "Audience Engagement & Curiosity", category: "Audience", aspect: "square", caption: "", placeholderColor: "from-neutral-800 to-neutral-900" },
  { id: "gal-4", title: "Student Organizers Behind The Scene", category: "Behind The Scenes", aspect: "portrait", caption: "", placeholderColor: "from-neutral-900 to-red-900/30" },
  { id: "gal-5", title: "Campus Courtyard & Installation Hub", category: "Campus", aspect: "landscape", caption: "", placeholderColor: "from-neutral-900 to-neutral-800" },
  { id: "gal-6", title: "Spontaneous Post-Talk Exchange", category: "Conversations", aspect: "square", caption: "", placeholderColor: "from-neutral-950 to-neutral-900" },
  { id: "gal-7", title: "Speaker Podium & Red Circle", category: "Stage", aspect: "landscape", caption: "", placeholderColor: "from-red-950/50 to-neutral-900" },
  { id: "gal-8", title: "Student Collaborative Workshop", category: "Conversations", aspect: "portrait", caption: "", placeholderColor: "from-neutral-900 to-neutral-800" },
  { id: "gal-9", title: "Lighting Rig & Audio Engineering", category: "Behind The Scenes", aspect: "square", caption: "", placeholderColor: "from-neutral-950 via-neutral-900 to-neutral-950" },
  { id: "gal-10", title: "Creative Art Showcase Installation", category: "Campus", aspect: "landscape", caption: "", placeholderColor: "from-neutral-900 to-red-950/40" },
  { id: "gal-11", title: "Audience Standing Ovation", category: "Audience", aspect: "square", caption: "", placeholderColor: "from-neutral-800 to-neutral-900" },
  { id: "gal-12", title: "Closing Moment & Speaker Gathering", category: "Stage", aspect: "portrait", caption: "", placeholderColor: "from-neutral-900 via-neutral-800 to-neutral-950" }
];

export const UPDATES_DATA: UpdateItem[] = [
  {
    id: "up-1",
    date: "21 August 2026",
    badge: "Announcement",
    title: "Official TEDx License Approved by TED",
    summary: "TEDx Applications has officially confirmed the approval of the TEDxPORPS Youth license for the 2026 edition at P. Obul Reddy Public School.",
    readTime: "2 min read"
  },
  {
    id: "up-2",
    date: "September 2026",
    badge: "Speaker Reveal",
    title: "Official Theme & Tentative Speakers Revealed",
    summary: "Introducing our 2026 theme 'The Weight of Expectations' alongside tentative keynote voices across science, film, aerospace, and cultural scholarship.",
    readTime: "3 min read"
  },
  {
    id: "up-3",
    date: "Active Now",
    badge: "Production",
    title: "Student Pass Bookings Opened (₹1200)",
    summary: "Official student delegate pass booking is now live. Secure your confirmed seat, delegate kit, and participation credentials.",
    readTime: "1 min read"
  }
];

