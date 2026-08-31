# TEDx P. Obul Reddy Public School (TEDxPORPS) 🔴

The official event website for **TEDx P. Obul Reddy Public School**, a platform for transformative breakthroughs, bold voices, and emergent ideas. This project serves as the digital face of the event, providing attendees and the community with all necessary information regarding the event, speakers, and schedule.

## 🚀 Overview

This is a high-performance, responsive landing page built with the latest web technologies to showcase the spirit of TEDx. It features a modern, sleek design that focuses on typography and imagery to create an immersive experience.

**Event Date:** November 21, 2026  
**Venue:** P. Obul Reddy Public School Auditorium, Hyderabad, India

## ✨ Key Features

- **Dynamic Hero Section:** Featuring a countdown timer to build anticipation for the event.
- **Speaker Showcase:** An interactive grid of speakers with detailed modals for biographies and their "Why it Matters" statement.
- **Event Schedule:** A categorized timeline of the day's events, from registration to the closing ceremony.
- **About Sections:** Detailed information about the TEDx initiative and the specific vision for the PORPS event.
- **Venue & Contact:** Integrated location details and contact channels for inquiries.
- **Partners & Organizers:** Recognition of the people and organizations making the event possible.
- **Updates & FAQ:** A dedicated space for latest announcements and common queries to reduce support overhead.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Runtime:** [React 19](https://react.dev/)

## 📁 Project Structure

```text
src/
├── app/                # Next.js App Router pages and layouts
│   ├── layout.tsx     # Root layout (Navbar, Footer, Theme)
│   ├── page.tsx       # Main landing page (assembles all sections)
│   └── globals.css     # Global styles and Tailwind directives
├── components/        # Modular UI components for each section
│   ├── Hero.tsx       # Main banner and countdown
│   ├── Speakers.tsx   # Speaker grid and SpeakerModal
│   ├── Schedule.tsx   # Timeline of events
│   ├── ...            # Other section components (FAQ, Venue, etc.)
└── data/              # Centralized data store for easy content management
    ├── event.ts       # Core event configuration (Name, Date, Venue)
    ├── speakers.ts    # Speaker list and detailed profiles
    ├── schedule.ts    # Timeline data
    └── content.ts     # General content and copy
```

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tedx
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Configuration & Customization

To update event details, you don't need to touch the UI components. Simply modify the files in `src/data/`:

- **Change Event Date/Theme:** Edit `src/data/event.ts`.
- **Add/Edit Speakers:** Update the array in `src/data/speakers.ts`.
- **Update Timeline:** Modify `src/data/schedule.ts`.

## ⚖️ Disclaimer

This independent TEDx event is operated under license from TED.
