import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, List, LinearProgress, Hidden,
} from '@material-ui/core';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { Creators as PagamentoCreators } from 'appStore/ducks/pagamento';
import ListItemPagamento from 'components/pages/pagamento/ListItemPagamento';
import Router from 'next/router';
import withRedux from 'lib/redux';
import Head from 'components/head';
import Nav from 'components/nav';
import UserCard from 'components/pages/perfil/UserCard';


function Pagamentos() {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState({
    page: 1,
  });

  // const theme = useTheme();
  const { pagamentos, pagamentosLoading } = useSelector(state => state.pagamento);

  const fetchMoreListItems = () => {
    setLocalState(oldState => {
      dispatch(PagamentoCreators.getListRequest(localState.page));
      return {
        ...oldState, page: oldState.page + 1,
      };
    });
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

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
        // alignContent="flex-start"
        style={{
          paddingTop: 56,
        }}
      >
        <Hidden xsDown>
          <Grid sm={5} md={4} direction="column" item>
            <UserCard />
          </Grid>
        </Hidden>
        <Grid direction="column" xs={12} sm={7} md={8} item>
          <List>
            {pagamentos.map(listItem => (
              <ListItemPagamento
                key={listItem.id}
                dados={listItem}
                onPressItem={onPressItem}
              />
            ))}
          </List>
          {isFetching && <LinearProgress color="primary" />}
        </Grid>
      </Grid>
    </>
  );
}

Pagamentos.getInitialProps = ({ reduxStore }) => {
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

export default withRedux(Pagamentos);
