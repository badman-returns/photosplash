import React from "react";
import "./ImageCard.css";

function ImageCard({ image, loading, setSelectedImage }) {
  return (
    <div className="card">
      {!loading && (
        <img
          className="grid-image"
          src={image.urls.thumb}
          alt={image.alt_description}
          onClick={(e) => {
            if (e.target.tagName === "IMG") {
              if (window.screen.width >= 768) {
                setSelectedImage(image);
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default ImageCard;
