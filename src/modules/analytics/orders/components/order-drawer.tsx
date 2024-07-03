import Badge from "@/components/badge";
import Button from "@/components/button";
import Drawer from "@/components/drawer";
import ErrorMessage from "@/components/error-message";
import FadeInOut from "@/components/fade";
import Heading from "@/components/heading";
import IfElse from "@/components/if-else";
import ChangeStatusModal from "@/components/modal/change-status";
import useGetOrderById from "@/hooks/order/useGetOrderHistory";
import useDisclosure from "@/hooks/use-disclosure";
import dayjs from "dayjs";
import { AnimatePresence } from "framer-motion";
import OrderProductRow from "./order-section";

function OrderDrawer({
  isOpen,
  onClose,
  orderId,
}: {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}) {
  const order = useGetOrderById(orderId);
  const {
    isOpen: isStatusOpen,
    onClose: onStatusClose,
    onOpen,
  } = useDisclosure();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Order Details">
      <Drawer.Body>
        <AnimatePresence>
          <IfElse
            ifOn={!order.isLoading && !!order?.value}
            ifOnElse={order.isLoading && !order?.value}
            onElse={<FadeInOut className="space-y-8 py-6 md:px-5"></FadeInOut>}
            elseThen={<ErrorMessage />}
          >
            <FadeInOut className="space-y-8 py-6 md:px-5">
              <div className="space-y-5 pt-2">
                <div className="flex flex-col  justify-between gap-3">
                  <div className="flex w-fit items-center justify-start gap-4">
                    <p className="text-sm font-medium text-brand-darkest">
                      Order No. - {order.value?.id}
                    </p>
                    <Badge variant={order.value?.orderStatus}>
                      {order.value?.orderStatus}
                    </Badge>
                  </div>
                  <div className="flex">
                    <Heading size="h6">Item(s) Bought</Heading>
                  </div>
                </div>
                <div className="space-y-5">
                  {order?.value?.orderItems?.map((item) => (
                    <OrderProductRow key={item?.productId} product={item} />
                  ))}
                </div>
                <div className="item-start flex gap-3 text-[13px] font-light">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-4 border-t border-brand-light pt-4 font-light">
                      <h3 className="text-lg font-medium">Payment Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-4">
                          <p className="w-[170px]">Item Cost:</p>
                          <p className="font-medium">
                            {order?.value?.subTotalString}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="w-[170px]">Delivery/Shipping Cost:</p>
                          <p className="font-medium">
                            {order?.value?.shippingAmountString}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="w-[170px]">Product Tax (7.5%):</p>
                          <p className="font-medium">
                            {order?.value?.taxAmountString}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="w-[170px] text-sm font-medium">Total</p>
                          <p className="font-medium">
                            {order?.value?.orderTotalString}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 border-t border-brand-light pt-4 font-light">
                      <h3 className="text-lg font-medium">Delivery Details</h3>
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <p className="text-xs font-medium">
                            Delivery Address
                          </p>
                          <p className="text-[13px]">
                            {order?.value?.shippingAddress?.addressLine1},{" "}
                            {order?.value?.shippingAddress?.cityName},{" "}
                            {order?.value?.shippingAddress?.stateName}{" "}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Delivery Date</p>
                        <p className="text-[13px]">
                          To be delivered between{" "}
                          {dayjs(order?.value?.dateCreated)
                            .add(3, "day")
                            .format("dddd MMMM DD")}{" "}
                          and{" "}
                          {dayjs(order?.value?.dateCreated)
                            .add(10, "day")
                            .format("dddd MMMM DD")}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInOut>
          </IfElse>
        </AnimatePresence>
      </Drawer.Body>
      <Drawer.Footer>
        <div className="flex w-full items-center gap-4">
          <Button
            variant="primary"
            className="w-full text-sm uppercase"
            onClick={onOpen}
          >
            Change Order Status
          </Button>
          <Button
            variant="secondary"
            className="w-full text-sm uppercase"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Drawer.Footer>
      <ChangeStatusModal
        refetch={() => {}}
        isOpen={isStatusOpen}
        onClose={onStatusClose}
        orderStatus={order?.value?.orderStatus!}
        orderId={order.value?.id!}
      />
    </Drawer>
  );
}

export default OrderDrawer;
