import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card, Box } from '@material-ui/core';
import Head from 'components/head';
import SanesulLogo from 'components/SanesulLogo';
import LoginForm from 'components/pages/index/LoginForm';
import { Creators as AuthCreators } from 'appStore/ducks/auth';
import withRedux from 'lib/redux';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginForm: {
    padding: '50px 20px',
    [theme.breakpoints.down('lg')]: {
      width: '20vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '30vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
}));


function LoginScreen() {
  const authStore = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = ({ matricula, senha }) => {
    dispatch(AuthCreators.getLoginRequest({ login: matricula, senha }));
  };

  return (
    <>
      <Head title="Acessar - Meu RH" />

      <main className={classes.root}>
        <style jsx global>
          {`
        body {
          position: absolute;
          background-color: #1f96b7;
          background-size: contain;
          min-height: 100%;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
    `}
        </style>
        <Box className={classes.container}>
          <Box className={classes.logoContainer}>
            <SanesulLogo width={109} height={150} />
            <Typography style={{ color: 'white' }} variant="h5" color="primary">Meu RH</Typography>
          </Box>
          <Card className={classes.loginForm}>
            <LoginForm onSubmit={onSubmit} />
            <Typography color="error" align="center">
              {authStore.error}
            </Typography>
          </Card>
        </Box>
      </main>
    </>
  );
}

export default withRedux(LoginScreen);
