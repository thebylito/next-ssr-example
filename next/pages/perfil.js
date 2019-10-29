import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
  Grid, Typography, Button, List, ButtonGroup,
} from '@material-ui/core';
import Head from 'components/head';
import Nav from 'components/nav';
import withRedux from 'lib/redux';

import withAuth from 'lib/withAuth';
import ListItemProfile from '../components/pages/perfil/ListItemProfile';


function Perfil() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { data: userData } = useSelector(state => state.auth);

  const onChangeTab = (index) => () => setSelectedTab(index);

  return (
    <>
      <style jsx global>
        {`
        body {
          background-color: #1c9aba14;
        }
        `}
      </style>
      <Head title="Meu Perfil" />
      <Nav>
        <ButtonGroup
          fullWidth
          aria-label="small outlined button group"
        >
          <Button color="secondary" onClick={onChangeTab(0)} style={{ backgroundColor: selectedTab === 0 ? '#46b5d230' : '' }}>
          Pessoais
          </Button>
          <Button color="secondary" onClick={onChangeTab(1)} style={{ backgroundColor: selectedTab === 1 ? '#46b5d230' : '' }}>
          Endereço
          </Button>
        </ButtonGroup>
      </Nav>
      <Grid container>
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

export default withRedux(withAuth(Perfil));
