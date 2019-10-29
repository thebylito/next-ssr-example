import React from 'react';
import { Grid } from '@material-ui/core';
import Head from 'components/head';
import Nav from 'components/nav';
import withRedux from 'lib/redux';
// import SanesulLogo from 'components/SanesulLogo';
import UserCard from 'components/pages/perfil/UserCard';

function Dashboard() {
  return (
    <>
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
      <Head title="Página Inicial" />
      <Nav />
      <Grid
        container
        alignItems="center"
        direction="column"
      >
        {/* <SanesulLogo width={64} height={85} /> */}
        <UserCard />
      </Grid>
    </>
  );
}

export default withRedux(Dashboard);
