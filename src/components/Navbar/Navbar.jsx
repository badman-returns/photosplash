import React, { useState, useRef, useEffect } from "react";
import Filters from "../Filter/Filter";
import { getSearchParams } from "../../utils/getSearchParams";
import "./Navbar.css";

const publicPath = process.env.PUBLIC_URL;

function Navbar({ setIsHomePage, setSearchQuery, isHomePage, setPageNumber }) {
  const [search, setSearch] = useState(null);
  const [sortBy, setSortBy] = useState("relevant");
  const [color, setColor] = useState("any_color");
  const [orientation, setOrientation] = useState("any");
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef();

  const handleQuery = (e) => {
    e.preventDefault();
    if (search !== null && search !== undefined) {
      setIsHomePage(false);
      const searchQuery = getSearchParams(search);
      console.log(searchQuery);
      setSearchQuery(searchQuery);
      setPageNumber(1);
    }
  };

  const handleState = () => {
    if (!isHomePage) {
      setPageNumber(1);
      setIsHomePage(true);
      searchRef.current.value = "";
      setSearch(null);
    }
  };

  function filter(e) {
    if (e) {
      e.preventDefault();
    }
    console.log(search);
    if (search !== null && search !== undefined) {
      const searchQuery = getSearchParams(search, sortBy, color, orientation);
      console.log(searchQuery);
      setSearchQuery(searchQuery);
      setPageNumber(1);
    }
  }

  useEffect(() => {
    filter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, color, orientation]);

  const isSortBySelected = (val) => {
    return sortBy === val;
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const isColorSelected = (val) => {
    return color === val;
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const isOrientationSelected = (val) => {
    return orientation === val;
  };

  const handleOrientationChange = (e) => {
    setOrientation(e.target.value);
  };

  const clearFilters = () => {
    setSortBy("relevant");
    setColor("any_color");
    setOrientation("any");
    setShowFilters(false);
  };

  return (
    <div className="nav-container">
      <div className="brand-container">
        <span className="logo-container" onClick={handleState}>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
            className="logo"
          />
          <span>Photosplash</span>
        </span>
      </div>
      <div className="search-container">
        <form className="search-items" onSubmit={handleQuery}>
          <input
            placeholder="Search"
            className="search-field"
            onChange={(e) => setSearch(e.target.value)}
            ref={searchRef}
          />
          <img
            src={publicPath + "/search.svg"}
            alt="search-icon"
            className="search-icon"
            onClick={handleQuery}
          />
          {!isHomePage && (
            <button
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter
            </button>
          )}
        </form>
      </div>
      {showFilters && !isHomePage && (
        <Filters
          isSortBySelected={isSortBySelected}
          handleSortByChange={handleSortByChange}
          isColorSelected={isColorSelected}
          handleColorChange={handleColorChange}
          isOrientationSelected={isOrientationSelected}
          handleOrientationChange={handleOrientationChange}
          clearFilters={clearFilters}
        />
      )}
    </div>
  );
}

export default Navbar;
