function useLocalStore(storeId: string) {
  if (typeof window === "undefined") return;
  const getItem = () => {
    const info = window.localStorage.getItem(storeId);
    return info ? JSON.parse(info) : null;
  };

  const setItem = (storeData: any) => {
    window.localStorage.setItem(storeId, JSON.stringify(storeData));
  };

  const removeItem = () => window.localStorage.removeItem(storeId);

  return { getItem, setItem, removeItem };
}

export default useLocalStore;
