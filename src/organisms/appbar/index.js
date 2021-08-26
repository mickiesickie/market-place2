import React from 'react';
import { useSelector } from 'react-redux';
import { Toolbar, Typography } from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';

import useStyles from './styles';
import Login from '../login';
import Account from '../account';

const AppBar = () => {
  const classes = useStyles();
  const hasSession = useSelector((state) => Boolean(state.session.token));

  return (
    <MuiAppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          MarketPlace
        </Typography>
        {hasSession ? <Account /> : <Login />}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
