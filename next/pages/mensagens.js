import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, Hidden, Typography, Card, CardContent, List, Box, LinearProgress, Divider,
} from '@material-ui/core';
import withRedux from 'lib/redux';
import Head from 'components/head';
import Nav from 'components/nav';
import UserCard from 'components/pages/perfil/UserCard';
import { makeStyles } from '@material-ui/styles';
import { Creators } from 'appStore/ducks/mensagem/lista';
import UserAvatar from 'components/pages/dashboard/UserAvatar';
import moment from 'moment';
import Scrollbar from 'react-scrollbars-custom';
import PaginaTitulo from 'components/pages/shared/PaginaTitulo';
import withAuth from 'lib/withAuth';

const useStyles = makeStyles({
  card: {
    marginBottom: 10,
    margin: '0 10px',
  },
  media: {
    height: 140,
  },
  cardTitleText: {
    textTransform: 'uppercase',
  },
});

function Mensagens() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mensagens, mensagensLoading } = useSelector(state => state.mensagem.lista);

  React.useEffect(() => {
    dispatch(Creators.getListRequest());
  }, []);

  return (
    <>
      <style jsx global>
        {`
        body {
          background-color: #1c9aba14;
        }
        `}
      </style>
      <Head title="Minhas mensagens" />
      <Nav />
      {mensagensLoading && <LinearProgress color="primary" />}
      <Grid container direction="row">
        <Hidden xsDown>
          <Grid sm={5} md={4} item>
            <UserCard />
          </Grid>
        </Hidden>
        <Grid xs={12} sm={7} md={8} item>
          <PaginaTitulo titulo="Minhas Mensagens" />
          <Scrollbar style={{ width: '100%', height: '86vh' }}>
            <List>
              {mensagens.map(mensagem => {
                const dataHoraEnvio = moment(mensagem.dataHoraEnvio);
                return (
                  <Card key={mensagem.id} className={classes.card}>
                    <CardContent>
                      <Typography variant="h6">
                        {mensagem.titulo}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ marginTop: 10 }}>
                        {mensagem.mensagem}
                      </Typography>
                      <Divider />
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        style={{ marginTop: 10 }}
                      >
                        <UserAvatar size={50} matricula={mensagem.usuarioOrigem.login} />
                        <Box style={{ marginLeft: 10 }} display="flex" flexDirection="column">
                          <Typography variant="body1" style={{ textTransform: 'uppercase' }}>
                            {mensagem.usuarioOrigem.nome}
                          </Typography>
                          <Typography color="textSecondary" variant="caption" style={{ textTransform: 'uppercase' }}>
                            {mensagem.usuarioOrigem.cargo_descricao}
                          </Typography>
                          <Typography color="textSecondary" variant="caption" style={{ textTransform: 'uppercase' }}>
                            {mensagem.usuarioOrigem.gerencia_nome}
                          </Typography>
                          <Typography color="textSecondary" variant="caption" style={{ textTransform: 'uppercase' }}>
                            {`${dataHoraEnvio.format('DD/MM/YYYY HH:mm')} - ${dataHoraEnvio.fromNow()}`}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </List>
          </Scrollbar>
        </Grid>
      </Grid>
    </>
  );
}

export default withRedux(withAuth(Mensagens));
