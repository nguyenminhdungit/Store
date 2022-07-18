import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';

InputFiled.propTypes = {};

function InputFiled({ name, form, label, disabled }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const hasError = errors[name];
  //   console.log(hasError);
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          type="text"
          label={label}
          id={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={!!hasError}
          helperText={!!hasError && errors[name]?.message}
        />
      )}
    />
  );
}

export default InputFiled;
