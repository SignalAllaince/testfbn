import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["cyrillic"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});

export { rubik };
