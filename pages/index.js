import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card, Box, Button } from '@material-ui/core';
import Head from 'components/head';
import SanesulLogo from 'components/SanesulLogo';
import LoginForm from 'components/pages/index/LoginForm';
import { Creators as LoginCreators } from 'appStore/ducks/login';
import withRedux from 'lib/redux';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

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
      width: '23vw',
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
  const authStore = useSelector(state => state.login);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = ({ matricula, senha }) => {
    dispatch(LoginCreators.getLoginRequest({ login: matricula, senha }));
  };

  React.useEffect(() => {
    const OneSignal = window.OneSignal || [];
    OneSignal.push(() =>
      OneSignal.init({
        appId: '36dbc55e-d17a-45cd-854c-d2836590e2ac',
        notifyButton: {
          enable: true,
        },
      })
    );
  }, []);

  return (
    <>
      <Head title="Acessar - Meu RH" />
      <main className={classes.root}>
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#1f96b7',
            background: 'linear-gradient(to bottom, #86BBD8, #1f96b7, #336699)',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundSize: 'cover',
            minHeight: '100%',
            zIndex: -1,
          }}
        >
          <Box className={classes.container}>
            <Box className={classes.logoContainer}>
              <SanesulLogo width={109} height={150} />
              <Typography style={{ color: 'white' }} variant="h5" color="primary">
                Meu RH
              </Typography>
            </Box>
            <Card className={classes.loginForm}>
              <LoginForm onSubmit={onSubmit} isLoading={authStore.loading} />
              <Typography color="error" align="center">
                {authStore.error}
              </Typography>
              <Typography align="center">
                <Link href="/recuperarSenha" prefetch>
                  <Button>Esqueci minha senha</Button>
                </Link>
              </Typography>
            </Card>
          </Box>
        </div>
      </main>
    </>
  );
}

export default withRedux(LoginScreen);
