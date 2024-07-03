import { usePagination } from "@/hooks/use-pagination";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Button from "../button";
import Icon from "../icon";
import Spinner from "../spinner";

function Pagination() {
  const {
    onNext,
    onPrev,
    onDoublePrev,
    onDoubleNext,
    currentPageNumber,
    totalPages,
    isLoading,
  } = usePagination();
  return (
    <div
      className={`flex items-center gap-3 ${
        totalPages <= 1 ? "hidden" : "flex"
      } `}
    >
      <Button
        className="px-[8px]"
        variant="secondary"
        disabled={currentPageNumber - 2 <= 0}
        size="xs"
        onClick={onDoublePrev}
      >
        <Icon
          boxSize={4}
          className="text-brand-medium"
          IconComp={ChevronDoubleLeftIcon}
        />
      </Button>
      <Button
        className="px-[8px] outline-none focus:ring focus:ring-blue-300"
        variant="secondary"
        size="xs"
        onClick={onPrev}
        aria-label="prev page button"
        disabled={currentPageNumber === 1}
      >
        <Icon boxSize={5} className="" IconComp={ChevronLeftIcon} />
      </Button>
      <div className="flex h-8 items-center justify-center rounded border border-brand-blue px-[14px]">
        {currentPageNumber}
      </div>
      <p className="text-md font-light">of {totalPages}</p>

      <Button
        className="px-[8px] outline-none focus:ring focus:ring-blue-300"
        variant="secondary"
        size="xs"
        onClick={onNext}
        aria-label="next page button"
        disabled={currentPageNumber === totalPages}
      >
        <Icon boxSize={5} IconComp={ChevronRightIcon} />
      </Button>
      <Button
        className="px-[8px]"
        variant="secondary"
        size="xs"
        disabled={currentPageNumber + 2 > totalPages}
        onClick={onDoubleNext}
      >
        <Icon
          boxSize={4}
          className="text-brand-medium"
          IconComp={ChevronDoubleRightIcon}
        />
      </Button>
      {isLoading && <Spinner />}
    </div>
  );
}

export default Pagination;

// import React from 'react';
// import { HStack, IconButton, Text } from '@chakra-ui/react';
// import Icon from '../Icon/Icon';
// import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// interface TablePaginationProps {
//   onNext: () => void;
//   onPrev: () => void;
//   currentPageNumber: number;
//   isPrevDisabled: boolean;
//   isNextDisabled: boolean;
// }

// function TablePagination({
//   onNext,
//   onPrev,
//   currentPageNumber,
//   isPrevDisabled,
//   isNextDisabled,
// }: TablePaginationProps) {
//   return (
//     <HStack w="full" maxW="100px">
//       <IconButton
//         onClick={onPrev}
//         aria-label="prev page button"
//         size="sm"
//         colorScheme="gray"
//         isDisabled={isPrevDisabled}
//         rounded="full"
//       >
//         <Icon iconComp={BsChevronLeft} boxSize={4} />
//       </IconButton>
//       <Text fontSize="nm" fontFamily="Satoshi-Bold">
//         {currentPageNumber}
//       </Text>
//       <IconButton
//         onClick={onNext}
//         aria-label="next page button"
//         colorScheme="gray"
//         size="sm"
//         isDisabled={isNextDisabled}
//         rounded="full"
//       >
//         <Icon iconComp={BsChevronRight} boxSize={4} />
//       </IconButton>
//     </HStack>
//   );
// }

// export default TablePagination;

/* <TablePagination
onNext={onNext}
onPrev={onPrev}
currentPageNumber={currentPageNumber}
isPrevDisabled={currentPageNumber === 1}
isNextDisabled={currentPageNumber === totalPages}
/> */
