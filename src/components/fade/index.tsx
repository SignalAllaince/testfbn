import { ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion";
import { DetailedHTMLProps, HTMLAttributes } from "react";

function FadeInOut(
  props: Omit<
    ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>,
    "$$typeof"
  > &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
      duration?: number;
    }
) {
  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.2 }}
      transition={{ duration: props.duration ?? 0.8 }}
      className={`w-full ${props.className}`}
    >
      {props.children}
    </motion.div>
  );
}

export default FadeInOut;
