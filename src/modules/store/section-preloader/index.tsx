import FadeInOut from "@/components/fade";
import Layout from "@/layout/admin-layout";
import TaxShippingLayout from "@/layout/tax-layout";
import { NextPageWithLayout } from "@/types/component.types";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { BeatLoader } from "react-spinners";

const StorePage: NextPageWithLayout = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    // Redirect from /store to /store/product
    router.replace("/store/tax-class");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-5 w-full bg-white px-6 py-6 pb-3">
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
    </div>
  );
};

StorePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <TaxShippingLayout>{page}</TaxShippingLayout>
    </Layout>
  );
};

export default StorePage;
