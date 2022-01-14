import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: 'url(assets/lottery/bg_finished.svg) center top no-repeat',
    backgroundSize: 'cover',
  },
}));

export default useStyles;