import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { baseHost } from 'constants';
import { randomPhoto } from 'constants';
import { formatPrice } from 'util';
import './styles.scss';
import FormSetQuantity from '../FormSetQuantity/FormSetQuantity';
import { useDispatch } from 'react-redux';
import { removeFromCart, setQuantity } from 'features/Cart/CartSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

CartProduct.propTypes = {
  product: PropTypes.object,
  quantity: PropTypes.number,
};

function CartProduct({ product = {}, quantity = 1 }) {
  const dispacth = useDispatch();

  const thumbnail = product.thumbnail ? `${baseHost}${product.thumbnail?.url}` : `${randomPhoto()}`;
  const originalPrice = formatPrice(product.originalPrice);
  const salePrice = formatPrice(product.salePrice);
  const totalPrice = formatPrice(product.salePrice * quantity);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = ({ quantity }) => {
    const action = setQuantity({
      id: product.id,
      quantity,
    });
    dispacth(action);
    handleClose();
  };
  const onClickRemove = () => {
    dispacth(removeFromCart(product.id));
  };

  return (
    <div className="cart__product">
      <div className="cart__img">
        <img src={thumbnail} alt={product.name} />
      </div>
      <div className="cart__box">
        <div className="cart__box--desc text-clamp text-clamp--2">{product.shortDescription}</div>
        <div className="cart__box--price">
          <span className="cart__box--salePrice">{salePrice}</span>{' '}
          <span className="cart__originalPrice">{originalPrice}</span>
        </div>
        <div className="cart__box--count">
          <FormSetQuantity quantity={quantity} onSubmit={onSubmit} />
        </div>
        <div className="cart__box--total">{totalPrice}</div>
      </div>
      <div className="cart__remove">
        <span>
          <i className="fa-solid fa-trash-can" onClick={handleClickOpen}></i>
        </span>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>you want remove product to cart</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClickRemove} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CartProduct;
