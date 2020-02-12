import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, List, LinearProgress, Hidden, Typography, Button, Box } from '@material-ui/core';
import Router from 'next/router';
import withRedux from 'lib/redux';
import Head from 'components/head';
import Nav from 'components/nav';
import Scrollbar from 'react-scrollbars-custom';
import withAuth from 'lib/withAuth';
import { Creators } from 'appStore/ducks/users';

function Users() {
  const dispatch = useDispatch();
  //const [isFetching, setIsFetching] = React.useState(false);
  // const [localState, setLocalState] = React.useState({
  //   page: 1,
  // });

  // const theme = useTheme();
  //const { Users, DashboardLoading } = useSelector(state => state.pagamento);

  // const fetchMoreListItems = () => {
  //   setIsFetching(true);
  //   setLocalState(oldState => {
  //     dispatch(PagamentoCreators.getListRequest(localState.page));
  //     return {
  //       ...oldState,
  //       page: oldState.page + 1,
  //     };
  //   });
  // };

  React.useEffect(() => {
    // dispatch(Creators.getUsersRequest(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React.useEffect(() => {
  //   fetchMoreListItems();
  // }, []);

  return (
    <>
      <Head title="Meus Users" />
      <Scrollbar
        disableTracksWidthCompensation
        style={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Nav />
      </Scrollbar>
    </>
  );
}

Users.getInitialProps = async ctx => {
  await withAuth(ctx);
};

export default withRedux(Users);
