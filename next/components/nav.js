import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';


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

const Nav = ({ isLoading = null }) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Logger realtime
          </Typography>
          {isLoading !== null && (
            <>
              {isLoading ? (
                <ColorCircularProgress size={30} thickness={5} />
              ) : (
                <DoneIcon style={{ fontSize: 30 }} />
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
