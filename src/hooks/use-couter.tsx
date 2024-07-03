import React from "react";

function useCounter(limit = 10, start = 1) {
  const [quantity, setQuantity] = React.useState(start);

  React.useEffect(() => {
    setQuantity(start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  const increaseQuantity = () => setQuantity((prev) => Math.min(++prev, limit));
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => --prev);
  const setQuantityFn = (quantity: number) => setQuantity(quantity);

  return { quantity, increaseQuantity, decreaseQuantity, setQuantityFn };
}

export default useCounter;
