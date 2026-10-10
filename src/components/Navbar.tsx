"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "@/lib/styles";
import { navLinks, owner } from "@/data";
import { siteBasePath } from "@/lib/site";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main"
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${siteBasePath}/images/logo.svg`} alt="" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            {`${owner.name}  `}
            <span className="sm:block hidden"> | {owner.role}</span>
          </p>
        </Link>

        {/* Five links fit inline from lg; below that the mobile menu is used. */}
        <ul className="list-none hidden lg:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
            >
              <a href={`#${nav.id}`} onClick={() => setActive(nav.title)}>
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="lg:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            aria-controls="mobile-menu"
            onClick={() => setToggle(!toggle)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={toggle ? `${siteBasePath}/images/close.svg` : `${siteBasePath}/images/menu.svg`}
              alt=""
              className="w-[28px] h-[28px] object-contain"
            />
          </button>
          <div
            id="mobile-menu"
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                >
                  <a
                    href={`#${nav.id}`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}


