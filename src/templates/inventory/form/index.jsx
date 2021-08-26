import React from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Modal from '../../../components/modal';
import InventoryApi from '../../../api/inventories';
import { setToken } from '../../../redux/session';

const initialFormState = {
  name: '',
  sku: '',
  price: ''
};

export default function Form({ children, onAfterSave = () => {} }) {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [formData, setFormData] = React.useState(initialFormState);

  const dispatch = useDispatch();

  const onOpen = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setFormData(initialFormState);
  };

  const handleCreateProduct = async () => {
    if (!formData['name'] || !formData['sku'] || !formData['price']) {
      setErrorMessage('Todos los campos son requeridos');
      return;
    }

    const response = await InventoryApi.createProduct(formData);

    if (response.error) {
      setErrorMessage(response.error);
      return;
    }

    onClose();

    onAfterSave();
  };

  const handleChange = (field) => {
    return (e) => {
      const newFormData = Object.assign({}, formData, {
        [field]: e.target.value
      });

      setFormData(newFormData);
    };
  };

  return (
    <React.Fragment>
      <Button color='secondary' variant='contained' onClick={onOpen}>
        Crear producto
      </Button>

      <Modal open={open} title='Crear producto' onClose={onClose} size='sm'>
        <Box height='70%' section='content'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Nombre'
                variant='outlined'
                size='medium'
                name='name'
                fullWidth
                onChange={handleChange('name')}
                value={formData.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='SKU'
                variant='outlined'
                size='medium'
                name='sku'
                fullWidth
                onChange={handleChange('sku')}
                value={formData.sku}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Precio'
                variant='outlined'
                size='medium'
                name='price'
                fullWidth
                onChange={handleChange('price')}
                type='number'
                value={formData.price}
              />
            </Grid>

            <Grid item xs={12}>
              {errorMessage}
            </Grid>

            <Grid item xs={6}>
              <Box mt={2} display='flex' justifyContent='center' flexDirection='column'>
                <Button variant='contained' color='primary' fullWidth onClick={handleCreateProduct}>
                  Guardar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
