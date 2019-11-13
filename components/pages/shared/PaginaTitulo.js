import React from 'react';
import { Typography } from '@material-ui/core';

function PaginaTitulo({ children, titulo }) {
  return (
    <Typography
      color="primary"
      style={{ textTransform: 'uppercase' }}
      variant="h3"
      align="center"
    >
      {children || titulo}
    </Typography>
  );
}

export default PaginaTitulo;
