import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleQuery = (e) => {
    e.preventDefault();
    if (search !== null && search !== undefined) {
      const searchQueryParams = getSearchParams(
        search,
        sortBy,
        color,
        orientation
      );
      navigate(`/search?${searchQueryParams}`);
    }
  };

  const returnHomePage = () => {
    setPageNumber(1);
    navigate("/");
  };

  function filter(e) {
    if (e) {
      e.preventDefault();
    }
    if (search !== null && search !== undefined) {
      setPageNumber(1);
      const searchQuery = getSearchParams(search, sortBy, color, orientation);
      navigate(`/search?${searchQuery}`);
    }
  }

  useEffect(() => {
    if (location.pathname.includes("/search")) {
      setSearch(searchParams.get("query"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
        <span className="logo-container" onClick={returnHomePage}>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={publicPath + "/search.svg"}
            alt="search-icon"
            className="search-icon"
            onClick={handleQuery}
          />
          {location.pathname.includes("search") && (
            <button
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter
            </button>
          )}
        </form>
      </div>

      {showFilters && (
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
