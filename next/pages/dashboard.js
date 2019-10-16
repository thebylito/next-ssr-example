import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Head from '../components/head';
import Nav from '../components/nav';
import { withRedux } from '../lib/redux';


function Dashboard() {
  // const theme = useTheme();
  // const [value, setValue] = React.useState(0);

  // const store = useSelector(state => state);

  // console.log({ store, props });


  return (
    <>
      <Head title="Manual" />
      <Nav />
      <div>Ola mundo</div>
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
