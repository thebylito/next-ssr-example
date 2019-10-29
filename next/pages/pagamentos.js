import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, List, LinearProgress, Hidden, Typography, Button, Box,
} from '@material-ui/core';
import { Creators as PagamentoCreators } from 'appStore/ducks/pagamento';
import ListItemPagamento from 'components/pages/pagamento/ListItemPagamento';
import Router from 'next/router';
import withRedux from 'lib/redux';
import Head from 'components/head';
import Nav from 'components/nav';
import UserCard from 'components/pages/perfil/UserCard';
import Scrollbar from 'react-scrollbars-custom';


function Pagamentos() {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = React.useState(false);
  const [localState, setLocalState] = React.useState({
    page: 1,
  });

  // const theme = useTheme();
  const { pagamentos, pagamentosLoading } = useSelector(state => state.pagamento);

  const fetchMoreListItems = () => {
    setIsFetching(true);
    setLocalState(oldState => {
      dispatch(PagamentoCreators.getListRequest(localState.page));
      return {
        ...oldState, page: oldState.page + 1,
      };
    });
  };

  React.useEffect(() => {
    if (!pagamentosLoading) {
      setIsFetching(false);
    }
  }, [pagamentosLoading]);

  React.useEffect(() => {
    fetchMoreListItems();
  }, []);

  const onPressItem = (dados) => () => {
    Router.push({
      pathname: '/pagamentos/detalhes',
      query: {
        mes: dados.mes,
        ano: dados.ano,
        roteiro: dados.roteiro,
        semana: dados.semana,
      },
    });
  };

  return (
    <>
      <Head title="Meus Pagamentos" />
      <Nav />
      {pagamentosLoading && <LinearProgress color="primary" />}
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
          <Typography variant="h5" style={{ textTransform: 'uppercase' }} align="center">
            Meus Pagamentos
          </Typography>
          <Scrollbar style={{ width: '100%', height: '86vh' }}>
            <List>
              {pagamentos.map(listItem => (
                <ListItemPagamento
                  key={listItem.id}
                  dados={listItem}
                  onPressItem={onPressItem}
                />
              ))}
            </List>
            {!isFetching && (
              <Box textAlign="center">
                <Button
                  variant="text"
                  color="primary"
                  onClick={fetchMoreListItems}
                  disabled={isFetching}
                  style={{
                    alignContent: 'center',
                  }}
                >
                  <Typography variant="body2">
                    Carregar Mais
                  </Typography>
                </Button>
              </Box>
            )}
          </Scrollbar>
        </Grid>
      </Grid>
    </>
  );
}

export default withRedux(Pagamentos);
