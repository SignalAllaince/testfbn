import Button from "@/components/button";
import RemoveAdminModal from "@/components/modal/remove-admin";
import useDisclosure from "@/hooks/use-disclosure";
import { IUserSchema } from "@/types/api.types";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { BiUserX } from "react-icons/bi";

function AdminTableRow({ user }: { user: IUserSchema }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <RemoveAdminModal user={user} isOpen={isOpen} onClose={onClose} />
      <motion.tr
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-b border-brand-lightest bg-white hover:bg-gray-50"
      >
        <td scope="row" className="px-6 py-4 text-center">
          {user.fullName || user.userName}
        </td>
        <td scope="row" className="px-6 py-4 text-center">
          {user.email}
        </td>
        <td scope="col" className="px-6 py-4 text-center">
          {dayjs(user.dateCreated).format("DD MMM YYYY")}
        </td>
        <td scope="row" className="relative  px-4 py-4 text-center">
          <Button
            size="small"
            disabled={user.roles.includes("SuperAdmin")}
            className="!h-8 w-[130px] flex-shrink-0 rounded bg-brand-darkest !px-[2px] !text-sm hover:bg-brand-blue"
            leftIcon={<BiUserX size={15} />}
            onClick={onOpen}
          >
            Remove Admin
          </Button>
        </td>
      </motion.tr>
    </>
  );
}

export default AdminTableRow;
