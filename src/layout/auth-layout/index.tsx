import Footer from "@/components/footer";
import Heading from "@/components/heading";
import PageHead from "@/components/page-head";
import { Rubik } from "next/font/google";
import Image from "next/image";
import React from "react";
import logoImg from "../../../public/assets/t_fb.png";

const inter = Rubik({
  subsets: ["cyrillic"],
  weight: ["300"],
  display: "swap",
  adjustFontFallback: false,
});

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex min-h-screen flex-col`}>
      <PageHead />
      <div className="custom-bg flex flex-1 items-center justify-center  py-10">
        <div className="-mt-10 flex w-full max-w-xl flex-1 flex-col items-center space-y-10 sm:mt-0">
          <div className="max-w-[180px]">
            <Image src={logoImg} alt="first bank logo" />
          </div>

          <div className="w-full bg-transparent py-8 text-white sm:bg-white sm:text-brand-darkest">
            <div className="mx-auto w-full px-6 sm:px-8 lg:max-w-md lg:px-0">
              <div className="space-y-1">
                <Heading size="h4" as="h4">
                  Admin Login
                </Heading>
                <p className="text-md">
                  Kindly enter your details correctly in the fields below
                </p>
              </div>

              <div className="flex-1 pb-4 pt-6 sm:pt-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <Footer />
      </div>
    </div>
  );
}

export default AuthLayout;
