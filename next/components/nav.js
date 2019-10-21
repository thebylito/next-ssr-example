import React from 'react';
import { AppBar, Box } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import Link from './Link';
import SideDrawer from './SideDrawer';
import UserAvatar from './pages/dashboard/UserAvatar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: '0 10px',
  },
}));

const Nav = ({ exibirBotoes = true, children = null }) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <SideDrawer />
          {children ? <Box className={classes.title}>{children}</Box> : (
            <Typography variant="h6" className={classes.title}>
              <Link as="/" href="/">
                <Button style={{ color: '#fff', marginRight: 20 }} disableRipple disableFocusRipple variant="text">
                Meu RH
                </Button>
              </Link>
            </Typography>
          )}
          {exibirBotoes && (
            <UserAvatar size={35} />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
