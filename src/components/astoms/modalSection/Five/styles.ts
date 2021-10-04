import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  body: {
    padding: '1.25rem',
  },
  footer: {
    padding: '1.25rem',
  },
  description: {
    fontSize: 12,
    color: '#fff',
    marginBottom: '1rem',
    lineHeight: '1.2rem',
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
      background: '#FFFFFF',
      border: '1px solid transparent',
      color: '#999999',
      transition: 'all 0.2s ease',
      textAlign: 'center',
      cursor: 'pointer',
      fontSize: 16,
      padding: '0.6rem',
      '& span': {
        display: 'inline-block',
      },
      '&.random': {
        cursor: 'default',
        background: 'transparent',
        color: '#8A8A8A',
        fontSize: 16,
        border: '1px solid #fff',
      },
      '&.confirming': {
        '& span': {
          marginLeft: '0.75rem',
        },
        '&:hover': {
          opacity: 0.6,
        }
      },
      '&.goback': {
        background: 'transparent',
        marginTop: '1rem',
        fontSize: 16,
        '& span': {
          display: 'inline-flex',
          maxWidth: 15,
          position: 'relative',
          top: 2,
          marginRight: '0.75rem',
        },
        '&:hover': {
          opacity: 0.6,
        }
      },
    }
  },
  listTickets: {
    overflowY: 'auto',
    maxHeight: 160,
    marginTop: '1.5rem',
    marginBottom: 0,
    '& dl + dl': {
      marginTop: '1rem',
    },
    '& dt': {
      fontSize: 16,
      marginBottom: '0.5rem',
    },
    '& ul': {
      background: 'rgba(145, 145, 145, 0.2)',
      boxShadow: 'inset 0 4px 4px rgb(0 0 0 / 25%)',
      border: '1px solid #8A8A8A',
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.75rem 1rem',
      fontWeight: 600,
      color: '#B8B8B8',
    },
  },
  lineGray: {
    padding: '0 1.5rem',
    '& span': {
      display: 'block',
      height: 1,
      background: '#616161',
    },
    '@media screen and (max-width: 768px)': {
      padding: '0 1.25rem',
    }
  },
}));

export default useStyles;