"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export default function FadeInSection({
  children,
  delay,
}: {
  children: ReactNode;
  delay?: number;
}): ReactNode {
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

  const style: CSSProperties | undefined = delay !== undefined
    ? { transitionDelay: `${delay}ms` }
    : undefined;

  return (
    <div ref={ref} className={`fade-in-section${visible ? " is-visible" : ""}`} style={style}>
      {children}
    </div>
  );
}
