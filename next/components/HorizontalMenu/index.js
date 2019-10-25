import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { MenuItem, Typography } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BarChartIcon from '@material-ui/icons/BarChart';
import Router from 'next/router';
import MessageIcon from '@material-ui/icons/Message';

const home = {
  id: 'home',
  name: 'Home',
  path: '/dashboard',
  icon: <HomeIcon />,
};

const pages = [
  {
    id: 'pagamentos',
    name: 'Pagamentos',
    path: '/pagamentos',
    icon: <AccountBalanceWalletIcon />,
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
    flexDirection: 'row',
    flex: 1,
    width: 250,
  },
  listMenus: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  fullList: {
    width: 'auto',
  },
  menuItem: {
    display: 'flex',
    // padding: 10,
    flexDirection: 'column',
    // margin: 0,
  },
  menuIcon: {
    justifyContent: 'center',
    color: 'white',
    fontSize: 'large',
  },

});

export default function HorizontalMenu() {
  const classes = useStyles();

  const onLinkPress = (path) => () => {
    Router.push({
      pathname: path,
    });
  };

  return (
    <List className={classes.listMenus}>
      <MenuItem className={classes.menuItem} button onClick={onLinkPress(home.path)}>
        <ListItemIcon className={classes.menuIcon}>{home.icon}</ListItemIcon>
        <Typography variant="caption">{home.name}</Typography>
      </MenuItem>
      {pages.map((menu) => (
        <MenuItem
          className={classes.menuItem}
          button
          key={menu.id}
          onClick={onLinkPress(menu.path)}
        >
          <ListItemIcon className={classes.menuIcon}>{menu.icon}</ListItemIcon>
          <Typography variant="caption">{menu.name}</Typography>
        </MenuItem>
      ))}
    </List>
  );
}
