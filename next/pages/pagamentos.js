import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, List, LinearProgress,
} from '@material-ui/core';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { Creators as PagamentoCreators } from 'appStore/ducks/pagamento';
import ListItemPagamento from 'components/pages/pagamento/ListItemPagamento';
import Router from 'next/router';
import withRedux from 'lib/redux';
import Head from 'components/head';
import Nav from 'components/nav';


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
      <Grid
        container
        direction="column"
        // alignContent="flex-start"
        style={{
          paddingTop: 56,

        }}
      >
        {pagamentosLoading && <LinearProgress color="primary" />}
        <Grid>
          <List>
            {pagamentos.map(listItem => (
              <ListItemPagamento
                dados={listItem}
                onPressItem={onPressItem}
              />
            ))}
          </List>
        </Grid>

        {isFetching && <LinearProgress color="primary" />}
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
