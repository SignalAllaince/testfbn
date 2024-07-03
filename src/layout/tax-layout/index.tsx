import Button from "@/components/button";
import Header from "@/components/dashboardComponents/Header";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { text: "Tax Class", href: "/store/tax-class" },
  { text: "Tax Rate", href: "/store/tax-rate" },
  { text: "Shipping Rate", href: "/store/shipping-rate" },
];

const TaxShippingLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const changer = links.findIndex((link) => link.href === pathname);

  return (
    <div className="w-full bg-[#F5F8FA] pb-3">
      <Header heading="Tax/Shipping" />

      <div className="flex  flex-wrap justify-start gap-3 bg-white px-6 py-4 pb-8">
        {links.map((tab) => (
          <Button
            key={tab.text}
            variant="secondary"
            size="small"
            href={tab.href}
            style={{ background: "transparent" }}
            className={`${
              pathname === tab.href ? "bg-transparent" : ""
            } !h-9 min-w-[72px] border-brand-light bg-transparent !px-3 !text-[13px] !font-medium capitalize !text-brand-darkest`}
          >
            <span className="z-10"> {tab.text}</span>
            {pathname === tab.href ? (
              <motion.span
                className="absolute left-0 top-0 h-full w-full rounded-sm bg-brand-light"
                layoutId="tax"
              />
            ) : null}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={changer}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.3 }}
          className="flex-1"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TaxShippingLayout;
