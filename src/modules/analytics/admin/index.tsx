import Header from "@/components/dashboardComponents/Header";
import Pagination from "@/components/paginate";
import PaginationContextProvider from "@/hooks/use-pagination";
import usePostUserSearch from "@/hooks/users/usePostUserSearch";
import Layout from "@/layout/admin-layout";
import { NextPageWithLayout } from "@/types/component.types";
import React from "react";
import AdminTable from "./components/admin-table";

const Admin: NextPageWithLayout = () => {
  const [page, setPage] = React.useState(1);
  const userSearch = usePostUserSearch(page);

  return (
    <div className="w-full bg-[#F5F8FA] pb-3">
      <Header heading="Admin Management" />

      <div>
        <AdminTable
          refetchAdmins={userSearch.refetch}
          users={userSearch?.value?.items!}
          loading={userSearch.isLoading}
        />
      </div>
      {userSearch?.value && (
        <PaginationContextProvider
          currentPageNumber={page}
          pageSize={10}
          setPage={setPage}
          total={userSearch?.value?.totalItems!}
        >
          <div className="flex items-center justify-center bg-white py-7">
            <Pagination />
          </div>
        </PaginationContextProvider>
      )}
    </div>
  );
};

Admin.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Admin;
