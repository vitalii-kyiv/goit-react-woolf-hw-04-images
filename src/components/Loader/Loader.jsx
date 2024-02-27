import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';
const Loader = () => {
  return (
    <div className={css.LoaderWrapper}>
      <ColorRing
        visible={true}
        height="800"
        width="800"
        ariaLabel="color-ring-loading"
        wrapperStyle={{ justifyContent: 'center', alignItems: 'center' }}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );
};
export default Loader;
