import React, { useCallback, useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import * as UI from "./ui-components";
import { fetchBeers } from "./utils/httpService";
import { usePageScroll } from "./utils/Hooks/usePageScroll";
import { useDebounce } from "./utils/Hooks/useDebounce";
import { useQueryParams } from "./utils/Hooks/useQueryParams";

class FavouriteBeers {
  _beerKey = "beer";
  _getBeers = () => {
    return JSON.parse(localStorage.getItem(this._beerKey));
  };
  _setBeers = (beers = []) => {
    localStorage.setItem(this._beerKey, JSON.stringify(beers));
  };
  constructor() {
    this._create();
  }
  add = (id) => {
    this._create();
    const favBeers = this._getBeers();
    favBeers.push(id);
    this._setBeers(favBeers);
  };
  remove = (id) => {
    this._create();
    const favBeers = this._getBeers();
    this._setBeers(favBeers.filter((beerId) => id !== beerId));
  };
  getAll = () => {
    this._create();
    return "(|" + this._getBeers().join("|") + "|)";
  };
  has = (id) => {
    const favBeers = this._getBeers();
    return favBeers.includes(id);
  };
  _create = () => {
    const favBeers = this._getBeers();
    if (!favBeers) {
      this._setBeers();
    }
  };
  static create = () => {
    if (!this._favBeersInstance) {
      this._favBeersInstance = new FavouriteBeers();
    }
    return this._favBeersInstance;
  };
}

export default function Home() {
  const [beers, setBeers] = useState([]);
  const [
    queryParams,
    handleSearchTerm,
    handlePageNumIncrease,
    isFirstPage
  ] = useQueryParams();
  const isBottom = usePageScroll();

  const handleBeers = useCallback(async () => {
    // Only need to be called when we have a new search keyword or first time load.
    if (!isBottom && isFirstPage) {
      const response = await fetchBeers(queryParams);
      setBeers(response);
      handlePageNumIncrease();
      // Call only when the user have reached to end of the page.
    } else if (isBottom) {
      const response = await fetchBeers(queryParams);
      // No need to increase page number when responses are coming empty.
      if (response.length !== 0) {
        setBeers((prevBeers) => [...prevBeers.concat(response)]);
        handlePageNumIncrease();
      }
    }
  }, [queryParams, isFirstPage, isBottom, handlePageNumIncrease, setBeers]);

  // Don't want to keep calling api on every single key stroke for search box.
  useDebounce(handleBeers, 500);
  const location = useLocation();

  const handleOnSearch = (e) => {
    const { value: searchTerm } = e.target;
    handleSearchTerm(searchTerm);
  };

  const toggleFav = (id) => () => {
    const favouriteBeers = FavouriteBeers.create();
    if (!favouriteBeers.has(id)) {
      favouriteBeers.add(id);
    } else {
      favouriteBeers.remove(id);
    }
  };
  return (
    <div className="App">
      <UI.Header>
        <UI.HeaderText>Bean Loves Bear</UI.HeaderText>
        <UI.Nav>
          <UI.NavLink to="/" location={location}>
            Home
          </UI.NavLink>
          <UI.NavLink to="/fav" location={location}>
            Favourites
          </UI.NavLink>
        </UI.Nav>
      </UI.Header>
      <UI.Main>
        <UI.SearchBox>
          <UI.InputBox
            name="search-beer"
            placeholder="Search for beer..."
            aria-label="search-beer"
            onChange={handleOnSearch}
            value={queryParams.searchTerm}
          />
        </UI.SearchBox>
        <UI.CardsView>
          {beers.map((beer) => (
            <UI.Card key={beer.id} onClick={toggleFav(beer.id)}>
              <UI.CardHeader>
                <UI.Icon>Del</UI.Icon>
                <UI.Icon>Fav</UI.Icon>
              </UI.CardHeader>
              <UI.CardContent>
                <UI.Image src={beer.image_url} />
                <UI.BeerDetail>
                  <UI.BeerTitle>{beer.name}</UI.BeerTitle>
                  <UI.BeerDescription>{beer.description}</UI.BeerDescription>
                </UI.BeerDetail>
              </UI.CardContent>
            </UI.Card>
          ))}
        </UI.CardsView>
      </UI.Main>
    </div>
  );
}
