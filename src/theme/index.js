import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      container: {
        backdropFilter: 'blur(10px)'
      }
    }
  }
});

export default theme;
