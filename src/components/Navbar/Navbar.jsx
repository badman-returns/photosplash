import React, { useState, useRef } from "react";
import "./Navbar.css";

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

    // console.log(searchRef);
    // console.log("called");
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <span onClick={handleState}>Unsplash</span>
      </div>
      <div className="search-container">
        <form className="search-items" onSubmit={handleQuery}>
          <input
            placeholder="Search"
            className="search-field"
            onChange={(e) => setSearch(e.target.value)}
            ref={searchRef}
          />
          {!isHomePage && <button className="filter-button">Filter</button>}
        </form>
      </div>
    </div>
  );
}

export default Navbar;
