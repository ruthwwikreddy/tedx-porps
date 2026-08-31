export interface Speaker {
  id: string;
  name: string;
  profession: string;
  organization?: string;
  talkTitle: string;
  category: string;
  bio: string;
  whyMatters: string;
  image: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  placeholderIndex: number;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  category: 'Registration' | 'Ceremony' | 'Talk' | 'Break' | 'Interactive' | 'Closing';
  description: string;
  speaker?: string;
  venue?: string;
}

export interface OrganizerMember {
  id: string;
  name: string;
  role: string;
  category: 'Leadership' | 'Curation' | 'Production' | 'Design & Media' | 'Logistics' | 'Student Core';
  image?: string;
}

export interface PartnerTier {
  tierName: string;
  description: string;
  partners: {
    id: string;
    name: string;
    category: string;
    tagline?: string;
    logoPlaceholder: string;
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Event Day' | 'Speakers & Theme' | 'Access';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Stage' | 'Audience' | 'Behind The Scenes' | 'Campus' | 'Conversations';
  aspect: 'square' | 'portrait' | 'landscape';
  caption: string;
  placeholderColor: string;
}

export interface UpdateItem {
  id: string;
  date: string;
  badge: 'Announcement' | 'Speaker Reveal' | 'Behind The Scenes' | 'Production';
  title: string;
  summary: string;
  readTime: string;
}

export const EVENT_CONFIG = {
  name: "TEDx P. Obul Reddy Public School",
  schoolName: "P. Obul Reddy Public School",
  shortName: "TEDxPORPS",
  dateText: "21 NOVEMBER",
  eventDateISO: "2026-11-21T09:00:00+05:30",
  year: "2026",
  theme: "[EVENT THEME]",
  themeSubtitle: "One theme. Many perspectives.",
  themeDescription: "A collective exploration of transformative breakthroughs, bold voices, and the emergent ideas shaping tomorrow. The official theme statement will be unveiled as the countdown continues.",
  tagline: "A day of ideas, conversations and perspectives worth spreading.",
  venue: {
    name: "P. Obul Reddy Public School Auditorium",
    address: "Road No. 25, Jubilee Hills, Hyderabad, Telangana 500033",
    mapEmbedUrl: "",
    city: "Hyderabad, India"
  },
  contact: {
    email: "tedx@porps.edu.in",
    instagram: "@tedxporps",
    instagramUrl: "https://instagram.com",
    twitter: "@tedxporps",
    linkedin: "tedx-porps"
  },
  disclaimer: "This independent TEDx event is operated under license from TED.",
  // Architecture prepared for future ticketing/booking integration without layout refactoring
  BOOKING_ENABLED: false,
  bookingCtaText: "Register / Book Your Spot",
  bookingUrl: "#"
};
