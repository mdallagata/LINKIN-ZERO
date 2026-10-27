/** Une clases CSS e ignora las vacías: cx("a", cond && styles.b) → "a b" o "a". */
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
