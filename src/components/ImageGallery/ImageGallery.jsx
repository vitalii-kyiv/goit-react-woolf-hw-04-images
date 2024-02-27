import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map((image, index) => (
        <ImageGalleryItem
          key={`${image.id}-${index}`}
          src={image.webformatURL}
          alt={image.tags}
          largeImageURL={image.largeImageURL}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};
export default ImageGallery;
