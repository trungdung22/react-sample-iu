import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  listTickets: {
    overflowY: 'auto',
    marginBottom: 0,
    marginTop: '5px',
    maxHeight: 190,
    '& dl + dl': {
      marginTop: '18px',
    },
    '& dt': {
      marginBottom: '0.25rem',
    },
    '& ul': {
      padding: '3px 12px',
      boxShadow: 'inset 0 4px 4px rgb(0 0 0 / 25%)',
      borderRadius: 5,
      display: 'flex',
      fontWeight: 600,
      width: 'fit-content',
      overflowX: 'hidden',
      '& li + li': {
        marginLeft: 30,
        '@media screen and (max-width: 767px)': {
          marginLeft: 22,
        }
      }
    },
  },
}));

export default useStyles;