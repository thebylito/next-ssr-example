import React from 'react';
import Head from 'components/head';
import Nav from 'components/nav';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Grid,
} from '@material-ui/core';
import { withRedux } from 'lib/redux';
import { Creators as PagamentoCreators } from 'appStore/ducks/pagamento';
import DetalhesCard from 'components/pages/pagamento/DetalhesCard';

function Detalhes() {
  const dispatch = useDispatch();
  const { pagamento } = useSelector(state => state.pagamento);
  const router = useRouter();
  const {
    mes, ano, roteiro, semana,
  } = router.query;

  React.useEffect(() => {
    dispatch(PagamentoCreators.getRequest({
      mes, ano, roteiro, semana,
    }));
  }, []);

  return (
    <>
      <Head title="Meus Detalhes" />
      <Nav />
      <Grid
        container
        direction="column"
        style={{
          paddingTop: 56,
        }}
      >
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
            <DetalhesCard
              label="Líquido"
              value={pagamento.totalLiquido}
              ehDesconto={false}
            />
            <DetalhesCard label="Bases" subItems={pagamento.bases} />

          </>
        )}
      </Grid>
    </>
  );
}

Detalhes.getInitialProps = ({ query }) => {
  console.log(query);
  return { query };
};
export default withRedux(Detalhes);
