import "./Modal.css";

const Modal = ({ image, setSelectedImage }) => {
  console.log(image);
  return (
    <div className="modal-wrapper" onClick={() => setSelectedImage(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={image.urls.regular} alt={image.alt_description} />
      </div>
    </div>
  );
};

export default Modal;
