import Button from "@/components/button";
import FadeInOut from "@/components/fade";
import Heading from "@/components/heading";
import IfElse from "@/components/if-else";
import CustomInput from "@/components/input";
import useUpdateUser from "@/hooks/users/useUpdateUser";
import { IUserSchema } from "@/types/api.types";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "..";

type Inputs = {
  password: string;
};

function RemoveAdminModal({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: IUserSchema;
}) {
  const [status, setStatus] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const updateUser = useUpdateUser();

  const addNewAdminHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const resetFormHandler = () => {
    onClose();
    reset();
    setTimeout(() => setStatus(false), 1000);
  };

  const onRemoveHandler = () => {
    const roles = user?.roles?.filter((item) => item !== "Admin") ?? [];
    updateUser
      .mutateAsync({
        ...user,
        roles,
      })
      .then((res) => {
        console.log(res);
        onClose();
      })
      .catch(console.log);
  };
  return (
    <Modal isOpen={isOpen} closeModal={resetFormHandler}>
      <div className="">
        <AnimatePresence>
          <IfElse
            ifOn={!status}
            ifOnElse={status}
            onElse={
              <FadeInOut className="space-y-8 py-6 md:px-5">
                <div className="mb-8 space-y-1">
                  <Heading size="h3">Remove Admin</Heading>
                  <p className="text-md font-light">
                    Enter password to complete operation
                  </p>
                </div>
                <form
                  className="space-y-5"
                  onSubmit={handleSubmit(addNewAdminHandler)}
                >
                  <div className="w-full">
                    <div className="flex w-full items-end gap-0">
                      <CustomInput
                        {...register("password", { required: true })}
                        errors={errors}
                        type="password"
                        label="Password"
                        placeholder="******"
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      className="h-12 w-full uppercase"
                      type="submit"
                      disabled={!watch("password")}
                    >
                      Remove Admin
                    </Button>
                  </div>
                </form>
              </FadeInOut>
            }
          >
            <FadeInOut className="space-y-8 py-6 md:px-5">
              <div className="mx-auto max-w-sm text-center text-lg font-light">
                <p>
                  Are you sure you want to remove this user&apos;s Admin
                  privileges?
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Button
                  spinnerColor="#003B65"
                  onClick={onRemoveHandler}
                  // onClick={() => setStatus(true)}
                  isLoading={updateUser.isLoading}
                  className="w-full px-2 uppercase"
                  variant="secondary"
                >
                  Remove Admin
                </Button>
                <Button className="w-full px-2 uppercase" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </FadeInOut>
          </IfElse>
        </AnimatePresence>
      </div>
    </Modal>
  );
}

export default RemoveAdminModal;
