import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchDefaultImageCollection,
  fetchSearchResult,
} from "../../service/base.service";
import ImageCard from "../ImageCard/ImageCard";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import "./ImageView.css";

function ImageView({ pageNumber, setPageNumber }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [intersection, setIntersection] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();

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
    const searchQuery = new URLSearchParams(location.search);
    console.log(searchQuery);
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
    if (location.pathname !== "/") {
      getPhotosFromSearchQuery();
    } else {
      getPhotosForHomePage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, pageNumber]);

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
            return (
              <ImageCard
                image={image}
                key={image.id}
                setSelectedImage={setSelectedImage}
              />
            );
          })}
      </div>
      {loading && <Loader />}
      {selectedImage && (
        <Modal image={selectedImage} setSelectedImage={setSelectedImage} />
      )}

      {!loading && <div ref={setIntersection}></div>}
    </>
  );
}

export default ImageView;
