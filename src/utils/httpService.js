const httpService = {
  get: async (
    url,
    options = {},
    baseUrl = "https://api.punkapi.com/v2",
    readBody = (resp) => resp.json()
  ) => {
    const { queryParams, removeEmptyParams = true } = options;
    const queryParamsString = Object.keys(queryParams)
      // remove empty params
      .filter((key) => (removeEmptyParams ? queryParams[key] : true))
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&");

    return fetch(`${baseUrl}${url}?${queryParamsString}`, {
      ...options,
      method: "GET"
    }).then(readBody);
  }
};

export const fetchBeers = ({ pageNum, pageSize, searchTerm }) =>
  httpService.get("/beers", {
    queryParams: {
      page: pageNum,
      per_page: pageSize,
      beer_name: searchTerm
    }
  });

export const fetchBeerByIds = ({ ids }) => {
  return httpService.get("/beers", {
    queryParams: {
      ids
    }
  });
};
