import React from 'react';
import PropTypes from 'prop-types';
import QuantityFiled from 'components/Form-control/QuantityFiled/QuantityFiled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

FormSetQuantity.propTypes = {
  onSubmit: PropTypes.func,
  quantity: PropTypes.number,
};

const schema = yup.object({
  quantity: yup.number().min(1).required(),
});

function FormSetQuantity({ onSubmit = null, quantity = 1 }) {
  const form = useForm({
    defaultValues: {
      quantity: quantity,
    },
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const callSubmit = (quantity) => {
    // console.log(value);

    if (!onSubmit) return;
    onSubmit(quantity);
    // console.log('form submit', value);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <QuantityFiled name="quantity" form={form} submitCall={form.handleSubmit(callSubmit)} />
    </form>
  );
}

export default FormSetQuantity;
