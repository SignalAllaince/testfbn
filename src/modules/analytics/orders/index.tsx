import Header from "@/components/dashboardComponents/Header";
import EmptyProduct from "@/components/empty-products";
import ErrorMessage from "@/components/error-message";
import IfElse from "@/components/if-else";
import Pagination from "@/components/paginate";
import useGetOrderList from "@/hooks/order/useGetOrderList";
import PaginationContextProvider from "@/hooks/use-pagination";
import Layout from "@/layout/admin-layout";
import { NextPageWithLayout } from "@/types/component.types";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { BeatLoader } from "react-spinners";
import OrderSorter from "./components/order-sort";
import OrderTable from "./components/order-table";
import OrderTableRow from "./components/order-tablerow";

const Orders: NextPageWithLayout = () => {
  const [page, setPage] = React.useState(1);
  const pageSize = 20;
  const [searchParams, setParams] = React.useState({
    sort: "",
    search: "",
  });

  const orderList = useGetOrderList({
    page,
    pageSize,
    search: searchParams.search,
    sort: searchParams.sort,
    // startDate: date_from,
    // endDate: date_to,
  });

  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [orderList?.value?.currentPage]);

  return (
    <div className="w-full pb-3">
      <div className="space-y-6 bg-white">
        <Header heading="Orders" />
        <OrderSorter
          isLoading={orderList.isRefetching}
          setParams={setParams}
          searchParams={searchParams}
          setPage={setPage}
          // refetch={orderList.refetch}
        />
      </div>
      <div ref={sectionRef} className="relative top-96" />
      <div className="flex w-full flex-col space-x-4 bg-white py-3 pt-6">
        <div className="w-full">
          <OrderTable>
            <AnimatePresence>
              <IfElse
                ifOn={!orderList.isLoading && !!orderList?.value}
                ifOnElse={orderList.isLoading && !orderList?.value}
                onElse={
                  <AnimatePresence>
                    <motion.tr
                      initial={{ opacity: 0.2 }}
                      exit={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="bg-white"
                    >
                      <td colSpan={7} className="bg-red relative py-28">
                        <div className="absolute left-1/2 top-1/2">
                          <BeatLoader
                            color="#003B65"
                            size={20}
                            loading={true}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      </td>
                    </motion.tr>
                  </AnimatePresence>
                }
                elseThen={
                  <tr>
                    <td colSpan={7}>
                      <ErrorMessage />
                    </td>
                  </tr>
                }
              >
                <IfElse
                  ifOn={orderList?.value && orderList?.value?.items?.length > 0}
                  ifOnElse={
                    orderList?.value && orderList?.value?.items?.length === 0
                  }
                  onElse={
                    <tr>
                      <td colSpan={7}>
                        <EmptyProduct />
                      </td>
                    </tr>
                  }
                >
                  <>
                    {orderList?.value?.items?.map((order, index) => (
                      <OrderTableRow
                        order={order}
                        isLast={orderList?.value?.items?.length === index + 1}
                        key={order.id}
                        refetchOrders={orderList?.refetch}
                      />
                    ))}
                  </>
                </IfElse>
              </IfElse>
            </AnimatePresence>
          </OrderTable>
          <>
            {orderList?.value && (
              <PaginationContextProvider
                currentPageNumber={page}
                pageSize={pageSize}
                setPage={setPage}
                total={orderList?.value?.totalItems!}
              >
                <div className="flex items-center justify-center bg-white py-7 ">
                  <Pagination />
                </div>
              </PaginationContextProvider>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

Orders.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Orders;
