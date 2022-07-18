import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from 'react-hook-form';
import InputFiled from 'components/Form-control/InputFilter/InputFiled';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordFiled from 'components/Form-control/passwordFiled/PasswordFiled';

Register.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    position: 'relative',
  },
  avatar: {
    // paddingTop: theme.spacing(2),
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 2, 0),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(0),
    left: 0,
    right: 0,
  },
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/[a-zA-Z][a-zA-Z ]{2,}/, 'Must Contain 2 Characters')
    .required('please enter your name'),
  email: yup.string().email('please enter a valid email').required('please enter email'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required('Please Enter your password'),
  retypePassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'password does not match')
    .required('Please Enter your password'),
});

function Register(props) {
  const classes = useStyles();
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (filed) => {
    console.log(filed);
  };

  return (
    <div>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" className={classes.title}>
        register
      </Typography>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <InputFiled name="name" form={form} label="fullname" />
        <InputFiled name="email" form={form} label="email" />
        <PasswordFiled name="password" form={form} label="password" />
        <PasswordFiled name="retypePassword" form={form} label="retypePassword" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          //   disabled={isSubmitting}
          size="large"
        >
          register
        </Button>
      </form>
    </div>
  );
}

export default Register;
