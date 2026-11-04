"use client";

import type { ReactNode } from "react";
import { scrollBehavior, useScrolledPast } from "@/lib/scroll";
import { cx } from "@/lib/cx";
import styles from "./BackToTop.module.css";

export default function BackToTop(): ReactNode {
  const visible: boolean = useScrolledPast(300);

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
