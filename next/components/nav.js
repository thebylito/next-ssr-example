import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import Link from './Link';


// import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ColorCircularProgress = withStyles({
  root: {
    color: '#fff',
  },
})(CircularProgress);

const Nav = ({ exibirBotoes = true }) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" style={{ marginBottom: 50 }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link as="/" href="/">
              <Button style={{ color: '#fff', marginRight: 20 }} disableRipple disableFocusRipple variant="text">
                Meu RH
              </Button>
            </Link>
          </Typography>
          {exibirBotoes && (
          <Link as="manual" href="manual">
            <Button style={{ color: '#fff' }}>
              Sair
            </Button>
          </Link>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
