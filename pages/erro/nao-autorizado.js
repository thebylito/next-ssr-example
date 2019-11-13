import React from 'react';
import {
  Grid, Typography, Button, Box,
} from '@material-ui/core';
import Link from 'next/link';
import Router from 'next/router';


function NaoAutorizado() {
  return (
    <Grid
      style={{
        height: '100vh',
        background: 'linear-gradient(to bottom,#86bbd8,#1f96b7,#369)',
        backgroundSize: 'contain',
      }}
      container
      alignItems="center"
      align="center"
      justify="center"
    >
      <Grid item xs={10} md={4} lg={2}>
        <Typography
          variant="h1"
          style={{
            color: '#fff',
            textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)',
          }}
        >
          401
        </Typography>
        <Typography
          style={{
            color: '#fff',
            textShadow: '2px 2px 2px rgba(0,0,0,.4)',
          }}
          variant="h4"
        >
          Ops! Acesso não autorizado
        </Typography>
        <Typography
          variant="body1"
          style={{
            margin: '15px 0',
            padding: 15,
            background: 'linear-gradient(to bottom,rgba(255,255,255,.9) 50%,rgba(255,255,255,.6) 100%)',
            boxShadow: '1px 2px 2px rgba(0,0,0,.3)',
          }}
        >
            Desculpe, a página que você estava procurando requer autenticação ou você não tem permissão para acessá-la.
          <Typography variant="body1">
            Em caso de dúvida entre em contato com a GETI.
          </Typography>
        </Typography>
        <Box flexDirection="column" display="flex">
          <Button onClick={() => Router.back()} variant="contained" color="primary" style={{ marginBottom: 15 }}>
          Voltar para página anterior
          </Button>
          <Link href="/">
            <Button href="/" variant="contained" color="primary">
          Voltar para Página Inicial
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}

export default NaoAutorizado;
