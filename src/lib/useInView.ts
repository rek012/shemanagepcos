import { useEffect, useState, RefObject } from "react";

export default function useInView<T extends Element = Element>(
  ref: RefObject<T | null>,
  options?: IntersectionObserverInit
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setInView(entry.isIntersecting);
      });
    }, options);

    observer.observe(node as Element);

    return () => observer.disconnect();
    // stringify options so dependency updates when options change
  }, [ref, JSON.stringify(options || {})]);

  return inView;
}
