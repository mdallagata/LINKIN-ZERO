"use client";

import { useEffect, useRef } from "react";

type Step = {
  selector: string;
};

type Props = {
  steps: Step[];
  disableUp?: boolean;
};

const SWIPE_THRESHOLD = 30;

export default function FirstScrollTo({ steps, disableUp = false }: Props): null {
  const idx = useRef(-1);
  const touchStartY = useRef(0);

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

    const advance = (goingDown: boolean): void => {
      if (goingDown && idx.current < steps.length - 1) {
        idx.current++;
        scrollToStep(idx.current);
        return;
      }

      if (!goingDown && !disableUp && idx.current >= 0) {
        idx.current--;
        if (idx.current < 0) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scrollToStep(idx.current);
        }
      }
    };

    // Auto-scroll on mount if URL hash matches a step
    const hash = window.location.hash;
    if (hash) {
      const stepIndex = steps.findIndex(s => s.selector === hash);
      if (stepIndex >= 0) {
        idx.current = stepIndex;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToStep(stepIndex));
        });
      }
    }

    // --- Wheel (desktop) ---
    const wheelHandler = (e: WheelEvent): void => {
      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;
      if (!goingDown && !goingUp) return;
      e.preventDefault();
      advance(goingDown);
    };

    // --- Touch (mobile) ---
    const touchStartHandler = (e: TouchEvent): void => {
      if (idx.current >= steps.length - 1) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const touchEndHandler = (e: TouchEvent): void => {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) < SWIPE_THRESHOLD) return;
      e.preventDefault();
      advance(dy > 0);
    };

    const keyHandler = (e: KeyboardEvent): void => {
      const goingDown = e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
      if ((goingDown || e.key === "ArrowUp" || e.key === "PageUp") && 
          (goingDown ? idx.current < steps.length - 1 : !disableUp && idx.current >= 0)) {
        e.preventDefault();
        advance(goingDown);
      }
    };

    window.addEventListener("wheel", wheelHandler, { passive: false, capture: true });
    window.addEventListener("keydown", keyHandler, { capture: true });
    window.addEventListener("touchstart", touchStartHandler, { passive: true, capture: true });
    window.addEventListener("touchend", touchEndHandler, { passive: false, capture: true });

    return (): void => {
      window.removeEventListener("wheel", wheelHandler, { capture: true });
      window.removeEventListener("keydown", keyHandler, { capture: true });
      window.removeEventListener("touchstart", touchStartHandler, { capture: true });
      window.removeEventListener("touchend", touchEndHandler, { capture: true });
    };
  }, [steps, disableUp]);

  return null;
}
