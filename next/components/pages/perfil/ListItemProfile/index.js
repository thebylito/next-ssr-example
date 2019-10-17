import React from 'react';
import {
  Typography, ListItem, ListItemText,
} from '@material-ui/core';

function ListItemProfile({ title, subtitle }) {
  return (
    <ListItem style={{
      padding: 0,
      paddingLeft: 15,
    }}
    >
      <ListItemText
        primary={title}
        secondary={(
          <Typography
            variant="body2"
            color="textPrimary"
          >
            {subtitle}
          </Typography>
        )}
      />
    </ListItem>
  );
}

export default ListItemProfile;
