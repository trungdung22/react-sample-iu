import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: 'url(./assets/lottery/bg_party.svg) center top no-repeat',
    backgroundSize: '150% auto',
    '@media screen and (max-width: 1024px)': {
      background: 'url(./assets/lottery/bg_party.svg) center top no-repeat',
      backgroundSize: '250% auto',
    }
  },
}));

export default useStyles;