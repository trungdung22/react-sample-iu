import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    color: '#0B7880',
    background: '#17F0FF',
    fontSize: 14,
    fontWeight: 700,
    textAlign: 'center',
    borderRadius: 5,
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: 140,
    '&.connected': {
      color: '#fff',
      background: '#A819FA',
    },
    '@media screen and (max-width: 767px)': {
      fontSize: '13px',
      padding: '0.5rem 0',
    },

    '&:hover': {
      opacity: 0.8,
    },
  },
}));

export default useStyles;