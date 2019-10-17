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

function Detalhes(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    mes, ano, roteiro, semana,
  } = router.query;

  React.useEffect(() => {
    dispatch(PagamentoCreators.getRequest({
      mes, ano, roteiro, semana,
    }));
  }, []);

  console.log({ props });

  return (
    <>
      <Head title="Meus Detalhes" />
      <Nav />
      <Grid
        container
        direction="column"
        // alignContent="flex-start"
        style={{
          paddingTop: 56,

        }}
      >
        OLAAA
      </Grid>
    </>
  );
}

Detalhes.getInitialProps = (aaa) => ({ aaa });

export default withRedux(Detalhes);
