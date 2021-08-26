import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';

export default function Search({ onSearch = () => {} }) {
  const classes = useStyles();

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Paper className={classes.root}>
      <InputBase className={classes.input} placeholder='Buscar' onChange={handleChange} />
      <IconButton type='submit' className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
