import React from "react";
import "./Loader.css";

function Loader() {
  const loadPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="loader-container">
      {loadPages.map((index) => {
        return <div key={index} className="loader"></div>;
      })}
    </div>
  );
}

export default Loader;
