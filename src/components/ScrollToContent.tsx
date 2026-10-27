"use client";

import { useEffect } from "react";
import { scrollBehavior } from "@/lib/scroll";

type Props = {
  selector: string;
};

export default function ScrollToContent({ selector }: Props): null {
  useEffect(() => {
    const el: Element | null = document.querySelector(selector);
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      });
    });
  }, [selector]);

  return null;
}
