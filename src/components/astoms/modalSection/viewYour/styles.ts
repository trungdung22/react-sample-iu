import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  winingNumber: {
    borderTop: '1px solid #616161',
    padding: '1.25rem 1.25rem 0.75rem',
    '& p': {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: '0.75rem',
    },
    '& ul': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.5rem',
      '& li': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: '1px solid #17F0FF',
        fontWeight: 700,
        color: '#17F0FF',
        width: 40,
        height: 40,
        fontSize: 18,
      },
    }
  },
  listTickets: {
    overflowY: 'auto',
    padding: '0 1.25rem',
    maxHeight: 186,
    marginTop: '1rem',
    marginBottom: '1.25rem',
    '& dl + dl': {
      marginTop: '1rem',
    },
    '& dt': {
      marginBottom: '0.5rem',
      fontSize: 16,
    },
    '& ul': {
      background: 'rgba(168, 25, 250, 0.2)',
      boxShadow: 'inset 0 4px 4px rgb(0 0 0 / 25%)',
      border: '1px solid #A819FA',
      borderRadius: 10,
      display: 'flex',
      width: 'fit-content',
      fontWeight: 600,
      padding: '0.75rem 0',
      color: '#fff',
      '& li': {
        width: 48,
        textAlign: 'center',
      }
    },
  },
  countTicket: {
    marginBottom: '1rem',
    '& >p': {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: '0.5rem',
    },
    '& li': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#D47DFF',
      fontWeight: 700,
      fontSize: 20,
      height: 51,
      '& p': {
        color: '#f4e0ff',
        fontWeight: 300,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        '& span:first-child': {
          width: 37,
          textAlign: 'center',
          '&>svg': {
            margin: '0 auto',
          }
        },
        '& span:last-child': {
          marginLeft: '0.75rem',
          display: 'inline-flex',
        },
      },
    }
  },
}));

export default useStyles;