import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./LogoMark.module.css";

// La Ø pincelada de la banda. Es una máscara: toma el color del texto
// (currentColor), así sirve igual sobre negro que sobre el bloque de marca. El
// tamaño lo pone quien la usa (width/height en su className); `large` usa la
// versión de alta resolución, para cuando se muestra enorme.
export default function LogoMark({ className, large = false }: { className?: string; large?: boolean }): ReactNode {
  return <span className={cx(styles.logoMark, large && styles.large, className)} aria-hidden="true" />;
}
