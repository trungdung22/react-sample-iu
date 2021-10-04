import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  body: {
    padding: '1.25rem 1.25rem 0.5rem 1.25rem',
  },
  footer: {
    padding: '1.25rem',
  },
  chooseNumber: {
    display: 'flex',
    flexWrap: 'wrap',
    '& li': {
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      marginRight: '1.08rem',
      marginBottom: '0.6rem',
      color: '#fff',
      fontSize: 14,
      width: '28px',
      height: '28px',
      '&:nth-child(7n)': {
        marginRight: 0,
      },
      '&.active': {
        background: '#A819FA',
      },
      '&:not(.active):hover': {
        color: '#B2FAFF',
      },
    }
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
    }
  },
  listNumber: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(28, 25, 25, 0.8)',
    justifyContent: 'center',
    padding: '1.25rem',
    gap: 0,
    '& li': {
      color: '#17F0FF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: '1px solid #1CE6F3',
      fontWeight: 700,
      cursor: 'pointer',
      width: 40,
      height: 40,
      fontSize: 18,
      '& + li': {
        marginLeft: '0.8rem'
      },
      '&:hover, &.active': {
        background: '#0B7880',
        boxShadow: 'inset 0 2px 4px rgb(0 0 0 / 50%)',
        color: '#fff',
      }
    },

  },
}));

export default useStyles;