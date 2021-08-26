import React, {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import MuiGrid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';
import Grid from '../../components/grid';
import Search from '../../components/search';
import ProviderApi from '../../api/providers';
import useStyles from './styles';

const Buyer = () =>  {
  const classes = useStyles();
  const hasToken = useSelector((state) => Boolean(state.session.token));

  const [products, setProducts] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);

  const getProducts = async (search, range) => {
    if (hasToken) {
      const products = await ProviderApi.getProductsAsBuyer({ search, range });

      setProducts(products || []);
    }
  };

 useEffect(() => {
    if (hasToken) {
      getProducts();
    }
  }, [hasToken]);

  const handleChange = (e, value) => {
    setSliderValue(value);
  };

  const onChangeCommitted = (e, value) => {
    getProducts('', value);
  };

  return (
    <Box p={2} className={classes.root}>
      <Paper className={classes.filters}>
        <Typography variant='subtitle1' gutterBottom>
          Filtros
        </Typography>

        <MuiGrid container spacing={2}>
          <MuiGrid item xs>
            <Slider
              min={0}
              max={10000}
              value={sliderValue}
              onChange={handleChange}
              onChangeCommitted={onChangeCommitted}
            />
          </MuiGrid>
        </MuiGrid>

        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='subtitle1' gutterBottom>
            $ 0
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            $ 10000
          </Typography>
        </Box>
      </Paper>

      <Box className={classes.content}>
        <Search onSearch={getProducts} />
        <Grid products={products} />
      </Box>
    </Box>
  );
}

export default Buyer;