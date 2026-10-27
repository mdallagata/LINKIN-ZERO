"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import PhotoDialog from "@/components/PhotoDialog";

export default function PhotoModalTrigger({
  triggerClassName,
  triggerLabel,
  thumbnail,
  bodyClassName,
  children,
}: {
  triggerClassName: string;
  triggerLabel: string;
  thumbnail: ReactNode;
  bodyClassName?: string;
  children: ReactNode;
}): ReactNode {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button type="button" className={`${triggerClassName} photo-modal-trigger`} onClick={() => setOpen(true)} aria-label={triggerLabel}>
        {thumbnail}
      </button>

      <PhotoDialog open={open} onClose={() => setOpen(false)} label={triggerLabel} bodyClassName={bodyClassName}>
        {children}
      </PhotoDialog>
    </>
  );
}
