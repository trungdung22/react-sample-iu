import { createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '8rem 0 10rem',
    background: 'url(assets/lottery/bg_finished.svg) center top no-repeat',
    backgroundSize: 'cover',
    marginTop: '7.5rem',
    '& h3': {
      color: '#D47DFF',
      fontSize: 48,
      fontWeight: 700,
      marginBottom: '2.25rem',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    '@media screen and (max-width: 768px)': {
      padding: '4rem 0',
      marginTop: '4rem',
      '& h3': {
        fontSize: 26,
        marginBottom: '1.25rem',
      },
    },
  },
  container: {
    maxWidth: 700,
    margin: '0 auto',
    transition: 'all 0.2s ease',
    '@media screen and (max-width: 768px)': {
      padding: '0 3%',
      maxWidth: 425,
    }
  },
  listButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '4rem',
    '& li:not(.slash)': {
      border: '1px solid #A819FA',
      borderRadius: 15,
      fontSize: 20,
      fontWeight: 700,
      width: 160,
      textAlign: 'center',
      padding: '0.6rem 0',
      boxSizing: 'border-box',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    '& li.active, & li:not(.slash):hover': {
      background: '#A819FA',
    },
    '@media screen and (max-width: 768px)': {
      gap: '0',
      marginBottom: '2rem',
      '& li.active, & li:not(.slash)': {
        padding: '0.5rem 0',
        fontSize: 14,
        borderRadius: 10,
      },
      '& li.slash': {
        margin: '0 0.25rem',
        '& svg': {
          maxWidth: 10,
        }
      }
    },
  },
}));

export default useStyles;