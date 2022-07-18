import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@material-ui/icons';

PasswordFiled.propTypes = {};

function PasswordFiled({ name, form, label, disabled }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const hasError = errors[name];
  const togglePassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <FormControl error={!!hasError} variant="outlined" fullWidth margin="normal">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <OutlinedInput
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
          />
        )}
      />
      <FormHelperText>{!!hasError && errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default PasswordFiled;
