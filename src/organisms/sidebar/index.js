import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@material-ui/core';

import useStyles from './styles';

const menu = [
  {
    name: 'Comprador',
    href: '/buyer'
  },
  {
    name: 'Inventario',
    href: '/inventory'
  },
  {
    name: 'Administrador',
    href: '/administrator'
  }
];

const SideBar = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {menu.map((menu, index) => (
            <ListItem button href={menu.href} key={index}>
              <Link href={menu.href}>
                <ListItemText primary={menu.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SideBar;
