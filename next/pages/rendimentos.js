import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, List, LinearProgress, Hidden, Typography,
} from '@material-ui/core';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { Creators as RendimentoCreators } from 'appStore/ducks/rendimento';
import ListItemRendimento from 'components/pages/rendimento/ListItemRendimento';
import withRedux from 'lib/redux';
import Head from 'components/head';
import Nav from 'components/nav';
import UserCard from 'components/pages/perfil/UserCard';
import { Container } from 'next/app';


function Rendimentos() {
  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState({
    page: 1,
  });

  // const theme = useTheme();
  const { rendimentos, rendimentosLoading } = useSelector(state => state.rendimento);

  const fetchMoreListItems = () => {
    setLocalState(oldState => {
      dispatch(RendimentoCreators.getListRequest(localState.page));
      return {
        ...oldState, page: oldState.page + 1,
      };
    });
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  React.useEffect(() => {
    if (!rendimentosLoading) {
      setIsFetching(false);
    }
  }, [rendimentosLoading]);

  React.useEffect(() => {
    fetchMoreListItems();
  }, []);

  const onPressItem = (dados) => () => {
    dispatch(RendimentoCreators.getRendimentoDownloadRequest({ ano: dados.ano }));
  };

  return (
    <>
      <Head title="Meus Rendimentos" />
      <Nav />
      <main>
        <Grid
          container
          direction="row"
        >
          <Hidden smDown>
            <Grid sm={4} item>
              <UserCard />
            </Grid>
          </Hidden>
          <Grid xs={12} sm={8} item>
            {rendimentosLoading && <LinearProgress color="primary" />}
            <Typography variant="h5" style={{ textTransform: 'uppercase' }} align="center">
                Meus Rendimentos
            </Typography>
            <List>
              {rendimentos.map(listItem => (
                <ListItemRendimento
                  key={listItem.id}
                  dados={listItem}
                  onPressItem={onPressItem}
                />
              ))}
            </List>
            {isFetching && <LinearProgress color="primary" />}
          </Grid>
        </Grid>
      </main>
    </>
  );
}

Rendimentos.getInitialProps = ({ reduxStore }) => {
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

export default withRedux(Rendimentos);
