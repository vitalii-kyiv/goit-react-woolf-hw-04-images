import { useEffect, useState } from 'react';
import { getImagesApi } from '../api/images';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;
    const getImages = async () => {
      setIsLoading(true);
      try {
        const data = await getImagesApi(page, query);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  return (
    <div className={css.App}>
      <Searchbar handleSearch={handleSearch} query={query} />
      <ImageGallery images={images} onClick={handleImageClick} />
      {isLoading && <Loader />}
      {loadMore && <Button handleLoadMore={handleLoadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
    </div>
  );
};

export default App;
