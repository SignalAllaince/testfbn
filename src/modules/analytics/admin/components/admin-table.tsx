import Button from "@/components/button";
import ErrorMessage from "@/components/error-message";
import { rubik } from "@/components/fonts";
import IfElse from "@/components/if-else";
import AddAdminModal from "@/components/modal/add-admin";
import useDisclosure from "@/hooks/use-disclosure";
import { IUserSchema } from "@/types/api.types";
import { AnimatePresence, motion } from "framer-motion";
import { BiUserPlus } from "react-icons/bi";
import { BeatLoader } from "react-spinners";
import AdminTableRow from "./admin-tablerow";

function AdminTable({
  users,
  loading,
  refetchAdmins,
}: {
  users: IUserSchema[];
  loading: boolean;
  refetchAdmins: () => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <AddAdminModal
        isOpen={isOpen}
        onClose={onClose}
        refetchAdmins={refetchAdmins}
      />
      <div className="overflow-x-auto  sm:rounded-lg">
        <table className="w-full text-left text-sm text-brand-darkest">
          <thead
            className={`${rubik.className} border-b-2 bg-white text-md font-light capitalize text-brand-darkest`}
          >
            <tr>
              <th
                scope="col"
                className="min-w-[150px] px-6 py-4 text-center font-bold"
              >
                Admin Name
              </th>
              <th scope="col" className="min-w-[150px] px-6 py-4 text-center">
                Admin Email
              </th>
              <th scope="col" className="min-w-[150px] px-6 py-4 text-center">
                Date Added
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                <Button
                  size="small"
                  className="!h-8 w-[110px] flex-shrink-0 rounded !px-[2px] !text-sm"
                  leftIcon={<BiUserPlus size={15} />}
                  onClick={onOpen}
                >
                  Add Admin
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              <IfElse
                ifOn={!loading && !!users}
                ifOnElse={loading && !users}
                onElse={
                  <AnimatePresence>
                    <motion.tr
                      initial={{ opacity: 0.2 }}
                      exit={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="bg-white"
                    >
                      <td colSpan={6} className="bg-red relative py-28">
                        <div className="absolute left-1/2 top-1/2">
                          <BeatLoader
                            color="#003B65"
                            size={20}
                            loading={true}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      </td>
                    </motion.tr>
                  </AnimatePresence>
                }
                elseThen={
                  <tr>
                    <td colSpan={4}>
                      <ErrorMessage />
                    </td>
                  </tr>
                }
              >
                <>
                  {users?.map((user) => (
                    <AdminTableRow key={user.id} user={user} />
                  ))}
                </>
              </IfElse>
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default AdminTable;
