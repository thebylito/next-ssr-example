import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BarChartIcon from '@material-ui/icons/BarChart';
import Router from 'next/router';

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
];


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SideDrawer() {
  const classes = useStyles();
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

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button onClick={onLinkPress(home.path)}>
          <ListItemIcon>{home.icon}</ListItemIcon>
          <ListItemText primary={home.name} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {pages.map((menu) => (
          <ListItem button key={menu.id} onClick={onLinkPress(menu.path)}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer('left', true)}>
        <MenuIcon color="secondary" />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}
