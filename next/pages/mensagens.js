import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, Hidden, Typography, Card, CardContent, List,
} from '@material-ui/core';
import withRedux from 'lib/redux';
import Head from 'components/head';
import Nav from 'components/nav';
import UserCard from 'components/pages/perfil/UserCard';
import { makeStyles } from '@material-ui/styles';
import { Creators } from 'appStore/ducks/mensagem/lista';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    marginBottom: 10,
  },
  media: {
    height: 140,
  },
  cardTitleText: {
    textTransform: 'uppercase',
  },
});

function Pagamentos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mensagens, mensagensLoading } = useSelector(state => state.mensagem.lista);

  React.useEffect(() => {
    dispatch(Creators.getListRequest());
  }, []);

  return (
    <>
      <Head title="Minhas mensagens" />
      <Nav />
      <Grid
        container
        direction="row"
      >
        <Hidden xsDown>
          <Grid sm={5} md={4} direction="column" item>
            <UserCard />
          </Grid>
        </Hidden>
        <Grid direction="column" xs={12} sm={7} md={8} item>
          <Typography variant="h5" style={{ textTransform: 'uppercase' }} align="center">
            Minhas Mensagens
          </Typography>
          <Grid sm={12} md={12} spacing={5} direction="column">
            <List>
              {mensagens.map(mensagem => (
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitleText}>
                      {mensagem.titulo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {mensagem.mensagem}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default withRedux(Pagamentos);
