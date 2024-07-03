import { AnimatePresence, motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

function TableLoader({ colSpan = 6 }) {
  return (
    <AnimatePresence>
      <motion.tr
        initial={{ opacity: 0.2 }}
        exit={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white"
      >
        <td colSpan={colSpan} className="bg-red relative py-28">
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
  );
}

export default TableLoader;
