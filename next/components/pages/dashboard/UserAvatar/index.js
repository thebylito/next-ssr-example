import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import withRedux from 'lib/redux';
import { apiUrl } from 'services/api';

const UserAvatar = ({ size = 100 }) => {
  const { data } = useSelector(state => state.auth);
  return (
    <Avatar
      alt={data.nome}
      style={{
        width: size,
        height: size,
      }}
      src={`${apiUrl}Usuario/foto/?login=${data.loginDeRede}`}
    />
  );
};

export default withRedux(UserAvatar);
