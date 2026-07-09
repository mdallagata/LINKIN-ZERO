"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function BackToTop(): ReactNode {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect((): void | (() => void) => {
    function onScroll(): void {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return (): void => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className={`back-to-top${visible ? " visible" : ""}`}
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
