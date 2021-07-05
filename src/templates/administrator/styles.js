import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    padding: theme.spacing(2)
  },
  filters: {
    width: 200,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    width: 'calc(100% - 200px)',
    paddingLeft: theme.spacing(5)
  }
}));

export default useStyles;