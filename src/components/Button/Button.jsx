import css from './Button.module.css';

const Button = ({ handleLoadMore }) => {
  return (
    <button className={css.Button} onClick={handleLoadMore} type="button">
      Load more
    </button>
  );
};
export default Button;
