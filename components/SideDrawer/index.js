import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FlightIcon from '@material-ui/icons/Flight';

import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BarChartIcon from '@material-ui/icons/BarChart';
import MessageIcon from '@material-ui/icons/Message';
import Router from 'next/router';
import { Creators } from 'appStore/ducks/auth';

export const appPages = [
  {
    id: 'home',
    name: 'Home',
    path: '/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 'pagamentos',
    name: 'Pagamentos',
    path: '/pagamentos',
    icon: <AccountBalanceWalletIcon />,
  },
  {
    id: 'ferias',
    name: 'Férias',
    path: '/ferias',
    icon: <FlightIcon />,
  },
  {
    id: 'rendimentos',
    name: 'Rendimentos',
    path: '/rendimentos',
    icon: <BarChartIcon />,
  },
  {
    id: 'messages',
    name: 'Mensagens',
    path: '/mensagens',
    icon: <MessageIcon />,
  },
];


const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: 250,
  },
  listMenus: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SideDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const onLinkPress = (path) => () => {
    Router.push({
      pathname: path,
    });
  };

  const onLogout = () => {
    dispatch(Creators.getLogoutRequest());
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List className={classes.listMenus}>
        {appPages.map((menu) => (
          <>
            <ListItem button key={menu.id} onClick={onLinkPress(menu.path)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
            {menu.id === 'home' && <Divider />}
          </>
        ))}
      </List>
      <Divider />
      <ListItem button onClick={onLogout}>
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </div>
  );

  return (
    <div>
      <IconButton style={{ padding: 0 }} onClick={toggleDrawer('left', true)}>
        <MenuIcon color="secondary" />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}