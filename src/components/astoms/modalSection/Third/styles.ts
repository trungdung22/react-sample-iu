import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  body: {
    padding: '1.25rem',
  },
  footer: {
    padding: '1.25rem',
  },
  description: {
    color: '#fff',
    lineHeight: '1.2rem',
    fontSize: 12,
    marginBottom: '1rem',
    fontWeight: 500,
  },
  buy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    '& .icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontWeight: 700,
      gap: '0.5rem',
    }
  },
  totalPay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2.5rem',
    '& .price': {
      fontSize: 24,
      fontWeight: 700,
      color: '#D47DFF',
    }
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
      fontSize: 16,
      padding: '0.6rem',
      '&.random': {
        background: 'transparent',
        color: '#17F0FF',
        fontSize: 16,
        border: '1px solid #17F0FF',
      },
      '&.goback': {
        background: 'transparent',
        fontSize: 16,
        color: '#D47DFF',
        marginTop: '1rem',
        '& span': {
          display: 'inline-flex',
          marginRight: '0.5rem',
          maxWidth: 15,
          position: 'relative',
          top: 2,
        }
      },
      '&:hover': {
        opacity: 0.6,
      }
    }
  },
  listTickets: {
    overflowY: 'auto',
    marginBottom: 0,
    marginTop: '1.5rem',
    maxHeight: 160,
    '& dl + dl': {
      marginTop: '1rem',
    },
    '& dt': {
      fontSize: 16,
      marginBottom: '0.5rem',
    },
    '& ul': {
      cursor: 'pointer',
      padding: '0.75rem 1rem',
      transition: 'all 0.2s ease',
      background: 'rgba(168, 25, 250, 0.2)',
      boxShadow: 'inset 0 4px 4px rgb(0 0 0 / 25%)',
      border: '1px solid #A819FA',
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 600,
      color: '#fff',
      '&:hover': {
        opacity: 0.8,
      }
    },
  },
  lineGray: {
    padding: '0 1.25rem',
    '& span': {
      display: 'block',
      height: 1,
      background: '#616161',
    },
  },
}));

export default useStyles;