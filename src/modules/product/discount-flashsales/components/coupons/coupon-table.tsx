import EmptyReview from "@/components/empty-review";
import ErrorMessage from "@/components/error-message";
import { rubik } from "@/components/fonts";
import IfElse from "@/components/if-else";
import TableLoader from "@/components/loader";
import { CouponItem } from "@/types/api.types";
import { AnimatePresence } from "framer-motion";
import CouponTableRow from "./coupon-tablerow";

/* eslint-disable no-constant-condition */
function CouponTable({
  loading,
  coupons,
}: {
  loading: boolean;
  coupons: CouponItem[];
}) {
  return (
    <div className="overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-left text-sm text-brand-darkest">
        <thead
          className={`${rubik.className} border-b border-t bg-white text-md font-light capitalize text-brand-darkest`}
        >
          <tr>
            <th scope="col" className="min-w-[150px] px-6 py-3 font-bold">
              Id
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-3 font-bold">
              Coupon Code
            </th>
            <th scope="col" className="min-w-[150px] px-6 py-3 font-bold">
              Start Date
            </th>

            <th scope="col" className="min-w-[150px] px-6 py-3 font-bold">
              End Date
            </th>
            <th scope="col" className="min-w-[200px] px-6 py-3 font-bold">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right font-bold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            <IfElse
              ifOn={!loading && !!coupons}
              ifOnElse={loading && !coupons}
              onElse={<TableLoader />}
              elseThen={
                <tr>
                  <td colSpan={6}>
                    <ErrorMessage />
                  </td>
                </tr>
              }
            >
              <IfElse
                ifOn={coupons && coupons?.length > 0}
                ifOnElse={coupons && coupons?.length === 0}
                onElse={
                  <tr>
                    <td colSpan={6}>
                      <EmptyReview />
                    </td>
                  </tr>
                }
              >
                <>
                  {coupons?.map((coupon, index) => (
                    <CouponTableRow
                      coupon={coupon}
                      key={coupon.id}
                      isLast={coupons.length === index + 1}
                    />
                  ))}
                </>
              </IfElse>
            </IfElse>
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default CouponTable;
