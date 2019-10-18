import React from 'react';
import moment from 'moment';
import {
  Typography, ListItem, Box, Card,
} from '@material-ui/core';
import { appUtils } from 'utils/appUtils';

function ListItemPagamento({ dados, onPressItem }) {
  const {
    ano, mes, totalProventos, descricao,
  } = dados;
  const mesNome = moment()
    .month(Number(mes - 1))
    .format('MMMM');

  return (
    <ListItem
      button
      onClick={onPressItem(dados)}
    >
      <Card
        style={{
          padding: '15px 10px',
          flexDirection: 'row',
          display: 'flex',
          flex: 1,
        }}
      >
        <Box style={{ flex: 1 }}>
          <Typography
            variant="body1"
          >
            {mesNome}
          </Typography>
          <Typography
            variant="caption"
          >
            {ano}
          </Typography>

        </Box>
        <Box style={{ }}>
          <Typography
            variant="body2"
            align="right"
          >
            {descricao}
          </Typography>
          <Typography
            align="right"
            color="primary"
            component="div"
          >
            {appUtils.formatPrice(totalProventos)}
          </Typography>
        </Box>
      </Card>
    </ListItem>
  );
}

export default ListItemPagamento;
