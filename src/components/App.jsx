import { Component } from 'react';
import { getImagesApi } from '../api/images';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';
class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.getImages();
    }
  }

  handleSearch = query => {
    this.setState({ query: query, page: 1, images: [] });
  };

  getImages = async () => {
    this.setState({ isLoading: true });
    const { page, query } = this.state;
    try {
      const data = await getImagesApi(page, query);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        loadMore: this.state.page < Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      console.error(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar handleSearch={this.handleSearch} query={this.state.query} />
        <ImageGallery
          images={this.state.images}
          onClick={this.handleImageClick}
        />
        {this.state.isLoading && <Loader />}
        {this.state.loadMore && <Button handleLoadMore={this.handleLoadMore} />}
        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
export default App;
