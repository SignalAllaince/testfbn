import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mergeCategories = (arr: { name: string }[]) =>
  arr ? arr.map((item) => item.name).join(", ") : "";
