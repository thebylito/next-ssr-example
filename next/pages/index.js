import React from 'react';
// import { useDispatch } from 'react-redux';
// import Nav from '../components/nav';
import { Typography, Box, Card } from '@material-ui/core';
import Head from '../components/head';


import { withRedux } from '../lib/redux';
import SanesulLogo from '../components/SanesulLogo/index.js';
import LoginForm from '../components/pages/index/LoginForm';
// import useInterval from '../lib/useInterval';


function HomePage() {
  // const dispatch = useDispatch();


  const [localState, setLocalState] = React.useState({
    feed: [],
  });


  return (
    <>
      <Head title="Home" />
      <main style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
      }}
      >
        <div style={{
          margin: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <SanesulLogo />
          <Typography variant="h6" color="primary">Meu RH</Typography>
        </div>
        <Card style={{ padding: 20, margin: 20 }}>
          <LoginForm />
        </Card>
      </main>
    </>
  );
}

HomePage.getInitialProps = ({ reduxStore }) => {
  // Tick the time once, so we'll have a
  // valid time before first render
  const { dispatch } = reduxStore;
  // dispatch({
  //   type: 'TICK',
  //   light: typeof window === 'object',
  //   lastUpdate: Date.now(),
  // });

  return {};
};

export default withRedux(HomePage);
