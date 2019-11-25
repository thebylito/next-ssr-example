import React from 'react';
import Head from 'components/head';
import Nav from 'components/nav';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, LinearProgress, Typography } from '@material-ui/core';
import withRedux from 'lib/redux';
import { Creators as FeriasItemCreators } from 'appStore/ducks/ferias/item';
import DetalhesCard from 'components/pages/ferias/DetalhesCard';
// import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import withAuth from 'lib/withAuth';
import PaginaTitulo from 'components/pages/shared/PaginaTitulo';
import moment from 'moment';
import Scrollbar from 'react-scrollbars-custom';

function Detalhes() {
  const dispatch = useDispatch();
  const { ferias, detalhes, loading } = useSelector(state => state.ferias.item);
  const router = useRouter();
  const { periodo } = router.query;

  React.useEffect(() => {
    dispatch(FeriasItemCreators.getRequest({ periodo }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getFeriasDownload = () => {
  //   dispatch(FeriasItemCreators.getFeriasDownloadRequest({ periodo }));
  // };

  const obterData = date => moment(date, 'YYYYMMDD').format('DD/MM/YYYY');

  if (!detalhes) return null;

  return (
    <>
      <Head title="Meus Detalhes" />
      <Scrollbar
        disableTracksWidthCompensation
        style={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Nav />
        {loading && <LinearProgress color="primary" />}
        <PaginaTitulo
          titulo={`Período de férias: ${obterData(detalhes.periodoFerias.inicio)} - ${obterData(
            detalhes.periodoFerias.fim
          )}`}
        />
        <Typography align="center" variant="subtitle2">
          {`Período aquisitivo: ${obterData(detalhes.periodoAquisitivo.inicio)} - ${obterData(
            detalhes.periodoAquisitivo.fim
          )}`}
        </Typography>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} sm={8} md={7}>
            {ferias && Object.keys(ferias).length > 0 && ferias.totalProventos !== 0 && (
              <>
                <DetalhesCard
                  label="Proventos"
                  value={ferias.totalProventos}
                  subItems={ferias.proventos}
                  ehDesconto={false}
                />
                <DetalhesCard
                  label="Descontos"
                  value={ferias.totalDescontos}
                  subItems={ferias.descontos}
                />
                <DetalhesCard label="Bases" subItems={ferias.bases} />
                <DetalhesCard label="Líquido" value={ferias.totalLiquido} ehDesconto={false} />
                {/* <Button
                variant="contained"
                style={{ margin: 8 }}
                color="primary"
              >
                <Typography style={{ marginRight: 10 }}>Gerar PDF</Typography>
                <CloudDownloadIcon color="secondary" onClick={getFeriasDownload} />
              </Button> */}
              </>
            )}
          </Grid>
        </Grid>
      </Scrollbar>
    </>
  );
}

Detalhes.getInitialProps = async ctx => {
  await withAuth(ctx);
};

export default withRedux(Detalhes);
