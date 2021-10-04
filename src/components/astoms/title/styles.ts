import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    color: '#17F0FF',
    fontSize: 60,
    lineHeight: '1.15em',
    fontFamily: '\'Bungee\', cursive',
    fontWeight: 400,
    transition: 'all 0.2s ease',
    '@media screen and (max-width: 1340px)': {
      fontSize: 46,
    },
    '@media screen and (max-width: 768px)': {
      fontSize: 32,
      lineHeight: '2.7rem',
    },
  },
}));

export default useStyles;