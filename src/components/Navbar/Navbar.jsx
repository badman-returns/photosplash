import React, { useState, useRef } from "react";
import "./Navbar.css";

const publicPath = process.env.PUBLIC_URL;

function Navbar({ setIsHomePage, setSearchQuery, isHomePage, setPageNumber }) {
  const [search, setSearch] = useState(null);
  const searchRef = useRef();

  const handleQuery = (e) => {
    e.preventDefault();
    if (search !== null && search !== undefined) {
      setIsHomePage(false);
      setSearchQuery(search);
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
          {!isHomePage && <button className="filter-button">Filter</button>}
        </form>
      </div>
    </div>
  );
}

export default Navbar;
