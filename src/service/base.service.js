import axios from "axios";
// const dotenv = require("dotenv");

// dotenv.config();

const baseURL = process.env.REACT_APP_BASE_URL;
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
      `https://api.unsplash.com/collections/11649432/photos?page=${pageNumber}&per_page=20`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export { getAuthorizationClient, fetchDefaultImageCollection };
