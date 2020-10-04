import { useCallback, useState } from "react";

export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState({
    pageNum: 1,
    pageSize: 9,
    searchTerm: ""
  });

  const handleSearchTerm = useCallback(
    (searchTerm) =>
      setQueryParams((prevQueryParams) => ({
        ...prevQueryParams,
        pageNum: 1,
        searchTerm
      })),
    []
  );

  const handlePageNumIncrease = useCallback(() => {
    setQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      pageNum: prevQueryParams.pageNum + 1
    }));
  }, []);

  const handleReset = useCallback(() => {
    setQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      pageNum: 1,
      pageSize: 9,
      searchTerm: ""
    }));
  }, []);

  return [
    queryParams,
    handleSearchTerm,
    handlePageNumIncrease,
    queryParams.pageNum === 1,
    handleReset
  ];
};
