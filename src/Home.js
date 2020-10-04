import React, { useCallback, useState, useMemo } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import * as UI from "./ui-components";
import { fetchBeerByIds, fetchBeers } from "./utils/httpService";
import { usePageScroll } from "./utils/Hooks/usePageScroll";
import { useDebounce } from "./utils/Hooks/useDebounce";
import { useQueryParams } from "./utils/Hooks/useQueryParams";
import { ReactComponent as StarEmpty } from "./star-empty.svg";
import { ReactComponent as StarFilled } from "./star-filled.svg";
class Beers {
  _beerKey = "fav-beer";
  _deletedBeerKey = "deleted-beer";
  _getFavBeers = () => {
    return JSON.parse(localStorage.getItem(this._beerKey));
  };
  _getDeletedBeers = () => {
    return JSON.parse(localStorage.getItem(this._deletedBeerKey));
  };
  _setFavBeers = (favBeers = []) => {
    localStorage.setItem(this._beerKey, JSON.stringify(favBeers));
  };
  _setDeletedBeers = (deletedBeers = []) => {
    localStorage.setItem(this._deletedBeerKey, JSON.stringify(deletedBeers));
  };
  constructor() {
    this._create();
  }
  add = (id) => {
    const favBeers = this._getFavBeers();
    favBeers.push(id);
    this._setFavBeers(favBeers);
  };
  remove = (id) => {
    const favBeers = this._getFavBeers();
    this._setFavBeers(favBeers.filter((beerId) => id !== beerId));
  };
  getAll = () => {
    return "(|" + this._getFavBeers().join("|") + "|)";
  };
  has = (id) => {
    const favBeers = this._getFavBeers();
    return favBeers.includes(id);
  };
  _create = () => {
    if (!this._getFavBeers() && !Array.isArray(this._getFavBeers())) {
      this._setFavBeers();
    }
    if (!this._getDeletedBeers() && !Array.isArray(this._getDeletedBeers())) {
      this._setDeletedBeers();
    }
  };
  isDeleted = (id) => {
    const deletedBeers = this._getDeletedBeers();
    return deletedBeers.includes(id);
  };
  filterDeletedBeer = (beers) => {
    return beers.filter((beer) => !this.isDeleted(beer.id));
  };
  delete = (id) => {
    const deletedBeers = this._getDeletedBeers();
    deletedBeers.push(id);
    this._setDeletedBeers(deletedBeers);
  };
  static create = () => {
    if (!this._favBeersInstance) {
      this._favBeersInstance = new Beers();
    }
    return this._favBeersInstance;
  };
}

export default function Home({ isFav }) {
  const [beers, setBeers] = useState([]);
  const [
    queryParams,
    handleSearchTerm,
    handlePageNumIncrease,
    isFirstPage
  ] = useQueryParams();
  const isBottom = usePageScroll();
  const beerer = useMemo(() => Beers.create(), []);

  const fetchFavBeer = useCallback(async () => {
    const ids = beerer.getAll();
    const response = await fetchBeerByIds({ ids });
    setBeers(response);
  }, [beerer]);
  const handleBeers = useCallback(async () => {
    // Only need to be called when we have a new search keyword or first time load.
    if (!isBottom && isFirstPage && !isFav) {
      const response = await fetchBeers(queryParams);
      setBeers(beerer.filterDeletedBeer(response));
      handlePageNumIncrease();
      // Call only when the user have reached to end of the page.
    } else if (isBottom && !isFav) {
      const response = await fetchBeers(queryParams);
      // No need to increase page number when responses are coming empty.
      if (response.length !== 0) {
        setBeers((prevBeers) => [
          ...prevBeers.concat(beerer.filterDeletedBeer(response))
        ]);
        handlePageNumIncrease();
      }
    } else if (isFav) {
      fetchFavBeer();
    }
  }, [
    queryParams,
    fetchFavBeer,
    beerer,
    isFav,
    isFirstPage,
    isBottom,
    handlePageNumIncrease,
    setBeers
  ]);
  // Don't want to keep calling api on every single key stroke for search box.
  useDebounce(handleBeers, 500);
  const location = useLocation();
  const handleOnSearch = (e) => {
    const { value: searchTerm } = e.target;
    handleSearchTerm(searchTerm);
  };
  const toggleFav = (id) => async () => {
    if (!beerer.has(id)) {
      beerer.add(id);
    } else {
      beerer.remove(id);
    }

    if (isFav) {
      fetchFavBeer();
    } else {
      // Force reload so the page loads instantly
      setBeers((prevBeers) => [...prevBeers]);
    }
  };
  const deleteBeer = (id) => () => {
    // Remove from fav beers.
    if (beerer.has(id)) {
      beerer.remove(id);
    }
    beerer.delete(id);
    setBeers((prevBeers) => beerer.filterDeletedBeer(prevBeers));
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
            <UI.Card key={beer.id}>
              <UI.CardHeader>
                <UI.Icon onClick={deleteBeer(beer.id)}>
                  <UI.TrashImage
                    src="https://img.icons8.com/fluent/48/000000/empty-trash.png"
                    alt="trash"
                  />
                </UI.Icon>
                <UI.Icon onClick={toggleFav(beer.id)}>
                  {beerer.has(beer.id) ? <StarFilled /> : <StarEmpty />}
                </UI.Icon>
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
