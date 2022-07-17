import { randomPhoto } from 'constants';

import { baseHost } from 'constants';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'util';
import SkeletonProduct from '../skeleton/Skeleton';
import { useDispatch } from 'react-redux';
import './styles.scss';
import { addToCart } from 'features/Cart/CartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Product.propTypes = {};

function Product({ product = {} }) {
  const dispatch = useDispatch();
  // console.log(randomPhoto());
  const thumbnail = product.thumbnail ? `${baseHost}${product.thumbnail?.url}` : `${randomPhoto()}`;
  const originalPrice = formatPrice(product.originalPrice);
  const salePrice = formatPrice(product.salePrice);

  const history = useHistory();
  const handleClickAddToCart = () => {
    const action = addToCart({
      id: product.id,
      product,
      quantity: 1,
    });
    toast.success('them vao gio hang thanh cong!', {
      position: toast.POSITION.TOP_RIGHT,
    });
    dispatch(action);
  };

  const handleClickView = () => {
    history.push(`/product/${product.id}`);
  };
  return (
    <div className="product">
      {product.id ? (
        <>
          <div className="product__img">
            <img src={thumbnail} alt={product.promotionPercent} width="100%" />
          </div>
          <p className="product__name">{product.name}</p>
          <div className="product__overflow">
            <div className="product__icon">
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>

              <span onClick={handleClickView}>
                <i className="fa-solid fa-eye"></i>
              </span>
              <span onClick={handleClickAddToCart}>
                <i className="fa-solid fa-cart-arrow-down"></i>
              </span>
            </div>
          </div>
          <div className="product__price">
            <span className="product__sale">{salePrice}</span>
            {product.promotionPercent > 0 ? (
              <>
                <span className="product__originalPrice"> {originalPrice}</span>
                <span className="product__promotionPercent"> - {product.promotionPercent}%</span>
              </>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        <div className="product__skeleton">
          <SkeletonProduct count={1} />
        </div>
      )}
    </div>
  );
}
{
}
export default Product;
