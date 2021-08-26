import React ,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Change the imports  
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import jwt_decode from 'jwt-decode';

import { setToken } from '../../redux/session';


export default function Account() {
  const token = useSelector((state) => state.session.token);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseSession = () => dispatch(setToken(null));

  const data = jwt_decode(token);

  return (
    <>
      <Button color='inherit' startIcon={<AccountCircleIcon />} onClick={(event)=> setAnchorEl(event.currentTarget) }>
        {data.email}
      </Button>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleCloseSession}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
}
