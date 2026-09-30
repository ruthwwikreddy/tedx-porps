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
  category: 'Leadership' | 'Curation' | 'Production' | 'Design & Media' | 'Logistics' | 'Student Core' | 'Finance' | 'Management' | 'Design' | 'Technical' | 'Media' | 'Marketing';
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
  name: "TEDxPORPS Youth 2026",
  schoolName: "P. Obul Reddy Public School",
  shortName: "TEDxPORPS Youth",
  dateText: "21 NOVEMBER",
  eventDateISO: "2026-11-21T09:00:00+05:30",
  year: "2026",
  theme: "THE WEIGHT OF EXPECTATIONS",
  themeSubtitle: "Examining the invisible pressures that frame modern development.",
  themeDescription: "Every generation inherits structures built long before their birth. This year, we dissect the burden placed on youth across five core dimensions: Family, School, Society, Culture, and Ourselves.",
  tagline: "The next ideas start here. A student-led crucible for transformative local ideas, global mindsets, and unfiltered dialogue.",
  venue: {
    name: "P. Obul Reddy Public School Auditorium",
    address: "Road No. 25, Jubilee Hills, Hyderabad, Telangana 500033",
    mapEmbedUrl: "https://maps.google.com/?q=P.+Obul+Reddy+Public+School+Hyderabad",
    city: "Hyderabad, India"
  },
  contact: {
    email: "yananyaanu@gmail.com",
    coOrganiser1: {
      name: "Yelamanchili Ananya",
      role: "Co-Organiser",
      email: "yananyaanu@gmail.com",
      phone: "8977540506"
    },
    coOrganiser2: {
      name: "Abhirami Vutla",
      role: "Co-Organiser",
      email: "Abhiramivutla@gmail.com",
      phone: "+91 99593 02051"
    },
    teacherOrganiser: {
      name: "Ms. C. Shruti Reddy",
      role: "Teacher Organiser",
      school: "P. Obul Reddy Public School",
      phone: "+91 91 77071 678"
    },
    instagram: "@tedxporpsyouth",
    instagramUrl: "https://instagram.com",
    twitter: "@tedxporps",
    linkedin: "tedx-porps"
  },
  disclaimer: "This independent TEDx event is operated under official license from TED Conferences LLC. Approved by TEDx Applications on 21 August 2026.",
  licenseApprovedDate: "21 August 2026",
  licenseImage: "/images/tedx-license.png",
  sponsorshipThreshold: "₹50,000+",
  BOOKING_ENABLED: true,
  bookingCtaText: "Book Student Pass (₹1200)",
  bookingUrl: "/tickets"
};

