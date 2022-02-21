import "./Filter.css";
const Filters = ({
  isSortBySelected,
  handleSortByChange,
  isColorSelected,
  handleColorChange,
  isOrientationSelected,
  handleOrientationChange,
  clearFilters,
}) => {
  return (
    <div className="filter-container">
      <form className="sort-by filter-category">
        <p>SORT BY</p>
        <br />
        <input
          type="radio"
          id="relevant"
          name="relevant"
          value="relevant"
          checked={isSortBySelected("relevant")}
          onChange={handleSortByChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="relevant">Relevance</label>
        <br></br>
        <input
          type="radio"
          id="latest"
          name="latest"
          value="latest"
          checked={isSortBySelected("latest")}
          onChange={handleSortByChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="latest">Newest</label>
        <br></br>
      </form>
      <form className="color-filter filter-category">
        <p>COLOR</p>
        <br />
        <input
          type="radio"
          id="any_color"
          name="any_color"
          value="any_color"
          checked={isColorSelected("any_color")}
          onChange={handleColorChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="any_color">Any Color</label>
        <br></br>
        <input
          type="radio"
          id="black_and_white"
          name="black_and_white"
          value="black_and_white"
          checked={isColorSelected("black_and_white")}
          onChange={handleColorChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="black_and_white">Black and White</label>
        <br></br>
      </form>
      <form className="orientation filter-category">
        <p>ORIENTATION</p>
        <br />
        <input
          type="radio"
          id="any"
          name="any"
          value="any"
          checked={isOrientationSelected("any")}
          onChange={handleOrientationChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="any">Any</label>
        &nbsp;&nbsp;
        <input
          type="radio"
          id="portrait"
          name="portrait"
          value="portrait"
          checked={isOrientationSelected("portrait")}
          onChange={handleOrientationChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="portrait">Portrait</label>
        <br></br>
        <input
          type="radio"
          id="landscape"
          name="landscape"
          value="landscape"
          checked={isOrientationSelected("landscape")}
          onChange={handleOrientationChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="landscape">Landscape</label>
        &nbsp;&nbsp;
        <input
          type="radio"
          id="squarish"
          name="squarish"
          value="squarish"
          checked={isOrientationSelected("squarish")}
          onChange={handleOrientationChange}
        />
        &nbsp;&nbsp;
        <label htmlFor="squarish">Square</label>
      </form>
      <div className="clear-filters-container">
        <button className="clear-filters-btn" onClick={clearFilters}>
          CLEAR FILTERS
        </button>
      </div>
    </div>
  );
};

export default Filters;
