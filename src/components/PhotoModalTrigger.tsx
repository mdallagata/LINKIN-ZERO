"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import PhotoDialog from "@/components/PhotoDialog";
import { cx } from "@/lib/cx";
import styles from "./PhotoModalTrigger.module.css";

export default function PhotoModalTrigger({
  triggerLabel,
  thumbnail,
  bodyClassName,
  children,
}: {
  triggerLabel: string;
  thumbnail: ReactNode;
  bodyClassName?: string;
  children: ReactNode;
}): ReactNode {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button type="button" className={cx(styles.photoModalTrigger, "photo-reveal")} onClick={() => setOpen(true)} aria-label={triggerLabel}>
        {thumbnail}
      </button>

      <PhotoDialog open={open} onClose={() => setOpen(false)} label={triggerLabel} bodyClassName={bodyClassName}>
        {children}
      </PhotoDialog>
    </>
  );
}
