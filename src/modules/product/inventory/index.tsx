import Button from "@/components/button";
import Header from "@/components/dashboardComponents/Header";
import FadeInOut from "@/components/fade";
import IfElse from "@/components/if-else";
import Pagination from "@/components/paginate";
import useGetProducts from "@/hooks/products/useGetProducts";
import PaginationContextProvider from "@/hooks/use-pagination";
import Layout from "@/layout/admin-layout";
import { NextPageWithLayout } from "@/types/component.types";
import { AnimatePresence } from "framer-motion";
import React from "react";
import CategorySection from "../category";
import InventoryAnalysis from "./components/inventory-analytics";
import InventorySortController from "./components/inventory-sorter";
import InventoryTable from "./components/inventory-table";

const stages = [
  { name: "Main", value: "product" as const },
  { name: "Categories", value: "category" as const },
];

const Inventory: NextPageWithLayout = () => {
  const [page, setPage] = React.useState(1);
  const [stage, setStage] = React.useState<"product" | "category">("product");
  const [searchParams, setParams] = React.useState({
    sort: "",
    search: "",
  });
  const getProducts = useGetProducts(
    page,
    searchParams.sort,
    searchParams.search
  );
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [getProducts?.value?.currentPage]);

  React.useEffect(() => {
    getProducts.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full bg-[#F5F8FA] pb-3">
      <Header heading="Inventory Management" />
      <InventoryAnalysis />
      {/* activity section */}
      <div className="my-3 flex gap-4 bg-white px-6 py-4">
        {stages.map((item) => (
          <Button
            key={item.value}
            variant="secondary"
            size="small"
            onClick={() => setStage(item.value)}
            className={`${
              stage === item.value ? "!bg-brand-light" : ""
            } !h-9 w-[84px] border-brand-light !px-3 !text-[13px] !font-medium capitalize !text-brand-darkest`}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div ref={sectionRef} />
      <AnimatePresence>
        <IfElse
          ifOn={stage === "product"}
          ifOnElse={stage === "category"}
          onElse={
            <FadeInOut key={stage}>
              <CategorySection />
            </FadeInOut>
          }
        >
          <FadeInOut key={stage}>
            <InventorySortController
              isLoading={getProducts.isRefetching}
              setParams={setParams}
              setPage={setPage}
              searchParams={searchParams}
            />
            {/* activity section */}

            {/* table */}
            <div className="bg-white p-4 pb-1">
              <InventoryTable
                loading={getProducts.isLoading}
                products={getProducts?.value?.items!}
                refetchProducts={() => getProducts.refetch()}
              />
            </div>
            {getProducts?.value && (
              <PaginationContextProvider
                currentPageNumber={page}
                pageSize={8}
                setPage={setPage}
                total={getProducts?.value?.totalItems!}
                isLoading={getProducts.isFetching}
              >
                <div className="flex items-center justify-center bg-white py-7 ">
                  <Pagination />
                </div>
              </PaginationContextProvider>
            )}
          </FadeInOut>
        </IfElse>
      </AnimatePresence>

      {/* table */}
    </div>
  );
};

Inventory.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Inventory;
