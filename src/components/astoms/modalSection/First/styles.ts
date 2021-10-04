import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  body: {
    padding: '1.25rem',
  },
  footer: {
    padding: '1.25rem',
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
      '& span': {
        maxWidth: 35,
      }
    },
  },
  inputNumber: {
    color: '#D47DFF',
    position: 'relative',
    marginBottom: '0.5rem',
    '& input': {
      padding: '0.75rem 1rem 2.25rem',
      borderRadius: 10,
      outline: 'none',
      border: '1px solid #A819FA',
      background: 'rgba(168, 25, 250, 0.1)',
      width: '100%',
      textAlign: 'right',
      fontWeight: 700,
      fontSize: 22,
      color: '#D47DFF',
      '&::placeholder': {
        fontSize: 22,
        color: '#D47DFF',
      },
    }
  },
  payunit: {
    position: 'absolute',
    width: '100%',
    bottom: '0.75rem',
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem',
    '& .name': {
      fontWeight: 700,
      fontSize: 16,
    },
  },
  insuff: {
    textAlign: 'right',
    color: '#D47DFF',
    fontWeight: 600,
    marginBottom: '0.75rem',
    fontSize: 12,
  },
  balance: {
    textAlign: 'right',
    fontWeight: 700,
    fontSize: 14,
  },
  totalPay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    '& .price': {
      fontSize: 18,
      fontWeight: 700,
      color: '#D47DFF',
    },
  },
  listButton: {
    '& li': {
      fontWeight: 700,
      display: 'block',
      borderRadius: 5,
      background: '#17F0FF',
      color: '#0B7880',
      transition: 'all 0.2s ease',
      textAlign: 'center',
      cursor: 'pointer',
      border: '1px solid transparent',
      fontSize: 16,
      padding: '0.6rem',
      '&:hover': {
        opacity: 0.6,
      },
    },
  },
  lineGray: {
    '& span': {
      display: 'block',
      height: 1,
      background: '#616161',
    },
    padding: '0 1.25rem',
  },
}));

export default useStyles;