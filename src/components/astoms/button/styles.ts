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
    width: 'fit-content',
    transition: 'all 0.2s ease',
    '&.connected': {
      color: '#fff',
      background: '#A819FA',
      cursor: 'default',
      '&:hover': {
        opacity: 1,
      },
    },
    // '@media screen and (max-width: 1640px)': {
    //   fontSize: '1em',
    //   padding: '1vw 0',
    //   width: 160,
    //   borderRadius: '1vw',
    // },
    '&.small': {
      padding: '0.75rem 0',
      fontSize: '14px',
      borderRadius: 5,
      width: 140,
    },
    '@media screen and (max-width: 768px)': {
      fontSize: '13px',
      padding: '0.5rem 0',
      width: 120,

    },

    '&:hover': {
      opacity: 0.8,
    },
  },
}));

export default useStyles;