import { ModalProps } from "@/types/component.types";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const sizes = {
  lg: "max-w-xl",
  xl: "max-w-2xl",
  large: "max-w-5xl",
  md: "max-w-[480px]",
};
function Modal({
  isOpen,
  closeModal,
  closeOnOverlayClick = false,
  children,
  title,
  size = "lg",
  isCloseIconPresent = true,
}: ModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeOnOverlayClick ? closeModal : () => null}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0  overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`relative w-full ${sizes[size]} transform overflow-hidden rounded-[8px] bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {/* Close button */}
                  {isCloseIconPresent ? (
                    <div className="absolute right-4 top-4">
                      <button
                        type="button"
                        className="rounded-full p-1 text-gray-600 hover:text-gray-800"
                        onClick={closeModal}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : null}

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default Modal;
