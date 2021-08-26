import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

export default function Grid({ products = [] }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {products.map((product) => (
        <Paper key={product.id} elevation={3}>
          <Paper elevation={1} className={classes.productImage} />
          <Typography variant='h6' gutterBottom>
            {product.name}
          </Typography>

          <Typography variant='subtitle1' gutterBottom>
            {product.sku}
          </Typography>

          <Typography variant='subtitle1' gutterBottom>
            $ {product.price}
          </Typography>
        </Paper>
      ))}
    </div>
  );
}
