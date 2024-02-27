import css from './Searchbar.module.css';

const Searchbar = ({ handleSearch }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const formQuery = evt.currentTarget.elements.query.value;
    handleSearch(formQuery);
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </form>
    </header>
  );
};
export default Searchbar;
