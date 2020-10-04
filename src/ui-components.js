import styled from "styled-components";
import { Link } from "react-router-dom";
export const Header = styled.header`
  background: green;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderText = styled.h1`
  color: white;
  font-weight: 400;
  padding: 10px;
`;
export const Nav = styled.nav`
  color: white;
  font-weight: 400;
  padding: 10px;
`;
export const NavLink = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
  color: ${(props) =>
    props.location.pathname !== props.to ? "#ababab" : "white"};
  &::last-child {
    margin-right: 0;
  }
`;
export const InputBox = styled.input`
  padding: 10px;
  width: 80%;
  font-size: 20px;
`;
export const Main = styled.main`
  margin: 20px 20px 0 20px;
`;
export const SearchBox = styled.form`
  display: flex;
  justify-content: center;
`;
export const SearchButton = styled.button`
  background-color: rgb(26, 115, 232);
  color: white;
  padding: 0 20px;
  border: none;
  cursor: pointer;
`;
export const Card = styled.div`
  border: 1px solid lightgray;
  box-shadow: 1px 1px 10px 2px #888888;
  margin: 5px;
  width: 100%;
  min-height: 250px;
  padding: 10px;
  @media screen and (min-width: 720px) and (max-width: 1024px) {
    width: 48%;
  }
  @media screen and (min-width: 1024px) {
    width: 32%;
  }
`;
export const CardsView = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;
export const Image = styled.img`
  height: 200px;
  margin: 10px;
`;
export const BeerTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 10px;
`;
export const BeerDescription = styled.div`
  font-size: 14px;
`;
export const BeerDetail = styled.div`
  margin: 10px;
  align-self: flex-start;
`;
export const CardContent = styled.div`
  display: flex;
  align-items: center;
`;
export const CardHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
`;
export const Icon = styled.i`
  align-self: flex-start;
  text-decoration: none;
  font-style: normal;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  &::last-child {
    margin-right: 0;
  }
`;
