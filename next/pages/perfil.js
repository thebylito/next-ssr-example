import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
  Avatar, Grid, Card, Typography, Box, Button, ListItem, List, ListItemText, ButtonGroup,
} from '@material-ui/core';
import Head from '../components/head';
import Nav from '../components/nav';
import { withRedux } from '../lib/redux';
import { apiUrl } from '../services/api';
import ProfileDescriptionItem from '../components/pages/dashboard/ProfileDescriptionItem';
import ListItemProfile from '../components/pages/perfil/ListItemProfile';


function Perfil() {
  // const theme = useTheme();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const { data: userData } = useSelector(state => state.auth);

  // console.log({ store, props });

  const onChangeTab = (index) => () => setSelectedTab(index);

  return (
    <>
      <Head title="Meu Perfil" />
      <Nav>
        <ButtonGroup
          // size="large"
          fullWidth
          aria-label="small outlined button group"
          style={{
            margin: '5px',
          }}
        >
          <Button color="secondary" onClick={onChangeTab(0)} style={{ backgroundColor: selectedTab === 0 ? '#46b5d230' : '' }}>
          Pessoais
          </Button>
          <Button color="secondary" onClick={onChangeTab(1)} style={{ backgroundColor: selectedTab === 1 ? '#46b5d230' : '' }}>
          Endereço
          </Button>
        </ButtonGroup>
      </Nav>
      <Grid
        container
        // alignContent="flex-start"
        style={{
          paddingTop: 56,
        }}
      >
        {selectedTab === 0 && (
          <>
            <Typography style={{ width: '100%' }} align="center" variant="h6" component="div">Dados Pessoais</Typography>
            <List>
              <ListItemProfile title="Nome Completo" subtitle={userData.nome} />
              <ListItemProfile title="Nascimento" subtitle={userData.dataNascimento} />
              <ListItemProfile title="Nascimento" subtitle={userData.dataNascimento} />
              <ListItemProfile title="RG" subtitle={userData.rg.numero} />
              <ListItemProfile title="CPF" subtitle={userData.cpf} />
              <ListItemProfile title="Titulo" subtitle={userData.tituloEleitor} />
              <ListItemProfile title="PIS " subtitle={userData.pis} />
              <ListItemProfile title="Celular" subtitle={userData.telefone} />
              <ListItemProfile title="Mãe" subtitle={userData.nomeMae} />
              <ListItemProfile title="Pai" subtitle={userData.nomePai} />
              <ListItemProfile title="Estado Cívil" subtitle={userData.estadoCivil} />
            </List>
          </>
        )}
        {selectedTab === 1 && (
          <>
            <Typography style={{ width: '100%' }} align="center" variant="h6" component="div">Dados de Endereço</Typography>
            <List>
              <ListItemProfile
                title="Endereço"
                subtitle={userData.endereco.logradouro}
              />
              <ListItemProfile title="Número" subtitle={userData.endereco.numero} />
              <ListItemProfile
                title="Complemento"
                subtitle={userData.endereco.complemento}
              />
              <ListItemProfile title="Bairro" subtitle={userData.endereco.bairro} />
              <ListItemProfile title="Cidade" subtitle={userData.endereco.municipio} />
              <ListItemProfile title="CEP" subtitle={userData.endereco.cep} />
            </List>
          </>
        )}
      </Grid>
    </>
  );
}

Perfil.getInitialProps = ({ reduxStore }) => {
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

export default withRedux(Perfil);
