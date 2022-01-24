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
      transition: 'all 0.2s ease',
      boxShadow: 'inset 0 4px 4px rgb(0 0 0 / 25%)',
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 600,
    },
  },
}));

export default useStyles;