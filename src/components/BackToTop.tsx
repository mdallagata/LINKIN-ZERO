"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { scrollBehavior } from "@/lib/scroll";
import { cx } from "@/lib/cx";
import styles from "./BackToTop.module.css";

export default function BackToTop(): ReactNode {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect((): void | (() => void) => {
    let rafId: number | null = null;
    function onScroll(): void {
      if (rafId !== null) return;
      rafId = requestAnimationFrame((): void => {
        setVisible(window.scrollY > 300);
        rafId = null;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return (): void => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  function scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  }

  return (
    <button
      className={cx(styles.backToTop, visible && styles.visible)}
      onClick={scrollToTop}
      aria-label="Volver arriba"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      type="button"
    >
      ↑
    </button>
  );
}
