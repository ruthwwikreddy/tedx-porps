const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function createDeck() {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches (16:9)
  pptx.title = 'TEDxPORPS Youth 2026 — Sponsorship Proposal';
  pptx.author = 'TEDxPORPS Youth Curatorial Team';
  pptx.company = 'P. Obul Reddy Public School';

  const TED_RED = 'EB0028';
  const BLACK = '000000';
  const WHITE = 'FFFFFF';
  const DARK_GRAY = '111111';
  const TEXT_MAIN = '000000';
  const TEXT_MUTED = '555555';
  const TEXT_LIGHT = '777777';
  const BORDER_COLOR = 'E2E2E2';

  // Helper for slide header
  function addHeader(slide, leftText, slideNum, isDark = false, isCover = false) {
    slide.addText(
      [
        { text: 'TED', options: { color: TED_RED, bold: true, fontSize: isCover ? 18 : 15 } },
        { text: 'x', options: { color: TED_RED, bold: true, fontSize: isCover ? 18 : 15 } },
        { text: 'PORPS ', options: { color: isDark ? WHITE : BLACK, bold: true, fontSize: isCover ? 18 : 15 } },
        { text: 'Youth', options: { color: TED_RED, bold: true, fontSize: isCover ? 18 : 15 } }
      ],
      { x: 0.8, y: 0.35, w: 4.8, h: 0.45, align: 'left', fontFace: 'Helvetica' }
    );

    slide.addText(leftText.toUpperCase(), {
      x: 5.2,
      y: 0.35,
      w: 4.0,
      h: 0.45,
      align: 'right',
      fontSize: isCover ? 12 : 10,
      bold: true,
      color: isCover ? TED_RED : (isDark ? 'AAAAAA' : TEXT_LIGHT),
      fontFace: 'Helvetica'
    });
  }

  // Helper for slide footer
  function addFooter(slide, label, slideNum, isDark = false) {
    slide.addShape(pptx.ShapeType.line, {
      x: 0.8,
      y: 4.95,
      w: 8.4,
      h: 0,
      line: { color: isDark ? '333333' : BORDER_COLOR, width: 1 }
    });

    slide.addText(
      [
        { text: 'TEDxPORPS ', options: { color: isDark ? WHITE : BLACK, bold: true, fontSize: 11 } },
        { text: 'Youth', options: { color: TED_RED, bold: true, fontSize: 11 } },
        { text: ' • 21 November 2026', options: { color: isDark ? '888888' : TEXT_MUTED, fontSize: 11 } }
      ],
      { x: 0.8, y: 5.05, w: 5.2, h: 0.4, align: 'left', fontFace: 'Helvetica' }
    );

    slide.addText(`${slideNum.toString().padStart(2, '0')} / 20`, {
      x: 6.2,
      y: 5.05,
      w: 3.0,
      h: 0.4,
      align: 'right',
      fontSize: 11,
      bold: true,
      color: isDark ? '888888' : TEXT_MUTED,
      fontFace: 'Helvetica'
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 1 — COVER
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, 'Sponsorship Proposal • 2026', 1, false, true);

    // Red accent bar
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 1.4, w: 0.6, h: 0.07, fill: { color: TED_RED }
    });

    slide.addText(
      [
        { text: 'THE NEXT\n', options: { fontSize: 44, bold: true, color: BLACK } },
        { text: 'IDEAS\n', options: { fontSize: 44, bold: true, color: BLACK } },
        { text: 'START HERE.', options: { fontSize: 44, bold: true, color: TED_RED } }
      ],
      { x: 0.8, y: 1.6, w: 8.4, h: 2.6, fontFace: 'Helvetica', lineSpacing: 46 }
    );

    // Cover footer with prominent SPONSORSHIP DECK title
    slide.addShape(pptx.ShapeType.line, {
      x: 0.8, y: 4.6, w: 8.4, h: 0, line: { color: BORDER_COLOR, width: 1 }
    });

    slide.addText(
      [
        { text: 'SPONSORSHIP DECK\n', options: { fontSize: 16, bold: true, color: TED_RED } },
        { text: 'P. Obul Reddy Public School, Jubilee Hills, Hyderabad\n', options: { fontSize: 11, bold: true, color: BLACK } },
        { text: '21 November 2026 • Independently Organised TEDx Event', options: { fontSize: 10, color: TEXT_MUTED } }
      ],
      { x: 0.8, y: 4.7, w: 6.0, h: 0.85, fontFace: 'Helvetica', lineSpacing: 16 }
    );

    slide.addText('01 / 20', {
      x: 7.0, y: 4.95, w: 2.2, h: 0.4, align: 'right', fontSize: 11, bold: true, color: TEXT_MUTED, fontFace: 'Helvetica'
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 2 — THE INVITATION
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '02 — Partnership Invitation', 2);

    slide.addText('Partner with us. Support ideas.\nBe part of the conversation.', {
      x: 0.8, y: 1.3, w: 4.0, h: 1.8, fontSize: 26, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    slide.addText(
      'We invite forward-thinking organizations to align with an intellectual platform dedicated to unearthing powerful youth perspectives in Hyderabad.',
      { x: 0.8, y: 3.2, w: 4.0, h: 1.4, fontSize: 13, color: TEXT_MUTED, fontFace: 'Helvetica' }
    );

    // Red line divider
    slide.addShape(pptx.ShapeType.rect, {
      x: 5.2, y: 1.5, w: 0.04, h: 2.8, fill: { color: TED_RED }
    });

    slide.addText(
      '“Platforms like TEDxPORPS Youth do not just showcase present talent; they shape the trajectory of tomorrow’s intellectual discourse.”',
      { x: 5.5, y: 1.8, w: 3.7, h: 2.2, fontSize: 16, bold: true, color: BLACK, italic: true, fontFace: 'Helvetica' }
    );

    addFooter(slide, 'The Invitation', 2);
  }

  // --------------------------------------------------------------------------
  // SLIDE 3 — WHAT IS TEDxPORPS YOUTH?
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '03 — Overview', 3);

    slide.addText('ABOUT THE PLATFORM', {
      x: 0.8, y: 1.1, w: 8.4, h: 0.3, fontSize: 10, bold: true, color: TED_RED, fontFace: 'Helvetica'
    });

    slide.addText('A student-led crucible for transformative local ideas, global mindsets, and unfiltered dialogue.', {
      x: 0.8, y: 1.4, w: 8.4, h: 1.2, fontSize: 22, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    slide.addText(
      'TEDxPORPS Youth is built on the belief that young minds possess profound clarity regarding the structures governing our world. Operating under official license from TED, our event brings together dynamic speakers and an engaged community to challenge conventional wisdom.\n\nThis is an independently organized event operated under the leadership of student curators and faculty advisors at P. Obul Reddy Public School.',
      { x: 0.8, y: 2.8, w: 8.4, h: 1.8, fontSize: 13, color: TEXT_MUTED, fontFace: 'Helvetica', lineSpacing: 20 }
    );

    addFooter(slide, 'What is TEDxPORPS Youth?', 3);
  }

  // --------------------------------------------------------------------------
  // SLIDE 4 — EVENT AT A GLANCE
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '04 — Core Metrics', 4);

    // 3 Metric Cards
    const metrics = [
      { label: 'DATE', value: '21 NOV', sub: '2026 Edition' },
      { label: 'LOCATION', value: 'HYDERABAD', sub: 'P. Obul Reddy Public School, Jubilee Hills' },
      { label: 'FORMAT', value: 'TEDx YOUTH', sub: 'Curated Talks & Live Delegate Interactions' }
    ];

    metrics.forEach((m, idx) => {
      const xPos = 0.8 + idx * 2.9;
      slide.addShape(pptx.ShapeType.rect, {
        x: xPos, y: 1.6, w: 2.6, h: 2.8,
        fill: { color: 'F8F8FA' },
        line: { color: BORDER_COLOR, width: 1 }
      });

      slide.addText(m.label, {
        x: xPos + 0.2, y: 1.9, w: 2.2, h: 0.3, fontSize: 10, bold: true, color: TED_RED, fontFace: 'Helvetica'
      });
      slide.addText(m.value, {
        x: xPos + 0.2, y: 2.3, w: 2.2, h: 0.8, fontSize: 22, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
      slide.addText(m.sub, {
        x: xPos + 0.2, y: 3.2, w: 2.2, h: 0.8, fontSize: 11, color: TEXT_MUTED, fontFace: 'Helvetica'
      });
    });

    addFooter(slide, 'Event At A Glance', 4);
  }

  // --------------------------------------------------------------------------
  // SLIDE 5 — THE THEME
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: BLACK };
    addHeader(slide, '05 — Concept Focus', 5, true);

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 1.6, w: 0.5, h: 0.06, fill: { color: TED_RED }
    });

    slide.addText('OFFICIAL THEME 2026', {
      x: 0.8, y: 1.9, w: 8.4, h: 0.3, fontSize: 11, bold: true, color: TED_RED, fontFace: 'Helvetica'
    });

    slide.addText(
      [
        { text: '“THE WEIGHT OF\n', options: { fontSize: 46, bold: true, color: WHITE } },
        { text: 'EXPECTATIONS”', options: { fontSize: 46, bold: true, color: TED_RED } }
      ],
      { x: 0.8, y: 2.3, w: 8.4, h: 2.2, fontFace: 'Helvetica', lineSpacing: 48 }
    );

    addFooter(slide, 'Theme Exploration', 5, true);
  }

  // --------------------------------------------------------------------------
  // SLIDE 6 — WHY THE THEME MATTERS
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '06 — Contextual Depth', 6);

    slide.addText('Examining the invisible pressures that frame modern development.', {
      x: 0.8, y: 1.4, w: 4.0, h: 1.6, fontSize: 24, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    slide.addText(
      'Every generation inherits structures built long before their birth. This year, we dissect the burden placed on youth across core dimensions of daily life.',
      { x: 0.8, y: 3.2, w: 4.0, h: 1.4, fontSize: 13, color: TEXT_MUTED, fontFace: 'Helvetica' }
    );

    const dims = ['01  Family', '02  School', '03  Society', '04  Culture', '05  Ourselves'];
    dims.forEach((d, idx) => {
      const yPos = 1.4 + idx * 0.65;
      slide.addText(d, {
        x: 5.3, y: yPos, w: 3.9, h: 0.5, fontSize: 16, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
      slide.addShape(pptx.ShapeType.line, {
        x: 5.3, y: yPos + 0.55, w: 3.9, h: 0, line: { color: BORDER_COLOR, width: 1 }
      });
    });

    addFooter(slide, 'Why The Theme Matters', 6);
  }

  // --------------------------------------------------------------------------
  // SLIDE 7 — THE EXPERIENCE
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '07 — Program Flow', 7);

    slide.addText('A carefully architected day of intellectual immersion.', {
      x: 0.8, y: 1.1, w: 8.4, h: 0.6, fontSize: 20, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    const phases = [
      { phase: 'PHASE I', title: 'Registration & Welcome', desc: 'Networking and onboarding.' },
      { phase: 'PHASE II', title: 'Opening Session', desc: 'Curator address & key talks.' },
      { phase: 'PHASE III', title: 'TEDx Talks', desc: 'Core speaker sessions.' },
      { phase: 'PHASE IV', title: 'Interactive Segment', desc: 'Audience workshops.' },
      { phase: 'PHASE V', title: 'Speaker Interaction', desc: 'Direct Q&A circles.' },
      { phase: 'PHASE VI', title: 'Closing Session', desc: 'Insights synthesis & wrap.' }
    ];

    phases.forEach((p, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const xPos = 0.8 + col * 2.9;
      const yPos = 1.9 + row * 1.5;

      slide.addShape(pptx.ShapeType.rect, {
        x: xPos, y: yPos, w: 2.6, h: 1.3,
        fill: { color: 'FAFAFA' },
        line: { color: BORDER_COLOR, width: 1 }
      });

      slide.addText(p.phase, {
        x: xPos + 0.15, y: yPos + 0.12, w: 2.3, h: 0.25, fontSize: 9, bold: true, color: TED_RED, fontFace: 'Helvetica'
      });
      slide.addText(p.title, {
        x: xPos + 0.15, y: yPos + 0.38, w: 2.3, h: 0.45, fontSize: 13, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
      slide.addText(p.desc, {
        x: xPos + 0.15, y: yPos + 0.85, w: 2.3, h: 0.35, fontSize: 10, color: TEXT_MUTED, fontFace: 'Helvetica'
      });
    });

    addFooter(slide, 'The Experience', 7);
  }

  // --------------------------------------------------------------------------
  // SLIDE 8 — TENTATIVE SPEAKER LINEUP
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '08 — Voices on Stage (Tentative)', 8);

    slide.addText('SUBJECT TO FINAL AVAILABILITY AND CONFIRMATION', {
      x: 0.8, y: 1.1, w: 8.4, h: 0.3, fontSize: 9, bold: true, color: TED_RED, fontFace: 'Helvetica'
    });

    const speakers = [
      { cat: 'ACADEMIC & RESEARCH', name: 'Prof. J. Anuradha Jonnalagadda' },
      { cat: 'FILM & NARRATIVE', name: 'Ms. B. V. Nandini Reddy' },
      { cat: 'CONSERVATION & ARTS', name: 'Ms. Amala Akkineni' },
      { cat: 'AEROSPACE & INNOVATION', name: 'Mr. Pawan Kumar Chandana' }
    ];

    speakers.forEach((s, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = 0.8 + col * 4.4;
      const yPos = 1.7 + row * 1.5;

      slide.addShape(pptx.ShapeType.rect, {
        x: xPos, y: yPos, w: 4.0, h: 1.25,
        fill: { color: 'F9F9FA' },
        line: { color: BORDER_COLOR, width: 1 }
      });

      slide.addText(s.cat, {
        x: xPos + 0.25, y: yPos + 0.2, w: 3.5, h: 0.25, fontSize: 9, bold: true, color: TED_RED, fontFace: 'Helvetica'
      });
      slide.addText(s.name, {
        x: xPos + 0.25, y: yPos + 0.5, w: 3.5, h: 0.55, fontSize: 16, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
    });

    addFooter(slide, 'Tentative Speaker Lineup', 8);
  }

  // --------------------------------------------------------------------------
  // SLIDE 9 — ORGANISATIONAL STRUCTURE
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '09 — Governance & Execution', 9);

    slide.addText('Structured for precision, driven by student leadership.', {
      x: 0.8, y: 1.1, w: 8.4, h: 0.6, fontSize: 20, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    const teams = [
      'Executive Board & Core Team',
      'Content & Speaker Management',
      'Sponsorship & Partnerships',
      'Marketing & Communications',
      'Design & Creative Studio',
      'Operations & Event Execution'
    ];

    teams.forEach((t, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const xPos = 0.8 + col * 2.9;
      const yPos = 2.0 + row * 1.4;

      slide.addShape(pptx.ShapeType.rect, {
        x: xPos, y: yPos, w: 2.6, h: 1.1,
        fill: { color: 'FAFAFA' },
        line: { color: BLACK, width: 1.2 }
      });

      slide.addText(t, {
        x: xPos + 0.2, y: yPos + 0.25, w: 2.2, h: 0.6, fontSize: 12, bold: true, color: BLACK, align: 'center', fontFace: 'Helvetica'
      });
    });

    addFooter(slide, 'Organisational Structure', 9);
  }

  // --------------------------------------------------------------------------
  // SLIDE 10 — AUDIENCE & INTENDED IMPACT
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '10 — Community Reach', 10);

    slide.addText('Engaging the core anchors of the educational ecosystem.', {
      x: 0.8, y: 1.4, w: 4.0, h: 1.5, fontSize: 22, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    slide.addText(
      'Rather than relying on inflated metrics, our focus remains absolute: deep, highly targeted resonance among key intellectual communities.',
      { x: 0.8, y: 3.0, w: 4.0, h: 1.5, fontSize: 13, color: TEXT_MUTED, fontFace: 'Helvetica' }
    );

    const aud = ['01  Ambitious Students', '02  Educators & Leadership', '03  Broader Hyderabad Community'];
    aud.forEach((a, idx) => {
      const yPos = 1.6 + idx * 1.0;
      slide.addText(a, {
        x: 5.3, y: yPos, w: 3.9, h: 0.6, fontSize: 16, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
      slide.addShape(pptx.ShapeType.line, {
        x: 5.3, y: yPos + 0.7, w: 3.9, h: 0, line: { color: BORDER_COLOR, width: 1 }
      });
    });

    addFooter(slide, 'Audience & Impact', 10);
  }

  // --------------------------------------------------------------------------
  // SLIDE 11 — SPONSORSHIP OPPORTUNITY
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: BLACK };
    addHeader(slide, '11 — Financial Partnership', 11, true);

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 1.4, w: 0.5, h: 0.06, fill: { color: TED_RED }
    });

    slide.addText('INVESTMENT THRESHOLD', {
      x: 0.8, y: 1.7, w: 8.4, h: 0.3, fontSize: 11, bold: true, color: TED_RED, fontFace: 'Helvetica'
    });

    slide.addText('₹50,000+', {
      x: 0.8, y: 2.1, w: 8.4, h: 1.2, fontSize: 60, bold: true, color: WHITE, fontFace: 'Helvetica'
    });

    slide.addText(
      'Direct support levels structured to enable production excellence while offering clean, tasteful brand positioning.',
      { x: 0.8, y: 3.5, w: 7.0, h: 1.0, fontSize: 14, color: 'AAAAAA', fontFace: 'Helvetica' }
    );

    addFooter(slide, 'Sponsorship Opportunity', 11, true);
  }

  // --------------------------------------------------------------------------
  // SLIDE 12 — WHAT OUR SPONSORS RECEIVE
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '12 — Partner Benefits', 12);

    const b1 = ['01  Social Media Promotion', '02  Event-Space Branding', '03  Dedicated Stall Opportunity'];
    const b2 = ['04  Video Recognition', '05  On-Event Recognition', '06  Sponsor Thank-You'];

    b1.forEach((b, idx) => {
      const yPos = 1.6 + idx * 1.0;
      slide.addText(b, {
        x: 0.8, y: yPos, w: 3.9, h: 0.5, fontSize: 15, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
      slide.addShape(pptx.ShapeType.line, {
        x: 0.8, y: yPos + 0.6, w: 3.9, h: 0, line: { color: BORDER_COLOR, width: 1 }
      });
    });

    b2.forEach((b, idx) => {
      const yPos = 1.6 + idx * 1.0;
      slide.addText(b, {
        x: 5.2, y: yPos, w: 4.0, h: 0.5, fontSize: 15, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
      slide.addShape(pptx.ShapeType.line, {
        x: 5.2, y: yPos + 0.6, w: 4.0, h: 0, line: { color: BORDER_COLOR, width: 1 }
      });
    });

    addFooter(slide, 'What Our Sponsors Receive', 12);
  }

  // --------------------------------------------------------------------------
  // SLIDE 13 — BRAND VISIBILITY
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '13 — Touchpoints', 13);

    slide.addText('Harmonized visual integration across physical and digital spaces.', {
      x: 0.8, y: 1.1, w: 8.4, h: 0.6, fontSize: 20, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    const touchpoints = [
      { cat: 'DIGITAL', title: 'Social & Video', desc: 'Curated digital insertions and pre-roll acknowledgements.' },
      { cat: 'PHYSICAL', title: 'Venue & Event', desc: 'Tasteful placement within conference architecture and stage views.' },
      { cat: 'ENGAGEMENT', title: 'Stall & Thanks', desc: 'Interactive presence areas and formal verbal acknowledgements.' }
    ];

    touchpoints.forEach((tp, idx) => {
      const xPos = 0.8 + idx * 2.9;
      slide.addShape(pptx.ShapeType.rect, {
        x: xPos, y: 1.8, w: 2.6, h: 2.8,
        fill: { color: 'FAFAFA' },
        line: { color: BORDER_COLOR, width: 1 }
      });

      slide.addText(tp.cat, {
        x: xPos + 0.2, y: 2.1, w: 2.2, h: 0.3, fontSize: 10, bold: true, color: TED_RED, fontFace: 'Helvetica'
      });
      slide.addText(tp.title, {
        x: xPos + 0.2, y: 2.5, w: 2.2, h: 0.6, fontSize: 16, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
      slide.addText(tp.desc, {
        x: xPos + 0.2, y: 3.3, w: 2.2, h: 1.0, fontSize: 12, color: TEXT_MUTED, fontFace: 'Helvetica'
      });
    });

    addFooter(slide, 'Brand Visibility', 13);
  }

  // --------------------------------------------------------------------------
  // SLIDE 14 — WHY PARTNER?
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '14 — Strategic Rationale', 14);

    slide.addText('Associate with ideas worth spreading.', {
      x: 0.8, y: 1.4, w: 4.0, h: 1.2, fontSize: 24, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    slide.addText(
      'Support an independent student initiative that values intellectual rigor above commercial noise.',
      { x: 0.8, y: 2.8, w: 4.0, h: 1.5, fontSize: 13, color: TEXT_MUTED, fontFace: 'Helvetica' }
    );

    const reasons = [
      'Support a student-led platform',
      'Connect with an engaged youth & school community',
      'Champion curiosity, confidence & new perspectives'
    ];

    reasons.forEach((r, idx) => {
      const yPos = 1.6 + idx * 1.0;
      slide.addShape(pptx.ShapeType.rect, {
        x: 5.2, y: yPos, w: 0.04, h: 0.6, fill: { color: BLACK }
      });
      slide.addText(r, {
        x: 5.4, y: yPos + 0.05, w: 3.8, h: 0.6, fontSize: 14, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
    });

    addFooter(slide, 'Why Partner?', 14);
  }

  // --------------------------------------------------------------------------
  // SLIDE 15 — WHAT WE SEEK
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '15 — Requirements', 15);

    slide.addText('Clear, transparent collaboration requirements.', {
      x: 0.8, y: 1.4, w: 4.0, h: 1.2, fontSize: 24, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    slide.addText(
      'We believe in straightforward partnerships built on mutual alignment and respectful execution.',
      { x: 0.8, y: 2.8, w: 4.0, h: 1.5, fontSize: 13, color: TEXT_MUTED, fontFace: 'Helvetica' }
    );

    const reqs = [
      '01  ₹50,000 or above contribution',
      '02  Timely financial/asset processing',
      '03  Alignment on brand guidelines'
    ];

    reqs.forEach((r, idx) => {
      const yPos = 1.6 + idx * 1.0;
      slide.addText(r, {
        x: 5.2, y: yPos, w: 4.0, h: 0.5, fontSize: 15, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
      slide.addShape(pptx.ShapeType.line, {
        x: 5.2, y: yPos + 0.6, w: 4.0, h: 0, line: { color: BORDER_COLOR, width: 1 }
      });
    });

    addFooter(slide, 'What We Seek', 15);
  }

  // --------------------------------------------------------------------------
  // SLIDE 16 — WHERE YOUR SUPPORT GOES
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '16 — Fund Allocation', 16);

    const allocs = [
      { num: '01', title: 'Infrastructure', desc: 'Venue styling, seating, and audio-visual setups.' },
      { num: '02', title: 'Production', desc: 'Livestreaming setup, lighting, and recording.' },
      { num: '03', title: 'Speaker Care', desc: 'Hospitality, travel, and speaker lounge coordination.' },
      { num: '04', title: 'Engagement', desc: 'Interactive delegate kits and workshop resources.' }
    ];

    allocs.forEach((a, idx) => {
      const xPos = 0.8 + idx * 2.15;
      slide.addShape(pptx.ShapeType.rect, {
        x: xPos, y: 1.8, w: 1.95, h: 2.8,
        fill: { color: 'F9F9FB' },
        line: { color: BORDER_COLOR, width: 1 }
      });

      slide.addText(a.num, {
        x: xPos + 0.15, y: 2.1, w: 1.65, h: 0.3, fontSize: 12, bold: true, color: TED_RED, fontFace: 'Helvetica'
      });
      slide.addText(a.title, {
        x: xPos + 0.15, y: 2.5, w: 1.65, h: 0.6, fontSize: 15, bold: true, color: BLACK, fontFace: 'Helvetica'
      });
      slide.addText(a.desc, {
        x: xPos + 0.15, y: 3.2, w: 1.65, h: 1.2, fontSize: 11, color: TEXT_MUTED, fontFace: 'Helvetica'
      });
    });

    addFooter(slide, 'Where Support Goes', 16);
  }

  // --------------------------------------------------------------------------
  // SLIDE 17 — OFFICIAL TEDx LICENSE
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '17 — Authorization', 17);

    slide.addText('OFFICIAL CONFIRMATION', {
      x: 0.8, y: 1.2, w: 4.0, h: 0.3, fontSize: 10, bold: true, color: TED_RED, fontFace: 'Helvetica'
    });

    slide.addText('TEDx Applications confirmed approval of the TEDxPORPS Youth license on 21 August 2026.', {
      x: 0.8, y: 1.6, w: 4.0, h: 1.5, fontSize: 18, bold: true, color: BLACK, fontFace: 'Helvetica'
    });

    slide.addText(
      'Operating under complete compliance with official TED parameters for independent youth events.',
      { x: 0.8, y: 3.3, w: 4.0, h: 1.2, fontSize: 13, color: TEXT_MUTED, fontFace: 'Helvetica' }
    );

    // License Screenshot Image
    slide.addImage({
      path: path.join(__dirname, '../public/images/tedx-license.png'),
      x: 5.2,
      y: 1.2,
      w: 4.0,
      h: 3.5,
      sizing: { type: 'contain', w: 4.0, h: 3.5 }
    });

    addFooter(slide, 'Official TEDx License', 17);
  }

  // --------------------------------------------------------------------------
  // SLIDE 18 — THE ASK
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: BLACK };
    addHeader(slide, '18 — Call to Action', 18, true);

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 1.5, w: 0.5, h: 0.06, fill: { color: TED_RED }
    });

    slide.addText(
      [
        { text: 'JOIN US IN\nSUPPORTING\n', options: { fontSize: 44, bold: true, color: WHITE } },
        { text: 'IDEAS WORTH SPREADING.', options: { fontSize: 44, bold: true, color: TED_RED } }
      ],
      { x: 0.8, y: 1.8, w: 8.4, h: 2.8, fontFace: 'Helvetica', lineSpacing: 46 }
    );

    addFooter(slide, 'The Ask', 18, true);
  }

  // --------------------------------------------------------------------------
  // SLIDE 19 — CONTACT
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: WHITE };
    addHeader(slide, '19 — Direct Enquiries', 19);

    // Organiser 1
    slide.addText('GET IN TOUCH', {
      x: 0.8, y: 1.2, w: 4.0, h: 0.25, fontSize: 10, bold: true, color: TED_RED, fontFace: 'Helvetica'
    });
    slide.addText('Yelamanchili Ananya', {
      x: 0.8, y: 1.5, w: 4.0, h: 0.5, fontSize: 20, bold: true, color: BLACK, fontFace: 'Helvetica'
    });
    slide.addText('Co-Organiser, TEDxPORPS Youth 2026', {
      x: 0.8, y: 2.0, w: 4.0, h: 0.35, fontSize: 12, bold: true, color: TEXT_MUTED, fontFace: 'Helvetica'
    });
    slide.addText('Email: yananyaanu@gmail.com\nPhone: 8977540506', {
      x: 0.8, y: 2.45, w: 4.0, h: 0.8, fontSize: 12, color: BLACK, fontFace: 'Helvetica', lineSpacing: 18
    });

    // Divider
    slide.addShape(pptx.ShapeType.line, {
      x: 5.0, y: 1.4, w: 0, h: 3.2, line: { color: BORDER_COLOR, width: 1 }
    });

    // Organiser 2
    slide.addText('CO-CURATOR', {
      x: 5.3, y: 1.2, w: 3.9, h: 0.25, fontSize: 10, bold: true, color: TED_RED, fontFace: 'Helvetica'
    });
    slide.addText('Abhirami Vutla', {
      x: 5.3, y: 1.5, w: 3.9, h: 0.5, fontSize: 20, bold: true, color: BLACK, fontFace: 'Helvetica'
    });
    slide.addText('Co-Organiser, TEDxPORPS Youth 2026', {
      x: 5.3, y: 2.0, w: 3.9, h: 0.35, fontSize: 12, bold: true, color: TEXT_MUTED, fontFace: 'Helvetica'
    });
    slide.addText('P. Obul Reddy Public School\nJubilee Hills, Hyderabad, Telangana\nPhone: +91 99593 02051', {
      x: 5.3, y: 2.45, w: 3.9, h: 1.0, fontSize: 12, color: BLACK, fontFace: 'Helvetica', lineSpacing: 18
    });

    addFooter(slide, 'Contact', 19);
  }

  // --------------------------------------------------------------------------
  // SLIDE 20 — CLOSING
  // --------------------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: BLACK };
    addHeader(slide, '20 — Conclusion', 20, true);

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 1.5, w: 0.5, h: 0.06, fill: { color: TED_RED }
    });

    slide.addText(
      [
        { text: 'THE NEXT IDEA\n', options: { fontSize: 44, bold: true, color: WHITE } },
        { text: 'COULD START HERE.', options: { fontSize: 44, bold: true, color: TED_RED } }
      ],
      { x: 0.8, y: 1.8, w: 8.4, h: 2.4, fontFace: 'Helvetica', lineSpacing: 46 }
    );

    addFooter(slide, 'End of Proposal', 20, true);
  }

  const outPath1 = path.join(__dirname, '../public/pitchdesk.pptx');
  const outPath2 = path.join(__dirname, '../public/pitchdeck.pptx');
  const outPath3 = path.join(__dirname, '../public/sponsorship-deck.pptx');

  await pptx.writeFile({ fileName: outPath1 });
  fs.copyFileSync(outPath1, outPath2);
  fs.copyFileSync(outPath1, outPath3);

  console.log('Successfully generated PPTX files:');
  console.log('-', outPath1);
  console.log('-', outPath2);
  console.log('-', outPath3);
}

createDeck().catch(console.error);
