import FadeInOut from "@/components/fade";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React from "react";
import { AuthPages, Constants, PAGES } from "../constants";

import { Rubik } from "next/font/google";

const inter = Rubik({
  subsets: ["cyrillic"],
  weight: ["300"],
  display: "swap",
  adjustFontFallback: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isUser = getCookie(Constants.token)?.toString() ?? "";
  const isAuthPage = AuthPages.includes(pathname);

  React.useEffect(() => {
    if (!isUser && !isAuthPage) {
      window.location.href = `${PAGES.SIGNIN}?callbackUrl=${window.location.href}`;
    } // If not authenticated, force log in
  }, [isUser, isAuthPage]);

  if (isUser || isAuthPage) {
    return <FadeInOut className={inter.className}>{children}</FadeInOut>;
  }

  return (
    <FadeInOut className="flex h-[100vh] items-center justify-center space-x-3 bg-brand-light">
      <span className="loader"></span>
    </FadeInOut>
  );
};

// import FadeInOut from "@/components/fade";
// import { getCookie } from "cookies-next";
// import { usePathname } from "next/navigation";
// import React from "react";
// import { AuthPages, Constants } from "../constants";

// import { Rubik } from "next/font/google";

// const inter = Rubik({
//   subsets: ["cyrillic"],
//   weight: ["300"],
//   display: "swap",
//   adjustFontFallback: false,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const pathname = usePathname();
//   const isUser = getCookie(Constants.token)?.toString() ?? "";
//   const isAuthPage = AuthPages.includes(pathname);

//   return <FadeInOut className={inter.className}>{children}</FadeInOut>;
// };
