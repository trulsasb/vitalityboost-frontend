export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export * from "./utils/calc";
export * from "./utils/format";
