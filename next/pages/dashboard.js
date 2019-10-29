import React from 'react';
import { Grid } from '@material-ui/core';
import Head from 'components/head';
import Nav from 'components/nav';
import withRedux from 'lib/redux';
// import SanesulLogo from 'components/SanesulLogo';
import UserCard from 'components/pages/perfil/UserCard';
import withAuth from 'lib/withAuth';

function Dashboard() {
  return (
    <>
      <style jsx global>
        {`
        body {
          background-color: #1c9aba14;
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

export default withRedux(withAuth(Dashboard));
