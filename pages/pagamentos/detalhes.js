import React from 'react';
import Head from 'components/head';
import Nav from 'components/nav';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Grid, LinearProgress, Typography, Button,
} from '@material-ui/core';
import withRedux from 'lib/redux';
import { Creators as PagamentoCreators } from 'appStore/ducks/pagamento';
import DetalhesCard from 'components/pages/pagamento/DetalhesCard';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import withAuth from 'lib/withAuth';
import PaginaTitulo from 'components/pages/shared/PaginaTitulo';

function Detalhes() {
  const dispatch = useDispatch();
  const { pagamento, pagamentoLoading } = useSelector(state => state.pagamento);
  const router = useRouter();
  const {
    mes, ano, roteiro, semana,
  } = router.query;

  React.useEffect(() => {
    dispatch(PagamentoCreators.getRequest({
      mes, ano, roteiro, semana,
    }));
  }, []);

  const getPagamentoDownload = () => {
    dispatch(PagamentoCreators.getPagamentoDownloadRequest({
      ano,
      mes,
      roteiro,
      semana,
    }));
  };

  return (
    <>
      <Head title="Meus Detalhes" />
      <Nav />
      {pagamentoLoading && <LinearProgress color="primary" />}
      <PaginaTitulo titulo={`Período: ${mes}/${ano}`} />
      <Grid container direction="row" justify="center">
        <Grid item xs={12} sm={8} md={7}>
          {pagamento && Object.keys(pagamento).length > 0 && pagamento.totalProventos !== 0 && (
            <>
              <DetalhesCard
                label="Proventos"
                value={pagamento.totalProventos}
                subItems={pagamento.proventos}
                ehDesconto={false}
              />
              <DetalhesCard
                label="Descontos"
                value={pagamento.totalDescontos}
                subItems={pagamento.descontos}
              />
              <DetalhesCard label="Bases" subItems={pagamento.bases} />
              <DetalhesCard
                label="Líquido"
                value={pagamento.totalLiquido}
                ehDesconto={false}
              />
              <Button
                variant="contained"
                style={{ margin: 8 }}
                color="primary"
              >
                <Typography style={{ marginRight: 10 }}>Gerar PDF</Typography>
                <CloudDownloadIcon color="secondary" onClick={getPagamentoDownload} />
              </Button>
            </>
          )}
        </Grid>

      </Grid>
    </>
  );
}

Detalhes.getInitialProps = async ctx => {
  await withAuth(ctx);
};

export default withRedux(Detalhes);
