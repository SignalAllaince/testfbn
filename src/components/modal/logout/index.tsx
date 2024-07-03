import Button from "@/components/button";
import { Constants, PAGES } from "@/lib/constants";
import { QueryCache } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import React from "react";
import Modal from "..";

function LogoutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const queryCache = new QueryCache();

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="space-y-8 py-6 md:px-5">
        <div className="mx-auto max-w-sm text-center text-md font-light">
          <p>Are you sure you want to Log out?</p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            spinnerColor="#003B65"
            isLoading={loading}
            onClick={() => {
              setLoading(true);
              deleteCookie(Constants.token);
              queryCache.clear();
              window.location.replace(
                `${PAGES.SIGNIN}?callbackUrl=${window.location.href}`
              );
            }}
            className="w-full px-2 text-sm uppercase"
            variant="secondary"
          >
            yes, logout
          </Button>
          <Button className="w-full px-2 text-sm uppercase" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default LogoutModal;
