import css from "./ImageGalleryItem.module.css"
const ImageGalleryItem = ({ src, alt, largeImageURL, onClick }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onClick(largeImageURL)}>
      <img src={src} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem