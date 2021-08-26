import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import AppBar from '../../organisms/Appbar';
import SideBar from '../../organisms/Sidebar';
import useStyles from './styles';

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Head>
        <title>MarketPlace</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppBar />
      <SideBar />
      <main className={classes.main}>
        <div className={classes.container}>{children}</div>
      </main>
      <footer className={classes.footer}></footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;
