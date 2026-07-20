"use client";

import { useEffect } from "react";

type Props = {
  selector: string;
};

export default function ScrollToContent({ selector }: Props): null {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, [selector]);

  return null;
}
