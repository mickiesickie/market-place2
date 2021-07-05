import React from 'react';
import { useSelector } from 'react-redux';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import Login from '../login';
import Account from '../account';

export default function AppBar() {
  const classes = useStyles();
  const hasSession = useSelector(state => Boolean(state.session.token));

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          MarketPlace
        </Typography>

        {!hasSession && (
          <Login />
        )}

        {hasSession && (
          <Account />
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
