import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, List, LinearProgress, Hidden, Typography, Button, Box,
} from '@material-ui/core';
import ListItemFerias from 'components/pages/ferias/ListItemFerias';
import Router from 'next/router';
import withRedux from 'lib/redux';
import Head from 'components/head';
import Nav from 'components/nav';
import UserCard from 'components/pages/perfil/UserCard';
import Scrollbar from 'react-scrollbars-custom';
import PaginaTitulo from 'components/pages/shared/PaginaTitulo';
import withAuth from 'lib/withAuth';
import { Creators as FeriasListaCreators } from 'appStore/ducks/ferias/lista';

function Ferias() {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = React.useState(false);
  const [localState, setLocalState] = React.useState({
    page: 1,
  });

  // const theme = useTheme();
  const { ferias, feriasLoading } = useSelector(state => state.ferias.lista);

  const fetchMoreListItems = () => {
    setIsFetching(true);
    setLocalState(oldState => {
      dispatch(FeriasListaCreators.getListaRequest(localState.page));
      return {
        ...oldState, page: oldState.page + 1,
      };
    });
  };

  React.useEffect(() => {
    if (!feriasLoading) {
      setIsFetching(false);
    }
  }, [feriasLoading]);

  React.useEffect(() => {
    fetchMoreListItems();
  }, []);

  const onPressItem = (dados) => () => {
    Router.push({
      pathname: '/ferias/detalhes',
      query: { periodo: dados.periodo },
    });
  };

  return (
    <>
      <style jsx global>
        {`
        body {
          background-color: #1c9aba14;
        }
        `}
      </style>
      <Head title="Minhas Férias" />
      <Scrollbar
        disableTracksWidthCompensation
        style={{
          width: '100%', height: '100vh',
        }}
      >
        <Nav />
        <Grid
          container
          direction="row"
        >
          <Hidden xsDown>
            <Grid sm={5} md={4} item>
              <UserCard />
            </Grid>
          </Hidden>
          <Grid xs={12} sm={7} md={8} item>
            <PaginaTitulo titulo="Minhas Férias" />
            <List>
              {ferias.map(listItem => (
                <ListItemFerias
                  key={listItem.id}
                  dados={listItem}
                  onPressItem={onPressItem}
                />
              ))}
            </List>
            {!isFetching ? (
              <Box textAlign="center">
                <Button
                  variant="text"
                  color="primary"
                  onClick={fetchMoreListItems}
                  disabled={isFetching}
                  style={{ alignContent: 'center' }}
                >
                  <Typography variant="body2">
                    Carregar Mais
                  </Typography>
                </Button>
              </Box>
            ) : (<>{feriasLoading && <LinearProgress color="primary" />}</>)}
          </Grid>
        </Grid>
      </Scrollbar>
    </>
  );
}

export default withRedux(withAuth(Ferias));
