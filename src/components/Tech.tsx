"use client";

import { useRef } from "react";
import SectionWrapper from "@/hoc/SectionWrapper";
import { technologies } from "@/data";
import { useInView } from "@/lib/useInView";
import { BallView, BallsCanvas } from "./canvas";

// Balanced rows: 4 per row on phones (7 rows), 5 per row on tablets, and
// 7 per row on desktop (4 rows). Each ball keeps the original 112px size
// where space allows and scales down with its cell otherwise.
function Tech() {
  const listRef = useRef<HTMLUListElement>(null);
  // Mount the shared 3D canvas shortly before the grid scrolls into view and
  // only render frames while it is on screen.
  const near = useInView(listRef, { rootMargin: "400px", once: true });
  const visible = useInView(listRef, { rootMargin: "100px" });

  return (
    <>
      <h2 className="sr-only">Skills and technologies</h2>
      <ul ref={listRef} className="list-none flex flex-wrap justify-center">
        {technologies.map((technology) => (
          <li
            key={technology.name}
            className="basis-1/4 md:basis-1/5 lg:basis-[14.285%] flex justify-center p-1 sm:p-2"
          >
            <span className="sr-only">{technology.name}</span>
            {near ? (
              <BallView icon={technology.icon} className="w-full max-w-28 aspect-square" />
            ) : (
              <div className="w-full max-w-28 aspect-square" />
            )}
          </li>
        ))}
      </ul>
      {near && <BallsCanvas active={visible} />}
    </>
  );
}

export default SectionWrapper(Tech, "skills");
