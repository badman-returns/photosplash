export const getSearchParams = (query, order_by, color, orientation) => {
  let searchParamsObj = {};
  if (query.length > 0) {
    searchParamsObj.query = query;
  }

  if (order_by === "latest") {
    searchParamsObj.order_by = order_by;
  }

  if (color === "black_and_white") {
    searchParamsObj.color = color;
  }

  if (
    orientation === "landscape" ||
    orientation === "portrait" ||
    orientation === "squarish"
  ) {
    searchParamsObj.orientation = orientation;
  }

  return new URLSearchParams(searchParamsObj);
};
