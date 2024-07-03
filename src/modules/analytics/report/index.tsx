import Header from "@/components/dashboardComponents/Header";
import Layout from "@/layout/admin-layout";
import { NextPageWithLayout } from "@/types/component.types";
import React from "react";
import TopSellingItems from "../dashboard/components/top-selling-items";
import ReportSorter from "./components/report-sort";
import ReportTable from "./components/report-table";
import ReportTableFilter from "./components/report-tablefilter";

const Report: NextPageWithLayout = () => {
  return (
    <div className="w-full pb-3">
      <div className="bg-white">
        <Header heading="Report" />
        <ReportSorter />
      </div>
      <div className="flex w-full space-x-4 p-3">
        <div className="w-full bg-white"></div>
        {/* <TopItemStats headerText="New Customer" arr={customerArr} /> */}
        <TopSellingItems />
      </div>

      {/* table */}
      <>
        <ReportTableFilter />
        <ReportTable />
      </>
      {/* table */}
    </div>
  );
};

Report.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Report;
