"use client";

import Image from "next/image";
import { m as motion } from "framer-motion";
import Tilt from "./ui/Tilt";
import SectionWrapper from "@/hoc/SectionWrapper";
import { styles } from "@/lib/styles";
import { fadeIn, textVariant } from "@/lib/motion";
import { projects, worksIntro, type Project } from "@/data";

const imagePositionClass = {
  left: "object-left-top",
  center: "object-top",
  right: "object-right-top",
} as const;

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

// The section is taller than 4 viewports on phones, so the shared "25% of the
// section in view" trigger can never fire there. Each element reveals itself
// when it scrolls into view instead.
const revealOnView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.25 },
} as const;

// Every card has identical dimensions: the grid stretches cards to equal
// height, and each content block has a fixed height (single-line title,
// 4-line clamped description, 2-line tag row) with the button pinned to
// the bottom, so content length or image ratio never changes the size.
function ProjectCard({
  index,
  name,
  description,
  tags,
  image,
  imagePosition = "center",
  live_link,
}: Project & { index: number }) {
  return (
    <motion.div
      variants={fadeIn("up", "spring", (index % 3) * 0.2, 0.75)}
      {...revealOnView}
      className="h-full"
    >
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col"
      >
        <div className="relative w-full h-[230px] shrink-0">
          <Image
            src={image}
            alt={`Screenshot of the ${name} website`}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
            className={`object-cover rounded-2xl ${imagePositionClass[imagePosition]}`}
          />
        </div>

        {/* `text-bold` is not a Tailwind class; kept so titles stay regular weight like the original. */}
        <h3 className="mt-5 text-white text-bold text-[24px] leading-[36px] h-[36px] truncate">
          {name}
        </h3>
        <p className="mt-2 text-secondary text-[14px] leading-[21px] h-[84px] line-clamp-4">
          {description}
        </p>

        <ul
          aria-label="Technologies"
          className="list-none mt-4 h-[42px] overflow-hidden flex flex-wrap content-start gap-x-2"
        >
          {tags.map((tag) => (
            <li key={tag.name} className={`text-[14px] leading-[21px] ${tag.color}`}>
              #{tag.name}
            </li>
          ))}
        </ul>

        {live_link && (
          <div className="mt-auto pt-5">
            <a
              href={live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 black-gradient py-3 px-6 rounded-xl text-white text-[14px] font-bold"
            >
              View Project
              <span className="sr-only">: {name} (opens in a new tab)</span>
              <ExternalLinkIcon />
            </a>
          </div>
        )}
      </Tilt>
    </motion.div>
  );
}

function Works() {
  return (
    <>
      <motion.div variants={textVariant()} {...revealOnView}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          {...revealOnView}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {worksIntro}
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Works, "work");
