import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  winingNumber: {
    overflowY: 'auto',
    marginBottom: 0,
    marginTop: '5px',
    maxHeight: 190,
    '& dl + dl': {
      marginTop: '18px',
    },
    '& dt': {
      fontSize: 12,
      marginBottom: '0.25rem',
      color: '#EBEBEB',
    },
    '& ul': {
      cursor: 'pointer',
      padding: '3px 12px',
      transition: 'all 0.2s ease',
      background: '#0B7880',
      boxShadow: 'inset 0 4px 4px rgb(0 0 0 / 25%)',
      border: '1px solid #ADFAFF',
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 600,
      color: '#fff',
      '&:hover': {
        opacity: 0.8,
      }
    },
  },
  listTickets: {
    overflowY: 'auto',
    marginBottom: 0,
    marginTop: '5px',
    maxHeight: 190,
    '& dl + dl': {
      marginTop: '18px',
    },
    '& dt': {
      fontSize: 12,
      marginBottom: '0.25rem',
      color: '#EBEBEB',
    },
    '& ul': {
      padding: '3px 12px',
      background: '#0B7880',
      boxShadow: 'inset 0 4px 4px rgb(0 0 0 / 25%)',
      border: '1px solid #ADFAFF',
      borderRadius: 5,
      display: 'flex',
      fontWeight: 600,
      color: '#fff',
      width: 'fit-content',
      '& li + li': {
        marginLeft: 23,
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