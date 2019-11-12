import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, List, LinearProgress, Hidden, Typography, Button, Box, Card, Divider,
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
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { appUtils } from 'utils/appUtils';

const useStyles = makeStyles(theme => ({
  cardFeriasProgramadas: {
    margin: 16,
    padding: 16,
  },
  separador: {
    backgroundColor: theme.palette.primary.main,
  },
}));


function Ferias() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = React.useState(false);
  const [localState, setLocalState] = React.useState({
    page: 1,
  });

  // const theme = useTheme();
  const { ferias, feriasLoading } = useSelector(state => state.ferias.lista);
  const { data: programada } = useSelector(state => state.ferias.programada);

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

  const formatarData = (data) => {
    if (appUtils.isNullOrUndefined(data.trim())) {
      return '---';
    }
    return moment(data, 'YYYYMMDD').format('DD/MM/YYYY');
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
              <Card className={classes.cardFeriasProgramadas}>
                <Typography color="primary" align="center" variant="h4">Férias Programadas</Typography>
                {programada ? (
                  <>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Typography variant="body1">Periodo aquisitivo</Typography>
                      <Typography align="center" variant="subtitle2">{`${formatarData(programada.dtinipaq)} - ${formatarData(programada.dtfimpaq)}`}</Typography>
                    </Box>
                    <Divider className={classes.separador} />
                    <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={1}>
                      <Typography>Dias vencidos</Typography>
                      <Typography align="center" variant="subtitle2">{programada.diasvencidos}</Typography>
                    </Box>
                    <Divider className={classes.separador} />
                    <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={1}>
                      <Typography>Dias a vencer</Typography>
                      <Typography align="center" variant="subtitle2">{programada.diasvencer}</Typography>
                    </Box>
                    <Divider className={classes.separador} />
                    <Box display="flex" justifyContent="flex-end">
                      <Box display="flex" flexDirection="row" justifyContent="space-between" marginRight={5}>
                        <Box display="flex" flexDirection="column" marginRight={1}>
                          <Typography color="primary" variant="h6" align="center">Início</Typography>
                          <Typography align="right" variant="subtitle2">{formatarData(programada.dtiniproG1)}</Typography>
                          <Typography align="right" variant="subtitle2">{formatarData(programada.dtiniproG2)}</Typography>
                          <Typography align="right" variant="subtitle2">{formatarData(programada.dtiniproG3)}</Typography>
                        </Box>
                        <Divider className={classes.separador} orientation="vertical" />
                      </Box>
                      <Box display="flex" flexDirection="row" justifyContent="space-between" marginRight={5}>
                        <Box display="flex" flexDirection="column" marginRight={1}>
                          <Typography color="primary" variant="h6">Duração(dias)</Typography>
                          <Typography align="right" variant="subtitle2">{programada.diasferiaS1}</Typography>
                          <Typography align="right" variant="subtitle2">{programada.diasferiaS2}</Typography>
                          <Typography align="right" variant="subtitle2">{programada.diasferiaS3}</Typography>
                        </Box>
                        <Divider className={classes.separador} orientation="vertical" />
                      </Box>
                      <Divider className={classes.separador} orientation="vertical" />
                      <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Box display="flex" flexDirection="column" marginRight={1}>
                          <Typography color="primary" variant="h6">Abono</Typography>
                          <Typography align="right" variant="subtitle2">{programada.diasabonO1}</Typography>
                          <Typography align="right" variant="subtitle2">{programada.diasabonO2}</Typography>
                          <Typography align="right" variant="subtitle2">{programada.diasabonO3}</Typography>
                        </Box>
                        <Divider className={classes.separador} orientation="vertical" />
                      </Box>
                    </Box>
                  </>
                ) : (<Typography align="center" variant="subtitle2">Não há férias programadas</Typography>
                )}
              </Card>
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
