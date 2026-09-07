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

The application follows a **Data-Driven Component Architecture**. Content is decoupled from the UI, allowing the event organizers to update speakers or schedules in `src/data` without modifying the component logic.

## 4. Quick start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ruthwwikreddy/tedx-porps.git
   cd tedx-porps
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the site**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 5. Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Modular UI components (Hero, Speakers, Schedule, etc.).
- `src/data`: The "Source of Truth" containing event configuration, speaker lists, and timings.
- `public/designs`: Archive of design iterations and prototypes.

## 6. Tech Stack

- **Framework**: Next.js (App Router).
- **Language**: TypeScript.
- **Styling**: Tailwind CSS.
- **Deployment**: Vercel.

## 7. Contributing
Contributions to the UI/UX or performance optimizations are welcome. Please ensure you follow the existing component patterns in `src/components`.

## 8. License
Released under the **MIT License** — free to use as a template for other TEDx or community events.
