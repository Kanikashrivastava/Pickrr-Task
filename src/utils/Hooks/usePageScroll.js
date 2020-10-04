import { useState, useEffect } from "react";

export const usePageScroll = () => {
  const [bottom, setBottom] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;

      if (scrollTop + window.innerHeight >= scrollHeight) {
        setBottom(true);
      } else {
        setBottom(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return bottom;
};
