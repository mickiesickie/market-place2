import React , { useEffect ,useState } from 'react';
import {
  Button,
  Box,
  Grid,
  TextField
}from '@material-ui/core';
import { AccountCircle as  AccountCircleIcon}from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Modal from '../../components/modal';
import AuthApi from '../../api/auth';
import { setToken } from '../../redux/session';
import useStyles from './styles';

const initialFormState = {
  email: '',
  password: '',
  confirmPassword: ''
};

const initialErrorsState = {
  email: null,
  password: null,
  confirmPassword: null
};

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Login = ({ children })  => {
  const [open, setOpen] = useState(false);
  const [isCreateAccount, setCreateAccount] = useState(false);
  const [errors, setErrors] = useState(initialErrorsState);
  const [errorMessage, setErrorMessage] =useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const classes = useStyles();
  const title = !isCreateAccount ? 'Inicio de sesión' : 'Crear cuenta';

  let childrenCloned = null;
  const dispatch = useDispatch();


  useEffect(() => {
    const errors = Object.assign({}, errors);

    if (isCreateAccount && formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'La contraseña no coincide.';
      } else {
        errors.confirmPassword = null;
      }

      setErrors(errors);
    }

    if (formData.email) {
      if (!emailRegexp.test(formData.email)) {
        errors.email = 'El correo es invalido';
      } else {
        errors.email = null;
      }

      setErrors(errors);
    }
  }, [formData]);

  const onOpen = () => setOpen(true);

  const onClose = () => {
    setOpen(false);
    setCreateAccount(false);
    setFormData(initialFormState);
    setErrors(initialErrorsState);
  };

  const handleCreateAccount = async () => {
    if (!isCreateAccount) {
      setCreateAccount(true);
      return;
    }
    const response = await AuthApi.create(formData.email, formData.password);
    if (response.error) {
      setErrorMessage(response.error);
      return;
    }
    dispatch(setToken(response.accessToken));
  };

  const handleLogin = async () => {
    if (errors['email'] || errors['password']) {
      return;
    }

    const response = await AuthApi.login(formData.email, formData.password);
    if (response.error) {
      setErrorMessage(response.error);
      return;
    }
    dispatch(setToken(response.accessToken));
  };

  const handleChange = (field) => {
    return (e) => {
      const newFormData = Object.assign({}, formData, {
        [field]: e.target.value
      });
      setFormData(newFormData);
    };
  };


  return (
    <>
      {React.Children.count(children) === 0 && (
        <Button color='inherit' startIcon={<AccountCircleIcon />} onClick={onOpen}>
          Iniciar sesión
        </Button>
      )}

      {childrenCloned}

      <Modal open={open} title={title} onClose={onClose} size='sm'>
        <Box height='70%' section='content'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Correo eléctronico'
                variant='outlined'
                size='medium'
                name='email'
                fullWidth
                helperText={errors['email']}
                error={Boolean(errors['email'])}
                onChange={handleChange('email')}
                type='email'
                value={formData.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                variant='outlined'
                size='medium'
                name='password'
                fullWidth
                helperText={errors['password']}
                error={Boolean(errors['password'])}
                onChange={handleChange('password')}
                type='password'
                value={formData.password}
              />
            </Grid>

            {isCreateAccount && (
              <Grid item xs={12}>
                <TextField
                  label='Confirmar contraseña'
                  variant='outlined'
                  size='medium'
                  name='password'
                  fullWidth
                  helperText={errors['confirmPassword']}
                  error={Boolean(errors['confirmPassword'])}
                  onChange={handleChange('confirmPassword')}
                  type='password'
                  value={formData.confirmPassword}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              {errorMessage}
            </Grid>

            <Grid item xs={12}>
              {!isCreateAccount && (
                <Box className={classes.boxUI}>
                  <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={handleLogin}
                  >
                    Iniciar sesión
                  </Button>
                </Box>
              )}

              <Box mt={2} className={classes.boxUI}>
                <Button
                  variant={isCreateAccount ? 'contained' : 'outlined'}
                  color='primary'
                  fullWidth
                  onClick={handleCreateAccount}
                >
                  Crear cuenta
                </Button>
              </Box>

              {isCreateAccount && (
                <Box mt={2} className={classes.boxUI}>
                  <Button
                    size='large'
                    variant='text'
                    type='submit'
                    color='primary'
                    fullWidth
                    onClick={() => setCreateAccount(false)}
                  >
                    Regresar
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

Login.propTypes = {
  children: PropTypes.object
};
export default Login;