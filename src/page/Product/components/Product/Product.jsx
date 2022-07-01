import { randomPhoto } from 'constants';

import { baseHost } from 'constants';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'util';
import SkeletonProduct from '../skeleton/Skeleton';
import './styles.scss';

Product.propTypes = {};

function Product({ product = {} }) {
  // console.log(randomPhoto());
  const thumbnail = product.thumbnail ? `${baseHost}${product.thumbnail?.url}` : `${randomPhoto()}`;
  const originalPrice = formatPrice(product.originalPrice);
  const salePrice = formatPrice(product.salePrice);

  const history = useHistory();
  const handleClickProduct = () => {
    // history.push(`/products/${product.id}`);
  };
  return (
    <div className="product">
      {product.id ? (
        <>
          <div className="product__overflow">
            <div className="product__icon">
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>

              <span>
                <i className="fa-solid fa-thumbs-down"></i>
              </span>
              <span onClick={handleClickProduct}>
                <i className="fa-solid fa-cart-arrow-down"></i>
              </span>
            </div>
          </div>
          <div className="product__img">
            <img src={thumbnail} alt={product.promotionPercent} width="100%" />
          </div>
          <p className="product__name">{product.name}</p>
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
