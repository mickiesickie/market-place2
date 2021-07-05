import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '../../molecules/grid';
import Search from '../../molecules/search';
import ProviderApi from '../../api/providers';
import UserApi from '../../api/users';
import useStyles from './styles';

export default function Administrator() {
  const classes = useStyles();
  const hasToken = useSelector(state => Boolean(state.session.token));

  const [products, setProducts] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const getProducts = async (users = []) => {
    if (hasToken) {
      const products = await ProviderApi.getProductsAsAdmin(users);

      setProducts(products || []);
    }
  };

  const getUsers = async (search) => {
    if (hasToken) {
      const users = await UserApi.getUsers();

      setUsers(users || []);
    }
  };

  React.useEffect(() => {
    if (hasToken) {
      getUsers();
      getProducts();
    }
  }, [hasToken]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    getProducts(newChecked);
  };

  return (
    <Box p={2} className={classes.root}>
      <Paper className={classes.filters}>
        <Typography variant="subtitle1" gutterBottom>
          Filtros por provedores
        </Typography>

        <List>
          {users.map((user) => {
            const labelId = `checkbox-list-label-${user.id}`;

            return (
              <ListItem key={user.id} role={undefined} dense button onClick={handleToggle(user.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(user.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={user.email} />
              </ListItem>
            );
          })}
        </List>
      </Paper>

      <Box className={classes.content}>
        <Grid products={products} />
      </Box>
    </Box>
  );
}
