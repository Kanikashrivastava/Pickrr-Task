import { useEffect } from "react";
export const useDebounce = (handler, delay) => {
  useEffect(() => {
    const id = setTimeout(handler, delay);
    return () => {
      clearTimeout(id);
    };
  }, [handler, delay]);
};
