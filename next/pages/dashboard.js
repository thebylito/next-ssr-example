import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Avatar, Grid, Card } from '@material-ui/core';
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


  return (
    <>
      <Head title="Manual" />
      <Nav />
      <Grid
        container
        justify="center"
        alignItems="center"
        alignContent="flex-start"
        style={{
          backgroundColor: '#1c9aba',
          height: '100vh',
        }}
      >
        <Avatar
          alt={data.nome}
          style={{
            width: 100,
            height: 100,
            // margin: 20,
          }}
          src={`${apiUrl}Usuario/foto/?login=${data.loginDeRede}&cache=${new Date().getTime()}`}
        />
        <Card style={{
          margin: '0 15px',
          padding: 20,
        }}
        >
          <div
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <span
              style={{
                textTransform: 'uppercase',
                fontWeight: '600',
                fontSize: 20,
                marginTop: 5,
                textAlign: 'center',
              }}
            >
              {data.nome}
            </span>
            <span
              style={{
                textTransform: 'uppercase',
                color: '#384b57',
                fontSize: 20,
              }}
            >
              {data.funcao}
            </span>
          </div>
          <div style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
            <div style={{ flex: 1 }}>
              <ProfileDescriptionItem label="Email" value={data.email} />
              <ProfileDescriptionItem label="Matrícula" value={data.matricula} />
              <ProfileDescriptionItem label="Gerência" value={data.gerencia} />
            </div>
          </div>
          {/* <Button
            title="Ver tudo"
            onPress={onPressGoProfileDetailsButton}
            containerStyle={{ marginTop: 15 }}
          /> */}
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
