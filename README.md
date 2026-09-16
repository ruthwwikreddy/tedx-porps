<div align="center">

# TEDxPORPS

**A high-performance, modern digital presence for the TEDxPORPS event.**
A curated event experience featuring speaker showcases, interactive schedules, and an immersive interface designed to amplify "Ideas Worth Spreading."
[Source](https://github.com/ruthwwikreddy/tedx-porps) · Built by [Ruthwik Reddy](https://www.ruthwikreddy.live/)
MIT licensed · Next.js 14 · Tailwind CSS · Responsive Design
</div>

---

## Table of contents
1. [What TEDxPORPS does](#1-what-tedxporps-does)
2. [Core Features](#2-core-features)
3. [Architecture](#3-architecture)
4. [Quick start](#4-quick-start)
5. [Project Structure](#5-project-structure)
6. [Tech Stack](#6-tech-stack)
7. [Contributing](#7-contributing)
8. [License](#8-license)

---

## 1. What TEDxPORPS does

| Capability | Detail |
|---|---|
| **Speaker Showcase** | Dynamic speaker cards and detailed modals to highlight diverse perspectives and narratives. |
| **Interactive Schedule** | A structured timeline of talks, breaks, and networking sessions for an optimized attendee experience. |
| **Immersive UI** | Modern components including Countdown timers, Galleries, and a polished Hero section. |
| **Responsive Core** | Fully optimized for mobile, tablet, and desktop to ensure accessibility across all devices. |
| **Event Management** | Centrally managed data for speakers, partners, and event details for easy updates. |

## 2. Core Features

- **Countdown Timer**: Generates anticipation with a real-time clock ticking down to the event start.
- **Speaker Registry**: A modular system to manage and display speaker bios and expertise.
- **Venue Integration**: Detailed location and accessibility information for event attendees.
- **Partner Ecosystem**: Dedicated section to acknowledge and showcase collaborating organizations.
- **FAQ System**: A streamlined accordian-style interface to resolve common attendee queries.

## 3. Architecture

```
User Browser    ──▶    Next.js App (Frontend)    ──▶    Static Data (src/data)
─────────────────         ────────────────────────            ────────────────────────
Request Page     ─────▶  Page Component Layout    ──────▶    Speakers/Schedule Data
Scroll/Interact  ─────▶  Dynamic Components       ──────▶    Content Config
View Speakers    ─────▶  SpeakerModal Rendering   ──────▶    Speaker Details
```

The application follows a **Data-Driven Component Architecture**. Content is decoupled from the UI, allowing the event organizers to update speakers and partners without requiring code changes.

## 4. Quick start

```bash
git clone https://github.com/ruthwwikreddy/tedx-porps.git
cd tedx-porps
npm install
npm run dev
```

## 5. Project Structure

```
tedx-porps/
├── public/
│   ├── favicon.ico
│   ├── file.svg
│   ├── vercel.svg
│   ├── next.svg
│   ├── globe.svg
│   ├── window.svg
│   └── designs/
│       ├── 1.html
│       ├── 2.html
│       └── 3.html
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AboutEvent.tsx
│   │   ├── AboutTedx.tsx
│   │   ├── Countdown.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Organizers.tsx
│   │   ├── Partners.tsx
│   │   ├── Schedule.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Speakers.tsx
│   │   ├── SpeakerCard.tsx
│   │   ├── SpeakerModal.tsx
│   │   ├── Theme.tsx
│   │   ├── Updates.tsx
│   │   └── Venue.tsx
│   ├── data/
│   │   ├── event.ts
│   │   ├── speakers.ts
│   │   └── schedule.ts
│   └── globals.css
├── postcss.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
└── eslint.config.mjs
```

## 6. Tech Stack

- **Frontend**: Next.js 14
- **UI Framework**: Tailwind CSS
- **State Management**: Built-in Next.js state management
- **Database**: Static data stored in `src/data`

## 7. Contributing

Contributions are welcome and appreciated. Please follow the standard GitHub workflow for submitting pull requests.

## 8. License

Released under the **MIT License**.

Designed and engineered by **[Ruthwik Reddy](https://www.ruthwikreddy.live/)** · [github.com/ruthwwikreddy/tedx-porps](https://github.com/ruthwwikreddy/tedx-porps)
