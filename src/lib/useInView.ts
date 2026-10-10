import { useEffect, useState, type RefObject } from "react";

// Tracks whether an element is within `rootMargin` of the viewport.
// With `once`, it stays true after the first time it becomes visible.
export function useInView(
  ref: RefObject<Element | null>,
  { rootMargin = "0px", once = false }: { rootMargin?: string; once?: boolean } = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
