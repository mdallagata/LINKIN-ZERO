"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import styles from "./PhotoDialog.module.css";

type PhotoDialogProps = {
  open: boolean;
  onClose: () => void;
  /** Nombre accesible del diálogo (lo anuncia el lector de pantalla al abrirlo). */
  label: string;
  bodyClassName?: string;
  children: ReactNode;
};

// Modal de fotos sobre <dialog> nativo: showModal() lo pone en la capa superior
// (nada de la página queda por encima ni se puede clickear), Esc lo cierra y el
// foco vuelve solo al botón que lo abrió.
export default function PhotoDialog({ open, onClose, label, bodyClassName, children }: PhotoDialogProps): ReactNode {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // El contenido (fotos grandes) se monta recién la primera vez que se abre y
  // después queda, para que la animación de cierre no muestre un cuadro vacío.
  const [hasOpened, setHasOpened] = useState<boolean>(open);
  if (open && !hasOpened) setHasOpened(true);

  useEffect((): void => {
    const dialog: HTMLDialogElement | null = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // showModal() enfoca la X, que con teclado aparecería resaltada de entrada:
      // el foco va al diálogo entero y Tab lleva a la X.
      dialog.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // El <dialog> ocupa toda la pantalla y el marco no recibe clicks: un click
  // que llega al <dialog> mismo es un click afuera de la foto.
  const handleClick = (e: MouseEvent<HTMLDialogElement>): void => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.photoDialog} aria-label={label} tabIndex={-1} onClose={onClose} onClick={handleClick}>
      <div className={styles.photoDialogFrame}>
        <div className={styles.photoDialogContent}>
          <button type="button" className={styles.photoDialogClose} aria-label="Cerrar" onClick={onClose}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414" />
            </svg>
          </button>
          <div className={cx(styles.photoDialogBody, bodyClassName)}>{hasOpened && children}</div>
        </div>
      </div>
    </dialog>
  );
}
