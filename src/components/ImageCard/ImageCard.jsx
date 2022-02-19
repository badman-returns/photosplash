import React from "react";
import "./ImageCard.css";

function ImageCard({ image, loading }) {
  // console.log(image);
  return (
    <div className="card">
      {!loading && (
        <img
          className="grid-image"
          src={image.urls.thumb}
          alt={image.alt_description}
        />
      )}
    </div>
  );
}

export default ImageCard;
