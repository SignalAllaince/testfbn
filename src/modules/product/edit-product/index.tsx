import Header from "@/components/dashboardComponents/Header";
import FadeInOut from "@/components/fade";
import IfElse from "@/components/if-else";
import Section from "@/components/section";
import useGetProduct from "@/hooks/products/useGetProduct";
import Layout from "@/layout/admin-layout";
import { NextPageWithLayout } from "@/types/component.types";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { BeatLoader } from "react-spinners";
import EditMainSection from "./main";

export const getServerSideProps: GetServerSideProps<{
  query: ParsedUrlQuery;
}> = async (params) => {
  return {
    props: {
      query: params.query,
    },
  };
};

const EditProductPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ query }) => {
  const getProduct = useGetProduct(query?.productId as string);

  return (
    <div className="home-height w-full bg-white pb-3">
      <Section>
        <Header isPrev className="pl-0" heading="Edit Product" />
      </Section>

      <Section className="space-y-4 px-10 pb-10">
        <AnimatePresence>
          <IfElse
            ifOn={!getProduct.isLoading && !!getProduct?.value}
            ifOnElse={getProduct.isLoading && !getProduct?.value}
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
            <FadeInOut className="md:px-5">
              <EditMainSection product={getProduct?.value!} />
            </FadeInOut>
          </IfElse>
        </AnimatePresence>
      </Section>

      {/* table */}
    </div>
  );
};

EditProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditProductPage;
