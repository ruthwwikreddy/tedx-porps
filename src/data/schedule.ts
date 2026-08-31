import { ScheduleItem } from './event';

export const SCHEDULE_DATA: ScheduleItem[] = [
  {
    id: "sch-01",
    time: "09:00 AM",
    title: "Doors Open & Attendee Check-in",
    category: "Registration",
    description: "Welcome lounge access, badge collection, interactive installations, and morning refreshment gathering.",
    venue: "Main Foyer & Reception"
  },
  {
    id: "sch-02",
    time: "10:00 AM",
    title: "Opening Ceremony & Curatorial Welcome",
    category: "Ceremony",
    description: "Welcome address by student curators, stage unveiling, and introduction to this year's theme and guidelines.",
    venue: "Auditorium Main Stage"
  },
  {
    id: "sch-03",
    time: "10:15 AM",
    title: "Session I — Spark & Inception",
    category: "Talk",
    description: "Opening keynote talks probing emergent ideas, technological leaps, and systemic transformations.",
    speaker: "Speaker 01 & Speaker 02",
    venue: "Auditorium Main Stage"
  },
  {
    id: "sch-04",
    time: "11:30 AM",
    title: "Session II — Human Nuance & Expression",
    category: "Talk",
    description: "Powerful explorations in storytelling, vulnerability, youth entrepreneurship, and cultural memory.",
    speaker: "Speaker 03 & Speaker 04",
    venue: "Auditorium Main Stage"
  },
  {
    id: "sch-05",
    time: "12:45 PM",
    title: "Curated Networking & Idea Lounge",
    category: "Break",
    description: "Connect with fellow attendees, explore interactive exhibitions, student art displays, and enjoy lunch.",
    venue: "Courtyard & Idea Hub"
  },
  {
    id: "sch-06",
    time: "02:00 PM",
    title: "Session III — Horizons & The Unbound",
    category: "Talk",
    description: "Visionary presentations focusing on global climate interventions, neuroplasticity, and ethical frontiers.",
    speaker: "Speaker 05 & Speaker 06",
    venue: "Auditorium Main Stage"
  },
  {
    id: "sch-07",
    time: "03:30 PM",
    title: "Student Performance & Musical Feature",
    category: "Interactive",
    description: "A specially curated artistic performance celebrating student expression, synthesis, and creative rhythm.",
    venue: "Auditorium Main Stage"
  },
  {
    id: "sch-08",
    time: "04:15 PM",
    title: "Closing Remarks & Vote of Thanks",
    category: "Closing",
    description: "Concluding address by the organizing committee, recognition of partners and mentors, and group photograph.",
    venue: "Auditorium Main Stage"
  }
];
