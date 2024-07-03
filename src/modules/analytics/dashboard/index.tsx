import FadeInOut from "@/components/fade";
import Heading from "@/components/heading";
import IfElse from "@/components/if-else";
import TopItemStats from "@/components/top-item-stats";
import useGetBestCustomers from "@/hooks/analytics/useGetBestCustomers";
import useGetSalesOverview from "@/hooks/analytics/useGetSalesOverview";
import useGetTotalItemsSold from "@/hooks/analytics/useGetTotalItemsSold";
import useGetTotalSales from "@/hooks/analytics/useGetTotalSales";
import useGetProducts from "@/hooks/products/useGetProducts";
import Layout from "@/layout/admin-layout";
import { formatCurrency } from "@/lib/utils/common.utils";
import { NextPageWithLayout } from "@/types/component.types";
import dayjs from "dayjs";
import { AnimatePresence } from "framer-motion";
import React from "react";
import DashboardSorter from "./components/dashboard-sorter";
import SoldItem from "./components/sold-item";
import Stocks from "./components/stocks";
import TopSellingItems from "./components/top-selling-items";

const Home: NextPageWithLayout = () => {
  // const branchArr = [
  //   {
  //     customer: "Port Harcourt GRA II",
  //     totalBought: 4096,
  //   },
  //   {
  //     customer: "Wuse, Abuja III",
  //     totalBought: 4002,
  //   },
  //   {
  //     customer: "Ikeja Main",
  //     totalBought: 3948,
  //   },
  //   {
  //     customer: "Mainland II",
  //     totalBought: 3901,
  //   },
  //   {
  //     customer: "Enugu GRA I",
  //     totalBought: 3893,
  //   },
  //   {
  //     customer: "Abuja Barracks",
  //     totalBought: 3867,
  //   },
  //   {
  //     customer: "Owerri Municipal",
  //     totalBought: 3822,
  //   },
  // ];

  const [{ date_from, date_to }, setFilterDate] = React.useState<{
    date_from: string;
    date_to: string;
  }>({
    date_from: dayjs().format("YYYY-MM-DD"),
    date_to: dayjs().format("YYYY-MM-DD"),
  });

  const totalItemsSold = useGetTotalItemsSold({
    startDate: date_from,
    endDate: date_to,
  });
  const totalSales = useGetTotalSales({
    startDate: date_from,
    endDate: date_to,
  });
  const salesOverview = useGetSalesOverview({
    startDate: date_from,
    endDate: date_to,
  });
  const bestCustomers = useGetBestCustomers({
    startDate: date_from,
    endDate: date_to,
  });

  console.log(salesOverview?.value, "salesOverview?.value");
  const getProducts = useGetProducts(1, "StockQuantity", "10", 15);

  return (
    <main className="w-full space-y-6 bg-[#F5F8FA] pb-3">
      <div className="bg-white px-7 py-4">
        <Heading size="h3">Dashboard</Heading>
        <DashboardSorter
          isLoading={totalItemsSold.isFetching || totalSales.isFetching}
          setFilterDate={setFilterDate}
        />
      </div>
      <div className="grid w-full grid-cols-1 items-center gap-4 px-5 lg:grid-cols-2">
        <SoldItem
          text="Amount Sold"
          amount={totalSales?.value ? (totalSales?.value as any) : "₦ 0"}
        />
        <SoldItem
          text="Total Items Sold"
          amount={
            totalItemsSold?.value
              ? formatCurrency(totalItemsSold?.value as any, false)
              : "0"
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 px-5 md:grid-cols-2 lg:grid-cols-3">
        <TopSellingItems />
        <TopSellingItems name="branch" />
        <TopSellingItems name="categories" />
      </div>

      <div className="px-5">
        <AnimatePresence>
          <IfElse
            ifOn={!getProducts.isLoading && !!getProducts?.value}
            ifOnElse={getProducts.isLoading && !getProducts?.value}
            onElse={
              <FadeInOut>
                <div className="h-[200px] w-full animate-pulse rounded-md bg-slate-200"></div>
              </FadeInOut>
            }
            elseThen={
              <FadeInOut>
                <div className="flex h-[200px] w-full items-center justify-center bg-white text-center">
                  <Heading size="h5" className="text-slate-600">
                    Something Went wrong
                  </Heading>
                </div>
              </FadeInOut>
            }
          >
            <FadeInOut>
              <Stocks products={getProducts.value?.items!} />
            </FadeInOut>
          </IfElse>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 px-5 md:grid-cols-2">
        <AnimatePresence>
          <IfElse
            ifOn={!bestCustomers.isLoading && !!bestCustomers?.value}
            ifOnElse={bestCustomers.isLoading && !bestCustomers?.value}
            onElse={
              <FadeInOut>
                <div className="h-[200px] w-full animate-pulse rounded-md bg-slate-200"></div>
              </FadeInOut>
            }
            elseThen={
              <FadeInOut>
                <TopItemStats
                  headerText="Top individual customer sales"
                  arr={bestCustomers?.value!}
                />
              </FadeInOut>
            }
          >
            <FadeInOut>
              <TopItemStats
                headerText="Top individual customer sales"
                arr={bestCustomers?.value!}
              />
            </FadeInOut>
          </IfElse>
        </AnimatePresence>

        {/* <TopItemStats headerText="Top branch sales" arr={branchArr} /> */}
        <TopItemStats
          headerText="Top branch sales"
          arr={bestCustomers?.value!}
        />
      </div>
    </main>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
