import axios from "axios";
// const dotenv = require("dotenv");

// dotenv.config();

const accessKey = "FZpIl7feLseFHwV4DScQqiaVULO54C7GRBiqlmDrxdI";

const getAuthorizationClient = () =>
  axios.create({
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

const fetchDefaultImageCollection = async (pageNumber) => {
  try {
    const response = await getAuthorizationClient().get(
      `https://api.unsplash.com/collections/1528792/photos?page=${pageNumber}&per_page=24`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchSearchResult = async (pageNumber, query) => {
  try {
    const response = await getAuthorizationClient().get(
      `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${query}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getAuthorizationClient,
  fetchDefaultImageCollection,
  fetchSearchResult,
};
