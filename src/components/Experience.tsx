"use client";

import { m as motion } from "framer-motion";
import SectionWrapper from "@/hoc/SectionWrapper";
import { styles } from "@/lib/styles";
import { fadeIn, textVariant } from "@/lib/motion";
import { experiences, type Experience as ExperienceItem } from "@/data";

// Timeline built from the hero's visual motif: the purple dot and the
// fading violet line. Mobile: single column with the line on the left.
// Desktop (lg+): line in the middle, cards alternate sides with the date
// on the opposite side.
function ExperienceCard({ experience, index }: { experience: ExperienceItem; index: number }) {
  const cardOnLeft = index % 2 === 0;

  return (
    <motion.li
      variants={fadeIn("up", "spring", 0.2, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative pl-10 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-16"
    >
      <span
        aria-hidden
        className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-6 sm:top-9 w-5 h-5 rounded-full bg-[#915eff]"
      />

      <p
        className={`hidden lg:block pt-8 text-secondary text-[16px] font-medium ${
          cardOnLeft ? "order-2" : "text-right"
        }`}
      >
        {experience.date}
      </p>

      <div
        className={`${
          cardOnLeft ? "order-1" : ""
        } bg-tertiary rounded-2xl p-5 sm:p-8 shadow-card`}
      >
        <p className="lg:hidden text-secondary text-[14px] font-medium">{experience.date}</p>
        <h3 className="mt-1 lg:mt-0 text-white text-[20px] sm:text-[24px] font-bold">
          {experience.title}
        </h3>
        <p className="text-secondary text-[16px] font-semibold">{experience.company}</p>

        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point) => (
            <li key={point} className="text-white-100 text-[14px] pl-1 tracking-wider">
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </motion.li>
  );
}

function Experience() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="relative mt-20">
        <motion.div
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 bottom-0 left-2 lg:left-[calc(50%-2px)] w-1 origin-top violet-gradient"
        />
        <ol className="list-none flex flex-col gap-10 lg:gap-16">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company}-${experience.date}`}
              experience={experience}
              index={index}
            />
          ))}
        </ol>
      </div>
    </>
  );
}

export default SectionWrapper(Experience, "experience");
