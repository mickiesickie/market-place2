import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './styles';
import Login from '../../../organisms/login';
import Form from '../form';

export default function Empty({ onAfterSave = () => {} }) {
  const classes = useStyles();
  const hasToken = useSelector((state) => Boolean(state.session.token));

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h5' variant='h5'>
              Crea tu producto
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              Organiza de manera profesional tu inventario
            </Typography>

            <Box display='flex' width='100%' justifyContent='space-around' alignItems='center'>
              <Link href='#'>Conoce más</Link>

              {hasToken && <Form onAfterSave={onAfterSave} />}
            </Box>
          </CardContent>
        </div>
      </Card>

      {!hasToken && (
        <Login>
          <Link>Inicia sesión para poder ver tu inventario</Link>
        </Login>
      )}
    </div>
  );
}
