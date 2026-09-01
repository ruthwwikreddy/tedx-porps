import { OrganizerMember, PartnerTier, FAQItem, GalleryItem, UpdateItem } from './event';

export const ORGANIZERS_DATA: {
  leadership: OrganizerMember[];
} = {
  leadership: [
    { id: "org-1", name: "C. Shruthi Reddy", role: "Faculty Incharge & Co-organiser", category: "Leadership" },
    { id: "org-2", name: "Ananya Yelamanchalli", role: "Organiser", category: "Leadership" },
    { id: "org-3", name: "VNS Abhirami Vutla", role: "Organising", category: "Leadership" },
    { id: "org-4", name: "Name Coming Soon", role: "Finance and Sponsorship", category: "Finance" },
    { id: "org-5", name: "Name Coming Soon", role: "Production", category: "Production" },
    { id: "org-6", name: "Name Coming Soon", role: "Volunteer Coordination", category: "Management" },
    { id: "org-7", name: "Name Coming Soon", role: "Design and Documentation", category: "Design" },
    { id: "org-8", name: "Name Coming Soon", role: "Logistics and Hospitality", category: "Logistics" },
    { id: "org-9", name: "Name Coming Soon", role: "Technical Coordination", category: "Technical" },
    { id: "org-10", name: "Name Coming Soon", role: "Photography and Videography", category: "Media" },
    { id: "org-11", name: "Name Coming Soon", role: "Marketing and PR", category: "Marketing" },
    { id: "org-12", name: "Name Coming Soon", role: "Internal Speaker Training", category: "Curation" },
  ]
};

export const PARTNERS_DATA: PartnerTier[] = [
  {
    tierName: "Title Partner",
    description: "Anchor supporter powering the realization of ideas worth spreading.",
    partners: [
      { id: "p-title-1", name: "Title Partner", category: "Official Title Sponsor", tagline: "Championing Knowledge & Global Innovation", logoPlaceholder: "PARTNER 01" }
    ]
  },
  {
    tierName: "Event Partners",
    description: "Collaborators fueling speaker experiences, production, and audio-visual excellence.",
    partners: [
      { id: "p-ev-1", name: "Event Partner Alpha", category: "Production & Media Partner", logoPlaceholder: "PARTNER 02" },
      { id: "p-ev-2", name: "Event Partner Beta", category: "Technology & Sound Partner", logoPlaceholder: "PARTNER 03" },
      { id: "p-ev-3", name: "Event Partner Gamma", category: "Sustainability Partner", logoPlaceholder: "PARTNER 04" }
    ]
  },
  {
    tierName: "Community & Supporting Partners",
    description: "Organisations committed to student empowerment and creative expression.",
    partners: [
      { id: "p-comm-1", name: "Community Partner", category: "Youth Outreach", logoPlaceholder: "PARTNER 05" },
      { id: "p-comm-2", name: "Supporting Partner", category: "Hospitality & Logistics", logoPlaceholder: "PARTNER 06" },
      { id: "p-comm-3", name: "Design Collaborator", category: "Brand & Print", logoPlaceholder: "PARTNER 07" },
      { id: "p-comm-4", name: "Education Affiliate", category: "Academic Research", logoPlaceholder: "PARTNER 08" }
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is TEDx?",
    answer: "In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, TED Talks video and live speakers combine to spark deep discussion and connection in a small group. These local, self-organized events are branded TEDx, where x = independently organized TED event.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "When is the event taking place?",
    answer: "The event is scheduled for 21 November. Doors open in the morning with sessions and experiences continuing throughout the day. Please check the Schedule section for the tentative timeline.",
    category: "Event Day"
  },
  {
    id: "faq-3",
    question: "Where is the event being held?",
    answer: "The event will be hosted at the main auditorium of PORPS YOUTH, Road No. 25, Jubilee Hills, Hyderabad. Dedicated signages and volunteer hosts will assist you upon arrival.",
    category: "Event Day"
  },
  {
    id: "faq-4",
    question: "Who can attend?",
    answer: "TEDx PORPS YOUTH is open to students, educators, innovators, thinkers, and curious minds. Official attendance guidelines and attendee details will be announced soon.",
    category: "Access"
  },
  {
    id: "faq-5",
    question: "Who are the speakers?",
    answer: "Our curatorial team is currently finalizing an exceptional lineup of thinkers, artists, scientists, and changemakers. Speaker names and talk titles will be announced progressively in the Speakers section.",
    category: "Speakers & Theme"
  },
  {
    id: "faq-6",
    question: "What is this year's theme?",
    answer: "The overarching theme is represented by [EVENT THEME]. It serves as a unified lens to explore multi-disciplinary insights, breakthrough questions, and collective hope.",
    category: "Speakers & Theme"
  },
  {
    id: "faq-7",
    question: "What should I expect at the event?",
    answer: "Expect a fast-paced, multi-sensory day filled with captivating 15-18 minute talks, interactive networking hubs, curated student performances, and intellectual conversations with like-minded individuals.",
    category: "Event Day"
  },
  {
    id: "faq-8",
    question: "Will there be a livestream?",
    answer: "Broadcast details and online streaming access information will be announced closer to the event date. Follow our official channels for real-time announcements.",
    category: "Access"
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
    date: "Coming Soon",
    badge: "Announcement",
    title: "Official Theme & Visual Identity Reveal",
    summary: "The creative and curatorial team will officially unveil the concept narrative, typography manifesto, and conceptual artwork for [EVENT THEME].",
    readTime: "2 min read"
  },
  {
    id: "up-2",
    date: "Coming Soon",
    badge: "Speaker Reveal",
    title: "Phase I Speaker Lineup Announcement",
    summary: "Introducing our first three speakers spanning the frontiers of neuroscience, computational design, and public grassroots reform.",
    readTime: "3 min read"
  },
  {
    id: "up-3",
    date: "Coming Soon",
    badge: "Behind The Scenes",
    title: "Inside the Stage Design & Experience Studio",
    summary: "Get a sneak peek into the student-led workshop building the interactive physical installations and digital visual backdrops.",
    readTime: "4 min read"
  }
];
