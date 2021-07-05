import { makeStyles } from '@material-ui/core/styles';
 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      height: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    padding: theme.spacing(2)
  },
  productImage: {
    margin: theme.spacing(1),
    width: theme.spacing(16),
    height: theme.spacing(16),
    backgroundColor: 'gray'
  }
}));


export default useStyles;