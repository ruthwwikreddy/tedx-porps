import { ScheduleItem } from './event';

export const SCHEDULE_DATA: ScheduleItem[] = [
  {
    id: "sch-01",
    time: "08:30 AM",
    title: "Phase I — Registration & Welcome",
    category: "Registration",
    description: "Delegate check-in, environment onboarding, attendee kit collection, badge verification, and networking in the reception salon.",
    venue: "Main Foyer & Reception"
  },
  {
    id: "sch-02",
    time: "09:30 AM",
    title: "Phase II — Opening Session & Curatorial Address",
    category: "Ceremony",
    description: "Welcome address by student curators and faculty advisors, stage unveiling, and introduction to the 2026 theme 'The Weight of Expectations'.",
    venue: "Auditorium Main Stage"
  },
  {
    id: "sch-03",
    time: "10:15 AM",
    title: "Phase III (Part A) — TEDx Talks: Heritage & Narrative",
    category: "Talk",
    description: "Core speaker sessions exploring classical scholarship, societal pressures, and unscripted storytelling featuring keynote addresses.",
    speaker: "Prof. J. Anuradha Jonnalagadda & Ms. B. V. Nandini Reddy",
    venue: "Auditorium Main Stage"
  },
  {
    id: "sch-04",
    time: "11:45 AM",
    title: "Phase III (Part B) — TEDx Talks: Empathy & Frontiers",
    category: "Talk",
    description: "Core speaker sessions probing radical compassion, ecological stewardship, and private aerospace breakthroughs.",
    speaker: "Ms. Amala Akkineni & Mr. Pawan Kumar Chandana",
    venue: "Auditorium Main Stage"
  },
  {
    id: "sch-05",
    time: "01:00 PM",
    title: "Phase IV — Interactive Segment & Delegate Experience",
    category: "Interactive",
    description: "Audience engagement workshops, interactive delegate installations, collaborative brainstorming walls, and curated lunch.",
    venue: "Courtyard & Idea Hub"
  },
  {
    id: "sch-06",
    time: "02:15 PM",
    title: "Phase V — Speaker Interaction & Direct Q&A Circles",
    category: "Interactive",
    description: "Direct roundtable dialogues, Q&A sessions with thought leaders, and student-curated artistic interludes.",
    venue: "Auditorium Main Stage & Idea Lounge"
  },
  {
    id: "sch-07",
    time: "03:45 PM",
    title: "Phase VI — Closing Session & Synthesis",
    category: "Closing",
    description: "Synthesizing insights, formal vote of thanks to partners and mentors, distribution of delegate certificates, and group photograph.",
    venue: "Auditorium Main Stage"
  }
];

