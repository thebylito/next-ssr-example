import React from 'react';
import {
  AppBar, Box, Hidden, IconButton,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Creators } from 'appStore/ducks/auth';
import SideDrawer from './SideDrawer';
import UserAvatar from './pages/dashboard/UserAvatar';
import HorizontalMenu from './HorizontalMenu';

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
  const dispatch = useDispatch();
  const classes = useStyles();

  const onLogout = () => {
    dispatch(Creators.getLogoutRequest());
  };

  return (
    <>
      <CssBaseline />
      {/* <ElevationScroll {...props}> */}
      <AppBar position="sticky">
        <Toolbar>
          <Hidden smUp>
            <SideDrawer />
          </Hidden>
          <Hidden xsDown>
            <HorizontalMenu />
          </Hidden>
          <Box className={classes.title}>{children || null}</Box>
          {exibirBotoes && (
            <>
              <UserAvatar size={35} />
              <IconButton style={{ padding: 8, paddingRight: 0 }} disableRipple onClick={onLogout}>
                <ExitToAppIcon color="secondary" />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* </ElevationScroll> */}
    </>
  );
};

export default Nav;
