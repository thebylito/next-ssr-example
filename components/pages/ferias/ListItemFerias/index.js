import React from 'react';
import moment from 'moment';
import {
  Typography, ListItem, Box, Card,
} from '@material-ui/core';

function ListItemFerias({ dados, onPressItem }) {
  const {
    dataPagamento, diasFerias, diasAbono, periodoFerias, periodoAquisitivo,
  } = dados;

  const obterData = (date) => moment(date, 'YYYYMMDD').format('DD/MM/YYYY');

  return (
    <ListItem
      button
      onClick={onPressItem({ ...dados, periodo: periodoFerias.inicio })}
    >
      <Card
        style={{
          padding: '15px 10px',
          flexDirection: 'column',
          display: 'flex',
          flex: 1,
        }}
      >
        <Box style={{ flex: 1 }}>
          <Typography
            variant="h6"
          >
            {`Dias de férias: ${diasFerias}`}
          </Typography>
          <Typography
            variant="subtitle2"
            align="left"
          >
            {`Período das férias: ${obterData(periodoFerias.inicio)} - ${obterData(periodoFerias.fim)}`}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            align="right"
          >
            {`Dias de abono: ${diasAbono}`}
          </Typography>
          <Typography
            variant="body2"
            align="right"
          >
            {`Período aquisitivo: ${obterData(periodoAquisitivo.inicio)} - ${obterData(periodoAquisitivo.fim)}`}
          </Typography>
          <Typography
            variant="subtitle2"
            align="right"
          >
            {`Pagamento: ${obterData(dataPagamento)}`}
          </Typography>
        </Box>
      </Card>
    </ListItem>
  );
}

export default ListItemFerias;
