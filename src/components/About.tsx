"use client";

import Image from "next/image";
import { m as motion } from "framer-motion";
import Tilt from "./ui/Tilt";
import SectionWrapper from "@/hoc/SectionWrapper";
import { styles } from "@/lib/styles";
import { fadeIn, textVariant } from "@/lib/motion";
import { overview, services, type Service } from "@/data";

function ServiceCard({ index, title, icon }: Service & { index: number }) {
  // The original passed tilt options to the inner div by mistake, so the
  // Tilt wrapper runs with its defaults (max 35°, scale 1.1, 1000ms).
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          {/* Decorative: the card title below names the service. */}
          <Image src={icon} alt="" width={64} height={64} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
}

function About() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {overview}
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10 justify-evenly">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(About, "about");
