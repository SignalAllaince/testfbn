import Button from "@/components/button";
import FilterMenu from "@/components/filter-menu";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import Textarea from "@/components/input/text-area";
import CartProductBtn from "@/components/product-btn";
import useCreateCoupon from "@/hooks/coupons/useCreateCoupon";
import useCounter from "@/hooks/use-couter";
import useNotification from "@/hooks/use-notification";
import { cn } from "@/lib/utils/component.utils";
import { ProductDetailsRes } from "@/types/api.types";
import DateSelect from "@/widgets/select/DateSelect";
import { RadioGroup } from "@headlessui/react";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { useState } from "react";

const rules = [
  {
    label: "Fixed",
    value: "Fixed",
  },
  {
    label: "Percentage",
    value: "Percentage",
  },
];

const list = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const initialState = {
  discountStatus: false,
  discount: "",
  description: "",
  coupon: "",
};
export default function DiscountSettings({
  productDetails,
  onClose,
}: {
  productDetails: ProductDetailsRes;
  onClose: () => void;
}) {
  const { toast } = useNotification();
  const [ruleToApply, setRule] = useState<"Fixed" | "Percentage">("Fixed");

  const [{ fromDate, toDate }, setDateFilter] = useState<{
    fromDate: Date | null;
    toDate: Date | null;
  }>({
    fromDate: null,
    toDate: null,
  });

  const [data, setData] = useState(initialState);

  const { quantity, increaseQuantity, decreaseQuantity, setQuantityFn } =
    useCounter(1000);

  const createCoupon = useCreateCoupon();
  const generateCouponCode = () => {
    let coupon = crypto.randomUUID().substring(0, 10);
    setData((prev) => ({
      ...prev,
      coupon,
    }));
  };

  const handleDateChange = (
    date: Date | null,
    origin: "fromDate" | "toDate"
  ) => {
    setDateFilter((prevState) => ({
      ...prevState,
      [origin]: date,
    }));
  };

  const onClear = () => {
    onClose();
    setData(initialState);
    setQuantityFn(1);
  };

  const createCouponHandler = () => {
    if (!data.coupon) {
      toast({
        title: "Something went wrong",
        description: "Please generate coupon code",
        appearance: "error",
      });
      return;
    }
    if (!fromDate) {
      toast({
        title: "Something went wrong",
        description: "Please select start date before creating coupon",
        appearance: "error",
      });
      return;
    }
    if (!toDate) {
      toast({
        title: "Something went wrong",
        description: "Please select end date before creating coupon",
        appearance: "error",
      });
      return;
    }
    if (!data.discount) {
      toast({
        title: "Something went wrong",
        description: `Please select input discount ${
          ruleToApply === "Fixed" ? "amount" : "percntage"
        }`,
        appearance: "error",
      });
      return;
    }

    createCoupon
      .mutateAsync({
        description: data.description,
        isActive: true,
        startOn: dayjs(fromDate).format("YYYY-MM-DD"),
        endOn: dayjs(toDate).format("YYYY-MM-DD"),
        couponCode: data.coupon,
        ruleToApply,
        discountAmount: data.discount,
        maxDiscountAmount: data.discount,
        usageLimit: quantity,
        usageLimitPerCustomer: 10,
        products: [
          {
            Id: productDetails.id,
            Name: productDetails.name,
            IsPublished: true,
          },
        ],
      })
      .then(() => {
        onClear();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="mt-0">
        <h2 className="text-[1.125rem] font-semibold leading-[26px] text-obs-blue">
          Discount Settings
        </h2>

        <div className="mt-4 flex items-center justify-between space-x-4">
          {/* left */}
          <div className="space-y-8">
            <div className="flex items-center justify-start gap-2">
              <p className="text-md font-light text-obs-blue">
                Use discount code?
              </p>
              <div className="flex items-center justify-start gap-3">
                <RadioGroup
                  value={data.discountStatus}
                  onChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      discountStatus: value,
                    }))
                  }
                >
                  <RadioGroup.Label className="sr-only">
                    Use Discount code?
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {list.map((plan) => (
                      <RadioGroup.Option value={plan.value} key={plan.label}>
                        {({ checked, active }) => (
                          <div className="flex cursor-pointer items-center gap-2">
                            <span
                              aria-hidden="true"
                              className={cn(
                                "ring-brand-blue",
                                active && checked ? "ring-2" : "",
                                checked ? "bg-brand-blue" : "",
                                !active && checked ? "ring-2" : "",
                                "relative mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 border-brand-blue border-opacity-80  ring-offset-1 focus:outline-none"
                              )}
                            />
                            <span className="text-md font-light">
                              {plan.label}
                            </span>
                          </div>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="space-y-1 text-md">
              <p>Discount code usage limit</p>
              <CartProductBtn
                quantity={quantity}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
            </div>
            <div className="">
              <Textarea
                value={data.description}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
                bg="bg-brand-lightest"
                label="Description (optional)"
                name="Description"
                placeholder="Order have been shipped"
              />
            </div>
          </div>

          {/* right */}
          <div className="space-y-8">
            <div className="relative w-full">
              <CustomInput
                label="Generate Discount Code"
                name="percentage"
                placeholder="Coupon code"
                value={!data.discountStatus ? "" : data.coupon}
                isDisabled
              />

              <Button
                onClick={generateCouponCode}
                size="xs"
                disabled={!data.discountStatus}
                className="absolute bottom-[6px] right-0 mr-1 rounded-sm text-sm"
              >
                Generate
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-start gap-2">
              <div className="flex w-96 items-end space-x-4">
                <FilterMenu
                  placeholder="Sub-Category"
                  options={rules}
                  value={ruleToApply}
                  onChange={(value) => setRule(value as "Fixed" | "Percentage")}
                  style={{
                    height: "42px",
                  }}
                />
                <CustomInput
                  label={
                    ruleToApply === "Percentage"
                      ? "Amount waved off (%)"
                      : "In Naira (₦)"
                  }
                  name="percentage"
                  placeholder={ruleToApply === "Percentage" ? "15%" : "1575"}
                  value={data.discount}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      discount: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 text-md text-brand-dark">
              <div className="flex flex-col justify-start gap-1">
                <p className="text-[13px]">From</p>
                <DateSelect
                  style={{ width: "100%" }}
                  className="h-[30px] items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
                  placeholderText="2013-10-12"
                  selected={fromDate}
                  onChange={(d) => handleDateChange(d, "fromDate")}
                  minDate={dayjs().toDate()}
                />
              </div>
              <Icon
                IconComp={ArrowSmallRightIcon}
                boxSize={4}
                className="flex-shrink-0"
              />
              <div className="flex flex-col justify-start gap-1">
                <p className="text-[13px]">To</p>
                <DateSelect
                  className="h-[30px] items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
                  placeholderText="2013-10-12"
                  selected={toDate}
                  onChange={(d) => handleDateChange(d, "toDate")}
                  minDate={fromDate!}
                  disabled={!fromDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <hr className="my-6" /> */}
      {/* <Requirements /> */}
      <div className="mt-12">
        <Button
          isLoading={createCoupon.isLoading}
          onClick={createCouponHandler}
          className="h-12 w-full text-md !font-bold uppercase"
        >
          Create Coupon
        </Button>
      </div>
    </div>
  );
}
