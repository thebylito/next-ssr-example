import React from 'react';
import {
  Typography, Card, Box, Button,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import UserAvatar from 'components/pages/dashboard/UserAvatar';
import ProfileDescriptionItem from 'components/pages/dashboard/ProfileDescriptionItem';

function UserCard() {
  const { data } = useSelector(state => state.auth);
  const onPressVerTudo = () => {
    Router.push({
      pathname: '/perfil',
    });
  };
  return (
    <>
      <div style={{ transform: 'translateY(50px)', justifyContent: 'center', display: 'flex' }}>
        <UserAvatar />
      </div>
      <Card style={{
        margin: '0 15px',
        padding: 20,
        paddingTop: 50,
      }}
      >
        <Box
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Typography align="center" variant="h6">
            {data.nome}
          </Typography>
          <Typography
            align="center"
            variant="caption"
            component="div"
          >
            {data.funcao}
          </Typography>
        </Box>
        <div style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
          <div style={{ flex: 1 }}>
            <ProfileDescriptionItem label="Email" value={data.email} />
            <ProfileDescriptionItem label="Matrícula" value={data.matricula} />
            <ProfileDescriptionItem label="Gerência" value={data.gerencia} />
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 15 }}
          onClick={onPressVerTudo}
        >
          <Typography>Ver tudo</Typography>
        </Button>
      </Card>
    </>
  );
}

export default UserCard;
