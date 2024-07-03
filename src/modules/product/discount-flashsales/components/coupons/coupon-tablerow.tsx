import Icon from "@/components/icon";
import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/menu";
import useDisclosure from "@/hooks/use-disclosure";
import { CouponItem } from "@/types/api.types";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { motion } from "framer-motion";

function CouponTableRow({
  coupon,
  isLast = false,
}: {
  coupon: CouponItem;
  isLast?: boolean;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <motion.tr
        initial={{ opacity: 0.2 }}
        exit={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-b border-brand-lightest bg-white font-extralight hover:bg-gray-50"
      >
        <td scope="row" className="px-6 py-6">
          #{coupon.id}
        </td>
        <td scope="row" className="px-6 py-6">
          {coupon.code}
        </td>
        <td scope="row" className="px-6 py-6">
          {dayjs(coupon.startOn!).format("MMM D, h:mm A")}
        </td>
        <td scope="col" className="px-6 py-6">
          {dayjs(coupon.endOn!).format("MMM D, h:mm A")}
        </td>
        <td scope="col" className="px-6 py-6">
          {coupon.isActive ? (
            <div className="grid w-fit place-items-center rounded-2xl bg-green-100 px-4 py-2 text-sm font-extrabold capitalize text-green-800">
              <span className="m-0 p-0 font-extrabold">Active</span>
            </div>
          ) : (
            <div className="grid w-fit place-items-center rounded-2xl bg-red-100 px-4 py-2 text-sm font-extrabold capitalize text-red-700">
              <span className="m-0 p-0 font-bold">Inactive</span>
            </div>
          )}
        </td>
        <td scope="row" className="max-w-[150px] px-4 py-6 text-center">
          <Menu>
            <MenuButton className="text-brand-darkest">
              <Icon IconComp={EllipsisHorizontalIcon} />
            </MenuButton>
            <MenuItems
              menuClasses={`${
                isLast ? "right-0 -bottom-6" : "right-0"
              }  !w-36 bg-[#F5F8FA] divide-y mt-2 divide-gray-100`}
            >
              <MenuItem
                className="h-[38px] text-sm"
                leftIcon={<Icon IconComp={EyeIcon} boxSize={4} />}
                onClick={onOpen}
              >
                View
              </MenuItem>
              {/* <MenuItem
                className="h-[38px] text-sm"
                leftIcon={<Icon IconComp={PencilIcon} boxSize={4} />}
                href={`/inventory/edit/${coupon.id}`}
              >
                Edit
              </MenuItem> */}
              <MenuItem
                className="h-[38px] text-sm !text-red-600"
                leftIcon={<Icon IconComp={TrashIcon} boxSize={4} />}
                onClick={onOpen}
              >
                Delete
              </MenuItem>
            </MenuItems>
          </Menu>
        </td>
      </motion.tr>
      {/* <ItemReviewModal isOpen={isOpen} onClose={onClose} review={review} /> */}
    </>
  );
}

export default CouponTableRow;
