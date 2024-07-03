import Button from "@/components/button";
import ErrorMessage from "@/components/error-message";
import FadeInOut from "@/components/fade";
import Heading from "@/components/heading";
import IfElse from "@/components/if-else";
import CreateShippingRate from "@/components/modal/create-shippingrate";
import Pagination from "@/components/paginate";
import useGetShippingRates from "@/hooks/shipping-rate/useGetShippingRates";
import useDisclosure from "@/hooks/use-disclosure";
import PaginationContextProvider from "@/hooks/use-pagination";
import Layout from "@/layout/admin-layout";
import TaxShippingLayout from "@/layout/tax-layout";
import { NextPageWithLayout } from "@/types/component.types";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { BeatLoader } from "react-spinners";
import ShippingTable from "./shipping-table";

const ProductShippingRate: NextPageWithLayout = () => {
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const shippingRates = useGetShippingRates(page, pageSize);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [shippingRates?.value?.currentPage]);

  return (
    <div className="mt-5 w-full bg-white px-6 py-6 pb-3">
      <AnimatePresence>
        <IfElse
          ifOn={!shippingRates.isLoading && !!shippingRates?.value}
          ifOnElse={shippingRates.isLoading && !shippingRates?.value}
          onElse={
            <FadeInOut className="flex items-center justify-center bg-white py-32">
              <div className="">
                <BeatLoader
                  color="#003B65"
                  size={20}
                  loading={true}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </FadeInOut>
          }
        >
          <IfElse
            ifOn={shippingRates?.value?.items?.length! >= 1}
            ifOnElse={shippingRates?.value?.items?.length === 0}
            onElse={
              <FadeInOut className="flex items-center justify-center bg-white py-20">
                <div className="space-y-5 ">
                  <div className="flex flex-col items-center">
                    <Heading size="h4">No Tax Class Yet!</Heading>
                    <p className="text-sm">
                      This would allow you set your Tax Class for your products
                    </p>
                  </div>
                  <Button onClick={onOpen} size="small" className="mx-auto">
                    CREATE SHIPPING RATE
                  </Button>
                </div>
              </FadeInOut>
            }
            elseThen={<ErrorMessage />}
          >
            <div className="max-w-5xl space-y-4 py-3">
              <Heading size="h5">List of shipping rates</Heading>
              <div ref={sectionRef}>
                <div>
                  <ShippingTable
                    shippingRatesData={shippingRates?.value?.items!}
                    refetch={shippingRates.refetch}
                  />
                  <div className="flex items-center justify-between">
                    {shippingRates?.value && (
                      <PaginationContextProvider
                        currentPageNumber={shippingRates?.value?.currentPage}
                        pageSize={pageSize}
                        setPage={setPage}
                        total={shippingRates?.value?.totalItems!}
                      >
                        <div className="flex items-center justify-center bg-white py-7">
                          <Pagination />
                        </div>
                      </PaginationContextProvider>
                    )}
                  </div>
                </div>
                <div className="">
                  <Button
                    onClick={onOpen}
                    size="xs"
                    className="ml-auto rounded-sm"
                  >
                    CREATE SHIPPING RATE
                  </Button>
                </div>
              </div>
            </div>
          </IfElse>
        </IfElse>
      </AnimatePresence>
      <CreateShippingRate
        isOpen={isOpen}
        onClose={onClose}
        refetch={shippingRates.refetch}
      />
    </div>
  );
};
ProductShippingRate.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <TaxShippingLayout>{page}</TaxShippingLayout>
    </Layout>
  );
};

export default ProductShippingRate;
