import React, { useRef, useEffect, useState } from "react";
import {
  fetchDefaultImageCollection,
  fetchSearchResult,
} from "../../service/base.service";
import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import "./ImageView.css";

function ImageView({ isHomePage, searchQuery, pageNumber, setPageNumber }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [intersection, setIntersection] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        updatePageNumber();
      }
    }),
    { threshold: 1.0 }
  );

  const updatePageNumber = () => {
    setPageNumber((previousPageNumber) => previousPageNumber + 1);
  };

  const getPhotosForHomePage = async () => {
    setLoading(true);
    const imageResponse = await fetchDefaultImageCollection(pageNumber);
    if (imageResponse) {
      if (pageNumber > 1) {
        let allImages = new Set([...images, ...imageResponse]);
        setImages([...allImages]);
      } else {
        setImages(null);
        setImages(imageResponse);
      }
      setLoading(false);
    }
  };

  const getPhotosFromSearchQuery = async () => {
    setLoading(true);
    const imageResponse = await fetchSearchResult(pageNumber, searchQuery);
    if (imageResponse) {
      if (pageNumber > 1) {
        let allImages = new Set([...images, ...imageResponse.results]);
        setImages([...allImages]);
      } else {
        setImages(null);
        setImages(imageResponse.results);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isHomePage === false) {
      getPhotosFromSearchQuery();
    } else {
      getPhotosForHomePage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, isHomePage]);

  useEffect(() => {
    const currentElement = intersection;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [intersection]);
  return (
    <>
      <div className="view-container">
        {!loading &&
          images.length > 0 &&
          images.map((image) => {
            return <ImageCard image={image} key={image.id} />;
          })}
      </div>
      {loading && <Loader />}

      {<div ref={setIntersection}></div>}
    </>
  );
}

export default ImageView;
