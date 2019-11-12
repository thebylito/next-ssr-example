import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import withRedux from 'lib/redux';
import { apiUrl } from 'services/api';

const UserAvatar = ({ size = 100, matricula = null, source = null }) => {
  const { data } = useSelector(state => state.auth);
  const matriculaParaAvatar = matricula || data.matricula;
  const src = source || `${apiUrl}Usuario/foto/?login=${matriculaParaAvatar}`;
  return (
    <Avatar
      alt={data.nome}
      style={{
        width: size,
        height: size,
      }}
      src={src}
    />
  );
};

export default withRedux(UserAvatar);
