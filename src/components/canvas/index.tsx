"use client";

import dynamic from "next/dynamic";

// The 3D scenes are client-only and code-split, so three.js isn't part of the
// initial JavaScript and doesn't block hydration of the page content.
export const ComputersCanvas = dynamic(() => import("./Computers"), { ssr: false });
export const EarthCanvas = dynamic(() => import("./Earth"), { ssr: false });
export const StarsCanvas = dynamic(() => import("./Stars"), { ssr: false });
export const BallsCanvas = dynamic(() => import("./Ball"), { ssr: false });
export const BallView = dynamic(() => import("./Ball").then((m) => m.BallView), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});
