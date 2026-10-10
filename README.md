# Shereif | Portfolio — reconstruction

A faithful rebuild of the live site at <https://shereifahmed.vercel.app> in
Next.js (App Router) + TypeScript + Tailwind CSS v3, with three.js
(react-three-fiber / drei) and Framer Motion.

Content, layout classes, animation parameters and 3D scene settings were
recovered from the site's public production bundle (Vite + React 18.2,
three r158, framer-motion 10.16, Tailwind 3), so values are exact, not
estimated.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

The contact form sends email through Resend. See "Contact form email" below.

## Project structure

```
public/
  desktop_pc/scene.glb        hero 3D model (original)
  planet/                     contact 3D planet (original gltf, bin, textures)
  images/                     logo, hero background, icons, tech + project images
src/
  app/
    layout.tsx                fonts (Poppins), metadata
    page.tsx                  section composition / order
    globals.css               Tailwind layers + original custom CSS
  components/
    Navbar.tsx  Hero.tsx  About.tsx  Experience.tsx
    Tech.tsx    Works.tsx Feedbacks.tsx Contact.tsx
    canvas/                   Computers, Ball, Earth, Stars, Loader
    ui/Tilt.tsx               port of the react-tilt component used originally
  hoc/SectionWrapper.tsx      shared section padding, anchor, in-view stagger
  data/index.ts               ALL site content (edit text/projects here)
  lib/
    motion.ts                 Framer Motion variants (textVariant, fadeIn, ...)
    styles.ts                 shared Tailwind class groups
    useMediaQuery.ts
tailwind.config.ts            design tokens (colors, xs breakpoint, shadow)
```

## Inspection report

### Sections (original order)
1. Navbar: fixed; transparent, turns `bg-primary` after 100px scroll; mobile dropdown below 640px.
2. Hero: "Hi, I'm Shereif", violet line accent, 3D desktop PC (drag to rotate horizontally), animated scroll indicator.
3. About (`#about`): "Introduction / Overview." paragraph plus 3 tilt service cards.
4. Work (`#work`): **renders empty on the live site** (padded section only; the Work nav link lands here).
5. Tech: 12 floating 3D icosahedron "balls" with tech logos as decals.
6. Projects: "My work / Projects." and 9 tilt project cards with GitHub buttons.
7. Feedbacks: **renders empty on the live site** (padded section only).
8. Contact (`#contact`): EmailJS form, auto-rotating 3D planet, star-field background.

There is no footer on the original.

### Design system
- Colors: primary `#050816`, secondary `#aaa6c3`, tertiary `#151030`,
  black-100 `#100d25`, black-200 `#090325`, white-100 `#f3f3f3`, accent `#915eff`.
- Font: Poppins 100–900. Container `max-w-7xl` (1280px), padding `sm:px-16 px-6`, `sm:py-16 py-10`.
- Breakpoints: xs 450, sm 640, md 768, lg 1024, xl 1280.
- Card shadow `0 35px 120px -15px #211e35`; gradients: violet, green-pink, black, text gradients.

### Animations
- Sections: stagger container, triggered once at 25% visibility.
- Headings: spring drop-in (y −50 → 0, 1.25s). Paragraphs: fade, 1s, delay 0.1s.
- Service cards: spring from the left, 0.75s, delay 0.5s × index.
- Project cards: spring from below, 0.75s, delay 0.5s × index.
- Contact: form slides in from the left, planet from the right (tween, 1s, delay 0.2s).
- Scroll indicator dot: y 0 → 24 → 0, 1.5s loop.
- Tilt: service cards use react-tilt defaults (35°, scale 1.1, 1000ms); project cards 45°, scale 1, 450ms.
- 3D: PC on demand frameloop, polar angle locked; balls float; planet auto-rotates; stars rotate continuously.

### Verification performed
DOM geometry (every section, heading, paragraph, image, canvas and form
element) was measured on the live site and on this build at 360, 390, 768,
1280 and 1440px. Results are identical, apart from ≤1px rounding on
centred items caused by fractional scrollbar width in the emulated viewport.
Visual screenshots were compared for the hero, About, Tech, Projects and
Contact sections. Mobile menu, anchor navigation, tilt, GitHub links,
images and 3D assets were checked.

## Phase 2: CV integration
Source: `Shereif_Ahmed_Elswaf_Resume.pdf`. Education, courses and certificates
were deliberately left out.
- Experience (`#experience`): timeline built from the hero's dot-and-violet-line motif. Data is in `experiences` in `src/data/index.ts`.
- Tech: categorised skill cards (replaced by 3D balls in phase 3).
- Projects: 4 production projects from the CV added first, with live-site buttons (`live_link`).
  Images are homepage screenshots of the live sites; Civilia uses its own og:image.
- About: the overview text was rewritten from the CV summary.

## Phase 3: Skills and Projects
- Skills: the category cards were replaced by 28 technology balls using the original
  ball mesh (`src/components/canvas/Ball.tsx`). All balls render through drei `<View>`s into a
  single shared canvas, so the page uses 4 WebGL contexts instead of 15+. Layout is
  4 per row on phones, 5 on tablets and 7 on desktop. Drag-to-rotate is on for mouse users only,
  so swipes still scroll the page on touch screens.
  New logos are CC0 icons from simple-icons. Liquid and Firestore have no official logo there and are not shown.
- Projects: the nine official projects, with live links and GitHub links only where public repos exist
  (Axis, Adri Loka). The old learning projects are kept as `archivedProjects` (not rendered).
  Cards have fixed-height blocks (title, 4-line description, 2-line tags, bottom button), so
  every card has identical dimensions at every breakpoint.
- Projects reveal per element on scroll. The shared 25%-of-section trigger can't fire for
  sections taller than 4 viewports, which made the original Projects section stay invisible on phones.

## Phase 4: Polish, performance, SEO and contact

### Contact form email (Resend)
Submissions go to `POST /api/contact` (`src/app/api/contact/route.ts`), which validates them and
sends the email server-side through Resend. The visitor's address is set as Reply-To.
1. Create a Resend account and an API key at https://resend.com/api-keys.
2. Set the environment variables (locally in `.env.local`, and in the hosting provider):
   - `RESEND_API_KEY` (secret, never `NEXT_PUBLIC_`)
   - `CONTACT_TO_EMAIL=shereifelswaf7@gmail.com`
   - `CONTACT_FROM_EMAIL`: Resend's test sender `onboarding@resend.dev` only delivers to the
     email that owns the Resend account, so either sign up with shereifelswaf7@gmail.com or
     verify your own domain and use e.g. `Portfolio <contact@yourdomain.com>`.
   - `NEXT_PUBLIC_SITE_URL`: the deployed URL (canonical, Open Graph and sitemap URLs).
Spam protection: server-side validation and length limits, HTML escaping, a honeypot field,
and a per-IP rate limit (5 messages per 10 minutes, per server instance).

### Performance
- The hero model is 21.6 MB → 1.8 MB and the planet 3.0 MB → 0.5 MB (meshopt geometry, WebP textures,
  no mesh simplification; sources in `assets-src/models/`). The hero background PNG (909 KB) → WebP (173 KB).
- 3D scenes are code-split. The hero scene starts after first paint. The skills, planet and stars scenes
  mount near the viewport and stop rendering off-screen.
- `next/image` for thumbnails and icons, Framer Motion `LazyMotion`, only the font weights in use.
- three.js is pinned to 0.182.x, the newest release compatible with @react-three/fiber 9
  (r183 deprecated `THREE.Clock`, which R3F 9 still uses).

### Accessibility / SEO
Header/nav/main landmarks, a skip link, a real button for the mobile menu, named links, DOM text for the
skill balls, a labelled form with inline errors and a live status, visible keyboard focus, and
`prefers-reduced-motion` support (Framer Motion, tilt, float, auto-rotation, smooth scroll).
Metadata, canonical URL, Open Graph/Twitter cards (generated OG image), favicon, robots.txt,
sitemap.xml and Person/WebSite JSON-LD.

## Phase 5: Navigation and contact icons
- Section anchors: `#about`, `#experience`, `#skills`, `#work` (Projects), `#contact`. All five are in the navbar (`navLinks` in `src/data/index.ts`).
  Inline links show from 1024px. Below that the existing mobile menu is used, because five links do not fit the row at tablet widths.
- The contact card ends with WhatsApp, LinkedIn, Phone, GitHub and Email icon links built from the CV contact data.

## Intentional parity quirks
These match the live site exactly and are flagged for the improvement phase:
- The Feedbacks section renders no content (Experience was filled in during phase 2).
- The model loader's spinner class (`canvas-load`) has no CSS, so only the percentage shows.
- Project titles use the non-existent class `text-bold`, so they render in regular weight.
- Service cards ignore their intended tilt options (the original passed them to the wrong element).
- Original text typos kept ("DavFolio", "Bootstrab", double spaces).
- DevFolio's card image is the same `hero-bg` screenshot used in the original.

## Known differences from the original
- Next.js/React 19/three r186 instead of Vite/React 18/three r158. Lighting
  semantics are the same (physically-correct lights in both), but three r186
  replaces `PCFSoftShadowMap` with `PCFShadowMap`, so shadow edges may be
  slightly harder.
- The 3D loader is a small imperative DOM overlay instead of drei `<Html>`
  (drei's nested React root crashes on unmount under React 19). Placement
  and appearance are the same.
- Spring timing comes from framer-motion 14 instead of 10, which may vary slightly.
