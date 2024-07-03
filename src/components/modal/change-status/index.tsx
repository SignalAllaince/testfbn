import { BadgeProps } from "@/components/badge";
import Button from "@/components/button";
import FadeInOut from "@/components/fade";
import Heading from "@/components/heading";
import IfElse from "@/components/if-else";
import Textarea from "@/components/input/text-area";
import useGetOrderStatus from "@/hooks/order/useGetOrderStatus";
import useUpdateOrderStatus from "@/hooks/order/useUpdateOrderStatus";
import { cn } from "@/lib/utils/component.utils";
import { RadioGroup } from "@headlessui/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import * as yup from "yup";
import Modal from "..";

export const categorySchema = yup.object({
  name: yup.string().required("product name is required").trim(),
  description: yup.string().required("description is required").trim(),
  icon: yup.string().required("icon is required").trim(),
});

function ChangeStatusModal({
  isOpen,
  onClose,
  refetch,
  orderStatus,
  orderId,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  orderStatus: BadgeProps["variant"];
  orderId: string;
}) {
  const [discountStatus, setDiscountStatus] = useState(orderStatus);
  const [description, setDescription] = useState("");
  const getOrderStatus = useGetOrderStatus();
  const updateOrderStatus = useUpdateOrderStatus(orderId);

  const onClear = () => {
    onClose();
    setDescription("");
    setDiscountStatus(orderStatus);
  };
  const updateOrderStatusHandler = () => {
    updateOrderStatus
      .mutateAsync({
        status: discountStatus,
        note: description,
      })
      .then(() => {
        refetch();
        onClear();
      })
      .catch(console.log);
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={onClear}
      size="lg"
      title={
        <Heading size="h5" className="pl-1">
          Update Order Status
        </Heading>
      }
    >
      <div className="space-y-8 py-6">
        <div className="space-y-4">
          <div className="flex items-center justify-start gap-3">
            <AnimatePresence>
              <IfElse
                ifOn={!getOrderStatus.isLoading && !!getOrderStatus?.value}
                ifOnElse={getOrderStatus.isLoading && !getOrderStatus?.value}
                onElse={
                  <FadeInOut>
                    <div className="h-[200px] w-full animate-pulse rounded-md bg-slate-200"></div>
                  </FadeInOut>
                }
                elseThen={
                  <FadeInOut>
                    <div className="flex h-[200px] w-full items-center justify-center bg-white text-center">
                      <Heading size="h5" className="text-slate-600">
                        Something Went wrong
                      </Heading>
                    </div>
                  </FadeInOut>
                }
              >
                <FadeInOut>
                  <RadioGroup
                    value={discountStatus}
                    onChange={setDiscountStatus}
                  >
                    <RadioGroup.Label className="sr-only">
                      Use Discount code?
                    </RadioGroup.Label>
                    <div className="flex flex-col  gap-3">
                      {getOrderStatus?.value?.slice(4)?.map((plan) => (
                        <RadioGroup.Option value={plan.id} key={plan.name}>
                          {({ checked, active }) => (
                            <div className="flex cursor-pointer items-center gap-2">
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "ring-brand-blue",
                                  active && checked ? "ring-2" : "",
                                  checked ? "bg-brand-blue" : "",
                                  !active && checked ? "ring-2" : "",
                                  "relative block h-[14px] w-[14px] rounded-sm border border-black border-opacity-80 ring-offset-2 transition-colors duration-200 focus:outline-none"
                                )}
                              />
                              <span className="text-md font-light">
                                {plan.name}
                              </span>
                            </div>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </FadeInOut>
              </IfElse>
            </AnimatePresence>
          </div>
          <Textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            bg="bg-brand-lightest"
            label="Description (optional)"
            name="Description"
            placeholder="Order have been shipped"
          />
          <div className="pt-4">
            <Button
              disabled={discountStatus === orderStatus}
              className="w-full uppercase"
              size="small"
              onClick={updateOrderStatusHandler}
              isLoading={updateOrderStatus.isLoading}
            >
              Update Status
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ChangeStatusModal;
