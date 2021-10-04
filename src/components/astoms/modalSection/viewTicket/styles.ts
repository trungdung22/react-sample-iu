import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  body: {
    padding: '1.25rem',
    background: '#201E1E',
    '& .title': {
      fontSize: 20,
      fontWeight: 700,
    }
  },
  footer: {
    padding: '1.25rem',
  },
  listButton: {
    '& li': {
      fontWeight: 700,
      display: 'block',
      borderRadius: 5,
      background: '#17F0FF',
      border: '1px solid transparent',
      color: '#0B7880',
      transition: 'all 0.2s ease',
      textAlign: 'center',
      cursor: 'pointer',
      margin: '0 auto',
      fontSize: 16,
      width: 140,
      padding: '0.6rem',
      '&:hover': {
        opacity: 0.6,
      }
    }
  },
  listTickets: {
    overflowY: 'auto',
    maxHeight: 160,
    marginTop: '1rem',
    marginBottom: 0,
    '& dl + dl': {
      marginTop: '1rem',
    },
    '& dt': {
      fontSize: 16,
      marginBottom: '0.5rem',
    },
    '& ul': {
      background: 'rgba(168, 25, 250, 0.2)',
      boxShadow: 'inset 0 4px 4px rgb(0 0 0 / 25%)',
      border: '1px solid #A819FA',
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.75rem 1rem',
      fontWeight: 600,
      color: '#fff',
    },
  },
}));

export default useStyles;