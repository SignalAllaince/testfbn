import Header from "@/components/dashboardComponents/Header";
import Pagination from "@/components/paginate";
import useGetReviewList from "@/hooks/review/useGetReviewList";
import PaginationContextProvider from "@/hooks/use-pagination";
import Layout from "@/layout/admin-layout";
import { NextPageWithLayout } from "@/types/component.types";
import React from "react";
import ReviewSorter from "./components/review-sort";
import ReviewsTable from "./components/review-table";

const Review: NextPageWithLayout = () => {
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const [searchParams, setParams] = React.useState({
    sort: "",
    search: "",
  });
  const [{ date_from, date_to }, setFilterDate] = React.useState<{
    date_from?: string;
    date_to?: string;
  }>({
    date_from: undefined,
    date_to: undefined,
  });

  const reviewList = useGetReviewList({
    page,
    pageSize,
    search: searchParams.search,
    sort: searchParams.sort,
    startDate: date_from,
    endDate: date_to,
  });

  return (
    <div className="w-full bg-[#F5F8FA] pb-3">
      <Header heading="Manage Reviews" />
      <div className="flex items-center justify-between bg-white px-6 py-8">
        <ReviewSorter
          isLoading={reviewList.isRefetching}
          isDateSelected={!!date_from && !!date_to}
          setFilterDate={setFilterDate}
          setParams={setParams}
          setPage={setPage}
          searchParams={searchParams}
        />
      </div>
      {/* table */}
      <div className="w-full overflow-x-scroll bg-white">
        <ReviewsTable
          loading={reviewList.isLoading}
          reviews={reviewList?.value?.items!}
          refetchReview={reviewList.refetch}
        />
      </div>

      {reviewList?.dataValue && (
        <PaginationContextProvider
          currentPageNumber={page}
          pageSize={10}
          setPage={setPage}
          total={reviewList?.value?.totalItems!}
        >
          <div className="flex items-center justify-center bg-white py-7">
            <Pagination />
          </div>
        </PaginationContextProvider>
      )}
    </div>
  );
};

Review.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Review;
