import { useEffect, useState } from "react";

// Becomes true once the page has painted its first content and the browser
// is idle, so heavy work (e.g. booting three.js) never delays the first paint.
export function useAfterFirstPaint(timeout = 2000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let observer: PerformanceObserver | undefined;

    const scheduleIdle = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout });
      } else {
        timer = setTimeout(() => setReady(true), 200);
      }
    };

    if (PerformanceObserver.supportedEntryTypes?.includes("paint")) {
      observer = new PerformanceObserver((list) => {
        if (list.getEntriesByName("first-contentful-paint").length > 0) {
          observer?.disconnect();
          scheduleIdle();
        }
      });
      observer.observe({ type: "paint", buffered: true });
    } else {
      scheduleIdle();
    }

    return () => {
      observer?.disconnect();
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [timeout]);

  return ready;
}
