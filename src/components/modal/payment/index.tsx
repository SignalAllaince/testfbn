import Button from "@/components/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Modal from "..";
import errorImg from "../../../../public/images/failed.svg";
import successImg from "../../../../public/images/success.svg";

function PaymentModal({
  isOpen,
  onClose,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <motion.div className="space-y-4 py-6 md:px-5" layout>
        <Loading />
        {!isLoading ? <SuccessComp /> : <Loading />}
        <ErrorComp />
      </motion.div>
    </Modal>
  );
}

export default PaymentModal;

function Loading() {
  return (
    <div className="text-md mx-auto max-w-md space-y-6 text-center font-light">
      <div>
        <p>Please wait...</p>
        <p>we are processing your payment.</p>
      </div>
    </div>
  );
}

function ErrorComp() {
  return (
    <div className="text-md mx-auto max-w-md space-y-6 text-center font-light">
      <div className="mx-auto grid max-w-[100px] place-items-center">
        <Image src={errorImg} alt="success icon" />
      </div>
      <div>
        <p className="text-lg">Payment failed! Please try again</p>
      </div>
    </div>
  );
}

function SuccessComp() {
  return (
    <div className="text-md mx-auto max-w-md space-y-6 text-center font-light">
      <div className="mx-auto grid max-w-[100px] place-items-center">
        <Image src={successImg} alt="success icon" />
      </div>
      <div>
        <p className="text-lg">Payment successful!</p>
      </div>
      <div>
        <p>Your order with Order number: FBBS-209323827</p>
        <p> has been successfully submitted.</p>
      </div>
      <div className="pt-10">
        <Button className="w-full px-2 text-sm uppercase">
          Continue shopping
        </Button>
      </div>
    </div>
  );
}
