// Site content recovered verbatim from the original production bundle.
// Text (including original typos) is intentionally left unchanged.

export type NavLink = { id: string; title: string };

export type Service = { title: string; icon: string };

export type Technology = { name: string; icon: string };

export type TagColor =
  | "blue-text-gradient"
  | "green-text-gradient"
  | "pink-text-gradient"
  | "orange-text-gradient";

export type Tag = { name: string; color: TagColor };

export type Project = {
  name: string;
  description: string;
  tags: Tag[];
  image: string;
  // Focal point for the cropped thumbnail (CSS object-position).
  imagePosition?: "left" | "center" | "right";
  source_code_link?: string;
  live_link?: string;
};

export type Experience = {
  title: string;
  company: string;
  date: string;
  points: string[];
  tags: Tag[];
};

export const owner = {
  name: "Shereif",
  role: "Software Developer",
  heroSubtitle: "I develop responsive web applications",
};

// Each id matches a section anchor rendered by SectionWrapper.
export const navLinks: NavLink[] = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "work", title: "Projects" },
  { id: "contact", title: "Contact" },
];

// Based on the CV's professional summary.
export const overview =
  "I'm a Frontend Developer with 2+ years of hands-on experience building and delivering production websites and web applications with React, Next.js, TypeScript and Shopify. I turn Figma designs into production-ready, responsive interfaces, build reusable components, and implement Arabic/English RTL/LTR experiences. Currently I'm the Web Team Lead at Respect Marketing Agency, staying hands-on with frontend implementation and technical delivery. Let's work together to bring your ideas to life!";

export const services: Service[] = [
  { title: "Web Developer", icon: "/images/services/web.png" },
  { title: "React Framework", icon: "/images/services/mobile.png" },
  { title: "Responsive Web Apps", icon: "/images/services/backend.png" },
];

// Skills rendered as 3D balls. Sources: the original portfolio and the CV.
// Logos for the CV additions come from the CC0 simple-icons set.
export const technologies: Technology[] = [
  { name: "HTML 5", icon: "/images/tech/html.png" },
  { name: "CSS 3", icon: "/images/tech/css.png" },
  { name: "JavaScript", icon: "/images/tech/javascript.png" },
  { name: "TypeScript", icon: "/images/tech/typescript.png" },
  { name: "React JS", icon: "/images/tech/reactjs.png" },
  { name: "Next.js", icon: "/images/tech/nextjs.png" },
  { name: "Redux Toolkit", icon: "/images/tech/redux.png" },
  { name: "Vite", icon: "/images/tech/vite.svg" },
  { name: "Tailwind CSS", icon: "/images/tech/tailwindcss.svg" },
  { name: "Bootstrap", icon: "/images/tech/bootstrap.png" },
  { name: "Material UI", icon: "/images/tech/mui.svg" },
  { name: "jQuery", icon: "/images/tech/jquery.svg" },
  { name: "GSAP", icon: "/images/tech/gsap.svg" },
  { name: "Framer Motion", icon: "/images/tech/framer.svg" },
  { name: "Shopify", icon: "/images/tech/shopify.svg" },
  { name: "WordPress", icon: "/images/tech/wordpress.svg" },
  { name: "GraphQL", icon: "/images/tech/graphql.svg" },
  { name: "Firebase", icon: "/images/tech/firebase.svg" },
  { name: "Resend", icon: "/images/tech/resend.svg" },
  { name: "RegEx", icon: "/images/tech/regex.png" },
  { name: "git", icon: "/images/tech/git.png" },
  { name: "GitHub", icon: "/images/tech/github.png" },
  { name: "figma", icon: "/images/tech/figma.png" },
  { name: "Google Tag Manager", icon: "/images/tech/googletagmanager.svg" },
  { name: "Google Search Console", icon: "/images/tech/googlesearchconsole.svg" },
  { name: "Cloudflare", icon: "/images/tech/cloudflare.svg" },
  { name: "Railway", icon: "/images/tech/railway.svg" },
  { name: "Hostinger", icon: "/images/tech/hostinger.svg" },
];

// Professional experience from the CV, newest first.
export const experiences: Experience[] = [
  {
    title: "Web Team Lead",
    company: "Respect Marketing Agency",
    date: "Nov 2025 – Present",
    points: [
      "Lead web delivery and frontend implementation across client-facing production websites.",
      "Coordinate Frontend, Backend, UI/UX and SEO teams, aligning requirements, priorities and delivery.",
      "Select the implementation platform per project (Next.js, Shopify or WordPress) and review Figma handoffs and frontend builds.",
      "Led and contributed to 15+ production websites across Egypt, Saudi Arabia and the UAE.",
      "Streamlined the delivery workflow, reducing typical turnaround from about 45 days to around 2 weeks.",
    ],
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Shopify", color: "green-text-gradient" },
      { name: "WordPress", color: "pink-text-gradient" },
      { name: "Figma", color: "blue-text-gradient" },
    ],
  },
  {
    title: "Frontend Developer",
    company: "Sutuoor",
    date: "Apr 2025 – Nov 2025",
    points: [
      "Developed responsive web interfaces and features using React, JavaScript, HTML, CSS and jQuery.",
      "Integrated frontend interfaces with REST APIs and JSON-based data.",
      "Implemented UI improvements, reusable frontend patterns and bug fixes in a collaborative Git workflow.",
    ],
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "JavaScript", color: "green-text-gradient" },
      { name: "jQuery", color: "pink-text-gradient" },
      { name: "REST APIs", color: "blue-text-gradient" },
      { name: "Git", color: "green-text-gradient" },
    ],
  },
  {
    title: "Frontend Developer Trainer — Internship",
    company: "Sutuoor",
    date: "Dec 2024 – Apr 2025",
    points: [
      "Built and improved responsive interfaces using HTML, CSS, JavaScript, jQuery and React.",
      "Implemented assigned features and resolved frontend bugs under senior review.",
    ],
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "React", color: "blue-text-gradient" },
    ],
  },
];

export const worksIntro =
  "Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.";

// Official projects (live URLs supplied by Shereif). Technologies are listed
// only where verified from the CV, the live site's code, or the GitHub repo.
export const projects: Project[] = [
  {
    name: "Civilia Developments",
    description:
      "Bilingual real estate developer website with LTR/RTL layouts, scroll-driven interactions and a full SEO setup.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "Tailwind", color: "pink-text-gradient" },
      { name: "GSAP", color: "blue-text-gradient" },
      { name: "next-intl", color: "green-text-gradient" },
    ],
    image: "/images/projects/civilia.webp",
    live_link: "https://civiliadevelopments.com/en",
  },
  {
    name: "Rowad Al Qimma",
    description:
      "Bilingual website for a firm helping companies establish their business in Saudi Arabia, with RTL/LTR layouts.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "Tailwind", color: "pink-text-gradient" },
      { name: "FramerMotion", color: "blue-text-gradient" },
      { name: "Resend", color: "green-text-gradient" },
    ],
    image: "/images/projects/rowad.jpg",
    live_link: "https://rowadalqimma.com/en",
  },
  {
    name: "Axis Restaurant",
    description:
      "Restaurant and café website with a video hero, menu, gallery and reservation sections, animated with GSAP and ScrollTrigger.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "GSAP", color: "blue-text-gradient" },
    ],
    image: "/images/projects/axis.jpg",
    imagePosition: "right",
    live_link: "https://shereif10.github.io/axis-restaurant/",
  },
  {
    name: "Soun",
    description:
      "Bilingual English/Arabic website for a facility management company specialized in operations and maintenance.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Tailwind", color: "green-text-gradient" },
    ],
    image: "/images/projects/soun.jpg",
    imagePosition: "left",
    live_link: "https://soun-theta.vercel.app/en",
  },
  {
    name: "Prime Shield",
    description:
      "Arabic digital company profile for a Riyadh waterproofing, insulation and general contracting company.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
    ],
    image: "/images/projects/primeshield.jpg",
    live_link: "https://www.primeshield.com.sa/",
  },
  {
    name: "Adri Loka",
    description:
      "Barbershop website presenting services, the grooming process, lookbook, opening hours and location, animated with GSAP.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "GSAP", color: "blue-text-gradient" },
    ],
    image: "/images/projects/adriloka.jpg",
    imagePosition: "left",
    live_link: "https://shereif10.github.io/Adri-Loka/",
  },
  {
    name: "Fitrah Academy",
    description:
      "Website for an online academy offering structured Quran classes, Arabic lessons and Islamic education for kids and adults.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Tailwind", color: "green-text-gradient" },
    ],
    image: "/images/projects/fitrah.jpg",
    imagePosition: "left",
    live_link: "https://fitrah-academy.com/",
  },
  {
    name: "Flywings Academy",
    description:
      "Flight-training academy website with a full Admin Dashboard, Firestore data, authentication and Firebase Hosting.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "Vite", color: "pink-text-gradient" },
      { name: "Tailwind", color: "blue-text-gradient" },
      { name: "Firebase", color: "green-text-gradient" },
    ],
    image: "/images/projects/flywings.jpg",
    live_link: "https://www.bflywings.com/",
  },
  {
    name: "Niche Store",
    description:
      "Production Shopify perfume store with dynamic bundles and offers, variant-level pricing and Draft Order checkout.",
    tags: [
      { name: "Shopify", color: "blue-text-gradient" },
      { name: "Liquid", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "GraphQL", color: "blue-text-gradient" },
    ],
    image: "/images/projects/niche.jpg",
    live_link: "https://nichestoreeg.com/",
  },
];

// Learning projects from the original portfolio. Not rendered since the
// official project list above replaced them; kept so they can be restored.
export const archivedProjects: Project[] = [
  {
    name: "Fokir",
    description:
      "Fokir template shows my skills in using HTML and CSS , and using those skills to create a responsive websites and a beautiful user interface.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
    ],
    image: "/images/projects/fokir.jpg",
    source_code_link: "https://github.com/Shereif10/Fokir",
  },
  {
    name: "DevFolio",
    description:
      "A DavFolio template explaining Morgan Freeman's work. The template also shows an overview of Morgan's skills, services , projects, customer feedback and a contact page.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "Bootstrap", color: "pink-text-gradient" },
    ],
    image: "/images/projects/devfolio.jpg",
    source_code_link: "https://github.com/Shereif10/DevFolio",
  },
  {
    name: "Daniels",
    description:
      "Daniel's template was an exam in the form of a portfolio website to use what I learned in HTML, CSS, and Bootstrab to create a responsive website..",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "Bootstrap", color: "pink-text-gradient" },
    ],
    image: "/images/projects/daniels.jpg",
    source_code_link: "https://github.com/Shereif10/Daniel",
  },
  {
    name: "Smart Login",
    description:
      "Smart login is a thumbnail of the authentication page. You can create an account by username, email and password. You can also login or logout from the website.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "Bootstrap", color: "pink-text-gradient" },
      { name: "JS", color: "blue-text-gradient" },
    ],
    image: "/images/projects/smart.jpg",
    source_code_link: "https://github.com/Shereif10/Smart-Login",
  },
  {
    name: "CRUD",
    description:
      "CRUD system makes you add product by product name, price, category and description. It also display all of products in a list so you can search, update and delete.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "Bootstrap", color: "pink-text-gradient" },
      { name: "JS", color: "blue-text-gradient" },
    ],
    image: "/images/projects/crud.jpg",
    source_code_link: "https://github.com/Shereif10/CRUD",
  },
  {
    name: "BookMark",
    description:
      "Bookmark is a website that allows you add the book name and the book URL and display it in a list. So you can delete any item or visit the book site. ",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "Bootstrap", color: "pink-text-gradient" },
      { name: "JS", color: "blue-text-gradient" },
      { name: "SweetAlert", color: "green-text-gradient" },
    ],
    image: "/images/projects/bookmark.jpg",
    source_code_link: "https://github.com/Shereif10/BookMark",
  },
  {
    name: "Weather",
    description:
      "Weather app knows your location and display the temperatures for the next 3 days. You can also search for temperatures in any city in the world.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "Bootstrap", color: "pink-text-gradient" },
      { name: "JS", color: "blue-text-gradient" },
      { name: "API", color: "green-text-gradient" },
    ],
    image: "/images/projects/weather.jpg",
    source_code_link: "https://github.com/Shereif10/weather",
  },
  {
    name: "Yummy",
    description:
      "yummy is a website that displays popular meals in various countries of the world.  When you click on any meal, the meal details are displayed.You can also search for any meal.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "Bootstrap", color: "pink-text-gradient" },
      { name: "JS", color: "blue-text-gradient" },
      { name: "API", color: "green-text-gradient" },
    ],
    image: "/images/projects/yummy.jpg",
    source_code_link: "https://github.com/Shereif10/Yummy",
  },
  {
    name: "Start Framework",
    description:
      "Start framework is a simple website to start the React journey. It contains more than one page. You can navigate through each page using router.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "Bootstrap", color: "pink-text-gradient" },
      { name: "JS", color: "blue-text-gradient" },
      { name: "React", color: "green-text-gradient" },
    ],
    image: "/images/projects/start.jpg",
    source_code_link: "https://github.com/Shereif10/start-framework",
  },
];

// Contact details exactly as they appear in the CV.
export const contact = {
  fullName: "Shereif Ahmed Salah Elswaf",
  title: "Frontend Developer",
  headline: "React • Next.js • TypeScript • JavaScript • Shopify",
  location: "Cairo, Egypt",
  email: "shereifelswaf7@gmail.com",
  phone: "+20 1008851954",
  linkedin: "https://www.linkedin.com/in/shereif-elswaf-27531b27b",
  github: "https://github.com/Shereif10",
};

// Public URL of the deployed portfolio, used for canonical/OG/sitemap URLs.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://shereifahmed.vercel.app"
).replace(/\/$/, "");
