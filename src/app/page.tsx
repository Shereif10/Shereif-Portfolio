import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Tech from "@/components/Tech";
import Works from "@/components/Works";
import Feedbacks from "@/components/Feedbacks";
import Contact from "@/components/Contact";
import { StarsCanvas } from "@/components/canvas";
import LazyMount from "@/components/LazyMount";
import { contact, experiences, siteUrl, technologies } from "@/data";

// Structured data built only from CV/portfolio content.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: contact.fullName,
      alternateName: "Shereif Elswaf",
      jobTitle: contact.title,
      url: siteUrl,
      email: `mailto:${contact.email}`,
      telephone: contact.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
      worksFor: { "@type": "Organization", name: experiences[0].company },
      sameAs: [contact.linkedin, contact.github],
      knowsAbout: technologies.map((t) => t.name),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${contact.fullName} | Portfolio`,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <div className="relative z-0 bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {/* The navbar is position: fixed, so it sits outside <main> without affecting layout. */}
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center heero">
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <LazyMount className="w-full h-auto absolute inset-0 z-[-1]">
            <StarsCanvas />
          </LazyMount>
        </div>
      </main>
    </div>
  );
}
