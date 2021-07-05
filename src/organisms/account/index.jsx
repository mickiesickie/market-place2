import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AuthApi from '../../api/auth';
import { setToken } from '../../redux/session';
import jwt_decode from 'jwt-decode';

export default function Account() {
  const token = useSelector(state => state.session.token);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleCloseSession = () => dispatch(setToken(null));

  const data = jwt_decode(token);

  return (
    <React.Fragment>
      <Button
        color="inherit"
        startIcon={<AccountCircleIcon />}
        onClick={handleClick}
      >
        {data.email}
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCloseSession}>Cerrar sesión</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
