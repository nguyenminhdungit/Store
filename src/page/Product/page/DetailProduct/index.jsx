import { baseHost, randomPhoto } from 'constants';
import { addToCart } from 'features/Cart/CartSlice';
import useProduct from 'page/Product/customhook/useProduct';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice } from 'util';
import AddToCart from './AddToCart.jsx/AddToCart';
import './styles.scss';
import { useSnackbar } from 'notistack';

const randomImg = [
  'https://cdn.tgdd.vn/Products/Images/42/262402/Samsung-Galaxy-A13-cam-thumb-600x600.jpg',
  'https://cdn.tgdd.vn/Products/Images/42/230529/TimerThumb/iphone-13-pro-max-(8).jpg',
  'https://cdn.tgdd.vn/Products/Images/44/263980/acer-nitro-5-gaming-an515-45-r6ev-r5-5600h-8gb-600x600.jpg',
  'https://cdn.tgdd.vn/Products/Images/44/272005/lenovo-gaming-legion-5-15ith6-i7-82jk00fnvn-180322-100552-600x600.jpg',
];

function DetailProduct() {
  const dispacth = useDispatch();
  const {
    params: { productId },
  } = useRouteMatch();

  const { loading, product } = useProduct(productId);

  const arrImg = [
    ...randomImg,
    product.thumbnail ? `${baseHost}${product.thumbnail?.url}` : `${randomPhoto()}`,
  ];

  const [thumbnail, setThumbnail] = useState(() => arrImg[arrImg.length - 1]);
  const originalPrice = formatPrice(product.originalPrice);
  const salePrice = formatPrice(product.salePrice);

  const { enqueueSnackbar } = useSnackbar();
  const showSuccess = () => {
    enqueueSnackbar('add to cart Successfully', { variant: 'success', autoHideDuration: 3000 });
  };
  const handleAddToCart = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity: quantity,
    });
    // console.log(action);
    dispacth(action);
    showSuccess();
  };

  return (
    <div className="container">
      <div className="detail">
        <div className="row">
          <div className="detail__left">
            <div className="detail__img">
              <img src={thumbnail} alt={product.name} />
            </div>
            <div className="detail__imgs">
              {arrImg.map((img, index) => (
                <span key={index} onClick={() => setThumbnail(arrImg[index])}>
                  <img src={img} alt={img} />
                </span>
              ))}
            </div>
          </div>
          <div className="detail__right">
            <div className="detail__title">
              <h3>{product.name}</h3>
            </div>
            <div className="detail__desc">
              <p>{product.shortDescription}</p>
            </div>
            <div className="detail__price">
              <span className="product__sale detail__sale">{salePrice}</span>
              {product.promotionPercent > 0 ? (
                <>
                  <span className="product__originalPrice detail__originalPrice">
                    {originalPrice}
                  </span>
                  <span className="product__promotionPercent detail__promotionPercent">
                    - {product.promotionPercent}%
                  </span>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="detail__addtocart">
              <AddToCart onSubmit={handleAddToCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
