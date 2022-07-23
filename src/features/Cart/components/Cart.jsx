import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'util';
import { cartItemCountSelector, cartItemTotalSelector } from '../Selectors';
import CartProduct from './CartProduct/CartProduct';
import './styles.scss';

Cart.propTypes = {};

function Cart(props) {
  const countItem = useSelector(cartItemCountSelector);
  const totalPrices = useSelector(cartItemTotalSelector);
  const listProductCart = useSelector((state) => state.cart.cartItems);

  const history = useHistory();
  const onClickShopping = () => {
    history.push({
      pathname: '/product',
    });
  };
  return (
    <div className="cart">
      <h2 className="cart__title">giỏ hàng</h2>

      <div className="row cart__row">
        {listProductCart.length < 1 ? (
          <div className="cart__empty">
            <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" alt="iphone" />
            <p>không có sản phẩm nào trong giỏ hàng của bạn</p>
            <button className="cart__btn" onClick={onClickShopping}>
              tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <>
            <div className="cart__left">
              <div className="cart__header">
                <div className="cart__info">tất cả ({countItem} sản phẩm))</div>
                <div className="cart__price">giá</div>
                <div className="cart__count">số lượng</div>
                <div className="cart__total">thành tiền</div>
                <div className="cart__remove">
                  <p>
                    <i className="fa-solid fa-trash-can"></i>
                  </p>
                </div>
              </div>

              <div className="cart__productlist">
                {listProductCart.map(({ product, quantity }) => (
                  <CartProduct product={product} quantity={quantity} key={product.id} />
                ))}
              </div>
            </div>
            <div className="cart__right">
              <div className="cart__right--total">
                <p>tạm tính:</p>
                <p>{formatPrice(totalPrices)}</p>
              </div>
              <div className="cart__right--total">
                <p>tổng tiền:</p>
                <p className="cart__right--totalprice">{formatPrice(totalPrices)}</p>
              </div>
              <div className="cart__pay">
                <Button variant="contained" color="secondary" fullWidth>
                  thanh toán
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
