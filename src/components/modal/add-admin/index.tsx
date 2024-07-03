import Button from "@/components/button";
import Heading from "@/components/heading";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import useGetSingleAdmin from "@/hooks/users/useGetSingleAdmin";
import useUpdateUser from "@/hooks/users/useUpdateUser";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "..";

type Inputs = {
  email: string;
};

function AddAdminModal({
  isOpen,
  onClose,
  refetchAdmins,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRemoveHandler?: () => void;
  isLoading?: boolean;
  refetchAdmins: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [email, setEmail] = React.useState<string>("");
  const userSearch = useGetSingleAdmin(email);
  const updateUser = useUpdateUser();

  const addNewAdminHandler: SubmitHandler<Inputs> = (data) => {
    setEmail(data.email);
  };

  const makeUserAdminHandler = () => {
    const roles =
      userSearch?.value?.items[0]?.roles?.filter((item) => item !== "Admin") ??
      [];
    updateUser
      .mutateAsync({
        ...userSearch?.value?.items[0],
        roles: [...roles, "Admin"],
      })
      .then((res) => {
        console.log(res);
        refetchAdmins();
        onClose();
      })
      .catch(console.log);
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={onClose}
      size="lg"
      title={
        <Heading size="h3" className="pl-5 pt-2 ">
          Add Admin
        </Heading>
      }
    >
      <div className="space-y-8 py-6 md:px-5">
        <div className="space-y-5">
          <form className="w-full" onSubmit={handleSubmit(addNewAdminHandler)}>
            <div className="flex w-full items-end gap-0">
              <CustomInput
                {...register("email", { required: true })}
                errors={errors}
                type="email"
                label="Add Admin"
                rounded="rounded-none"
                placeholder="user@email.com"
              />
              <Button
                className="rounded-none capitalize"
                type="submit"
                disabled={!watch("email")}
              >
                Verify
              </Button>
            </div>
            {!userSearch?.value?.items.length &&
              !userSearch.isFetching &&
              email && (
                <div className="items-center text-red-600">
                  <p className="text-sm capitalize">No user found</p>
                </div>
              )}
            {(userSearch.isFetching || userSearch.isRefetching) &&
            userSearch.isFetching ? (
              <div className="mt-2 flex items-center space-x-2 text-sm font-light">
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin duration-700"
                  >
                    <path
                      d="M8.00065 1.3335V2.66683M11.334 2.22683L10.6673 3.3815M13.774 4.66683L12.6193 5.3335M14.6673 8.00016H13.334M13.774 11.3335L12.6193 10.6668M11.334 13.7735L10.6673 12.6188M8.00065 14.6668V13.3335M4.66732 13.7735L5.33398 12.6188M2.22732 11.3335L3.38198 10.6668M1.33398 8.00016H2.66732M2.22732 4.66683L3.38198 5.3335M4.66732 2.22683L5.33398 3.3815"
                      stroke="#142633"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p>Fetching User details</p>
              </div>
            ) : null}
          </form>

          {!!userSearch?.value?.items.length && !userSearch.isFetching && (
            <div className="mt-2 flex max-w-fit items-center gap-2 rounded-[4px] bg-[#F5F8FA] px-2 py-1 text-obs-blue">
              <Icon IconComp={UserCircleIcon} boxSize={4} />
              <p className="text-sm capitalize text-obs-blue">
                {userSearch?.value?.items?.[0]?.userName}
              </p>
            </div>
          )}

          <div className="pt-4">
            <Button
              className="h-12 w-full uppercase"
              isLoading={updateUser.isLoading}
              onClick={makeUserAdminHandler}
              disabled={!userSearch?.value?.items.length}
            >
              make admin
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddAdminModal;
