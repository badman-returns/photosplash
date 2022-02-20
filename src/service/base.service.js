import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const accessKey = process.env.REACT_APP_ACCESS_KEY;

const getAuthorizationClient = () =>
  axios.create({
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

const fetchDefaultImageCollection = async (pageNumber) => {
  try {
    const response = await getAuthorizationClient().get(
      `${baseURL}/collections/1528792/photos?page=${pageNumber}&per_page=24`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchSearchResult = async (pageNumber, query) => {
  try {
    const response = await getAuthorizationClient().get(
      `${baseURL}/search/photos?page=${pageNumber}&query=${query}`
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
