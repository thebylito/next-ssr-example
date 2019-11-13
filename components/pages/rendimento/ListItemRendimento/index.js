import React from 'react';
import {
  Typography, ListItem, Box, Card,
} from '@material-ui/core';

function ListItemRendimento({ dados, onPressItem }) {
  const { ano, id } = dados;

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
        <Box align="center" style={{ flex: 1 }}>
          <Typography>{ano}</Typography>
        </Box>
      </Card>
    </ListItem>
  );
}

export default ListItemRendimento;
