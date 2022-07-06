import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
Seach.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object({
  search: yup.string().trim().required(),
});

function Seach({ onSubmit = null }) {
  const form = useForm({
    defaultValues: {
      search: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitSeach = (value) => {
    // console.log(value);
    if (!onSubmit) return;
    onSubmit(value);
    form.reset();
  };

  return (
    <div className="header__seach">
      <form onSubmit={handleSubmit(onSubmitSeach)}>
        <input className="inputbtn" placeholder="seach product" {...register('search')} />
        <button className="btn header__btn" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
}

export default Seach;
