import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo-container">Unsplash</div>
      <div className="search-container">
        <div className="search-items">
          <input placeholder="Search" className="search-field" />
          <button className="filter-button">Filter</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
