import React from 'react';
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './styles';

const menu = [{
  name: 'Comprador',
  href: '/buyer'
}, {
  name: 'Inventario',
  href: '/inventory'
}, {
  name: 'Administrador',
  href: '/administrator'
}];

export default function SideBar() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {menu.map((menu, index) => (
            <ListItem button key={index} href={menu.href}>
              <Link href={menu.href}>
                <ListItemText primary={menu.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
