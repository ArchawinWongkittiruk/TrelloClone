// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from '../other/Copyright';
import useStyles from '../../utils/formStyles';

const Register = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'WebAppKanban | Cadastre-se';
  }, []);

  const { name, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('As senhas não correspondem', 'erro'));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container component='main' maxWidth='xs' className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>
          WebAppKanban
        </Typography>
        <Typography component='h1' variant='h5'>
          Cadastre-se
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                label='Seu Nome'
                autoFocus
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Seu Email'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Sua Senha'
                type='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password2'
                label='Confirme sua Senha'
                type='password'
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Cadastrar
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
              já tem uma conta? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
