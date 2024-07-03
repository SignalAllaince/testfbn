import FadeInOut from "@/components/fade";
import LogoutModal from "@/components/modal/logout";
import Navbar from "@/components/navbar";
import PageHead from "@/components/page-head";
import Sidebar from "@/components/sidebar";
import useDisclosure from "@/hooks/use-disclosure";
import { AnimatePresence } from "framer-motion";
import { Rubik } from "next/font/google";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const inter = Rubik({
  subsets: ["cyrillic"],
  weight: ["300"],
  display: "swap",
  adjustFontFallback: false,
});

export default function Layout({ children }: LayoutProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <PageHead />
      <div className={inter.className}>
        <Navbar onLogout={onOpen} />
        <div className="relative flex">
          <Sidebar onLogout={onOpen} />
          <div className="w-full overflow-x-hidden bg-[#F5F8FA]">
            <AnimatePresence mode="wait">
              <FadeInOut duration={0.3}>{children}</FadeInOut>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <LogoutModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
