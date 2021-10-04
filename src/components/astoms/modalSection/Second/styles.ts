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
      borderRadius: 10,
      outline: 'none',
      border: '1px solid #A819FA',
      background: 'rgba(168, 25, 250, 0.1)',
      width: '100%',
      textAlign: 'right',
      padding: '0.75rem 1rem 2.25rem',
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
  balance: {
    textAlign: 'right',
    fontWeight: 700,
    marginBottom: '1.25rem',
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
      border: '1px solid transparent',
      color: '#0B7880',
      transition: 'all 0.2s ease',
      textAlign: 'center',
      padding: '0.6rem',
      cursor: 'pointer',
      fontSize: 16,
      '&.max': {
        background: '#fff',
        padding: '0.5rem',
        fontSize: 14,
        color: '#D47DFF',
      },
      '&.edit': {
        background: 'transparent',
        fontSize: 16,
        color: '#17F0FF',
        marginTop: '1rem',
        border: '1px solid #17F0FF',
        '& span': {
          display: 'inline-flex',
          marginLeft: '0.5rem',
        }
      },
      '&:hover': {
        opacity: 0.6,
      }
    }
  },
  note: {
    fontSize: 12,
    color: '#fff',
    marginTop: '1rem',
    lineHeight: '1.2rem',
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