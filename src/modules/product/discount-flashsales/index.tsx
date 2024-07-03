import Button from "@/components/button";
import Header from "@/components/dashboardComponents/Header";
import FadeInOut from "@/components/fade";
import IfElse from "@/components/if-else";
import Layout from "@/layout/admin-layout";
import { NextPageWithLayout } from "@/types/component.types";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import CouponSection from "./components/coupons";
import Discount from "./components/discount";
import FlashSales from "./components/flash-sales";

const DiscountFlash: NextPageWithLayout = () => {
  // const tabArr = ["Discount", "Coupons", "Flash Sales"];
  const tabArr = ["Create Coupons", "Coupons"];
  // const tabArr = ["Discount", "Discount History"];

  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full bg-[#F5F8FA] pb-3">
      <Header heading="Discount and Coupons" />

      <div className="flex  justify-start gap-3 bg-white px-6 py-4">
        {tabArr.map((tab, index) => (
          <Button
            key={tab}
            variant="secondary"
            size="small"
            onClick={() => setActiveTab(index)}
            className={`${
              activeTab === index ? "!bg-brand-light" : ""
            } !h-9 min-w-[72px] border-brand-light !px-3 !text-[13px] !font-medium capitalize !text-brand-darkest`}
          >
            {tab}
          </Button>
        ))}
      </div>

      <AnimatePresence>
        <IfElse
          ifOn={activeTab === 0}
          ifOnElse={activeTab === 2}
          onElse={
            <FadeInOut>
              <FlashSales />
            </FadeInOut>
          }
          elseThen={
            <FadeInOut>
              <CouponSection />
              {/* <FlashSalesHistory startFlashSales={() => setActiveTab(1)} /> */}
            </FadeInOut>
          }
        >
          <FadeInOut>
            <Discount />
          </FadeInOut>
        </IfElse>
      </AnimatePresence>
    </div>
  );
};
DiscountFlash.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DiscountFlash;
