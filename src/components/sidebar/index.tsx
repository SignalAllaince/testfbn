import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { GoPackage } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineInventory, MdOutlineRateReview } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbReceiptTax, TbShoppingCartDiscount } from "react-icons/tb";

interface sideNav {
  link: string;
  label: string;
  icon: React.ReactNode;
  exact: boolean;
}

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  const linkArr: sideNav[] = [
    {
      link: "/",
      exact: true,
      label: "Dashboard",
      icon: <RxDashboard size={16} />,
    },
    {
      link: "/admin",
      exact: false,
      label: "Admin Management",
      icon: <HiOutlineUserCircle size={16} />,
    },
    {
      link: "/inventory",
      exact: false,
      label: "Inventory Management",
      icon: <MdOutlineInventory size={16} />,
    },
    {
      link: "/discount-flashsales",
      exact: false,
      label: "Discount & Flash sales",
      icon: <TbShoppingCartDiscount size={16} />,
    },
    {
      link: "/store",
      exact: false,
      label: "Store Tax & Shipping",
      icon: <TbReceiptTax size={16} />,
    },
    {
      link: "/orders",
      exact: false,
      label: "Orders",
      icon: <GoPackage size={16} />,
    },
    {
      link: "/reviews",
      exact: false,
      label: "Manage Reviews",
      icon: <MdOutlineRateReview size={16} />,
    },
    // {
    //   link: "/report",
    //   exact: false,
    //   label: "Report",
    //   icon: <HiOutlineChartBar size={16} />,
    // },
  ];

  return (
    <div className="sidebar-h sticky left-0 top-[70px] z-10 w-[230px] flex-shrink-0 bg-obs-blue px-3 pt-12">
      {linkArr.map((link) => (
        <Link href={link.link} key={link.label}>
          <div
            className={`${
              (
                link.exact
                  ? pathname === link.link
                  : pathname?.includes(link.link)
              )
                ? "relative rounded-[4px] bg-transparent text-btn-active"
                : "text-obs-light"
            }
            mx-auto mb-2 flex h-[2.75rem] cursor-pointer items-center justify-start gap-2 pl-2 transition-all hover:text-white`}
          >
            <div className="z-10">{link.icon}</div>
            <p className="z-10 text-[13px] font-bold leading-4">{link.label}</p>
            {(
              link.exact
                ? pathname === link.link
                : pathname?.includes(link.link)
            ) ? (
              <motion.span
                className="absolute left-0 top-0 h-full w-full bg-btn-link"
                layoutId="underline"
              />
            ) : null}
          </div>
        </Link>
      ))}

      <button
        onClick={onLogout}
        className="mx-auto mt-8 flex w-full cursor-pointer items-center justify-start gap-2 border-t border-obs-light py-3 pl-4 text-obs-light transition-all hover:text-white"
      >
        <BiLogOut size={16} />
        <p className="text-[13px] font-medium leading-4">Logout</p>
      </button>

      <div className="absolute bottom-4 left-0 mx-auto flex cursor-pointer items-center justify-start gap-2 pl-3 pt-3 text-obs-light transition-all md:w-[90%] xl:w-[14rem]">
        <p className="text-xs font-light leading-4 text-obs-medium">
          © 2023. First Bank of Nigeria Ltd. An FBNHoldings Company.
        </p>
      </div>
    </div>
  );
}
