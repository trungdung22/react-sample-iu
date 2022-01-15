import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  body: {},
  footer: {},
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