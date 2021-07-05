import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
  	padding: '1rem',
    width: '100%',
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
    paddingLeft: 240,
    paddingTop: 64,
    paddingRight: 0,
    paddingBottom: 0
  },
  container: {
    width: '100%',
    height: 'calc(100vh - 180px)',
  },
  footer: {
  	width: '100%',
		height: '100px',
		borderTop: '1px solid #eaeaea',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
  }
}));

export default useStyles;