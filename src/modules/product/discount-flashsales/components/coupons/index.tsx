import Pagination from "@/components/paginate";
import useGetCouponList from "@/hooks/coupons/useGetCouponList";
import PaginationContextProvider from "@/hooks/use-pagination";
import { CouponItem } from "@/types/api.types";
import React from "react";
import CouponSorter from "./coupon-sorter";
import CouponTable from "./coupon-table";

function CouponSection() {
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const [searchParams, setParams] = React.useState({
    sort: "",
    search: "",
  });

  const couponList = useGetCouponList({
    page,
    pageSize,
    search: searchParams.search,
    sort: searchParams.sort,
  });

  return (
    <div>
      <div className="border bg-white px-6 py-10">
        <div className="flex w-full items-start justify-between space-x-4">
          <CouponSorter
            isLoading={couponList.isRefetching}
            setParams={setParams}
            setPage={setPage}
            searchParams={searchParams}
          />
        </div>
      </div>
      <div className="w-full overflow-x-scroll bg-white">
        <CouponTable
          loading={couponList.isLoading}
          coupons={
            couponList?.value?.items! ||
            //   @ts-expect-error
            (couponList?.dataValue?.items! as CouponItem[])
          }
        />
      </div>

      {couponList?.dataValue && (
        <PaginationContextProvider
          currentPageNumber={page}
          pageSize={10}
          setPage={setPage}
          total={
            couponList?.value?.totalItems! ?? couponList?.dataValue?.totalItems!
          }
        >
          <div className="flex items-center justify-center bg-white py-7">
            <Pagination />
          </div>
        </PaginationContextProvider>
      )}
    </div>
  );
}

export default CouponSection;
