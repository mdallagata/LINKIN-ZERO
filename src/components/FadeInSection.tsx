"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export default function FadeInSection({ children }: { children: ReactNode }): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect((): void | (() => void) => {
    const el: HTMLDivElement | null = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return (): void => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-in-section${visible ? " is-visible" : ""}`}>
      {children}
    </div>
  );
}
