"use client";

import { useEffect, useRef } from "react";

type Step = {
  selector: string;
};

type Props = {
  steps: Step[];
  disableUp?: boolean;
};

export default function FirstScrollTo({ steps, disableUp = false }: Props): null {
  const idx = useRef(-1);

  useEffect(() => {
    if (steps.length === 0) return;

    const scrollToStep = (i: number): void => {
      const { selector } = steps[i];
      const parent = document.querySelector(selector);
      if (!parent) return;
      const el = parent.querySelector("h1, h2") ?? parent;
      const top: number = el.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: "smooth" });
    };

    // Auto-scroll on mount if URL hash matches a step
    const hash = window.location.hash;
    if (hash) {
      const stepIndex = steps.findIndex(s => s.selector === hash);
      if (stepIndex >= 0) {
        idx.current = stepIndex;
        // Double rAF to wait for DOM paint after navigation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToStep(stepIndex));
        });
      }
    }

    const wheelHandler = (e: WheelEvent): void => {
      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      if (goingDown && idx.current < steps.length - 1) {
        e.preventDefault();
        idx.current++;
        scrollToStep(idx.current);
        return;
      }

      if (goingUp && !disableUp && idx.current >= 0) {
        e.preventDefault();
        idx.current--;
        if (idx.current < 0) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scrollToStep(idx.current);
        }
        return;
      }
    };

    const keyHandler = (e: KeyboardEvent): void => {
      const goingDown = e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";

      if (goingDown && idx.current < steps.length - 1) {
        e.preventDefault();
        idx.current++;
        scrollToStep(idx.current);
        return;
      }

      if ((e.key === "ArrowUp" || e.key === "PageUp") && !disableUp && idx.current >= 0) {
        e.preventDefault();
        idx.current--;
        if (idx.current < 0) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scrollToStep(idx.current);
        }
        return;
      }
    };

    window.addEventListener("wheel", wheelHandler, { passive: false, capture: true });
    window.addEventListener("keydown", keyHandler, { capture: true });

    return (): void => {
      window.removeEventListener("wheel", wheelHandler, { capture: true });
      window.removeEventListener("keydown", keyHandler, { capture: true });
    };
  }, [steps, disableUp]);

  return null;
}
