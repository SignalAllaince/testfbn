import React from "react";

interface PaginationContextInterface {
  onNext: () => void;
  onDoubleNext: () => void;
  onPrev: () => void;
  onDoublePrev: () => void;
  currentPageNumber: number;
  isLoading: boolean;
  totalPages: number;
}
interface PaginationPropsInterface {
  children?: React.ReactNode;
  currentPageNumber: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  isLoading?: boolean;
  pageSize: number;
}

const PaginationCtx = React.createContext<PaginationContextInterface>(
  {} as PaginationContextInterface
);

const PaginationContextProvider = ({
  children,
  setPage,
  currentPageNumber,
  total,
  isLoading = false,
  pageSize,
}: PaginationPropsInterface) => {
  const totalPages = Math.ceil(total / pageSize);
  const onNext = () => {
    if (totalPages === currentPageNumber) return;
    setPage((prev) => prev + 1);
  };

  const onPrev = () => {
    if (currentPageNumber === 1) return;
    setPage((prev) => prev - 1);
  };

  const onDoubleNext = () => {
    if (currentPageNumber + 2 > totalPages) return;
    setPage((prev) => prev + 2);
  };

  const onDoublePrev = () => {
    if (currentPageNumber - 2 <= 0) return;
    setPage((prev) => prev - 2);
  };

  return (
    <PaginationCtx.Provider
      value={{
        currentPageNumber,
        onNext,
        onPrev,
        onDoubleNext,
        isLoading,
        onDoublePrev,
        totalPages,
      }}
    >
      {children}
    </PaginationCtx.Provider>
  );
};

export const usePagination = () => {
  const context = React.useContext(PaginationCtx);

  if (context === null) {
    throw new Error("usePagination must be used within a Pagination Provider");
  }
  return context;
};

export default PaginationContextProvider;
