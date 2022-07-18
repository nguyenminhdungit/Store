import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputFiled from 'components/Form-control/InputFilter/InputFiled';
import PasswordFiled from 'components/Form-control/passwordFiled/PasswordFiled';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { logIn } from '../authSlice';

Login.propTypes = {};

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

const schema = yup.object({
  identifier: yup.string().email('please enter a valid email').required('please enter email'),
  password: yup.string().required('Please Enter your password'),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
  // ),
});

function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const showError = (error) => {
    enqueueSnackbar(error, { variant: 'error' });
  };

  const handleOnSubmit = async (value) => {
    try {
      const action = logIn(value);
      await dispatch(action).unwrap();
      // console.log(user);
      const { onSubmit } = props;
      onSubmit();
    } catch (error) {
      showError(error.message);
      // console.log('fail to login:', error.message);
    }
  };
  const { isSubmitting } = form.formState;

  return (
    <div>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" className={classes.title}>
        sign in
      </Typography>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <InputFiled name="identifier" form={form} label="email" />
        <PasswordFiled name="password" form={form} label="password" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSubmitting}
          size="large"
        >
          sign in
        </Button>
      </form>
    </div>
  );
}

export default Login;
