import React, { useRef, useEffect, useState } from "react";
import { fetchDefaultImageCollection } from "../../service/base.service";
import ImageCard from "../ImageCard/ImageCard";
import "./ImageView.css";

function ImageView() {
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [intersection, setIntersection] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        updatePageNumber();
      }
    })
  );

  const updatePageNumber = () => {
    setPageNumber((previousPageNumber) => previousPageNumber + 1);
  };

  const getPhotosForHomePage = async () => {
    setLoading(true);
    const imageResponse = await fetchDefaultImageCollection(pageNumber);
    if (imageResponse) {
      let allImages = new Set([...images, ...imageResponse]);
      setImages([...allImages]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhotosForHomePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

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
        {images.length > 0 &&
          images.map((image) => {
            return <ImageCard loading={loading} image={image} key={image.id} />;
          })}
      </div>
      {<div ref={setIntersection}></div>}
    </>
  );
}

export default ImageView;
