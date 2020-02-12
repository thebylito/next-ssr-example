import React from 'react';
import withRedux from 'lib/redux';
import Head from 'components/head';
import Nav from 'components/nav';
import Scrollbar from 'react-scrollbars-custom';
import withAuth from 'lib/withAuth';
import { Creators } from 'appStore/ducks/users';
import { useSelector } from 'react-redux';
import { Typography, Avatar } from '@material-ui/core';

function Dashboard(props) {
  const { users } = useSelector(state => state.users);
  //const dispatch = useDispatch();
  //const [isFetching, setIsFetching] = React.useState(false);
  // const [localState, setLocalState] = React.useState({
  //   page: 1,
  // });

  // const theme = useTheme();
  //const { Dashboard, DashboardLoading } = useSelector(state => state.pagamento);

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

  // React.useEffect(() => {
  //   if (!DashboardLoading) {
  //     setIsFetching(false);
  //   }
  // }, [DashboardLoading]);

  // React.useEffect(() => {
  //   fetchMoreListItems();
  // }, []);

  return (
    <>
      <Head title="Meus Dashboard" />
      <Scrollbar
        disableTracksWidthCompensation
        style={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Nav />
        <Avatar src={users[0].avatar} />
        <Typography>{users[0].first_name}</Typography>
        <Typography>{users[0].email}</Typography>
      </Scrollbar>
    </>
  );
}

Dashboard.getInitialProps = async (ctx, store) => {
  await withAuth(ctx);
  const req = await fetch('https://reqres.in/api/users?page=1');
  const json = await req.json();
  await store.dispatch(Creators.getUsersSuccess(json.data));
};

export default withRedux(Dashboard);
