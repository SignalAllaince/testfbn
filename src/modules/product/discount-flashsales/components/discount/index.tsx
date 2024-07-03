import Pagination from "@/components/paginate";
import GeneralSortController from "@/components/sorter";
import useGetProducts from "@/hooks/products/useGetProducts";
import PaginationContextProvider from "@/hooks/use-pagination";
import React from "react";
import DiscountTable from "./discount-table";

function Discount() {
  const [page, setPage] = React.useState(1);
  const [searchParams, setParams] = React.useState({
    sort: "",
    search: "",
  });

  const getProducts = useGetProducts(
    page,
    searchParams.sort,
    searchParams.search
  );

  return (
    <div>
      <GeneralSortController
        setParams={setParams}
        isLoading={getProducts.isRefetching}
        searchParams={searchParams}
      />
      <DiscountTable
        loading={getProducts.isLoading}
        products={getProducts?.value?.items!}
      />

      {getProducts?.value && (
        <PaginationContextProvider
          currentPageNumber={page}
          pageSize={10}
          setPage={setPage}
          total={getProducts?.value?.totalItems!}
        >
          <div className="flex items-center justify-center bg-white py-7 ">
            <Pagination />
          </div>
        </PaginationContextProvider>
      )}
    </div>
  );
}

export default Discount;
