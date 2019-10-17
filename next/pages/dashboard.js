import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
  Avatar, Grid, Card, Typography, Box, Button,
} from '@material-ui/core';
import Router from 'next/router';
import Head from '../components/head';
import Nav from '../components/nav';
import { withRedux } from '../lib/redux';
import { apiUrl } from '../services/api';
import ProfileDescriptionItem from '../components/pages/dashboard/ProfileDescriptionItem';


function Dashboard() {
  // const theme = useTheme();
  // const [value, setValue] = React.useState(0);

  const { data } = useSelector(state => state.auth);

  // console.log({ store, props });

  const onPressVerTudo = () => {
    Router.push({
      pathname: '/perfil',
    });
  };

  return (
    <>
      <Head title="Página Inicial" />
      <Nav />
      <Grid
        container
        justify="center"
        alignItems="center"
        alignContent="flex-start"
        style={{
          backgroundColor: '#1c9aba',
          height: '100vh',
          paddingTop: 56,
        }}
      >
        <Avatar
          alt={data.nome}
          style={{
            width: 100,
            height: 100,
            transform: 'translateY(50px)',
            // margin: 20,
          }}
          src={`${apiUrl}Usuario/foto/?login=${data.loginDeRede}&cache=${new Date().getTime()}`}
        />
        <Card style={{
          margin: '0 15px',
          padding: 20,
          paddingTop: 50,
        }}
        >
          <Box
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <Typography align="center" variant="h6">
              {data.nome}
            </Typography>
            <Typography
              align="center"
              variant="caption"
              component="div"
            >
              {data.funcao}
            </Typography>
          </Box>
          <div style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
            <div style={{ flex: 1 }}>
              <ProfileDescriptionItem label="Email" value={data.email} />
              <ProfileDescriptionItem label="Matrícula" value={data.matricula} />
              <ProfileDescriptionItem label="Gerência" value={data.gerencia} />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 15 }}
            onClick={onPressVerTudo}
          >
            <Typography>Ver tudo</Typography>
          </Button>
        </Card>
      </Grid>
    </>
  );
}

Dashboard.getInitialProps = ({ reduxStore }) => {
  // Tick the time once, so we'll have a
  // valid time before first render
  const { dispatch } = reduxStore;

  const hue = reduxStore;
  // dispatch({
  //   type: 'TICK',
  //   light: typeof window === 'object',
  //   lastUpdate: Date.now(),
  // });

  return { dispatch };
};

export default withRedux(Dashboard);
