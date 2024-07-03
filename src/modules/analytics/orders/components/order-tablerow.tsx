import Badge from "@/components/badge";
import Icon from "@/components/icon";
import { Menu, MenuButton, MenuItem, MenuItems } from "@/components/menu";
import useDisclosure from "@/hooks/use-disclosure";
import { CheckoutOrderItem } from "@/types/api.types";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import OrderDrawer from "./order-drawer";

function OrderTableRow({
  order,
  isLast = false,
}: // refetchOrders,
{
  order: CheckoutOrderItem;
  isLast?: boolean;
  refetchOrders?: () => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <motion.tr
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-b bg-white text-brand-darkest hover:bg-gray-50"
      >
        <td className="w-32 p-4 py-5 text-center">{order.id}</td>
        <td scope="row" className="max-w-[300px] px-4 py-5 text-center">
          {order.dateCreated}
        </td>
        <td scope="row" className="px-6 py-5 text-center">
          <Badge variant={order.status}>{order.status}</Badge>
        </td>
        <td scope="row" className="px-6 py-5 text-center">
          {order.customerName}
        </td>
        <td scope="row" className="px-6 py-5 text-center">
          {order.orderTotalString}
        </td>
        <td scope="row" className="relative px-6 py-5 text-center">
          <Menu>
            <MenuButton className="text-brand-darkest">
              <Icon IconComp={EllipsisHorizontalIcon} />
            </MenuButton>
            <MenuItems
              menuClasses={`${
                isLast ? "right-12 bottom-0" : "right-0"
              }  !w-36 bg-[#F5F8FA] divide-y mt-2 divide-gray-100`}
            >
              <MenuItem
                className="h-[38px] text-sm"
                onClick={onOpen}
                leftIcon={<Icon IconComp={EyeIcon} boxSize={4} />}
              >
                View
              </MenuItem>
            </MenuItems>
          </Menu>
        </td>
        {<OrderDrawer isOpen={isOpen} onClose={onClose} orderId={order.id} />}
      </motion.tr>
    </>
  );
}

export default OrderTableRow;
