import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import QuantityFiled from 'components/Form-control/QuantityFiled/QuantityFiled';
import { Button } from '@material-ui/core';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

AddToCart.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object({
  quantity: yup.number().min(1).required(),
});

function AddToCart({ onSubmit = null }) {
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitAddToCart = (quantity) => {
    if (!onSubmit) return;
    onSubmit(quantity);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitAddToCart)}>
      {/* <div className="row detail__row">
        <span className="detail__btn" disabled={true}>
          <i className="fa-solid fa-minus"></i>
        </span>
        <input className="detail__input" type="number" {...register('quantity')} />
        <span className="detail__btn">
          <i className="fa-solid fa-plus"></i>
        </span>
      </div>
      <span>add To cart</span> */}
      <div className="detail__row">
        <QuantityFiled name="quantity" form={form} />
      </div>

      <Button variant="contained" color="secondary" type="submit" fullWidth>
        add to cart
      </Button>
    </form>
  );
}

export default AddToCart;
